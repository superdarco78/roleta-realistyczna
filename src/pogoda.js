import { rrLos } from './los.js';

/* pogoda HA → wygląd nieba */
export const RR_WX = { sunny: 'sun', 'clear-night': 'sun', partlycloudy: 'partly', cloudy: 'cloudy', exceptional: 'cloudy', fog: 'fog',
  rainy: 'rain', pouring: 'pour', hail: 'pour', lightning: 'storm', 'lightning-rainy': 'storm', snowy: 'snow', 'snowy-rainy': 'sleet',
  windy: 'wind', 'windy-variant': 'wind' };
export const RR_NIEBO = {   // [dzień, noc]
  sun: ['#4f9be3,#9fd0f5 60%,#e3f2fc', '#08112b,#1b2a52'], partly: ['#6aa6dc,#b7d8f0 60%,#e2eef7', '#0d1630,#24304f'],
  cloudy: ['#8e9ba7,#c3ccd4', '#151b27,#2b3242'], wind: ['#7f9db8,#c4d3df', '#121a2a,#283247'], fog: ['#a9b2b9,#d6dbde', '#1f242b,#3a4048'],
  rain: ['#5c6874,#8f9aa4', '#10151d,#262d38'], pour: ['#48525c,#737e88', '#0c1017,#1f252e'], storm: ['#2f363e,#59626b', '#07090d,#1a1f27'],
  snow: ['#a7b3be,#e3e8ec', '#1b2230,#3a4352'], sleet: ['#7d8893,#b5bec6', '#141a24,#2f3744']
};
/* rysowany widok za oknem (v14) – współrzędne 200×80, lewe skrzydło widzi 0–100, prawe 100–200 */
export const RR_DOMY = [[8, 34, 22, '#c9a27e', '#8c3b2e'], [36, 46, 18, '#d8c8a8', '#5d4a3c'], [60, 30, 26, '#b8bfc6', '#4a5560'],
  [112, 40, 20, '#e0d2b6', '#8c3b2e'], [140, 28, 24, '#c7b39a', '#6b4a32'], [170, 42, 20, '#bcc6cc', '#4a5560']];
export const RR_LAMPY = [78, 124];
export const RR_DRZEWA = [[3, 9], [30, 8], [55, 10], [92, 11], [104, 9], [134, 8], [164, 10], [195, 9]];
export function rrWidok(typ, noc, i, n, pora) {
  const snieg = typ === 'snow' || typ === 'sleet', mokro = ['rain', 'pour', 'storm', 'sleet'].includes(typ);
  const wiatr = typ === 'wind' || typ === 'storm' || typ === 'pour';
  const szaro = { cloudy: .82, fog: .85, rain: .7, pour: .6, storm: .5, sleet: .7, wind: .9, snow: .92 }[typ] || 1;
  const filtr = pora === 'zmierzch' ? 'brightness(.55) saturate(.7) hue-rotate(-12deg)' : noc ? 'brightness(.38) saturate(.6) hue-rotate(10deg)'
    : pora === 'zloto' ? `brightness(${szaro * .95}) sepia(.3) saturate(1.25)` : `brightness(${szaro}) saturate(${szaro})`;
  const vb = n > 1 ? `${i ? 100 : 0} 0 100 80` : '0 0 200 80';
  const pa = (n > 1 ? (i ? 'xMinYMax' : 'xMaxYMax') : 'xMidYMax') + ' slice';   // skrzydła stykają się przy słupku – widok ciągły
  const g = [];
  g.push(`<path d="M0 52 Q30 38 60 48 T120 44 T200 50 V80 H0Z" fill="${snieg ? '#e8eef2' : '#7fa86a'}"/>`);
  g.push(`<path d="M0 60 Q50 52 100 58 T200 56 V80 H0Z" fill="${snieg ? '#f4f7f9' : '#6a9a58'}"/>`);
  RR_DOMY.forEach(([x, y, w, sc, da]) => {
    g.push(`<rect x="${x}" y="${y}" width="${w}" height="${66 - y}" fill="${sc}"/>`);
    g.push(`<path d="M${x - 2} ${y} L${x + w / 2} ${y - w * .45} L${x + w + 2} ${y}Z" fill="${da}"/>`);
    if (snieg) g.push(`<path d="M${x - 2} ${y} L${x + w / 2} ${y - w * .45} L${x + w + 2} ${y} L${x + w} ${y - 1.5} L${x + w / 2} ${y - w * .45 + 2} L${x} ${y - 1.5}Z" fill="#fff"/>`);
    for (let r = y + 4; r < 60; r += 9) for (let c = x + 3; c < x + w - 4; c += 8) g.push(`<rect class="okn" x="${c}" y="${r}" width="4" height="5" fill="#9fb7c9"/>`);
  });
  RR_DRZEWA.forEach(([x, r]) => {
    g.push(`<g class="${wiatr ? 'drz' : ''}" style="transform-origin:${x}px 66px;animation-delay:-${(x % 7) / 3}s"><rect x="${x - 1}" y="${66 - r}" width="2" height="${r}" fill="#5b4030"/>`
      + `<circle cx="${x}" cy="${66 - r}" r="${r * .6}" fill="${snieg ? '#dfe8e4' : '#3f7f3a'}"/><circle cx="${x - r * .35}" cy="${66 - r * .7}" r="${r * .45}" fill="${snieg ? '#cfdcd6' : '#357235'}"/></g>`);
  });
  g.push(`<rect x="0" y="66" width="200" height="14" fill="${snieg ? '#e9eef1' : mokro ? '#3c4248' : '#6c6f73'}"/>`);
  g.push(`<rect x="0" y="72" width="200" height="1" fill="${snieg ? '#fff' : '#d8d8d0'}" opacity=".5"/>`);
  if (mokro) for (let k = 0; k < 12; k++) g.push(`<rect x="${k * 17 + 4}" y="${68 + (k % 3) * 3}" width="7" height=".6" fill="#9fb1c0" opacity=".6"/>`);
  RR_LAMPY.forEach(x => g.push(`<rect x="${x - .7}" y="46" width="1.4" height="20" fill="#30343a"/><rect x="${x - 3.5}" y="45" width="7" height="1.6" rx=".8" fill="#30343a"/>`));
  /* światła nocą – osobna warstwa bez przyciemnienia */
  const sw = [];
  if (noc) {
    RR_DOMY.forEach(([x, y, w], d) => {
      let k = 0;
      for (let r = y + 4; r < 60; r += 9) for (let c = x + 3; c < x + w - 4; c += 8) if ((d * 7 + k++ * 3) % 5 < 3) sw.push(`<rect x="${c}" y="${r}" width="4" height="5" fill="#ffd27a"/>`);
    });
    RR_LAMPY.forEach(x => sw.push(`<circle cx="${x}" cy="47.5" r="9" fill="url(#rrlamp)"/><circle cx="${x}" cy="47" r="1.6" fill="#fff4c8"/>`
      + `<ellipse cx="${x}" cy="70" rx="14" ry="3" fill="#ffd27a" opacity="${mokro ? .45 : .25}"/>`));
  }
  return `<svg class="scn" viewBox="${vb}" preserveAspectRatio="${pa}" style="filter:${filtr}">${g.join('')}</svg>`
    + (sw.length ? `<svg class="scn" viewBox="${vb}" preserveAspectRatio="${pa}"><defs><radialGradient id="rrlamp"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>${sw.join('')}</svg>` : '');
}
/* przyciemnienie zdjęcia zza okna wg pogody (v12) */
export const RR_TINT = { sun: 0, partly: .06, wind: .18, cloudy: .32, fog: 0, rain: .4, pour: .5, storm: .6, snow: 0, sleet: .38 };
/* pogoda z internetu (v16) – kody WMO z Open-Meteo → stany pogody HA; jedna kopia na całą stronę */
export const RR_OM = { t: 0, data: null, busy: false, cb: new Set() };
export function rrWmo(k, dzien, wiatr) {
  const s = k === 0 ? (dzien ? 'sunny' : 'clear-night') : k <= 2 ? 'partlycloudy' : k === 3 ? 'cloudy' : k <= 48 ? 'fog'
    : k <= 63 || k === 80 || k === 81 ? 'rainy' : k === 65 || k === 82 ? 'pouring' : k <= 67 ? 'snowy-rainy'
    : k <= 77 || k === 85 || k === 86 ? 'snowy' : k === 95 ? 'lightning-rainy' : k >= 96 ? 'hail' : 'cloudy';
  return wiatr > 40 && ['sunny', 'partlycloudy', 'cloudy'].includes(s) ? (s === 'cloudy' ? 'windy-variant' : 'windy') : s;
}
export function rrInternet(hass, cb) {
  const lat = hass?.config?.latitude, lon = hass?.config?.longitude;
  if (lat == null || lon == null) return null;
  if (Date.now() - RR_OM.t < 15 * 60000) return RR_OM.data;
  RR_OM.cb.add(cb);
  if (!RR_OM.busy) {
    RR_OM.busy = true;
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,is_day,wind_speed_10m`)
      .then(r => r.json()).then(j => {
        const c = j.current;
        RR_OM.data = { state: rrWmo(c.weather_code, c.is_day, c.wind_speed_10m), attributes: { temperature: c.temperature_2m, temperature_unit: '°C', zrodlo: 'internet' } };
      }).catch(() => {}).finally(() => { RR_OM.t = Date.now(); RR_OM.busy = false; RR_OM.cb.forEach(f => f()); RR_OM.cb.clear(); });
  }
  return RR_OM.data;
}
export function rrPogoda(typ, noc, i, foto, n, widok, pora) {
  const h = [], dark = ['rain', 'pour', 'storm', 'sleet'].includes(typ);
  if (noc && ['sun', 'partly', 'wind'].includes(typ))
    for (let k = 0; k < 16; k++) h.push(`<i class="st" style="left:${rrLos(4, 96)}%;top:${rrLos(4, 80)}%;animation-delay:-${rrLos(0, 4)}s;animation-duration:${rrLos(2, 5)}s"></i>`);
  if (!foto && !(n > 1 && i === 0) && (typ === 'sun' || typ === 'partly' || typ === 'wind')) h.push(noc ?   // jedno słońce/księżyc na całe okno
    `<i class="moon" style="${i ? 'left:22%' : 'right:20%'}"></i>` : `<i class="sun${pora === 'zloto' ? ' zl' : ''}" style="${i ? 'left:16%' : 'right:14%'}"></i>`);
  const nc = { sun: 0, partly: 2, wind: 3, cloudy: 4, fog: 2, rain: 4, pour: 5, storm: 5, snow: 4, sleet: 4 }[typ] || 0;
  const kol = noc ? (dark ? '#2a303a' : '#3b4354') : typ === 'storm' ? '#4c535b' : typ === 'pour' ? '#6b747c' : dark ? '#8b949c' : typ === 'partly' || typ === 'wind' ? '#ffffff' : '#e4e8eb';
  const czas = typ === 'wind' ? [9, 15] : [40, 75];
  for (let k = 0; k < nc; k++) {
    const d = rrLos(...czas);
    h.push(`<i class="cl" style="top:${rrLos(-4, 78)}%;width:${rrLos(45, 75)}%;background:${kol};opacity:${rrLos(.8, .97).toFixed(2)};animation-duration:${d}s;animation-delay:-${rrLos(0, d)}s"></i>`);
  }
  if (!foto && widok) h.push(rrWidok(typ, noc, i, n, pora));
  if (typ === 'fog') for (let k = 0; k < 4; k++) h.push(`<i class="fog" style="top:${15 + k * 22}%;animation-duration:${rrLos(14, 24)}s;animation-delay:-${rrLos(0, 10)}s"></i>`);
  const dr = { rain: 22, pour: 40, storm: 34, sleet: 14 }[typ] || 0;
  for (let k = 0; k < dr; k++) h.push(`<i class="dr" style="left:${rrLos(-5, 105)}%;animation-duration:${rrLos(typ === 'pour' ? .45 : .6, typ === 'pour' ? .65 : .9).toFixed(2)}s;animation-delay:-${rrLos(0, 1).toFixed(2)}s"></i>`);
  const fl = { snow: 26, sleet: 10 }[typ] || 0;
  for (let k = 0; k < fl; k++) { const z = rrLos(2, 5).toFixed(1); h.push(`<i class="fl" style="left:${rrLos(0, 100)}%;width:${z}px;height:${z}px;animation-duration:${rrLos(5, 10).toFixed(1)}s;animation-delay:-${rrLos(0, 10).toFixed(1)}s"></i>`); }
  if (typ === 'storm') h.push(`<i class="fla"></i>`);
  const g = RR_NIEBO[typ] || RR_NIEBO.sun;
  if (foto) {   // zdjęcie: jedno przez oba skrzydła (lewe pokazuje lewą część, prawe prawą), na nim pogoda
    const t = RR_TINT[typ] || 0, w = typ === 'fog' ? 'rgba(228,232,235,.55)' : typ === 'snow' ? 'rgba(225,232,238,.3)' : `rgba(40,48,58,${t})`;
    const nc = noc ? 'linear-gradient(rgba(4,8,28,.72),rgba(10,16,40,.6)),' : '';
    const poz = n > 1 ? (i ? 'right' : 'left') + ' center/auto 100%' : 'center/cover';
    return { bg: `${nc}linear-gradient(${w},${w}),url("${foto}") ${poz} no-repeat`, html: h.join('') };
  }
  const jasno = ['sun', 'partly', 'wind'].includes(typ);
  const niebo = pora === 'zloto' && jasno ? '#4a62a8,#e98a5c 70%,#fcc77c' : pora === 'zmierzch' ? (jasno ? '#141d48,#5c4a8c 60%,#d8766a' : '#1b2033,#4b4560 70%,#7a5f66') : g[noc ? 1 : 0];
  return { bg: `linear-gradient(180deg,${niebo})`, html: h.join('') };
}
