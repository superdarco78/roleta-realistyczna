/* Roleta dzień-noc (roleta-realistyczna) – punkt wejścia: rejestruje kartę i edytor w Home Assistancie.
   Kod źródłowy w src/, teksty w translations/, plik dla HACS składa `npm run build` → dist/roleta-realistyczna.js */
import { RR_WERSJA } from './stale.js';
import { RoletaRealistyczna } from './karta.js';
import { RoletaRealistycznaEditor } from './edytor.js';

console.info('%c roleta-realistyczna ' + RR_WERSJA + ' %c © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/roleta-realistyczna ', 'background:#232427;color:#fff;border-radius:3px 0 0 3px', 'background:#ff8f00;color:#fff;border-radius:0 3px 3px 0');

if (!customElements.get('roleta-realistyczna')) customElements.define('roleta-realistyczna', RoletaRealistyczna);
if (!customElements.get('roleta-realistyczna-editor')) customElements.define('roleta-realistyczna-editor', RoletaRealistycznaEditor);

window.customCards = window.customCards || [];
window.customCards.push({ type: 'roleta-realistyczna', name: 'Roleta dzień-noc ' + RR_WERSJA, description: 'Realistyczna roleta dzień-noc na oknie 2-skrzydłowym z animacją, przeciąganiem i prawdziwą pogodą za oknem', preview: true });
