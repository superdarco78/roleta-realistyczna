/* Okno HA (dawniej Roleta dzień-noc, roleta-realistyczna) – punkt wejścia: rejestruje kartę i edytor w Home Assistancie.
   v25: nowa nazwa typu custom:okno-ha; stara custom:roleta-realistyczna działa dalej (te same panele nie psują się).
   Kod źródłowy w src/, teksty w translations/, plik dla HACS składa `npm run build` → dist/roleta-realistyczna.js */
import { RR_WERSJA } from './stale.js';
import { RoletaRealistyczna } from './karta.js';
import { RoletaRealistycznaEditor } from './edytor.js';
import { RR_TXT } from './jezyk.js';

console.info('%c Okno HA ' + RR_WERSJA + ' %c © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/roleta-realistyczna ', 'background:#232427;color:#fff;border-radius:3px 0 0 3px', 'background:#ff8f00;color:#fff;border-radius:0 3px 3px 0');

/* ten sam kod pod dwiema nazwami: okno-ha (nowa) i roleta-realistyczna (stara, dla istniejących paneli) */
const rej = (nazwa, klasa) => { if (!customElements.get(nazwa)) customElements.define(nazwa, klasa); };
rej('okno-ha', RoletaRealistyczna);
rej('okno-ha-editor', RoletaRealistycznaEditor);
rej('roleta-realistyczna', class extends RoletaRealistyczna {});
rej('roleta-realistyczna-editor', class extends RoletaRealistycznaEditor {});

const T = RR_TXT[String(document.documentElement.lang || navigator.language || 'pl').startsWith('pl') ? 'pl' : 'en'];
window.customCards = window.customCards || [];
window.customCards.push({ type: 'okno-ha', name: T.nazwaKarty + ' ' + RR_WERSJA, description: T.opisKarty, preview: true, documentationURL: 'https://github.com/superdarco78/roleta-realistyczna#readme',
  /* v31: „Dodaj do panelu” na stronie urządzenia (HA 2026.6+) proponuje kartę Okno HA dla okien z integracji i dla rolet */
  getEntitySuggestion: (hass, entityId) => {
    if (!String(entityId).startsWith('cover.')) return null;
    const okno = !!hass?.states?.[entityId]?.attributes?.okno_ha;
    return { label: T.nazwaKarty + (okno ? ' 🪟' : ''), config: { type: 'custom:okno-ha', entity: entityId } };
  } });
