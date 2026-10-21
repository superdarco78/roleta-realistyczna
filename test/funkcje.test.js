/* Testy: `npm test` – czyste funkcje karty (bez przeglądarki) */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { rrCzas } from '../src/silnik.js';
import { rrShade, rrHex, RR_KOLORY } from '../src/kolory.js';
import { rrWmo } from '../src/pogoda.js';
import { rrRpmId, rrCzujnikiAuto, rrPogodaId } from '../src/wykrywanie.js';
import { RR_WERSJA, RR_DEF } from '../src/stale.js';

test('czas przejazdu z prędkości silnika (pomiar Moes 20.10: 40 obr/min ≈ 30 s, 255 obr/min ≈ 22 s)', () => {
  assert.ok(Math.abs(rrCzas('auto', 40) - 30) < 0.5);
  assert.ok(Math.abs(rrCzas('auto', 255) - 21.7) < 0.5);
  assert.equal(rrCzas('auto', 0, 18), 18);        // nauczony czas
  assert.equal(rrCzas('auto', 0, 0), 30);         // nic nie wiadomo
  assert.equal(rrCzas(1, 40), 3);                 // ręczny, najmniej 3 s
});

test('kolory', () => {
  assert.equal(rrHex('czarny'), RR_KOLORY.czarny);
  assert.equal(rrHex('#123456'), '#123456');
  assert.equal(rrShade('#000000', 1), '#ffffff');
  assert.equal(rrShade('#ffffff', -1), '#000000');
});

test('kody pogody Open-Meteo → stany HA', () => {
  assert.equal(rrWmo(0, 1, 5), 'sunny');
  assert.equal(rrWmo(0, 0, 5), 'clear-night');
  assert.equal(rrWmo(3, 1, 50), 'windy-variant');
  assert.equal(rrWmo(95, 1, 5), 'lightning-rainy');
  assert.equal(rrWmo(73, 1, 5), 'snowy');
});

const hass = {
  states: {
    'cover.salon': { state: 'open', attributes: { entity_id: ['cover.lewa', 'cover.prawa'] } },
    'cover.lewa': { state: 'open', attributes: {} }, 'cover.prawa': { state: 'open', attributes: {} },
    'number.lewa_motor_speed': { state: '40' }, 'number.silnik_predkosc': { state: '60' },
    'binary_sensor.okno_lewe': { state: 'off', attributes: { device_class: 'window', friendly_name: 'Okno lewe' } },
    'binary_sensor.okno_prawe': { state: 'off', attributes: { device_class: 'window', friendly_name: 'Okno prawe' } },
    'binary_sensor.ruch': { state: 'off', attributes: { device_class: 'motion' } },
    'weather.forecast_home': { state: 'sunny', attributes: {} }
  },
  entities: {
    'cover.salon': { area_id: 'salon' }, 'cover.prawa': { device_id: 'd2' }, 'number.silnik_predkosc': { device_id: 'd2' },
    'binary_sensor.okno_lewe': { area_id: 'salon' }, 'binary_sensor.okno_prawe': { device_id: 'd9' }, 'binary_sensor.ruch': { area_id: 'salon' }
  },
  devices: { d9: { area_id: 'salon' } }
};

test('wykrywanie prędkości silnika: po nazwie i z tego samego urządzenia', () => {
  assert.equal(rrRpmId(hass, 'cover.lewa'), 'number.lewa_motor_speed');
  assert.equal(rrRpmId(hass, 'cover.prawa'), 'number.silnik_predkosc');
  assert.equal(rrRpmId(hass, 'cover.lewa', 'number.x'), 'number.x');   // ręczny wybór ma pierwszeństwo
});

test('kontaktrony z tego samego pomieszczenia, lewe/prawe po nazwie, bez czujników ruchu', () => {
  assert.deepEqual(rrCzujnikiAuto(hass, 'cover.salon'), ['binary_sensor.okno_lewe', 'binary_sensor.okno_prawe']);
  assert.deepEqual(rrCzujnikiAuto(hass, 'cover.lewa'), []);   // bez pomieszczenia nic nie zgadujemy
});

test('pogoda: wybrana albo typowa encja', () => {
  assert.equal(rrPogodaId({ pogoda: 'auto' }, hass), 'weather.forecast_home');
  assert.equal(rrPogodaId({ pogoda: 'weather.x' }, hass), 'weather.x');
});

test('tłumaczenia: polski i angielski mają te same klucze', () => {
  const pl = JSON.parse(readFileSync('translations/pl.json', 'utf8')), en = JSON.parse(readFileSync('translations/en.json', 'utf8'));
  const klucze = (o, p = '') => Object.entries(o).flatMap(([k, v]) => v && typeof v === 'object' && !Array.isArray(v) ? klucze(v, p + k + '.') : [p + k]).sort();
  assert.deepEqual(klucze(pl.karta), klucze(en.karta));
  assert.deepEqual(klucze(pl.edytor), klucze(en.edytor));
});

test('wersja: plik dist i CHANGELOG mają ten sam numer', () => {
  assert.match(RR_WERSJA, /^v\d+$/);
  assert.equal(readFileSync('CHANGELOG.md', 'utf8').match(/^## (v\d+)/m)[1], RR_WERSJA);
  assert.ok(readFileSync('dist/roleta-realistyczna.js', 'utf8').includes(`"${RR_WERSJA}"`));
  assert.equal(RR_DEF.czas, 'auto');
});

test('v23: ranking i ścisłe filtry encji', async () => {
  const { rrKandydaci } = await import('../src/wykrywanie.js');
  const h = JSON.parse(JSON.stringify(hass));
  Object.assign(h.states, {
    'cover.brama': { state: 'closed', attributes: { device_class: 'gate' } },
    'cover.kuchnia': { state: 'unavailable', attributes: {} },
    'number.temperatura': { state: '21', attributes: { unit_of_measurement: '°C' } },
    'number.prawa_rpm': { state: '40', attributes: { unit_of_measurement: 'rpm' } }
  });
  const ids = (r, ref) => rrKandydaci(h, r, ref).map(x => x.id);
  assert.equal(ids('cover')[0], 'cover.salon');                    // grupa rolet na górze
  assert.ok(!ids('cover').includes('cover.brama'));                // bez bram
  assert.equal(ids('cover').at(-1), 'cover.kuchnia');              // niedostępna na końcu
  assert.ok(!ids('speed').includes('number.temperatura'));         // tylko prędkości
  assert.equal(ids('speed', { cover: 'cover.prawa' })[0], 'number.silnik_predkosc');   // to samo urządzenie
  assert.deepEqual(ids('contact').sort(), ['binary_sensor.okno_lewe', 'binary_sensor.okno_prawe']);   // bez czujnika ruchu
  assert.equal(ids('contact', { cover: 'cover.salon', side: 1 })[0], 'binary_sensor.okno_prawe');
  assert.deepEqual(ids('skrzydlo', { members: ['cover.lewa', 'cover.prawa'], side: 0 }).slice(0, 2), ['cover.lewa', 'cover.prawa']);
  assert.deepEqual(ids('weather'), ['weather.forecast_home']);
});

test('v23: tłumaczenia kreatora mają te same klucze', () => {
  const pl = JSON.parse(readFileSync('translations/pl.json', 'utf8')), en = JSON.parse(readFileSync('translations/en.json', 'utf8'));
  const klucze = (o, p = '') => Object.entries(o).flatMap(([k, v]) => v && typeof v === 'object' && !Array.isArray(v) ? klucze(v, p + k + '.') : [p + k]).sort();
  assert.deepEqual(klucze(pl.kreator), klucze(en.kreator));
});

test('v26: każdy typ osłony ma 3 warstwy materiału', async () => {
  const { rrTkanina } = await import('../src/karta-styl.js');
  const { RR_OSLONY, RR_OSL_IKONY } = await import('../src/stale.js');
  for (const t of [...RR_OSLONY, undefined]) {
    const s = rrTkanina(t, '#232427', {});
    assert.equal(s.split(/,(?=\s*(?:repeating-)?(?:linear|radial)-gradient)/).length, 3, t);
    assert.ok(!s.includes('NaN') && !s.includes('undefined'), t);
  }
  RR_OSLONY.forEach(t => assert.match(RR_OSL_IKONY[t], /^mdi:/));
});

test('v27: rodzaje osłon – grupy, nazwy, opisy i style', async () => {
  const { rrTkanina, rrOslonaStyl } = await import('../src/karta-styl.js');
  const { RR_OSLONY, RR_OSL_GRUPY } = await import('../src/stale.js');
  const pl = JSON.parse(readFileSync('translations/pl.json', 'utf8')), en = JSON.parse(readFileSync('translations/en.json', 'utf8'));
  assert.deepEqual([...RR_OSL_GRUPY.wew, ...RR_OSL_GRUPY.zew].sort(), [...RR_OSLONY].sort());
  for (const L of [pl.edytor, en.edytor]) { assert.equal(L.osln.length, RR_OSLONY.length); assert.equal(L.osld.length, RR_OSLONY.length); }
  for (const t of RR_OSLONY) {
    const s = rrTkanina(t, '#6d7076', {}) + rrOslonaStyl(t, '#6d7076', '#f4f4f2');
    assert.ok(!s.includes('NaN') && !s.includes('undefined'), t);
  }
});

test('v28: wydania z samym opisem (v27.1) nie są „nowszą wersją” karty', async () => {
  const { rrNumerWersji } = await import('../src/panele.js');
  assert.equal(rrNumerWersji('v27.1'), 27);
  assert.equal(rrNumerWersji('v27'), 27);
  assert.ok(rrNumerWersji('v28') > rrNumerWersji('v27.1'));
  assert.equal(rrNumerWersji(undefined), 0);
});
