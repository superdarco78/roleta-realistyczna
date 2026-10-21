import { RR_WERSJA, RR_DEF, RR_KASETA, RR_LISTWA, RR_OKRES, rrWysOkna, RR_OSL_IKONY } from './stale.js';
import { RR_RAMY, rrHex } from './kolory.js';
import { rrCzas, rrUcz } from './silnik.js';
import { RR_WX, rrInternet, rrPogoda } from './pogoda.js';
import { RR_TXT, rrJezyk } from './jezyk.js';
import { rrRpm, rrCzujnikiAuto, rrPogodaId, rrKandydaci } from './wykrywanie.js';
import { RR_G, rrGlobLoad } from './globalne.js';
import { rrKartaStyl } from './karta-styl.js';

/* Karta: okno z roletą dzień-noc, animacja w tempie silnika, pogoda za oknem, kontaktrony */
export class RoletaRealistyczna extends HTMLElement {
  static getStubConfig(hass) {
    const e = rrKandydaci(hass, 'cover')[0]?.id;   // v23: najlepiej dopasowana roleta (najpierw grupa = okno 2-skrzydłowe)
    return { entity: e || 'cover.roleta' };
  }
  static getConfigElement() { return document.createElement('okno-ha-editor'); }

  setConfig(cfg) {
    if (!cfg || !cfg.entity) throw new Error('Wybierz encję rolety (cover.*)');
    this._raw = cfg;
    this._cfg = Object.assign({}, RR_DEF, RR_G.v || {}, cfg);
    this._built = false; this._sh = [];
    if (this._hass) this._render();
  }
  set hass(h) {
    this._hass = h;
    if (!this._gok) { this._gok = 1; rrGlobLoad(h).then(() => { if (this._raw) this.setConfig(this._raw); }); }
    this._render();
  }
  getCardSize() { return Math.ceil(rrWysOkna(this._cfg || {}, +this._cfg?.skrzydla === 1 ? 1 : 2) / 50) + 2; }
  getGridOptions() { return { columns: 12, min_columns: 6, rows: 'auto' }; }
  disconnectedCallback() { cancelAnimationFrame(this._raf); this._raf = null; this._szum(false); if (this._gl) window.removeEventListener('rr-glob', this._gl); }
  connectedCallback() {
    if (this._built) this._tick();
    this._gl = this._gl || (() => { if (this._raw) this.setConfig(this._raw); });
    window.addEventListener('rr-glob', this._gl);
  }

  _pos(st, goal) {
    let p = st?.attributes?.current_position;
    if (typeof p !== 'number') return st?.state === 'closed' ? 0 : 100;
    if (this._cfg.odwroc) p = 100 - p;
    /* silniki Zigbee czasem meldują „open” z 0% – to błąd meldunku, pomijamy go (null = bez zmian) */
    /* Moes: „open 0%” / „closed 100%” to zwykle stara pozycja w chwili ruszenia – chyba że silnik właśnie tam jechał */
    if (st.state === 'open' && p === 0 && goal !== 0) return null;
    if (st.state === 'closed' && p === 100 && goal !== 100) return null;
    /* v10: w trakcie jazdy do celu silnik potrafi meldować skrajne 0/100 – to nie jest prawda */
    if (goal !== undefined && (p === 0 || p === 100) && p !== goal) return null;
    return p;
  }
  /* v26: cichy szum silnika z WebAudio – włącza się przy ruchu po kliknięciu, gaśnie, gdy roleta stanie */
  _szum(on) {
    try {
      if (!on) { if (this._au) { const { ctx, g } = this._au; g.gain.setTargetAtTime(0, ctx.currentTime, .08); setTimeout(() => ctx.close(), 400); this._au = null; } return; }
      if (this._au) return;
      const ctx = new (window.AudioContext || window.webkitAudioContext)(), o = ctx.createOscillator(), o2 = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.value = 92; o2.type = 'sine'; o2.frequency.value = 184; f.type = 'lowpass'; f.frequency.value = 420;
      g.gain.value = 0; o.connect(f); o2.connect(f); f.connect(g); g.connect(ctx.destination); o.start(); o2.start();
      g.gain.setTargetAtTime(.035, ctx.currentTime, .1);
      this._au = { ctx, g };
    } catch (x) { this._au = null; }   // przeglądarka bez dźwięku
  }
  _call(svc, ent, data) {
    ent = ent || this._cfg.entity;
    /* animacja startuje od razu i jedzie w tempie silnika (1:1), bo te silniki nie zgłaszają ruchu w trakcie */
    const target = svc === 'open_cover' ? 100 : svc === 'close_cover' ? 0 : svc === 'set_cover_position' ? data.position : null;
    const now = performance.now();
    (this._mem || []).forEach((m, i) => {
      const o = this._sh[i]; if (!o || (ent !== this._cfg.entity && ent !== m)) return;
      o.catch = null; o.auto = null;
      const cz = o.czas || rrCzas(this._cfg.czas, 0);
      o.rest = null;
      if (target === null) { o.target = o.shown; o.last = Math.round(o.shown); o.cmd = null; o.rest = { p: o.last, t: now + Math.max(60, cz * 2) * 1000 }; }   // po STOP silnik też melduje bzdury
      else {
        o.target = target;
        /* t1 = kiedy silnik powinien dojechać; t = koniec czekania na meldunek (potem wierzymy komendzie) */
        o.cmd = { p: target, t1: now + (Math.abs(target - o.shown) / 100 * cz + 3) * 1000, t: now + (cz * 2 + 10) * 1000 };
      }
    });
    this._tick();
    if (this._cfg.dzwiek) this._szum(true);   // v26: dźwięk silnika (tylko po kliknięciu – przeglądarka pozwala grać po geście)
    if (this._cfg.wibracja !== false) try { navigator.vibrate?.(12); } catch (x) { /* telefon bez wibracji */ }   // v18: lekkie „pyk” pod palcem
    let d = data || {};
    if (svc === 'set_cover_position' && this._cfg.odwroc) d = { position: 100 - d.position };
    this._hass.callService('cover', svc, Object.assign({ entity_id: ent }, d));
  }
  /* encje skrzydeł: członkowie grupy, a jak to nie grupa – ta sama encja */
  _members() {
    const st = this._hass.states[this._cfg.entity];
    const n = +this._cfg.skrzydla === 1 ? 1 : 2;
    const m = (st?.attributes?.entity_id || []).filter(e => this._hass.states[e]);
    const out = [];
    for (let i = 0; i < n; i++) out.push(m.length ? m[Math.min(i, m.length - 1)] : this._cfg.entity);
    /* v17: rolety skrzydeł wybrane ręcznie mają pierwszeństwo */
    const wyb = [this._cfg.roleta_lewa, this._cfg.roleta_prawa];
    return out.map((e, i) => wyb[i] && this._hass.states[wyb[i]] ? wyb[i] : e);
  }

  _build(n) {
    const c = this._cfg, col = rrHex(c.kolor), H = rrWysOkna(c, n), rama = c.rama, T = this._t;
    /* v19: okleina drewnopodobna = delikatne słoje na ramie i skrzydłach */
    const sloje = RR_RAMY[rama]?.[2] ? 'repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 4px,rgba(255,255,255,.05) 4px 5px,transparent 5px 9px),repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 5px,rgba(255,255,255,.04) 5px 6px,transparent 6px 11px)' : '';
    const ruch = n > 1 && c.slupek === 'ruchomy';
    const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
    root.innerHTML = '';
    const card = document.createElement('ha-card');
    const sash = i => `
  <div class="slot"><div class="out"><div class="osky"></div><div class="wx owx"></div></div><div class="sash" data-i="${i}">
   <div class="glass"><div class="sky"></div><div class="wx"></div>
    <div class="refl"></div>
    <div class="fabric"></div><i class="ray"></i><div class="bar"></div>
    <div class="cas"></div>
    <div class="ghost"><span></span></div>
    <div class="mv"><ha-icon></ha-icon></div>
   </div>
   ${c.klamki !== false ? '<div class="handle"></div>' : ''}
  </div></div>`;
    card.innerHTML = `
<style>${rrKartaStyl({ H, n, sloje, rama, col, c })}</style>
<div class="rr">
 <div class="hd"><ha-icon icon="${RR_OSL_IKONY[c.oslona] || RR_OSL_IKONY.zebra}"></ha-icon>
  <div><div><span class="nm"></span><span class="ver">${RR_WERSJA}</span></div><div class="sb"></div></div><div class="pc"></div></div>
 <div class="win ${ruch ? 'ruch' : 'stal'}">${Array.from({ length: n }, (_, i) => sash(i)).join('')}${n > 1 && c.uchwyt_srodek !== false ? `<div class="mid" title="${T.oba}"><svg viewBox="0 0 24 24"><path d="M12,2L7,7H11V17H7L12,22L17,17H13V7H17L12,2Z"/></svg></div>` : ''}</div>
 <div class="bt">
  <button class="up" title="${T.up}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stop" title="${T.stop}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="down" title="${T.down}"><ha-icon icon="mdi:arrow-down"></ha-icon></button>
 </div>
 ${+c.krok > 0 ? `<div class="qk kr"><button data-k="1">▲ ${+c.krok}%</button><button data-k="-1">▼ ${+c.krok}%</button></div>` : ''}
 <div class="qk">${String(c.pozycje ?? '100,75,50,25,0').split(/[,; ]+/).map(Number).filter(x => x >= 0 && x <= 100 && String(x) !== '').slice(0, 7)
   .map(x => `<button data-p="${x}">${x === 100 ? T.open : x === 0 ? T.closed : x + '%'}</button>`).join('')}</div>
</div>`;
    root.appendChild(card);
    const q = s => card.querySelector(s);
    this._el = {
      nm: q('.nm'), sb: q('.sb'), pc: q('.pc'),
      up: q('.up'), stop: q('.stop'), down: q('.down'), qk: card.querySelectorAll('.qk button'),
      bt: q('.bt'), qkw: q('.qk'),
      sash: [...card.querySelectorAll('.sash')].map(s => ({
        root: s, glass: s.querySelector('.glass'), sky: s.querySelector('.sky'), wx: s.querySelector('.glass .wx'), osky: s.parentElement.querySelector('.osky'), owx: s.parentElement.querySelector('.owx'),
        fabric: s.querySelector('.fabric'), bar: s.querySelector('.bar'),
        ghost: s.querySelector('.ghost'), gl: s.querySelector('.ghost span'), mv: s.querySelector('.mv'), mvi: s.querySelector('.mv ha-icon')
      }))
    };
    const E = this._el;
    E.up.onclick = () => this._call('open_cover');
    E.down.onclick = () => this._call('close_cover');
    E.stop.onclick = () => this._call('stop_cover');
    E.qk.forEach(b => b.dataset.p && (b.onclick = () => this._call('set_cover_position', null, { position: +b.dataset.p })));
    /* ruch krokowy (v18): każde kliknięcie = mały krok od miejsca, do którego roleta właśnie jedzie (kliknięcia się sumują) */
    card.querySelectorAll('[data-k]').forEach(b => b.onclick = () => {
      const sh = this._sh.filter(Boolean), base = sh.length ? sh.reduce((a, o) => a + o.target, 0) / sh.length : 50;
      this._call('set_cover_position', null, { position: Math.max(0, Math.min(100, Math.round(base + b.dataset.k * c.krok))) });
    });
    if (!c.przyciski) { E.bt.style.display = 'none'; E.qkw.style.display = 'none'; }
    if (c.uchwyty === false) card.classList.add('bezuch');
    /* jak mocno uchylone (stopnie) i jak szeroko otwarte (% szerokości → kąt: szczelina = 1 − cos) */
    card.style.setProperty('--rr-uch', Math.min(30, Math.max(3, +c.kat_uchyl || 14)));
    card.style.setProperty('--rr-otw', Math.round(Math.acos(1 - Math.min(90, Math.max(5, +c.otwarcie || 40)) / 100) * 180 / Math.PI));
    E.mid = q('.mid');
    E.sash.forEach((s, i) => this._drag(s, i));
    if (E.mid) this._drag({ root: E.mid, glass: E.sash[0].glass, mid: true }, 0);
    this._n = n; this._built = true;
  }

  /* górna krawędź listwy dolnej dla pozycji p (100 = zwinięta) */
  _barTop(gh, p) { return RR_KASETA - 2 + (gh - RR_KASETA - RR_LISTWA - 7 + 2) * (100 - p) / 100; }
  _yToPos(s, y) {
    const r = s.glass.getBoundingClientRect(), gh = r.height;
    const f = Math.min(1, Math.max(0, (y - r.top - RR_KASETA) / (gh - RR_KASETA - RR_LISTWA - 7)));
    return Math.round(100 - f * 100);
  }
  _drag(s, i) {
    let on = false, y0 = 0, val = null;
    const el = s.root;
    let solo = false;
    el.addEventListener('pointerdown', e => {
      /* uchwyt na listwie = tylko to skrzydło; uchwyt środkowy = oba; reszta szyby wg opcji „osobno” */
      solo = !s.mid && (this._cfg.osobno || (this._cfg.uchwyty !== false && e.composedPath().includes(s.bar)));
      on = true; this._dr = true; y0 = e.clientY; val = null; el.setPointerCapture?.(e.pointerId); e.stopPropagation();
    });
    el.addEventListener('pointermove', e => {
      if (!on) return;
      if (val === null && Math.abs(e.clientY - y0) < 6) return;
      val = this._yToPos(s, e.clientY);
      const gh = s.glass.getBoundingClientRect().height;
      (solo ? [s] : this._el.sash).forEach(x => {
        x.ghost.style.display = 'block'; x.ghost.style.top = (this._barTop(gh, val) + RR_LISTWA) + 'px'; x.gl.textContent = val + '%';
      });
    });
    const end = () => {
      if (!on) return; on = false; this._dr = false;
      this._el.sash.forEach(x => x.ghost.style.display = 'none');
      if (val !== null) this._call('set_cover_position', solo ? this._mem[i] : null, { position: val });
      else if (!s.mid) this._tap(solo ? this._mem[i] : null, i);   // samo dotknięcie = stop / w drugą stronę
    };
    el.addEventListener('pointerup', end); el.addEventListener('pointercancel', end);
  }

  /* jeden przycisk jak w pilocie (v16): jedzie → stop; stoi → w przeciwną stronę niż ostatnio */
  _tap(ent, i) {
    const o = this._sh[i]; if (!o) return;
    const jedzie = Math.abs(o.target - o.shown) > .5;
    if (jedzie) { this._kier = o.target > o.shown ? 'up' : 'down'; this._call('stop_cover', ent); return; }
    const kier = o.shown >= 99.5 ? 'down' : o.shown <= .5 ? 'up' : this._kier === 'up' ? 'down' : 'up';
    this._kier = kier;
    this._call(kier === 'up' ? 'open_cover' : 'close_cover', ent);
  }
  _render() {
    if (!this._hass || !this._cfg) return;
    const c = this._cfg, st = this._hass.states[c.entity];
    const mem = this._members();
    const lang = rrJezyk(c, this._hass);
    if (lang !== this._lang) { this._lang = lang; this._t = RR_TXT[lang]; this._built = false; }
    const T = this._t;
    if (!this._built || this._n !== mem.length) this._build(mem.length);
    this._mem = mem;
    const E = this._el;
    if (!st) { E.nm.textContent = c.name || c.entity; E.sb.textContent = T.brak; return; }
    let pos = this._pos(st); const s = st.state;
    if (pos === null) pos = this._gpos ?? (s === 'open' ? 100 : 0);
    this._gpos = pos;
    let sb = T[s] || s;
    if (s === 'open' && pos > 0 && pos < 100) sb = T.czesc;
    E.nm.textContent = c.name || st.attributes.friendly_name || c.entity;
    /* pogoda za oknem (v8) */
    const wid = c.zrodlo === 'auto' || !c.zrodlo ? rrPogodaId(c, this._hass) : null;
    /* bez encji pogody w HA – pogoda z internetu (Open-Meteo) dla lokalizacji domu */
    const ws = !c.niebo || c.zrodlo === 'brak' ? null : wid && this._hass.states[wid] ? this._hass.states[wid] : rrInternet(this._hass, () => this._render());
    const WX = T.wx || {};
    if (ws && WX[ws.state]) {
      const t = ws.attributes?.temperature;
      sb += ' · ' + WX[ws.state] + (typeof t === 'number' ? ' ' + Math.round(t) + (ws.attributes.temperature_unit || '°C') : '');
    }
    /* kontaktrony okna (v15) */
    const okno = [0, 1].map(k => {
      if (this._czAc !== c.entity) { this._czAc = c.entity; this._czA = rrCzujnikiAuto(this._hass, c.entity); }   // v21: raz na encję
      const id = c[k ? 'czujnik_prawe' : 'czujnik_lewe'] || (c.auto_czujniki !== false && this._czA[k]), st2 = id && this._hass.states[id];
      return st2 && st2.state === 'on' ? (c[k ? 'tryb_prawe' : 'tryb_lewe'] === 'otworz' ? 'otw' : 'uchyl') : '';
    });
    okno.forEach((t, k) => { if (t && k < mem.length) sb += ` · ${T.okno} ${mem.length > 1 ? (k ? T.prawe : T.lewe) : ''}${t === 'otw' ? T.otw : T.uchyl}`; });
    E.sb.textContent = sb;
    E.pc.textContent = pos + '%';
    E.up.disabled = pos >= 100 && s !== 'closing';
    E.down.disabled = pos <= 0 && s !== 'opening';
    E.qk.forEach(b => b.dataset.p && b.classList.toggle('on', +b.dataset.p === pos && s !== 'opening' && s !== 'closing'));
    /* pora dnia z wysokości słońca (v16): dzien / zloto (wschód, zachód) / zmierzch / noc */
    const sun = this._hass.states['sun.sun'], el = sun?.attributes?.elevation;
    const night = sun?.state === 'below_horizon' || (!sun && ws?.state === 'clear-night');
    const pora = night ? (typeof el === 'number' && el > -7 ? 'zmierzch' : 'noc') : typeof el === 'number' && el < 8 ? 'zloto' : 'dzien';
    const typ = !c.niebo ? 'plain' : ws ? (RR_WX[ws.state] || 'cloudy') : 'sun', wkey = typ + pora + (c.tlo || '') + (c.widok !== false);
    /* v26: promienie słońca – dzień, słońce albo małe chmurki, rysowane niebo */
    const slonce = c.promienie !== false && !night && pora !== 'zmierzch' && (typ === 'sun' || typ === 'partly');
    mem.forEach((e, i) => {
      const S = E.sash[i], ms = this._hass.states[e] || st, mst = ms.state;
      const o0 = this._sh[i];
      /* v10: każdy meldunek silnika bierzemy pod uwagę tylko raz (gdy się pojawi), potem już nie wraca */
      const now = performance.now();
      const raw = ms.attributes?.current_position;
      const stamp = (ms.last_updated || '') + '|' + mst + '|' + raw;
      let mp = null;
      const spoko = o0 && o0.rest && now < o0.rest.t ? o0.rest.p : undefined;   // po dojechaniu silnik jeszcze chwilę „śmieci” 0/100
      if (o0 && stamp !== o0.stamp) mp = this._pos(ms, o0.cmd ? o0.cmd.p : o0.auto ? o0.auto.p : spoko);
      if (!o0) mp = typeof raw === 'number' ? (c.odwroc ? 100 - raw : raw) : (mst === 'open' ? 100 : 0);
      S.root.classList.toggle('slonce', slonce);
      S.root.classList.toggle('uchyl', okno[i] === 'uchyl'); S.root.classList.toggle('otw', okno[i] === 'otw');
      /* za otwartym/uchylonym skrzydłem widać to, co za oknem – ta sama pogoda i widok */
      const okey = okno[i] ? wkey : '';
      if (S.okey !== okey) { S.okey = okey; S.osky.style.background = okey && S.w ? S.w.bg : ''; S.owx.innerHTML = okey && S.w ? S.w.html : ''; }
      if (S.wkey !== wkey) {   // przebudowa nieba tylko gdy zmieni się pogoda albo pora dnia
        S.wkey = wkey;
        if (typ === 'plain') { S.sky.className = 'sky plain'; S.sky.style.background = ''; S.wx.innerHTML = ''; S.root.parentElement.style.background = ''; }
        else {
          const w = rrPogoda(typ, night, i, c.tlo, mem.length, c.widok !== false, pora); S.sky.className = 'sky'; S.sky.style.background = w.bg; S.wx.innerHTML = w.html;
          S.w = w; if (okno[i]) { S.okey = wkey; S.osky.style.background = w.bg; S.owx.innerHTML = w.html; }
          S.root.parentElement.style.background = w.bg;   // to widać za otwartym skrzydłem
        }
      }
      const moving = mst === 'opening' || mst === 'closing';
      S.mv.style.display = moving ? 'flex' : 'none';
      if (moving) {
        S.mvi.setAttribute('icon', mst === 'opening' ? 'mdi:chevron-double-up' : 'mdi:chevron-double-down');
        S.mvi.style.setProperty('--rr-dy', mst === 'opening' ? '-3px' : '3px');
      }
      const o = o0 || (this._sh[i] = { shown: mp, target: mp, last: mp });
      o.stamp = stamp;
      /* prędkość silnika Moes: number.<nazwa>_motor_speed (obr/min) → czas przejazdu tego skrzydła */
      const rpm = rrRpm(this._hass, e, c[i ? 'predkosc_prawa' : 'predkosc_lewa']);
      o.czas = rrCzas(c.czas, rpm, rrUcz.get(e));
      if (o0 && mp !== null) {
        /* meldunek daleko od celu, zanim silnik mógł dojechać = stara pozycja z chwili ruszenia – pomijamy */
        if (o.cmd && (now < o.cmd.t1 - 5000 || Math.abs(mp - o.cmd.p) > 10 && now < o.cmd.t1)) mp = null;   // za wcześnie na prawdziwy meldunek
        else { if (o.cmd || o.auto) o.rest = { p: mp, t: now + Math.max(60, o.czas * 2) * 1000 }; o.last = mp; o.cmd = null; o.auto = null; if (Math.abs(mp - o.shown) > .5) o.catch = mp; }   // prawdziwy meldunek – dociągnij
      }
      /* zmiana stanu bez nowej pozycji = silnik właśnie ruszył (Moes melduje pozycję dopiero na końcu) */
      if (mp === null && o.st !== undefined && mst !== o.st && !o.cmd && spoko === undefined && (mst === 'open' || mst === 'closed')) {
        const goal = mst === 'open' ? 100 : 0;
        if (Math.round(o.shown) !== goal) o.auto = { p: goal, t: now + (o.czas * 1.5 + 5) * 1000 };
      }
      /* v18: karta sama uczy się czasu przejazdu z prawdziwych ruchów (rolety, które meldują „otwiera/zamyka się”) */
      const jedzie = mst === 'opening' || mst === 'closing';
      if (jedzie && !o.ucz) o.ucz = { t: now, p: o.last };
      if (!jedzie && o.ucz) {
        const rp = typeof raw === 'number' ? (c.odwroc ? 100 - raw : raw) : null, dp = rp === null ? 0 : Math.abs(rp - o.ucz.p), dt = (now - o.ucz.t) / 1000;
        if (dp >= 30 && dt > 2) { const v = dt * 100 / dp, u = rrUcz.get(e); rrUcz.set(e, u ? u * .6 + v * .4 : v); }
        o.ucz = null;
      }
      o.st = mst;
      /* brak wiarygodnego meldunku do końca czekania – wierzymy komendzie */
      if (o.auto && now > o.auto.t) { o.last = o.auto.p; o.auto = null; }
      if (o.cmd && now > o.cmd.t) { o.last = o.cmd.p; o.rest = { p: o.cmd.p, t: now + 60000 }; o.cmd = null; }
      o.target = o.cmd ? o.cmd.p : o.auto ? o.auto.p : mst === 'opening' ? 100 : mst === 'closing' ? 0 : o.last;
    });
    this._tick();
  }

  /* płynna animacja: meldunki silnika = szybkie dociągnięcie, między nimi ruch w tempie silnika */
  _tick() {
    const speed = 100 / rrCzas(this._cfg.czas, 0);
    this._paint();
    if (this._raf) return;
    let last = performance.now();
    const step = now => {
      const dt = Math.min(.1, (now - last) / 1000); last = now;
      let busy = false;
      this._sh.forEach(o => {
        /* najpierw szybkie dociągnięcie do ostatniego meldunku silnika, potem dalej w tempie silnika do celu */
        const goal = o.catch != null ? o.catch : o.target;
        const d = goal - o.shown;
        if (Math.abs(d) < .2) { o.shown = goal; if (o.catch != null) { o.catch = null; busy = true; } return; }
        busy = true;
        const sp = o.czas ? 100 / o.czas : speed;
        const v = o.catch != null ? Math.max(sp, Math.abs(d) * 6) : sp;
        o.shown += Math.sign(d) * Math.min(Math.abs(d), v * dt);
      });
      this._paint();
      this._raf = busy ? requestAnimationFrame(step) : null;
      if (!busy) this._szum(false);
    };
    this._raf = requestAnimationFrame(step);
  }
  _paint() {
    /* nagłówek: gdzie roleta jest teraz (animacja) i dokąd jedzie */
    const sh = this._sh.filter(Boolean);
    if (sh.length) {
      const cel = sh.find(o => o.cmd && Math.abs(o.shown - o.cmd.p) > .5);
      this._el.pc.textContent = Math.round(sh.reduce((x, o) => x + o.shown, 0) / sh.length) + '%' + (cel ? ' → ' + cel.cmd.p + '%' : '');
    }
    this._el.sash.forEach((S, i) => {
      const o = this._sh[i]; if (!o) return;
      const gh = S.glass.clientHeight || rrWysOkna(this._cfg, this._n) - 26;
      if (!this._dr) {   // linia celu zostaje, aż roleta dojedzie
        const g = o.cmd && Math.abs(o.shown - o.cmd.p) > .5 ? o.cmd.p : null;
        if (g === null) S.ghost.style.display = 'none';
        else { S.ghost.style.display = 'block'; S.ghost.style.top = (this._barTop(gh, g) + RR_LISTWA) + 'px'; S.gl.textContent = '→ ' + g + '%'; }
      }
      const bt = this._barTop(gh, o.shown), fh = Math.max(0, bt - (RR_KASETA - 2));
      S.fabric.style.height = fh + 'px';
      S.bar.style.top = bt + 'px';
      S.bt = S.root.parentElement.offsetTop + S.root.offsetTop + S.glass.offsetTop + bt + RR_LISTWA / 2;
      /* pasy przyklejone do dolnej listwy – zwijają się razem z materiałem i zawsze stoją równo */
      S.fabric.style.backgroundPosition = `0 0,0 ${fh % RR_OKRES}px,0 ${fh % RR_OKRES}px`;
    });
    const E = this._el;   // środkowy uchwyt jedzie na średniej wysokości listew
    if (E.mid && E.sash.every(S => S.bt != null)) E.mid.style.top = (E.sash.reduce((x, S) => x + S.bt, 0) / E.sash.length + 8) + 'px';
  }
}
