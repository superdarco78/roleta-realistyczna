/* Ustawienia globalne – wspólny wygląd wszystkich kart */
/* v21: ustawienia globalne – wspólny wygląd wszystkich kart, zapisany w profilu użytkownika HA (bez HA: w przeglądarce) */
export const RR_GKLUCZE = ['kolor', 'siatka', 'rama', 'skrzydla', 'slupek', 'wysokosc', 'klamki', 'uchwyty', 'uchwyt_srodek', 'przyciski', 'niebo', 'widok',
  'krok', 'pozycje', 'wibracja', 'kat_uchyl', 'otwarcie', 'jezyk', 'zrodlo', 'auto_czujniki'];
export const RR_G = { v: null, p: null };
export const rrGlobLoad = hass => {
  if (!RR_G.p) RR_G.p = (hass?.callWS ? hass.callWS({ type: 'frontend/get_user_data', key: 'roleta-realistyczna' }).then(r => r?.value)
    : Promise.resolve().then(() => { try { return JSON.parse(localStorage.getItem('rr-glob') || 'null'); } catch (x) { return null; } }))
    .catch(() => null).then(v => { RR_G.v = v || {}; });
  return RR_G.p;
};
export const rrGlobSave = (hass, v) => {
  RR_G.v = v; RR_G.p = Promise.resolve();
  window.dispatchEvent(new Event('rr-glob'));
  if (hass?.callWS) return hass.callWS({ type: 'frontend/set_user_data', key: 'roleta-realistyczna', value: v });
  try { localStorage.setItem('rr-glob', JSON.stringify(v)); } catch (x) { /* bez pamięci */ }
  return Promise.resolve();
};
