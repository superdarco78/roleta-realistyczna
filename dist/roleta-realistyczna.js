/*!
 * Okno HA (dawniej Roleta dzień-noc, roleta-realistyczna)
 * © 2026 superdarco78 – https://github.com/superdarco78/roleta-realistyczna
 * Licencja / License: CC BY-NC-SA 4.0 – https://creativecommons.org/licenses/by-nc-sa/4.0/
 * Użytek niekomercyjny z podaniem autora. Sprzedaż, odsprzedaż i użycie komercyjne
 * tylko za pisemną zgodą autora. / Non-commercial use with attribution only.
 * Commercial use, resale or redistribution for profit requires the author's written permission.
 */
/* roleta-realistyczna v7 – roleta dzień-noc (zebra) na oknie 2-skrzydłowym, z animacją (Dom v2)
   type: custom:roleta-realistyczna
   entity (cover lub grupa coverów – każde skrzydło dostaje swoją roletę), name,
   kolor (pasy pełne), rama (kolor ramy), czas (s pełnego przejazdu), wysokosc (px),
   skrzydla (1/2), przyciski, niebo, osobno (przeciąganie rusza jedno skrzydło), odwroc (odwrócona pozycja) */
/* Zmiany:
   v1 – okno 2-skrzydłowe, biała kasetka, pasy dzień-noc, przeciąganie, przyciski, niebo dzień/noc, edytor wizualny
   v2 – przeciąganie ustawia oba skrzydła naraz (opcja „osobno” = jedno); animacja 1:1 w tempie silnika (czas przejazdu),
        rusza od razu po kliknięciu; poprawka silników Zigbee, które przy „open” podają 0%; opcja „odwroc”; numer wersji w konsoli
   v3 – śledzenie silnika: każdy meldunek pozycji z silnika od razu (płynnie, ~0,5 s) przesuwa roletę na zgłoszone miejsce,
        a między meldunkami jedzie w tempie silnika; chwilowe „0%” przy stanie otwarta jest pomijane (błąd meldunku Zigbee)
   v4 – tempo animacji z prawdziwej prędkości silnika Moes (encja number.*_motor_speed, obr/min) osobno dla każdego skrzydła:
        czas przejazdu = „czas” × („obroty_ref” / obroty silnika); zmiana prędkości silnika w HA od razu zmienia animację
   v5 – numer wersji widoczny na karcie (obok nazwy) i w nazwie karty na liście kart
   v6 – edytor graficzny jak symulator: kółka kolorów (pasy i rama, plus własny kolor), przyciski skrzydeł, suwaki,
        przełączniki i żywy podgląd z przyciskiem „Pokaż animację” (udawany silnik w tempie prawdziwych silników)
   v7 – „open 0%” na końcu opuszczania jest przyjmowane (to prawdziwe 0%), na starcie podnoszenia pomijane;
        czas zmierzony na prawdziwych roletach 20.10: 40 obr/min ≈ 30 s, 255 obr/min ≈ 22 s → czas = 20,2 + 394 / obroty
        (tryb „auto”, domyślny); ruch startuje też, gdy roletę ruszy ktoś inny (pilot, automatyzacja, inny panel) –
        silnik Moes od razu zmienia stan na „open”/„closed”, a pozycję podaje dopiero na końcu; ręczny czas nadal możliwy
   v8 – prawdziwa pogoda za oknem z Home Assistanta (encja weather, domyślnie weather.dom): słońce, chmury płynące po niebie,
        deszcz, ulewa, burza z błyskami, śnieg, mgła, wiatr; w nocy księżyc i migające gwiazdy (wg sun.sun);
        temperatura i opis pogody w podtytule; w edytorze wybór encji pogody i przyciski „pogoda w podglądzie”;
        uchwyt do podnoszenia na środku dolnej listwy każdego skrzydła
   v9 – pogoda rusza się też na telefonie z włączonym „ograniczeniem ruchu” / oszczędzaniem baterii (v8 ją wtedy zamrażała);
        błysk burzy w obu skrzydłach naraz
   v10 – animacja nie skacze od fałszywych meldunków Moes (test 20.10 19:28: przy „50%” silniki meldowały 0 i 100
        w trakcie jazdy, prawy nawet na końcu 100, choć oba stanęły w połowie): po komendzie z karty liczy się cel komendy,
        meldunki 0/100 niezgodne z celem są pomijane, a każdy meldunek brany jest tylko raz; po przeciągnięciu lub kliknięciu
        przerywana linia z „→ 50%” pokazuje, gdzie roleta jedzie, aż dojedzie; w nagłówku „32% → 50%”
   v11 – 3 uchwyty: uchwyt na dolnej listwie skrzydła steruje tylko tym skrzydłem, okrągły uchwyt na środku okna (na słupku)
        steruje oboma naraz; przeciąganie w innym miejscu szyby jak dotąd (oba, albo jedno z opcją „osobno”)
   v12 – własne zdjęcie widoku zza okna jako tło (opcja „tlo”, np. /local/okno.jpg): jedno zdjęcie przez oba skrzydła,
        na nim animowana pogoda (chmury, deszcz, śnieg, mgła, błyski), przyciemnienie wg pogody i noc (ciemno + gwiazdy)
   v13 – poprawka: po STOP i po dojechaniu animacja nie skacze od spóźnionych meldunków silnika (Moes potrafi wysłać
        fałszywe 100% nawet 50 s później) – okno spokoju wydłużone do 60 s i działa też po STOP
   v14 – rysowany widok za oknem (gdy nie ma zdjęcia): wzgórza, domy, drzewa, ulica i latarnia, jeden widok przez oba skrzydła;
        zmienia się z pogodą: śnieg na dachach i trawie, mokra ulica z odbiciami przy deszczu, drzewa kołyszą się przy wietrze
        i burzy, pochmurno = szarzej; w nocy zapalone okna i świecące latarnie; jedno słońce/księżyc na całe okno;
        opcja „widok” (wyłączenie = samo niebo)
   v15 – okno uchylone albo otwarte wg kontaktronu: dla lewego i prawego skrzydła wybierasz czujnik (binary_sensor)
        i tryb – „uchyl” (góra skrzydła odchyla się do środka) albo „otworz” (skrzydło otwiera się na zawiasach);
        animacja ruchu skrzydła, za skrzydłem widać to, co za oknem; w podtytule „okno lewe uchylone”
   v16 – uniwersalnie, także bez integracji pogody: gdy w HA nie ma encji weather.*, karta sama pobiera aktualną pogodę
        z internetu (Open-Meteo, darmowe, bez klucza) dla lokalizacji domu z HA, odświeżanie co 15 min;
        niebo zmienia się z porą dnia wg wysokości słońca (sun.sun): dzień, złota godzina przy wschodzie/zachodzie
        (pomarańczowe niebo, nisko słońce), zmierzch (fioletowe niebo, zapalone okna), noc;
        uchylenie skrzydła teraz do środka pokoju (góra skrzydła do nas), otwarcie też do środka;
        dotknięcie rolety jak pilot z jednym przyciskiem: w trakcie jazdy = STOP, kolejne dotknięcie = jazda w przeciwną
        stronę (stojąca na dole jedzie w górę, na górze w dół)
   v17 – uniwersalna dla każdego, nic na sztywno: w ustawieniach wybierasz rolety lewego i prawego skrzydła (albo grupę),
        encje prędkości silników (albo czas), źródło pogody (encja HA / internet / brak), kontaktrony; kalibracja czasu
        przejazdu stoperem w edytorze; język karty i edytora: auto / polski / English; uchwyty na listwie i środkowy
        można wyłączyć; ustawienia w edytorze pogrupowane w rozwijane sekcje; suwaki „jak mocno uchylone” (stopnie)
        i „jak szeroko otwarte” (% szerokości) – oba do środka pokoju; przy uchyleniu i otwarciu widać wyraźną szczelinę,
        a przez nią to, co za oknem (niebo, widok, pogoda)
   v18 – poprawka: otwarte skrzydło (lewe i prawe) otwiera się naprawdę do środka pokoju (wolny brzeg w naszą stronę), a nie na zewnątrz;
        automatyczna kalibracja jednym przyciskiem (roleta sama jedzie góra → dół → góra, karta mierzy i zapisuje czas);
        karta sama uczy się czasu przejazdu z każdego ruchu rolety, która melduje „otwiera/zamyka się”;
        ruch krokowy: przyciski ▲ 5% / ▼ 5% – każde kliknięcie to mały krok, kliknięcia się sumują (opcja krok, 0 = wyłączony);
        10 jaskrawych kolorów pasów (czerwony, bordo, różowy, fiolet, niebieski, turkus, zielony, limonka, żółty, oliwka)
        i osobny kolor pasów przezroczystych (opcja siatka, puste = jak pełne);
        własne szybkie pozycje (opcja pozycje, np. „100,60,30,0”); lekka wibracja telefonu przy kliknięciu (opcja wibracja)
   v19 – kolory ram jak w sklepach z oknami: okleiny drewnopodobne ze słojami (złoty dąb, orzech, mahoń, winchester, dąb bagienny,
        dąb jasny) i kolory gładkie (szary agat, srebrny, czarny, zieleń, ...); słupek między skrzydłami: stały (zostaje w oknie)
        albo ruchomy (przy lewym skrzydle, po otwarciu obu skrzydeł środek jest wolny; lewe skrzydło bez klamki) – opcja slupek;
        edytor: podgląd przypięty u góry (📌) – przy każdym ustawieniu od razu widać, jak wygląda; krótki opis pod każdą grupą;
        w podglądzie okno zamknięte / uchylone / otwarte, a suwaki uchyłu i otwarcia same pokazują okno w tym położeniu;
        paleta tkanin dzień-noc jak u producentów (naturalne, szarości, pastele, jaskrawe) i własny kolor;
        klamki okna jak prawdziwe (w dół zamknięte, poziomo otwarte, w górę uchylone; najpierw obrót klamki, potem skrzydło) – opcja klamki
   v20 – edytor: palety kolorów w kółkach w jednej przewijanej linii; wybrany kolor podświetlony i przewinięty na środek,
        pozostałe wyszarzone; nazwa wybranego koloru przy tytule grupy
   v21 – edytor: wybrane kółko koloru duże i świecące; pod każdą paletą suwak – przesuwasz palcem i od razu wybierasz kolor;
        automatyczne wykrywanie: prędkość silnika z tego samego urządzenia co roleta, kontaktrony okna z tego samego pomieszczenia
        (lewe/prawe po nazwie); w edytorze widać, co wykryto (opcja auto_czujniki, ręczny wybór ma pierwszeństwo);
        ustawienia globalne: „🌍 Zapisz jako domyślne dla wszystkich kart” – wygląd zapisany w profilu użytkownika HA,
        każda karta (i każda nowa) go przejmuje, a własne ustawienia karty mają pierwszeństwo; nowa karta sama wybiera grupę rolet
   v22 – 🪄 kreator w 3 krokach (wybierz roletę → co karta wykryła sama → gotowy wygląd), sam się otwiera przy nowej karcie;
        menu w rozwijanych działach: 🎨 Wygląd, 🪟 Okno, ⏱ Ruch i kalibracja, ⚙️ Zaawansowane; w każdym „↺ Przywróć domyślne”
   v23 – 🪄 nowy kreator w 7 krokach dla początkujących: roleta → okno i skrzydła → prędkość silnika → czujniki okna → pogoda →
        wygląd i nazwa → podsumowanie i miejsce karty; w każdym kroku krótko „co” i „po co”; wygląd jak HA (ha-alert, ha-selector,
        ikony mdi, kolory motywu); karta sama znajduje rolety, silniki, kontaktrony i pogodę i układa je od najlepiej pasujących
        (to samo urządzenie, pomieszczenie, „lewe/prawe” w nazwie, podobna nazwa) z opisem dlaczego; w listach tylko pasujące encje
        (bez bram, garaży, czujników ruchu, zwykłych liczb); gdy czegoś brakuje albo coś nie działa, kreator mówi dokładnie co zrobić
        i otwiera właściwe miejsce w HA; pomiar czasu przejazdu w kreatorze; sprawdza, czy jest nowsza wersja i czy karta nie jest
        dodana dwa razy w zasobach; dodaje kopię karty na inny panel albo nowy widok „Rolety” jednym kliknięciem; kreator odświeża się
        sam, gdy w HA pojawi się nowe urządzenie; język kreatora, karty i menu wg profilu HA; te same ścisłe filtry w menu;
        kod karty podzielony na moduły (src/, translations/), testy i automatyczne budowanie
   v24 – okno jednoskrzydłowe większe (wyższe o 25% i szersze) – wypełnia kartę jak okno 2-skrzydłowe, także w podglądzie
        edytora i kreatora; link do instrukcji w oknie wyboru kart
   v25 – nowa nazwa karty: Okno HA (HA Window) – w oknie wyboru kart, edytorze i kreatorze; nowy typ custom:okno-ha,
        stary custom:roleta-realistyczna działa dalej; klamki okna większe, srebrne z ciemnym obrysem i zawsze nad roletą
   v26 – typ osłony (dzień-noc, pełna, plisa, rzymska, żaluzja, zewnętrzna) w edytorze i kreatorze; promienie słońca wpadające
        przez okno w słoneczny dzień; opcjonalny cichy dźwięk silnika przy ruchu; ikona karty wg typu osłony
   v27 – 15 rodzajów osłon w dwóch grupach (w pokoju / na zewnątrz) z opisami; każdy ma własną kasetę, prowadnice
        boczne i listwę dolną (nadstawna, natynkowa, podtynkowa, perforowana, fasadowa C80/Z90, screen ZIP, plaster miodu…)
   v28 – kreator porównuje tylko główny numer wersji (wydania „.1” zmieniają sam opis, więc nie ma fałszywej żółtej ramki)
   v29 – ustawienia z integracji Okno HA (atrybut okno_ha encji okna); nowa karta wybiera najpierw okno z integracji;
        po aktualizacji w HACS karta raz sama przeładowuje stronę, gdy działa starsza wersja niż zainstalowana */
(() => {
  // src/stale.js
  var RR_WERSJA = "v29";
  var rrWysOkna = (c, n) => n === 1 ? Math.round((+c.wysokosc || 260) * 1.25) : +c.wysokosc || 260;
  var RR_DEF = {
    kolor: "czarny",
    rama: "#f4f4f2",
    czas: "auto",
    wysokosc: 260,
    skrzydla: 2,
    przyciski: true,
    niebo: true,
    osobno: false,
    odwroc: false,
    pogoda: "auto",
    tlo: "",
    widok: true,
    czujnik_lewe: "",
    tryb_lewe: "uchyl",
    czujnik_prawe: "",
    tryb_prawe: "uchyl",
    roleta_lewa: "",
    roleta_prawa: "",
    predkosc_lewa: "",
    predkosc_prawa: "",
    zrodlo: "auto",
    jezyk: "auto",
    uchwyty: true,
    uchwyt_srodek: true,
    kat_uchyl: 14,
    otwarcie: 40,
    krok: 5,
    siatka: "",
    pozycje: "100,75,50,25,0",
    wibracja: true,
    slupek: "staly",
    klamki: true,
    auto_czujniki: true,
    oslona: "zebra",
    promienie: true,
    dzwiek: false
  };
  var RR_OSLONY = [
    "zebra",
    "pelna",
    "plisa",
    "rzymska",
    "zaluzja",
    "zewnetrzna",
    "zaciemniajaca",
    "plaster",
    "drewniana",
    "natynkowa",
    "podtynkowa",
    "perforowana",
    "fasadowa",
    "fasadowaz",
    "screen"
  ];
  var RR_OSL_GRUPY = {
    wew: ["zebra", "pelna", "zaciemniajaca", "plisa", "plaster", "rzymska", "zaluzja", "drewniana"],
    zew: ["zewnetrzna", "natynkowa", "podtynkowa", "perforowana", "fasadowa", "fasadowaz", "screen"]
  };
  var RR_OSL_IKONY = {
    zebra: "mdi:roller-shade",
    pelna: "mdi:roller-shade-closed",
    plisa: "mdi:blinds",
    rzymska: "mdi:curtains",
    zaluzja: "mdi:blinds-horizontal",
    zewnetrzna: "mdi:window-shutter",
    zaciemniajaca: "mdi:roller-shade-closed",
    plaster: "mdi:blinds",
    drewniana: "mdi:blinds-horizontal",
    natynkowa: "mdi:window-shutter",
    podtynkowa: "mdi:window-shutter",
    perforowana: "mdi:window-shutter-open",
    fasadowa: "mdi:blinds-horizontal-closed",
    fasadowaz: "mdi:blinds-horizontal-closed",
    screen: "mdi:roller-shade"
  };
  var RR_PAS = 16;
  var RR_SIATKA = 10;
  var RR_OKRES = RR_PAS + RR_SIATKA;
  var RR_KASETA = 12;
  var RR_LISTWA = 5;
  var RR_PRESETY = [
    { rama: "#3b3f45", kolor: "grafit" },
    { rama: "#8a5a3b", kolor: "bezowy" },
    { rama: "#f4f4f2", kolor: "kremowy" },
    { rama: "#1f2124", kolor: "czarny" },
    { rama: "#5a3a26", kolor: "piaskowy" },
    { rama: "#f4f4f2", kolor: "turkus", siatka: "bialy" }
  ];

  // src/kolory.js
  var RR_KOLORY = {
    czarny: "#232427",
    grafit: "#3a3d42",
    szary: "#6d7076",
    bezowy: "#bfae94",
    kremowy: "#e6dcc8",
    bialy: "#efefec",
    braz: "#5a4030",
    granat: "#25324d",
    pomaranczowy: "#fc9907",
    /* v19: tkaniny dzień-noc jak w kolekcjach producentów */
    piaskowy: "#d9c7a4",
    cappuccino: "#a88c72",
    mokka: "#6f5544",
    wenge: "#3d2f28",
    popiel: "#a9aaa6",
    srebrny: "#c4c6c8",
    stalowy: "#4f5a66",
    lawendowy: "#b9a8d6",
    pudrowy: "#e4b9b9",
    mietowy: "#a9dcc6",
    blekitny: "#9cc6e6",
    morski: "#1d6f7a",
    butelkowy: "#1f4d3a",
    musztardowy: "#c99a1a",
    terakota: "#b9583a",
    sliwkowy: "#5b2c4a",
    /* v18: jaskrawe */
    czerwony: "#e02424",
    bordo: "#7a1f2b",
    rozowy: "#ff4f9a",
    fiolet: "#8a3ffc",
    niebieski: "#1e6ff2",
    turkus: "#00b3b3",
    zielony: "#22a447",
    limonka: "#9bd426",
    zolty: "#ffd000",
    oliwka: "#6b7a3a"
  };
  var RR_RAMY = {
    "#f4f4f2": ["biała", "white"],
    "#d8d2c6": ["kremowa", "cream"],
    "#a3a6a8": ["szary agat", "agate grey"],
    "#b9bdc1": ["srebrna", "silver"],
    "#6e7378": ["szara", "grey"],
    "#3b3f45": ["antracyt", "anthracite"],
    "#1f2124": ["czarna", "black"],
    "#28402f": ["zielona", "green"],
    "#2b3a55": ["granatowa", "navy"],
    "#8a5a3b": ["złoty dąb", "golden oak", 1],
    "#b39370": ["dąb jasny", "light oak", 1],
    "#a26a43": ["winchester", "winchester", 1],
    "#c9cbcc": ["jasnoszara", "light grey"],
    "#6d6c66": ["szary kwarc", "quartz grey"],
    "#4a4d50": ["bazaltowa", "basalt grey"],
    "#5d1f23": ["bordowa", "burgundy"],
    "#c49a5c": ["sosna", "pine", 1],
    "#9d8064": ["dąb sheffield", "sheffield oak", 1],
    "#9b6a3c": ["oregon", "oregon", 1],
    "#6d4a33": ["siena", "siena", 1],
    "#5a3a26": ["orzech", "walnut", 1],
    "#6a2e22": ["mahoń", "mahogany", 1],
    "#3e3830": ["dąb bagienny", "bog oak", 1],
    "#6b4a32": ["brąz", "brown"]
  };
  function rrHex(c) {
    return RR_KOLORY[c] || c || RR_KOLORY.czarny;
  }
  function rrShade(hex, p) {
    let h = String(hex).replace("#", "");
    if (h.length === 3) h = h.split("").map((x) => x + x).join("");
    const n = parseInt(h, 16);
    if (isNaN(n)) return hex;
    let r = n >> 16, g = n >> 8 & 255, b = n & 255;
    const f = p < 0 ? 0 : 255, t = Math.abs(p);
    r = Math.round((f - r) * t + r);
    g = Math.round((f - g) * t + g);
    b = Math.round((f - b) * t + b);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  function rrRgba(hex, a) {
    const h = rrShade(hex, 0).replace("#", ""), n = parseInt(h, 16);
    return `rgba(${n >> 16},${n >> 8 & 255},${n & 255},${a})`;
  }

  // src/silnik.js
  var rrCzas = (c, rpm, ucz) => c === "auto" || !(+c > 0) ? rpm > 0 ? 20.2 + 394 / rpm : ucz > 0 ? ucz : 30 : Math.max(3, +c);
  var rrUcz = {
    get: (e) => {
      try {
        return +localStorage.getItem("rr-czas:" + e) || 0;
      } catch (x) {
        return 0;
      }
    },
    set: (e, v) => {
      try {
        localStorage.setItem("rr-czas:" + e, v.toFixed(1));
      } catch (x) {
      }
    }
  };

  // src/los.js
  var rrLos = (a, b) => a + Math.random() * (b - a);

  // src/pogoda.js
  var RR_WX = {
    sunny: "sun",
    "clear-night": "sun",
    partlycloudy: "partly",
    cloudy: "cloudy",
    exceptional: "cloudy",
    fog: "fog",
    rainy: "rain",
    pouring: "pour",
    hail: "pour",
    lightning: "storm",
    "lightning-rainy": "storm",
    snowy: "snow",
    "snowy-rainy": "sleet",
    windy: "wind",
    "windy-variant": "wind"
  };
  var RR_NIEBO = {
    // [dzień, noc]
    sun: ["#4f9be3,#9fd0f5 60%,#e3f2fc", "#08112b,#1b2a52"],
    partly: ["#6aa6dc,#b7d8f0 60%,#e2eef7", "#0d1630,#24304f"],
    cloudy: ["#8e9ba7,#c3ccd4", "#151b27,#2b3242"],
    wind: ["#7f9db8,#c4d3df", "#121a2a,#283247"],
    fog: ["#a9b2b9,#d6dbde", "#1f242b,#3a4048"],
    rain: ["#5c6874,#8f9aa4", "#10151d,#262d38"],
    pour: ["#48525c,#737e88", "#0c1017,#1f252e"],
    storm: ["#2f363e,#59626b", "#07090d,#1a1f27"],
    snow: ["#a7b3be,#e3e8ec", "#1b2230,#3a4352"],
    sleet: ["#7d8893,#b5bec6", "#141a24,#2f3744"]
  };
  var RR_DOMY = [
    [8, 34, 22, "#c9a27e", "#8c3b2e"],
    [36, 46, 18, "#d8c8a8", "#5d4a3c"],
    [60, 30, 26, "#b8bfc6", "#4a5560"],
    [112, 40, 20, "#e0d2b6", "#8c3b2e"],
    [140, 28, 24, "#c7b39a", "#6b4a32"],
    [170, 42, 20, "#bcc6cc", "#4a5560"]
  ];
  var RR_LAMPY = [78, 124];
  var RR_DRZEWA = [[3, 9], [30, 8], [55, 10], [92, 11], [104, 9], [134, 8], [164, 10], [195, 9]];
  function rrWidok(typ, noc, i, n, pora) {
    const snieg = typ === "snow" || typ === "sleet", mokro = ["rain", "pour", "storm", "sleet"].includes(typ);
    const wiatr = typ === "wind" || typ === "storm" || typ === "pour";
    const szaro = { cloudy: 0.82, fog: 0.85, rain: 0.7, pour: 0.6, storm: 0.5, sleet: 0.7, wind: 0.9, snow: 0.92 }[typ] || 1;
    const filtr = pora === "zmierzch" ? "brightness(.55) saturate(.7) hue-rotate(-12deg)" : noc ? "brightness(.38) saturate(.6) hue-rotate(10deg)" : pora === "zloto" ? `brightness(${szaro * 0.95}) sepia(.3) saturate(1.25)` : `brightness(${szaro}) saturate(${szaro})`;
    const vb = n > 1 ? `${i ? 100 : 0} 0 100 80` : "0 0 200 80";
    const pa = (n > 1 ? i ? "xMinYMax" : "xMaxYMax" : "xMidYMax") + " slice";
    const g = [];
    g.push(`<path d="M0 52 Q30 38 60 48 T120 44 T200 50 V80 H0Z" fill="${snieg ? "#e8eef2" : "#7fa86a"}"/>`);
    g.push(`<path d="M0 60 Q50 52 100 58 T200 56 V80 H0Z" fill="${snieg ? "#f4f7f9" : "#6a9a58"}"/>`);
    RR_DOMY.forEach(([x, y, w, sc, da]) => {
      g.push(`<rect x="${x}" y="${y}" width="${w}" height="${66 - y}" fill="${sc}"/>`);
      g.push(`<path d="M${x - 2} ${y} L${x + w / 2} ${y - w * 0.45} L${x + w + 2} ${y}Z" fill="${da}"/>`);
      if (snieg) g.push(`<path d="M${x - 2} ${y} L${x + w / 2} ${y - w * 0.45} L${x + w + 2} ${y} L${x + w} ${y - 1.5} L${x + w / 2} ${y - w * 0.45 + 2} L${x} ${y - 1.5}Z" fill="#fff"/>`);
      for (let r = y + 4; r < 60; r += 9) for (let c = x + 3; c < x + w - 4; c += 8) g.push(`<rect class="okn" x="${c}" y="${r}" width="4" height="5" fill="#9fb7c9"/>`);
    });
    RR_DRZEWA.forEach(([x, r]) => {
      g.push(`<g class="${wiatr ? "drz" : ""}" style="transform-origin:${x}px 66px;animation-delay:-${x % 7 / 3}s"><rect x="${x - 1}" y="${66 - r}" width="2" height="${r}" fill="#5b4030"/><circle cx="${x}" cy="${66 - r}" r="${r * 0.6}" fill="${snieg ? "#dfe8e4" : "#3f7f3a"}"/><circle cx="${x - r * 0.35}" cy="${66 - r * 0.7}" r="${r * 0.45}" fill="${snieg ? "#cfdcd6" : "#357235"}"/></g>`);
    });
    g.push(`<rect x="0" y="66" width="200" height="14" fill="${snieg ? "#e9eef1" : mokro ? "#3c4248" : "#6c6f73"}"/>`);
    g.push(`<rect x="0" y="72" width="200" height="1" fill="${snieg ? "#fff" : "#d8d8d0"}" opacity=".5"/>`);
    if (mokro) for (let k = 0; k < 12; k++) g.push(`<rect x="${k * 17 + 4}" y="${68 + k % 3 * 3}" width="7" height=".6" fill="#9fb1c0" opacity=".6"/>`);
    RR_LAMPY.forEach((x) => g.push(`<rect x="${x - 0.7}" y="46" width="1.4" height="20" fill="#30343a"/><rect x="${x - 3.5}" y="45" width="7" height="1.6" rx=".8" fill="#30343a"/>`));
    const sw = [];
    if (noc) {
      RR_DOMY.forEach(([x, y, w], d) => {
        let k = 0;
        for (let r = y + 4; r < 60; r += 9) for (let c = x + 3; c < x + w - 4; c += 8) if ((d * 7 + k++ * 3) % 5 < 3) sw.push(`<rect x="${c}" y="${r}" width="4" height="5" fill="#ffd27a"/>`);
      });
      RR_LAMPY.forEach((x) => sw.push(`<circle cx="${x}" cy="47.5" r="9" fill="url(#rrlamp)"/><circle cx="${x}" cy="47" r="1.6" fill="#fff4c8"/><ellipse cx="${x}" cy="70" rx="14" ry="3" fill="#ffd27a" opacity="${mokro ? 0.45 : 0.25}"/>`));
    }
    return `<svg class="scn" viewBox="${vb}" preserveAspectRatio="${pa}" style="filter:${filtr}">${g.join("")}</svg>` + (sw.length ? `<svg class="scn" viewBox="${vb}" preserveAspectRatio="${pa}"><defs><radialGradient id="rrlamp"><stop offset="0" stop-color="#ffe9a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a8" stop-opacity="0"/></radialGradient></defs>${sw.join("")}</svg>` : "");
  }
  var RR_TINT = { sun: 0, partly: 0.06, wind: 0.18, cloudy: 0.32, fog: 0, rain: 0.4, pour: 0.5, storm: 0.6, snow: 0, sleet: 0.38 };
  var RR_OM = { t: 0, data: null, busy: false, cb: /* @__PURE__ */ new Set() };
  function rrWmo(k, dzien, wiatr) {
    const s = k === 0 ? dzien ? "sunny" : "clear-night" : k <= 2 ? "partlycloudy" : k === 3 ? "cloudy" : k <= 48 ? "fog" : k <= 63 || k === 80 || k === 81 ? "rainy" : k === 65 || k === 82 ? "pouring" : k <= 67 ? "snowy-rainy" : k <= 77 || k === 85 || k === 86 ? "snowy" : k === 95 ? "lightning-rainy" : k >= 96 ? "hail" : "cloudy";
    return wiatr > 40 && ["sunny", "partlycloudy", "cloudy"].includes(s) ? s === "cloudy" ? "windy-variant" : "windy" : s;
  }
  function rrInternet(hass, cb) {
    const lat = hass?.config?.latitude, lon = hass?.config?.longitude;
    if (lat == null || lon == null) return null;
    if (Date.now() - RR_OM.t < 15 * 6e4) return RR_OM.data;
    RR_OM.cb.add(cb);
    if (!RR_OM.busy) {
      RR_OM.busy = true;
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=weather_code,temperature_2m,is_day,wind_speed_10m`).then((r) => r.json()).then((j) => {
        const c = j.current;
        RR_OM.data = { state: rrWmo(c.weather_code, c.is_day, c.wind_speed_10m), attributes: { temperature: c.temperature_2m, temperature_unit: "°C", zrodlo: "internet" } };
      }).catch(() => {
      }).finally(() => {
        RR_OM.t = Date.now();
        RR_OM.busy = false;
        RR_OM.cb.forEach((f) => f());
        RR_OM.cb.clear();
      });
    }
    return RR_OM.data;
  }
  function rrPogoda(typ, noc, i, foto, n, widok, pora) {
    const h = [], dark = ["rain", "pour", "storm", "sleet"].includes(typ);
    if (noc && ["sun", "partly", "wind"].includes(typ))
      for (let k = 0; k < 16; k++) h.push(`<i class="st" style="left:${rrLos(4, 96)}%;top:${rrLos(4, 80)}%;animation-delay:-${rrLos(0, 4)}s;animation-duration:${rrLos(2, 5)}s"></i>`);
    if (!foto && !(n > 1 && i === 0) && (typ === "sun" || typ === "partly" || typ === "wind")) h.push(noc ? (
      // jedno słońce/księżyc na całe okno
      `<i class="moon" style="${i ? "left:22%" : "right:20%"}"></i>`
    ) : `<i class="sun${pora === "zloto" ? " zl" : ""}" style="${i ? "left:16%" : "right:14%"}"></i>`);
    const nc = { sun: 0, partly: 2, wind: 3, cloudy: 4, fog: 2, rain: 4, pour: 5, storm: 5, snow: 4, sleet: 4 }[typ] || 0;
    const kol = noc ? dark ? "#2a303a" : "#3b4354" : typ === "storm" ? "#4c535b" : typ === "pour" ? "#6b747c" : dark ? "#8b949c" : typ === "partly" || typ === "wind" ? "#ffffff" : "#e4e8eb";
    const czas = typ === "wind" ? [9, 15] : [40, 75];
    for (let k = 0; k < nc; k++) {
      const d = rrLos(...czas);
      h.push(`<i class="cl" style="top:${rrLos(-4, 78)}%;width:${rrLos(45, 75)}%;background:${kol};opacity:${rrLos(0.8, 0.97).toFixed(2)};animation-duration:${d}s;animation-delay:-${rrLos(0, d)}s"></i>`);
    }
    if (!foto && widok) h.push(rrWidok(typ, noc, i, n, pora));
    if (typ === "fog") for (let k = 0; k < 4; k++) h.push(`<i class="fog" style="top:${15 + k * 22}%;animation-duration:${rrLos(14, 24)}s;animation-delay:-${rrLos(0, 10)}s"></i>`);
    const dr = { rain: 22, pour: 40, storm: 34, sleet: 14 }[typ] || 0;
    for (let k = 0; k < dr; k++) h.push(`<i class="dr" style="left:${rrLos(-5, 105)}%;animation-duration:${rrLos(typ === "pour" ? 0.45 : 0.6, typ === "pour" ? 0.65 : 0.9).toFixed(2)}s;animation-delay:-${rrLos(0, 1).toFixed(2)}s"></i>`);
    const fl = { snow: 26, sleet: 10 }[typ] || 0;
    for (let k = 0; k < fl; k++) {
      const z = rrLos(2, 5).toFixed(1);
      h.push(`<i class="fl" style="left:${rrLos(0, 100)}%;width:${z}px;height:${z}px;animation-duration:${rrLos(5, 10).toFixed(1)}s;animation-delay:-${rrLos(0, 10).toFixed(1)}s"></i>`);
    }
    if (typ === "storm") h.push(`<i class="fla"></i>`);
    const g = RR_NIEBO[typ] || RR_NIEBO.sun;
    if (foto) {
      const t = RR_TINT[typ] || 0, w = typ === "fog" ? "rgba(228,232,235,.55)" : typ === "snow" ? "rgba(225,232,238,.3)" : `rgba(40,48,58,${t})`;
      const nc2 = noc ? "linear-gradient(rgba(4,8,28,.72),rgba(10,16,40,.6))," : "";
      const poz = n > 1 ? (i ? "right" : "left") + " center/auto 100%" : "center/cover";
      return { bg: `${nc2}linear-gradient(${w},${w}),url("${foto}") ${poz} no-repeat`, html: h.join("") };
    }
    const jasno = ["sun", "partly", "wind"].includes(typ);
    const niebo = pora === "zloto" && jasno ? "#4a62a8,#e98a5c 70%,#fcc77c" : pora === "zmierzch" ? jasno ? "#141d48,#5c4a8c 60%,#d8766a" : "#1b2033,#4b4560 70%,#7a5f66" : g[noc ? 1 : 0];
    return { bg: `linear-gradient(180deg,${niebo})`, html: h.join("") };
  }

  // translations/pl.json
  var pl_default = {
    karta: {
      nazwaKarty: "Okno HA",
      opisKarty: "Realistyczne okno z roletą dzień-noc: animacja w tempie silnika, przeciąganie, prawdziwa pogoda za oknem i kreator dla początkujących",
      open: "Zwinięta",
      closed: "Opuszczona",
      opening: "Zwija się…",
      closing: "Opuszcza się…",
      unavailable: "Niedostępna",
      unknown: "Nieznany stan",
      czesc: "Częściowo opuszczona",
      up: "Zwiń",
      stop: "Stop",
      down: "Opuść",
      brak: "Nie znaleziono encji",
      okno: "okno",
      lewe: "lewe ",
      prawe: "prawe ",
      otw: "otwarte",
      uchyl: "uchylone",
      oba: "Oba skrzydła naraz",
      wx: {
        sunny: "słonecznie",
        "clear-night": "pogodnie",
        partlycloudy: "częściowe zachmurzenie",
        cloudy: "pochmurno",
        exceptional: "wyjątkowa pogoda",
        fog: "mgła",
        rainy: "deszcz",
        pouring: "ulewa",
        hail: "grad",
        lightning: "burza",
        "lightning-rainy": "burza z deszczem",
        snowy: "śnieg",
        "snowy-rainy": "deszcz ze śniegiem",
        windy: "wietrznie",
        "windy-variant": "wietrznie, pochmurno"
      }
    },
    edytor: {
      pv: "Podgląd na żywo – nie rusza prawdziwej rolety",
      play: "▶ Pokaż animację",
      wxl: [
        "prawdziwa",
        "☀️ słońce",
        "⛅ chmurki",
        "☁️ pochmurno",
        "🌧️ deszcz",
        "💧 ulewa",
        "⛈️ burza",
        "❄️ śnieg",
        "🌫️ mgła",
        "💨 wiatr",
        "🌙 noc"
      ],
      kol: "Kolor pasów",
      ram: "Kolor ramy okna",
      own: "własny",
      sk: "Skrzydła okna",
      sk1: "1 skrzydło",
      sk2: "2 skrzydła",
      pin: "Przypnij podgląd u góry",
      okp: [
        "🪟 zamknięte",
        "↘ uchylone",
        "↔ otwarte"
      ],
      d_kol: "Kolor pełnych (zaciemniających) pasów. Kolory jak w kolekcjach tkanin dzień-noc, a „własny” to dowolny kolor.",
      d_sia: "Kolor pasów przepuszczających światło. „Jak pełne” = jaśniejszy odcień koloru pasów.",
      d_ram: "Kolor ramy i skrzydeł. Kolory ze słojami to okleiny drewnopodobne.",
      d_sk: "Ile skrzydeł ma okno. Przy dwóch każde skrzydło może mieć swoją roletę.",
      d_okn: "Pokazuje się, gdy kontaktron zgłosi otwarte okno. Ruszając suwakiem widzisz okno w podglądzie.",
      d_kr: "Przyciski ▲ i ▼ pod roletą przesuwają ją o mały krok. Szybkie pozycje to przyciski z procentami.",
      sl: "Słupek między skrzydłami",
      sl1: "stały",
      sl2: "ruchomy",
      slh: "Stały zostaje w oknie. Ruchomy jest przy lewym skrzydle i po otwarciu obu skrzydeł środek jest wolny.",
      roz: "Rozmiar i tempo",
      wys: "Wysokość okna",
      auto: "Czas przejazdu automatycznie z prędkości silnika",
      czas: "Czas pełnego przejazdu (ręcznie)",
      obr: "Silniki tej rolety: {0} obr/min → pełny przejazd ok. {1} s",
      obr0: "Ta roleta nie podaje prędkości silnika",
      obrA: " – przyjęto 30 s (karta nauczy się czasu sama albo użyj kalibracji).",
      obrU: " – karta sama nauczyła się czasu: {0} s.",
      obrM: " (zmierzone na roletach Moes)",
      kal: "Kalibracja czasu przejazdu",
      kalh: "Ręcznie stoperem: kliknij, a gdy roleta dojedzie do końca – „Dojechała”. Najlepiej od samej góry do samego dołu.",
      sia: "Kolor pasów przezroczystych",
      siaj: "jak pełne",
      poz: "Szybkie pozycje (procenty po przecinku, 100 = zwinięta)",
      sec_wyg: "🎨 Wygląd",
      sec_okn: "🪟 Okno",
      sec_ruch: "⏱ Ruch i kalibracja",
      sec_zaaw: "⚙️ Zaawansowane",
      rst: "↺ Przywróć domyślne",
      wz: "🪄 Kreator",
      pre: [
        "Nowoczesny (antracyt + grafit)",
        "Klasyczne drewno (złoty dąb + beż)",
        "Skandynawski (biel + krem)",
        "Ciemny (czarna + czarne pasy)",
        "Ciepły orzech (orzech + piasek)",
        "Kolorowy (biel + turkus)"
      ],
      glob: "🌍 Ustawienia globalne",
      globh: "Zapisz ten wygląd (kolory, rama, okno, przyciski, opcje) jako domyślny dla wszystkich kart rolet – także nowych. Każda karta może go nadal zmienić u siebie.",
      gSave: "🌍 Zapisz jako domyślne dla wszystkich kart",
      gClr: "Wyczyść",
      gIle: "Zapisane globalnie: {0} ustawień. Wszystkie karty je przejmują.",
      gBrak: "Brak ustawień globalnych – karty używają domyślnych.",
      wibracja: "Lekka wibracja telefonu przy kliknięciu",
      auto_czujniki: "Sama szukaj kontaktronów okna w tym pomieszczeniu",
      czA: "🔎 Wykryte automatycznie (lewe / prawe): {0}. Ręczny wybór wyżej ma pierwszeństwo.",
      czA0: "🔎 Nie wykryto kontaktronów w pomieszczeniu tej rolety – wybierz je wyżej, jeśli masz.",
      klamki: "Klamki okna (obracają się przy uchyleniu i otwarciu)",
      kr: "Ruch krokowy",
      krs: "Jedno kliknięcie ▲/▼ przesuwa roletę o",
      kr0: "wyłączony",
      ak: "🤖 Kalibruj automatycznie",
      akx: "■ Przerwij",
      akh: "Uwaga: rusza prawdziwą roletę. Roleta sama zjedzie na górę, potem na sam dół i znowu do góry. Karta zmierzy czas i sama go zapisze.",
      ak0: "Ustawiam roletę na samej górze…",
      ak1: "Mierzę opuszczanie… {0} s",
      ak2: "Opuszczanie: {0} s. Mierzę zwijanie… {1} s",
      akok: "Gotowe ✔ Zapisano czas przejazdu {0} s",
      akstop: "Przerwano – roleta zatrzymana.",
      akrpm: "Silniki podają swoją prędkość, więc karta już sama liczy czas ({0} s). Kalibracja nie jest potrzebna ✔",
      aktm: "Roleta nie zgłosiła końca jazdy. Zmierz ręcznie stoperem poniżej.",
      kd: "⬇ Opuść i mierz",
      ku: "⬆ Zwiń i mierz",
      kok: "✔ Dojechała",
      kzap: "Zapisz ten czas",
      kwyn: "Zmierzono: {0} s",
      opc: "Opcje",
      jez: "Język karty",
      jauto: "auto",
      przyciski: "Przyciski i szybkie pozycje",
      niebo: "Niebo i pogoda za oknem",
      widok: "Rysowany widok: domy, drzewa, ulica",
      uchwyty: "Uchwyty na listwach (rusza jedno skrzydło)",
      uchwyt_srodek: "Środkowy uchwyt ⇕ (rusza oba skrzydła)",
      osobno: "Przeciąganie po szybie rusza tylko jedno skrzydło",
      odwroc: "Odwróć pozycję (silnik liczy odwrotnie)",
      s_enc: "Rolety i silniki",
      s_pog: "Pogoda i widok",
      s_okn: "Okno – kontaktrony",
      uch: "Jak mocno uchylone (do środka)",
      otw: "Jak szeroko otwarte (do środka)",
      f: {
        entity: "Roleta albo grupa rolet (lewa + prawa)",
        name: "Nazwa",
        roleta_lewa: "Roleta lewego skrzydła (opcjonalnie)",
        roleta_prawa: "Roleta prawego skrzydła (opcjonalnie)",
        predkosc_lewa: "Prędkość silnika lewej rolety (number, obr/min – opcjonalnie)",
        predkosc_prawa: "Prędkość silnika prawej rolety (number, obr/min – opcjonalnie)",
        zrodlo: "Skąd brać pogodę",
        pogoda: "Encja pogody (puste = automatycznie)",
        tlo: "Zdjęcie zza okna (np. /local/okno.jpg – plik w folderze www)",
        czujnik_lewe: "Kontaktron lewego skrzydła (lub jedynego)",
        tryb_lewe: "Lewe skrzydło po otwarciu jest…",
        czujnik_prawe: "Kontaktron prawego skrzydła",
        tryb_prawe: "Prawe skrzydło po otwarciu jest…"
      },
      zr: [
        [
          "auto",
          "z encji HA, a gdy jej nie ma – z internetu"
        ],
        [
          "internet",
          "z internetu (Open-Meteo, lokalizacja domu)"
        ],
        [
          "brak",
          "bez pogody (samo niebo)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "uchylone (góra do środka)"
        ],
        [
          "otworz",
          "otwarte (na zawiasach do środka)"
        ]
      ],
      osl: "Typ osłony",
      osln: [
        "Dzień-noc",
        "Materiałowa",
        "Plisa",
        "Rzymska",
        "Żaluzja aluminiowa",
        "Roleta nadstawna",
        "Zaciemniająca",
        "Plaster miodu",
        "Żaluzja drewniana",
        "Roleta natynkowa",
        "Roleta podtynkowa",
        "Roleta z perforacją",
        "Żaluzja fasadowa C80",
        "Żaluzja fasadowa Z90",
        "Screen ZIP"
      ],
      d_osl: "Wybierz, co masz w oknie. Karta dopasuje wygląd tkaniny, kasety, prowadnic i listwy.",
      promienie: "Promienie słońca wpadające przez okno (w dzień przy słońcu)",
      dzwiek: "Cichy dźwięk silnika przy ruchu (po kliknięciu)",
      osld: [
        "Pasy pełne i przezroczyste. Przesuwasz, a światło przechodzi przez paski.",
        "Zwykła roleta z jednolitej tkaniny. Rozprasza światło.",
        "Gęsta tkanina z powłoką. Chodzi w białych prowadnicach po bokach, nie przepuszcza światła.",
        "Tkanina złożona w harmonijkę.",
        "Plisa podwójna. Komórki jak w plastrze miodu trzymają ciepło.",
        "Tkanina układa się w miękkie fałdy.",
        "Cienkie aluminiowe listewki 25 mm na sznurkach.",
        "Szerokie drewniane lamele 50 mm na taśmach.",
        "Kaseta nad oknem w kolorze ramy, montowana razem z oknem. Pancerz z profili PVC lub aluminium.",
        "Skrzynka na elewacji ze ściętym frontem. Dobra do gotowych domów.",
        "Skrzynka schowana w ścianie pod tynkiem. Widać tylko pancerz i prowadnice.",
        "Profile z małymi otworami. Przy opuszczonej rolecie wpada trochę światła.",
        "Wygięte lamele aluminiowe 80 mm na taśmach. Można je przechylać.",
        "Płaskie lamele 90 mm w kształcie Z z uszczelką. Szczelnie zaciemniają.",
        "Zewnętrzna tkanina z siatki w prowadnicach z zamkiem. Chroni przed słońcem, a widok zostaje."
      ],
      osw: "W pokoju",
      osz: "Na zewnątrz"
    },
    kolory: {
      bezowy: "beżowy",
      bialy: "biały",
      braz: "brąz",
      pomaranczowy: "pomarańcz.",
      rozowy: "różowy",
      zolty: "żółty",
      mietowy: "miętowy",
      blekitny: "błękitny",
      sliwkowy: "śliwkowy"
    },
    kreator: {
      tytul: "Kreator karty",
      krok: "krok {0} z {1}",
      zamknij: "Zamknij kreatora",
      co: "Co:",
      poco: "Po co:",
      wstecz: "← Wstecz",
      dalej: "Dalej →",
      gotowe: "Gotowe ✔",
      kroki: {
        roleta: {
          t: "Wybierz roletę",
          co: "roletę albo grupę rolet, którą ta karta ma pokazywać i sterować. Na liście są tylko rolety – bez bram, drzwi garażowych i innych urządzeń.",
          poco: "karta wysyła do niej komendy (zwiń, opuść, ustaw %) i rysuje jej prawdziwą pozycję."
        },
        okno: {
          t: "Okno i skrzydła",
          co: "ile skrzydeł ma okno i która roleta wisi na którym skrzydle.",
          poco: "każde skrzydło na karcie rusza się razem ze swoją prawdziwą roletą."
        },
        silnik: {
          t: "Prędkość silnika",
          co: "encja z prędkością silnika (obr/min), jeśli silnik ją podaje (np. Moes, Tuya). Na liście są tylko encje prędkości.",
          poco: "animacja jedzie dokładnie w tempie prawdziwej rolety. Bez tego karta sama nauczy się czasu."
        },
        czujniki: {
          t: "Czujniki okna",
          co: "kontaktrony (czujniki otwarcia) – osobno lewe i prawe skrzydło. Na liście są tylko czujniki okien, drzwi i otwarcia.",
          poco: "gdy uchylisz albo otworzysz okno, karta pokaże to na rysunku. Ten krok można pominąć."
        },
        pogoda: {
          t: "Pogoda za oknem",
          co: "skąd karta bierze pogodę.",
          poco: "za szybą widać prawdziwe niebo: słońce, chmury, deszcz, śnieg, noc i temperaturę."
        },
        wyglad: {
          t: "Wygląd i nazwa",
          co: "gotowy zestaw kolorów ramy i rolety oraz nazwa na karcie.",
          poco: "żeby karta wyglądała jak Twoje okno. Każdy kolor zmienisz później w dziale 🎨 Wygląd."
        },
        gdzie: {
          t: "Gotowe – sprawdź i zapisz",
          co: "podsumowanie tego, co karta znalazła, i miejsce, gdzie ma się pokazać.",
          poco: "żeby nic nie zostało do poprawiania. Jeśli coś trzeba zrobić, jest tu napisane co i gdzie."
        }
      },
      najlepsze: "najlepsze dopasowanie",
      auto: "wybrane samo",
      inna: "Inna (tylko pasujące encje)",
      inne: "Pasujących encji: {0}. Pozostałe znajdziesz w liście „Inna” poniżej.",
      bez: "Bez czujnika",
      niedost: "niedostępna",
      otwarte: "otwarte",
      zamkniete: "zamknięte",
      why: {
        grupa: "grupa rolet",
        poz: "zna pozycję %",
        czlonek: "z wybranej grupy",
        urz: "to samo urządzenie",
        pom: "to samo pomieszczenie",
        nazwa: "pasuje nazwa",
        nazwa2: "podobna nazwa",
        lewa: "„lewe” w nazwie",
        prawa: "„prawe” w nazwie",
        okno: "czujnik okna",
        drzwi: "czujnik drzwi",
        rpm: "jednostka obr/min",
        typowa: "główna pogoda HA",
        off: "⚠ niedostępna"
      },
      znaleziono: "Znalazłem {0} pasujących rolet. Najlepsze są na górze.",
      brakRolet: "W Home Assistancie nie ma jeszcze żadnej rolety. Najpierw dodaj silnik rolety: Ustawienia → Urządzenia i usługi → „+ Dodaj integrację” (np. Zigbee2MQTT, ZHA, Tuya, Shelly). Potem wróć tutaj – kreator sam ją znajdzie.",
      btnIntegr: "Otwórz Urządzenia i usługi",
      niedostepna: "„{0}” jest teraz niedostępna. Sprawdź zasilanie silnika i zasięg (Zigbee / Wi-Fi). Kartę możesz dodać już teraz – zacznie działać, gdy roleta wróci.",
      bezPoz: "„{0}” nie podaje pozycji w %. Karta pokaże tylko „zwinięta / opuszczona”, a przeciąganie wyśle zwiń albo opuść.",
      grupaOk: "To grupa {0} rolet – ustawiłem okno 2-skrzydłowe, każde skrzydło ze swoją roletą.",
      wybierz: "Wybierz roletę z listy, żeby przejść dalej.",
      sk1: "1 skrzydło",
      sk2: "2 skrzydła",
      skL: "Lewe skrzydło",
      skP: "Prawe skrzydło",
      skJ: "Okno",
      jednaNaDwa: "Jedna roleta na dwa skrzydła: obie połówki na karcie ruszą razem. Jeśli każde skrzydło ma swoją roletę, wybierz je poniżej albo zrób grupę: Ustawienia → Urządzenia i usługi → Pomocnicy → „+ Utwórz pomocnika” → Grupa → Grupa rolet.",
      btnPomocnicy: "Otwórz Pomocników",
      rpmOk: "{0}: silnik {1} obr/min → pełny przejazd ok. {2} s",
      rpmBrak: "{0}: silnik nie podaje prędkości – nic nie szkodzi, karta sama nauczy się czasu z pierwszych ruchów rolety.",
      rpmZadnej: "W HA nie ma encji z prędkością silnika. To normalne dla większości silników – karta sama nauczy się czasu przejazdu. Chcesz od razu? Zmierz go przyciskiem poniżej.",
      kal: "🤖 Zmierz czas teraz (roleta pojedzie góra → dół → góra)",
      czBrak: "W HA nie ma czujników okna (czujnik binarny typu okno, drzwi albo otwarcie). Ten krok możesz pominąć – karta działa bez nich.",
      czBezPom: "Roleta nie ma przypisanego pomieszczenia, więc kreator nie wie, które czujniki są w tym samym pokoju. Przypisz pomieszczenie do urządzenia rolety (Ustawienia → Urządzenia → roleta → ✏️ → Pomieszczenie), a dopasowanie będzie lepsze.",
      btnUrz: "Otwórz urządzenie rolety",
      czAuto: "Czujniki dobrane automatycznie z tego samego pomieszczenia. Możesz wybrać inne.",
      tryb: "Gdy czujnik pokaże „otwarte”, skrzydło jest:",
      zr: [
        [
          "auto",
          "🔎 Automatycznie"
        ],
        [
          "internet",
          "🌐 Z internetu"
        ],
        [
          "brak",
          "🚫 Bez pogody"
        ]
      ],
      wxTeraz: "Teraz za oknem: {0}",
      wxBrak: "W HA nie ma integracji pogody – karta weźmie pogodę z internetu (Open-Meteo: darmowe, bez konta i klucza) dla lokalizacji Twojego domu.",
      wxBezLok: "HA nie zna lokalizacji domu, więc pogoda z internetu nie zadziała. Ustaw ją: Ustawienia → System → Ogólne → pinezka na mapie.",
      btnOgolne: "Otwórz ustawienia ogólne",
      wxNiedost: "„{0}” jest niedostępna – sprawdź integrację pogody. Do czasu naprawy karta weźmie pogodę z internetu.",
      wxNic: "Bez pogody za szybą jest zwykłe niebo dzień / noc.",
      nazwa: "Nazwa na karcie (puste = nazwa rolety)",
      podglad: "Podgląd na żywo jest niżej – każda zmiana od razu się na nim pokazuje.",
      jezyk: "Kreator i karta mówią po {0} – tak jak Twój profil w HA. Zmienisz to w ⚙️ Zaawansowane.",
      jezykNazwa: "polsku",
      pods: "Podsumowanie",
      pRoleta: "Roleta: {0}",
      pSk: "Skrzydła: {0}",
      pSil: "Silnik: {0}",
      pSilU: "Czas przejazdu: karta nauczy się sama",
      pCz: "Czujniki okna: {0}",
      pCzB: "Czujniki okna: brak (to nic, są opcjonalne)",
      pWx: "Pogoda: {0}",
      pWxI: "Pogoda: z internetu (Open-Meteo)",
      pWxB: "Pogoda: wyłączona",
      pWyg: "Wygląd: rama – {0}, pasy – {1}",
      gdzieT: "Gdzie będzie karta",
      tutaj: "Karta trafi do widoku, który teraz edytujesz. Kliknij na dole tego okna „Zapisz” – i gotowe.",
      tez: "Chcesz ją mieć także na innym panelu? Wybierz panel i widok – dodam tam kopię od razu.",
      panel: "Panel",
      widok: "Widok",
      nowyWidok: "➕ Nowy widok „Rolety”",
      nowyTytul: "Rolety",
      dodaj: "Dodaj kopię tam",
      dodano: "Dodano ✔ {0} → {1}",
      blad: "Nie udało się: {0}",
      bezAdmina: "Dodawanie kart do innych paneli wymaga konta administratora HA.",
      domyslny: "Przegląd (domyślny)",
      tenPanel: " (ten – wystarczy „Zapisz”)",
      autoPanel: " (automatyczny – nie da się)",
      yaml: " (YAML – tylko ręcznie)",
      widokPanel: " (pełny ekran – tylko 1 karta)",
      wczytuje: "Wczytuję panele…",
      verOk: "Karta zainstalowana poprawnie – masz najnowszą wersję {0} ✔",
      verNowa: "Jest nowsza wersja {0} (masz {1}). Zaktualizuj: HACS → Okno HA → ⋮ → Pobierz ponownie, potem przeładuj stronę (komputer: Ctrl+F5, telefon: zamknij i otwórz aplikację).",
      btnHacs: "Otwórz HACS",
      btnPrzeladuj: "🔄 Przeładuj stronę",
      zasobyDup: "Karta jest dodana w Zasobach {0} razy. Zostaw jeden wpis (Ustawienia → Panele → ⋮ → Zasoby), inaczej mogą się mieszać stare i nowe wersje.",
      btnZasoby: "Otwórz Zasoby",
      obr: "obr/min"
    }
  };

  // translations/en.json
  var en_default = {
    karta: {
      nazwaKarty: "HA Window",
      opisKarty: "Realistic window with a day-night blind: animation at motor speed, drag to move, real weather outside and a beginner wizard",
      open: "Open",
      closed: "Closed",
      opening: "Opening…",
      closing: "Closing…",
      unavailable: "Unavailable",
      unknown: "Unknown",
      czesc: "Partly closed",
      up: "Open",
      stop: "Stop",
      down: "Close",
      brak: "Entity not found",
      okno: "window",
      lewe: "left ",
      prawe: "right ",
      otw: "open",
      uchyl: "tilted",
      oba: "Both sashes",
      wx: {
        sunny: "sunny",
        "clear-night": "clear",
        partlycloudy: "partly cloudy",
        cloudy: "cloudy",
        exceptional: "exceptional",
        fog: "fog",
        rainy: "rain",
        pouring: "pouring",
        hail: "hail",
        lightning: "lightning",
        "lightning-rainy": "thunderstorm",
        snowy: "snow",
        "snowy-rainy": "sleet",
        windy: "windy",
        "windy-variant": "windy, cloudy"
      }
    },
    edytor: {
      pv: "Live preview – does not move the real blind",
      play: "▶ Show animation",
      wxl: [
        "real",
        "☀️ sun",
        "⛅ partly",
        "☁️ cloudy",
        "🌧️ rain",
        "💧 downpour",
        "⛈️ storm",
        "❄️ snow",
        "🌫️ fog",
        "💨 wind",
        "🌙 night"
      ],
      kol: "Stripe colour",
      ram: "Window frame colour",
      own: "custom",
      sk: "Window sashes",
      sk1: "1 sash",
      sk2: "2 sashes",
      pin: "Pin preview to top",
      okp: [
        "🪟 closed",
        "↘ tilted",
        "↔ open"
      ],
      d_kol: "Colour of the solid (blackout) stripes, as in day-night fabric collections; “custom” = any colour.",
      d_sia: "Colour of the sheer stripes. “Like solid” = a lighter shade of the stripe colour.",
      d_ram: "Colour of the frame and sashes. Colours with grain are wood-look veneers.",
      d_sk: "Number of window sashes. With two, each sash can have its own blind.",
      d_okn: "Shown when a contact sensor reports the window open. Move a slider to see it in the preview.",
      d_kr: "The ▲ and ▼ buttons move the blind by a small step. Quick positions are the percentage buttons.",
      sl: "Mullion between sashes",
      sl1: "fixed",
      sl2: "moving",
      slh: "A fixed mullion stays in the frame. A moving one is part of the left sash, so with both sashes open the middle is free.",
      roz: "Size and speed",
      wys: "Window height",
      auto: "Travel time from motor speed (auto)",
      czas: "Full travel time (manual)",
      obr: "Motor speed: {0} rpm → full travel approx. {1} s",
      obr0: "This blind does not report motor speed",
      obrA: " – assuming 30 s (the card will learn it, or use calibration).",
      obrU: " – learned travel time: {0} s.",
      obrM: " (measured on Moes motors)",
      kal: "Travel time calibration",
      kalh: "Manual stopwatch: click, then press “Arrived” when the blind reaches the end. Best from fully open to fully closed.",
      sia: "Sheer stripe colour",
      siaj: "like solid",
      poz: "Quick positions (percent, comma separated, 100 = open)",
      sec_wyg: "🎨 Look",
      sec_okn: "🪟 Window",
      sec_ruch: "⏱ Motion and calibration",
      sec_zaaw: "⚙️ Advanced",
      rst: "↺ Restore defaults",
      wz: "🪄 Wizard",
      pre: [
        "Modern (anthracite + graphite)",
        "Classic wood (golden oak + beige)",
        "Scandinavian (white + cream)",
        "Dark (black + black stripes)",
        "Warm walnut (walnut + sand)",
        "Colourful (white + turquoise)"
      ],
      glob: "🌍 Global settings",
      globh: "Save this look (colours, frame, window, buttons, options) as the default for all blind cards, including new ones. Each card can still change it.",
      gSave: "🌍 Save as default for all cards",
      gClr: "Clear",
      gIle: "Saved globally: {0} settings. All cards use them.",
      gBrak: "No global settings – cards use the defaults.",
      wibracja: "Light phone vibration on tap",
      auto_czujniki: "Find window contact sensors in this room automatically",
      czA: "🔎 Detected automatically (left / right): {0}. Manual choice above takes priority.",
      czA0: "🔎 No contact sensors found in this blind’s room – pick them above if you have any.",
      klamki: "Window handles (turn when tilted or opened)",
      kr: "Step movement",
      krs: "One tap ▲/▼ moves the blind by",
      kr0: "off",
      ak: "🤖 Calibrate automatically",
      akx: "■ Abort",
      akh: "Note: this moves the real blind. It goes fully up, fully down and up again. The card measures the time and saves it.",
      ak0: "Moving the blind to the top…",
      ak1: "Timing closing… {0} s",
      ak2: "Closing: {0} s. Timing opening… {1} s",
      akok: "Done ✔ Saved travel time {0} s",
      akstop: "Aborted – blind stopped.",
      akrpm: "The motors report their speed, so the card already computes the time ({0} s). No calibration needed ✔",
      aktm: "The blind did not report the end of travel. Use the manual stopwatch below.",
      kd: "⬇ Close & time",
      ku: "⬆ Open & time",
      kok: "✔ Arrived",
      kzap: "Save this time",
      kwyn: "Measured: {0} s",
      opc: "Options",
      jez: "Card language",
      jauto: "auto",
      przyciski: "Buttons and quick positions",
      niebo: "Sky and weather outside",
      widok: "Drawn view: houses, trees, street",
      uchwyty: "Handles on bottom rails (move one sash)",
      uchwyt_srodek: "Centre handle ⇕ (moves both sashes)",
      osobno: "Dragging on the glass moves one sash only",
      odwroc: "Invert position (motor counts reversed)",
      s_enc: "Blinds and motors",
      s_pog: "Weather and view",
      s_okn: "Window – contact sensors",
      uch: "Tilt amount (inward)",
      otw: "Opening width (inward)",
      f: {
        entity: "Blind or blind group (left + right)",
        name: "Name",
        roleta_lewa: "Left sash blind (optional)",
        roleta_prawa: "Right sash blind (optional)",
        predkosc_lewa: "Left motor speed (number, rpm – optional)",
        predkosc_prawa: "Right motor speed (number, rpm – optional)",
        zrodlo: "Weather source",
        pogoda: "Weather entity (empty = automatic)",
        tlo: "Photo of the view (e.g. /local/window.jpg – file in www folder)",
        czujnik_lewe: "Left sash contact sensor (or the only one)",
        tryb_lewe: "When open, the left sash is…",
        czujnik_prawe: "Right sash contact sensor",
        tryb_prawe: "When open, the right sash is…"
      },
      zr: [
        [
          "auto",
          "HA entity, internet if there is none"
        ],
        [
          "internet",
          "internet (Open-Meteo, home location)"
        ],
        [
          "brak",
          "no weather (plain sky)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "tilted (top inward)"
        ],
        [
          "otworz",
          "open (on hinges, inward)"
        ]
      ],
      osl: "Shade type",
      osln: [
        "Day-night",
        "Fabric roller",
        "Pleated",
        "Roman",
        "Aluminium venetian",
        "Top-mounted shutter",
        "Blackout",
        "Honeycomb",
        "Wooden venetian",
        "Surface-mounted shutter",
        "Concealed shutter",
        "Perforated shutter",
        "External venetian C80",
        "External venetian Z90",
        "Screen ZIP"
      ],
      d_osl: "Pick what you have in your window. The card matches the fabric, box, side guides and bottom bar.",
      promienie: "Sun rays coming through the window (daytime, when sunny)",
      dzwiek: "Quiet motor sound while moving (after a tap)",
      osld: [
        "Solid and sheer stripes. Slide them to let light through the sheer stripes.",
        "A plain roller of solid fabric. Diffuses the light.",
        "Dense coated fabric. Runs in white side channels and blocks the light.",
        "Fabric folded like an accordion.",
        "Double pleat. Honeycomb cells keep the warmth in.",
        "Fabric gathers in soft folds.",
        "Thin 25 mm aluminium slats on cords.",
        "Wide 50 mm wooden slats on tapes.",
        "Box above the window in the frame colour, fitted with the window. Curtain of PVC or aluminium profiles.",
        "Box on the outside wall with a bevelled front. Good for existing houses.",
        "Box hidden in the wall under the plaster. Only the curtain and guides are visible.",
        "Profiles with small holes. Some light comes in when closed.",
        "Curved 80 mm aluminium slats on tapes. They can tilt.",
        "Flat 90 mm Z-shaped slats with a seal. Very dark when closed.",
        "Outside mesh fabric in zipped side guides. Keeps the sun out, keeps the view."
      ],
      osw: "Inside",
      osz: "Outside"
    },
    kolory: {
      czarny: "black",
      grafit: "graphite",
      szary: "grey",
      bezowy: "beige",
      kremowy: "cream",
      bialy: "white",
      braz: "brown",
      granat: "navy",
      pomaranczowy: "orange",
      czerwony: "red",
      bordo: "burgundy",
      rozowy: "pink",
      fiolet: "purple",
      niebieski: "blue",
      turkus: "turquoise",
      zielony: "green",
      limonka: "lime",
      zolty: "yellow",
      oliwka: "olive",
      piaskowy: "sand",
      cappuccino: "cappuccino",
      mokka: "mocha",
      wenge: "wenge",
      popiel: "ash",
      srebrny: "silver",
      stalowy: "steel",
      lawendowy: "lavender",
      pudrowy: "powder pink",
      mietowy: "mint",
      blekitny: "sky blue",
      morski: "teal",
      butelkowy: "bottle green",
      musztardowy: "mustard",
      terakota: "terracotta",
      sliwkowy: "plum"
    },
    kreator: {
      tytul: "Card wizard",
      krok: "step {0} of {1}",
      zamknij: "Close wizard",
      co: "What:",
      poco: "Why:",
      wstecz: "← Back",
      dalej: "Next →",
      gotowe: "Done ✔",
      kroki: {
        roleta: {
          t: "Pick your blind",
          co: "the blind or blind group this card shows and controls. Only blinds are listed – no gates, garage doors or other devices.",
          poco: "the card sends it commands (open, close, set %) and draws its real position."
        },
        okno: {
          t: "Window and sashes",
          co: "how many sashes the window has and which blind hangs on which sash.",
          poco: "each sash on the card moves together with its real blind."
        },
        silnik: {
          t: "Motor speed",
          co: "an entity with the motor speed (rpm), if your motor reports it (e.g. Moes, Tuya). Only speed entities are listed.",
          poco: "the animation moves exactly at the speed of the real blind. Without it the card learns the time by itself."
        },
        czujniki: {
          t: "Window sensors",
          co: "contact sensors of the window – left and right sash separately. Only window, door and opening sensors are listed.",
          poco: "when you tilt or open the window, the card shows it. This step is optional."
        },
        pogoda: {
          t: "Weather outside",
          co: "where the card takes the weather from.",
          poco: "you see the real sky behind the glass: sun, clouds, rain, snow, night and the temperature."
        },
        wyglad: {
          t: "Look and name",
          co: "a ready-made set of frame and blind colours and the name on the card.",
          poco: "so the card looks like your window. You can change every colour later in 🎨 Look."
        },
        gdzie: {
          t: "Done – check and save",
          co: "a summary of what the card found and where it should appear.",
          poco: "so nothing is left to fix. If something needs doing, it says what and where."
        }
      },
      najlepsze: "best match",
      auto: "picked automatically",
      inna: "Other (matching entities only)",
      inne: "Matching entities: {0}. Find the rest in the “Other” list below.",
      bez: "No sensor",
      niedost: "unavailable",
      otwarte: "open",
      zamkniete: "closed",
      why: {
        grupa: "blind group",
        poz: "reports position %",
        czlonek: "from the chosen group",
        urz: "same device",
        pom: "same room",
        nazwa: "name matches",
        nazwa2: "similar name",
        lewa: "“left” in name",
        prawa: "“right” in name",
        okno: "window sensor",
        drzwi: "door sensor",
        rpm: "rpm unit",
        typowa: "main HA weather",
        off: "⚠ unavailable"
      },
      znaleziono: "I found {0} matching blinds. The best ones are on top.",
      brakRolet: "There is no blind in Home Assistant yet. Add your blind motor first: Settings → Devices & services → “+ Add integration” (e.g. Zigbee2MQTT, ZHA, Tuya, Shelly). Then come back – the wizard will find it.",
      btnIntegr: "Open Devices & services",
      niedostepna: "“{0}” is unavailable right now. Check the motor power and range (Zigbee / Wi-Fi). You can add the card now – it will work once the blind is back.",
      bezPoz: "“{0}” does not report a position in %. The card will only show “open / closed”, and dragging will send open or close.",
      grupaOk: "This is a group of {0} blinds – I set a 2-sash window, each sash with its own blind.",
      wybierz: "Pick a blind from the list to continue.",
      sk1: "1 sash",
      sk2: "2 sashes",
      skL: "Left sash",
      skP: "Right sash",
      skJ: "Window",
      jednaNaDwa: "One blind for two sashes: both halves on the card move together. If each sash has its own blind, pick them below or create a group: Settings → Devices & services → Helpers → “+ Create helper” → Group → Cover group.",
      btnPomocnicy: "Open Helpers",
      rpmOk: "{0}: motor {1} rpm → full travel approx. {2} s",
      rpmBrak: "{0}: the motor does not report speed – no problem, the card learns the travel time from the first moves.",
      rpmZadnej: "There is no motor speed entity in HA. That is normal for most motors – the card learns the travel time by itself. Want it now? Measure it with the button below.",
      kal: "🤖 Measure the time now (the blind goes up → down → up)",
      czBrak: "There are no window sensors in HA (binary sensor of type window, door or opening). You can skip this step – the card works without them.",
      czBezPom: "The blind has no room (area), so the wizard cannot tell which sensors are in the same room. Assign a room to the blind’s device (Settings → Devices → blind → ✏️ → Area) for better matches.",
      btnUrz: "Open the blind’s device",
      czAuto: "Sensors picked automatically from the same room. You can choose others.",
      tryb: "When the sensor reports “open”, the sash is:",
      zr: [
        [
          "auto",
          "🔎 Automatic"
        ],
        [
          "internet",
          "🌐 From the internet"
        ],
        [
          "brak",
          "🚫 No weather"
        ]
      ],
      wxTeraz: "Outside right now: {0}",
      wxBrak: "There is no weather integration in HA – the card takes the weather from the internet (Open-Meteo: free, no account or key) for your home location.",
      wxBezLok: "HA does not know your home location, so internet weather will not work. Set it: Settings → System → General → pin on the map.",
      btnOgolne: "Open general settings",
      wxNiedost: "“{0}” is unavailable – check the weather integration. Until it is fixed the card uses internet weather.",
      wxNic: "Without weather the glass shows a plain day / night sky.",
      nazwa: "Name on the card (empty = blind name)",
      podglad: "The live preview is below – every change shows up right away.",
      jezyk: "The wizard and card speak {0} – same as your HA profile. Change it in ⚙️ Advanced.",
      jezykNazwa: "English",
      pods: "Summary",
      pRoleta: "Blind: {0}",
      pSk: "Sashes: {0}",
      pSil: "Motor: {0}",
      pSilU: "Travel time: the card learns it",
      pCz: "Window sensors: {0}",
      pCzB: "Window sensors: none (fine, they are optional)",
      pWx: "Weather: {0}",
      pWxI: "Weather: from the internet (Open-Meteo)",
      pWxB: "Weather: off",
      pWyg: "Look: frame – {0}, stripes – {1}",
      gdzieT: "Where the card goes",
      tutaj: "The card goes to the view you are editing now. Click “Save” at the bottom of this dialog – done.",
      tez: "Want it on another dashboard too? Pick a dashboard and view – I will add a copy there right away.",
      panel: "Dashboard",
      widok: "View",
      nowyWidok: "➕ New view “Blinds”",
      nowyTytul: "Blinds",
      dodaj: "Add a copy there",
      dodano: "Added ✔ {0} → {1}",
      blad: "Failed: {0}",
      bezAdmina: "Adding cards to other dashboards needs an HA administrator account.",
      domyslny: "Overview (default)",
      tenPanel: " (this one – just “Save”)",
      autoPanel: " (automatic – not possible)",
      yaml: " (YAML – manual only)",
      widokPanel: " (panel – 1 card only)",
      wczytuje: "Loading dashboards…",
      verOk: "Card installed correctly – you have the latest version {0} ✔",
      verNowa: "A newer version {0} is available (you have {1}). Update: HACS → Okno HA → ⋮ → Redownload, then reload the page (PC: Ctrl+F5, phone: close and reopen the app).",
      btnHacs: "Open HACS",
      btnPrzeladuj: "🔄 Reload page",
      zasobyDup: "The card is added {0} times in Resources. Keep one entry (Settings → Dashboards → ⋮ → Resources), otherwise old and new versions may mix.",
      btnZasoby: "Open Resources",
      obr: "rpm"
    }
  };

  // src/jezyk.js
  var rrFn = (v) => typeof v === "string" && /\{\d\}/.test(v) ? (...a) => v.replace(/\{(\d)\}/g, (_, i) => a[i] ?? "") : Array.isArray(v) ? v.map(rrFn) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rrFn(x)])) : v;
  var RR_JEZYKI = { pl: rrFn(pl_default), en: rrFn(en_default) };
  var RR_TXT = { pl: RR_JEZYKI.pl.karta, en: RR_JEZYKI.en.karta };
  var RR_ED = { pl: RR_JEZYKI.pl.edytor, en: RR_JEZYKI.en.edytor };
  var RR_KOL_NAZWY = { pl: RR_JEZYKI.pl.kolory, en: RR_JEZYKI.en.kolory };
  var rrJezyk = (c, hass) => c?.jezyk === "pl" || c?.jezyk === "en" ? c.jezyk : String(hass?.locale?.language || hass?.language || navigator.language || "pl").startsWith("pl") ? "pl" : "en";

  // src/wykrywanie.js
  var rrRpmId = (hass, cover, enc) => {
    if (enc) return enc;
    const g = String(cover).replace("cover.", "number.") + "_motor_speed";
    if (hass?.states[g]) return g;
    const dev = hass?.entities?.[cover]?.device_id;
    return dev ? Object.keys(hass.entities).find((k) => k.startsWith("number.") && hass.entities[k].device_id === dev && /speed|predkos|rpm/i.test(k)) : void 0;
  };
  var rrRpm = (hass, cover, enc) => parseFloat(hass?.states[rrRpmId(hass, cover, enc)]?.state);
  var rrCzujnikiAuto = (hass, cover) => {
    const E = hass?.entities, D = hass?.devices;
    if (!E || !E[cover]) return [];
    const area = (e) => E[e]?.area_id || D?.[E[e]?.device_id]?.area_id;
    const a = area(cover);
    if (!a) return [];
    const ok = Object.keys(E).filter((k) => k.startsWith("binary_sensor.") && area(k) === a && ["window", "door", "opening"].includes(hass.states[k]?.attributes?.device_class)).sort();
    const nm = (k) => (k + " " + (hass.states[k]?.attributes?.friendly_name || "")).toLowerCase();
    const l = ok.find((k) => /lew|left/.test(nm(k))), r = ok.find((k) => /praw|right/.test(nm(k)));
    if (l || r) return [l || ok.find((k) => k !== r), r || ok.find((k) => k !== l)];
    return ok.slice(0, 2);
  };
  var rrPogodaId = (c, hass) => c.pogoda && c.pogoda !== "auto" ? c.pogoda : ["weather.forecast_home", "weather.home", "weather.dom"].find((k) => hass.states[k]) || Object.keys(hass.states).find((k) => k.startsWith("weather."));
  var rrBezPl = (s) => String(s || "").toLowerCase().replace(/ł/g, "l").normalize("NFD").replace(/[̀-ͯ]/g, "");
  var RR_POMIN = /* @__PURE__ */ new Set([
    "cover",
    "binary",
    "sensor",
    "number",
    "weather",
    "lewa",
    "lewe",
    "lewy",
    "prawa",
    "prawe",
    "prawy",
    "left",
    "right",
    "okno",
    "window",
    "roleta",
    "rolety",
    "blind",
    "motor",
    "speed",
    "predkosc",
    "silnik",
    "silnika",
    "contact",
    "kontaktron",
    "czujnik",
    "sensor"
  ]);
  var rrSlowa = (s) => rrBezPl(s).split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !RR_POMIN.has(w));
  var RR_NIE_ROLETY = ["garage", "gate", "door", "damper"];
  var rrNazwa = (h, id) => h?.states?.[id]?.attributes?.friendly_name || id;
  var rrObszar = (h, id) => {
    const e = h?.entities?.[id];
    return e?.area_id || h?.devices?.[e?.device_id]?.area_id || null;
  };
  var rrObszarNazwa = (h, id) => {
    const a = rrObszar(h, id);
    return a ? h.areas?.[a]?.name || a : "";
  };
  function rrKandydaci(h, rola, ref = {}) {
    const S = h?.states;
    if (!S) return [];
    const E = h.entities || {}, out = [], dev = (id) => E[id]?.device_id;
    const rc = ref.cover, rDev = rc && dev(rc), rArea = ref.area !== void 0 ? ref.area : rc && rrObszar(h, rc);
    const rW = new Set(rc ? rrSlowa(rrNazwa(h, rc) + " " + rc) : []);
    for (const id in S) {
      const dom = id.split(".")[0], st = S[id], a = st.attributes || {}, reg = E[id] || {}, nm = rrBezPl(id + " " + (a.friendly_name || ""));
      if (reg.hidden) continue;
      const why = [];
      let sc = 0;
      const plus = (w, p) => {
        sc += p;
        why.push(w);
      };
      if (rola === "cover" || rola === "skrzydlo") {
        if (dom !== "cover" || RR_NIE_ROLETY.includes(a.device_class) || reg.entity_category) continue;
        const grupa = (a.entity_id || []).length > 1;
        if (rola === "cover") {
          if (grupa) plus("grupa", 40);
        } else if (grupa) continue;
        else if ((ref.members || []).includes(id)) plus("czlonek", 100);
        if (a.supported_features & 4) plus("poz", 10);
        if (/rolet|zaluz|blind|shade|shutter|rolo|zaslon|curtain/.test(nm)) sc += 5;
      } else if (rola === "speed") {
        if (dom !== "number") continue;
        const rpm = /rpm|obr/i.test(a.unit_of_measurement || "");
        if (!rpm && !/speed|predkos|obrot|rpm/.test(nm)) continue;
        if (rc && id === rc.replace("cover.", "number.") + "_motor_speed") plus("nazwa", 60);
        if (rDev && dev(id) === rDev) plus("urz", 100);
        if (rpm) plus("rpm", 10);
      } else if (rola === "contact") {
        if (dom !== "binary_sensor" || !["window", "door", "opening"].includes(a.device_class) || reg.entity_category) continue;
        if (a.device_class === "window") plus("okno", 10);
        else if (a.device_class === "door") why.push("drzwi");
      } else if (rola === "weather") {
        if (dom !== "weather") continue;
        if (["weather.forecast_home", "weather.home", "weather.dom"].includes(id)) plus("typowa", 10);
      } else continue;
      if (rArea && rola !== "cover" && rola !== "weather" && rrObszar(h, id) === rArea) plus("pom", 40);
      if (ref.side !== void 0) {
        if ((ref.side ? /praw|right/ : /lew|left/).test(nm)) plus(ref.side ? "prawa" : "lewa", 30);
        if ((ref.side ? /lew|left/ : /praw|right/).test(nm)) sc -= 25;
      }
      if (rW.size && rola !== "cover" && rrSlowa(nm).some((w) => rW.has(w))) plus("nazwa2", 15);
      if (st.state === "unavailable") {
        sc -= 50;
        why.push("off");
      }
      out.push({ id, sc, why: [...new Set(why)] });
    }
    return out.sort((x, y) => y.sc - x.sc || rrNazwa(h, x.id).localeCompare(rrNazwa(h, y.id)));
  }

  // src/globalne.js
  var RR_GKLUCZE = [
    "kolor",
    "siatka",
    "rama",
    "skrzydla",
    "slupek",
    "wysokosc",
    "klamki",
    "uchwyty",
    "uchwyt_srodek",
    "przyciski",
    "niebo",
    "widok",
    "krok",
    "pozycje",
    "wibracja",
    "kat_uchyl",
    "otwarcie",
    "jezyk",
    "zrodlo",
    "auto_czujniki",
    "oslona",
    "promienie",
    "dzwiek"
  ];
  var RR_G = { v: null, p: null };
  var rrGlobLoad = (hass) => {
    if (!RR_G.p) RR_G.p = (hass?.callWS ? hass.callWS({ type: "frontend/get_user_data", key: "roleta-realistyczna" }).then((r) => r?.value) : Promise.resolve().then(() => {
      try {
        return JSON.parse(localStorage.getItem("rr-glob") || "null");
      } catch (x) {
        return null;
      }
    })).catch(() => null).then((v) => {
      RR_G.v = v || {};
    });
    return RR_G.p;
  };
  var rrGlobSave = (hass, v) => {
    RR_G.v = v;
    RR_G.p = Promise.resolve();
    window.dispatchEvent(new Event("rr-glob"));
    if (hass?.callWS) return hass.callWS({ type: "frontend/set_user_data", key: "roleta-realistyczna", value: v });
    try {
      localStorage.setItem("rr-glob", JSON.stringify(v));
    } catch (x) {
    }
    return Promise.resolve();
  };

  // src/karta-styl.js
  function rrTkanina(typ, col, c) {
    const S = (k) => rrShade(col, k), A = (x, a) => rrRgba(x, a);
    const brzegi = "linear-gradient(90deg,rgba(0,0,0,.22),rgba(255,255,255,.05) 30%,rgba(0,0,0,0) 60%,rgba(0,0,0,.2))";
    const splot = "repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px)", bez = "linear-gradient(transparent,transparent)";
    const h = RR_OKRES / 2;
    const tasmy = (k, w) => `linear-gradient(90deg,transparent calc(25% - ${w / 2}px),${k} calc(25% - ${w / 2}px),${k} calc(25% + ${w / 2}px),transparent calc(25% + ${w / 2}px),transparent calc(75% - ${w / 2}px),${k} calc(75% - ${w / 2}px),${k} calc(75% + ${w / 2}px),transparent calc(75% + ${w / 2}px))`;
    const pancerz = (o) => `${S(0.25)} ${o}px,${col} ${o + 3}px,${col} ${o + 9}px,${S(-0.35)} ${o + 12}px,rgba(0,0,0,.55) ${o + 12}px,rgba(0,0,0,.55) ${o + h}px`;
    switch (typ) {
      case "pelna":
        return `${brzegi},${splot},linear-gradient(180deg,${col} 0,${S(-0.06)} ${h}px,${col} ${RR_OKRES}px)`;
      /* v27: zaciemniająca – gęsta tkanina z powłoką, lekki połysk, bez prześwitu */
      case "zaciemniajaca":
        return `${brzegi},linear-gradient(90deg,rgba(255,255,255,0) 20%,rgba(255,255,255,.07) 45%,rgba(255,255,255,0) 70%),linear-gradient(180deg,${col} 0,${S(0.03)} ${h}px,${col} ${RR_OKRES}px)`;
      case "plisa":
        return `${brzegi},${bez},linear-gradient(180deg,${A(S(0.2), 0.94)} 0,${A(col, 0.94)} 5px,${A(S(-0.24), 0.96)} ${h - 0.5}px,${A(S(0.2), 0.94)} ${h}px,${A(col, 0.94)} ${h + 5}px,${A(S(-0.24), 0.96)} ${RR_OKRES - 0.5}px,${A(S(0.2), 0.94)} ${RR_OKRES}px)`;
      /* v27: plaster miodu – plisa podwójna, w każdym fałdzie widać szew komórki */
      case "plaster": {
        const kom = (o) => `${A(S(0.24), 0.95)} ${o}px,${A(col, 0.93)} ${o + 3}px,${A(S(-0.12), 0.94)} ${o + 6}px,${A(S(-0.34), 0.97)} ${o + 6.5}px,${A(S(0.1), 0.93)} ${o + 7}px,${A(col, 0.93)} ${o + 10}px,${A(S(-0.28), 0.96)} ${o + h - 0.5}px`;
        return `${brzegi},${bez},linear-gradient(180deg,${kom(0)},${kom(h)},${A(S(0.24), 0.95)} ${RR_OKRES}px)`;
      }
      case "rzymska":
        return `${brzegi},${splot},linear-gradient(180deg,${A(col, 0.93)} 0,${A(S(0.12), 0.93)} 17px,${A(S(-0.28), 0.96)} ${RR_OKRES - 1}px,${A(S(0.1), 0.93)} ${RR_OKRES}px)`;
      case "zaluzja": {
        const lam = (o) => `${S(0.32)} ${o}px,${col} ${o + 4}px,${S(-0.3)} ${o + 10}px,rgba(0,0,0,.35) ${o + 10}px,transparent ${o + 11}px,transparent ${o + h}px`;
        return `${tasmy("rgba(235,235,235,.75)", 1)},${bez},linear-gradient(180deg,${lam(0)},${lam(h)})`;
      }
      /* v27: drewniana 50 mm – szerokie lamele ze słojami, taśmy drabinkowe */
      case "drewniana":
        return `${tasmy(A(S(-0.18), 0.95), 6)},repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 5px,rgba(255,255,255,.06) 5px 6px,transparent 6px 11px),linear-gradient(180deg,${S(0.2)} 0,${col} 5px,${S(-0.1)} 15px,${S(-0.34)} 21px,rgba(0,0,0,.4) 21px,transparent 22.5px,transparent ${RR_OKRES}px)`;
      case "zewnetrzna":
      case "podtynkowa":
        return `${brzegi},${bez},linear-gradient(180deg,${pancerz(0)},${pancerz(h)})`;
      /* v27: natynkowa – profil aluminiowy z rowkiem na środku */
      case "natynkowa": {
        const pro = (o) => `${S(0.28)} ${o}px,${col} ${o + 3}px,${S(0.08)} ${o + 6}px,${S(-0.2)} ${o + 6.5}px,${col} ${o + 7.5}px,${S(-0.38)} ${o + 12}px,rgba(0,0,0,.55) ${o + 12}px,rgba(0,0,0,.55) ${o + h}px`;
        return `${brzegi},${bez},linear-gradient(180deg,${pro(0)},${pro(h)})`;
      }
      /* v27: perforowana – w każdym profilu rząd małych otworów, przez które wpada światło */
      case "perforowana":
        return `${brzegi},radial-gradient(1.8px 1px at 50% 6.5px,rgba(255,246,214,.9) 70%,transparent 100%),linear-gradient(180deg,${pancerz(0)},${pancerz(h)})`;
      /* v27: żaluzja fasadowa C80 – wygięte lamele, taśmy podnoszące */
      case "fasadowa": {
        const c80 = (o) => `${S(-0.3)} ${o}px,${S(0.28)} ${o + 3}px,${S(0.1)} ${o + 7}px,${S(-0.26)} ${o + 11}px,rgba(0,0,0,.6) ${o + 11.5}px,rgba(0,0,0,.3) ${o + h}px`;
        return `${tasmy("rgba(30,30,30,.55)", 2)},${bez},linear-gradient(180deg,${c80(0)},${c80(h)})`;
      }
      /* v27: żaluzja fasadowa Z90 – płaskie lamele w kształcie Z z czarną uszczelką */
      case "fasadowaz": {
        const z90 = (o) => `${S(0.16)} ${o}px,${col} ${o + 2}px,${col} ${o + 9}px,${S(-0.22)} ${o + 10.5}px,#1d1d1d ${o + 10.5}px,#1d1d1d ${o + 12}px,${S(-0.45)} ${o + h}px`;
        return `${tasmy("rgba(30,30,30,.45)", 2)},${bez},linear-gradient(180deg,${z90(0)},${z90(h)})`;
      }
      /* v27: screen ZIP – zewnętrzna tkanina z siatki, przez którą trochę widać */
      case "screen":
        return `${brzegi},repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 1px,transparent 1px 2px),linear-gradient(180deg,${A(col, 0.82)} 0,${A(S(0.06), 0.8)} ${h}px,${A(col, 0.82)} ${RR_OKRES}px)`;
      default:
        return `${brzegi},${splot},linear-gradient(180deg,
   ${S(0.12)} 0px,${col} 2px,${col} ${RR_PAS - 3}px,${S(-0.25)} ${RR_PAS}px,
   ${A(c.siatka ? rrHex(c.siatka) : S(0.3), 0.62)} ${RR_PAS}px,${A(c.siatka ? rrShade(rrHex(c.siatka), 0.1) : S(0.4), 0.55)} ${RR_OKRES}px)`;
    }
  }
  function rrOslonaStyl(typ, col, rama) {
    const S = (k) => rrShade(col, k), R = (k) => rrShade(rama, k);
    const kas = (bg, ext = "") => `.cas{background:${bg};border-radius:0 0 2px 2px;${ext}}.cas:before,.cas:after{background:${S(-0.12)};border-radius:0}`;
    const prow = (w, bg) => `.glass:before,.glass:after{content:"";position:absolute;top:${RR_KASETA - 2}px;bottom:0;width:${w}px;z-index:4;pointer-events:none;background:${bg};box-shadow:0 0 2px rgba(0,0,0,.45)}
.glass:before{left:0}.glass:after{right:0}.fabric{left:${w - 2}px;right:${w - 2}px}.bar{left:${w - 3}px;right:${w - 3}px}`;
    const alu = `linear-gradient(90deg,${S(-0.4)},${S(0.22)} 40%,${S(-0.05)} 70%,${S(-0.45)})`;
    const listwa = `.bar{background:linear-gradient(180deg,${S(0.35)},${S(0.05)} 55%,${S(-0.4)});box-shadow:0 2px 0 rgba(20,20,20,.85),0 3px 3px rgba(0,0,0,.4)}`;
    const lamela = `.bar{background:linear-gradient(180deg,${S(0.3)},${col} 50%,${S(-0.3)})}`;
    switch (typ) {
      case "zaciemniajaca":
        return prow(4, "linear-gradient(90deg,#c9c9c9,#fafafa 45%,#b5b5b5)");
      case "zaluzja":
      case "drewniana":
        return kas(`linear-gradient(180deg,${S(0.3)},${col} 55%,${S(-0.35)})`) + lamela;
      case "zewnetrzna":
      case "perforowana":
        return `.cas{background:linear-gradient(180deg,${R(0.05)},${rama} 45%,${R(-0.16)});border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 3px rgba(0,0,0,.35)}.cas:before,.cas:after{background:${R(-0.08)};border-radius:0}` + prow(5, alu) + listwa;
      case "natynkowa":
        return kas(`linear-gradient(180deg,${S(0.36)} 0,${S(0.18)} 50%,${S(-0.3)} 51%,${S(-0.05)} 100%)`, `height:${RR_KASETA + 8}px;box-shadow:0 3px 5px rgba(0,0,0,.5)`) + prow(6, alu) + listwa;
      case "podtynkowa":
        return `.cas{background:linear-gradient(180deg,#ebe7de 0,#d6d1c6 58%,#3a3a3a 60%,#151515 100%);border-radius:0;box-shadow:none}.cas:before,.cas:after{background:#ddd8cd;border-radius:0;box-shadow:none}` + prow(5, alu) + listwa;
      case "fasadowa":
      case "fasadowaz":
        return kas(`linear-gradient(180deg,${S(0.3)},${S(0.05)} 70%,${S(-0.3)})`) + prow(4, alu) + listwa;
      case "screen":
        return kas(`linear-gradient(180deg,${S(0.3)},${S(0.08)} 60%,${S(-0.35)})`) + prow(6, `linear-gradient(90deg,${S(-0.45)},${S(0.15)} 35%,#111 50%,${S(0.15)} 65%,${S(-0.45)})`) + listwa;
      default:
        return "";
    }
  }
  var rrKartaStyl = ({ H, n, sloje, rama, col, c }) => `
:host{display:block}
.rr{padding:14px 14px 12px;user-select:none;-webkit-user-select:none}
.hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.hd ha-icon{--mdc-icon-size:22px;color:var(--primary-text-color);background:rgba(127,127,127,.18);border-radius:50%;padding:8px}
.nm{font-size:16px;font-weight:500;color:var(--primary-text-color)}
.ver{font-size:10px;font-weight:500;color:var(--secondary-text-color);border:1px solid var(--divider-color,rgba(127,127,127,.4));border-radius:8px;padding:0 5px;margin-left:6px;vertical-align:2px}
.sb{font-size:13px;color:var(--secondary-text-color)}
.pc{margin-left:auto;white-space:nowrap;font-size:22px;font-weight:600;color:var(--primary-text-color);font-variant-numeric:tabular-nums}
.win{position:relative;display:flex;height:${H}px;max-width:${Math.round(H * (n === 1 ? 0.72 : 0.9))}px;margin:0 auto;padding:6px;border-radius:3px;
 background:${sloje ? sloje + "," : ""}${rama};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.45)}
.win.stal .slot+.slot{margin-left:10px}
.win.ruch .slot{margin:0;box-shadow:inset 0 8px 8px -8px rgba(0,0,0,.6),inset 0 -8px 8px -8px rgba(0,0,0,.6)}
.win.ruch .sash[data-i="0"]{padding-right:13px;background-image:linear-gradient(90deg,transparent calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 5px),transparent calc(100% - 5px))${sloje ? "," + sloje : ""}}
.win.ruch .sash[data-i="0"] .handle{display:none}
.slot{position:relative;flex:1;margin:0 1.5px;perspective:700px;border-radius:2px;background:#2b3138;box-shadow:inset 0 0 8px rgba(0,0,0,.6)}
.sash{position:relative;height:100%;box-sizing:border-box;transition:transform 1.4s cubic-bezier(.4,.1,.2,1);padding:7px;border-radius:2px;background:${sloje ? sloje + "," : ""}${rrShade(rama, -0.03)};
 box-shadow:inset 0 0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.22);touch-action:none;cursor:ns-resize}
.handle{position:absolute;top:56%;width:8px;height:18px;margin-top:-9px;border-radius:4px;z-index:9;
 background:linear-gradient(90deg,#8d9297,#f4f5f6 45%,#6f7479);box-shadow:0 0 0 1px rgba(0,0,0,.45),0 1px 3px rgba(0,0,0,.5)}
/* v25: klamka zawsze nad roletą, większa i w kolorze srebrnym z ciemnym obrysem – widać ją na każdej ramie i w każdym motywie */
/* v19: klamka obraca się jak w prawdziwym oknie: w dół = zamknięte, poziomo = otwarte, w górę = uchylone;
   przy otwieraniu najpierw klamka, potem skrzydło – przy zamykaniu odwrotnie */
.handle:after{content:"";position:absolute;left:.5px;top:4px;width:7px;height:32px;border-radius:3.5px;transform-origin:3.5px 5px;
 background:linear-gradient(90deg,#7d8287,#fff 45%,#5f6469);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 2px 4px rgba(0,0,0,.5);transition:transform .5s 1.3s}
.sash.otw[data-i="0"] .handle:after{transform:rotate(90deg);transition-delay:0s}
.sash.otw[data-i="1"] .handle:after{transform:rotate(-90deg);transition-delay:0s}
.sash.uchyl .handle:after{transform:rotate(180deg);transition-delay:0s}
.sash.otw,.sash.uchyl{transition-delay:.45s}
.sash[data-i="0"] .handle{right:0}.sash[data-i="1"] .handle{left:0}
.glass{position:relative;height:100%;overflow:hidden;border-radius:1px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),inset 0 3px 8px rgba(0,0,0,.28)}
.sky{position:absolute;inset:0}
.sky.day{background:linear-gradient(180deg,#5ea4e6 0%,#9fd0f5 60%,#d9eefb 100%)}
.sky.night{background:radial-gradient(1px 1px at 20% 40%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 70% 62%,#fff 50%,transparent 51%),
 radial-gradient(1.5px 1.5px at 45% 78%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 80% 88%,#fff 50%,transparent 51%),
 linear-gradient(180deg,#0b1430 0%,#1b2a52 100%)}
.sky.plain{background:linear-gradient(180deg,#5b6b7a,#8d9aa6)}
.wx{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.wx i{position:absolute;display:block}
.wx .scn{position:absolute;left:0;bottom:0;width:100%;height:58%;display:block}
.drz{animation:rrdrz 2.4s ease-in-out infinite alternate}
@keyframes rrdrz{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.sun{top:52%;width:26%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffbe0 0 30%,#ffd84d 45%,rgba(255,216,77,.35) 58%,rgba(255,216,77,0) 70%);animation:rrsun 5s ease-in-out infinite}
@keyframes rrsun{50%{transform:scale(1.08);filter:brightness(1.1)}}
.sun.zl{top:66%;background:radial-gradient(circle,#fff0c0 0 28%,#ff9a3c 46%,rgba(255,120,50,.35) 60%,rgba(255,120,50,0) 72%)}
.moon{top:50%;width:15%;aspect-ratio:1;border-radius:50%;box-shadow:inset -6px 3px 0 0 #f1edcf;filter:drop-shadow(0 0 5px rgba(241,237,207,.55))}
.st{width:2px;height:2px;border-radius:50%;background:#fff;animation:rrst 3s ease-in-out infinite}
@keyframes rrst{50%{opacity:.15}}
.cl{left:-60%;aspect-ratio:3.2;border-radius:999px;filter:blur(.6px);animation:rrcl 60s linear infinite}
.cl:before,.cl:after{content:"";position:absolute;border-radius:50%;background:inherit}
.cl:before{left:14%;bottom:30%;width:38%;aspect-ratio:1}.cl:after{left:42%;bottom:22%;width:44%;aspect-ratio:1}
@keyframes rrcl{to{left:110%}}
.fog{left:-50%;width:200%;height:20%;background:linear-gradient(90deg,transparent,rgba(236,239,241,.75) 30%,rgba(236,239,241,.55) 70%,transparent);filter:blur(5px);animation:rrfog 18s ease-in-out infinite alternate}
@keyframes rrfog{to{transform:translateX(22%)}}
.dr{top:-14%;width:1.5px;height:12%;background:linear-gradient(rgba(225,236,247,0),rgba(225,236,247,.85));transform:skewX(-12deg);animation:rrdr .8s linear infinite}
@keyframes rrdr{to{transform:translate(-14px,1000%) skewX(-12deg)}}
.fl{top:-5%;border-radius:50%;background:#fff;opacity:.92;box-shadow:0 0 2px rgba(255,255,255,.8);animation:rrfl 7s linear infinite}
@keyframes rrfl{0%{top:-5%;transform:translateX(0)}25%{transform:translateX(7px)}75%{transform:translateX(-7px)}100%{top:105%;transform:translateX(0)}}
.fla{inset:0;background:#fff;opacity:0;animation:rrfla 7s linear infinite}
@keyframes rrfla{0%,88%,91%,93%,100%{opacity:0}89%,92%{opacity:.55}}
.refl{position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.15) 38%,transparent 46%)}
.cas{position:absolute;left:-1px;right:-1px;top:0;height:${RR_KASETA}px;z-index:4;border-radius:0 0 6px 6px;
 background:linear-gradient(180deg,#ffffff 0%,#f1f1f1 55%,#cfcfcf 100%);box-shadow:0 2px 3px rgba(0,0,0,.35)}
.cas:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#e2e2e2;border-radius:0 0 0 6px;box-shadow:1px 0 0 rgba(0,0,0,.08)}
.cas:after{content:"";position:absolute;right:0;top:0;bottom:0;width:4px;background:#e2e2e2;border-radius:0 0 6px 0;box-shadow:-1px 0 0 rgba(0,0,0,.08)}
.fabric{position:absolute;left:1px;right:1px;top:${RR_KASETA - 2}px;height:0;z-index:2;
 background:${rrTkanina(c.oslona, col, c)};
 background-size:100% 100%,${c.oslona === "perforowana" ? "7px " + RR_OKRES / 2 + "px" : "100% 100%"},100% ${RR_OKRES}px}
/* v26: promienie słońca wpadające przez okno (tylko w dzień, przy słońcu) */
.ray{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity 1.5s;mix-blend-mode:screen;
 background:linear-gradient(115deg,rgba(255,214,120,0) 15%,rgba(255,214,120,.26) 40%,rgba(255,214,120,0) 62%),
  linear-gradient(115deg,rgba(255,236,190,0) 55%,rgba(255,236,190,.16) 70%,rgba(255,236,190,0) 82%);filter:blur(2px)}
.sash.slonce .ray{opacity:1;animation:rrray 7s ease-in-out infinite alternate}
@keyframes rrray{from{opacity:.75}to{opacity:1}}
.bar{position:absolute;left:0;right:0;height:${RR_LISTWA}px;top:${RR_KASETA}px;z-index:3;border-radius:1px;
 background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)}
/* uchwyt do podnoszenia na środku dolnej listwy – złap i przeciągnij */
.bar:after{content:"";position:absolute;left:50%;top:100%;width:22px;height:9px;transform:translateX(-50%);border-radius:0 0 7px 7px;
 background:linear-gradient(180deg,#e9e9e9,#a9a9a9);box-shadow:0 2px 3px rgba(0,0,0,.45),inset 0 -2px 0 rgba(0,0,0,.12);cursor:grab}
.sash:active .bar:after{cursor:grabbing;filter:brightness(1.08)}
/* środkowy uchwyt (v11): na słupku między skrzydłami, na wysokości listew – rusza oba skrzydła */
.mid{position:absolute;left:50%;top:0;z-index:7;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;cursor:grab;touch-action:none;
 background:radial-gradient(circle at 35% 30%,#fff,#dcdcdc 70%,#bdbdbd);box-shadow:0 2px 5px rgba(0,0,0,.5),0 0 0 2px var(--primary-color,#03a9f4);
 display:flex;align-items:center;justify-content:center;color:#444}
.mid:active{cursor:grabbing;transform:scale(1.1)}
.mid svg{width:20px;height:20px;fill:currentColor}
.bezuch .bar:after,.bezuch .bar:before{display:none}
.bar:before{content:"";position:absolute;left:50%;top:-12px;width:48px;height:34px;transform:translateX(-50%);cursor:grab}
/* okno uchylone / otwarte (v15) – skrzydło razem z roletą (kaseta na skrzydle) */
.out{position:absolute;inset:3px;overflow:hidden;border-radius:2px}
.osky{position:absolute;inset:0}
.sash.uchyl{transform-origin:50% 100%;transform:rotateX(calc(-1deg * var(--rr-uch,14))) scaleY(calc(1 - var(--rr-uch,14) / 140));box-shadow:0 6px 14px rgba(0,0,0,.55)}   /* góra skrzydła do środka pokoju */
.sash.otw[data-i="0"]{transform-origin:0 50%;transform:rotateY(calc(-1deg * var(--rr-otw,41)));z-index:8}
.sash.otw[data-i="1"]{transform-origin:100% 50%;transform:rotateY(calc(1deg * var(--rr-otw,41)));z-index:8}
.sash.otw{box-shadow:0 0 14px rgba(0,0,0,.55)}
.ghost{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--primary-color,#03a9f4);z-index:6;display:none}
.ghost span{position:absolute;left:50%;transform:translateX(-50%);top:-22px;background:var(--primary-color,#03a9f4);color:#fff;font-size:12px;font-weight:600;padding:1px 7px;border-radius:9px;white-space:nowrap}
.mv{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:5;color:#fff;background:rgba(0,0,0,.5);
 width:26px;height:26px;border-radius:50%;display:none;align-items:center;justify-content:center}
.mv ha-icon{--mdc-icon-size:18px;animation:rrb 1s ease-in-out infinite}
@keyframes rrb{50%{transform:translateY(var(--rr-dy,-3px))}}
.bt{display:flex;gap:8px;margin-top:12px}
.bt button{flex:1;height:42px;border:none;border-radius:12px;cursor:pointer;color:var(--primary-text-color);
 background:var(--secondary-background-color,rgba(127,127,127,.15));display:flex;align-items:center;justify-content:center;transition:background .15s}
.bt button:active{background:rgba(127,127,127,.35)}
.bt button[disabled]{opacity:.35;cursor:default}
.bt ha-icon{--mdc-icon-size:22px}
.qk{display:flex;gap:6px;margin-top:8px}
.qk button{flex:1;height:28px;border:none;border-radius:9px;font-size:12px;cursor:pointer;color:var(--secondary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3))}
.qk button.on{color:var(--text-primary-color,#fff);background:var(--primary-color,#03a9f4);box-shadow:none}
${rrOslonaStyl(c.oslona, col, rama)}
`;

  // src/panele.js
  var rrBiezacyPanel = () => {
    const p = decodeURIComponent(location.pathname.split("/")[1] || "");
    return p === "lovelace" ? null : p;
  };
  async function rrPanele(hass) {
    const lista = await hass.callWS({ type: "lovelace/dashboards/list" }).catch(() => []);
    return [{ url_path: null, title: null, mode: "storage" }, ...lista.filter((d) => d.url_path && d.url_path !== "map")];
  }
  var rrKonfigPanelu = (hass, url_path) => hass.callWS({ type: "lovelace/config", url_path, force: true });
  async function rrDodajDoPanelu(hass, url_path, widok, karta, tytul) {
    const cfg = await rrKonfigPanelu(hass, url_path);
    if (cfg.strategy) throw new Error("strategy");
    const views = cfg.views || (cfg.views = []);
    let v = views[widok];
    if (widok === "nowy") {
      let path = "rolety", i = 2;
      while (views.some((x) => x.path === path)) path = "rolety-" + i++;
      v = { title: tytul, path, icon: "mdi:roller-shade", type: "sections", sections: [{ type: "grid", cards: [] }] };
      views.push(v);
    }
    if (!v || v.strategy || v.type === "panel") throw new Error("view");
    if (v.type === "sections" || v.sections) {
      const s = v.sections || (v.sections = []);
      if (!s.length) s.push({ type: "grid", cards: [] });
      const ost = s[s.length - 1];
      (ost.cards || (ost.cards = [])).push(karta);
    } else (v.cards || (v.cards = [])).push(karta);
    await hass.callWS({ type: "lovelace/config/save", url_path, config: cfg });
    return v;
  }
  var RR_INST = { t: 0, p: null };
  function rrSprawdzInstalacje(hass) {
    if (RR_INST.p && Date.now() - RR_INST.t < 36e5) return RR_INST.p;
    RR_INST.t = Date.now();
    const wynik = { wersja: RR_WERSJA };
    const gh = fetch("https://api.github.com/repos/superdarco78/roleta-realistyczna/releases/latest").then((r) => r.ok ? r.json() : null).then((j) => {
      if (j?.tag_name) wynik.najnowsza = j.tag_name;
    }).catch(() => {
    });
    const zas = hass?.user?.is_admin && hass.callWS ? hass.callWS({ type: "lovelace/resources" }).then((l) => {
      wynik.zasoby = (l || []).filter((x) => /roleta-realistyczna|okno-ha/.test(x.url)).length;
    }).catch(() => {
    }) : null;
    return RR_INST.p = Promise.all([gh, zas]).then(() => wynik);
  }
  var rrNumerWersji = (v) => parseInt(String(v || "").replace(/^\D+/, ""), 10) || 0;
  var RR_ODSW = { z: 0 };
  function rrSamoOdswiez(hass) {
    if (RR_ODSW.z) return;
    RR_ODSW.z = 1;
    const upd = Object.values(hass?.states || {}).find((s) => s.entity_id?.startsWith("update.") && /roleta-realistyczna|okno-ha/.test(String(s.attributes?.release_url || "") + String(s.attributes?.title || "") + s.entity_id));
    const inst = upd?.attributes?.installed_version;
    if (!inst || rrNumerWersji(inst) <= rrNumerWersji(RR_WERSJA)) return;
    const klucz = "okno-ha-odswiezone-" + inst;
    try {
      if (sessionStorage.getItem(klucz)) return;
      sessionStorage.setItem(klucz, "1");
    } catch (e) {
      return;
    }
    console.info("Okno HA: zainstalowana " + inst + ", działa " + RR_WERSJA + " – przeładowuję stronę");
    setTimeout(() => location.reload(), 300);
  }

  // src/karta.js
  var RoletaRealistyczna = class extends HTMLElement {
    static getStubConfig(hass) {
      const e = Object.keys(hass?.states || {}).find((k) => k.startsWith("cover.") && hass.states[k].attributes?.okno_ha) || rrKandydaci(hass, "cover")[0]?.id;
      return { entity: e || "cover.roleta" };
    }
    static getConfigElement() {
      return document.createElement("okno-ha-editor");
    }
    setConfig(cfg) {
      if (!cfg || !cfg.entity) throw new Error("Wybierz encję rolety (cover.*)");
      this._raw = cfg;
      this._cfg = Object.assign({}, RR_DEF, RR_G.v || {}, this._urz || {}, cfg);
      this._built = false;
      this._sh = [];
      if (this._hass) this._render();
    }
    set hass(h) {
      this._hass = h;
      rrSamoOdswiez(h);
      const urz = h?.states?.[this._raw?.entity]?.attributes?.okno_ha, uk = JSON.stringify(urz || null);
      if (uk !== this._uk) {
        this._uk = uk;
        this._urz = urz && typeof urz === "object" ? urz : null;
        if (this._raw) {
          this.setConfig(this._raw);
          return;
        }
      }
      if (!this._gok) {
        this._gok = 1;
        rrGlobLoad(h).then(() => {
          if (this._raw) this.setConfig(this._raw);
        });
      }
      this._render();
    }
    getCardSize() {
      return Math.ceil(rrWysOkna(this._cfg || {}, +this._cfg?.skrzydla === 1 ? 1 : 2) / 50) + 2;
    }
    getGridOptions() {
      return { columns: 12, min_columns: 6, rows: "auto" };
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._raf = null;
      this._szum(false);
      if (this._gl) window.removeEventListener("rr-glob", this._gl);
    }
    connectedCallback() {
      if (this._built) this._tick();
      this._gl = this._gl || (() => {
        if (this._raw) this.setConfig(this._raw);
      });
      window.addEventListener("rr-glob", this._gl);
    }
    _pos(st, goal) {
      let p = st?.attributes?.current_position;
      if (typeof p !== "number") return st?.state === "closed" ? 0 : 100;
      if (this._cfg.odwroc) p = 100 - p;
      if (st.state === "open" && p === 0 && goal !== 0) return null;
      if (st.state === "closed" && p === 100 && goal !== 100) return null;
      if (goal !== void 0 && (p === 0 || p === 100) && p !== goal) return null;
      return p;
    }
    /* v26: cichy szum silnika z WebAudio – włącza się przy ruchu po kliknięciu, gaśnie, gdy roleta stanie */
    _szum(on) {
      try {
        if (!on) {
          if (this._au) {
            const { ctx: ctx2, g: g2 } = this._au;
            g2.gain.setTargetAtTime(0, ctx2.currentTime, 0.08);
            setTimeout(() => ctx2.close(), 400);
            this._au = null;
          }
          return;
        }
        if (this._au) return;
        const ctx = new (window.AudioContext || window.webkitAudioContext)(), o = ctx.createOscillator(), o2 = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
        o.type = "sawtooth";
        o.frequency.value = 92;
        o2.type = "sine";
        o2.frequency.value = 184;
        f.type = "lowpass";
        f.frequency.value = 420;
        g.gain.value = 0;
        o.connect(f);
        o2.connect(f);
        f.connect(g);
        g.connect(ctx.destination);
        o.start();
        o2.start();
        g.gain.setTargetAtTime(0.035, ctx.currentTime, 0.1);
        this._au = { ctx, g };
      } catch (x) {
        this._au = null;
      }
    }
    _call(svc, ent, data) {
      ent = ent || this._cfg.entity;
      const target = svc === "open_cover" ? 100 : svc === "close_cover" ? 0 : svc === "set_cover_position" ? data.position : null;
      const now = performance.now();
      (this._mem || []).forEach((m, i) => {
        const o = this._sh[i];
        if (!o || ent !== this._cfg.entity && ent !== m) return;
        o.catch = null;
        o.auto = null;
        const cz = o.czas || rrCzas(this._cfg.czas, 0);
        o.rest = null;
        if (target === null) {
          o.target = o.shown;
          o.last = Math.round(o.shown);
          o.cmd = null;
          o.rest = { p: o.last, t: now + Math.max(60, cz * 2) * 1e3 };
        } else {
          o.target = target;
          o.cmd = { p: target, t1: now + (Math.abs(target - o.shown) / 100 * cz + 3) * 1e3, t: now + (cz * 2 + 10) * 1e3 };
        }
      });
      this._tick();
      if (this._cfg.dzwiek) this._szum(true);
      if (this._cfg.wibracja !== false) try {
        navigator.vibrate?.(12);
      } catch (x) {
      }
      let d = data || {};
      if (svc === "set_cover_position" && this._cfg.odwroc) d = { position: 100 - d.position };
      this._hass.callService("cover", svc, Object.assign({ entity_id: ent }, d));
    }
    /* encje skrzydeł: członkowie grupy, a jak to nie grupa – ta sama encja */
    _members() {
      const st = this._hass.states[this._cfg.entity];
      const n = +this._cfg.skrzydla === 1 ? 1 : 2;
      const m = (st?.attributes?.entity_id || []).filter((e) => this._hass.states[e]);
      const out = [];
      for (let i = 0; i < n; i++) out.push(m.length ? m[Math.min(i, m.length - 1)] : this._cfg.entity);
      const wyb = [this._cfg.roleta_lewa, this._cfg.roleta_prawa];
      return out.map((e, i) => wyb[i] && this._hass.states[wyb[i]] ? wyb[i] : e);
    }
    _build(n) {
      const c = this._cfg, col = rrHex(c.kolor), H = rrWysOkna(c, n), rama = c.rama, T2 = this._t;
      const sloje = RR_RAMY[rama]?.[2] ? "repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 4px,rgba(255,255,255,.05) 4px 5px,transparent 5px 9px),repeating-linear-gradient(0deg,rgba(0,0,0,.05) 0 1px,transparent 1px 5px,rgba(255,255,255,.04) 5px 6px,transparent 6px 11px)" : "";
      const ruch = n > 1 && c.slupek === "ruchomy";
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      root.innerHTML = "";
      const card = document.createElement("ha-card");
      const sash = (i) => `
  <div class="slot"><div class="out"><div class="osky"></div><div class="wx owx"></div></div><div class="sash" data-i="${i}">
   <div class="glass"><div class="sky"></div><div class="wx"></div>
    <div class="refl"></div>
    <div class="fabric"></div><i class="ray"></i><div class="bar"></div>
    <div class="cas"></div>
    <div class="ghost"><span></span></div>
    <div class="mv"><ha-icon></ha-icon></div>
   </div>
   ${c.klamki !== false ? '<div class="handle"></div>' : ""}
  </div></div>`;
      card.innerHTML = `
<style>${rrKartaStyl({ H, n, sloje, rama, col, c })}</style>
<div class="rr">
 <div class="hd"><ha-icon icon="${RR_OSL_IKONY[c.oslona] || RR_OSL_IKONY.zebra}"></ha-icon>
  <div><div><span class="nm"></span><span class="ver">${RR_WERSJA}</span></div><div class="sb"></div></div><div class="pc"></div></div>
 <div class="win ${ruch ? "ruch" : "stal"}">${Array.from({ length: n }, (_, i) => sash(i)).join("")}${n > 1 && c.uchwyt_srodek !== false ? `<div class="mid" title="${T2.oba}"><svg viewBox="0 0 24 24"><path d="M12,2L7,7H11V17H7L12,22L17,17H13V7H17L12,2Z"/></svg></div>` : ""}</div>
 <div class="bt">
  <button class="up" title="${T2.up}"><ha-icon icon="mdi:arrow-up"></ha-icon></button>
  <button class="stop" title="${T2.stop}"><ha-icon icon="mdi:stop"></ha-icon></button>
  <button class="down" title="${T2.down}"><ha-icon icon="mdi:arrow-down"></ha-icon></button>
 </div>
 ${+c.krok > 0 ? `<div class="qk kr"><button data-k="1">▲ ${+c.krok}%</button><button data-k="-1">▼ ${+c.krok}%</button></div>` : ""}
 <div class="qk">${String(c.pozycje ?? "100,75,50,25,0").split(/[,; ]+/).map(Number).filter((x) => x >= 0 && x <= 100 && String(x) !== "").slice(0, 7).map((x) => `<button data-p="${x}">${x === 100 ? T2.open : x === 0 ? T2.closed : x + "%"}</button>`).join("")}</div>
</div>`;
      root.appendChild(card);
      const q = (s) => card.querySelector(s);
      this._el = {
        nm: q(".nm"),
        sb: q(".sb"),
        pc: q(".pc"),
        up: q(".up"),
        stop: q(".stop"),
        down: q(".down"),
        qk: card.querySelectorAll(".qk button"),
        bt: q(".bt"),
        qkw: q(".qk"),
        sash: [...card.querySelectorAll(".sash")].map((s) => ({
          root: s,
          glass: s.querySelector(".glass"),
          sky: s.querySelector(".sky"),
          wx: s.querySelector(".glass .wx"),
          osky: s.parentElement.querySelector(".osky"),
          owx: s.parentElement.querySelector(".owx"),
          fabric: s.querySelector(".fabric"),
          bar: s.querySelector(".bar"),
          ghost: s.querySelector(".ghost"),
          gl: s.querySelector(".ghost span"),
          mv: s.querySelector(".mv"),
          mvi: s.querySelector(".mv ha-icon")
        }))
      };
      const E = this._el;
      E.up.onclick = () => this._call("open_cover");
      E.down.onclick = () => this._call("close_cover");
      E.stop.onclick = () => this._call("stop_cover");
      E.qk.forEach((b) => b.dataset.p && (b.onclick = () => this._call("set_cover_position", null, { position: +b.dataset.p })));
      card.querySelectorAll("[data-k]").forEach((b) => b.onclick = () => {
        const sh = this._sh.filter(Boolean), base = sh.length ? sh.reduce((a, o) => a + o.target, 0) / sh.length : 50;
        this._call("set_cover_position", null, { position: Math.max(0, Math.min(100, Math.round(base + b.dataset.k * c.krok))) });
      });
      if (!c.przyciski) {
        E.bt.style.display = "none";
        E.qkw.style.display = "none";
      }
      if (c.uchwyty === false) card.classList.add("bezuch");
      card.style.setProperty("--rr-uch", Math.min(30, Math.max(3, +c.kat_uchyl || 14)));
      card.style.setProperty("--rr-otw", Math.round(Math.acos(1 - Math.min(90, Math.max(5, +c.otwarcie || 40)) / 100) * 180 / Math.PI));
      E.mid = q(".mid");
      E.sash.forEach((s, i) => this._drag(s, i));
      if (E.mid) this._drag({ root: E.mid, glass: E.sash[0].glass, mid: true }, 0);
      this._n = n;
      this._built = true;
    }
    /* górna krawędź listwy dolnej dla pozycji p (100 = zwinięta) */
    _barTop(gh, p) {
      return RR_KASETA - 2 + (gh - RR_KASETA - RR_LISTWA - 7 + 2) * (100 - p) / 100;
    }
    _yToPos(s, y) {
      const r = s.glass.getBoundingClientRect(), gh = r.height;
      const f = Math.min(1, Math.max(0, (y - r.top - RR_KASETA) / (gh - RR_KASETA - RR_LISTWA - 7)));
      return Math.round(100 - f * 100);
    }
    _drag(s, i) {
      let on = false, y0 = 0, val = null;
      const el = s.root;
      let solo = false;
      el.addEventListener("pointerdown", (e) => {
        solo = !s.mid && (this._cfg.osobno || this._cfg.uchwyty !== false && e.composedPath().includes(s.bar));
        on = true;
        this._dr = true;
        y0 = e.clientY;
        val = null;
        el.setPointerCapture?.(e.pointerId);
        e.stopPropagation();
      });
      el.addEventListener("pointermove", (e) => {
        if (!on) return;
        if (val === null && Math.abs(e.clientY - y0) < 6) return;
        val = this._yToPos(s, e.clientY);
        const gh = s.glass.getBoundingClientRect().height;
        (solo ? [s] : this._el.sash).forEach((x) => {
          x.ghost.style.display = "block";
          x.ghost.style.top = this._barTop(gh, val) + RR_LISTWA + "px";
          x.gl.textContent = val + "%";
        });
      });
      const end = () => {
        if (!on) return;
        on = false;
        this._dr = false;
        this._el.sash.forEach((x) => x.ghost.style.display = "none");
        if (val !== null) this._call("set_cover_position", solo ? this._mem[i] : null, { position: val });
        else if (!s.mid) this._tap(solo ? this._mem[i] : null, i);
      };
      el.addEventListener("pointerup", end);
      el.addEventListener("pointercancel", end);
    }
    /* jeden przycisk jak w pilocie (v16): jedzie → stop; stoi → w przeciwną stronę niż ostatnio */
    _tap(ent, i) {
      const o = this._sh[i];
      if (!o) return;
      const jedzie = Math.abs(o.target - o.shown) > 0.5;
      if (jedzie) {
        this._kier = o.target > o.shown ? "up" : "down";
        this._call("stop_cover", ent);
        return;
      }
      const kier = o.shown >= 99.5 ? "down" : o.shown <= 0.5 ? "up" : this._kier === "up" ? "down" : "up";
      this._kier = kier;
      this._call(kier === "up" ? "open_cover" : "close_cover", ent);
    }
    _render() {
      if (!this._hass || !this._cfg) return;
      const c = this._cfg, st = this._hass.states[c.entity];
      const mem = this._members();
      const lang = rrJezyk(c, this._hass);
      if (lang !== this._lang) {
        this._lang = lang;
        this._t = RR_TXT[lang];
        this._built = false;
      }
      const T2 = this._t;
      if (!this._built || this._n !== mem.length) this._build(mem.length);
      this._mem = mem;
      const E = this._el;
      if (!st) {
        E.nm.textContent = c.name || c.entity;
        E.sb.textContent = T2.brak;
        return;
      }
      let pos = this._pos(st);
      const s = st.state;
      if (pos === null) pos = this._gpos ?? (s === "open" ? 100 : 0);
      this._gpos = pos;
      let sb = T2[s] || s;
      if (s === "open" && pos > 0 && pos < 100) sb = T2.czesc;
      E.nm.textContent = c.name || st.attributes.friendly_name || c.entity;
      const wid = c.zrodlo === "auto" || !c.zrodlo ? rrPogodaId(c, this._hass) : null;
      const ws = !c.niebo || c.zrodlo === "brak" ? null : wid && this._hass.states[wid] ? this._hass.states[wid] : rrInternet(this._hass, () => this._render());
      const WX = T2.wx || {};
      if (ws && WX[ws.state]) {
        const t = ws.attributes?.temperature;
        sb += " · " + WX[ws.state] + (typeof t === "number" ? " " + Math.round(t) + (ws.attributes.temperature_unit || "°C") : "");
      }
      const okno = [0, 1].map((k) => {
        if (this._czAc !== c.entity) {
          this._czAc = c.entity;
          this._czA = rrCzujnikiAuto(this._hass, c.entity);
        }
        const id = c[k ? "czujnik_prawe" : "czujnik_lewe"] || c.auto_czujniki !== false && this._czA[k], st2 = id && this._hass.states[id];
        return st2 && st2.state === "on" ? c[k ? "tryb_prawe" : "tryb_lewe"] === "otworz" ? "otw" : "uchyl" : "";
      });
      okno.forEach((t, k) => {
        if (t && k < mem.length) sb += ` · ${T2.okno} ${mem.length > 1 ? k ? T2.prawe : T2.lewe : ""}${t === "otw" ? T2.otw : T2.uchyl}`;
      });
      E.sb.textContent = sb;
      E.pc.textContent = pos + "%";
      E.up.disabled = pos >= 100 && s !== "closing";
      E.down.disabled = pos <= 0 && s !== "opening";
      E.qk.forEach((b) => b.dataset.p && b.classList.toggle("on", +b.dataset.p === pos && s !== "opening" && s !== "closing"));
      const sun = this._hass.states["sun.sun"], el = sun?.attributes?.elevation;
      const night = sun?.state === "below_horizon" || !sun && ws?.state === "clear-night";
      const pora = night ? typeof el === "number" && el > -7 ? "zmierzch" : "noc" : typeof el === "number" && el < 8 ? "zloto" : "dzien";
      const typ = !c.niebo ? "plain" : ws ? RR_WX[ws.state] || "cloudy" : "sun", wkey = typ + pora + (c.tlo || "") + (c.widok !== false);
      const slonce = c.promienie !== false && !night && pora !== "zmierzch" && (typ === "sun" || typ === "partly");
      mem.forEach((e, i) => {
        const S = E.sash[i], ms = this._hass.states[e] || st, mst = ms.state;
        const o0 = this._sh[i];
        const now = performance.now();
        const raw = ms.attributes?.current_position;
        const stamp = (ms.last_updated || "") + "|" + mst + "|" + raw;
        let mp = null;
        const spoko = o0 && o0.rest && now < o0.rest.t ? o0.rest.p : void 0;
        if (o0 && stamp !== o0.stamp) mp = this._pos(ms, o0.cmd ? o0.cmd.p : o0.auto ? o0.auto.p : spoko);
        if (!o0) mp = typeof raw === "number" ? c.odwroc ? 100 - raw : raw : mst === "open" ? 100 : 0;
        S.root.classList.toggle("slonce", slonce);
        S.root.classList.toggle("uchyl", okno[i] === "uchyl");
        S.root.classList.toggle("otw", okno[i] === "otw");
        const okey = okno[i] ? wkey : "";
        if (S.okey !== okey) {
          S.okey = okey;
          S.osky.style.background = okey && S.w ? S.w.bg : "";
          S.owx.innerHTML = okey && S.w ? S.w.html : "";
        }
        if (S.wkey !== wkey) {
          S.wkey = wkey;
          if (typ === "plain") {
            S.sky.className = "sky plain";
            S.sky.style.background = "";
            S.wx.innerHTML = "";
            S.root.parentElement.style.background = "";
          } else {
            const w = rrPogoda(typ, night, i, c.tlo, mem.length, c.widok !== false, pora);
            S.sky.className = "sky";
            S.sky.style.background = w.bg;
            S.wx.innerHTML = w.html;
            S.w = w;
            if (okno[i]) {
              S.okey = wkey;
              S.osky.style.background = w.bg;
              S.owx.innerHTML = w.html;
            }
            S.root.parentElement.style.background = w.bg;
          }
        }
        const moving = mst === "opening" || mst === "closing";
        S.mv.style.display = moving ? "flex" : "none";
        if (moving) {
          S.mvi.setAttribute("icon", mst === "opening" ? "mdi:chevron-double-up" : "mdi:chevron-double-down");
          S.mvi.style.setProperty("--rr-dy", mst === "opening" ? "-3px" : "3px");
        }
        const o = o0 || (this._sh[i] = { shown: mp, target: mp, last: mp });
        o.stamp = stamp;
        const rpm = rrRpm(this._hass, e, c[i ? "predkosc_prawa" : "predkosc_lewa"]);
        o.czas = rrCzas(c.czas, rpm, rrUcz.get(e));
        if (o0 && mp !== null) {
          if (o.cmd && (now < o.cmd.t1 - 5e3 || Math.abs(mp - o.cmd.p) > 10 && now < o.cmd.t1)) mp = null;
          else {
            if (o.cmd || o.auto) o.rest = { p: mp, t: now + Math.max(60, o.czas * 2) * 1e3 };
            o.last = mp;
            o.cmd = null;
            o.auto = null;
            if (Math.abs(mp - o.shown) > 0.5) o.catch = mp;
          }
        }
        if (mp === null && o.st !== void 0 && mst !== o.st && !o.cmd && spoko === void 0 && (mst === "open" || mst === "closed")) {
          const goal = mst === "open" ? 100 : 0;
          if (Math.round(o.shown) !== goal) o.auto = { p: goal, t: now + (o.czas * 1.5 + 5) * 1e3 };
        }
        const jedzie = mst === "opening" || mst === "closing";
        if (jedzie && !o.ucz) o.ucz = { t: now, p: o.last };
        if (!jedzie && o.ucz) {
          const rp = typeof raw === "number" ? c.odwroc ? 100 - raw : raw : null, dp = rp === null ? 0 : Math.abs(rp - o.ucz.p), dt = (now - o.ucz.t) / 1e3;
          if (dp >= 30 && dt > 2) {
            const v = dt * 100 / dp, u = rrUcz.get(e);
            rrUcz.set(e, u ? u * 0.6 + v * 0.4 : v);
          }
          o.ucz = null;
        }
        o.st = mst;
        if (o.auto && now > o.auto.t) {
          o.last = o.auto.p;
          o.auto = null;
        }
        if (o.cmd && now > o.cmd.t) {
          o.last = o.cmd.p;
          o.rest = { p: o.cmd.p, t: now + 6e4 };
          o.cmd = null;
        }
        o.target = o.cmd ? o.cmd.p : o.auto ? o.auto.p : mst === "opening" ? 100 : mst === "closing" ? 0 : o.last;
      });
      this._tick();
    }
    /* płynna animacja: meldunki silnika = szybkie dociągnięcie, między nimi ruch w tempie silnika */
    _tick() {
      const speed = 100 / rrCzas(this._cfg.czas, 0);
      this._paint();
      if (this._raf) return;
      let last = performance.now();
      const step = (now) => {
        const dt = Math.min(0.1, (now - last) / 1e3);
        last = now;
        let busy = false;
        this._sh.forEach((o) => {
          const goal = o.catch != null ? o.catch : o.target;
          const d = goal - o.shown;
          if (Math.abs(d) < 0.2) {
            o.shown = goal;
            if (o.catch != null) {
              o.catch = null;
              busy = true;
            }
            return;
          }
          busy = true;
          const sp = o.czas ? 100 / o.czas : speed;
          const v = o.catch != null ? Math.max(sp, Math.abs(d) * 6) : sp;
          o.shown += Math.sign(d) * Math.min(Math.abs(d), v * dt);
        });
        this._paint();
        this._raf = busy ? requestAnimationFrame(step) : null;
        if (!busy) this._szum(false);
      };
      this._raf = requestAnimationFrame(step);
    }
    _paint() {
      const sh = this._sh.filter(Boolean);
      if (sh.length) {
        const cel = sh.find((o) => o.cmd && Math.abs(o.shown - o.cmd.p) > 0.5);
        this._el.pc.textContent = Math.round(sh.reduce((x, o) => x + o.shown, 0) / sh.length) + "%" + (cel ? " → " + cel.cmd.p + "%" : "");
      }
      this._el.sash.forEach((S, i) => {
        const o = this._sh[i];
        if (!o) return;
        const gh = S.glass.clientHeight || rrWysOkna(this._cfg, this._n) - 26;
        if (!this._dr) {
          const g = o.cmd && Math.abs(o.shown - o.cmd.p) > 0.5 ? o.cmd.p : null;
          if (g === null) S.ghost.style.display = "none";
          else {
            S.ghost.style.display = "block";
            S.ghost.style.top = this._barTop(gh, g) + RR_LISTWA + "px";
            S.gl.textContent = "→ " + g + "%";
          }
        }
        const bt = this._barTop(gh, o.shown), fh = Math.max(0, bt - (RR_KASETA - 2));
        S.fabric.style.height = fh + "px";
        S.bar.style.top = bt + "px";
        S.bt = S.root.parentElement.offsetTop + S.root.offsetTop + S.glass.offsetTop + bt + RR_LISTWA / 2;
        S.fabric.style.backgroundPosition = `0 0,0 ${fh % RR_OKRES}px,0 ${fh % RR_OKRES}px`;
      });
      const E = this._el;
      if (E.mid && E.sash.every((S) => S.bt != null)) E.mid.style.top = E.sash.reduce((x, S) => x + S.bt, 0) / E.sash.length + 8 + "px";
    }
  };

  // src/edytor-styl.js
  var RR_EDYTOR_STYL = `
:host{display:block}
.ed{display:grid;gap:16px}
.pv{background:var(--secondary-background-color,rgba(127,127,127,.12));border-radius:12px;padding:10px;display:grid;gap:8px;transition:box-shadow .3s}
.pv.pin{position:sticky;top:0;z-index:6;box-shadow:0 6px 14px rgba(0,0,0,.35);background:var(--card-background-color,var(--ha-card-background,#1c1c1c))}
.pv.pin .slot{zoom:.5}
.pv.pin .wxp.wx1,.pv.pin .pvh>span:first-child{display:none}.pv.pin .pvh{justify-content:flex-end}
.pv.fl{box-shadow:0 0 0 2px var(--primary-color,#03a9f4),0 6px 14px rgba(0,0,0,.35)}
.pin-b{border:none;background:none;cursor:pointer;font-size:16px;opacity:.45;padding:2px 4px}.pv.pin .pin-b{opacity:1}
.wxp{display:flex;flex-wrap:wrap;gap:6px}
.wxp button{border:none;border-radius:14px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer;color:var(--primary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wxp button[aria-pressed="true"]{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);box-shadow:none}
.pvh{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:var(--secondary-text-color)}
.play{border:none;border-radius:16px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.grp{display:grid;gap:8px}
.lb{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--secondary-text-color)}
.dots{display:flex;flex-wrap:nowrap;gap:6px;overflow-x:auto;scroll-snap-type:x proximity;padding:6px 2px 6px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
.dots .dot{flex:0 0 auto;scroll-snap-align:center}
.dots:has([aria-pressed="true"]) .dot:not([aria-pressed="true"]) i,.dots:has([aria-pressed="true"]) .dot:not([aria-pressed="true"]) .own{filter:grayscale(1);opacity:.38;transition:filter .2s,opacity .2s}
.dots .dot:not([aria-pressed="true"]):hover i{filter:none;opacity:1}
.dot[aria-pressed="true"] .own{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.sec{border-radius:12px;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3));padding:0 12px}
.sec>summary{cursor:pointer;padding:12px 0;font-size:15px;font-weight:500;color:var(--primary-text-color);list-style:none}
.sec>summary::-webkit-details-marker{display:none}.sec>summary:after{content:"▾";float:right;transition:transform .2s}.sec[open]>summary:after{transform:rotate(180deg)}
.sec[open]{padding-bottom:12px}
.sec>.grp{margin-bottom:18px}
.rst{justify-self:start;border:none;background:none;color:var(--primary-color,#03a9f4);font:inherit;font-size:13px;cursor:pointer;padding:4px 0}
.wiz{border-radius:var(--ha-card-border-radius,12px);padding:16px;display:grid;gap:14px;background:var(--card-background-color,#1c1c1c);box-shadow:0 0 0 2px var(--primary-color,#03a9f4),0 4px 16px rgba(0,0,0,.25)}
.wiz[hidden]{display:none}
.wzh{display:flex;align-items:center;gap:8px;color:var(--primary-color,#03a9f4)}.wzh b{color:var(--primary-text-color);font-size:16px;font-weight:500}
.wzh span{font-size:12px;color:var(--secondary-text-color)}.wzx{margin-left:auto;border:none;background:none;color:var(--secondary-text-color);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:50%}
.wzs{display:flex;align-items:center}.wzs i{flex:1;height:2px;background:var(--divider-color,rgba(127,127,127,.3))}
.wzd{flex:none;width:34px;height:34px;padding:0;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;--mdc-icon-size:18px;
 background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color);transition:background .2s,box-shadow .2s}
.wzd.ok{background:rgba(var(--rgb-primary-color,3,169,244),.22);color:var(--primary-color,#03a9f4)}
.wzd.on{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);box-shadow:0 0 0 4px rgba(var(--rgb-primary-color,3,169,244),.25)}
.wzt{display:flex;align-items:center;gap:12px}.wzt h3{margin:0;font-size:20px;font-weight:400;color:var(--primary-text-color)}
.wzt ha-icon{--mdc-icon-size:26px;color:var(--primary-color,#03a9f4);background:rgba(var(--rgb-primary-color,3,169,244),.15);border-radius:50%;padding:8px}
.wzc{font-size:14px;line-height:1.45;color:var(--secondary-text-color);background:var(--secondary-background-color,rgba(127,127,127,.12));border-radius:10px;padding:8px 12px}
.wzc p{margin:3px 0}.wzc b{color:var(--primary-text-color);font-weight:500}
.wzb{display:grid;gap:12px}.wzb:empty{display:none}.wzp{display:grid;gap:8px}
.wzl{display:grid;gap:6px}
.wzl button{display:flex;align-items:center;gap:14px;text-align:left;border:none;border-radius:12px;padding:10px 12px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color);
 background:var(--card-background-color,rgba(127,127,127,.1));box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3));transition:box-shadow .15s,background .15s}
.wzl button:hover{background:var(--secondary-background-color,rgba(127,127,127,.12))}
.wzl button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--primary-color,#03a9f4);background:rgba(var(--rgb-primary-color,3,169,244),.08)}
.wzl ha-icon{flex:none;color:var(--state-icon-color,#44739e)}.wzl button[aria-pressed="true"] ha-icon{color:var(--primary-color,#03a9f4)}
.wzl small{display:block;color:var(--secondary-text-color);font-size:12px;margin-top:1px}
.wzl em{font-style:normal;font-size:11px;font-weight:500;color:var(--primary-color,#03a9f4);margin-left:6px;white-space:nowrap}.wzl em.au{color:var(--success-color,#43a047)}
.wzw{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.wzw b{font-weight:400;font-size:11px;padding:1px 8px;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color)}
.wzl .sw2{flex:none;display:inline-block;width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.4)}
.wzn{display:flex;gap:8px;align-items:center;border-top:1px solid var(--divider-color,rgba(127,127,127,.3));padding-top:12px}.wzn span{flex:1}
.wb{border:none;border-radius:20px;padding:9px 18px;font:inherit;font-size:14px;font-weight:500;cursor:pointer;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.wb.sec{background:transparent;color:var(--primary-color,#03a9f4);box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wb.sm{padding:5px 12px;font-size:13px}.wb[disabled]{opacity:.4;cursor:default}.wb[hidden]{display:none}
.wzg{display:grid;gap:10px}.wzg>.wb{justify-self:start}
ha-alert{display:block}
ha-alert:not(:defined){padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:rgba(3,155,229,.12);border-left:4px solid var(--info-color,#039be5)}
ha-alert[alert-type=warning]:not(:defined){background:rgba(255,166,0,.12);border-color:var(--warning-color,#ffa600)}
ha-alert[alert-type=error]:not(:defined){background:rgba(219,68,55,.12);border-color:var(--error-color,#db4437)}
ha-alert[alert-type=success]:not(:defined){background:rgba(67,160,71,.12);border-color:var(--success-color,#43a047)}
ha-alert:not(:defined) [slot=action]{display:inline-block;margin:8px 8px 0 0}
.wzi{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:14px;color:var(--primary-text-color)}
.lb .kn{text-transform:none;letter-spacing:0;color:var(--primary-text-color);margin-left:6px}
.dot{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;padding:0;color:var(--secondary-text-color);font:inherit;font-size:11px;width:52px}
.dot i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5);transition:transform .15s}
.dot[aria-pressed="true"] i{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.dots .dot[aria-pressed="true"]{width:70px;font-weight:600}
.dots .dot[aria-pressed="true"] i,.dots .dot[aria-pressed="true"] .own{margin:4px 0 9px}
.dots{padding:14px 10px 8px}
.psl{width:100%;margin:2px 0 0;accent-color:var(--primary-color,#03a9f4);height:28px}
.dot[aria-pressed="true"]{color:var(--primary-text-color)}
.own{position:relative;width:34px;height:34px;border-radius:50%;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}
.own input{position:absolute;inset:-8px;width:50px;height:50px;opacity:0;cursor:pointer}
.osg{font-size:12px;font-weight:500;color:var(--primary-text-color);margin-top:4px}.seg.osl{display:flex;flex-wrap:wrap}.seg.osl button{display:inline-flex;align-items:center;gap:4px;padding:7px 10px;white-space:nowrap}.seg.osl ha-icon{--mdc-icon-size:18px}
.seg{display:inline-flex;border-radius:10px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.seg button{border:none;background:none;padding:8px 16px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color)}
.seg button[aria-pressed="true"]{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.sl{display:grid;gap:2px}
.sl div{display:flex;justify-content:space-between;font-size:14px;color:var(--primary-text-color)}
.sl b{font-weight:500;font-variant-numeric:tabular-nums}
.sl input{width:100%;accent-color:var(--primary-color,#03a9f4)}
.sl input.txt{box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--divider-color,rgba(127,127,127,.4));background:transparent;color:inherit;font:inherit}
.sw{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:14px;color:var(--primary-text-color);padding:4px 0}
.hint{font-size:12px;color:var(--secondary-text-color);line-height:1.4;margin:0}
.ver{font-size:11px;color:var(--secondary-text-color);text-align:right}
.kal{display:flex;flex-wrap:wrap;gap:8px}.kal .ok{background:#2e7d32}.play[disabled]{opacity:.4;cursor:default}
.kalw{display:flex;align-items:center;gap:12px;font-size:20px;font-variant-numeric:tabular-nums;color:var(--primary-text-color)}
`;

  // src/kreator.js
  var RR_KROKI = [
    { k: "roleta", ic: "mdi:roller-shade" },
    { k: "okno", ic: "mdi:window-closed-variant" },
    { k: "silnik", ic: "mdi:speedometer" },
    { k: "czujniki", ic: "mdi:window-open-variant" },
    { k: "pogoda", ic: "mdi:weather-partly-cloudy" },
    { k: "wyglad", ic: "mdi:palette" },
    { k: "gdzie", ic: "mdi:view-dashboard-edit" }
  ];
  var RR_IKONY = { cover: "mdi:roller-shade", number: "mdi:speedometer", binary_sensor: "mdi:window-open-variant", weather: "mdi:weather-partly-cloudy" };
  var esc = (s) => String(s ?? "").replace(/[&<>"]/g, (z) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[z]);
  var RrKreator = class {
    constructor(ed, el) {
      this.ed = ed;
      this.el = el;
      this.n = 0;
    }
    get W() {
      return RR_JEZYKI[this.ed._lang].kreator;
    }
    get T() {
      return RR_JEZYKI[this.ed._lang].karta;
    }
    get h() {
      return this.ed._hass;
    }
    get c() {
      return this.ed._cfg;
    }
    get otwarty() {
      return !this.el.hidden;
    }
    otworz(n = 0) {
      this.el.hidden = false;
      this.pokaz(n);
    }
    zamknij() {
      this.el.hidden = true;
    }
    /* dynamicznie: gdy w HA pojawi się nowe urządzenie albo zmieni się stan wybranych encji, krok rysuje się od nowa */
    _klucz() {
      const h = this.h, s = (id) => id ? h.states[id]?.state : "";
      return [
        Object.keys(h.states).length,
        Object.keys(h.entities || {}).length,
        s(this.c.entity),
        s(rrPogodaId(this.c, h)),
        ...this._skrzydla().map((x) => s(x.cover) + s(rrRpmId(h, x.cover, this.c[x.i ? "predkosc_prawa" : "predkosc_lewa"])))
      ].join("|");
    }
    odswiez() {
      if (!this.otwarty || this._klucz() === this._k) return;
      const a = this.ed._r?.activeElement;
      if (a && this.el.contains(a) && a.tagName !== "BUTTON") return;
      this.pokaz(this.n);
    }
    /* skrzydła: roleta każdego skrzydła (wybrana ręcznie albo z grupy) */
    _skrzydla() {
      const c = this.c, h = this.h, n = +this.ed._val("skrzydla") === 1 ? 1 : 2;
      const m = (h.states[c.entity]?.attributes?.entity_id || []).filter((e) => h.states[e]);
      return Array.from({ length: n }, (_, i) => {
        const auto = m.length ? m[Math.min(i, m.length - 1)] : c.entity, wyb = c[i ? "roleta_prawa" : "roleta_lewa"];
        return { i, auto, cover: wyb && h.states[wyb] ? wyb : auto, members: m };
      });
    }
    _etykieta(i, n) {
      const W = this.W;
      return n < 2 ? W.skJ : i ? W.skP : W.skL;
    }
    pokaz(n) {
      const W = this.W, K = RR_KROKI;
      this.n = n = Math.max(0, Math.min(K.length - 1, n));
      const s = K[n], T2 = W.kroki[s.k], ost = n === K.length - 1;
      this.el.innerHTML = `
<div class="wzh"><ha-icon icon="mdi:auto-fix"></ha-icon><b>${W.tytul}</b><span>${W.krok(n + 1, K.length)}</span><button class="wzx" title="${W.zamknij}">✕</button></div>
<div class="wzs">${K.map((x, i) => `<button class="wzd${i === n ? " on" : i < n ? " ok" : ""}" data-wn="${i}" title="${esc(W.kroki[x.k].t)}"><ha-icon icon="${x.ic}"></ha-icon></button>`).join("<i></i>")}</div>
<div class="wzt"><ha-icon icon="${s.ic}"></ha-icon><h3>${T2.t}</h3></div>
<div class="wzc"><p><b>${W.co}</b> ${T2.co}</p><p><b>${W.poco}</b> ${T2.poco}</p></div>
<div class="wzb"></div>
<div class="wzn"><button class="wb sec" data-wa="-1"${n ? "" : " hidden"}>${W.wstecz}</button><span></span><button class="wb" data-wa="${ost ? "x" : "1"}">${ost ? W.gotowe : W.dalej}</button></div>`;
      const q = (x) => this.el.querySelector(x);
      q(".wzx").onclick = () => this.zamknij();
      this.el.querySelectorAll("[data-wn]").forEach((b) => b.onclick = () => this.pokaz(+b.dataset.wn));
      this.el.querySelectorAll("[data-wa]").forEach((b) => b.onclick = () => b.dataset.wa === "x" ? this.zamknij() : this.pokaz(n + +b.dataset.wa));
      const dalej = q('[data-wa="1"]');
      if (dalej && n === 0 && !this.h.states[this.c.entity]) dalej.disabled = true;
      this["_k_" + s.k](q(".wzb"));
      this._k = this._klucz();
    }
    /* ---------- klocki ---------- */
    _alert(typ, txt, akcje = []) {
      return `<ha-alert alert-type="${typ}">${esc(txt)}${akcje.map(([t, p]) => ` <button class="wb sm sec" slot="action" data-open="${esc(p)}">${esc(t)}</button>`).join("")}</ha-alert>`;
    }
    _html(box, html) {
      box.insertAdjacentHTML("beforeend", html);
      box.querySelectorAll("[data-open]").forEach((b) => b.onclick = () => {
        if (b.dataset.open === "reload") location.reload();
        else window.open(b.dataset.open, "_blank");
      });
    }
    _seg(box, opcje, wart, cb) {
      const d = document.createElement("div");
      d.className = "seg";
      d.innerHTML = opcje.map(([v, t]) => `<button data-v="${esc(v)}" aria-pressed="${String(v) === String(wart)}">${esc(t)}</button>`).join("");
      d.querySelectorAll("button").forEach((b) => b.onclick = () => cb(b.dataset.v));
      box.appendChild(d);
    }
    _stan(id) {
      const st = this.h.states[id], W = this.W, T2 = this.T;
      if (!st) return "";
      if (st.state === "unavailable" || st.state === "unknown") return W.niedost;
      const d = id.split(".")[0], a = st.attributes || {};
      if (d === "binary_sensor") return st.state === "on" ? W.otwarte : W.zamkniete;
      if (d === "number") return st.state + (a.unit_of_measurement ? " " + a.unit_of_measurement : "");
      if (d === "weather") return (T2.wx?.[st.state] || st.state) + (typeof a.temperature === "number" ? " " + Math.round(a.temperature) + (a.temperature_unit || "°C") : "");
      if (d === "cover") return (T2[st.state] || st.state) + (typeof a.current_position === "number" ? " " + a.current_position + "%" : "");
      return st.state;
    }
    /* lista podpowiedzi: najlepsze dopasowania na górze (z powodami), reszta pasujących w ha-selector „Inna” */
    _lista(box, { rola, ref, wart, auto, pusty, etykieta, wybor, ile = 4 }) {
      const W = this.W, h = this.h, K = rrKandydaci(h, rola, ref), ef = wart || auto || "";
      const top = K.slice(0, ile);
      if (ef && h.states[ef] && !top.some((x) => x.id === ef)) top.unshift(K.find((x) => x.id === ef) || { id: ef, sc: 0, why: [] });
      const d = document.createElement("div");
      d.className = "wzp";
      const wiersz = (x, i) => {
        const ob = rrObszarNazwa(h, x.id), st = this._stan(x.id);
        return `<button data-id="${esc(x.id)}" aria-pressed="${x.id === ef}"><ha-icon icon="${RR_IKONY[x.id.split(".")[0]] || "mdi:help-circle"}"></ha-icon><span>
        <span class="wzn1">${esc(rrNazwa(h, x.id))}${i === 0 && x.sc > 0 && K.length > 1 ? ` <em>★ ${W.najlepsze}</em>` : ""}${x.id === auto && !wart ? ` <em class="au">✓ ${W.auto}</em>` : ""}</span>
        <small>${esc(x.id)}${ob ? " · " + esc(ob) : ""}${st ? " · " + esc(st) : ""}</small>
        ${x.why.length ? `<span class="wzw">${x.why.map((w) => `<b>${esc(W.why[w] || w)}</b>`).join("")}</span>` : ""}</span></button>`;
      };
      d.innerHTML = `${etykieta ? `<div class="lb">${esc(etykieta)}</div>` : ""}<div class="wzl">${top.map(wiersz).join("")}${pusty ? `<button data-id="" aria-pressed="${!ef}"><ha-icon icon="mdi:close-circle-outline"></ha-icon><span><span class="wzn1">${esc(pusty)}</span></span></button>` : ""}</div>`;
      d.querySelectorAll("[data-id]").forEach((b) => b.onclick = () => wybor(b.dataset.id));
      if (K.length > top.length) {
        const p = document.createElement("p");
        p.className = "hint";
        p.textContent = W.inne(K.length);
        d.appendChild(p);
        const s = document.createElement("ha-selector");
        s.hass = h;
        s.selector = { entity: { include_entities: K.map((x) => x.id) } };
        s.label = W.inna;
        s.value = top.some((x) => x.id === ef) ? "" : ef;
        s.addEventListener("value-changed", (e) => {
          if (e.detail.value) wybor(e.detail.value);
        });
        d.appendChild(s);
      }
      box.appendChild(d);
      return K;
    }
    _ustaw(zm) {
      Object.entries(zm).forEach(([k, v]) => this.ed._set(k, v));
      this.pokaz(this.n);
    }
    /* ---------- krok 1: roleta ---------- */
    _k_roleta(B) {
      const W = this.W, h = this.h, c = this.c;
      this._instalacja(B);
      const K = rrKandydaci(h, "cover");
      if (!K.length) {
        this._html(B, this._alert("error", W.brakRolet, [[W.btnIntegr, "/config/integrations/dashboard"]]));
        return;
      }
      this._html(B, `<p class="hint">${esc(W.znaleziono(K.length))}</p>`);
      this._lista(B, { rola: "cover", wart: h.states[c.entity] ? c.entity : "", wybor: (id) => {
        if (!id) return;
        const g2 = (h.states[id]?.attributes?.entity_id || []).length;
        this._ustaw({ entity: id, roleta_lewa: "", roleta_prawa: "", ...g2 >= 2 ? { skrzydla: 2 } : {} });
      } });
      const st = h.states[c.entity];
      if (!st) {
        this._html(B, this._alert("info", W.wybierz));
        return;
      }
      const nm = rrNazwa(h, c.entity), g = (st.attributes?.entity_id || []).length;
      if (st.state === "unavailable") this._html(B, this._alert("warning", W.niedostepna(nm)));
      else if (g >= 2) this._html(B, this._alert("success", W.grupaOk(g)));
      if (!g && st.state !== "unavailable" && !(st.attributes?.supported_features & 4)) this._html(B, this._alert("info", W.bezPoz(nm)));
      this._html(B, this._alert("info", W.jezyk(W.jezykNazwa)));
    }
    /* czy karta jest aktualna i dodana raz w zasobach */
    _instalacja(B) {
      const W = this.W, box = document.createElement("div");
      box.className = "wzb";
      B.appendChild(box);
      rrSprawdzInstalacje(this.h).then((w) => {
        if (!box.isConnected) return;
        if (w.najnowsza && rrNumerWersji(w.najnowsza) > rrNumerWersji(w.wersja))
          this._html(box, this._alert("warning", W.verNowa(w.najnowsza, w.wersja), [[W.btnHacs, "/hacs/dashboard"], [W.btnPrzeladuj, "reload"]]));
        else this._html(box, this._alert("success", W.verOk(w.wersja)));
        if (w.zasoby > 1) this._html(box, this._alert("warning", W.zasobyDup(w.zasoby), [[W.btnZasoby, "/config/lovelace/resources"]]));
      });
    }
    /* ---------- krok 2: okno i skrzydła ---------- */
    _k_okno(B) {
      const W = this.W, h = this.h, c = this.c, n = +this.ed._val("skrzydla") === 1 ? 1 : 2;
      this._seg(B, [[1, W.sk1], [2, W.sk2]], n, (v) => this._ustaw({ skrzydla: +v }));
      const sk = this._skrzydla(), grupa = sk[0].members.length;
      if (n === 2 && !grupa) this._html(B, this._alert("info", W.jednaNaDwa, [[W.btnPomocnicy, "/config/helpers"]]));
      if (n === 2) sk.forEach((x) => this._lista(B, {
        rola: "skrzydlo",
        etykieta: this._etykieta(x.i, n),
        ile: 3,
        ref: { members: x.members, side: x.i, area: rrObszar(h, c.entity) },
        wart: c[x.i ? "roleta_prawa" : "roleta_lewa"],
        auto: x.auto,
        wybor: (id) => this._ustaw({ [x.i ? "roleta_prawa" : "roleta_lewa"]: id === x.auto ? "" : id })
      }));
    }
    /* ---------- krok 3: prędkość silnika ---------- */
    _k_silnik(B) {
      const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), n = sk.length;
      let ile = 0;
      sk.forEach((x) => {
        const pole = x.i ? "predkosc_prawa" : "predkosc_lewa", rpm = rrRpm(h, x.cover, c[pole]);
        const nm = n > 1 ? this._etykieta(x.i, n) : rrNazwa(h, x.cover);
        if (rpm > 0) this._html(B, this._alert("success", W.rpmOk(nm, rpm, rrCzas("auto", rpm).toFixed(1))));
        const K = this._lista(B, {
          rola: "speed",
          etykieta: n > 1 ? this._etykieta(x.i, n) : "",
          ref: { cover: x.cover, side: n > 1 ? x.i : void 0 },
          wart: c[pole],
          auto: rrRpmId(h, x.cover),
          wybor: (v) => this._ustaw({ [pole]: v === rrRpmId(h, x.cover) ? "" : v })
        });
        ile += K.length;
        if (K.length && !(rpm > 0)) this._html(B, this._alert("info", W.rpmBrak(nm)));
        if (!K.length) B.lastChild.remove();
      });
      if (!ile) this._html(B, this._alert("info", W.rpmZadnej));
      if (!sk.some((x) => rrRpm(h, x.cover, c[x.i ? "predkosc_prawa" : "predkosc_lewa"]) > 0)) {
        const d = document.createElement("div");
        d.className = "wzb";
        d.innerHTML = `<div class="kal"><button class="wb">${W.kal}</button></div><p class="hint"></p><p class="hint">${esc(this.ed._L.akh)}</p>`;
        const btn = d.querySelector("button");
        btn.onclick = () => this.ed._akal(btn, d.querySelector("p"), W.kal);
        B.appendChild(d);
      }
    }
    /* ---------- krok 4: kontaktrony ---------- */
    _k_czujniki(B) {
      const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), n = sk.length, L = this.ed._L;
      if (!rrKandydaci(h, "contact").length) {
        this._html(B, this._alert("info", W.czBrak));
        return;
      }
      const area = rrObszar(h, c.entity), dev = h.entities?.[c.entity]?.device_id;
      if (!area) this._html(B, this._alert("warning", W.czBezPom, [[W.btnUrz, dev ? "/config/devices/device/" + dev : "/config/entities"]]));
      const auto = c.auto_czujniki !== false ? rrCzujnikiAuto(h, c.entity) : [];
      if (auto.some(Boolean) && !c.czujnik_lewe && !c.czujnik_prawe) this._html(B, this._alert("success", W.czAuto));
      sk.forEach((x) => {
        const pole = x.i ? "czujnik_prawe" : "czujnik_lewe", tryb = x.i ? "tryb_prawe" : "tryb_lewe";
        this._lista(B, {
          rola: "contact",
          etykieta: this._etykieta(x.i, n),
          ile: 3,
          ref: { cover: x.cover, area, side: n > 1 ? x.i : void 0 },
          wart: c[pole],
          auto: auto[x.i],
          pusty: W.bez,
          wybor: (v) => this._ustaw(v ? { [pole]: v } : { [pole]: "", ...auto[x.i] ? { auto_czujniki: false } : {} })
        });
        if (c[pole] || auto[x.i]) {
          this._html(B, `<p class="hint">${esc(W.tryb)}</p>`);
          this._seg(B, L.tr, this.ed._val(tryb), (v) => this._ustaw({ [tryb]: v }));
        }
      });
    }
    /* ---------- krok 5: pogoda ---------- */
    _k_pogoda(B) {
      const W = this.W, h = this.h, c = this.c, zr = this.ed._val("zrodlo");
      const lok = h.config?.latitude != null && h.config?.longitude != null;
      this._seg(B, W.zr, zr, (v) => this._ustaw({ zrodlo: v }));
      if (zr === "brak") {
        this._html(B, this._alert("info", W.wxNic));
        return;
      }
      if (zr === "auto") {
        const auto = rrPogodaId({ pogoda: "auto" }, h), K = rrKandydaci(h, "weather");
        if (!K.length) this._html(B, this._alert("info", W.wxBrak));
        else {
          this._lista(B, { rola: "weather", wart: c.pogoda && c.pogoda !== "auto" ? c.pogoda : "", auto, wybor: (v) => this._ustaw({ pogoda: v === auto ? "auto" : v }) });
          const wid = rrPogodaId(c, h), st = h.states[wid];
          if (!st || st.state === "unavailable") this._html(B, this._alert("warning", W.wxNiedost(rrNazwa(h, wid))));
          else this._html(B, this._alert("success", W.wxTeraz(this._stan(wid))));
          if (st && st.state !== "unavailable") return;
        }
      }
      if (!lok) this._html(B, this._alert("warning", W.wxBezLok, [[W.btnOgolne, "/config/general"]]));
    }
    /* ---------- krok 6: wygląd i nazwa ---------- */
    _k_wyglad(B) {
      const W = this.W, L = this.ed._L, P = RR_PRESETY;
      this._html(B, `<div class="lb">${esc(L.osl)}</div>`);
      for (const [g, typy] of Object.entries(RR_OSL_GRUPY)) {
        this._html(B, `<div class="osg">${esc(g === "wew" ? L.osw : L.osz)}</div>`);
        this._seg(B, typy.map((v) => [v, L.osln[RR_OSLONY.indexOf(v)]]), this.ed._val("oslona"), (v) => this._ustaw({ oslona: v }));
        B.lastElementChild.classList.add("osl");
      }
      this._html(B, `<p class="hint">${esc(L.osld[Math.max(0, RR_OSLONY.indexOf(this.ed._val("oslona")))])}</p>`);
      const d = document.createElement("div");
      d.className = "wzl";
      d.innerHTML = P.map((p, i) => `<button data-wp="${i}" aria-pressed="${this.ed._val("rama") === p.rama && this.ed._val("kolor") === p.kolor}"><span class="sw2" style="background:linear-gradient(135deg,${p.rama} 50%,${rrHex(p.kolor)} 50%)"></span><span><span class="wzn1">${esc(L.pre[i])}</span></span></button>`).join("");
      d.querySelectorAll("[data-wp]").forEach((b) => b.onclick = () => {
        const p = P[+b.dataset.wp];
        this._ustaw({ rama: p.rama, kolor: p.kolor, siatka: p.siatka ?? "" });
      });
      B.appendChild(d);
      const s = document.createElement("ha-selector");
      s.hass = this.h;
      s.selector = { text: {} };
      s.label = W.nazwa;
      s.value = this.c.name || "";
      s.addEventListener("value-changed", (e) => this.ed._set("name", e.detail.value || ""));
      B.appendChild(s);
      this._html(B, `<p class="hint">${esc(W.podglad)}</p>`);
    }
    /* ---------- krok 7: podsumowanie i miejsce karty ---------- */
    _k_gdzie(B) {
      const W = this.W, h = this.h, c = this.c, sk = this._skrzydla(), ri = this.ed._lang === "en" ? 1 : 0;
      const pkt = [];
      const st = h.states[c.entity];
      pkt.push([st && st.state !== "unavailable" ? "✅" : "⚠️", W.pRoleta(rrNazwa(h, c.entity))]);
      pkt.push(["✅", W.pSk(sk.length > 1 ? sk.map((x) => rrNazwa(h, x.cover)).join(" / ") : W.sk1)]);
      const rpm = sk.map((x) => rrRpm(h, x.cover, c[x.i ? "predkosc_prawa" : "predkosc_lewa"])).filter((x) => x > 0);
      pkt.push(rpm.length ? ["✅", W.pSil([...new Set(rpm)].join(" / ") + " " + W.obr)] : ["ℹ️", W.pSilU]);
      const auto = c.auto_czujniki !== false ? rrCzujnikiAuto(h, c.entity) : [];
      const cz = sk.map((x) => c[x.i ? "czujnik_prawe" : "czujnik_lewe"] || auto[x.i]).filter(Boolean);
      pkt.push(cz.length ? ["✅", W.pCz(cz.map((x) => rrNazwa(h, x)).join(" / "))] : ["ℹ️", W.pCzB]);
      const zr = this.ed._val("zrodlo"), wid = zr === "auto" ? rrPogodaId(c, h) : null;
      pkt.push(zr === "brak" ? ["ℹ️", W.pWxB] : wid && h.states[wid] ? ["✅", W.pWx(rrNazwa(h, wid) + " – " + this._stan(wid))] : ["✅", W.pWxI]);
      const rama = this.ed._val("rama"), kol = this.ed._val("kolor");
      pkt.push(["✅", W.pWyg(RR_RAMY[rama]?.[ri] || rama, RR_KOL_NAZWY[this.ed._lang][kol] || kol)]);
      this._html(B, `<div class="lb">${W.pods}</div><ul class="wzi">${pkt.map(([i, t]) => `<li>${i} ${esc(t)}</li>`).join("")}</ul>`);
      this._instalacja(B);
      this._html(B, `<div class="lb">${W.gdzieT}</div>` + this._alert("success", W.tutaj));
      if (!h.user?.is_admin) {
        this._html(B, this._alert("info", W.bezAdmina));
        return;
      }
      this._html(B, `<p class="hint">${esc(W.tez)}</p>`);
      const box = document.createElement("div");
      box.className = "wzg";
      box.innerHTML = `<p class="hint">${esc(W.wczytuje)}</p>`;
      B.appendChild(box);
      this._panele(box);
    }
    async _panele(box) {
      const W = this.W, h = this.h, biez = rrBiezacyPanel();
      const lista = await rrPanele(h);
      if (!box.isConnected) return;
      const nazwa = (d) => d.url_path ? d.title || d.url_path : W.domyslny;
      const opcje = lista.map((d, i) => ({ value: String(i), label: nazwa(d) + (d.url_path === biez ? W.tenPanel : d.mode === "yaml" ? W.yaml : ""), disabled: d.url_path === biez || d.mode === "yaml" }));
      box.innerHTML = "";
      const wyb = { d: opcje.find((o) => !o.disabled)?.value, v: "nowy" };
      const sel = (label, opts, value, cb) => {
        const s = document.createElement("ha-selector");
        s.hass = h;
        s.label = label;
        s.selector = { select: { mode: "dropdown", options: opts } };
        s.value = value;
        s.addEventListener("value-changed", (e) => cb(e.detail.value));
        return s;
      };
      const vBox = document.createElement("div"), btn = document.createElement("button"), out = document.createElement("p");
      btn.className = "wb";
      btn.textContent = W.dodaj;
      out.className = "hint";
      const widoki = async () => {
        vBox.innerHTML = "";
        btn.disabled = true;
        const d = lista[+wyb.d];
        if (!d) return;
        let cfg = null;
        try {
          cfg = await rrKonfigPanelu(h, d.url_path);
        } catch (x) {
        }
        const vs = cfg && !cfg.strategy ? cfg.views || [] : null;
        if (!vs) {
          out.textContent = nazwa(d) + W.autoPanel;
          return;
        }
        const opts = [{ value: "nowy", label: W.nowyWidok }, ...vs.map((v, i) => ({ value: String(i), label: (v.title || v.path || "#" + (i + 1)) + (v.type === "panel" || v.strategy ? W.widokPanel : ""), disabled: v.type === "panel" || !!v.strategy }))];
        wyb.v = "nowy";
        vBox.appendChild(sel(W.widok, opts, wyb.v, (v) => {
          wyb.v = v;
        }));
        btn.disabled = false;
      };
      box.appendChild(sel(W.panel, opcje, wyb.d, (v) => {
        wyb.d = v;
        out.textContent = "";
        widoki();
      }));
      box.append(vBox, btn, out);
      btn.onclick = async () => {
        const d = lista[+wyb.d];
        btn.disabled = true;
        const karta = Object.assign({ type: "custom:okno-ha" }, this.c);
        try {
          const v = await rrDodajDoPanelu(h, d.url_path, wyb.v === "nowy" ? "nowy" : +wyb.v, karta, W.nowyTytul);
          out.textContent = W.dodano(nazwa(d), v.title || v.path);
          await widoki();
        } catch (e) {
          out.textContent = W.blad(e.message || e);
          btn.disabled = false;
        }
      };
      if (wyb.d != null) widoki();
      else out.textContent = "";
    }
  };
  var rrKreatorPotrzebny = (c) => !Object.keys(c).some((k) => k !== "type" && k !== "entity" && !(k in RR_DEF && c[k] === RR_DEF[k]));

  // src/edytor.js
  var RR_POLA = ["entity", "name", "roleta_lewa", "roleta_prawa", "predkosc_lewa", "predkosc_prawa", "zrodlo", "pogoda", "tlo", "czujnik_lewe", "tryb_lewe", "czujnik_prawe", "tryb_prawe"];
  var RR_PRZEL = ["auto_czujniki", "klamki", "promienie", "dzwiek", "wibracja", "przyciski", "niebo", "widok", "uchwyty", "uchwyt_srodek", "osobno", "odwroc"];
  var RoletaRealistycznaEditor = class extends HTMLElement {
    setConfig(c) {
      this._cfg = Object.assign({}, c);
      this._go();
    }
    set hass(h) {
      this._hass = h;
      this._go();
    }
    disconnectedCallback() {
      clearInterval(this._loop);
      this._loop = null;
      clearInterval(this._kalI);
      clearInterval(this._ak);
      this._ak = null;
      cancelAnimationFrame(this._raf);
      this._raf = null;
    }
    connectedCallback() {
      if (this._built) this._startMotor();
    }
    get _L() {
      return RR_ED[this._lang];
    }
    _val(k) {
      return this._cfg[k] ?? RR_G.v?.[k] ?? RR_DEF[k];
    }
    _set(k, v) {
      const c = Object.assign({}, this._cfg);
      if (v === RR_DEF[k] || v === "" || v == null) delete c[k];
      else c[k] = v;
      this._cfg = c;
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: c }, bubbles: true, composed: true }));
      this._sync();
      this._preview();
      const pv = this._r?.querySelector(".pv");
      if (pv) {
        pv.classList.add("fl");
        clearTimeout(this._flT);
        this._flT = setTimeout(() => pv.classList.remove("fl"), 500);
      }
    }
    _go() {
      if (!this._hass || !this._cfg) return;
      const lang = rrJezyk(this._cfg, this._hass);
      if (this._built && lang !== this._lang) {
        clearInterval(this._loop);
        this._loop = null;
        this._built = false;
      }
      if (!this._built) {
        this._lang = lang;
        this._build();
      }
      this._schemat();
      this._f.hass = this._hass;
      const d = {};
      RR_POLA.forEach((k) => {
        d[k] = k === "pogoda" && this._cfg.pogoda === "auto" ? void 0 : this._cfg[k] ?? (RR_DEF[k] === "" ? void 0 : RR_DEF[k]);
      });
      this._f.data = d;
      this._sync();
      this._preview();
      this._kr?.odswiez();
    }
    _build() {
      const root = this.shadowRoot || this.attachShadow({ mode: "open" });
      const L = RR_ED[this._lang], KN = RR_KOL_NAZWY[this._lang], ri = this._lang === "en" ? 1 : 0;
      const chip = (grp, val, color, label) => `<button class="dot" data-g="${grp}" data-v="${val}" title="${label}"><i style="background:${color}"></i><span>${label}</span></button>`;
      root.innerHTML = `
<style>${RR_EDYTOR_STYL}</style>
</style>
<div class="ed">
 <div class="wiz" hidden></div>
 <div class="f"></div>
 <div class="pv">
  <div class="pvh"><span>${L.pv}</span><span><button class="pin-b wzo" style="opacity:1" title="${L.wz}">🪄</button><button class="pin-b" title="${L.pin}">📌</button> <button class="play">${L.play}</button></span></div>
  <div class="wxp wx1">${["", "sunny", "partlycloudy", "cloudy", "rainy", "pouring", "lightning-rainy", "snowy", "fog", "windy", "clear-night"].map((v, k) => `<button data-wx="${v}">${L.wxl[k]}</button>`).join("")}</div>
  <div class="wxp">${["", "uchyl", "otworz"].map((v, k) => `<button data-okp="${v}">${L.okp[k]}</button>`).join("")}</div>
  <div class="slot"></div>
 </div>
 <details class="sec" data-sec="wyg" open><summary>${L.sec_wyg}</summary>
 <div class="grp"><div class="lb">${L.osl}</div><p class="hint">${L.d_osl}</p>${Object.entries(RR_OSL_GRUPY).map(([g, typy]) => `<div class="osg">${g === "wew" ? L.osw : L.osz}</div><div class="seg osl">${typy.map((v) => `<button data-osl="${v}" title="${L.osld[RR_OSLONY.indexOf(v)]}"><ha-icon icon="${RR_OSL_IKONY[v]}"></ha-icon> ${L.osln[RR_OSLONY.indexOf(v)]}</button>`).join("")}</div>`).join("")}<p class="hint" id="oslD"></p></div>
 <div class="grp"><div class="lb">${L.kol}<span class="kn" data-kn="kolor"></span></div><div class="dots" id="kol">
  ${Object.keys(RR_KOLORY).map((k) => chip("kolor", k, RR_KOLORY[k], KN[k] || k)).join("")}
  <label class="dot" data-own="kolor" title="${L.own}"><span class="own"><input type="color" id="kolOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="kolor" min="0" step="1"><p class="hint">${L.d_kol}</p></div>
 <div class="grp"><div class="lb">${L.sia}<span class="kn" data-kn="siatka"></span></div><div class="dots" id="sia">
  ${chip("siatka", "", "repeating-linear-gradient(180deg,#888 0 4px,#ddd 4px 7px)", L.siaj)}
  ${Object.keys(RR_KOLORY).map((k) => chip("siatka", k, RR_KOLORY[k], KN[k] || k)).join("")}
  <label class="dot" data-own="siatka" title="${L.own}"><span class="own"><input type="color" id="siaOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="siatka" min="0" step="1"><p class="hint">${L.d_sia}</p></div>
 <div class="grp"><div class="lb">${L.ram}<span class="kn" data-kn="rama"></span></div><div class="dots" id="ram">
  ${Object.keys(RR_RAMY).map((k) => chip("rama", k, k, RR_RAMY[k][ri])).join("")}
  <label class="dot" data-own="rama" title="${L.own}"><span class="own"><input type="color" id="ramOwn"></span><span>${L.own}</span></label></div>
  <input type="range" class="psl" data-psl="rama" min="0" step="1"><p class="hint">${L.d_ram}</p></div>
 <div class="grp"><div class="lb">${L.sk}</div><div class="seg"><button data-sk="1">${L.sk1}</button><button data-sk="2">${L.sk2}</button></div><p class="hint">${L.d_sk}</p></div>
 <div class="grp" id="slGrp"><div class="lb">${L.sl}</div><div class="seg"><button data-sl="staly">${L.sl1}</button><button data-sl="ruchomy">${L.sl2}</button></div><p class="hint">${L.slh}</p></div>
 <div class="grp"><label class="sl"><div>${L.wys} <b id="wysV"></b></div><input type="range" id="wys" min="140" max="460" step="10"></label></div>
 <button class="rst" data-rst="wyg">${L.rst}</button></details>
 <details class="sec" data-sec="okn"><summary>${L.sec_okn}</summary>
 <div class="grp"><div class="lb">${L.s_okn}</div>
  <label class="sl"><div>${L.uch} <b id="uchV"></b></div><input type="range" id="uch" min="3" max="30" step="1"></label>
  <label class="sl"><div>${L.otw} <b id="otwV"></b></div><input type="range" id="otw" min="5" max="90" step="5"></label><p class="hint">${L.d_okn}</p><p class="hint" id="czA"></p></div>
 <button class="rst" data-rst="okn">${L.rst}</button></details>
 <details class="sec" data-sec="ruch"><summary>${L.sec_ruch}</summary>
 <div class="grp"><div class="lb">${L.roz}</div>
  <label class="sw">${L.auto} <ha-switch id="auto"></ha-switch></label>
  <label class="sl" id="czasBox"><div>${L.czas} <b id="czasV"></b></div><input type="range" id="czas" min="3" max="90" step="0.5"></label>
  <p class="hint" id="obrH"></p></div>
 <div class="grp"><div class="lb">${L.kr}</div>
  <label class="sl"><div>${L.krs} <b id="krV"></b></div><input type="range" id="kr" min="0" max="25" step="1"></label>
  <label class="sl"><div>${L.poz}</div><input type="text" id="poz" inputmode="numeric" class="txt"></label><p class="hint">${L.d_kr}</p></div>
 <div class="grp"><div class="lb">${L.kal}</div>
  <p class="hint">${L.akh}</p>
  <div class="kal"><button class="play" id="akal">${L.ak}</button></div><p class="hint" id="akV"></p>
  <p class="hint">${L.kalh}</p>
  <div class="kal"><button class="play" data-kal="down">${L.kd}</button><button class="play" data-kal="up">${L.ku}</button><button class="play ok" id="kalOk" disabled>${L.kok}</button></div>
  <div class="kalw"><b id="kalV">0.0 s</b><button class="play" id="kalZap" hidden>${L.kzap}</button></div></div>
 <button class="rst" data-rst="ruch">${L.rst}</button></details>
 <details class="sec" data-sec="zaaw"><summary>${L.sec_zaaw}</summary>
 <div class="grp"><div class="lb">${L.jez}</div><div class="seg">${[["auto", L.jauto], ["pl", "Polski"], ["en", "English"]].map(([v, t]) => `<button data-jz="${v}">${t}</button>`).join("")}</div></div>
 <div class="grp"><div class="lb">${L.opc}</div>
  ${RR_PRZEL.map((k) => `<label class="sw">${L[k]} <ha-switch id="${k}"></ha-switch></label>`).join("")}</div>
 <div class="grp"><div class="lb">${L.glob}</div><p class="hint">${L.globh}</p>
  <div class="kal"><button class="play" id="gSave">${L.gSave}</button><button class="play" id="gClr" style="background:var(--secondary-text-color)">${L.gClr}</button></div><p class="hint" id="gInfo"></p></div>
 <button class="rst" data-rst="zaaw">${L.rst}</button></details>
 <div class="ver">${RR_TXT[this._lang].nazwaKarty} ${RR_WERSJA}</div>
</div>`;
      const $ = (s) => root.querySelector(s);
      this._r = root;
      this._f = document.createElement("ha-form");
      this._schemat();
      this._f.computeLabel = (s) => L.f[s.name] || s.title || s.name;
      this._f.addEventListener("value-changed", (e) => {
        const v = e.detail.value;
        RR_POLA.forEach((k) => this._set(k, v[k] || (k === "pogoda" ? "auto" : RR_DEF[k])));
      });
      root.querySelectorAll("[data-jz]").forEach((b) => b.onclick = () => this._set("jezyk", b.dataset.jz));
      root.querySelectorAll("[data-kal]").forEach((b) => b.onclick = () => this._kal(b.dataset.kal));
      $("#kalOk").onclick = () => this._kalOk();
      $("#akal").onclick = () => this._akal();
      const RST = { wyg: ["oslona", "kolor", "siatka", "rama", "skrzydla", "slupek", "wysokosc"], okn: ["kat_uchyl", "otwarcie"], ruch: ["czas", "krok", "pozycje"], zaaw: ["jezyk", ...RR_PRZEL] };
      root.querySelectorAll("[data-rst]").forEach((b) => b.onclick = () => RST[b.dataset.rst].forEach((k) => this._set(k, null)));
      this._kr = new RrKreator(this, $(".wiz"));
      $(".wzo").onclick = () => this._kr.otworz(0);
      if (rrKreatorPotrzebny(this._cfg)) this._kr.otworz(0);
      const gInfo = () => {
        const n = Object.keys(RR_G.v || {}).length;
        $("#gInfo").textContent = n ? L.gIle(n) : L.gBrak;
      };
      rrGlobLoad(this._hass).then(() => {
        gInfo();
        this._sync();
        this._preview();
      });
      $("#gSave").onclick = () => {
        const v = {};
        RR_GKLUCZE.forEach((k) => {
          const x = this._val(k);
          if (x !== RR_DEF[k] && x !== "" && x != null) v[k] = x;
        });
        rrGlobSave(this._hass, v).then(() => {
          gInfo();
          $("#gInfo").textContent += " ✔";
        });
        const c = Object.assign({}, this._cfg);
        RR_GKLUCZE.forEach((k) => delete c[k]);
        this._cfg = c;
        this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: c }, bubbles: true, composed: true }));
        this._sync();
        this._preview();
      };
      $("#gClr").onclick = () => rrGlobSave(this._hass, {}).then(() => {
        gInfo();
        this._sync();
        this._preview();
      });
      $("#kalZap").onclick = () => {
        if (this._kalWyn) this._set("czas", this._kalWyn);
      };
      root.querySelectorAll("[data-wx]").forEach((b) => b.onclick = () => {
        this._wx = b.dataset.wx;
        this._sync();
        this._feed();
      });
      $(".f").appendChild(this._f);
      root.querySelectorAll(".dot[data-g]").forEach((b) => b.onclick = () => this._set(b.dataset.g, b.dataset.v));
      root.querySelectorAll("[data-psl]").forEach((sl) => {
        const g = sl.dataset.psl, dots = [...root.querySelectorAll(`.dot[data-g="${g}"]`)];
        sl.max = dots.length - 1;
        sl.oninput = () => {
          const b = dots[+sl.value];
          if (b && b.dataset.v !== String(this._val(g) || "")) this._set(g, b.dataset.v);
        };
      });
      $("#kolOwn").oninput = (e) => this._set("kolor", e.target.value);
      $("#siaOwn").oninput = (e) => this._set("siatka", e.target.value);
      $("#ramOwn").oninput = (e) => this._set("rama", e.target.value);
      root.querySelectorAll("[data-sk]").forEach((b) => b.onclick = () => this._set("skrzydla", +b.dataset.sk));
      root.querySelectorAll("[data-osl]").forEach((b) => b.onclick = () => this._set("oslona", b.dataset.osl));
      root.querySelectorAll("[data-sl]").forEach((b) => b.onclick = () => this._set("slupek", b.dataset.sl));
      $("#wys").oninput = (e) => this._set("wysokosc", +e.target.value);
      $("#uch").oninput = (e) => {
        this._okp = "uchyl";
        this._set("kat_uchyl", +e.target.value);
      };
      $("#otw").oninput = (e) => {
        this._okp = "otworz";
        this._set("otwarcie", +e.target.value);
      };
      root.querySelectorAll("[data-okp]").forEach((b) => b.onclick = () => {
        this._okp = b.dataset.okp;
        this._sync();
        this._preview();
      });
      let pin = true;
      try {
        pin = localStorage.getItem("rr-pin") !== "0";
      } catch (x) {
      }
      $(".pv").classList.toggle("pin", pin);
      $(".pin-b:not(.wzo)").onclick = () => {
        const on = $(".pv").classList.toggle("pin");
        try {
          localStorage.setItem("rr-pin", on ? "1" : "0");
        } catch (x) {
        }
      };
      $("#kr").oninput = (e) => this._set("krok", +e.target.value);
      $("#poz").onchange = (e) => this._set("pozycje", e.target.value.replace(/[^0-9,; ]/g, "").trim() || RR_DEF.pozycje);
      $("#czas").oninput = (e) => this._set("czas", +e.target.value);
      $("#auto").addEventListener("change", (e) => this._set("czas", e.target.checked ? "auto" : Math.round(rrCzas("auto", this._rpm()[0]))));
      RR_PRZEL.forEach((k) => $("#" + k).addEventListener("change", (e) => this._set(k, e.target.checked)));
      $(".play").onclick = () => this._demo();
      this._card = document.createElement("okno-ha");
      $(".slot").appendChild(this._card);
      this._m = { "cover.podglad_l": { pos: 60, target: 60 }, "cover.podglad_p": { pos: 60, target: 60 } };
      this._built = true;
      this._startMotor();
    }
    /* wszystko do wyboru (v17) – rozwijane sekcje, nic na sztywno; v23: ścisłe filtry – w listach tylko pasujące encje */
    _schemat() {
      const L = RR_ED[this._lang], h = this._hass, e = this._cfg.entity;
      const klucz = this._lang + Object.keys(h.states).length + "|" + e;
      if (klucz === this._sk) return;
      this._sk = klucz;
      const m = h.states[e]?.attributes?.entity_id || [];
      const tylko = (rola, ref, dom) => {
        const k = rrKandydaci(h, rola, ref).map((x) => x.id);
        return { entity: k.length ? { include_entities: k } : { domain: dom } };
      };
      const opt = (a) => ({ select: { mode: "dropdown", options: a.map(([value, label]) => ({ value, label })) } });
      this._f.schema = [
        { name: "entity", required: true, selector: tylko("cover", {}, "cover") },
        { name: "name", selector: { text: {} } },
        { type: "expandable", flatten: true, name: "", title: L.s_enc, icon: "mdi:roller-shade", schema: [
          { name: "roleta_lewa", selector: tylko("skrzydlo", { members: m, side: 0 }, "cover") },
          { name: "roleta_prawa", selector: tylko("skrzydlo", { members: m, side: 1 }, "cover") },
          { name: "predkosc_lewa", selector: tylko("speed", { cover: m[0] || e }, "number") },
          { name: "predkosc_prawa", selector: tylko("speed", { cover: m[1] || e }, "number") }
        ] },
        { type: "expandable", flatten: true, name: "", title: L.s_pog, icon: "mdi:weather-partly-cloudy", schema: [
          { name: "zrodlo", selector: opt(L.zr) },
          { name: "pogoda", selector: tylko("weather", {}, "weather") },
          { name: "tlo", selector: { text: {} } }
        ] },
        { type: "expandable", flatten: true, name: "", title: L.s_okn, icon: "mdi:window-open-variant", schema: [
          { name: "czujnik_lewe", selector: tylko("contact", { cover: e, side: 0 }, "binary_sensor") },
          { name: "tryb_lewe", selector: opt(L.tr) },
          { name: "czujnik_prawe", selector: tylko("contact", { cover: e, side: 1 }, "binary_sensor") },
          { name: "tryb_prawe", selector: opt(L.tr) }
        ] }
      ];
    }
    _rpm() {
      const st = this._hass?.states[this._cfg.entity];
      const m = (st?.attributes?.entity_id || [this._cfg.entity]).slice(0, 2);
      if (m.length < 2) m.push(m[0]);
      const wyb = [this._cfg.roleta_lewa, this._cfg.roleta_prawa];
      return m.map((e, i) => rrRpm(this._hass, wyb[i] || e, this._cfg[i ? "predkosc_prawa" : "predkosc_lewa"]));
    }
    _startMotor() {
      if (this._loop) return;
      let last = performance.now();
      this._loop = setInterval(() => {
        const now = performance.now(), dt = (now - last) / 1e3;
        last = now;
        const rpm = this._rpm();
        let ch = false;
        Object.keys(this._m).forEach((id, i) => {
          const m = this._m[id], r = rpm[i] || rpm[0];
          const sp = 100 / rrCzas(this._val("czas"), r);
          const d = m.target - m.pos;
          if (Math.abs(d) > 0.01) {
            m.pos += Math.sign(d) * Math.min(Math.abs(d), sp * dt);
            ch = true;
          }
        });
        if (ch || this._was) this._feed();
        this._was = ch;
      }, 500);
    }
    _feed() {
      if (!this._card || !this._hass) return;
      const ids = Object.keys(this._m), st = {};
      const rpm = this._rpm();
      ids.forEach((id, i) => {
        const m = this._m[id], s = m.target > m.pos + 0.01 ? "opening" : m.target < m.pos - 0.01 ? "closing" : m.pos <= 0 ? "closed" : "open";
        let p = Math.round(m.pos);
        if (this._val("odwroc")) p = 100 - p;
        st[id] = { state: s, attributes: { current_position: p } };
        if (rpm[i] || rpm[0]) st[id.replace("cover.", "number.") + "_motor_speed"] = { state: String(rpm[i] || rpm[0]) };
      });
      const avg = Math.round(ids.reduce((a, id) => a + this._m[id].pos, 0) / ids.length);
      const ss = ids.map((id) => st[id].state);
      st["cover.podglad"] = {
        state: ss.includes("opening") ? "opening" : ss.includes("closing") ? "closing" : avg <= 0 ? "closed" : "open",
        attributes: { current_position: this._val("odwroc") ? 100 - avg : avg, friendly_name: "Podgląd", entity_id: ids }
      };
      const wid = this._val("zrodlo") === "auto" ? rrPogodaId(this._cfg, this._hass) : null;
      const real = this._val("zrodlo") === "brak" ? null : wid && this._hass.states[wid] || rrInternet(this._hass, () => this._feed());
      st["weather.podglad"] = this._wx ? { state: this._wx, attributes: { temperature: this._wx === "snowy" ? -2 : this._wx === "sunny" ? 24 : 12, temperature_unit: "°C" } } : real;
      ["czujnik_lewe", "czujnik_prawe"].forEach((k) => {
        const id = this._cfg[k];
        if (id && this._hass.states[id]) st[id] = this._hass.states[id];
      });
      if (this._okp) st["binary_sensor.podglad_l"] = st["binary_sensor.podglad_p"] = { state: "on" };
      st["sun.sun"] = this._wx ? { state: this._wx === "clear-night" ? "below_horizon" : "above_horizon" } : this._hass.states["sun.sun"];
      const ed = this;
      this._card.hass = { states: st, language: this._hass.language, config: this._hass.config, callService(dom, svc, data) {
        const list = data.entity_id === "cover.podglad" ? ids : [data.entity_id];
        let p = data.position;
        if (p != null && ed._val("odwroc")) p = 100 - p;
        list.forEach((id) => {
          const m = ed._m[id];
          m.target = svc === "open_cover" ? 100 : svc === "close_cover" ? 0 : svc === "stop_cover" ? m.pos : p;
        });
        ed._feed();
      } };
    }
    _preview() {
      if (!this._card) return;
      const c = Object.assign({}, this._cfg, {
        entity: "cover.podglad",
        name: this._cfg.name || RR_ED[this._lang].pv.split(" – ")[0],
        pogoda: "weather.podglad",
        zrodlo: "auto",
        roleta_lewa: "",
        roleta_prawa: "",
        predkosc_lewa: "",
        predkosc_prawa: ""
      });
      if (this._okp) Object.assign(c, { czujnik_lewe: "binary_sensor.podglad_l", czujnik_prawe: "binary_sensor.podglad_p", tryb_lewe: this._okp, tryb_prawe: this._okp });
      const key = JSON.stringify(c);
      if (key !== this._pk) {
        this._pk = key;
        this._card.setConfig(c);
      }
      this._feed();
    }
    /* kalibracja stoperem (v17): komenda do prawdziwej rolety, użytkownik klika „Dojechała” */
    _kal(kier) {
      this._hass.callService("cover", kier === "down" ? "close_cover" : "open_cover", { entity_id: this._cfg.entity });
      this._kalT = performance.now();
      this._kalWyn = null;
      const r = this._r;
      r.querySelector("#kalOk").disabled = false;
      r.querySelector("#kalZap").hidden = true;
      clearInterval(this._kalI);
      this._kalI = setInterval(() => {
        r.querySelector("#kalV").textContent = ((performance.now() - this._kalT) / 1e3).toFixed(1) + " s";
      }, 100);
    }
    /* automatyczna kalibracja (v18): góra → dół (mierzone) → góra (mierzone), średnia zapisana jako czas */
    _akal(btn = this._r.querySelector("#akal"), out = this._r.querySelector("#akV"), etyk = RR_ED[this._lang].ak) {
      const L = RR_ED[this._lang], e = this._cfg.entity;
      const koniec = (txt) => {
        clearInterval(this._ak);
        this._ak = null;
        btn.textContent = etyk;
        out.textContent = txt;
      };
      if (this._ak) {
        this._hass.callService("cover", "stop_cover", { entity_id: e });
        koniec(L.akstop);
        return;
      }
      const rpm = this._rpm()[0];
      if (rpm > 0) {
        out.textContent = L.akrpm(rrCzas("auto", rpm).toFixed(1));
        return;
      }
      const kroki = [["open_cover", 100], ["close_cover", 0], ["open_cover", 100]], wyn = [];
      const stan = () => {
        const s = this._hass.states[e] || {};
        const p = s.attributes?.current_position;
        return { mv: s.state === "opening" || s.state === "closing", p: this._cfg.odwroc && typeof p === "number" ? 100 - p : p, k: (s.last_updated || "") + s.state + p };
      };
      let n = -1, t0, ruch, k0;
      const dalej = () => {
        n++;
        if (n === kroki.length) {
          const t = Math.round((wyn[0] + wyn[1]) * 10 / 2) / 10;
          this._set("czas", t);
          koniec(L.akok(t));
          return;
        }
        this._hass.callService("cover", kroki[n][0], { entity_id: e });
        t0 = performance.now();
        ruch = false;
        k0 = stan().k;
      };
      btn.textContent = L.akx;
      out.textContent = L.ak0;
      this._ak = setInterval(() => {
        const s = stan(), el = (performance.now() - t0) / 1e3, cel = kroki[n][1];
        if (s.mv) ruch = true;
        const dojechala = ruch ? !s.mv && el > 1 : el > 4 && s.k !== k0 && s.p === cel || n === 0 && el > 3 && s.p === cel;
        if (dojechala) {
          if (n) wyn.push(el);
          dalej();
        } else if (el > 240) koniec(L.aktm);
        else if (this._ak) out.textContent = n === 0 ? L.ak0 : n === 1 ? L.ak1(el.toFixed(1)) : L.ak2(wyn[0].toFixed(1), el.toFixed(1));
      }, 200);
      dalej();
    }
    _kalOk() {
      if (!this._kalT) return;
      clearInterval(this._kalI);
      this._kalWyn = Math.round((performance.now() - this._kalT) / 100) / 10;
      this._kalT = null;
      const r = this._r, L = RR_ED[this._lang];
      r.querySelector("#kalV").textContent = L.kwyn(this._kalWyn);
      r.querySelector("#kalOk").disabled = true;
      r.querySelector("#kalZap").hidden = false;
    }
    _demo() {
      const ids = Object.keys(this._m);
      ids.forEach((id) => this._m[id].target = 0);
      this._feed();
      clearTimeout(this._dt);
      const t = rrCzas(this._val("czas"), this._rpm()[0]);
      this._dt = setTimeout(() => {
        ids.forEach((id) => this._m[id].target = 50);
        this._feed();
      }, t * 1e3 * 0.7 + 800);
    }
    _sync() {
      if (!this._r) return;
      const r = this._r, kol = this._val("kolor"), rama = this._val("rama");
      r.querySelectorAll('.dot[data-g="kolor"]').forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === kol));
      r.querySelectorAll('.dot[data-g="rama"]').forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === rama));
      r.querySelectorAll('.dot[data-g="siatka"]').forEach((b) => b.setAttribute("aria-pressed", b.dataset.v === (this._val("siatka") || "")));
      ["kolor", "siatka", "rama"].forEach((g) => {
        const v = g === "siatka" ? this._val(g) || "" : this._val(g), sel = [...r.querySelectorAll(`.dot[data-g="${g}"]`)].find((b) => b.dataset.v === v);
        const own = r.querySelector(`[data-own="${g}"]`);
        own.setAttribute("aria-pressed", !sel);
        own.querySelector(".own").style.background = sel ? "" : rrHex(v);
        r.querySelector(`[data-kn="${g}"]`).textContent = "· " + (sel ? sel.title : /^#/.test(v) ? v : RR_ED[this._lang].own);
        const el = sel || own, sl = r.querySelector(`[data-psl="${g}"]`);
        if (sel && r.activeElement !== sl) sl.value = [...r.querySelectorAll(`.dot[data-g="${g}"]`)].indexOf(sel);
        if (this._kn?.[g] !== v) {
          (this._kn = this._kn || {})[g] = v;
          const d = el.parentElement;
          d.scrollTo({ left: el.offsetLeft - d.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
        }
      });
      r.querySelector("#kolOwn").value = /^#[0-9a-f]{6}$/i.test(rrHex(kol)) ? rrHex(kol) : "#232427";
      r.querySelector("#ramOwn").value = /^#[0-9a-f]{6}$/i.test(rama) ? rama : "#f4f4f2";
      r.querySelectorAll("[data-sk]").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.sk === +this._val("skrzydla")));
      r.querySelectorAll("[data-osl]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.osl === this._val("oslona")));
      r.querySelector("#oslD").textContent = this._L.osld[Math.max(0, RR_OSLONY.indexOf(this._val("oslona")))];
      r.querySelectorAll("[data-sl]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.sl === this._val("slupek")));
      r.querySelector("#slGrp").style.display = +this._val("skrzydla") === 1 ? "none" : "";
      const set = (id, v, txt) => {
        const el = r.querySelector("#" + id);
        if (r.activeElement !== el) el.value = v;
        r.querySelector("#" + id + "V").textContent = txt;
      };
      set("wys", this._val("wysokosc"), this._val("wysokosc") + " px");
      set("uch", this._val("kat_uchyl"), this._val("kat_uchyl") + "°");
      set("otw", this._val("otwarcie"), this._val("otwarcie") + " %");
      if (r.activeElement !== r.querySelector("#poz")) r.querySelector("#poz").value = this._val("pozycje");
      set("kr", this._val("krok"), +this._val("krok") > 0 ? "▲▼ " + this._val("krok") + " %" : RR_ED[this._lang].kr0);
      const auto = this._val("czas") === "auto";
      r.querySelector("#auto").checked = auto;
      r.querySelector("#czasBox").style.display = auto ? "none" : "";
      if (!auto) set("czas", this._val("czas"), this._val("czas") + " s");
      const rpm = this._rpm().filter((x) => x > 0);
      const L = RR_ED[this._lang];
      r.querySelector("#obrH").textContent = rpm.length ? L.obr([...new Set(rpm)].join(", "), rrCzas(this._val("czas"), rpm[0]).toFixed(1)) + (auto ? L.obrM : "") : L.obr0 + (auto ? rrUcz.get(this._cfg.entity) ? L.obrU(rrUcz.get(this._cfg.entity).toFixed(1)) : L.obrA : ".");
      RR_PRZEL.forEach((k) => {
        r.querySelector("#" + k).checked = !!this._val(k);
      });
      r.querySelectorAll("[data-jz]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.jz === this._val("jezyk")));
      r.querySelectorAll("[data-wx]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.wx === (this._wx || "")));
      const czA = this._val("auto_czujniki") !== false ? rrCzujnikiAuto(this._hass, this._cfg.entity) : [];
      const nz = (id) => this._hass.states[id]?.attributes?.friendly_name || id;
      r.querySelector("#czA").textContent = czA.filter(Boolean).length ? L.czA(czA.map((x) => x ? nz(x) : "–").join(" / ")) : L.czA0;
      r.querySelectorAll("[data-okp]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.okp === (this._okp || "")));
    }
  };

  // src/index.js
  console.info("%c Okno HA " + RR_WERSJA + " %c © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/roleta-realistyczna ", "background:#232427;color:#fff;border-radius:3px 0 0 3px", "background:#ff8f00;color:#fff;border-radius:0 3px 3px 0");
  var rej = (nazwa, klasa) => {
    if (!customElements.get(nazwa)) customElements.define(nazwa, klasa);
  };
  rej("okno-ha", RoletaRealistyczna);
  rej("okno-ha-editor", RoletaRealistycznaEditor);
  rej("roleta-realistyczna", class extends RoletaRealistyczna {
  });
  rej("roleta-realistyczna-editor", class extends RoletaRealistycznaEditor {
  });
  var T = RR_TXT[String(document.documentElement.lang || navigator.language || "pl").startsWith("pl") ? "pl" : "en"];
  window.customCards = window.customCards || [];
  window.customCards.push({ type: "okno-ha", name: T.nazwaKarty + " " + RR_WERSJA, description: T.opisKarty, preview: true, documentationURL: "https://github.com/superdarco78/roleta-realistyczna#readme" });
})();
