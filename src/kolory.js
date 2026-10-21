/* Kolory: tkaniny dzień-noc, kolory i okleiny ram, rozjaśnianie / przyciemnianie */
export const RR_KOLORY = {
  czarny: '#232427', grafit: '#3a3d42', szary: '#6d7076', bezowy: '#bfae94', kremowy: '#e6dcc8',
  bialy: '#efefec', braz: '#5a4030', granat: '#25324d', pomaranczowy: '#fc9907',
  /* v19: tkaniny dzień-noc jak w kolekcjach producentów */
  piaskowy: '#d9c7a4', cappuccino: '#a88c72', mokka: '#6f5544', wenge: '#3d2f28', popiel: '#a9aaa6', srebrny: '#c4c6c8', stalowy: '#4f5a66',
  lawendowy: '#b9a8d6', pudrowy: '#e4b9b9', mietowy: '#a9dcc6', blekitny: '#9cc6e6', morski: '#1d6f7a', butelkowy: '#1f4d3a', musztardowy: '#c99a1a', terakota: '#b9583a', sliwkowy: '#5b2c4a',
  /* v18: jaskrawe */
  czerwony: '#e02424', bordo: '#7a1f2b', rozowy: '#ff4f9a', fiolet: '#8a3ffc', niebieski: '#1e6ff2', turkus: '#00b3b3',
  zielony: '#22a447', limonka: '#9bd426', zolty: '#ffd000', oliwka: '#6b7a3a'
};
/* kolory ram (v19): popularne kolory i okleiny okien PCV; trzeci element = okleina drewnopodobna (słoje) */
export const RR_RAMY = { '#f4f4f2': ['biała', 'white'], '#d8d2c6': ['kremowa', 'cream'], '#a3a6a8': ['szary agat', 'agate grey'], '#b9bdc1': ['srebrna', 'silver'],
  '#6e7378': ['szara', 'grey'], '#3b3f45': ['antracyt', 'anthracite'], '#1f2124': ['czarna', 'black'], '#28402f': ['zielona', 'green'], '#2b3a55': ['granatowa', 'navy'],
  '#8a5a3b': ['złoty dąb', 'golden oak', 1], '#b39370': ['dąb jasny', 'light oak', 1], '#a26a43': ['winchester', 'winchester', 1],
  '#c9cbcc': ['jasnoszara', 'light grey'], '#6d6c66': ['szary kwarc', 'quartz grey'], '#4a4d50': ['bazaltowa', 'basalt grey'], '#5d1f23': ['bordowa', 'burgundy'],
  '#c49a5c': ['sosna', 'pine', 1], '#9d8064': ['dąb sheffield', 'sheffield oak', 1], '#9b6a3c': ['oregon', 'oregon', 1], '#6d4a33': ['siena', 'siena', 1],
  '#5a3a26': ['orzech', 'walnut', 1], '#6a2e22': ['mahoń', 'mahogany', 1], '#3e3830': ['dąb bagienny', 'bog oak', 1], '#6b4a32': ['brąz', 'brown'] };

export function rrHex(c) { return RR_KOLORY[c] || c || RR_KOLORY.czarny; }
export function rrShade(hex, p) {
  let h = String(hex).replace('#', '');
  if (h.length === 3) h = h.split('').map(x => x + x).join('');
  const n = parseInt(h, 16); if (isNaN(n)) return hex;
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const f = p < 0 ? 0 : 255, t = Math.abs(p);
  r = Math.round((f - r) * t + r); g = Math.round((f - g) * t + g); b = Math.round((f - b) * t + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
export function rrRgba(hex, a) {
  const h = rrShade(hex, 0).replace('#', ''), n = parseInt(h, 16);
  return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`;
}
/* v37: napis na kolorze motywu (głównym, akcencie) – biały albo czarny, zależnie od jasności koloru z profilu HA */
const RR_PROBNIK = typeof document !== 'undefined' ? document.createElement('canvas').getContext('2d') : null;
function rrNaKolorze(kolor) {
  if (!RR_PROBNIK || !kolor) return '';
  RR_PROBNIK.fillStyle = '#000'; RR_PROBNIK.fillStyle = kolor.trim();
  const m = /^#([0-9a-f]{6})$/i.exec(RR_PROBNIK.fillStyle); if (!m) return '';
  const [r, g, b] = [0, 2, 4].map(i => { const c = parseInt(m[1].slice(i, i + 2), 16) / 255; return c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; });
  return .2126 * r + .7152 * g + .0722 * b > .4 ? '#212121' : '#fff';
}
export function rrKontrast(el) {
  if (!el || !el.isConnected) return;
  const s = getComputedStyle(el), g = rrNaKolorze(s.getPropertyValue('--primary-color')), a = rrNaKolorze(s.getPropertyValue('--accent-color'));
  if (g && el.style.getPropertyValue('--rr-na-glownym') !== g) el.style.setProperty('--rr-na-glownym', g);
  if (a && el.style.getPropertyValue('--rr-na-akcencie') !== a) el.style.setProperty('--rr-na-akcencie', a);
}
