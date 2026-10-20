/* Automatyczne wykrywanie: prędkość silnika, kontaktrony okna, encja pogody */
/* prędkość silnika: wybrana encja albo zgadnięta po nazwie (Moes/Tuya w zigbee2mqtt: number.<nazwa>_motor_speed) */
export const rrRpmId = (hass, cover, enc) => {
  if (enc) return enc;
  const g = String(cover).replace('cover.', 'number.') + '_motor_speed';
  if (hass?.states[g]) return g;
  /* v21: encja prędkości z tego samego urządzenia co roleta */
  const dev = hass?.entities?.[cover]?.device_id;
  return dev ? Object.keys(hass.entities).find(k => k.startsWith('number.') && hass.entities[k].device_id === dev && /speed|predkos|rpm/i.test(k)) : undefined;
};
export const rrRpm = (hass, cover, enc) => parseFloat(hass?.states[rrRpmId(hass, cover, enc)]?.state);
/* v21: kontaktrony okna z tego samego pomieszczenia co roleta (device_class window/door), lewe/prawe po nazwie */
export const rrCzujnikiAuto = (hass, cover) => {
  const E = hass?.entities, D = hass?.devices; if (!E || !E[cover]) return [];
  const area = e => E[e]?.area_id || D?.[E[e]?.device_id]?.area_id;
  const a = area(cover); if (!a) return [];
  const ok = Object.keys(E).filter(k => k.startsWith('binary_sensor.') && area(k) === a && ['window', 'door', 'opening'].includes(hass.states[k]?.attributes?.device_class)).sort();
  const nm = k => (k + ' ' + (hass.states[k]?.attributes?.friendly_name || '')).toLowerCase();
  const l = ok.find(k => /lew|left/.test(nm(k))), r = ok.find(k => /praw|right/.test(nm(k)));
  if (l || r) return [l || ok.find(k => k !== r), r || ok.find(k => k !== l)];
  return ok.slice(0, 2);
};
/* encja pogody: wybrana albo typowa nazwa z HA albo pierwsza znaleziona */
export const rrPogodaId = (c, hass) => c.pogoda && c.pogoda !== 'auto' ? c.pogoda
  : ['weather.forecast_home', 'weather.home', 'weather.dom'].find(k => hass.states[k]) || Object.keys(hass.states).find(k => k.startsWith('weather.'));
