import pl from '../translations/pl.json';
import en from '../translations/en.json';
import de from '../translations/de.json';
import fr from '../translations/fr.json';
import es from '../translations/es.json';
import it from '../translations/it.json';
import nl from '../translations/nl.json';
import cs from '../translations/cs.json';
import sk from '../translations/sk.json';
import uk from '../translations/uk.json';
import ru from '../translations/ru.json';
import pt from '../translations/pt.json';
import zh_hans from '../translations/zh-hans.json';
import ja from '../translations/ja.json';

/* Tłumaczenia: translations/<język>.json. Teksty z {0}, {1} stają się funkcjami: L.obr(40, 30) → „… 40 … 30 …” */
const rrFn = v => typeof v === 'string' && /\{\d\}/.test(v) ? (...a) => v.replace(/\{(\d)\}/g, (_, i) => a[i] ?? '')
  : Array.isArray(v) ? v.map(rrFn) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rrFn(x)])) : v;
/* nowy język: plik translations/<kod>.json; brakujące teksty biorą się z angielskiego */
const SUROWE = { pl, en, de, fr, es, it, nl, cs, sk, uk, ru, pt, 'zh-hans': zh_hans, ja };
const rrScal = (baza, x) => Array.isArray(baza) ? (Array.isArray(x) && x.length === baza.length ? x : baza)
  : baza && typeof baza === 'object' ? Object.fromEntries(Object.entries(baza).map(([k, v]) => [k, rrScal(v, x?.[k])]))
  : typeof x === typeof baza ? x : baza;
export const RR_JEZYKI = Object.fromEntries(Object.entries(SUROWE).map(([k, v]) => [k, rrFn(k === 'en' || k === 'pl' ? v : rrScal(en, v))]));
export const RR_NAZWY_JEZYKOW = { pl: 'Polski', en: 'English', de: 'Deutsch', fr: 'Français', es: 'Español', it: 'Italiano', nl: 'Nederlands', cs: 'Čeština', sk: 'Slovenčina', uk: 'Українська', ru: 'Русский', pt: 'Português', 'zh-hans': '简体中文', ja: '日本語' };
const rrMapa = (co) => Object.fromEntries(Object.entries(RR_JEZYKI).map(([k, v]) => [k, v[co]]));
export const RR_TXT = rrMapa('karta');
export const RR_ED = rrMapa('edytor');
export const RR_KOL_NAZWY = rrMapa('kolory');

/* „pl-PL”, „uk”, „de-AT” → kod pliku tłumaczeń; język bez tłumaczenia → angielski */
export const rrKod = (s) => {
  const k = String(s || '').toLowerCase().replace('_', '-'), p = k.split('-')[0];
  return RR_JEZYKI[k] ? k : RR_JEZYKI[p] ? p : p === 'zh' && RR_JEZYKI['zh-hans'] ? 'zh-hans' : 'en';
};
/* język: wybrany w karcie, a „auto” = język profilu użytkownika HA */
export const rrJezyk = (c, hass) => RR_JEZYKI[c?.jezyk] ? c.jezyk : rrKod(hass?.locale?.language || hass?.language || navigator.language || 'pl');
