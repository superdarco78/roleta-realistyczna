import { RR_WERSJA } from './stale.js';

/* v23: kreator – panele HA (dodanie kopii karty do innego panelu/widoku) i sprawdzenie instalacji karty */

/* panel otwarty teraz w przeglądarce (w nim karta zapisze się sama przyciskiem „Zapisz”) */
export const rrBiezacyPanel = () => { const p = decodeURIComponent(location.pathname.split('/')[1] || ''); return p === 'lovelace' ? null : p; };

export async function rrPanele(hass) {
  const lista = await hass.callWS({ type: 'lovelace/dashboards/list' }).catch(() => []);
  return [{ url_path: null, title: null, mode: 'storage' }, ...lista.filter(d => d.url_path && d.url_path !== 'map')];
}

export const rrKonfigPanelu = (hass, url_path) => hass.callWS({ type: 'lovelace/config', url_path, force: true });

/* dopisuje kartę na końcu widoku (widok z sekcjami: do ostatniej sekcji) albo tworzy nowy widok „Rolety” */
export async function rrDodajDoPanelu(hass, url_path, widok, karta, tytul) {
  const cfg = await rrKonfigPanelu(hass, url_path);
  if (cfg.strategy) throw new Error('strategy');
  const views = cfg.views || (cfg.views = []);
  let v = views[widok];
  if (widok === 'nowy') {
    let path = 'rolety', i = 2; while (views.some(x => x.path === path)) path = 'rolety-' + i++;
    v = { title: tytul, path, icon: 'mdi:roller-shade', type: 'sections', sections: [{ type: 'grid', cards: [] }] };
    views.push(v);
  }
  if (!v || v.strategy || v.type === 'panel') throw new Error('view');
  if (v.type === 'sections' || v.sections) {
    const s = v.sections || (v.sections = []);
    if (!s.length) s.push({ type: 'grid', cards: [] });
    const ost = s[s.length - 1]; (ost.cards || (ost.cards = [])).push(karta);
  } else (v.cards || (v.cards = [])).push(karta);
  await hass.callWS({ type: 'lovelace/config/save', url_path, config: cfg });
  return v;
}

/* czy jest nowsza wersja na GitHubie i czy karta nie jest dodana w zasobach kilka razy (raz na godzinę) */
const RR_INST = { t: 0, p: null };
export function rrSprawdzInstalacje(hass) {
  if (RR_INST.p && Date.now() - RR_INST.t < 3600000) return RR_INST.p;
  RR_INST.t = Date.now();
  const wynik = { wersja: RR_WERSJA };
  const gh = fetch('https://api.github.com/repos/superdarco78/roleta-realistyczna/releases/latest')
    .then(r => r.ok ? r.json() : null).then(j => { if (j?.tag_name) wynik.najnowsza = j.tag_name; }).catch(() => {});
  const zas = hass?.user?.is_admin && hass.callWS ? hass.callWS({ type: 'lovelace/resources' })
    .then(l => { wynik.zasoby = (l || []).filter(x => /roleta-realistyczna|okno-ha/.test(x.url)).length; }).catch(() => {}) : null;
  return (RR_INST.p = Promise.all([gh, zas]).then(() => wynik));
}
export const rrNumerWersji = v => parseInt(String(v || '').replace(/\D+/g, ''), 10) || 0;
