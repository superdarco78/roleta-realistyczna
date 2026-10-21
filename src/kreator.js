import { RR_PRESETY, RR_DEF, RR_OSLONY, RR_OSL_GRUPY } from './stale.js';
import { RR_RAMY, rrHex } from './kolory.js';
import { rrCzas } from './silnik.js';
import { RR_JEZYKI, RR_KOL_NAZWY } from './jezyk.js';
import { rrKandydaci, rrNazwa, rrObszar, rrObszarNazwa, rrRpmId, rrRpm, rrCzujnikiAuto, rrPogodaId } from './wykrywanie.js';
import { rrBiezacyPanel, rrPanele, rrKonfigPanelu, rrDodajDoPanelu, rrSprawdzInstalacje, rrNumerWersji } from './panele.js';

/* v23: kreator dla początkujących – 7 kroków, w każdym „co” i „po co”, wykrywanie urządzeń z rankingiem,
   ścisłe filtry encji, gotowe podpowiedzi „co zrobić”, gdy czegoś brakuje, i wybór panelu na końcu.
   Wygląd jak HA: ha-alert, ha-selector, ha-icon, kolory motywu. */
export const RR_KROKI = [
  { k: 'roleta', ic: 'mdi:roller-shade' }, { k: 'okno', ic: 'mdi:window-closed-variant' }, { k: 'silnik', ic: 'mdi:speedometer' },
  { k: 'czujniki', ic: 'mdi:window-open-variant' }, { k: 'pogoda', ic: 'mdi:weather-partly-cloudy' }, { k: 'wyglad', ic: 'mdi:palette' },
  { k: 'gdzie', ic: 'mdi:view-dashboard-edit' }];
const RR_IKONY = { cover: 'mdi:roller-shade', number: 'mdi:speedometer', binary_sensor: 'mdi:window-open-variant', weather: 'mdi:weather-partly-cloudy' };
const esc = s => String(s ?? '').replace(/[&<>"]/g, z => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[z]);

export class RrKreator {
  constructor(ed, el) { this.ed = ed; this.el = el; this.n = 0; }
  get W() { return RR_JEZYKI[this.ed._lang].kreator; }
  get T() { return RR_JEZYKI[this.ed._lang].karta; }
  get h() { return this.ed._hass; }
  get c() { return this.ed._cfg; }
  get otwarty() { return !this.el.hidden; }

  otworz(n = 0) { this.el.hidden = false; this.pokaz(n); }
  zamknij() { this.el.hidden = true; }
  /* dynamicznie: gdy w HA pojawi się nowe urządzenie albo zmieni się stan wybranych encji, krok rysuje się od nowa */
  _klucz() {
    const h = this.h, s = id => id ? h.states[id]?.state : '';
    return [Object.keys(h.states).length, Object.keys(h.entities || {}).length, s(this.c.entity), s(rrPogodaId(this.c, h)),
      ...this._skrzydla().map(x => s(x.cover) + s(rrRpmId(h, x.cover, this.c[x.i ? 'predkosc_prawa' : 'predkosc_lewa'])))].join('|');
  }
  odswiez() {
    if (!this.otwarty || this._klucz() === this._k) return;
    const a = this.ed._r?.activeElement;
    if (a && this.el.contains(a) && a.tagName !== 'BUTTON') return;   // ktoś coś wpisuje – nie przeszkadzamy
    this.pokaz(this.n);
  }
  /* skrzydła: roleta każdego skrzydła (wybrana ręcznie albo z grupy) */
  _skrzydla() {
    const c = this.c, h = this.h, n = +this.ed._val('skrzydla') === 1 ? 1 : 2;
    const m = (h.states[c.entity]?.attributes?.entity_id || []).filter(e => h.states[e]);
    return Array.from({ length: n }, (_, i) => {
      const auto = m.length ? m[Math.min(i, m.length - 1)] : c.entity, wyb = c[i ? 'roleta_prawa' : 'roleta_lewa'];
      return { i, auto, cover: wyb && h.states[wyb] ? wyb : auto, members: m };
    });
  }
  _etykieta(i, n) { const W = this.W; return n < 2 ? W.skJ : i ? W.skP : W.skL; }

  pokaz(n) {
    const W = this.W, K = RR_KROKI;
    this.n = n = Math.max(0, Math.min(K.length - 1, n));
    const s = K[n], T = W.kroki[s.k], ost = n === K.length - 1;
    this.el.innerHTML = `
<div class="wzh"><ha-icon icon="mdi:auto-fix"></ha-icon><b>${W.tytul}</b><span>${W.krok(n + 1, K.length)}</span><button class="wzx" title="${W.zamknij}">✕</button></div>
<div class="wzs">${K.map((x, i) => `<button class="wzd${i === n ? ' on' : i < n ? ' ok' : ''}" data-wn="${i}" title="${esc(W.kroki[x.k].t)}"><ha-icon icon="${x.ic}"></ha-icon></button>`).join('<i></i>')}</div>
<div class="wzt"><ha-icon icon="${s.ic}"></ha-icon><h3>${T.t}</h3></div>
<div class="wzc"><p><b>${W.co}</b> ${T.co}</p><p><b>${W.poco}</b> ${T.poco}</p></div>
<div class="wzb"></div>
<div class="wzn"><button class="wb sec" data-wa="-1"${n ? '' : ' hidden'}>${W.wstecz}</button><span></span><button class="wb" data-wa="${ost ? 'x' : '1'}">${ost ? W.gotowe : W.dalej}</button></div>`;
    const q = x => this.el.querySelector(x);
    q('.wzx').onclick = () => this.zamknij();
    this.el.querySelectorAll('[data-wn]').forEach(b => b.onclick = () => this.pokaz(+b.dataset.wn));
    this.el.querySelectorAll('[data-wa]').forEach(b => b.onclick = () => b.dataset.wa === 'x' ? this.zamknij() : this.pokaz(n + +b.dataset.wa));
    const dalej = q('[data-wa="1"]');
    if (dalej && n === 0 && !this.h.states[this.c.entity]) dalej.disabled = true;
    this['_k_' + s.k](q('.wzb'));
    this._k = this._klucz();
  }

  /* ---------- klocki ---------- */
  _alert(typ, txt, akcje = []) {
    return `<ha-alert alert-type="${typ}">${esc(txt)}${akcje.map(([t, p]) => ` <button class="wb sm sec" slot="action" data-open="${esc(p)}">${esc(t)}</button>`).join('')}</ha-alert>`;
  }
  _html(box, html) {
    box.insertAdjacentHTML('beforeend', html);
    box.querySelectorAll('[data-open]').forEach(b => b.onclick = () => {
      if (b.dataset.open === 'reload') location.reload(); else window.open(b.dataset.open, '_blank');   // nowa karta – edytor zostaje otwarty
    });
  }
  _seg(box, opcje, wart, cb) {
    const d = document.createElement('div'); d.className = 'seg';
    d.innerHTML = opcje.map(([v, t]) => `<button data-v="${esc(v)}" aria-pressed="${String(v) === String(wart)}">${esc(t)}</button>`).join('');
    d.querySelectorAll('button').forEach(b => b.onclick = () => cb(b.dataset.v));
    box.appendChild(d);
  }
  _stan(id) {
    const st = this.h.states[id], W = this.W, T = this.T; if (!st) return '';
    if (st.state === 'unavailable' || st.state === 'unknown') return W.niedost;
    const d = id.split('.')[0], a = st.attributes || {};
    if (d === 'binary_sensor') return st.state === 'on' ? W.otwarte : W.zamkniete;
    if (d === 'number') return st.state + (a.unit_of_measurement ? ' ' + a.unit_of_measurement : '');
    if (d === 'weather') return (T.wx?.[st.state] || st.state) + (typeof a.temperature === 'number' ? ' ' + Math.round(a.temperature) + (a.temperature_unit || '°C') : '');
    if (d === 'cover') return (T[st.state] || st.state) + (typeof a.current_position === 'number' ? ' ' + a.current_position + '%' : '');
    return st.state;
  }
  /* lista podpowiedzi: najlepsze dopasowania na górze (z powodami), reszta pasujących w ha-selector „Inna” */
  _lista(box, { rola, ref, wart, auto, pusty, etykieta, wybor, ile = 4 }) {
    const W = this.W, h = this.h, K = rrKandydaci(h, rola, ref), ef = wart || auto || '';
    const top = K.slice(0, ile);
    if (ef && h.states[ef] && !top.some(x => x.id === ef)) top.unshift(K.find(x => x.id === ef) || { id: ef, sc: 0, why: [] });
    const d = document.createElement('div'); d.className = 'wzp';
    const wiersz = (x, i) => {
      const ob = rrObszarNazwa(h, x.id), st = this._stan(x.id);
      return `<button data-id="${esc(x.id)}" aria-pressed="${x.id === ef}"><ha-icon icon="${RR_IKONY[x.id.split('.')[0]] || 'mdi:help-circle'}"></ha-icon><span>
        <span class="wzn1">${esc(rrNazwa(h, x.id))}${i === 0 && x.sc > 0 && K.length > 1 ? ` <em>★ ${W.najlepsze}</em>` : ''}${x.id === auto && !wart ? ` <em class="au">✓ ${W.auto}</em>` : ''}</span>
        <small>${esc(x.id)}${ob ? ' · ' + esc(ob) : ''}${st ? ' · ' + esc(st) : ''}</small>
        ${x.why.length ? `<span class="wzw">${x.why.map(w => `<b>${esc(W.why[w] || w)}</b>`).join('')}</span>` : ''}</span></button>`;
    };
    d.innerHTML = `${etykieta ? `<div class="lb">${esc(etykieta)}</div>` : ''}<div class="wzl">${top.map(wiersz).join('')}`
      + `${pusty ? `<button data-id="" aria-pressed="${!ef}"><ha-icon icon="mdi:close-circle-outline"></ha-icon><span><span class="wzn1">${esc(pusty)}</span></span></button>` : ''}</div>`;
    d.querySelectorAll('[data-id]').forEach(b => b.onclick = () => wybor(b.dataset.id));
    if (K.length > top.length) {
      const p = document.createElement('p'); p.className = 'hint'; p.textContent = W.inne(K.length); d.appendChild(p);
      const s = document.createElement('ha-selector');
      s.hass = h; s.selector = { entity: { include_entities: K.map(x => x.id) } };
      s.label = W.inna; s.value = top.some(x => x.id === ef) ? '' : ef;
      s.addEventListener('value-changed', e => { if (e.detail.value) wybor(e.detail.value); });
      d.appendChild(s);
    }
    box.appendChild(d);
    return K;
  }
  _ustaw(zm) { Object.entries(zm).forEach(([k, v]) => this.ed._set(k, v)); this.pokaz(this.n); }

  /* ---------- krok 1: roleta ---------- */
  _k_roleta(B) {
    const W = this.W, h = this.h, c = this.c;
    this._instalacja(B);
    const K = rrKandydaci(h, 'cover');
    if (!K.length) { this._html(B, this._alert('error', W.brakRolet, [[W.btnIntegr, '/config/integrations/dashboard']])); return; }
    this._html(B, `<p class="hint">${esc(W.znaleziono(K.length))}</p>`);
    this._lista(B, { rola: 'cover', wart: h.states[c.entity] ? c.entity : '', wybor: id => {
      if (!id) return;
      const g = (h.states[id]?.attributes?.entity_id || []).length;
      this._ustaw({ entity: id, roleta_lewa: '', roleta_prawa: '', ...(g >= 2 ? { skrzydla: 2 } : {}) });
    } });
    const st = h.states[c.entity];
    if (!st) { this._html(B, this._alert('info', W.wybierz)); return; }
    const nm = rrNazwa(h, c.entity), g = (st.attributes?.entity_id || []).length;
    if (st.state === 'unavailable') this._html(B, this._alert('warning', W.niedostepna(nm)));
    else if (g >= 2) this._html(B, this._alert('success', W.grupaOk(g)));
    if (!g && st.state !== 'unavailable' && !(st.attributes?.supported_features & 4)) this._html(B, this._alert('info', W.bezPoz(nm)));
    this._html(B, this._alert('info', W.jezyk(W.jezykNazwa)));
  }
  /* czy karta jest aktualna i dodana raz w zasobach */
  _instalacja(B) {
    const W = this.W, box = document.createElement('div'); box.className = 'wzb'; B.appendChild(box);
    rrSprawdzInstalacje(this.h).then(w => {
      if (!box.isConnected) return;
      if (w.najnowsza && rrNumerWersji(w.najnowsza) > rrNumerWersji(w.wersja))
        this._html(box, this._alert('warning', W.verNowa(w.najnowsza, w.wersja), [[W.btnHacs, '/hacs/dashboard'], [W.btnPrzeladuj, 'reload']]));
      else this._html(box, this._alert('success', W.verOk(w.wersja)));
      if (w.zasoby > 1) this._html(box, this._alert('warning', W.zasobyDup(w.zasoby), [[W.btnZasoby, '/config/lovelace/resources']]));
    });
  }

  /* ---------- krok 2: okno i skrzydła ---------- */
  _k_okno(B) {
    const W = this.W, h = this.h, c = this.c, n = +this.ed._val('skrzydla') === 1 ? 1 : 2;
    this._seg(B, [[1, W.sk1], [2, W.sk2]], n, v => this._ustaw({ skrzydla: +v }));
    const sk = this._skrzydla(), grupa = sk[0].members.length;
    if (n === 2 && !grupa) this._html(B, this._alert('info', W.jednaNaDwa, [[W.btnPomocnicy, '/config/helpers']]));
    if (n === 2) sk.forEach(x => this._lista(B, { rola: 'skrzydlo', etykieta: this._etykieta(x.i, n),
      ile: 3, ref: { members: x.members, side: x.i, area: rrObszar(h, c.entity) }, wart: c[x.i ? 'roleta_prawa' : 'roleta_lewa'], auto: x.auto,
      wybor: id => this._ustaw({ [x.i ? 'roleta_prawa' : 'roleta_lewa']: id === x.auto ? '' : id }) }));
  }

  /* ---------- krok 3: prędkość silnika ---------- */
  _k_silnik(B) {
    const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), n = sk.length;
    let ile = 0;
    sk.forEach(x => {
      const pole = x.i ? 'predkosc_prawa' : 'predkosc_lewa', rpm = rrRpm(h, x.cover, c[pole]);
      const nm = n > 1 ? this._etykieta(x.i, n) : rrNazwa(h, x.cover);
      if (rpm > 0) this._html(B, this._alert('success', W.rpmOk(nm, rpm, rrCzas('auto', rpm).toFixed(1))));
      const K = this._lista(B, { rola: 'speed', etykieta: n > 1 ? this._etykieta(x.i, n) : '', ref: { cover: x.cover, side: n > 1 ? x.i : undefined },
        wart: c[pole], auto: rrRpmId(h, x.cover), wybor: v => this._ustaw({ [pole]: v === rrRpmId(h, x.cover) ? '' : v }) });
      ile += K.length;
      if (K.length && !(rpm > 0)) this._html(B, this._alert('info', W.rpmBrak(nm)));
      if (!K.length) B.lastChild.remove();
    });
    if (!ile) this._html(B, this._alert('info', W.rpmZadnej));
    if (!sk.some(x => rrRpm(h, x.cover, c[x.i ? 'predkosc_prawa' : 'predkosc_lewa']) > 0)) {
      const d = document.createElement('div'); d.className = 'wzb';
      d.innerHTML = `<div class="kal"><button class="wb">${W.kal}</button></div><p class="hint"></p><p class="hint">${esc(this.ed._L.akh)}</p>`;
      const btn = d.querySelector('button');
      btn.onclick = () => this.ed._akal(btn, d.querySelector('p'), W.kal);
      B.appendChild(d);
    }
  }

  /* ---------- krok 4: kontaktrony ---------- */
  _k_czujniki(B) {
    const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), n = sk.length, L = this.ed._L;
    if (!rrKandydaci(h, 'contact').length) { this._html(B, this._alert('info', W.czBrak)); return; }
    const area = rrObszar(h, c.entity), dev = h.entities?.[c.entity]?.device_id;
    if (!area) this._html(B, this._alert('warning', W.czBezPom, [[W.btnUrz, dev ? '/config/devices/device/' + dev : '/config/entities']]));
    const auto = c.auto_czujniki !== false ? rrCzujnikiAuto(h, c.entity) : [];
    if (auto.some(Boolean) && !c.czujnik_lewe && !c.czujnik_prawe) this._html(B, this._alert('success', W.czAuto));
    sk.forEach(x => {
      const pole = x.i ? 'czujnik_prawe' : 'czujnik_lewe', tryb = x.i ? 'tryb_prawe' : 'tryb_lewe';
      this._lista(B, { rola: 'contact', etykieta: this._etykieta(x.i, n), ile: 3, ref: { cover: x.cover, area, side: n > 1 ? x.i : undefined },
        wart: c[pole], auto: auto[x.i], pusty: W.bez,
        wybor: v => this._ustaw(v ? { [pole]: v } : { [pole]: '', ...(auto[x.i] ? { auto_czujniki: false } : {}) }) });
      if (c[pole] || auto[x.i]) {
        this._html(B, `<p class="hint">${esc(W.tryb)}</p>`);
        this._seg(B, L.tr, this.ed._val(tryb), v => this._ustaw({ [tryb]: v }));
      }
    });
  }

  /* ---------- krok 5: pogoda ---------- */
  _k_pogoda(B) {
    const W = this.W, h = this.h, c = this.c, zr = this.ed._val('zrodlo');
    const lok = h.config?.latitude != null && h.config?.longitude != null;
    this._seg(B, W.zr, zr, v => this._ustaw({ zrodlo: v }));
    if (zr === 'brak') { this._html(B, this._alert('info', W.wxNic)); return; }
    if (zr === 'auto') {
      const auto = rrPogodaId({ pogoda: 'auto' }, h), K = rrKandydaci(h, 'weather');
      if (!K.length) this._html(B, this._alert('info', W.wxBrak));
      else {
        this._lista(B, { rola: 'weather', wart: c.pogoda && c.pogoda !== 'auto' ? c.pogoda : '', auto, wybor: v => this._ustaw({ pogoda: v === auto ? 'auto' : v }) });
        const wid = rrPogodaId(c, h), st = h.states[wid];
        if (!st || st.state === 'unavailable') this._html(B, this._alert('warning', W.wxNiedost(rrNazwa(h, wid))));
        else this._html(B, this._alert('success', W.wxTeraz(this._stan(wid))));
        if (st && st.state !== 'unavailable') return;
      }
    }
    if (!lok) this._html(B, this._alert('warning', W.wxBezLok, [[W.btnOgolne, '/config/general']]));
  }

  /* ---------- krok 6: wygląd i nazwa ---------- */
  _k_wyglad(B) {
    const W = this.W, L = this.ed._L, P = RR_PRESETY;
    this._html(B, `<div class="lb">${esc(L.osl)}</div>`);
    for (const [g, typy] of Object.entries(RR_OSL_GRUPY)) {
      this._html(B, `<div class="osg">${esc(g === 'wew' ? L.osw : L.osz)}</div>`);
      this._seg(B, typy.map(v => [v, L.osln[RR_OSLONY.indexOf(v)]]), this.ed._val('oslona'), v => this._ustaw({ oslona: v }));
      B.lastElementChild.classList.add('osl');
    }
    this._html(B, `<p class="hint">${esc(L.osld[Math.max(0, RR_OSLONY.indexOf(this.ed._val('oslona')))])}</p>`);
    const d = document.createElement('div'); d.className = 'wzl';
    d.innerHTML = P.map((p, i) => `<button data-wp="${i}" aria-pressed="${this.ed._val('rama') === p.rama && this.ed._val('kolor') === p.kolor}"><span class="sw2" style="background:linear-gradient(135deg,${p.rama} 50%,${rrHex(p.kolor)} 50%)"></span><span><span class="wzn1">${esc(L.pre[i])}</span></span></button>`).join('');
    d.querySelectorAll('[data-wp]').forEach(b => b.onclick = () => { const p = P[+b.dataset.wp]; this._ustaw({ rama: p.rama, kolor: p.kolor, siatka: p.siatka ?? '' }); });
    B.appendChild(d);
    const s = document.createElement('ha-selector');
    s.hass = this.h; s.selector = { text: {} }; s.label = W.nazwa; s.value = this.c.name || '';
    s.addEventListener('value-changed', e => this.ed._set('name', e.detail.value || ''));
    B.appendChild(s);
    this._html(B, `<p class="hint">${esc(W.podglad)}</p>`);
  }

  /* ---------- krok 7: podsumowanie i miejsce karty ---------- */
  _k_gdzie(B) {
    const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), ri = this.ed._lang === 'en' ? 1 : 0;
    const pkt = [];
    const st = h.states[c.entity];
    pkt.push([st && st.state !== 'unavailable' ? '✅' : '⚠️', W.pRoleta(rrNazwa(h, c.entity))]);
    pkt.push(['✅', W.pSk(sk.length > 1 ? sk.map(x => rrNazwa(h, x.cover)).join(' / ') : W.sk1)]);
    const rpm = sk.map(x => rrRpm(h, x.cover, c[x.i ? 'predkosc_prawa' : 'predkosc_lewa'])).filter(x => x > 0);
    pkt.push(rpm.length ? ['✅', W.pSil([...new Set(rpm)].join(' / ') + ' ' + W.obr)] : ['ℹ️', W.pSilU]);
    const auto = c.auto_czujniki !== false ? rrCzujnikiAuto(h, c.entity) : [];
    const cz = sk.map(x => c[x.i ? 'czujnik_prawe' : 'czujnik_lewe'] || auto[x.i]).filter(Boolean);
    pkt.push(cz.length ? ['✅', W.pCz(cz.map(x => rrNazwa(h, x)).join(' / '))] : ['ℹ️', W.pCzB]);
    const zr = this.ed._val('zrodlo'), wid = zr === 'auto' ? rrPogodaId(c, h) : null;
    pkt.push(zr === 'brak' ? ['ℹ️', W.pWxB] : wid && h.states[wid] ? ['✅', W.pWx(rrNazwa(h, wid) + ' – ' + this._stan(wid))] : ['✅', W.pWxI]);
    const rama = this.ed._val('rama'), kol = this.ed._val('kolor');
    pkt.push(['✅', W.pWyg(RR_RAMY[rama]?.[ri] || rama, RR_KOL_NAZWY[this.ed._lang][kol] || kol)]);
    this._html(B, `<div class="lb">${W.pods}</div><ul class="wzi">${pkt.map(([i, t]) => `<li>${i} ${esc(t)}</li>`).join('')}</ul>`);
    this._instalacja(B);
    this._html(B, `<div class="lb">${W.gdzieT}</div>` + this._alert('success', W.tutaj));
    if (!h.user?.is_admin) { this._html(B, this._alert('info', W.bezAdmina)); return; }
    this._html(B, `<p class="hint">${esc(W.tez)}</p>`);
    const box = document.createElement('div'); box.className = 'wzg'; box.innerHTML = `<p class="hint">${esc(W.wczytuje)}</p>`; B.appendChild(box);
    this._panele(box);
  }
  async _panele(box) {
    const W = this.W, h = this.h, biez = rrBiezacyPanel();
    const lista = await rrPanele(h);
    if (!box.isConnected) return;
    const nazwa = d => d.url_path ? d.title || d.url_path : W.domyslny;
    const opcje = lista.map((d, i) => ({ value: String(i), label: nazwa(d) + (d.url_path === biez ? W.tenPanel : d.mode === 'yaml' ? W.yaml : ''), disabled: d.url_path === biez || d.mode === 'yaml' }));
    box.innerHTML = '';
    const wyb = { d: opcje.find(o => !o.disabled)?.value, v: 'nowy' };
    const sel = (label, opts, value, cb) => {
      const s = document.createElement('ha-selector');
      s.hass = h; s.label = label; s.selector = { select: { mode: 'dropdown', options: opts } }; s.value = value;
      s.addEventListener('value-changed', e => cb(e.detail.value)); return s;
    };
    const vBox = document.createElement('div'), btn = document.createElement('button'), out = document.createElement('p');
    btn.className = 'wb'; btn.textContent = W.dodaj; out.className = 'hint';
    const widoki = async () => {
      vBox.innerHTML = ''; btn.disabled = true;
      const d = lista[+wyb.d]; if (!d) return;
      let cfg = null; try { cfg = await rrKonfigPanelu(h, d.url_path); } catch (x) { /* panel bez zapisanej konfiguracji */ }
      const vs = cfg && !cfg.strategy ? (cfg.views || []) : null;
      if (!vs) { out.textContent = nazwa(d) + W.autoPanel; return; }
      const opts = [{ value: 'nowy', label: W.nowyWidok }, ...vs.map((v, i) => ({ value: String(i), label: (v.title || v.path || '#' + (i + 1)) + (v.type === 'panel' || v.strategy ? W.widokPanel : ''), disabled: v.type === 'panel' || !!v.strategy }))];
      wyb.v = 'nowy';
      vBox.appendChild(sel(W.widok, opts, wyb.v, v => { wyb.v = v; }));
      btn.disabled = false;
    };
    box.appendChild(sel(W.panel, opcje, wyb.d, v => { wyb.d = v; out.textContent = ''; widoki(); }));
    box.append(vBox, btn, out);
    btn.onclick = async () => {
      const d = lista[+wyb.d]; btn.disabled = true;
      const karta = Object.assign({ type: 'custom:okno-ha' }, this.c);
      try {
        const v = await rrDodajDoPanelu(h, d.url_path, wyb.v === 'nowy' ? 'nowy' : +wyb.v, karta, W.nowyTytul);
        out.textContent = W.dodano(nazwa(d), v.title || v.path);
        await widoki();
      } catch (e) { out.textContent = W.blad(e.message || e); btn.disabled = false; }
    };
    if (wyb.d != null) widoki(); else out.textContent = '';
  }
}

export const rrKreatorPotrzebny = c => !Object.keys(c).some(k => k !== 'type' && k !== 'entity' && !(k in RR_DEF && c[k] === RR_DEF[k]));
