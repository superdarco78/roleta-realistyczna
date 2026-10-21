import pl from '../translations/pl.json';
import en from '../translations/en.json';

/* Tłumaczenia: translations/<język>.json. Teksty z {0}, {1} stają się funkcjami: L.obr(40, 30) → „… 40 … 30 …” */
const rrFn = v => typeof v === 'string' && /\{\d\}/.test(v) ? (...a) => v.replace(/\{(\d)\}/g, (_, i) => a[i] ?? '')
  : Array.isArray(v) ? v.map(rrFn) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rrFn(x)])) : v;
export const RR_JEZYKI = { pl: rrFn(pl), en: rrFn(en) };
export const RR_TXT = { pl: RR_JEZYKI.pl.karta, en: RR_JEZYKI.en.karta };
export const RR_ED = { pl: RR_JEZYKI.pl.edytor, en: RR_JEZYKI.en.edytor };
export const RR_KOL_NAZWY = { pl: RR_JEZYKI.pl.kolory, en: RR_JEZYKI.en.kolory };

/* język: wybrany w karcie, a „auto” = język profilu użytkownika HA (polski albo angielski dla pozostałych) */
export const rrJezyk = (c, hass) => c?.jezyk === 'pl' || c?.jezyk === 'en' ? c.jezyk : String(hass?.locale?.language || hass?.language || navigator.language || 'pl').startsWith('pl') ? 'pl' : 'en';
