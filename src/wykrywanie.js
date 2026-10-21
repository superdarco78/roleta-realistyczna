/* Automatyczne wykrywanie: prędkość silnika, kontaktrony okna, encja pogody */
/* prędkość silnika: wybrana encja albo zgadnięta po nazwie (Moes/Tuya w zigbee2mqtt: number.<nazwa>_motor_speed) */
export const rrRpmId = (hass, cover, enc) => {
  if (enc) return enc;
  const g = String(cover).replace('cover.', 'number.') + '_motor_speed';
  if (hass?.states[g]) return g;
  /* v21: encja prędkości z tego samego urządzenia co roleta */
  const dev = hass?.entities?.[cover]?.device_id;
  return dev ? Object.keys(hass.entities).find(k => k.startsWith('number.') && hass.entities[k].device_id === dev && /speed|predkos|rpm/i.test(k)) : undefined;
};
export const rrRpm = (hass, cover, enc) => parseFloat(hass?.states[rrRpmId(hass, cover, enc)]?.state);
/* v21: kontaktrony okna z tego samego pomieszczenia co roleta (device_class window/door), lewe/prawe po nazwie */
export const rrCzujnikiAuto = (hass, cover) => {
  const E = hass?.entities, D = hass?.devices; if (!E || !E[cover]) return [];
  const area = e => E[e]?.area_id || D?.[E[e]?.device_id]?.area_id;
  const a = area(cover); if (!a) return [];
  const ok = Object.keys(E).filter(k => k.startsWith('binary_sensor.') && area(k) === a && ['window', 'door', 'opening'].includes(hass.states[k]?.attributes?.device_class)).sort();
  const nm = k => (k + ' ' + (hass.states[k]?.attributes?.friendly_name || '')).toLowerCase();
  const l = ok.find(k => /lew|left/.test(nm(k))), r = ok.find(k => /praw|right/.test(nm(k)));
  if (l || r) return [l || ok.find(k => k !== r), r || ok.find(k => k !== l)];
  return ok.slice(0, 2);
};
/* encja pogody: wybrana albo typowa nazwa z HA albo pierwsza znaleziona */
export const rrPogodaId = (c, hass) => c.pogoda && c.pogoda !== 'auto' ? c.pogoda
  : ['weather.forecast_home', 'weather.home', 'weather.dom'].find(k => hass.states[k]) || Object.keys(hass.states).find(k => k.startsWith('weather.'));

/* v23: ranking encji dla kreatora i edytora – tylko encje pasujące do roli (ścisły filtr), najlepsze na górze.
   Punkty: to samo urządzenie, to samo pomieszczenie, „lewe/prawe” w nazwie, podobna nazwa, właściwy typ czujnika. */
export const rrBezPl = s => String(s || '').toLowerCase().replace(/ł/g, 'l').normalize('NFD').replace(/[̀-ͯ]/g, '');
const RR_POMIN = new Set(['cover', 'binary', 'sensor', 'number', 'weather', 'lewa', 'lewe', 'lewy', 'prawa', 'prawe', 'prawy', 'left', 'right',
  'okno', 'window', 'roleta', 'rolety', 'blind', 'motor', 'speed', 'predkosc', 'silnik', 'silnika', 'contact', 'kontaktron', 'czujnik', 'sensor']);
const rrSlowa = s => rrBezPl(s).split(/[^a-z0-9]+/).filter(w => w.length > 2 && !RR_POMIN.has(w));
const RR_NIE_ROLETY = ['garage', 'gate', 'door', 'damper'];
export const rrNazwa = (h, id) => h?.states?.[id]?.attributes?.friendly_name || id;
export const rrObszar = (h, id) => { const e = h?.entities?.[id]; return e?.area_id || h?.devices?.[e?.device_id]?.area_id || null; };
export const rrObszarNazwa = (h, id) => { const a = rrObszar(h, id); return a ? h.areas?.[a]?.name || a : ''; };
export function rrKandydaci(h, rola, ref = {}) {
  const S = h?.states; if (!S) return [];
  const E = h.entities || {}, out = [], dev = id => E[id]?.device_id;
  const rc = ref.cover, rDev = rc && dev(rc), rArea = ref.area !== undefined ? ref.area : rc && rrObszar(h, rc);
  const rW = new Set(rc ? rrSlowa(rrNazwa(h, rc) + ' ' + rc) : []);
  for (const id in S) {
    const dom = id.split('.')[0], st = S[id], a = st.attributes || {}, reg = E[id] || {}, nm = rrBezPl(id + ' ' + (a.friendly_name || ''));
    if (reg.hidden) continue;
    const why = []; let sc = 0;
    const plus = (w, p) => { sc += p; why.push(w); };
    if (rola === 'cover' || rola === 'skrzydlo') {
      if (dom !== 'cover' || RR_NIE_ROLETY.includes(a.device_class) || reg.entity_category) continue;
      const grupa = (a.entity_id || []).length > 1;
      if (rola === 'cover') { if (grupa) plus('grupa', 40); } else if (grupa) continue; else if ((ref.members || []).includes(id)) plus('czlonek', 100);
      if (a.supported_features & 4) plus('poz', 10);
      if (/rolet|zaluz|blind|shade|shutter|rolo|zaslon|curtain/.test(nm)) sc += 5;
    } else if (rola === 'speed') {
      if (dom !== 'number') continue;
      const rpm = /rpm|obr/i.test(a.unit_of_measurement || '');
      if (!rpm && !/speed|predkos|obrot|rpm/.test(nm)) continue;
      if (rc && id === rc.replace('cover.', 'number.') + '_motor_speed') plus('nazwa', 60);
      if (rDev && dev(id) === rDev) plus('urz', 100);
      if (rpm) plus('rpm', 10);
    } else if (rola === 'contact') {
      if (dom !== 'binary_sensor' || !['window', 'door', 'opening'].includes(a.device_class) || reg.entity_category) continue;
      if (a.device_class === 'window') plus('okno', 10); else if (a.device_class === 'door') why.push('drzwi');
    } else if (rola === 'weather') {
      if (dom !== 'weather') continue;
      if (['weather.forecast_home', 'weather.home', 'weather.dom'].includes(id)) plus('typowa', 10);
    } else continue;
    if (rArea && rola !== 'cover' && rola !== 'weather' && rrObszar(h, id) === rArea) plus('pom', 40);
    if (ref.side !== undefined) {
      if ((ref.side ? /praw|right/ : /lew|left/).test(nm)) plus(ref.side ? 'prawa' : 'lewa', 30);
      if ((ref.side ? /lew|left/ : /praw|right/).test(nm)) sc -= 25;
    }
    if (rW.size && rola !== 'cover' && rrSlowa(nm).some(w => rW.has(w))) plus('nazwa2', 15);
    if (st.state === 'unavailable') { sc -= 50; why.push('off'); }
    out.push({ id, sc, why: [...new Set(why)] });
  }
  return out.sort((x, y) => y.sc - x.sc || rrNazwa(h, x.id).localeCompare(rrNazwa(h, y.id)));
}
