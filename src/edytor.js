import { RR_DEF, RR_OSLONY, RR_OSL_GRUPY, RR_OSL_IKONY } from './stale.js';
import { RR_KOLORY, RR_RAMY, rrHex, rrKontrast } from './kolory.js';
import { rrCzas, rrUcz } from './silnik.js';
import { rrInternet } from './pogoda.js';
import { RR_ED, RR_TXT, RR_KOL_NAZWY, rrJezyk } from './jezyk.js';
import { rrRpm, rrCzujnikiAuto, rrPogodaId, rrKandydaci } from './wykrywanie.js';
import { RR_G, RR_GKLUCZE, rrGlobLoad, rrGlobSave } from './globalne.js';
import { RR_EDYTOR_STYL } from './edytor-styl.js';
import { RrKreator, rrKreatorPotrzebny } from './kreator.js';

/* Edytor graficzny (v6): jak symulator – kółka kolorów, suwaki, przełączniki i żywy podgląd z animacją.
   Podgląd steruje udawanym silnikiem, nigdy prawdziwą roletą. */
export const RR_POLA = ['entity', 'name', 'roleta_lewa', 'roleta_prawa', 'predkosc_lewa', 'predkosc_prawa', 'zrodlo', 'pogoda', 'tlo', 'czujnik_lewe', 'tryb_lewe', 'czujnik_prawe', 'tryb_prawe'];
export const RR_PRZEL = ['auto_czujniki', 'klamki', 'promienie', 'dzwiek', 'wibracja', 'przyciski', 'niebo', 'widok', 'uchwyty', 'uchwyt_srodek', 'osobno', 'odwroc'];
/* klucze, które zostają w karcie na pulpicie, gdy ustawienia trzyma urządzenie Okno HA */
const RR_KARTA_KLUCZE = ['type', 'entity', 'grid_options', 'view_layout', 'visibility'];
export const rrTylkoKarta = c => Object.fromEntries(Object.entries(c).filter(([k]) => RR_KARTA_KLUCZE.includes(k)));

export class RoletaRealistycznaEditor extends HTMLElement {
  setConfig(c) { this._cfg = Object.assign({}, c); this._go(); }
  set hass(h) { this._hass = h; this._go(); this._wersja(); }
  /* v34: jeden numer – wersja integracji Okno HA (karta jest w jej środku); bez integracji nic */
  _wersja() {
    const w = this.shadowRoot?.querySelector('#wer'); if (!w || !this._hass) return;
    const u = Object.values(this._hass.states).find(s => s.entity_id.startsWith('update.') && String(s.attributes?.release_url || '').includes('okno-ha-integracja') && s.attributes?.installed_version);
    w.textContent = u ? RR_TXT[this._lang].nazwaKarty + ' ' + String(u.attributes.installed_version).replace(/^v/, '') : '';
  }
  disconnectedCallback() { clearInterval(this._loop); this._loop = null; clearInterval(this._kalI); clearInterval(this._ak); this._ak = null; cancelAnimationFrame(this._raf); this._raf = null; }
  connectedCallback() { if (this._built) this._startMotor(); }
  get _L() { return RR_ED[this._lang]; }
  _val(k) { return this._cfg[k] ?? RR_G.v?.[k] ?? RR_DEF[k]; }
  _set(k, v) {
    const c = Object.assign({}, this._cfg);
    if (v === RR_DEF[k] || v === '' || v == null) delete c[k]; else c[k] = v;   // zapisujemy tylko to, co różni się od domyślnych
    this._cfg = c;
    /* v31: okno z integracji Okno HA – ustawienia idą do urządzenia, na pulpicie zostaje sama encja */
    const urz = this._urz();
    this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: urz ? rrTylkoKarta(c) : c }, bubbles: true, composed: true }));
    if (urz) this._zapiszUrz();
    this._sync(); this._preview();
    /* v19: mignięcie podglądu – widać, że ustawienie już działa */
    const pv = this._r?.querySelector('.pv'); if (pv) { pv.classList.add('fl'); clearTimeout(this._flT); this._flT = setTimeout(() => pv.classList.remove('fl'), 500); }
  }
  _urz() { return !!this._hass?.states?.[this._cfg?.entity]?.attributes?.okno_ha; }
  _zapiszUrz() {
    clearTimeout(this._urzT);
    this._urzT = setTimeout(() => this._hass.callWS({ type: 'okno_ha/zapisz', entity_id: this._cfg.entity, karta: this._cfg })
      .catch(e => console.warn('Okno HA: nie zapisałem w urządzeniu', e)), 600);
  }
  _go() {
    if (!this._hass || !this._cfg) return;
    rrKontrast(this);   // v37: napisy na kolorach motywu czytelne przy każdym kolorze z profilu
    /* v31: edycja okna z integracji – edytor startuje z ustawieniami zapisanymi w urządzeniu */
    if (this._urz() && this._urzE !== this._cfg.entity) {
      this._urzE = this._cfg.entity;
      this._cfg = Object.assign({}, this._cfg, this._hass.states[this._cfg.entity].attributes.okno_ha, rrTylkoKarta(this._cfg));
    }
    const lang = rrJezyk(this._cfg, this._hass);
    if (this._built && lang !== this._lang) { clearInterval(this._loop); this._loop = null; this._built = false; }   // zmiana języka = nowy edytor
    if (!this._built) { this._lang = lang; this._build(); }
    this._schemat();
    this._f.hass = this._hass;
    const d = {};
    RR_POLA.forEach(k => { d[k] = k === 'pogoda' && this._cfg.pogoda === 'auto' ? undefined : this._cfg[k] ?? (RR_DEF[k] === '' ? undefined : RR_DEF[k]); });
    this._f.data = d;
    this._sync(); this._preview();
    this._kr?.odswiez();
  }
  _build() {
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    const L = RR_ED[this._lang], KN = RR_KOL_NAZWY[this._lang], ri = this._lang === 'en' ? 1 : 0;
    const chip = (grp, val, color, label) => `<button class="dot" data-g="${grp}" data-v="${val}" title="${label}"><i style="background:${color}"></i><span>${label}</span></button>`;
    root.innerHTML = `
<style>${RR_EDYTOR_STYL}</style>
</style>
<div class="ed">
 <p class="hint urz" hidden>${L.urz}</p>
 <div class="wiz" hidden></div>
 <div class="f"></div>
 <div class="pv">
  <div class="pvh"><span>${L.pv}</span><span><button class="pin-b wzo" style="opacity:1" title="${L.wz}">🪄</button><button class="pin-b" title="${L.pin}">📌</button> <button class="play">${L.play}</button></span></div>
  <div class="wxp wx1">${['', 'sunny', 'partlycloudy', 'cloudy', 'rainy', 'pouring', 'lightning-rainy', 'snowy', 'fog', 'windy', 'clear-night'].map((v, k) => `<button data-wx="${v}">${L.wxl[k]}</button>`).join('')}</div>
  <div class="wxp">${['', 'uchyl', 'otworz'].map((v, k) => `<button data-okp="${v}">${L.okp[k]}</button>`).join('')}</div>
  <div class="slot"></div>
 </div>
 <details class="sec" data-sec="wyg" open><summary>${L.sec_wyg}</summary>
 <div class="grp"><div class="lb">${L.osl}</div><p class="hint">${L.d_osl}</p>${Object.entries(RR_OSL_GRUPY).map(([g, typy]) => `<div class="osg">${g === 'wew' ? L.osw : L.osz}</div><div class="seg osl">${typy.map(v => `<button data-osl="${v}" title="${L.osld[RR_OSLONY.indexOf(v)]}"><ha-icon icon="${RR_OSL_IKONY[v]}"></ha-icon> ${L.osln[RR_OSLONY.indexOf(v)]}</button>`).join('')}</div>`).join('')}<p class="hint" id="oslD"></p></div>
 <div class="grp"><div class="lb">${L.kol}<span class="kn" data-kn="kolor"></span></div><div class="dots" id="kol">
  ${Object.keys(RR_KOLORY).map(k => chip('kolor', k, RR_KOLORY[k], KN[k] || k)).join('')}
  <label class="dot" data-own="kolor" title="${L.own}"><span class="own"><input type="color" id="kolOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="kolor" min="0" step="1"><p class="hint">${L.d_kol}</p></div>
 <div class="grp"><div class="lb">${L.sia}<span class="kn" data-kn="siatka"></span></div><div class="dots" id="sia">
  ${chip('siatka', '', 'repeating-linear-gradient(180deg,#888 0 4px,#ddd 4px 7px)', L.siaj)}
  ${Object.keys(RR_KOLORY).map(k => chip('siatka', k, RR_KOLORY[k], KN[k] || k)).join('')}
  <label class="dot" data-own="siatka" title="${L.own}"><span class="own"><input type="color" id="siaOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="siatka" min="0" step="1"><p class="hint">${L.d_sia}</p></div>
 <div class="grp"><div class="lb">${L.ram}<span class="kn" data-kn="rama"></span></div><div class="dots" id="ram">
  ${Object.keys(RR_RAMY).map(k => chip('rama', k, k, RR_RAMY[k][ri])).join('')}
  <label class="dot" data-own="rama" title="${L.own}"><span class="own"><input type="color" id="ramOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="rama" min="0" step="1"><p class="hint">${L.d_ram}</p></div>
 <div class="grp"><div class="lb">${L.sk}</div><div class="seg"><button data-sk="1">${L.sk1}</button><button data-sk="2">${L.sk2}</button></div><p class="hint">${L.d_sk}</p></div>
 <div class="grp" id="slGrp"><div class="lb">${L.sl}</div><div class="seg"><button data-sl="staly">${L.sl1}</button><button data-sl="ruchomy">${L.sl2}</button></div><p class="hint">${L.slh}</p></div>
 <div class="grp"><label class="sl"><div>${L.wys} <b id="wysV"></b></div><input type="range" id="wys" min="140" max="460" step="10"></label></div>
 <button class="rst" data-rst="wyg">${L.rst}</button></details>
 <details class="sec" data-sec="okn"><summary>${L.sec_okn}</summary>
 <div class="grp"><div class="lb">${L.s_okn}</div>
  <label class="sl"><div>${L.uch} <b id="uchV"></b></div><input type="range" id="uch" min="3" max="30" step="1"></label>
  <label class="sl"><div>${L.otw} <b id="otwV"></b></div><input type="range" id="otw" min="5" max="90" step="5"></label><p class="hint">${L.d_okn}</p><p class="hint" id="czA"></p></div>
 <button class="rst" data-rst="okn">${L.rst}</button></details>
 <details class="sec" data-sec="ruch"><summary>${L.sec_ruch}</summary>
 <div class="grp"><div class="lb">${L.roz}</div>
  <label class="sw">${L.auto} <ha-switch id="auto"></ha-switch></label>
  <label class="sl" id="czasBox"><div>${L.czas} <b id="czasV"></b></div><input type="range" id="czas" min="3" max="90" step="0.5"></label>
  <p class="hint" id="obrH"></p></div>
 <div class="grp"><div class="lb">${L.kr}</div>
  <label class="sl"><div>${L.krs} <b id="krV"></b></div><input type="range" id="kr" min="0" max="25" step="1"></label>
  <label class="sl"><div>${L.poz}</div><input type="text" id="poz" inputmode="numeric" class="txt"></label><p class="hint">${L.d_kr}</p></div>
 <div class="grp"><div class="lb">${L.kal}</div>
  <p class="hint">${L.akh}</p>
  <div class="kal"><button class="play" id="akal">${L.ak}</button></div><p class="hint" id="akV"></p>
  <p class="hint">${L.kalh}</p>
  <div class="kal"><button class="play" data-kal="down">${L.kd}</button><button class="play" data-kal="up">${L.ku}</button><button class="play ok" id="kalOk" disabled>${L.kok}</button></div>
  <div class="kalw"><b id="kalV">0.0 s</b><button class="play" id="kalZap" hidden>${L.kzap}</button></div></div>
 <button class="rst" data-rst="ruch">${L.rst}</button></details>
 <details class="sec" data-sec="zaaw"><summary>${L.sec_zaaw}</summary>
 <div class="grp"><div class="lb">${L.jez}</div><div class="seg">${[['auto', L.jauto], ['pl', 'Polski'], ['en', 'English']].map(([v, t]) => `<button data-jz="${v}">${t}</button>`).join('')}</div></div>
 <div class="grp"><div class="lb">${L.opc}</div>
  ${RR_PRZEL.map(k => `<label class="sw">${L[k]} <ha-switch id="${k}"></ha-switch></label>`).join('')}</div>
 <div class="grp"><div class="lb">${L.glob}</div><p class="hint">${L.globh}</p>
  <div class="kal"><button class="play" id="gSave">${L.gSave}</button><button class="play" id="gClr" style="background:var(--secondary-text-color)">${L.gClr}</button></div><p class="hint" id="gInfo"></p></div>
 <button class="rst" data-rst="zaaw">${L.rst}</button></details>
 <div class="ver" id="wer"></div>
</div>`;
    const $ = s => root.querySelector(s);
    this._r = root;
    this._f = document.createElement('ha-form');
    this._schemat();
    this._f.computeLabel = s => L.f[s.name] || s.title || s.name;
    this._f.addEventListener('value-changed', e => { const v = e.detail.value;
      RR_POLA.forEach(k => this._set(k, v[k] || (k === 'pogoda' ? 'auto' : RR_DEF[k]))); });
    root.querySelectorAll('[data-jz]').forEach(b => b.onclick = () => this._set('jezyk', b.dataset.jz));
    root.querySelectorAll('[data-kal]').forEach(b => b.onclick = () => this._kal(b.dataset.kal));
    $('#kalOk').onclick = () => this._kalOk();
    $('#akal').onclick = () => this._akal();
    /* v22: przywracanie domyślnych w każdym dziale */
    const RST = { wyg: ['oslona', 'kolor', 'siatka', 'rama', 'skrzydla', 'slupek', 'wysokosc'], okn: ['kat_uchyl', 'otwarcie'], ruch: ['czas', 'krok', 'pozycje'], zaaw: ['jezyk', ...RR_PRZEL] };
    root.querySelectorAll('[data-rst]').forEach(b => b.onclick = () => RST[b.dataset.rst].forEach(k => this._set(k, null)));
    /* v23: kreator w 7 krokach (src/kreator.js) – nowa karta = kreator od razu, później przycisk 🪄 */
    this._kr = new RrKreator(this, $('.wiz'));
    $('.wzo').onclick = () => this._kr.otworz(0);
    if (rrKreatorPotrzebny(this._cfg)) this._kr.otworz(0);
    /* v21: ustawienia globalne */
    const gInfo = () => { const n = Object.keys(RR_G.v || {}).length; $('#gInfo').textContent = n ? L.gIle(n) : L.gBrak; };
    rrGlobLoad(this._hass).then(() => { gInfo(); this._sync(); this._preview(); });
    $('#gSave').onclick = () => {
      const v = {}; RR_GKLUCZE.forEach(k => { const x = this._val(k); if (x !== RR_DEF[k] && x !== '' && x != null) v[k] = x; });
      rrGlobSave(this._hass, v).then(() => { gInfo(); $('#gInfo').textContent += ' ✔'; });
      /* ta karta przejmuje wygląd z globalnych – zostawiamy w niej tylko encje i to, co nie jest wyglądem */
      const c = Object.assign({}, this._cfg); RR_GKLUCZE.forEach(k => delete c[k]); this._cfg = c;
      this.dispatchEvent(new CustomEvent('config-changed', { detail: { config: c }, bubbles: true, composed: true }));
      this._sync(); this._preview();
    };
    $('#gClr').onclick = () => rrGlobSave(this._hass, {}).then(() => { gInfo(); this._sync(); this._preview(); });
    $('#kalZap').onclick = () => { if (this._kalWyn) this._set('czas', this._kalWyn); };
    root.querySelectorAll('[data-wx]').forEach(b => b.onclick = () => { this._wx = b.dataset.wx; this._sync(); this._feed(); });
    $('.f').appendChild(this._f);
    root.querySelectorAll('.dot[data-g]').forEach(b => b.onclick = () => this._set(b.dataset.g, b.dataset.v));
    /* v21: suwak pod paletą – przesuwasz i od razu wybierasz kolor z linii */
    root.querySelectorAll('[data-psl]').forEach(sl => {
      const g = sl.dataset.psl, dots = [...root.querySelectorAll(`.dot[data-g="${g}"]`)];
      sl.max = dots.length - 1;
      sl.oninput = () => { const b = dots[+sl.value]; if (b && b.dataset.v !== String(this._val(g) || '')) this._set(g, b.dataset.v); };
    });
    $('#kolOwn').oninput = e => this._set('kolor', e.target.value);
    $('#siaOwn').oninput = e => this._set('siatka', e.target.value);
    $('#ramOwn').oninput = e => this._set('rama', e.target.value);
    root.querySelectorAll('[data-sk]').forEach(b => b.onclick = () => this._set('skrzydla', +b.dataset.sk));
    root.querySelectorAll('[data-osl]').forEach(b => b.onclick = () => this._set('oslona', b.dataset.osl));
    root.querySelectorAll('[data-sl]').forEach(b => b.onclick = () => this._set('slupek', b.dataset.sl));
    $('#wys').oninput = e => this._set('wysokosc', +e.target.value);
    $('#uch').oninput = e => { this._okp = 'uchyl'; this._set('kat_uchyl', +e.target.value); };
    $('#otw').oninput = e => { this._okp = 'otworz'; this._set('otwarcie', +e.target.value); };
    root.querySelectorAll('[data-okp]').forEach(b => b.onclick = () => { this._okp = b.dataset.okp; this._sync(); this._preview(); });
    let pin = true; try { pin = localStorage.getItem('rr-pin') !== '0'; } catch (x) { /* bez pamięci */ }
    $('.pv').classList.toggle('pin', pin);
    $('.pin-b:not(.wzo)').onclick = () => { const on = $('.pv').classList.toggle('pin'); try { localStorage.setItem('rr-pin', on ? '1' : '0'); } catch (x) { /* bez pamięci */ } };
    $('#kr').oninput = e => this._set('krok', +e.target.value);
    $('#poz').onchange = e => this._set('pozycje', e.target.value.replace(/[^0-9,; ]/g, '').trim() || RR_DEF.pozycje);
    $('#czas').oninput = e => this._set('czas', +e.target.value);
    $('#auto').addEventListener('change', e => this._set('czas', e.target.checked ? 'auto' : Math.round(rrCzas('auto', this._rpm()[0]))));
    RR_PRZEL.forEach(k => $('#' + k).addEventListener('change', e => this._set(k, e.target.checked)));
    $('.play').onclick = () => this._demo();
    /* podgląd: prawdziwa karta z udawanym silnikiem */
    this._card = document.createElement('okno-ha');
    $('.slot').appendChild(this._card);
    this._m = { 'cover.podglad_l': { pos: 60, target: 60 }, 'cover.podglad_p': { pos: 60, target: 60 } };
    this._built = true;
    this._startMotor();
  }
  /* wszystko do wyboru (v17) – rozwijane sekcje, nic na sztywno; v23: ścisłe filtry – w listach tylko pasujące encje */
  _schemat() {
    const L = RR_ED[this._lang], h = this._hass, e = this._cfg.entity;
    const klucz = this._lang + Object.keys(h.states).length + '|' + e; if (klucz === this._sk) return; this._sk = klucz;
    const m = h.states[e]?.attributes?.entity_id || [];
    const tylko = (rola, ref, dom) => { const k = rrKandydaci(h, rola, ref).map(x => x.id); return { entity: k.length ? { include_entities: k } : { domain: dom } }; };
    const opt = a => ({ select: { mode: 'dropdown', options: a.map(([value, label]) => ({ value, label })) } });
    this._f.schema = [{ name: 'entity', required: true, selector: tylko('cover', {}, 'cover') }, { name: 'name', selector: { text: {} } },
      { type: 'expandable', flatten: true, name: '', title: L.s_enc, icon: 'mdi:roller-shade', schema: [
        { name: 'roleta_lewa', selector: tylko('skrzydlo', { members: m, side: 0 }, 'cover') }, { name: 'roleta_prawa', selector: tylko('skrzydlo', { members: m, side: 1 }, 'cover') },
        { name: 'predkosc_lewa', selector: tylko('speed', { cover: m[0] || e }, 'number') }, { name: 'predkosc_prawa', selector: tylko('speed', { cover: m[1] || e }, 'number') }] },
      { type: 'expandable', flatten: true, name: '', title: L.s_pog, icon: 'mdi:weather-partly-cloudy', schema: [
        { name: 'zrodlo', selector: opt(L.zr) }, { name: 'pogoda', selector: tylko('weather', {}, 'weather') }, { name: 'tlo', selector: { text: {} } }] },
      { type: 'expandable', flatten: true, name: '', title: L.s_okn, icon: 'mdi:window-open-variant', schema: [
        { name: 'czujnik_lewe', selector: tylko('contact', { cover: e, side: 0 }, 'binary_sensor') }, { name: 'tryb_lewe', selector: opt(L.tr) },
        { name: 'czujnik_prawe', selector: tylko('contact', { cover: e, side: 1 }, 'binary_sensor') }, { name: 'tryb_prawe', selector: opt(L.tr) }] }];
  }
  _rpm() {   // prędkość prawdziwych silników wybranej rolety (jeśli są) – podgląd jedzie w tym samym tempie
    const st = this._hass?.states[this._cfg.entity];
    const m = (st?.attributes?.entity_id || [this._cfg.entity]).slice(0, 2);
    if (m.length < 2) m.push(m[0]);
    const wyb = [this._cfg.roleta_lewa, this._cfg.roleta_prawa];
    return m.map((e, i) => rrRpm(this._hass, wyb[i] || e, this._cfg[i ? 'predkosc_prawa' : 'predkosc_lewa']));
  }
  _startMotor() {
    if (this._loop) return;
    let last = performance.now();
    this._loop = setInterval(() => {
      const now = performance.now(), dt = (now - last) / 1000; last = now;
      const rpm = this._rpm();
      let ch = false;
      Object.keys(this._m).forEach((id, i) => {
        const m = this._m[id], r = rpm[i] || rpm[0];
        const sp = 100 / rrCzas(this._val('czas'), r);
        const d = m.target - m.pos;
        if (Math.abs(d) > .01) { m.pos += Math.sign(d) * Math.min(Math.abs(d), sp * dt); ch = true; }
      });
      if (ch || this._was) this._feed();
      this._was = ch;
    }, 500);   // jak prawdziwy silnik: meldunek co pół sekundy
  }
  _feed() {
    if (!this._card || !this._hass) return;
    const ids = Object.keys(this._m), st = {};
    const rpm = this._rpm();
    ids.forEach((id, i) => {
      const m = this._m[id], s = m.target > m.pos + .01 ? 'opening' : m.target < m.pos - .01 ? 'closing' : m.pos <= 0 ? 'closed' : 'open';
      let p = Math.round(m.pos); if (this._val('odwroc')) p = 100 - p;
      st[id] = { state: s, attributes: { current_position: p } };
      if (rpm[i] || rpm[0]) st[id.replace('cover.', 'number.') + '_motor_speed'] = { state: String(rpm[i] || rpm[0]) };
    });
    const avg = Math.round(ids.reduce((a, id) => a + this._m[id].pos, 0) / ids.length);
    const ss = ids.map(id => st[id].state);
    st['cover.podglad'] = { state: ss.includes('opening') ? 'opening' : ss.includes('closing') ? 'closing' : avg <= 0 ? 'closed' : 'open',
      attributes: { current_position: this._val('odwroc') ? 100 - avg : avg, friendly_name: 'Podgląd', entity_id: ids } };
    /* pogoda w podglądzie: prawdziwa albo wybrana do testu */
    const wid = this._val('zrodlo') === 'auto' ? rrPogodaId(this._cfg, this._hass) : null;
    const real = this._val('zrodlo') === 'brak' ? null : (wid && this._hass.states[wid]) || rrInternet(this._hass, () => this._feed());
    st['weather.podglad'] = this._wx ? { state: this._wx, attributes: { temperature: this._wx === 'snowy' ? -2 : this._wx === 'sunny' ? 24 : 12, temperature_unit: '°C' } } : real;
    ['czujnik_lewe', 'czujnik_prawe'].forEach(k => { const id = this._cfg[k]; if (id && this._hass.states[id]) st[id] = this._hass.states[id]; });   // prawdziwe kontaktrony w podglądzie
    if (this._okp) st['binary_sensor.podglad_l'] = st['binary_sensor.podglad_p'] = { state: 'on' };
    st['sun.sun'] = this._wx ? { state: this._wx === 'clear-night' ? 'below_horizon' : 'above_horizon' } : this._hass.states['sun.sun'];
    const ed = this;
    this._card.hass = { states: st, language: this._hass.language, config: this._hass.config, callService(dom, svc, data) {
      const list = data.entity_id === 'cover.podglad' ? ids : [data.entity_id];
      let p = data.position; if (p != null && ed._val('odwroc')) p = 100 - p;
      list.forEach(id => { const m = ed._m[id]; m.target = svc === 'open_cover' ? 100 : svc === 'close_cover' ? 0 : svc === 'stop_cover' ? m.pos : p; });
      ed._feed();
    } };
  }
  _preview() {
    if (!this._card) return;
    const c = Object.assign({}, this._cfg, { entity: 'cover.podglad', name: this._cfg.name || RR_ED[this._lang].pv.split(' – ')[0], pogoda: 'weather.podglad', zrodlo: 'auto',
      roleta_lewa: '', roleta_prawa: '', predkosc_lewa: '', predkosc_prawa: '' });
    /* v19: okno w podglądzie (zamknięte / uchylone / otwarte) – udawane kontaktrony */
    if (this._okp) Object.assign(c, { czujnik_lewe: 'binary_sensor.podglad_l', czujnik_prawe: 'binary_sensor.podglad_p', tryb_lewe: this._okp, tryb_prawe: this._okp });
    const key = JSON.stringify(c);
    if (key !== this._pk) { this._pk = key; this._card.setConfig(c); }
    this._feed();
  }
  /* kalibracja stoperem (v17): komenda do prawdziwej rolety, użytkownik klika „Dojechała” */
  _kal(kier) {
    this._hass.callService('cover', kier === 'down' ? 'close_cover' : 'open_cover', { entity_id: this._cfg.entity });
    this._kalT = performance.now(); this._kalWyn = null;
    const r = this._r; r.querySelector('#kalOk').disabled = false; r.querySelector('#kalZap').hidden = true;
    clearInterval(this._kalI);
    this._kalI = setInterval(() => { r.querySelector('#kalV').textContent = ((performance.now() - this._kalT) / 1000).toFixed(1) + ' s'; }, 100);
  }
  /* automatyczna kalibracja (v18): góra → dół (mierzone) → góra (mierzone), średnia zapisana jako czas */
  _akal(btn = this._r.querySelector('#akal'), out = this._r.querySelector('#akV'), etyk = RR_ED[this._lang].ak) {   // v23: też z kreatora
    const L = RR_ED[this._lang], e = this._cfg.entity;
    const koniec = txt => { clearInterval(this._ak); this._ak = null; btn.textContent = etyk; out.textContent = txt; };
    if (this._ak) { this._hass.callService('cover', 'stop_cover', { entity_id: e }); koniec(L.akstop); return; }
    const rpm = this._rpm()[0];
    if (rpm > 0) { out.textContent = L.akrpm(rrCzas('auto', rpm).toFixed(1)); return; }
    const kroki = [['open_cover', 100], ['close_cover', 0], ['open_cover', 100]], wyn = [];
    const stan = () => { const s = this._hass.states[e] || {}; const p = s.attributes?.current_position;
      return { mv: s.state === 'opening' || s.state === 'closing', p: this._cfg.odwroc && typeof p === 'number' ? 100 - p : p, k: (s.last_updated || '') + s.state + p }; };
    let n = -1, t0, ruch, k0;
    const dalej = () => {
      n++;
      if (n === kroki.length) { const t = Math.round((wyn[0] + wyn[1]) * 10 / 2) / 10; this._set('czas', t); koniec(L.akok(t)); return; }
      this._hass.callService('cover', kroki[n][0], { entity_id: e }); t0 = performance.now(); ruch = false; k0 = stan().k;
    };
    btn.textContent = L.akx; out.textContent = L.ak0;
    this._ak = setInterval(() => {
      const s = stan(), el = (performance.now() - t0) / 1000, cel = kroki[n][1];
      if (s.mv) ruch = true;
      /* koniec jazdy: roleta przestała meldować „jedzie” albo (silnik bez tego stanu) przyszła pozycja docelowa */
      const dojechala = ruch ? !s.mv && el > 1 : el > 4 && s.k !== k0 && s.p === cel || n === 0 && el > 3 && s.p === cel;
      if (dojechala) { if (n) wyn.push(el); dalej(); }
      else if (el > 240) koniec(L.aktm);
      else if (this._ak) out.textContent = n === 0 ? L.ak0 : n === 1 ? L.ak1(el.toFixed(1)) : L.ak2(wyn[0].toFixed(1), el.toFixed(1));
    }, 200);
    dalej();
  }
  _kalOk() {
    if (!this._kalT) return;
    clearInterval(this._kalI);
    this._kalWyn = Math.round((performance.now() - this._kalT) / 100) / 10; this._kalT = null;
    const r = this._r, L = RR_ED[this._lang];
    r.querySelector('#kalV').textContent = L.kwyn(this._kalWyn);
    r.querySelector('#kalOk').disabled = true; r.querySelector('#kalZap').hidden = false;
  }
  _demo() {   // pokaz: opuść do końca, potem zwiń do połowy
    const ids = Object.keys(this._m);
    ids.forEach(id => this._m[id].target = 0); this._feed();
    clearTimeout(this._dt);
    const t = rrCzas(this._val('czas'), this._rpm()[0]);
    this._dt = setTimeout(() => { ids.forEach(id => this._m[id].target = 50); this._feed(); }, t * 1000 * .7 + 800);
  }
  _sync() {
    if (!this._r) return;
    const r = this._r, kol = this._val('kolor'), rama = this._val('rama');
    r.querySelectorAll('.dot[data-g="kolor"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === kol));
    r.querySelectorAll('.dot[data-g="rama"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === rama));
    r.querySelectorAll('.dot[data-g="siatka"]').forEach(b => b.setAttribute('aria-pressed', b.dataset.v === (this._val('siatka') || '')));
    /* v20: własny kolor podświetlony, gdy wartości nie ma w palecie; nazwa wybranego koloru przy tytule; wybrany na środek linii */
    ['kolor', 'siatka', 'rama'].forEach(g => {
      const v = g === 'siatka' ? this._val(g) || '' : this._val(g), sel = [...r.querySelectorAll(`.dot[data-g="${g}"]`)].find(b => b.dataset.v === v);
      const own = r.querySelector(`[data-own="${g}"]`); own.setAttribute('aria-pressed', !sel);
      own.querySelector('.own').style.background = sel ? '' : rrHex(v);
      r.querySelector(`[data-kn="${g}"]`).textContent = '· ' + (sel ? sel.title : (/^#/.test(v) ? v : RR_ED[this._lang].own));
      const el = sel || own, sl = r.querySelector(`[data-psl="${g}"]`);
      if (sel && r.activeElement !== sl) sl.value = [...r.querySelectorAll(`.dot[data-g="${g}"]`)].indexOf(sel);
      if (this._kn?.[g] !== v) { (this._kn = this._kn || {})[g] = v; const d = el.parentElement; d.scrollTo({ left: el.offsetLeft - d.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' }); }
    });
    r.querySelector('#kolOwn').value = /^#[0-9a-f]{6}$/i.test(rrHex(kol)) ? rrHex(kol) : '#232427';
    r.querySelector('#ramOwn').value = /^#[0-9a-f]{6}$/i.test(rama) ? rama : '#f4f4f2';
    r.querySelectorAll('[data-sk]').forEach(b => b.setAttribute('aria-pressed', +b.dataset.sk === +this._val('skrzydla')));
    r.querySelectorAll('[data-osl]').forEach(b => b.setAttribute('aria-pressed', b.dataset.osl === this._val('oslona')));
    r.querySelector('#oslD').textContent = this._L.osld[Math.max(0, RR_OSLONY.indexOf(this._val('oslona')))];
    r.querySelectorAll('[data-sl]').forEach(b => b.setAttribute('aria-pressed', b.dataset.sl === this._val('slupek')));
    r.querySelector('#slGrp').style.display = +this._val('skrzydla') === 1 ? 'none' : '';
    const set = (id, v, txt) => { const el = r.querySelector('#' + id); if (r.activeElement !== el) el.value = v; r.querySelector('#' + id + 'V').textContent = txt; };
    set('wys', this._val('wysokosc'), this._val('wysokosc') + ' px');
    set('uch', this._val('kat_uchyl'), this._val('kat_uchyl') + '°');
    set('otw', this._val('otwarcie'), this._val('otwarcie') + ' %');
    if (r.activeElement !== r.querySelector('#poz')) r.querySelector('#poz').value = this._val('pozycje');
    set('kr', this._val('krok'), +this._val('krok') > 0 ? '▲▼ ' + this._val('krok') + ' %' : RR_ED[this._lang].kr0);
    const auto = this._val('czas') === 'auto';
    r.querySelector('#auto').checked = auto;
    r.querySelector('#czasBox').style.display = auto ? 'none' : '';
    if (!auto) set('czas', this._val('czas'), this._val('czas') + ' s');
    const rpm = this._rpm().filter(x => x > 0);
    const L = RR_ED[this._lang];
    r.querySelector('#obrH').textContent = rpm.length
      ? L.obr([...new Set(rpm)].join(', '), rrCzas(this._val('czas'), rpm[0]).toFixed(1)) + (auto ? L.obrM : '')
      : L.obr0 + (auto ? (rrUcz.get(this._cfg.entity) ? L.obrU(rrUcz.get(this._cfg.entity).toFixed(1)) : L.obrA) : '.');
    RR_PRZEL.forEach(k => { r.querySelector('#' + k).checked = !!this._val(k); });
    r.querySelectorAll('[data-jz]').forEach(b => b.setAttribute('aria-pressed', b.dataset.jz === this._val('jezyk')));
    r.querySelectorAll('[data-wx]').forEach(b => b.setAttribute('aria-pressed', b.dataset.wx === (this._wx || '')));
    /* v21: co karta wykryła sama */
    const czA = this._val('auto_czujniki') !== false ? rrCzujnikiAuto(this._hass, this._cfg.entity) : [];
    const nz = id => this._hass.states[id]?.attributes?.friendly_name || id;
    r.querySelector('#czA').textContent = czA.filter(Boolean).length ? L.czA(czA.map(x => x ? nz(x) : '–').join(' / ')) : L.czA0;
    r.querySelectorAll('[data-okp]').forEach(b => b.setAttribute('aria-pressed', b.dataset.okp === (this._okp || '')));
  }
}
