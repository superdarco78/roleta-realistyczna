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
/* v28: liczy się tylko główny numer (v27.1 = 27) – wydania „.1” zmieniają sam opis, nie kartę */
export const rrNumerWersji = v => parseInt(String(v || '').replace(/^\D+/, ''), 10) || 0;

/* v29: po aktualizacji w HACS przeglądarka potrafi trzymać stary plik karty. HACS zmienia adres zasobu (hacstag),
   więc wystarczy raz przeładować stronę – karta robi to sama, gdy HACS ma nowszą wersję niż ta, która działa */
/* v30: działa też z encją aktualizacji z integracji Motor HA i przy otwartej stronie – gdy w trakcie
   klikniesz „Zainstaluj”, karta od razu przeładuje stronę na nową wersję */
const RR_ODSW = { id: null, szukane: 0 };
export function rrSamoOdswiez(hass) {
  const st = hass?.states || {};
  if (!RR_ODSW.id && !RR_ODSW.szukane) {
    RR_ODSW.szukane = 1;
    RR_ODSW.id = Object.keys(st).find(k => k.startsWith('update.') && /roleta-realistyczna/.test(String(st[k].attributes?.release_url || ''))) || null;
  }
  const inst = RR_ODSW.id && st[RR_ODSW.id]?.attributes?.installed_version;
  if (!inst || rrNumerWersji(inst) <= rrNumerWersji(RR_WERSJA)) return;
  const klucz = 'okno-ha-odswiezone-' + inst;
  try { if (sessionStorage.getItem(klucz)) return; sessionStorage.setItem(klucz, '1'); } catch (e) { return; }   // najwyżej raz
  console.info('Motor HA: zainstalowana ' + inst + ', działa ' + RR_WERSJA + ' – przeładowuję stronę');
  setTimeout(() => location.reload(), 300);
}
