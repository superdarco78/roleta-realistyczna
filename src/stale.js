/* Stałe karty: wersja, ustawienia domyślne, wymiary rolety, gotowe wyglądy kreatora */
export const RR_WERSJA = 'v39';
/* v24: okno jednoskrzydłowe większe – wyższe o 25% i szersze, zajmuje tyle miejsca co okno 2-skrzydłowe */
export const rrWysOkna = (c, n) => n === 1 ? Math.round((+c.wysokosc || 260) * 1.25) : +c.wysokosc || 260;
export const RR_DEF = { kolor: 'czarny', rama: '#f4f4f2', czas: 'auto', wysokosc: 260, skrzydla: 2, przyciski: true, niebo: true, osobno: false, odwroc: false, pogoda: 'auto', tlo: '', widok: true, czujnik_lewe: '', tryb_lewe: 'uchyl', czujnik_prawe: '', tryb_prawe: 'uchyl',
  roleta_lewa: '', roleta_prawa: '', predkosc_lewa: '', predkosc_prawa: '', zrodlo: 'auto', jezyk: 'auto', uchwyty: true, uchwyt_srodek: true, kat_uchyl: 14, otwarcie: 40, krok: 5, siatka: '', pozycje: '100,75,50,25,0', wibracja: true, slupek: 'staly', klamki: true, auto_czujniki: true, oslona: 'zebra', promienie: true, dzwiek: false };
/* v26: typy osłon – ten sam silnik i ruch, inny materiał */
/* v27: rodzaje osłon – kolejność = kolejność nazw w tłumaczeniach (osln, osld); nowe typy zawsze na końcu */
export const RR_OSLONY = ['zebra', 'pelna', 'plisa', 'rzymska', 'zaluzja', 'zewnetrzna',
  'zaciemniajaca', 'plaster', 'drewniana', 'natynkowa', 'podtynkowa', 'perforowana', 'fasadowa', 'fasadowaz', 'screen'];
export const RR_OSL_GRUPY = {
  wew: ['zebra', 'pelna', 'zaciemniajaca', 'plisa', 'plaster', 'rzymska', 'zaluzja', 'drewniana'],
  zew: ['zewnetrzna', 'natynkowa', 'podtynkowa', 'perforowana', 'fasadowa', 'fasadowaz', 'screen']
};
export const RR_OSL_IKONY = { zebra: 'mdi:roller-shade', pelna: 'mdi:roller-shade-closed', plisa: 'mdi:blinds', rzymska: 'mdi:curtains', zaluzja: 'mdi:blinds-horizontal', zewnetrzna: 'mdi:window-shutter',
  zaciemniajaca: 'mdi:roller-shade-closed', plaster: 'mdi:blinds', drewniana: 'mdi:blinds-horizontal', natynkowa: 'mdi:window-shutter', podtynkowa: 'mdi:window-shutter',
  perforowana: 'mdi:window-shutter-open', fasadowa: 'mdi:blinds-horizontal-closed', fasadowaz: 'mdi:blinds-horizontal-closed', screen: 'mdi:roller-shade' };
export const RR_PAS = 16, RR_SIATKA = 10;          // wysokość pasa pełnego i półprzezroczystego (px)
export const RR_OKRES = RR_PAS + RR_SIATKA;
export const RR_KASETA = 12, RR_LISTWA = 5;

/* v22: gotowe wyglądy w kreatorze */
export const RR_PRESETY = [{ rama: '#3b3f45', kolor: 'grafit' }, { rama: '#8a5a3b', kolor: 'bezowy' }, { rama: '#f4f4f2', kolor: 'kremowy' },
  { rama: '#1f2124', kolor: 'czarny' }, { rama: '#5a3a26', kolor: 'piaskowy' }, { rama: '#f4f4f2', kolor: 'turkus', siatka: 'bialy' }];
