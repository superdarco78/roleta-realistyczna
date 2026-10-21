/*!
 * Motor HA (dawniej Roleta dzień-noc, roleta-realistyczna)
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
        po aktualizacji w HACS karta raz sama przeładowuje stronę, gdy działa starsza wersja niż zainstalowana
   v30 – samo przeładowanie strony także z encją aktualizacji integracji Okno HA i przy otwartej stronie
   v31 – edytor okna z integracji zapisuje zmiany w urządzeniu (okno_ha/zapisz); karta w „Dodaj do panelu” urządzenia
   v32 – szeroki edytor w dwóch kolumnach z przyklejonym podglądem; kolorowe kółka w kilku rzędach bez suwaka
   v33 – kreator: dowolny kolor osłony i ramy z palety (podgląd na żywo), wyraźniejsze podpisy kółek kolorów
   v34 – kolory z motywu HA: akcent (uchwyt, linia celu, przyciski animacji), bez numeru karty – w edytorze wersja integracji
   v35 – zapasowe kolory = domyślne kolory HA: główny #009ac7, akcent #ff9800
   v36 – kreator bez stałych kolorów: ikony mdi i ramki w kolorze głównym motywu, bez numeru karty w komunikatach
   v37 – napis na kolorze motywu biały albo czarny (kontrast z kolorem z profilu); naprawa kreatora (komunikat o wersji) */
(() => {
  // src/stale.js
  var RR_WERSJA = "v38";
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
  var RR_PROBNIK = typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;
  function rrNaKolorze(kolor) {
    if (!RR_PROBNIK || !kolor) return "";
    RR_PROBNIK.fillStyle = "#000";
    RR_PROBNIK.fillStyle = kolor.trim();
    const m = /^#([0-9a-f]{6})$/i.exec(RR_PROBNIK.fillStyle);
    if (!m) return "";
    const [r, g, b] = [0, 2, 4].map((i) => {
      const c = parseInt(m[1].slice(i, i + 2), 16) / 255;
      return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.4 ? "#212121" : "#fff";
  }
  function rrKontrast(el) {
    if (!el || !el.isConnected) return;
    const s = getComputedStyle(el), g = rrNaKolorze(s.getPropertyValue("--primary-color")), a = rrNaKolorze(s.getPropertyValue("--accent-color"));
    if (g && el.style.getPropertyValue("--rr-na-glownym") !== g) el.style.setProperty("--rr-na-glownym", g);
    if (a && el.style.getPropertyValue("--rr-na-akcencie") !== a) el.style.setProperty("--rr-na-akcencie", a);
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
      nazwaKarty: "Motor HA",
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
      osz: "Na zewnątrz",
      urz: "🔗 To okno z integracji Motor HA – każda zmiana zapisuje się sama w urządzeniu (to samo, co „Konfiguruj”)."
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
      wlasny: "🎨 Dowolny kolor z palety",
      wlasnyKol: "Osłona",
      wlasnyRam: "Rama",
      wlasnyOpis: "Kliknij kółko z tęczą i wybierz dowolny kolor – podgląd zmieni się od razu.",
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
      verOk: "Karta zainstalowana poprawnie – masz najnowszą wersję.",
      verNowa: "Jest nowsza wersja Motoru HA. Zaktualizuj ją w Ustawienia → Aktualizacje, potem przeładuj stronę.",
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
      nazwaKarty: "Motor HA",
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
      osz: "Outside",
      urz: "🔗 This window comes from the Motor HA integration – every change is saved to the device automatically (same as “Configure”)."
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
      wlasny: "🎨 Any colour from a palette",
      wlasnyKol: "Shade",
      wlasnyRam: "Frame",
      wlasnyOpis: "Tap the rainbow circle and pick any colour – the preview changes right away.",
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
      verOk: "Card installed correctly – you have the latest version.",
      verNowa: "A newer version of Motor HA is available. Update it in Settings → Updates, then reload the page.",
      btnHacs: "Open HACS",
      btnPrzeladuj: "🔄 Reload page",
      zasobyDup: "The card is added {0} times in Resources. Keep one entry (Settings → Dashboards → ⋮ → Resources), otherwise old and new versions may mix.",
      btnZasoby: "Open Resources",
      obr: "rpm"
    }
  };

  // translations/de.json
  var de_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Realistisches Fenster mit Doppelrollo: Animation im Motortempo, Ziehen zum Bewegen, echtes Wetter draußen und ein Assistent für Einsteiger",
      open: "Offen",
      closed: "Geschlossen",
      opening: "Öffnet…",
      closing: "Schließt…",
      unavailable: "Nicht verfügbar",
      unknown: "Unbekannt",
      czesc: "Teilweise geschlossen",
      up: "Öffnen",
      stop: "Stopp",
      down: "Schließen",
      brak: "Entität nicht gefunden",
      okno: "Fenster",
      lewe: "linkes ",
      prawe: "rechtes ",
      otw: "offen",
      uchyl: "gekippt",
      oba: "Beide Flügel",
      wx: {
        sunny: "sonnig",
        "clear-night": "klar",
        partlycloudy: "teilweise bewölkt",
        cloudy: "bewölkt",
        exceptional: "außergewöhnlich",
        fog: "Nebel",
        rainy: "Regen",
        pouring: "Starkregen",
        hail: "Hagel",
        lightning: "Blitze",
        "lightning-rainy": "Gewitter",
        snowy: "Schnee",
        "snowy-rainy": "Schneeregen",
        windy: "windig",
        "windy-variant": "windig, bewölkt"
      }
    },
    edytor: {
      pv: "Live-Vorschau – bewegt den echten Rollladen nicht",
      play: "▶ Animation zeigen",
      wxl: [
        "echt",
        "☀️ Sonne",
        "⛅ teilweise",
        "☁️ bewölkt",
        "🌧️ Regen",
        "💧 Starkregen",
        "⛈️ Gewitter",
        "❄️ Schnee",
        "🌫️ Nebel",
        "💨 Wind",
        "🌙 Nacht"
      ],
      kol: "Streifenfarbe",
      ram: "Farbe des Fensterrahmens",
      own: "eigene",
      sk: "Fensterflügel",
      sk1: "1 Flügel",
      sk2: "2 Flügel",
      pin: "Vorschau oben anheften",
      okp: [
        "🪟 geschlossen",
        "↘ gekippt",
        "↔ offen"
      ],
      d_kol: "Farbe der blickdichten Streifen wie in Doppelrollo-Kollektionen; „eigene“ = beliebige Farbe.",
      d_sia: "Farbe der transparenten Streifen. „Wie blickdicht“ = hellerer Ton der Streifenfarbe.",
      d_ram: "Farbe von Rahmen und Flügeln. Farben mit Maserung sind Holzdekore.",
      d_sk: "Anzahl der Fensterflügel. Bei zwei kann jeder Flügel sein eigenes Rollo haben.",
      d_okn: "Wird gezeigt, wenn ein Kontaktsensor das Fenster als offen meldet. Bewege einen Regler, um es in der Vorschau zu sehen.",
      d_kr: "Die Tasten ▲ und ▼ bewegen den Rollladen um einen kleinen Schritt. Schnellpositionen sind die Prozenttasten.",
      sl: "Pfosten zwischen den Flügeln",
      sl1: "fest",
      sl2: "beweglich",
      slh: "Ein fester Pfosten bleibt im Rahmen. Ein beweglicher gehört zum linken Flügel – sind beide offen, ist die Mitte frei.",
      roz: "Größe und Geschwindigkeit",
      wys: "Fensterhöhe",
      auto: "Laufzeit aus Motordrehzahl (auto)",
      czas: "Volle Laufzeit (manuell)",
      obr: "Motordrehzahl: {0} U/min → volle Laufzeit ca. {1} s",
      obr0: "Dieser Rollladen meldet keine Motordrehzahl",
      obrA: " – angenommen 30 s (die Karte lernt sie oder nutze die Kalibrierung).",
      obrU: " – gelernte Laufzeit: {0} s.",
      obrM: " (gemessen an Moes-Motoren)",
      kal: "Kalibrierung der Laufzeit",
      kalh: "Manuelle Stoppuhr: klicken, dann „Angekommen“ drücken, wenn der Rollladen das Ende erreicht. Am besten von ganz offen bis ganz geschlossen.",
      sia: "Farbe der transparenten Streifen",
      siaj: "wie blickdicht",
      poz: "Schnellpositionen (Prozent, durch Komma getrennt, 100 = offen)",
      sec_wyg: "🎨 Aussehen",
      sec_okn: "🪟 Fenster",
      sec_ruch: "⏱ Bewegung und Kalibrierung",
      sec_zaaw: "⚙️ Erweitert",
      rst: "↺ Standard wiederherstellen",
      wz: "🪄 Assistent",
      pre: [
        "Modern (Anthrazit + Graphit)",
        "Klassisches Holz (Golden Oak + Beige)",
        "Skandinavisch (Weiß + Creme)",
        "Dunkel (Schwarz + schwarze Streifen)",
        "Warmes Nussbaum (Nussbaum + Sand)",
        "Farbenfroh (Weiß + Türkis)"
      ],
      glob: "🌍 Globale Einstellungen",
      globh: "Speichere dieses Aussehen (Farben, Rahmen, Fenster, Tasten, Optionen) als Standard für alle Rollokarten, auch neue. Jede Karte kann es trotzdem ändern.",
      gSave: "🌍 Als Standard für alle Karten speichern",
      gClr: "Löschen",
      gIle: "Global gespeichert: {0} Einstellungen. Alle Karten nutzen sie.",
      gBrak: "Keine globalen Einstellungen – Karten nutzen die Standardwerte.",
      wibracja: "Leichte Handyvibration beim Tippen",
      auto_czujniki: "Fenster-Kontaktsensoren in diesem Raum automatisch finden",
      czA: "🔎 Automatisch erkannt (links / rechts): {0}. Die manuelle Auswahl oben hat Vorrang.",
      czA0: "🔎 Im Raum dieses Rollladens wurden keine Kontaktsensoren gefunden – wähle sie oben, falls du welche hast.",
      klamki: "Fenstergriffe (drehen sich beim Kippen oder Öffnen)",
      kr: "Schrittbewegung",
      krs: "Ein Tipp auf ▲/▼ bewegt den Rollladen um",
      kr0: "aus",
      ak: "🤖 Automatisch kalibrieren",
      akx: "■ Abbrechen",
      akh: "Achtung: Das bewegt den echten Rollladen. Er fährt ganz hoch, ganz runter und wieder hoch. Die Karte misst die Zeit und speichert sie.",
      ak0: "Rollladen fährt nach oben…",
      ak1: "Messe Schließen… {0} s",
      ak2: "Schließen: {0} s. Messe Öffnen… {1} s",
      akok: "Fertig ✔ Laufzeit {0} s gespeichert",
      akstop: "Abgebrochen – Rollladen gestoppt.",
      akrpm: "Die Motoren melden ihre Drehzahl, die Karte berechnet die Zeit also schon ({0} s). Keine Kalibrierung nötig ✔",
      aktm: "Der Rollladen hat das Ende nicht gemeldet. Nutze die manuelle Stoppuhr unten.",
      kd: "⬇ Schließen & messen",
      ku: "⬆ Öffnen & messen",
      kok: "✔ Angekommen",
      kzap: "Diese Zeit speichern",
      kwyn: "Gemessen: {0} s",
      opc: "Optionen",
      jez: "Sprache der Karte",
      jauto: "auto",
      przyciski: "Tasten und Schnellpositionen",
      niebo: "Himmel und Wetter draußen",
      widok: "Gezeichnete Aussicht: Häuser, Bäume, Straße",
      uchwyty: "Griffe an den unteren Leisten (bewegen einen Flügel)",
      uchwyt_srodek: "Mittelgriff ⇕ (bewegt beide Flügel)",
      osobno: "Ziehen auf dem Glas bewegt nur einen Flügel",
      odwroc: "Position umkehren (Motor zählt umgekehrt)",
      s_enc: "Rollläden und Motoren",
      s_pog: "Wetter und Aussicht",
      s_okn: "Fenster – Kontaktsensoren",
      uch: "Kippweite (nach innen)",
      otw: "Öffnungsweite (nach innen)",
      f: {
        entity: "Rollladen oder Rollladengruppe (links + rechts)",
        name: "Name",
        roleta_lewa: "Rollladen linker Flügel (optional)",
        roleta_prawa: "Rollladen rechter Flügel (optional)",
        predkosc_lewa: "Drehzahl linker Motor (Zahl, U/min – optional)",
        predkosc_prawa: "Drehzahl rechter Motor (Zahl, U/min – optional)",
        zrodlo: "Wetterquelle",
        pogoda: "Wetter-Entität (leer = automatisch)",
        tlo: "Foto der Aussicht (z. B. /local/fenster.jpg – Datei im Ordner www)",
        czujnik_lewe: "Kontaktsensor linker Flügel (oder der einzige)",
        tryb_lewe: "Wenn offen, ist der linke Flügel…",
        czujnik_prawe: "Kontaktsensor rechter Flügel",
        tryb_prawe: "Wenn offen, ist der rechte Flügel…"
      },
      zr: [
        [
          "auto",
          "HA-Entität, sonst Internet"
        ],
        [
          "internet",
          "Internet (Open-Meteo, Standort des Zuhauses)"
        ],
        [
          "brak",
          "kein Wetter (einfacher Himmel)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "gekippt (oben nach innen)"
        ],
        [
          "otworz",
          "geöffnet (an Scharnieren, nach innen)"
        ]
      ],
      osl: "Art der Beschattung",
      osln: [
        "Doppelrollo",
        "Stoffrollo",
        "Plissee",
        "Raffrollo",
        "Alu-Jalousie",
        "Aufsatzrollladen",
        "Verdunkelungsrollo",
        "Wabenplissee",
        "Holzjalousie",
        "Vorbaurollladen",
        "Unterputzrollladen",
        "Gelochter Rollladen",
        "Raffstore C80",
        "Raffstore Z90",
        "Screen ZIP"
      ],
      d_osl: "Wähle, was du am Fenster hast. Die Karte passt Stoff, Kasten, Seitenführungen und Endleiste an.",
      promienie: "Sonnenstrahlen durch das Fenster (tagsüber, bei Sonne)",
      dzwiek: "Leises Motorgeräusch beim Fahren (nach einem Tipp)",
      osld: [
        "Blickdichte und transparente Streifen. Verschiebe sie, um Licht durch die transparenten Streifen zu lassen.",
        "Ein einfaches Rollo aus dichtem Stoff. Streut das Licht.",
        "Dichter beschichteter Stoff. Läuft in weißen Seitenschienen und sperrt das Licht aus.",
        "Stoff, der wie eine Ziehharmonika gefaltet ist.",
        "Doppelplissee. Die Wabenkammern halten die Wärme.",
        "Der Stoff legt sich in weiche Falten.",
        "Dünne 25-mm-Alulamellen an Schnüren.",
        "Breite 50-mm-Holzlamellen an Bändern.",
        "Kasten über dem Fenster in Rahmenfarbe, mit dem Fenster montiert. Panzer aus PVC- oder Aluprofilen.",
        "Kasten an der Außenwand mit abgeschrägter Front. Gut für bestehende Häuser.",
        "Kasten in der Wand unter dem Putz. Sichtbar sind nur Panzer und Führungen.",
        "Profile mit kleinen Löchern. Geschlossen kommt noch etwas Licht herein.",
        "Gebogene 80-mm-Alulamellen an Bändern. Sie lassen sich kippen.",
        "Flache 90-mm-Lamellen in Z-Form mit Dichtung. Geschlossen sehr dunkel.",
        "Außenliegendes Gewebe in Seitenführungen mit Reißverschluss. Hält die Sonne ab, die Aussicht bleibt."
      ],
      osw: "Innen",
      osz: "Außen",
      urz: "🔗 Dieses Fenster stammt aus der Motor HA-Integration – jede Änderung wird automatisch im Gerät gespeichert (wie bei „Konfigurieren“)."
    },
    kolory: {
      czarny: "schwarz",
      grafit: "graphit",
      szary: "grau",
      bezowy: "beige",
      kremowy: "creme",
      bialy: "weiß",
      braz: "braun",
      granat: "marineblau",
      pomaranczowy: "orange",
      czerwony: "rot",
      bordo: "bordeaux",
      rozowy: "rosa",
      fiolet: "violett",
      niebieski: "blau",
      turkus: "türkis",
      zielony: "grün",
      limonka: "limette",
      zolty: "gelb",
      oliwka: "oliv",
      piaskowy: "sand",
      cappuccino: "cappuccino",
      mokka: "mokka",
      wenge: "wenge",
      popiel: "aschgrau",
      srebrny: "silber",
      stalowy: "stahlblau",
      lawendowy: "lavendel",
      pudrowy: "puderrosa",
      mietowy: "mint",
      blekitny: "himmelblau",
      morski: "petrol",
      butelkowy: "flaschengrün",
      musztardowy: "senfgelb",
      terakota: "terrakotta",
      sliwkowy: "pflaume"
    },
    kreator: {
      tytul: "Karten-Assistent",
      krok: "Schritt {0} von {1}",
      zamknij: "Assistent schließen",
      co: "Was:",
      poco: "Wozu:",
      wstecz: "← Zurück",
      dalej: "Weiter →",
      gotowe: "Fertig ✔",
      kroki: {
        roleta: {
          t: "Wähle deinen Rollladen",
          co: "der Rollladen oder die Rollladengruppe, die diese Karte zeigt und steuert. Es werden nur Rollläden aufgeführt – keine Tore, Garagentore oder andere Geräte.",
          poco: "die Karte sendet ihm Befehle (öffnen, schließen, % setzen) und zeichnet seine echte Position."
        },
        okno: {
          t: "Fenster und Flügel",
          co: "wie viele Flügel das Fenster hat und welcher Rollladen an welchem Flügel hängt.",
          poco: "jeder Flügel auf der Karte bewegt sich mit seinem echten Rollladen."
        },
        silnik: {
          t: "Motordrehzahl",
          co: "eine Entität mit der Motordrehzahl (U/min), falls dein Motor sie meldet (z. B. Moes, Tuya). Es werden nur Drehzahl-Entitäten aufgeführt.",
          poco: "die Animation läuft genau im Tempo des echten Rollladens. Ohne sie lernt die Karte die Zeit selbst."
        },
        czujniki: {
          t: "Fenstersensoren",
          co: "Kontaktsensoren des Fensters – linker und rechter Flügel getrennt. Es werden nur Fenster-, Tür- und Öffnungssensoren aufgeführt.",
          poco: "wenn du das Fenster kippst oder öffnest, zeigt die Karte es an. Dieser Schritt ist optional."
        },
        pogoda: {
          t: "Wetter draußen",
          co: "woher die Karte das Wetter nimmt.",
          poco: "du siehst den echten Himmel hinter dem Glas: Sonne, Wolken, Regen, Schnee, Nacht und die Temperatur."
        },
        wyglad: {
          t: "Aussehen und Name",
          co: "ein fertiges Set aus Rahmen- und Rollofarben und der Name auf der Karte.",
          poco: "damit die Karte wie dein Fenster aussieht. Jede Farbe kannst du später unter 🎨 Aussehen ändern."
        },
        gdzie: {
          t: "Fertig – prüfen und speichern",
          co: "eine Zusammenfassung dessen, was die Karte gefunden hat, und wo sie erscheinen soll.",
          poco: "damit nichts zu reparieren bleibt. Wenn etwas zu tun ist, steht dort was und wo."
        }
      },
      najlepsze: "beste Übereinstimmung",
      auto: "automatisch gewählt",
      inna: "Andere (nur passende Entitäten)",
      inne: "Passende Entitäten: {0}. Den Rest findest du in der Liste „Andere“ unten.",
      bez: "Kein Sensor",
      niedost: "nicht verfügbar",
      otwarte: "offen",
      zamkniete: "geschlossen",
      why: {
        grupa: "Rollladengruppe",
        poz: "meldet Position %",
        czlonek: "aus der gewählten Gruppe",
        urz: "gleiches Gerät",
        pom: "gleicher Raum",
        nazwa: "Name passt",
        nazwa2: "ähnlicher Name",
        lewa: "„links“ im Namen",
        prawa: "„rechts“ im Namen",
        okno: "Fenstersensor",
        drzwi: "Türsensor",
        rpm: "Einheit U/min",
        typowa: "Haupt-Wetter in HA",
        off: "⚠ nicht verfügbar"
      },
      znaleziono: "Ich habe {0} passende Rollläden gefunden. Die besten stehen oben.",
      brakRolet: "In Home Assistant gibt es noch keinen Rollladen. Füge zuerst deinen Rollladenmotor hinzu: Einstellungen → Geräte & Dienste → „+ Integration hinzufügen“ (z. B. Zigbee2MQTT, ZHA, Tuya, Shelly). Dann komm zurück – der Assistent findet ihn.",
      btnIntegr: "Geräte & Dienste öffnen",
      niedostepna: "„{0}“ ist gerade nicht verfügbar. Prüfe Stromversorgung und Reichweite des Motors (Zigbee / WLAN). Du kannst die Karte jetzt hinzufügen – sie funktioniert, sobald der Rollladen wieder da ist.",
      bezPoz: "„{0}“ meldet keine Position in %. Die Karte zeigt nur „offen / geschlossen“, und Ziehen sendet öffnen oder schließen.",
      grupaOk: "Das ist eine Gruppe aus {0} Rollläden – ich habe ein zweiflügeliges Fenster eingestellt, jeder Flügel mit eigenem Rollladen.",
      wybierz: "Wähle einen Rollladen aus der Liste, um fortzufahren.",
      sk1: "1 Flügel",
      sk2: "2 Flügel",
      skL: "Linker Flügel",
      skP: "Rechter Flügel",
      skJ: "Fenster",
      jednaNaDwa: "Ein Rollladen für zwei Flügel: Beide Hälften auf der Karte bewegen sich zusammen. Hat jeder Flügel seinen eigenen Rollladen, wähle sie unten oder erstelle eine Gruppe: Einstellungen → Geräte & Dienste → Helfer → „+ Helfer erstellen“ → Gruppe → Abdeckungsgruppe.",
      btnPomocnicy: "Helfer öffnen",
      rpmOk: "{0}: Motor {1} U/min → volle Laufzeit ca. {2} s",
      rpmBrak: "{0}: Der Motor meldet keine Drehzahl – kein Problem, die Karte lernt die Laufzeit aus den ersten Fahrten.",
      rpmZadnej: "In HA gibt es keine Entität für die Motordrehzahl. Das ist bei den meisten Motoren normal – die Karte lernt die Laufzeit selbst. Jetzt schon? Miss sie mit der Taste unten.",
      kal: "🤖 Zeit jetzt messen (der Rollladen fährt hoch → runter → hoch)",
      czBrak: "In HA gibt es keine Fenstersensoren (Binärsensor vom Typ Fenster, Tür oder Öffnung). Du kannst diesen Schritt überspringen – die Karte funktioniert ohne sie.",
      czBezPom: "Der Rollladen hat keinen Raum (Bereich), daher kann der Assistent nicht erkennen, welche Sensoren im selben Raum sind. Weise dem Gerät des Rollladens einen Raum zu (Einstellungen → Geräte → Rollladen → ✏️ → Bereich) für bessere Treffer.",
      btnUrz: "Gerät des Rollladens öffnen",
      czAuto: "Sensoren automatisch aus demselben Raum gewählt. Du kannst andere wählen.",
      tryb: "Wenn der Sensor „offen“ meldet, ist der Flügel:",
      zr: [
        [
          "auto",
          "🔎 Automatisch"
        ],
        [
          "internet",
          "🌐 Aus dem Internet"
        ],
        [
          "brak",
          "🚫 Kein Wetter"
        ]
      ],
      wxTeraz: "Draußen gerade: {0}",
      wxBrak: "In HA gibt es keine Wetterintegration – die Karte nimmt das Wetter aus dem Internet (Open-Meteo: kostenlos, ohne Konto oder Schlüssel) für den Standort deines Zuhauses.",
      wxBezLok: "HA kennt den Standort deines Zuhauses nicht, daher funktioniert Internetwetter nicht. Stelle ihn ein: Einstellungen → System → Allgemein → Pin auf der Karte.",
      btnOgolne: "Allgemeine Einstellungen öffnen",
      wxNiedost: "„{0}“ ist nicht verfügbar – prüfe die Wetterintegration. Bis dahin nutzt die Karte Internetwetter.",
      wxNic: "Ohne Wetter zeigt das Glas einen einfachen Tag- / Nachthimmel.",
      nazwa: "Name auf der Karte (leer = Name des Rollladens)",
      wlasny: "🎨 Beliebige Farbe aus einer Palette",
      wlasnyKol: "Beschattung",
      wlasnyRam: "Rahmen",
      wlasnyOpis: "Tippe auf den Regenbogenkreis und wähle eine beliebige Farbe – die Vorschau ändert sich sofort.",
      podglad: "Die Live-Vorschau ist unten – jede Änderung erscheint sofort.",
      jezyk: "Assistent und Karte sprechen {0} – wie dein HA-Profil. Ändern unter ⚙️ Erweitert.",
      jezykNazwa: "Deutsch",
      pods: "Zusammenfassung",
      pRoleta: "Rollladen: {0}",
      pSk: "Flügel: {0}",
      pSil: "Motor: {0}",
      pSilU: "Laufzeit: die Karte lernt sie",
      pCz: "Fenstersensoren: {0}",
      pCzB: "Fenstersensoren: keine (in Ordnung, sie sind optional)",
      pWx: "Wetter: {0}",
      pWxI: "Wetter: aus dem Internet (Open-Meteo)",
      pWxB: "Wetter: aus",
      pWyg: "Aussehen: Rahmen – {0}, Streifen – {1}",
      gdzieT: "Wohin die Karte kommt",
      tutaj: "Die Karte kommt in die Ansicht, die du gerade bearbeitest. Klicke unten in diesem Dialog auf „Speichern“ – fertig.",
      tez: "Auch auf einem anderen Dashboard? Wähle Dashboard und Ansicht – ich füge dort sofort eine Kopie hinzu.",
      panel: "Dashboard",
      widok: "Ansicht",
      nowyWidok: "➕ Neue Ansicht „Rollläden“",
      nowyTytul: "Rollläden",
      dodaj: "Dort eine Kopie hinzufügen",
      dodano: "Hinzugefügt ✔ {0} → {1}",
      blad: "Fehlgeschlagen: {0}",
      bezAdmina: "Zum Hinzufügen von Karten zu anderen Dashboards ist ein HA-Administratorkonto nötig.",
      domyslny: "Übersicht (Standard)",
      tenPanel: " (dieses – einfach „Speichern“)",
      autoPanel: " (automatisch – nicht möglich)",
      yaml: " (YAML – nur manuell)",
      widokPanel: " (Panel – nur 1 Karte)",
      wczytuje: "Dashboards werden geladen…",
      verOk: "Karte korrekt installiert – du hast die neueste Version.",
      verNowa: "Eine neuere Version von Motor HA ist verfügbar. Aktualisiere sie unter Einstellungen → Updates und lade dann die Seite neu.",
      btnHacs: "HACS öffnen",
      btnPrzeladuj: "🔄 Seite neu laden",
      zasobyDup: "Die Karte ist {0}-mal in Ressourcen eingetragen. Behalte einen Eintrag (Einstellungen → Dashboards → ⋮ → Ressourcen), sonst können sich alte und neue Versionen mischen.",
      btnZasoby: "Ressourcen öffnen",
      obr: "U/min"
    }
  };

  // translations/fr.json
  var fr_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Fenêtre réaliste avec store jour-nuit : animation à la vitesse du moteur, glisser pour bouger, vraie météo dehors et un assistant pour débutants",
      open: "Ouvert",
      closed: "Fermé",
      opening: "Ouverture…",
      closing: "Fermeture…",
      unavailable: "Indisponible",
      unknown: "Inconnu",
      czesc: "Partiellement fermé",
      up: "Ouvrir",
      stop: "Stop",
      down: "Fermer",
      brak: "Entité introuvable",
      okno: "fenêtre",
      lewe: "gauche ",
      prawe: "droite ",
      otw: "ouverte",
      uchyl: "en oscillo",
      oba: "Les deux battants",
      wx: {
        sunny: "ensoleillé",
        "clear-night": "dégagé",
        partlycloudy: "partiellement nuageux",
        cloudy: "nuageux",
        exceptional: "exceptionnel",
        fog: "brouillard",
        rainy: "pluie",
        pouring: "averse",
        hail: "grêle",
        lightning: "éclairs",
        "lightning-rainy": "orage",
        snowy: "neige",
        "snowy-rainy": "neige fondue",
        windy: "venteux",
        "windy-variant": "venteux, nuageux"
      }
    },
    edytor: {
      pv: "Aperçu en direct – ne bouge pas le vrai store",
      play: "▶ Voir l’animation",
      wxl: [
        "réel",
        "☀️ soleil",
        "⛅ éclaircies",
        "☁️ nuageux",
        "🌧️ pluie",
        "💧 averse",
        "⛈️ orage",
        "❄️ neige",
        "🌫️ brouillard",
        "💨 vent",
        "🌙 nuit"
      ],
      kol: "Couleur des bandes",
      ram: "Couleur du cadre",
      own: "personnalisée",
      sk: "Battants",
      sk1: "1 battant",
      sk2: "2 battants",
      pin: "Épingler l’aperçu en haut",
      okp: [
        "🪟 fermée",
        "↘ en oscillo",
        "↔ ouverte"
      ],
      d_kol: "Couleur des bandes opaques, comme dans les collections de stores jour-nuit ; « personnalisée » = n’importe quelle couleur.",
      d_sia: "Couleur des bandes voilées. « Comme l’opaque » = teinte plus claire de la couleur des bandes.",
      d_ram: "Couleur du cadre et des battants. Les couleurs veinées sont des placages imitation bois.",
      d_sk: "Nombre de battants. Avec deux, chaque battant peut avoir son propre store.",
      d_okn: "Affiché quand un capteur d’ouverture signale la fenêtre ouverte. Bougez un curseur pour le voir dans l’aperçu.",
      d_kr: "Les boutons ▲ et ▼ bougent le store d’un petit pas. Les positions rapides sont les boutons en pourcentage.",
      sl: "Montant entre les battants",
      sl1: "fixe",
      sl2: "mobile",
      slh: "Un montant fixe reste dans le cadre. Un montant mobile fait partie du battant gauche : avec les deux ouverts, le milieu est libre.",
      roz: "Taille et vitesse",
      wys: "Hauteur de la fenêtre",
      auto: "Durée de course d’après la vitesse du moteur (auto)",
      czas: "Durée de course complète (manuelle)",
      obr: "Vitesse du moteur : {0} tr/min → course complète env. {1} s",
      obr0: "Ce store n’indique pas la vitesse du moteur",
      obrA: " – on suppose 30 s (la carte l’apprendra, ou utilisez la calibration).",
      obrU: " – durée apprise : {0} s.",
      obrM: " (mesuré sur des moteurs Moes)",
      kal: "Calibration de la durée de course",
      kalh: "Chronomètre manuel : cliquez, puis appuyez sur « Arrivé » quand le store atteint la fin. Idéalement de tout ouvert à tout fermé.",
      sia: "Couleur des bandes voilées",
      siaj: "comme l’opaque",
      poz: "Positions rapides (pour cent, séparées par des virgules, 100 = ouvert)",
      sec_wyg: "🎨 Apparence",
      sec_okn: "🪟 Fenêtre",
      sec_ruch: "⏱ Mouvement et calibration",
      sec_zaaw: "⚙️ Avancé",
      rst: "↺ Rétablir les valeurs par défaut",
      wz: "🪄 Assistant",
      pre: [
        "Moderne (anthracite + graphite)",
        "Bois classique (chêne doré + beige)",
        "Scandinave (blanc + crème)",
        "Sombre (noir + bandes noires)",
        "Noyer chaleureux (noyer + sable)",
        "Coloré (blanc + turquoise)"
      ],
      glob: "🌍 Réglages globaux",
      globh: "Enregistrez cette apparence (couleurs, cadre, fenêtre, boutons, options) comme défaut pour toutes les cartes de store, y compris les nouvelles. Chaque carte peut toujours la modifier.",
      gSave: "🌍 Enregistrer comme défaut pour toutes les cartes",
      gClr: "Effacer",
      gIle: "Enregistré globalement : {0} réglages. Toutes les cartes les utilisent.",
      gBrak: "Aucun réglage global – les cartes utilisent les valeurs par défaut.",
      wibracja: "Légère vibration du téléphone au toucher",
      auto_czujniki: "Trouver automatiquement les capteurs d’ouverture de cette pièce",
      czA: "🔎 Détectés automatiquement (gauche / droite) : {0}. Le choix manuel ci-dessus est prioritaire.",
      czA0: "🔎 Aucun capteur d’ouverture trouvé dans la pièce de ce store – choisissez-les ci-dessus si vous en avez.",
      klamki: "Poignées de fenêtre (tournent en oscillo ou à l’ouverture)",
      kr: "Mouvement par pas",
      krs: "Un appui sur ▲/▼ bouge le store de",
      kr0: "désactivé",
      ak: "🤖 Calibrer automatiquement",
      akx: "■ Interrompre",
      akh: "Attention : cela bouge le vrai store. Il monte complètement, descend complètement et remonte. La carte mesure le temps et l’enregistre.",
      ak0: "Le store monte en haut…",
      ak1: "Mesure de la fermeture… {0} s",
      ak2: "Fermeture : {0} s. Mesure de l’ouverture… {1} s",
      akok: "Terminé ✔ Durée {0} s enregistrée",
      akstop: "Interrompu – store arrêté.",
      akrpm: "Les moteurs indiquent leur vitesse, la carte calcule déjà le temps ({0} s). Pas besoin de calibration ✔",
      aktm: "Le store n’a pas signalé la fin de course. Utilisez le chronomètre manuel ci-dessous.",
      kd: "⬇ Fermer et mesurer",
      ku: "⬆ Ouvrir et mesurer",
      kok: "✔ Arrivé",
      kzap: "Enregistrer ce temps",
      kwyn: "Mesuré : {0} s",
      opc: "Options",
      jez: "Langue de la carte",
      jauto: "auto",
      przyciski: "Boutons et positions rapides",
      niebo: "Ciel et météo dehors",
      widok: "Vue dessinée : maisons, arbres, rue",
      uchwyty: "Poignées sur les barres du bas (bougent un battant)",
      uchwyt_srodek: "Poignée centrale ⇕ (bouge les deux battants)",
      osobno: "Glisser sur la vitre bouge un seul battant",
      odwroc: "Inverser la position (moteur compté à l’envers)",
      s_enc: "Stores et moteurs",
      s_pog: "Météo et vue",
      s_okn: "Fenêtre – capteurs d’ouverture",
      uch: "Angle d’oscillo (vers l’intérieur)",
      otw: "Largeur d’ouverture (vers l’intérieur)",
      f: {
        entity: "Store ou groupe de stores (gauche + droite)",
        name: "Nom",
        roleta_lewa: "Store du battant gauche (facultatif)",
        roleta_prawa: "Store du battant droit (facultatif)",
        predkosc_lewa: "Vitesse du moteur gauche (nombre, tr/min – facultatif)",
        predkosc_prawa: "Vitesse du moteur droit (nombre, tr/min – facultatif)",
        zrodlo: "Source météo",
        pogoda: "Entité météo (vide = automatique)",
        tlo: "Photo de la vue (par ex. /local/fenetre.jpg – fichier dans le dossier www)",
        czujnik_lewe: "Capteur du battant gauche (ou le seul)",
        tryb_lewe: "Ouvert, le battant gauche est…",
        czujnik_prawe: "Capteur du battant droit",
        tryb_prawe: "Ouvert, le battant droit est…"
      },
      zr: [
        [
          "auto",
          "entité HA, sinon Internet"
        ],
        [
          "internet",
          "Internet (Open-Meteo, position du domicile)"
        ],
        [
          "brak",
          "pas de météo (ciel simple)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "en oscillo (haut vers l’intérieur)"
        ],
        [
          "otworz",
          "ouvert (sur charnières, vers l’intérieur)"
        ]
      ],
      osl: "Type de store",
      osln: [
        "Jour-nuit",
        "Store enrouleur",
        "Plissé",
        "Store bateau",
        "Vénitien alu",
        "Volet roulant traditionnel",
        "Occultant",
        "Plissé nid d’abeille",
        "Vénitien bois",
        "Volet roulant en applique",
        "Volet roulant encastré",
        "Volet roulant ajouré",
        "Brise-soleil orientable C80",
        "Brise-soleil orientable Z90",
        "Screen ZIP"
      ],
      d_osl: "Choisissez ce que vous avez à la fenêtre. La carte adapte la toile, le coffre, les coulisses et la barre de charge.",
      promienie: "Rayons du soleil à travers la fenêtre (le jour, quand il fait beau)",
      dzwiek: "Bruit de moteur discret pendant le mouvement (après un appui)",
      osld: [
        "Bandes opaques et voilées. Faites-les glisser pour laisser passer la lumière par les bandes voilées.",
        "Un simple enrouleur en toile opaque. Diffuse la lumière.",
        "Toile dense enduite. Coulisse dans des glissières blanches et bloque la lumière.",
        "Toile pliée en accordéon.",
        "Double plissé. Les alvéoles gardent la chaleur.",
        "La toile se replie en plis souples.",
        "Fines lames alu de 25 mm sur cordons.",
        "Larges lames bois de 50 mm sur rubans.",
        "Coffre au-dessus de la fenêtre dans la couleur du cadre, posé avec la fenêtre. Tablier en lames PVC ou alu.",
        "Coffre sur le mur extérieur avec façade biseautée. Idéal pour la rénovation.",
        "Coffre caché dans le mur sous l’enduit. Seuls le tablier et les coulisses sont visibles.",
        "Lames avec petits trous. Un peu de lumière passe quand il est fermé.",
        "Lames alu bombées de 80 mm sur rubans. Elles s’orientent.",
        "Lames plates de 90 mm en Z avec joint. Très sombre une fois fermé.",
        "Toile extérieure dans des coulisses à fermeture éclair. Arrête le soleil, garde la vue."
      ],
      osw: "Intérieur",
      osz: "Extérieur",
      urz: "🔗 Cette fenêtre vient de l’intégration Motor HA – chaque modification est enregistrée automatiquement dans l’appareil (comme avec « Configurer »)."
    },
    kolory: {
      czarny: "noir",
      grafit: "graphite",
      szary: "gris",
      bezowy: "beige",
      kremowy: "crème",
      bialy: "blanc",
      braz: "marron",
      granat: "bleu marine",
      pomaranczowy: "orange",
      czerwony: "rouge",
      bordo: "bordeaux",
      rozowy: "rose",
      fiolet: "violet",
      niebieski: "bleu",
      turkus: "turquoise",
      zielony: "vert",
      limonka: "citron vert",
      zolty: "jaune",
      oliwka: "olive",
      piaskowy: "sable",
      cappuccino: "cappuccino",
      mokka: "moka",
      wenge: "wengé",
      popiel: "cendré",
      srebrny: "argent",
      stalowy: "acier",
      lawendowy: "lavande",
      pudrowy: "rose poudré",
      mietowy: "menthe",
      blekitny: "bleu ciel",
      morski: "bleu canard",
      butelkowy: "vert bouteille",
      musztardowy: "moutarde",
      terakota: "terre cuite",
      sliwkowy: "prune"
    },
    kreator: {
      tytul: "Assistant de la carte",
      krok: "étape {0} sur {1}",
      zamknij: "Fermer l’assistant",
      co: "Quoi :",
      poco: "Pourquoi :",
      wstecz: "← Retour",
      dalej: "Suivant →",
      gotowe: "Terminé ✔",
      kroki: {
        roleta: {
          t: "Choisissez votre volet",
          co: "le volet ou groupe de volets que cette carte affiche et commande. Seuls les volets sont listés – pas de portails, portes de garage ni autres appareils.",
          poco: "la carte lui envoie des ordres (ouvrir, fermer, régler %) et dessine sa vraie position."
        },
        okno: {
          t: "Fenêtre et battants",
          co: "combien de battants a la fenêtre et quel volet est sur quel battant.",
          poco: "chaque battant de la carte bouge avec son vrai volet."
        },
        silnik: {
          t: "Vitesse du moteur",
          co: "une entité avec la vitesse du moteur (tr/min), si votre moteur l’indique (par ex. Moes, Tuya). Seules les entités de vitesse sont listées.",
          poco: "l’animation bouge exactement à la vitesse du vrai volet. Sans elle, la carte apprend le temps toute seule."
        },
        czujniki: {
          t: "Capteurs de fenêtre",
          co: "les capteurs d’ouverture de la fenêtre – battant gauche et droit séparément. Seuls les capteurs de fenêtre, porte et ouverture sont listés.",
          poco: "quand vous ouvrez ou basculez la fenêtre, la carte le montre. Cette étape est facultative."
        },
        pogoda: {
          t: "Météo extérieure",
          co: "d’où la carte prend la météo.",
          poco: "vous voyez le vrai ciel derrière la vitre : soleil, nuages, pluie, neige, nuit et la température."
        },
        wyglad: {
          t: "Apparence et nom",
          co: "un ensemble prêt de couleurs de cadre et de store, et le nom sur la carte.",
          poco: "pour que la carte ressemble à votre fenêtre. Vous pourrez changer chaque couleur plus tard dans 🎨 Apparence."
        },
        gdzie: {
          t: "Terminé – vérifier et enregistrer",
          co: "un résumé de ce que la carte a trouvé et de l’endroit où elle doit apparaître.",
          poco: "pour qu’il ne reste rien à corriger. S’il faut faire quelque chose, elle dit quoi et où."
        }
      },
      najlepsze: "meilleur choix",
      auto: "choisi automatiquement",
      inna: "Autre (entités compatibles uniquement)",
      inne: "Entités compatibles : {0}. Les autres sont dans la liste « Autre » ci-dessous.",
      bez: "Aucun capteur",
      niedost: "indisponible",
      otwarte: "ouverte",
      zamkniete: "fermée",
      why: {
        grupa: "groupe de volets",
        poz: "indique la position %",
        czlonek: "du groupe choisi",
        urz: "même appareil",
        pom: "même pièce",
        nazwa: "le nom correspond",
        nazwa2: "nom similaire",
        lewa: "« gauche » dans le nom",
        prawa: "« droite » dans le nom",
        okno: "capteur de fenêtre",
        drzwi: "capteur de porte",
        rpm: "unité tr/min",
        typowa: "météo principale de HA",
        off: "⚠ indisponible"
      },
      znaleziono: "J’ai trouvé {0} volets compatibles. Les meilleurs sont en haut.",
      brakRolet: "Il n’y a encore aucun volet dans Home Assistant. Ajoutez d’abord le moteur de votre volet : Paramètres → Appareils et services → « + Ajouter une intégration » (par ex. Zigbee2MQTT, ZHA, Tuya, Shelly). Puis revenez – l’assistant le trouvera.",
      btnIntegr: "Ouvrir Appareils et services",
      niedostepna: "« {0} » est indisponible pour le moment. Vérifiez l’alimentation et la portée du moteur (Zigbee / Wi-Fi). Vous pouvez ajouter la carte maintenant – elle fonctionnera dès que le volet sera de retour.",
      bezPoz: "« {0} » n’indique pas de position en %. La carte n’affichera que « ouvert / fermé », et glisser enverra ouvrir ou fermer.",
      grupaOk: "C’est un groupe de {0} volets – j’ai réglé une fenêtre à 2 battants, chacun avec son propre volet.",
      wybierz: "Choisissez un volet dans la liste pour continuer.",
      sk1: "1 battant",
      sk2: "2 battants",
      skL: "Battant gauche",
      skP: "Battant droit",
      skJ: "Fenêtre",
      jednaNaDwa: "Un volet pour deux battants : les deux moitiés de la carte bougent ensemble. Si chaque battant a son propre volet, choisissez-les ci-dessous ou créez un groupe : Paramètres → Appareils et services → Entrées → « + Créer une entrée » → Groupe → Groupe de volets.",
      btnPomocnicy: "Ouvrir les Entrées",
      rpmOk: "{0} : moteur {1} tr/min → course complète env. {2} s",
      rpmBrak: "{0} : le moteur n’indique pas sa vitesse – pas de souci, la carte apprend la durée de course dès les premiers mouvements.",
      rpmZadnej: "Il n’y a pas d’entité de vitesse moteur dans HA. C’est normal pour la plupart des moteurs – la carte apprend la durée toute seule. Vous la voulez tout de suite ? Mesurez-la avec le bouton ci-dessous.",
      kal: "🤖 Mesurer le temps maintenant (le volet monte → descend → monte)",
      czBrak: "Il n’y a pas de capteurs de fenêtre dans HA (capteur binaire de type fenêtre, porte ou ouverture). Vous pouvez passer cette étape – la carte fonctionne sans eux.",
      czBezPom: "Le volet n’a pas de pièce (zone), l’assistant ne peut donc pas savoir quels capteurs sont dans la même pièce. Attribuez une pièce à l’appareil du volet (Paramètres → Appareils → volet → ✏️ → Zone) pour de meilleurs résultats.",
      btnUrz: "Ouvrir l’appareil du volet",
      czAuto: "Capteurs choisis automatiquement dans la même pièce. Vous pouvez en choisir d’autres.",
      tryb: "Quand le capteur indique « ouvert », le battant est :",
      zr: [
        [
          "auto",
          "🔎 Automatique"
        ],
        [
          "internet",
          "🌐 Depuis Internet"
        ],
        [
          "brak",
          "🚫 Pas de météo"
        ]
      ],
      wxTeraz: "Dehors en ce moment : {0}",
      wxBrak: "Il n’y a pas d’intégration météo dans HA – la carte prend la météo sur Internet (Open-Meteo : gratuit, sans compte ni clé) pour la position de votre domicile.",
      wxBezLok: "HA ne connaît pas la position de votre domicile, la météo Internet ne fonctionnera donc pas. Réglez-la : Paramètres → Système → Général → épingle sur la carte.",
      btnOgolne: "Ouvrir les paramètres généraux",
      wxNiedost: "« {0} » est indisponible – vérifiez l’intégration météo. En attendant, la carte utilise la météo Internet.",
      wxNic: "Sans météo, la vitre affiche un simple ciel de jour / de nuit.",
      nazwa: "Nom sur la carte (vide = nom du volet)",
      wlasny: "🎨 N’importe quelle couleur d’une palette",
      wlasnyKol: "Store",
      wlasnyRam: "Cadre",
      wlasnyOpis: "Touchez le cercle arc-en-ciel et choisissez une couleur – l’aperçu change tout de suite.",
      podglad: "L’aperçu en direct est ci-dessous – chaque changement apparaît tout de suite.",
      jezyk: "L’assistant et la carte parlent {0} – comme votre profil HA. Modifiable dans ⚙️ Avancé.",
      jezykNazwa: "français",
      pods: "Résumé",
      pRoleta: "Volet : {0}",
      pSk: "Battants : {0}",
      pSil: "Moteur : {0}",
      pSilU: "Durée de course : la carte l’apprend",
      pCz: "Capteurs de fenêtre : {0}",
      pCzB: "Capteurs de fenêtre : aucun (c’est bon, ils sont facultatifs)",
      pWx: "Météo : {0}",
      pWxI: "Météo : depuis Internet (Open-Meteo)",
      pWxB: "Météo : désactivée",
      pWyg: "Apparence : cadre – {0}, bandes – {1}",
      gdzieT: "Où va la carte",
      tutaj: "La carte va dans la vue que vous modifiez. Cliquez sur « Enregistrer » en bas de cette fenêtre – c’est tout.",
      tez: "Vous la voulez aussi sur un autre tableau de bord ? Choisissez le tableau et la vue – j’y ajoute une copie tout de suite.",
      panel: "Tableau de bord",
      widok: "Vue",
      nowyWidok: "➕ Nouvelle vue « Volets »",
      nowyTytul: "Volets",
      dodaj: "Y ajouter une copie",
      dodano: "Ajouté ✔ {0} → {1}",
      blad: "Échec : {0}",
      bezAdmina: "Ajouter des cartes à d’autres tableaux de bord nécessite un compte administrateur HA.",
      domyslny: "Aperçu (par défaut)",
      tenPanel: " (celui-ci – juste « Enregistrer »)",
      autoPanel: " (automatique – impossible)",
      yaml: " (YAML – manuel uniquement)",
      widokPanel: " (panneau – 1 seule carte)",
      wczytuje: "Chargement des tableaux de bord…",
      verOk: "Carte correctement installée – vous avez la dernière version.",
      verNowa: "Une nouvelle version de Motor HA est disponible. Mettez-la à jour dans Paramètres → Mises à jour, puis rechargez la page.",
      btnHacs: "Ouvrir HACS",
      btnPrzeladuj: "🔄 Recharger la page",
      zasobyDup: "La carte est ajoutée {0} fois dans Ressources. Gardez une seule entrée (Paramètres → Tableaux de bord → ⋮ → Ressources), sinon l’ancienne et la nouvelle version peuvent se mélanger.",
      btnZasoby: "Ouvrir les Ressources",
      obr: "tr/min"
    }
  };

  // translations/es.json
  var es_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Ventana realista con estor día-noche: animación a la velocidad del motor, arrastrar para mover, tiempo real fuera y un asistente para principiantes",
      open: "Abierta",
      closed: "Cerrada",
      opening: "Abriendo…",
      closing: "Cerrando…",
      unavailable: "No disponible",
      unknown: "Desconocido",
      czesc: "Parcialmente cerrada",
      up: "Abrir",
      stop: "Parar",
      down: "Cerrar",
      brak: "Entidad no encontrada",
      okno: "ventana",
      lewe: "izquierda ",
      prawe: "derecha ",
      otw: "abierta",
      uchyl: "abatida",
      oba: "Ambas hojas",
      wx: {
        sunny: "soleado",
        "clear-night": "despejado",
        partlycloudy: "parcialmente nublado",
        cloudy: "nublado",
        exceptional: "excepcional",
        fog: "niebla",
        rainy: "lluvia",
        pouring: "aguacero",
        hail: "granizo",
        lightning: "rayos",
        "lightning-rainy": "tormenta",
        snowy: "nieve",
        "snowy-rainy": "aguanieve",
        windy: "ventoso",
        "windy-variant": "ventoso, nublado"
      }
    },
    edytor: {
      pv: "Vista previa en vivo – no mueve la persiana real",
      play: "▶ Ver animación",
      wxl: [
        "real",
        "☀️ sol",
        "⛅ intervalos",
        "☁️ nublado",
        "🌧️ lluvia",
        "💧 aguacero",
        "⛈️ tormenta",
        "❄️ nieve",
        "🌫️ niebla",
        "💨 viento",
        "🌙 noche"
      ],
      kol: "Color de las franjas",
      ram: "Color del marco",
      own: "propio",
      sk: "Hojas de la ventana",
      sk1: "1 hoja",
      sk2: "2 hojas",
      pin: "Fijar la vista previa arriba",
      okp: [
        "🪟 cerrada",
        "↘ abatida",
        "↔ abierta"
      ],
      d_kol: "Color de las franjas opacas, como en las colecciones de estores día-noche; «propio» = cualquier color.",
      d_sia: "Color de las franjas translúcidas. «Como la opaca» = tono más claro del color de las franjas.",
      d_ram: "Color del marco y las hojas. Los colores con veta son chapas imitación madera.",
      d_sk: "Número de hojas. Con dos, cada hoja puede tener su propio estor.",
      d_okn: "Se muestra cuando un sensor de contacto indica la ventana abierta. Mueve un control para verlo en la vista previa.",
      d_kr: "Los botones ▲ y ▼ mueven la persiana un pequeño paso. Las posiciones rápidas son los botones de porcentaje.",
      sl: "Montante entre hojas",
      sl1: "fijo",
      sl2: "móvil",
      slh: "Un montante fijo se queda en el marco. Uno móvil forma parte de la hoja izquierda: con ambas abiertas, el centro queda libre.",
      roz: "Tamaño y velocidad",
      wys: "Altura de la ventana",
      auto: "Tiempo de recorrido según velocidad del motor (auto)",
      czas: "Tiempo de recorrido completo (manual)",
      obr: "Velocidad del motor: {0} rpm → recorrido completo aprox. {1} s",
      obr0: "Esta persiana no indica la velocidad del motor",
      obrA: " – se suponen 30 s (la tarjeta lo aprenderá, o usa la calibración).",
      obrU: " – tiempo aprendido: {0} s.",
      obrM: " (medido en motores Moes)",
      kal: "Calibración del tiempo de recorrido",
      kalh: "Cronómetro manual: pulsa y luego «Ha llegado» cuando la persiana llegue al final. Mejor de totalmente abierta a totalmente cerrada.",
      sia: "Color de las franjas translúcidas",
      siaj: "como la opaca",
      poz: "Posiciones rápidas (porcentaje, separadas por comas, 100 = abierta)",
      sec_wyg: "🎨 Aspecto",
      sec_okn: "🪟 Ventana",
      sec_ruch: "⏱ Movimiento y calibración",
      sec_zaaw: "⚙️ Avanzado",
      rst: "↺ Restaurar valores por defecto",
      wz: "🪄 Asistente",
      pre: [
        "Moderno (antracita + grafito)",
        "Madera clásica (roble dorado + beige)",
        "Escandinavo (blanco + crema)",
        "Oscuro (negro + franjas negras)",
        "Nogal cálido (nogal + arena)",
        "Colorido (blanco + turquesa)"
      ],
      glob: "🌍 Ajustes globales",
      globh: "Guarda este aspecto (colores, marco, ventana, botones, opciones) como predeterminado para todas las tarjetas de persiana, también las nuevas. Cada tarjeta puede cambiarlo.",
      gSave: "🌍 Guardar como predeterminado para todas",
      gClr: "Borrar",
      gIle: "Guardado globalmente: {0} ajustes. Todas las tarjetas los usan.",
      gBrak: "Sin ajustes globales – las tarjetas usan los valores por defecto.",
      wibracja: "Ligera vibración del móvil al tocar",
      auto_czujniki: "Buscar automáticamente los sensores de la ventana en esta habitación",
      czA: "🔎 Detectados automáticamente (izquierda / derecha): {0}. La elección manual de arriba tiene prioridad.",
      czA0: "🔎 No se encontraron sensores de contacto en la habitación de esta persiana – elígelos arriba si los tienes.",
      klamki: "Manillas de la ventana (giran al abatir o abrir)",
      kr: "Movimiento por pasos",
      krs: "Un toque en ▲/▼ mueve la persiana",
      kr0: "desactivado",
      ak: "🤖 Calibrar automáticamente",
      akx: "■ Cancelar",
      akh: "Atención: esto mueve la persiana real. Sube del todo, baja del todo y vuelve a subir. La tarjeta mide el tiempo y lo guarda.",
      ak0: "Subiendo la persiana…",
      ak1: "Midiendo el cierre… {0} s",
      ak2: "Cierre: {0} s. Midiendo la apertura… {1} s",
      akok: "Listo ✔ Tiempo de recorrido {0} s guardado",
      akstop: "Cancelado – persiana detenida.",
      akrpm: "Los motores indican su velocidad, así que la tarjeta ya calcula el tiempo ({0} s). No hace falta calibrar ✔",
      aktm: "La persiana no indicó el final del recorrido. Usa el cronómetro manual de abajo.",
      kd: "⬇ Cerrar y medir",
      ku: "⬆ Abrir y medir",
      kok: "✔ Ha llegado",
      kzap: "Guardar este tiempo",
      kwyn: "Medido: {0} s",
      opc: "Opciones",
      jez: "Idioma de la tarjeta",
      jauto: "auto",
      przyciski: "Botones y posiciones rápidas",
      niebo: "Cielo y tiempo exterior",
      widok: "Vista dibujada: casas, árboles, calle",
      uchwyty: "Tiradores en los perfiles inferiores (mueven una hoja)",
      uchwyt_srodek: "Tirador central ⇕ (mueve ambas hojas)",
      osobno: "Arrastrar en el cristal mueve solo una hoja",
      odwroc: "Invertir posición (motor cuenta al revés)",
      s_enc: "Persianas y motores",
      s_pog: "Tiempo y vista",
      s_okn: "Ventana – sensores de contacto",
      uch: "Apertura abatible (hacia dentro)",
      otw: "Ancho de apertura (hacia dentro)",
      f: {
        entity: "Persiana o grupo de persianas (izquierda + derecha)",
        name: "Nombre",
        roleta_lewa: "Persiana de la hoja izquierda (opcional)",
        roleta_prawa: "Persiana de la hoja derecha (opcional)",
        predkosc_lewa: "Velocidad del motor izquierdo (número, rpm – opcional)",
        predkosc_prawa: "Velocidad del motor derecho (número, rpm – opcional)",
        zrodlo: "Fuente del tiempo",
        pogoda: "Entidad de tiempo (vacío = automático)",
        tlo: "Foto de la vista (p. ej. /local/ventana.jpg – archivo en la carpeta www)",
        czujnik_lewe: "Sensor de la hoja izquierda (o el único)",
        tryb_lewe: "Abierta, la hoja izquierda está…",
        czujnik_prawe: "Sensor de la hoja derecha",
        tryb_prawe: "Abierta, la hoja derecha está…"
      },
      zr: [
        [
          "auto",
          "entidad de HA, si no hay, Internet"
        ],
        [
          "internet",
          "Internet (Open-Meteo, ubicación de casa)"
        ],
        [
          "brak",
          "sin tiempo (cielo simple)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "abatida (arriba hacia dentro)"
        ],
        [
          "otworz",
          "abierta (sobre bisagras, hacia dentro)"
        ]
      ],
      osl: "Tipo de cortina",
      osln: [
        "Día-noche",
        "Estor enrollable",
        "Plisado",
        "Estor paquete",
        "Veneciana de aluminio",
        "Persiana con cajón superior",
        "Opaco",
        "Plisado nido de abeja",
        "Veneciana de madera",
        "Persiana de cajón exterior",
        "Persiana de cajón empotrado",
        "Persiana microperforada",
        "Veneciana exterior C80",
        "Veneciana exterior Z90",
        "Screen ZIP"
      ],
      d_osl: "Elige lo que tienes en la ventana. La tarjeta ajusta la tela, el cajón, las guías y la barra inferior.",
      promienie: "Rayos de sol a través de la ventana (de día, con sol)",
      dzwiek: "Suave sonido del motor al moverse (tras un toque)",
      osld: [
        "Franjas opacas y translúcidas. Deslízalas para dejar pasar la luz por las translúcidas.",
        "Un estor enrollable sencillo de tela opaca. Difumina la luz.",
        "Tela densa recubierta. Va en guías laterales blancas y bloquea la luz.",
        "Tela plegada como un acordeón.",
        "Doble plisado. Las celdas guardan el calor.",
        "La tela se recoge en pliegues suaves.",
        "Lamas finas de aluminio de 25 mm con cordones.",
        "Lamas anchas de madera de 50 mm con cintas.",
        "Cajón sobre la ventana del color del marco, montado con la ventana. Lamas de PVC o aluminio.",
        "Cajón en la fachada con frente biselado. Ideal para casas existentes.",
        "Cajón oculto en el muro bajo el revoque. Solo se ven las lamas y las guías.",
        "Perfiles con pequeños agujeros. Entra algo de luz cuando está cerrada.",
        "Lamas curvas de aluminio de 80 mm con cintas. Se pueden orientar.",
        "Lamas planas en Z de 90 mm con junta. Muy oscura al cerrar.",
        "Tejido exterior en guías con cremallera. Frena el sol y deja ver."
      ],
      osw: "Interior",
      osz: "Exterior",
      urz: "🔗 Esta ventana viene de la integración Motor HA – cada cambio se guarda automáticamente en el dispositivo (igual que «Configurar»)."
    },
    kolory: {
      czarny: "negro",
      grafit: "grafito",
      szary: "gris",
      bezowy: "beige",
      kremowy: "crema",
      bialy: "blanco",
      braz: "marrón",
      granat: "azul marino",
      pomaranczowy: "naranja",
      czerwony: "rojo",
      bordo: "burdeos",
      rozowy: "rosa",
      fiolet: "violeta",
      niebieski: "azul",
      turkus: "turquesa",
      zielony: "verde",
      limonka: "lima",
      zolty: "amarillo",
      oliwka: "oliva",
      piaskowy: "arena",
      cappuccino: "capuchino",
      mokka: "moca",
      wenge: "wengué",
      popiel: "ceniza",
      srebrny: "plata",
      stalowy: "acero",
      lawendowy: "lavanda",
      pudrowy: "rosa empolvado",
      mietowy: "menta",
      blekitny: "azul cielo",
      morski: "verde azulado",
      butelkowy: "verde botella",
      musztardowy: "mostaza",
      terakota: "terracota",
      sliwkowy: "ciruela"
    },
    kreator: {
      tytul: "Asistente de la tarjeta",
      krok: "paso {0} de {1}",
      zamknij: "Cerrar asistente",
      co: "Qué:",
      poco: "Para qué:",
      wstecz: "← Atrás",
      dalej: "Siguiente →",
      gotowe: "Listo ✔",
      kroki: {
        roleta: {
          t: "Elige tu persiana",
          co: "la persiana o grupo de persianas que esta tarjeta muestra y controla. Solo se listan persianas – sin puertas, garajes ni otros dispositivos.",
          poco: "la tarjeta le envía órdenes (abrir, cerrar, fijar %) y dibuja su posición real."
        },
        okno: {
          t: "Ventana y hojas",
          co: "cuántas hojas tiene la ventana y qué persiana está en cada hoja.",
          poco: "cada hoja de la tarjeta se mueve con su persiana real."
        },
        silnik: {
          t: "Velocidad del motor",
          co: "una entidad con la velocidad del motor (rpm), si tu motor la indica (p. ej. Moes, Tuya). Solo se listan entidades de velocidad.",
          poco: "la animación se mueve exactamente a la velocidad de la persiana real. Sin ella, la tarjeta aprende el tiempo sola."
        },
        czujniki: {
          t: "Sensores de ventana",
          co: "los sensores de contacto de la ventana – hoja izquierda y derecha por separado. Solo se listan sensores de ventana, puerta y apertura.",
          poco: "cuando abates o abres la ventana, la tarjeta lo muestra. Este paso es opcional."
        },
        pogoda: {
          t: "Tiempo exterior",
          co: "de dónde toma la tarjeta el tiempo.",
          poco: "ves el cielo real tras el cristal: sol, nubes, lluvia, nieve, noche y la temperatura."
        },
        wyglad: {
          t: "Aspecto y nombre",
          co: "un conjunto de colores de marco y estor, y el nombre en la tarjeta.",
          poco: "para que la tarjeta se parezca a tu ventana. Puedes cambiar cada color luego en 🎨 Aspecto."
        },
        gdzie: {
          t: "Listo – revisa y guarda",
          co: "un resumen de lo que encontró la tarjeta y dónde debe aparecer.",
          poco: "para que no quede nada por arreglar. Si hay que hacer algo, dice qué y dónde."
        }
      },
      najlepsze: "mejor opción",
      auto: "elegido automáticamente",
      inna: "Otra (solo entidades compatibles)",
      inne: "Entidades compatibles: {0}. El resto está en la lista «Otra» de abajo.",
      bez: "Sin sensor",
      niedost: "no disponible",
      otwarte: "abierta",
      zamkniete: "cerrada",
      why: {
        grupa: "grupo de persianas",
        poz: "indica posición %",
        czlonek: "del grupo elegido",
        urz: "mismo dispositivo",
        pom: "misma habitación",
        nazwa: "el nombre coincide",
        nazwa2: "nombre parecido",
        lewa: "«izquierda» en el nombre",
        prawa: "«derecha» en el nombre",
        okno: "sensor de ventana",
        drzwi: "sensor de puerta",
        rpm: "unidad rpm",
        typowa: "tiempo principal de HA",
        off: "⚠ no disponible"
      },
      znaleziono: "He encontrado {0} persianas compatibles. Las mejores están arriba.",
      brakRolet: "Aún no hay ninguna persiana en Home Assistant. Añade primero el motor de tu persiana: Ajustes → Dispositivos y servicios → «+ Añadir integración» (p. ej. Zigbee2MQTT, ZHA, Tuya, Shelly). Luego vuelve – el asistente la encontrará.",
      btnIntegr: "Abrir Dispositivos y servicios",
      niedostepna: "«{0}» no está disponible ahora. Revisa la alimentación y el alcance del motor (Zigbee / Wi-Fi). Puedes añadir la tarjeta ya – funcionará cuando vuelva la persiana.",
      bezPoz: "«{0}» no indica posición en %. La tarjeta solo mostrará «abierta / cerrada» y arrastrar enviará abrir o cerrar.",
      grupaOk: "Es un grupo de {0} persianas – he configurado una ventana de 2 hojas, cada una con su persiana.",
      wybierz: "Elige una persiana de la lista para continuar.",
      sk1: "1 hoja",
      sk2: "2 hojas",
      skL: "Hoja izquierda",
      skP: "Hoja derecha",
      skJ: "Ventana",
      jednaNaDwa: "Una persiana para dos hojas: ambas mitades de la tarjeta se mueven juntas. Si cada hoja tiene su propia persiana, elígelas abajo o crea un grupo: Ajustes → Dispositivos y servicios → Ayudantes → «+ Crear ayudante» → Grupo → Grupo de cubiertas.",
      btnPomocnicy: "Abrir Ayudantes",
      rpmOk: "{0}: motor {1} rpm → recorrido completo aprox. {2} s",
      rpmBrak: "{0}: el motor no indica la velocidad – no pasa nada, la tarjeta aprende el tiempo con los primeros movimientos.",
      rpmZadnej: "No hay ninguna entidad de velocidad del motor en HA. Es normal en la mayoría de motores – la tarjeta aprende el tiempo sola. ¿Lo quieres ya? Mídelo con el botón de abajo.",
      kal: "🤖 Medir el tiempo ahora (la persiana sube → baja → sube)",
      czBrak: "No hay sensores de ventana en HA (sensor binario de tipo ventana, puerta o apertura). Puedes saltar este paso – la tarjeta funciona sin ellos.",
      czBezPom: "La persiana no tiene habitación (área), así que el asistente no sabe qué sensores están en la misma habitación. Asigna una habitación al dispositivo de la persiana (Ajustes → Dispositivos → persiana → ✏️ → Área) para mejores resultados.",
      btnUrz: "Abrir el dispositivo de la persiana",
      czAuto: "Sensores elegidos automáticamente de la misma habitación. Puedes elegir otros.",
      tryb: "Cuando el sensor indica «abierta», la hoja está:",
      zr: [
        [
          "auto",
          "🔎 Automático"
        ],
        [
          "internet",
          "🌐 De Internet"
        ],
        [
          "brak",
          "🚫 Sin tiempo"
        ]
      ],
      wxTeraz: "Fuera ahora mismo: {0}",
      wxBrak: "No hay integración del tiempo en HA – la tarjeta toma el tiempo de Internet (Open-Meteo: gratis, sin cuenta ni clave) para la ubicación de tu casa.",
      wxBezLok: "HA no conoce la ubicación de tu casa, así que el tiempo de Internet no funcionará. Configúrala: Ajustes → Sistema → General → chincheta en el mapa.",
      btnOgolne: "Abrir ajustes generales",
      wxNiedost: "«{0}» no está disponible – revisa la integración del tiempo. Mientras tanto, la tarjeta usa el tiempo de Internet.",
      wxNic: "Sin tiempo, el cristal muestra un cielo simple de día / noche.",
      nazwa: "Nombre en la tarjeta (vacío = nombre de la persiana)",
      wlasny: "🎨 Cualquier color de una paleta",
      wlasnyKol: "Cortina",
      wlasnyRam: "Marco",
      wlasnyOpis: "Toca el círculo arcoíris y elige cualquier color – la vista previa cambia al instante.",
      podglad: "La vista previa en vivo está abajo – cada cambio aparece al instante.",
      jezyk: "El asistente y la tarjeta hablan {0} – como tu perfil de HA. Cámbialo en ⚙️ Avanzado.",
      jezykNazwa: "español",
      pods: "Resumen",
      pRoleta: "Persiana: {0}",
      pSk: "Hojas: {0}",
      pSil: "Motor: {0}",
      pSilU: "Tiempo de recorrido: la tarjeta lo aprende",
      pCz: "Sensores de ventana: {0}",
      pCzB: "Sensores de ventana: ninguno (bien, son opcionales)",
      pWx: "Tiempo: {0}",
      pWxI: "Tiempo: de Internet (Open-Meteo)",
      pWxB: "Tiempo: desactivado",
      pWyg: "Aspecto: marco – {0}, franjas – {1}",
      gdzieT: "Dónde va la tarjeta",
      tutaj: "La tarjeta va a la vista que estás editando. Pulsa «Guardar» abajo en este diálogo – listo.",
      tez: "¿También en otro panel? Elige panel y vista – añado una copia allí al momento.",
      panel: "Panel",
      widok: "Vista",
      nowyWidok: "➕ Nueva vista «Persianas»",
      nowyTytul: "Persianas",
      dodaj: "Añadir una copia allí",
      dodano: "Añadido ✔ {0} → {1}",
      blad: "Error: {0}",
      bezAdmina: "Para añadir tarjetas a otros paneles hace falta una cuenta de administrador de HA.",
      domyslny: "Resumen (predeterminado)",
      tenPanel: " (este – solo «Guardar»)",
      autoPanel: " (automático – no es posible)",
      yaml: " (YAML – solo manual)",
      widokPanel: " (panel – solo 1 tarjeta)",
      wczytuje: "Cargando paneles…",
      verOk: "Tarjeta instalada correctamente – tienes la última versión.",
      verNowa: "Hay una versión nueva de Motor HA. Actualízala en Ajustes → Actualizaciones y recarga la página.",
      btnHacs: "Abrir HACS",
      btnPrzeladuj: "🔄 Recargar página",
      zasobyDup: "La tarjeta está añadida {0} veces en Recursos. Deja una sola entrada (Ajustes → Paneles → ⋮ → Recursos), si no, pueden mezclarse versiones antiguas y nuevas.",
      btnZasoby: "Abrir Recursos",
      obr: "rpm"
    }
  };

  // translations/it.json
  var it_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Finestra realistica con tenda giorno-notte: animazione alla velocità del motore, trascina per muovere, meteo reale fuori e una procedura guidata per principianti",
      open: "Aperta",
      closed: "Chiusa",
      opening: "In apertura…",
      closing: "In chiusura…",
      unavailable: "Non disponibile",
      unknown: "Sconosciuto",
      czesc: "Parzialmente chiusa",
      up: "Apri",
      stop: "Stop",
      down: "Chiudi",
      brak: "Entità non trovata",
      okno: "finestra",
      lewe: "sinistra ",
      prawe: "destra ",
      otw: "aperta",
      uchyl: "a ribalta",
      oba: "Entrambe le ante",
      wx: {
        sunny: "soleggiato",
        "clear-night": "sereno",
        partlycloudy: "parzialmente nuvoloso",
        cloudy: "nuvoloso",
        exceptional: "eccezionale",
        fog: "nebbia",
        rainy: "pioggia",
        pouring: "acquazzone",
        hail: "grandine",
        lightning: "fulmini",
        "lightning-rainy": "temporale",
        snowy: "neve",
        "snowy-rainy": "nevischio",
        windy: "ventoso",
        "windy-variant": "ventoso, nuvoloso"
      }
    },
    edytor: {
      pv: "Anteprima dal vivo – non muove la tapparella vera",
      play: "▶ Mostra animazione",
      wxl: [
        "reale",
        "☀️ sole",
        "⛅ variabile",
        "☁️ nuvoloso",
        "🌧️ pioggia",
        "💧 acquazzone",
        "⛈️ temporale",
        "❄️ neve",
        "🌫️ nebbia",
        "💨 vento",
        "🌙 notte"
      ],
      kol: "Colore delle strisce",
      ram: "Colore del telaio",
      own: "personalizzato",
      sk: "Ante della finestra",
      sk1: "1 anta",
      sk2: "2 ante",
      pin: "Fissa l’anteprima in alto",
      okp: [
        "🪟 chiusa",
        "↘ a ribalta",
        "↔ aperta"
      ],
      d_kol: "Colore delle strisce oscuranti, come nelle collezioni di tende giorno-notte; «personalizzato» = qualsiasi colore.",
      d_sia: "Colore delle strisce trasparenti. «Come l’oscurante» = tonalità più chiara del colore delle strisce.",
      d_ram: "Colore di telaio e ante. I colori venati sono finiture effetto legno.",
      d_sk: "Numero di ante. Con due, ogni anta può avere la propria tenda.",
      d_okn: "Mostrato quando un sensore di contatto segnala la finestra aperta. Sposta un cursore per vederlo nell’anteprima.",
      d_kr: "I pulsanti ▲ e ▼ muovono la tapparella di un piccolo passo. Le posizioni rapide sono i pulsanti in percentuale.",
      sl: "Montante tra le ante",
      sl1: "fisso",
      sl2: "mobile",
      slh: "Un montante fisso resta nel telaio. Uno mobile fa parte dell’anta sinistra: con entrambe aperte il centro è libero.",
      roz: "Dimensioni e velocità",
      wys: "Altezza della finestra",
      auto: "Tempo di corsa dalla velocità del motore (auto)",
      czas: "Tempo di corsa completo (manuale)",
      obr: "Velocità motore: {0} giri/min → corsa completa circa {1} s",
      obr0: "Questa tapparella non indica la velocità del motore",
      obrA: " – si assumono 30 s (la scheda lo imparerà, o usa la calibrazione).",
      obrU: " – tempo di corsa appreso: {0} s.",
      obrM: " (misurato su motori Moes)",
      kal: "Calibrazione del tempo di corsa",
      kalh: "Cronometro manuale: clicca, poi premi «Arrivata» quando la tapparella raggiunge la fine. Meglio da tutta aperta a tutta chiusa.",
      sia: "Colore delle strisce trasparenti",
      siaj: "come l’oscurante",
      poz: "Posizioni rapide (percentuale, separate da virgole, 100 = aperta)",
      sec_wyg: "🎨 Aspetto",
      sec_okn: "🪟 Finestra",
      sec_ruch: "⏱ Movimento e calibrazione",
      sec_zaaw: "⚙️ Avanzate",
      rst: "↺ Ripristina predefiniti",
      wz: "🪄 Procedura guidata",
      pre: [
        "Moderno (antracite + grafite)",
        "Legno classico (rovere dorato + beige)",
        "Scandinavo (bianco + crema)",
        "Scuro (nero + strisce nere)",
        "Noce caldo (noce + sabbia)",
        "Colorato (bianco + turchese)"
      ],
      glob: "🌍 Impostazioni globali",
      globh: "Salva questo aspetto (colori, telaio, finestra, pulsanti, opzioni) come predefinito per tutte le schede tapparella, anche nuove. Ogni scheda può comunque cambiarlo.",
      gSave: "🌍 Salva come predefinito per tutte",
      gClr: "Cancella",
      gIle: "Salvate globalmente: {0} impostazioni. Tutte le schede le usano.",
      gBrak: "Nessuna impostazione globale – le schede usano i valori predefiniti.",
      wibracja: "Leggera vibrazione del telefono al tocco",
      auto_czujniki: "Trova automaticamente i sensori della finestra in questa stanza",
      czA: "🔎 Rilevati automaticamente (sinistra / destra): {0}. La scelta manuale qui sopra ha la precedenza.",
      czA0: "🔎 Nessun sensore di contatto trovato nella stanza di questa tapparella – sceglili sopra se ne hai.",
      klamki: "Maniglie della finestra (girano a ribalta o in apertura)",
      kr: "Movimento a passi",
      krs: "Un tocco su ▲/▼ muove la tapparella di",
      kr0: "spento",
      ak: "🤖 Calibra automaticamente",
      akx: "■ Interrompi",
      akh: "Attenzione: muove la tapparella vera. Sale del tutto, scende del tutto e risale. La scheda misura il tempo e lo salva.",
      ak0: "La tapparella sale in alto…",
      ak1: "Misuro la chiusura… {0} s",
      ak2: "Chiusura: {0} s. Misuro l’apertura… {1} s",
      akok: "Fatto ✔ Tempo di corsa {0} s salvato",
      akstop: "Interrotto – tapparella ferma.",
      akrpm: "I motori indicano la loro velocità, quindi la scheda calcola già il tempo ({0} s). Nessuna calibrazione necessaria ✔",
      aktm: "La tapparella non ha segnalato la fine corsa. Usa il cronometro manuale qui sotto.",
      kd: "⬇ Chiudi e misura",
      ku: "⬆ Apri e misura",
      kok: "✔ Arrivata",
      kzap: "Salva questo tempo",
      kwyn: "Misurato: {0} s",
      opc: "Opzioni",
      jez: "Lingua della scheda",
      jauto: "auto",
      przyciski: "Pulsanti e posizioni rapide",
      niebo: "Cielo e meteo fuori",
      widok: "Vista disegnata: case, alberi, strada",
      uchwyty: "Maniglie sui profili inferiori (muovono un’anta)",
      uchwyt_srodek: "Maniglia centrale ⇕ (muove entrambe le ante)",
      osobno: "Trascinare sul vetro muove una sola anta",
      odwroc: "Inverti posizione (motore conta al contrario)",
      s_enc: "Tapparelle e motori",
      s_pog: "Meteo e vista",
      s_okn: "Finestra – sensori di contatto",
      uch: "Apertura a ribalta (verso l’interno)",
      otw: "Larghezza di apertura (verso l’interno)",
      f: {
        entity: "Tapparella o gruppo di tapparelle (sinistra + destra)",
        name: "Nome",
        roleta_lewa: "Tapparella anta sinistra (facoltativa)",
        roleta_prawa: "Tapparella anta destra (facoltativa)",
        predkosc_lewa: "Velocità motore sinistro (numero, giri/min – facoltativo)",
        predkosc_prawa: "Velocità motore destro (numero, giri/min – facoltativo)",
        zrodlo: "Fonte meteo",
        pogoda: "Entità meteo (vuoto = automatico)",
        tlo: "Foto della vista (es. /local/finestra.jpg – file nella cartella www)",
        czujnik_lewe: "Sensore anta sinistra (o l’unico)",
        tryb_lewe: "Da aperta, l’anta sinistra è…",
        czujnik_prawe: "Sensore anta destra",
        tryb_prawe: "Da aperta, l’anta destra è…"
      },
      zr: [
        [
          "auto",
          "entità HA, altrimenti Internet"
        ],
        [
          "internet",
          "Internet (Open-Meteo, posizione di casa)"
        ],
        [
          "brak",
          "nessun meteo (cielo semplice)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "a ribalta (in alto verso l’interno)"
        ],
        [
          "otworz",
          "aperta (a battente, verso l’interno)"
        ]
      ],
      osl: "Tipo di schermatura",
      osln: [
        "Giorno-notte",
        "Tenda a rullo",
        "Plissettata",
        "Tenda a pacchetto",
        "Veneziana in alluminio",
        "Tapparella con cassonetto superiore",
        "Oscurante",
        "Plissé a nido d’ape",
        "Veneziana in legno",
        "Tapparella con cassonetto esterno",
        "Tapparella con cassonetto a scomparsa",
        "Tapparella forata",
        "Frangisole C80",
        "Frangisole Z90",
        "Screen ZIP"
      ],
      d_osl: "Scegli cosa hai alla finestra. La scheda adatta tessuto, cassonetto, guide laterali e barra finale.",
      promienie: "Raggi di sole attraverso la finestra (di giorno, con il sole)",
      dzwiek: "Leggero rumore del motore in movimento (dopo un tocco)",
      osld: [
        "Strisce oscuranti e trasparenti. Falle scorrere per far passare la luce da quelle trasparenti.",
        "Un semplice rullo in tessuto pieno. Diffonde la luce.",
        "Tessuto denso spalmato. Scorre in guide laterali bianche e blocca la luce.",
        "Tessuto piegato a fisarmonica.",
        "Doppio plissé. Le celle trattengono il calore.",
        "Il tessuto si raccoglie in morbide pieghe.",
        "Sottili lamelle in alluminio da 25 mm con cordini.",
        "Larghe lamelle in legno da 50 mm con nastri.",
        "Cassonetto sopra la finestra nel colore del telaio, montato con la finestra. Avvolgibile in PVC o alluminio.",
        "Cassonetto sulla facciata con frontale smussato. Ideale per case esistenti.",
        "Cassonetto nascosto nel muro sotto l’intonaco. Si vedono solo avvolgibile e guide.",
        "Profili con piccoli fori. Da chiusa entra un po’ di luce.",
        "Lamelle curve in alluminio da 80 mm su nastri. Si possono orientare.",
        "Lamelle piatte a Z da 90 mm con guarnizione. Molto buio da chiuso.",
        "Tessuto esterno in guide con zip. Ferma il sole, lascia la vista."
      ],
      osw: "Interno",
      osz: "Esterno",
      urz: "🔗 Questa finestra viene dall’integrazione Motor HA – ogni modifica è salvata automaticamente nel dispositivo (come con «Configura»)."
    },
    kolory: {
      czarny: "nero",
      grafit: "grafite",
      szary: "grigio",
      bezowy: "beige",
      kremowy: "crema",
      bialy: "bianco",
      braz: "marrone",
      granat: "blu navy",
      pomaranczowy: "arancione",
      czerwony: "rosso",
      bordo: "bordeaux",
      rozowy: "rosa",
      fiolet: "viola",
      niebieski: "blu",
      turkus: "turchese",
      zielony: "verde",
      limonka: "lime",
      zolty: "giallo",
      oliwka: "oliva",
      piaskowy: "sabbia",
      cappuccino: "cappuccino",
      mokka: "moka",
      wenge: "wengé",
      popiel: "cenere",
      srebrny: "argento",
      stalowy: "acciaio",
      lawendowy: "lavanda",
      pudrowy: "rosa cipria",
      mietowy: "menta",
      blekitny: "azzurro",
      morski: "verde petrolio",
      butelkowy: "verde bottiglia",
      musztardowy: "senape",
      terakota: "terracotta",
      sliwkowy: "prugna"
    },
    kreator: {
      tytul: "Procedura guidata della scheda",
      krok: "passo {0} di {1}",
      zamknij: "Chiudi procedura",
      co: "Cosa:",
      poco: "Perché:",
      wstecz: "← Indietro",
      dalej: "Avanti →",
      gotowe: "Fatto ✔",
      kroki: {
        roleta: {
          t: "Scegli la tua tapparella",
          co: "la tapparella o il gruppo che questa scheda mostra e comanda. Sono elencate solo tapparelle – niente cancelli, garage o altri dispositivi.",
          poco: "la scheda le invia comandi (apri, chiudi, imposta %) e disegna la sua posizione reale."
        },
        okno: {
          t: "Finestra e ante",
          co: "quante ante ha la finestra e quale tapparella è su quale anta.",
          poco: "ogni anta nella scheda si muove insieme alla sua tapparella reale."
        },
        silnik: {
          t: "Velocità del motore",
          co: "un’entità con la velocità del motore (giri/min), se il tuo motore la indica (es. Moes, Tuya). Sono elencate solo entità di velocità.",
          poco: "l’animazione si muove esattamente alla velocità della tapparella reale. Senza, la scheda impara il tempo da sola."
        },
        czujniki: {
          t: "Sensori della finestra",
          co: "i sensori di contatto della finestra – anta sinistra e destra separate. Sono elencati solo sensori di finestra, porta e apertura.",
          poco: "quando apri o metti a ribalta la finestra, la scheda lo mostra. Questo passo è facoltativo."
        },
        pogoda: {
          t: "Meteo esterno",
          co: "da dove la scheda prende il meteo.",
          poco: "vedi il cielo reale dietro il vetro: sole, nuvole, pioggia, neve, notte e la temperatura."
        },
        wyglad: {
          t: "Aspetto e nome",
          co: "un set pronto di colori di telaio e tenda e il nome sulla scheda.",
          poco: "perché la scheda somigli alla tua finestra. Ogni colore si può cambiare dopo in 🎨 Aspetto."
        },
        gdzie: {
          t: "Fatto – controlla e salva",
          co: "un riepilogo di cosa ha trovato la scheda e dove deve apparire.",
          poco: "così non resta nulla da sistemare. Se c’è da fare qualcosa, dice cosa e dove."
        }
      },
      najlepsze: "migliore",
      auto: "scelto automaticamente",
      inna: "Altro (solo entità compatibili)",
      inne: "Entità compatibili: {0}. Le altre sono nell’elenco «Altro» qui sotto.",
      bez: "Nessun sensore",
      niedost: "non disponibile",
      otwarte: "aperta",
      zamkniete: "chiusa",
      why: {
        grupa: "gruppo di tapparelle",
        poz: "indica posizione %",
        czlonek: "dal gruppo scelto",
        urz: "stesso dispositivo",
        pom: "stessa stanza",
        nazwa: "il nome corrisponde",
        nazwa2: "nome simile",
        lewa: "«sinistra» nel nome",
        prawa: "«destra» nel nome",
        okno: "sensore finestra",
        drzwi: "sensore porta",
        rpm: "unità giri/min",
        typowa: "meteo principale di HA",
        off: "⚠ non disponibile"
      },
      znaleziono: "Ho trovato {0} tapparelle compatibili. Le migliori sono in alto.",
      brakRolet: "In Home Assistant non c’è ancora nessuna tapparella. Aggiungi prima il motore: Impostazioni → Dispositivi e servizi → «+ Aggiungi integrazione» (es. Zigbee2MQTT, ZHA, Tuya, Shelly). Poi torna qui – la procedura la troverà.",
      btnIntegr: "Apri Dispositivi e servizi",
      niedostepna: "«{0}» non è disponibile al momento. Controlla alimentazione e portata del motore (Zigbee / Wi-Fi). Puoi aggiungere la scheda ora – funzionerà quando la tapparella tornerà.",
      bezPoz: "«{0}» non indica la posizione in %. La scheda mostrerà solo «aperta / chiusa» e il trascinamento invierà apri o chiudi.",
      grupaOk: "È un gruppo di {0} tapparelle – ho impostato una finestra a 2 ante, ognuna con la sua tapparella.",
      wybierz: "Scegli una tapparella dall’elenco per continuare.",
      sk1: "1 anta",
      sk2: "2 ante",
      skL: "Anta sinistra",
      skP: "Anta destra",
      skJ: "Finestra",
      jednaNaDwa: "Una tapparella per due ante: entrambe le metà della scheda si muovono insieme. Se ogni anta ha la sua tapparella, sceglile qui sotto o crea un gruppo: Impostazioni → Dispositivi e servizi → Aiutanti → «+ Crea aiutante» → Gruppo → Gruppo di coperture.",
      btnPomocnicy: "Apri Aiutanti",
      rpmOk: "{0}: motore {1} giri/min → corsa completa circa {2} s",
      rpmBrak: "{0}: il motore non indica la velocità – nessun problema, la scheda impara il tempo dai primi movimenti.",
      rpmZadnej: "In HA non c’è nessuna entità di velocità motore. È normale per la maggior parte dei motori – la scheda impara il tempo da sola. Lo vuoi subito? Misuralo con il pulsante qui sotto.",
      kal: "🤖 Misura il tempo ora (la tapparella sale → scende → sale)",
      czBrak: "In HA non ci sono sensori finestra (sensore binario di tipo finestra, porta o apertura). Puoi saltare questo passo – la scheda funziona anche senza.",
      czBezPom: "La tapparella non ha una stanza (area), quindi la procedura non sa quali sensori sono nella stessa stanza. Assegna una stanza al dispositivo della tapparella (Impostazioni → Dispositivi → tapparella → ✏️ → Area) per risultati migliori.",
      btnUrz: "Apri il dispositivo della tapparella",
      czAuto: "Sensori scelti automaticamente dalla stessa stanza. Puoi sceglierne altri.",
      tryb: "Quando il sensore segnala «aperta», l’anta è:",
      zr: [
        [
          "auto",
          "🔎 Automatico"
        ],
        [
          "internet",
          "🌐 Da Internet"
        ],
        [
          "brak",
          "🚫 Nessun meteo"
        ]
      ],
      wxTeraz: "Fuori adesso: {0}",
      wxBrak: "In HA non c’è un’integrazione meteo – la scheda prende il meteo da Internet (Open-Meteo: gratis, senza account né chiave) per la posizione di casa tua.",
      wxBezLok: "HA non conosce la posizione di casa tua, quindi il meteo da Internet non funziona. Impostala: Impostazioni → Sistema → Generale → puntina sulla mappa.",
      btnOgolne: "Apri impostazioni generali",
      wxNiedost: "«{0}» non è disponibile – controlla l’integrazione meteo. Nel frattempo la scheda usa il meteo da Internet.",
      wxNic: "Senza meteo il vetro mostra un semplice cielo di giorno / notte.",
      nazwa: "Nome sulla scheda (vuoto = nome della tapparella)",
      wlasny: "🎨 Qualsiasi colore da una tavolozza",
      wlasnyKol: "Schermatura",
      wlasnyRam: "Telaio",
      wlasnyOpis: "Tocca il cerchio arcobaleno e scegli un colore – l’anteprima cambia subito.",
      podglad: "L’anteprima dal vivo è qui sotto – ogni modifica appare subito.",
      jezyk: "La procedura e la scheda parlano {0} – come il tuo profilo HA. Cambialo in ⚙️ Avanzate.",
      jezykNazwa: "italiano",
      pods: "Riepilogo",
      pRoleta: "Tapparella: {0}",
      pSk: "Ante: {0}",
      pSil: "Motore: {0}",
      pSilU: "Tempo di corsa: la scheda lo impara",
      pCz: "Sensori finestra: {0}",
      pCzB: "Sensori finestra: nessuno (va bene, sono facoltativi)",
      pWx: "Meteo: {0}",
      pWxI: "Meteo: da Internet (Open-Meteo)",
      pWxB: "Meteo: spento",
      pWyg: "Aspetto: telaio – {0}, strisce – {1}",
      gdzieT: "Dove va la scheda",
      tutaj: "La scheda va nella vista che stai modificando. Clicca «Salva» in fondo a questa finestra – fatto.",
      tez: "La vuoi anche su un’altra plancia? Scegli plancia e vista – aggiungo subito una copia lì.",
      panel: "Plancia",
      widok: "Vista",
      nowyWidok: "➕ Nuova vista «Tapparelle»",
      nowyTytul: "Tapparelle",
      dodaj: "Aggiungi una copia lì",
      dodano: "Aggiunta ✔ {0} → {1}",
      blad: "Non riuscito: {0}",
      bezAdmina: "Per aggiungere schede ad altre plance serve un account amministratore di HA.",
      domyslny: "Panoramica (predefinita)",
      tenPanel: " (questa – basta «Salva»)",
      autoPanel: " (automatica – non possibile)",
      yaml: " (YAML – solo manuale)",
      widokPanel: " (pannello – solo 1 scheda)",
      wczytuje: "Caricamento plance…",
      verOk: "Scheda installata correttamente – hai l’ultima versione.",
      verNowa: "È disponibile una nuova versione di Motor HA. Aggiornala in Impostazioni → Aggiornamenti, poi ricarica la pagina.",
      btnHacs: "Apri HACS",
      btnPrzeladuj: "🔄 Ricarica pagina",
      zasobyDup: "La scheda è aggiunta {0} volte in Risorse. Tieni una sola voce (Impostazioni → Plance → ⋮ → Risorse), altrimenti versioni vecchie e nuove possono mescolarsi.",
      btnZasoby: "Apri Risorse",
      obr: "giri/min"
    }
  };

  // translations/nl.json
  var nl_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Realistisch raam met duo-rolgordijn: animatie op motorsnelheid, slepen om te bewegen, echt weer buiten en een wizard voor beginners",
      open: "Open",
      closed: "Gesloten",
      opening: "Opent…",
      closing: "Sluit…",
      unavailable: "Niet beschikbaar",
      unknown: "Onbekend",
      czesc: "Deels gesloten",
      up: "Openen",
      stop: "Stop",
      down: "Sluiten",
      brak: "Entiteit niet gevonden",
      okno: "raam",
      lewe: "linker ",
      prawe: "rechter ",
      otw: "open",
      uchyl: "gekanteld",
      oba: "Beide vleugels",
      wx: {
        sunny: "zonnig",
        "clear-night": "helder",
        partlycloudy: "half bewolkt",
        cloudy: "bewolkt",
        exceptional: "uitzonderlijk",
        fog: "mist",
        rainy: "regen",
        pouring: "stortregen",
        hail: "hagel",
        lightning: "bliksem",
        "lightning-rainy": "onweer",
        snowy: "sneeuw",
        "snowy-rainy": "natte sneeuw",
        windy: "winderig",
        "windy-variant": "winderig, bewolkt"
      }
    },
    edytor: {
      pv: "Live voorbeeld – beweegt het echte rolluik niet",
      play: "▶ Animatie tonen",
      wxl: [
        "echt",
        "☀️ zon",
        "⛅ half",
        "☁️ bewolkt",
        "🌧️ regen",
        "💧 stortregen",
        "⛈️ onweer",
        "❄️ sneeuw",
        "🌫️ mist",
        "💨 wind",
        "🌙 nacht"
      ],
      kol: "Streepkleur",
      ram: "Kleur kozijn",
      own: "eigen",
      sk: "Raamvleugels",
      sk1: "1 vleugel",
      sk2: "2 vleugels",
      pin: "Voorbeeld bovenaan vastzetten",
      okp: [
        "🪟 dicht",
        "↘ gekanteld",
        "↔ open"
      ],
      d_kol: "Kleur van de dichte (verduisterende) strepen, zoals in duo-rolgordijncollecties; ‘eigen’ = elke kleur.",
      d_sia: "Kleur van de transparante strepen. ‘Als dicht’ = lichtere tint van de streepkleur.",
      d_ram: "Kleur van kozijn en vleugels. Kleuren met nerf zijn houtlook-folies.",
      d_sk: "Aantal raamvleugels. Bij twee kan elke vleugel een eigen gordijn hebben.",
      d_okn: "Getoond als een contactsensor het raam open meldt. Verschuif een schuifregelaar om het in het voorbeeld te zien.",
      d_kr: "De knoppen ▲ en ▼ bewegen het rolluik een klein stapje. Snelle posities zijn de procentknoppen.",
      sl: "Middenstijl tussen de vleugels",
      sl1: "vast",
      sl2: "beweegbaar",
      slh: "Een vaste stijl blijft in het kozijn. Een beweegbare hoort bij de linkervleugel – met beide open is het midden vrij.",
      roz: "Grootte en snelheid",
      wys: "Raamhoogte",
      auto: "Looptijd uit motorsnelheid (auto)",
      czas: "Volledige looptijd (handmatig)",
      obr: "Motorsnelheid: {0} tpm → volledige looptijd ca. {1} s",
      obr0: "Dit rolluik meldt geen motorsnelheid",
      obrA: " – uitgaande van 30 s (de kaart leert het, of gebruik kalibratie).",
      obrU: " – geleerde looptijd: {0} s.",
      obrM: " (gemeten op Moes-motoren)",
      kal: "Kalibratie looptijd",
      kalh: "Handmatige stopwatch: klik en druk op ‘Aangekomen’ als het rolluik het eind bereikt. Bij voorkeur van helemaal open naar helemaal dicht.",
      sia: "Kleur transparante strepen",
      siaj: "als dicht",
      poz: "Snelle posities (procent, gescheiden door komma’s, 100 = open)",
      sec_wyg: "🎨 Uiterlijk",
      sec_okn: "🪟 Raam",
      sec_ruch: "⏱ Beweging en kalibratie",
      sec_zaaw: "⚙️ Geavanceerd",
      rst: "↺ Standaard herstellen",
      wz: "🪄 Wizard",
      pre: [
        "Modern (antraciet + grafiet)",
        "Klassiek hout (goudeiken + beige)",
        "Scandinavisch (wit + crème)",
        "Donker (zwart + zwarte strepen)",
        "Warm noten (noten + zand)",
        "Kleurrijk (wit + turquoise)"
      ],
      glob: "🌍 Globale instellingen",
      globh: "Sla dit uiterlijk (kleuren, kozijn, raam, knoppen, opties) op als standaard voor alle rolluikkaarten, ook nieuwe. Elke kaart kan het nog wijzigen.",
      gSave: "🌍 Opslaan als standaard voor alle kaarten",
      gClr: "Wissen",
      gIle: "Globaal opgeslagen: {0} instellingen. Alle kaarten gebruiken ze.",
      gBrak: "Geen globale instellingen – kaarten gebruiken de standaardwaarden.",
      wibracja: "Lichte trilling van de telefoon bij tikken",
      auto_czujniki: "Raamcontactsensoren in deze kamer automatisch vinden",
      czA: "🔎 Automatisch gevonden (links / rechts): {0}. De handmatige keuze hierboven gaat voor.",
      czA0: "🔎 Geen contactsensoren gevonden in de kamer van dit rolluik – kies ze hierboven als je ze hebt.",
      klamki: "Raamkrukken (draaien bij kantelen of openen)",
      kr: "Stapbeweging",
      krs: "Eén tik op ▲/▼ beweegt het rolluik",
      kr0: "uit",
      ak: "🤖 Automatisch kalibreren",
      akx: "■ Afbreken",
      akh: "Let op: dit beweegt het echte rolluik. Het gaat helemaal omhoog, helemaal omlaag en weer omhoog. De kaart meet de tijd en slaat die op.",
      ak0: "Rolluik gaat naar boven…",
      ak1: "Sluiten meten… {0} s",
      ak2: "Sluiten: {0} s. Openen meten… {1} s",
      akok: "Klaar ✔ Looptijd {0} s opgeslagen",
      akstop: "Afgebroken – rolluik gestopt.",
      akrpm: "De motoren melden hun snelheid, dus de kaart berekent de tijd al ({0} s). Geen kalibratie nodig ✔",
      aktm: "Het rolluik meldde het einde niet. Gebruik de handmatige stopwatch hieronder.",
      kd: "⬇ Sluiten & meten",
      ku: "⬆ Openen & meten",
      kok: "✔ Aangekomen",
      kzap: "Deze tijd opslaan",
      kwyn: "Gemeten: {0} s",
      opc: "Opties",
      jez: "Taal van de kaart",
      jauto: "auto",
      przyciski: "Knoppen en snelle posities",
      niebo: "Lucht en weer buiten",
      widok: "Getekend uitzicht: huizen, bomen, straat",
      uchwyty: "Grepen op de onderlatten (bewegen één vleugel)",
      uchwyt_srodek: "Middengreep ⇕ (beweegt beide vleugels)",
      osobno: "Slepen op het glas beweegt maar één vleugel",
      odwroc: "Positie omkeren (motor telt omgekeerd)",
      s_enc: "Rolluiken en motoren",
      s_pog: "Weer en uitzicht",
      s_okn: "Raam – contactsensoren",
      uch: "Kantelopening (naar binnen)",
      otw: "Openingsbreedte (naar binnen)",
      f: {
        entity: "Rolluik of rolluikgroep (links + rechts)",
        name: "Naam",
        roleta_lewa: "Rolluik linkervleugel (optioneel)",
        roleta_prawa: "Rolluik rechtervleugel (optioneel)",
        predkosc_lewa: "Snelheid linkermotor (getal, tpm – optioneel)",
        predkosc_prawa: "Snelheid rechtermotor (getal, tpm – optioneel)",
        zrodlo: "Weerbron",
        pogoda: "Weerentiteit (leeg = automatisch)",
        tlo: "Foto van het uitzicht (bijv. /local/raam.jpg – bestand in map www)",
        czujnik_lewe: "Contactsensor linkervleugel (of de enige)",
        tryb_lewe: "Als open is de linkervleugel…",
        czujnik_prawe: "Contactsensor rechtervleugel",
        tryb_prawe: "Als open is de rechtervleugel…"
      },
      zr: [
        [
          "auto",
          "HA-entiteit, anders internet"
        ],
        [
          "internet",
          "internet (Open-Meteo, locatie van je huis)"
        ],
        [
          "brak",
          "geen weer (gewone lucht)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "gekanteld (boven naar binnen)"
        ],
        [
          "otworz",
          "open (op scharnieren, naar binnen)"
        ]
      ],
      osl: "Soort zonwering",
      osln: [
        "Duo-rolgordijn",
        "Rolgordijn",
        "Plissé",
        "Vouwgordijn",
        "Aluminium jaloezie",
        "Rolluik met opbouwkast boven",
        "Verduisterend",
        "Dupligordijn",
        "Houten jaloezie",
        "Opbouwrolluik",
        "Inbouwrolluik",
        "Geperforeerd rolluik",
        "Buitenjaloezie C80",
        "Buitenjaloezie Z90",
        "Screen ZIP"
      ],
      d_osl: "Kies wat je in je raam hebt. De kaart past stof, kast, zijgeleiders en onderlat aan.",
      promienie: "Zonnestralen door het raam (overdag, bij zon)",
      dzwiek: "Zacht motorgeluid tijdens het bewegen (na een tik)",
      osld: [
        "Dichte en transparante strepen. Schuif ze om licht door de transparante strepen te laten.",
        "Een eenvoudig rolgordijn van dichte stof. Verspreidt het licht.",
        "Dichte gecoate stof. Loopt in witte zijgeleiders en houdt het licht tegen.",
        "Stof gevouwen als een accordeon.",
        "Dubbel plissé. De honingraatcellen houden de warmte vast.",
        "De stof plooit in zachte vouwen.",
        "Dunne aluminium lamellen van 25 mm aan koorden.",
        "Brede houten lamellen van 50 mm aan ladderbanden.",
        "Kast boven het raam in kozijnkleur, samen met het raam geplaatst. Pantser van pvc- of aluminium profielen.",
        "Kast op de buitenmuur met schuine voorkant. Goed voor bestaande huizen.",
        "Kast verborgen in de muur onder het stucwerk. Alleen pantser en geleiders zijn zichtbaar.",
        "Profielen met kleine gaatjes. Gesloten valt er nog wat licht binnen.",
        "Gebogen aluminium lamellen van 80 mm aan banden. Ze kunnen kantelen.",
        "Vlakke Z-vormige lamellen van 90 mm met afdichting. Gesloten erg donker.",
        "Buitendoek in zijgeleiders met rits. Houdt de zon buiten, het uitzicht blijft."
      ],
      osw: "Binnen",
      osz: "Buiten",
      urz: "🔗 Dit raam komt uit de Motor HA-integratie – elke wijziging wordt automatisch in het apparaat opgeslagen (net als bij ‘Configureren’)."
    },
    kolory: {
      czarny: "zwart",
      grafit: "grafiet",
      szary: "grijs",
      bezowy: "beige",
      kremowy: "crème",
      bialy: "wit",
      braz: "bruin",
      granat: "marineblauw",
      pomaranczowy: "oranje",
      czerwony: "rood",
      bordo: "bordeaux",
      rozowy: "roze",
      fiolet: "paars",
      niebieski: "blauw",
      turkus: "turquoise",
      zielony: "groen",
      limonka: "limoen",
      zolty: "geel",
      oliwka: "olijf",
      piaskowy: "zand",
      cappuccino: "cappuccino",
      mokka: "mokka",
      wenge: "wengé",
      popiel: "asgrijs",
      srebrny: "zilver",
      stalowy: "staalblauw",
      lawendowy: "lavendel",
      pudrowy: "poederroze",
      mietowy: "mint",
      blekitny: "hemelsblauw",
      morski: "petrol",
      butelkowy: "flessengroen",
      musztardowy: "mosterd",
      terakota: "terracotta",
      sliwkowy: "pruim"
    },
    kreator: {
      tytul: "Kaartwizard",
      krok: "stap {0} van {1}",
      zamknij: "Wizard sluiten",
      co: "Wat:",
      poco: "Waarom:",
      wstecz: "← Terug",
      dalej: "Volgende →",
      gotowe: "Klaar ✔",
      kroki: {
        roleta: {
          t: "Kies je rolluik",
          co: "het rolluik of de rolluikgroep die deze kaart toont en bedient. Alleen rolluiken staan in de lijst – geen poorten, garagedeuren of andere apparaten.",
          poco: "de kaart stuurt er opdrachten naartoe (openen, sluiten, % instellen) en tekent de echte positie."
        },
        okno: {
          t: "Raam en vleugels",
          co: "hoeveel vleugels het raam heeft en welk rolluik aan welke vleugel hangt.",
          poco: "elke vleugel op de kaart beweegt mee met zijn echte rolluik."
        },
        silnik: {
          t: "Motorsnelheid",
          co: "een entiteit met de motorsnelheid (tpm), als je motor die meldt (bijv. Moes, Tuya). Alleen snelheidsentiteiten staan in de lijst.",
          poco: "de animatie beweegt precies op de snelheid van het echte rolluik. Zonder leert de kaart de tijd zelf."
        },
        czujniki: {
          t: "Raamsensoren",
          co: "contactsensoren van het raam – linker- en rechtervleugel apart. Alleen raam-, deur- en opensensoren staan in de lijst.",
          poco: "als je het raam kantelt of opent, toont de kaart dat. Deze stap is optioneel."
        },
        pogoda: {
          t: "Weer buiten",
          co: "waar de kaart het weer vandaan haalt.",
          poco: "je ziet de echte lucht achter het glas: zon, wolken, regen, sneeuw, nacht en de temperatuur."
        },
        wyglad: {
          t: "Uiterlijk en naam",
          co: "een kant-en-klare set kozijn- en gordijnkleuren en de naam op de kaart.",
          poco: "zodat de kaart op je raam lijkt. Elke kleur kun je later wijzigen in 🎨 Uiterlijk."
        },
        gdzie: {
          t: "Klaar – controleren en opslaan",
          co: "een overzicht van wat de kaart vond en waar ze moet verschijnen.",
          poco: "zodat er niets te repareren blijft. Moet er iets gebeuren, dan staat er wat en waar."
        }
      },
      najlepsze: "beste match",
      auto: "automatisch gekozen",
      inna: "Andere (alleen passende entiteiten)",
      inne: "Passende entiteiten: {0}. De rest vind je in de lijst ‘Andere’ hieronder.",
      bez: "Geen sensor",
      niedost: "niet beschikbaar",
      otwarte: "open",
      zamkniete: "dicht",
      why: {
        grupa: "rolluikgroep",
        poz: "meldt positie %",
        czlonek: "uit de gekozen groep",
        urz: "zelfde apparaat",
        pom: "zelfde kamer",
        nazwa: "naam komt overeen",
        nazwa2: "vergelijkbare naam",
        lewa: "‘links’ in de naam",
        prawa: "‘rechts’ in de naam",
        okno: "raamsensor",
        drzwi: "deursensor",
        rpm: "eenheid tpm",
        typowa: "hoofdweer van HA",
        off: "⚠ niet beschikbaar"
      },
      znaleziono: "Ik vond {0} passende rolluiken. De beste staan bovenaan.",
      brakRolet: "Er is nog geen rolluik in Home Assistant. Voeg eerst je rolluikmotor toe: Instellingen → Apparaten & diensten → ‘+ Integratie toevoegen’ (bijv. Zigbee2MQTT, ZHA, Tuya, Shelly). Kom dan terug – de wizard vindt hem.",
      btnIntegr: "Apparaten & diensten openen",
      niedostepna: "‘{0}’ is nu niet beschikbaar. Controleer voeding en bereik van de motor (Zigbee / wifi). Je kunt de kaart nu toevoegen – ze werkt zodra het rolluik terug is.",
      bezPoz: "‘{0}’ meldt geen positie in %. De kaart toont alleen ‘open / dicht’, en slepen stuurt openen of sluiten.",
      grupaOk: "Dit is een groep van {0} rolluiken – ik heb een raam met 2 vleugels ingesteld, elk met een eigen rolluik.",
      wybierz: "Kies een rolluik uit de lijst om verder te gaan.",
      sk1: "1 vleugel",
      sk2: "2 vleugels",
      skL: "Linkervleugel",
      skP: "Rechtervleugel",
      skJ: "Raam",
      jednaNaDwa: "Eén rolluik voor twee vleugels: beide helften op de kaart bewegen samen. Heeft elke vleugel een eigen rolluik, kies ze dan hieronder of maak een groep: Instellingen → Apparaten & diensten → Helpers → ‘+ Helper aanmaken’ → Groep → Afdekkingsgroep.",
      btnPomocnicy: "Helpers openen",
      rpmOk: "{0}: motor {1} tpm → volledige looptijd ca. {2} s",
      rpmBrak: "{0}: de motor meldt geen snelheid – geen probleem, de kaart leert de looptijd van de eerste bewegingen.",
      rpmZadnej: "Er is geen motorsnelheid-entiteit in HA. Dat is normaal voor de meeste motoren – de kaart leert de looptijd zelf. Nu al? Meet het met de knop hieronder.",
      kal: "🤖 Tijd nu meten (het rolluik gaat omhoog → omlaag → omhoog)",
      czBrak: "Er zijn geen raamsensoren in HA (binaire sensor van het type raam, deur of opening). Je kunt deze stap overslaan – de kaart werkt zonder.",
      czBezPom: "Het rolluik heeft geen kamer (ruimte), dus de wizard weet niet welke sensoren in dezelfde kamer zijn. Wijs een ruimte toe aan het rolluikapparaat (Instellingen → Apparaten → rolluik → ✏️ → Ruimte) voor betere resultaten.",
      btnUrz: "Apparaat van het rolluik openen",
      czAuto: "Sensoren automatisch gekozen uit dezelfde kamer. Je kunt andere kiezen.",
      tryb: "Als de sensor ‘open’ meldt, is de vleugel:",
      zr: [
        [
          "auto",
          "🔎 Automatisch"
        ],
        [
          "internet",
          "🌐 Van internet"
        ],
        [
          "brak",
          "🚫 Geen weer"
        ]
      ],
      wxTeraz: "Nu buiten: {0}",
      wxBrak: "Er is geen weerintegratie in HA – de kaart haalt het weer van internet (Open-Meteo: gratis, zonder account of sleutel) voor de locatie van je huis.",
      wxBezLok: "HA kent de locatie van je huis niet, dus internetweer werkt niet. Stel hem in: Instellingen → Systeem → Algemeen → speld op de kaart.",
      btnOgolne: "Algemene instellingen openen",
      wxNiedost: "‘{0}’ is niet beschikbaar – controleer de weerintegratie. Tot dan gebruikt de kaart internetweer.",
      wxNic: "Zonder weer toont het glas een gewone dag- / nachtlucht.",
      nazwa: "Naam op de kaart (leeg = naam van het rolluik)",
      wlasny: "🎨 Elke kleur uit een palet",
      wlasnyKol: "Zonwering",
      wlasnyRam: "Kozijn",
      wlasnyOpis: "Tik op de regenboogcirkel en kies een kleur – het voorbeeld verandert meteen.",
      podglad: "Het live voorbeeld staat hieronder – elke wijziging zie je meteen.",
      jezyk: "De wizard en kaart spreken {0} – zoals je HA-profiel. Wijzig het in ⚙️ Geavanceerd.",
      jezykNazwa: "Nederlands",
      pods: "Overzicht",
      pRoleta: "Rolluik: {0}",
      pSk: "Vleugels: {0}",
      pSil: "Motor: {0}",
      pSilU: "Looptijd: de kaart leert het",
      pCz: "Raamsensoren: {0}",
      pCzB: "Raamsensoren: geen (prima, ze zijn optioneel)",
      pWx: "Weer: {0}",
      pWxI: "Weer: van internet (Open-Meteo)",
      pWxB: "Weer: uit",
      pWyg: "Uiterlijk: kozijn – {0}, strepen – {1}",
      gdzieT: "Waar de kaart komt",
      tutaj: "De kaart komt in de weergave die je nu bewerkt. Klik onderaan dit venster op ‘Opslaan’ – klaar.",
      tez: "Ook op een ander dashboard? Kies dashboard en weergave – ik voeg er meteen een kopie toe.",
      panel: "Dashboard",
      widok: "Weergave",
      nowyWidok: "➕ Nieuwe weergave ‘Rolluiken’",
      nowyTytul: "Rolluiken",
      dodaj: "Daar een kopie toevoegen",
      dodano: "Toegevoegd ✔ {0} → {1}",
      blad: "Mislukt: {0}",
      bezAdmina: "Kaarten toevoegen aan andere dashboards vereist een HA-beheerdersaccount.",
      domyslny: "Overzicht (standaard)",
      tenPanel: " (deze – gewoon ‘Opslaan’)",
      autoPanel: " (automatisch – niet mogelijk)",
      yaml: " (YAML – alleen handmatig)",
      widokPanel: " (paneel – maar 1 kaart)",
      wczytuje: "Dashboards laden…",
      verOk: "Kaart correct geïnstalleerd – je hebt de nieuwste versie.",
      verNowa: "Er is een nieuwere versie van Motor HA. Werk bij via Instellingen → Updates en laad de pagina opnieuw.",
      btnHacs: "HACS openen",
      btnPrzeladuj: "🔄 Pagina herladen",
      zasobyDup: "De kaart staat {0} keer in Bronnen. Houd één regel (Instellingen → Dashboards → ⋮ → Bronnen), anders kunnen oude en nieuwe versies door elkaar lopen.",
      btnZasoby: "Bronnen openen",
      obr: "tpm"
    }
  };

  // translations/cs.json
  var cs_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Realistické okno s roletou den-noc: animace rychlostí motoru, posun tažením, skutečné počasí venku a průvodce pro začátečníky",
      open: "Otevřeno",
      closed: "Zavřeno",
      opening: "Otevírá se…",
      closing: "Zavírá se…",
      unavailable: "Nedostupné",
      unknown: "Neznámé",
      czesc: "Částečně zavřeno",
      up: "Otevřít",
      stop: "Stop",
      down: "Zavřít",
      brak: "Entita nenalezena",
      okno: "okno",
      lewe: "levé ",
      prawe: "pravé ",
      otw: "otevřené",
      uchyl: "vyklopené",
      oba: "Obě křídla",
      wx: {
        sunny: "slunečno",
        "clear-night": "jasno",
        partlycloudy: "polojasno",
        cloudy: "zataženo",
        exceptional: "výjimečné",
        fog: "mlha",
        rainy: "déšť",
        pouring: "liják",
        hail: "kroupy",
        lightning: "blesky",
        "lightning-rainy": "bouřka",
        snowy: "sníh",
        "snowy-rainy": "déšť se sněhem",
        windy: "větrno",
        "windy-variant": "větrno, zataženo"
      }
    },
    edytor: {
      pv: "Živý náhled – nehýbe skutečnou roletou",
      play: "▶ Ukázat animaci",
      wxl: [
        "skutečné",
        "☀️ slunce",
        "⛅ polojasno",
        "☁️ zataženo",
        "🌧️ déšť",
        "💧 liják",
        "⛈️ bouřka",
        "❄️ sníh",
        "🌫️ mlha",
        "💨 vítr",
        "🌙 noc"
      ],
      kol: "Barva pruhů",
      ram: "Barva rámu okna",
      own: "vlastní",
      sk: "Křídla okna",
      sk1: "1 křídlo",
      sk2: "2 křídla",
      pin: "Připnout náhled nahoru",
      okp: [
        "🪟 zavřené",
        "↘ vyklopené",
        "↔ otevřené"
      ],
      d_kol: "Barva plných (zatemňovacích) pruhů jako v kolekcích rolet den-noc; „vlastní“ = libovolná barva.",
      d_sia: "Barva průsvitných pruhů. „Jako plné“ = světlejší odstín barvy pruhů.",
      d_ram: "Barva rámu a křídel. Barvy s kresbou jsou dřevodekory.",
      d_sk: "Počet křídel okna. U dvou může mít každé křídlo vlastní roletu.",
      d_okn: "Zobrazí se, když kontaktní čidlo hlásí otevřené okno. Posuň jezdec a uvidíš to v náhledu.",
      d_kr: "Tlačítka ▲ a ▼ posunou roletu o malý krok. Rychlé polohy jsou tlačítka s procenty.",
      sl: "Sloupek mezi křídly",
      sl1: "pevný",
      sl2: "pohyblivý",
      slh: "Pevný sloupek zůstává v rámu. Pohyblivý patří k levému křídlu – při obou otevřených je střed volný.",
      roz: "Velikost a rychlost",
      wys: "Výška okna",
      auto: "Doba jízdy z rychlosti motoru (auto)",
      czas: "Celá doba jízdy (ručně)",
      obr: "Rychlost motoru: {0} ot/min → celá jízda cca {1} s",
      obr0: "Tato roleta nehlásí rychlost motoru",
      obrA: " – předpokládá se 30 s (karta se ji naučí, nebo použij kalibraci).",
      obrU: " – naučená doba jízdy: {0} s.",
      obrM: " (měřeno na motorech Moes)",
      kal: "Kalibrace doby jízdy",
      kalh: "Ruční stopky: klikni a stiskni „Dojela“, když roleta dojede na konec. Nejlépe z úplně otevřené do úplně zavřené.",
      sia: "Barva průsvitných pruhů",
      siaj: "jako plné",
      poz: "Rychlé polohy (procenta oddělená čárkou, 100 = otevřeno)",
      sec_wyg: "🎨 Vzhled",
      sec_okn: "🪟 Okno",
      sec_ruch: "⏱ Pohyb a kalibrace",
      sec_zaaw: "⚙️ Pokročilé",
      rst: "↺ Obnovit výchozí",
      wz: "🪄 Průvodce",
      pre: [
        "Moderní (antracit + grafit)",
        "Klasické dřevo (zlatý dub + béžová)",
        "Skandinávský (bílá + krémová)",
        "Tmavý (černá + černé pruhy)",
        "Teplý ořech (ořech + písková)",
        "Barevný (bílá + tyrkysová)"
      ],
      glob: "🌍 Globální nastavení",
      globh: "Ulož tento vzhled (barvy, rám, okno, tlačítka, volby) jako výchozí pro všechny karty rolet, i nové. Každá karta ho může dál měnit.",
      gSave: "🌍 Uložit jako výchozí pro všechny karty",
      gClr: "Smazat",
      gIle: "Uloženo globálně: {0} nastavení. Používají je všechny karty.",
      gBrak: "Žádná globální nastavení – karty používají výchozí hodnoty.",
      wibracja: "Lehká vibrace telefonu při dotyku",
      auto_czujniki: "Automaticky najít kontaktní čidla oken v této místnosti",
      czA: "🔎 Nalezeno automaticky (levé / pravé): {0}. Ruční volba výše má přednost.",
      czA0: "🔎 V místnosti této rolety nebyla nalezena žádná kontaktní čidla – vyber je výše, pokud nějaká máš.",
      klamki: "Kliky okna (otáčí se při vyklopení nebo otevření)",
      kr: "Krokový pohyb",
      krs: "Jedno klepnutí na ▲/▼ posune roletu o",
      kr0: "vypnuto",
      ak: "🤖 Kalibrovat automaticky",
      akx: "■ Přerušit",
      akh: "Pozor: hýbe to skutečnou roletou. Vyjede úplně nahoru, úplně dolů a zase nahoru. Karta změří čas a uloží ho.",
      ak0: "Roleta jede nahoru…",
      ak1: "Měřím zavírání… {0} s",
      ak2: "Zavírání: {0} s. Měřím otevírání… {1} s",
      akok: "Hotovo ✔ Uložena doba jízdy {0} s",
      akstop: "Přerušeno – roleta zastavena.",
      akrpm: "Motory hlásí svou rychlost, takže karta už čas počítá ({0} s). Kalibrace není potřeba ✔",
      aktm: "Roleta nenahlásila konec jízdy. Použij ruční stopky níže.",
      kd: "⬇ Zavřít a změřit",
      ku: "⬆ Otevřít a změřit",
      kok: "✔ Dojela",
      kzap: "Uložit tento čas",
      kwyn: "Změřeno: {0} s",
      opc: "Možnosti",
      jez: "Jazyk karty",
      jauto: "auto",
      przyciski: "Tlačítka a rychlé polohy",
      niebo: "Obloha a počasí venku",
      widok: "Kreslený výhled: domy, stromy, ulice",
      uchwyty: "Úchyty na spodních lištách (posouvají jedno křídlo)",
      uchwyt_srodek: "Středový úchyt ⇕ (posouvá obě křídla)",
      osobno: "Tažení po skle posune jen jedno křídlo",
      odwroc: "Obrátit polohu (motor počítá obráceně)",
      s_enc: "Rolety a motory",
      s_pog: "Počasí a výhled",
      s_okn: "Okno – kontaktní čidla",
      uch: "Šířka vyklopení (dovnitř)",
      otw: "Šířka otevření (dovnitř)",
      f: {
        entity: "Roleta nebo skupina rolet (levá + pravá)",
        name: "Název",
        roleta_lewa: "Roleta levého křídla (volitelné)",
        roleta_prawa: "Roleta pravého křídla (volitelné)",
        predkosc_lewa: "Rychlost levého motoru (číslo, ot/min – volitelné)",
        predkosc_prawa: "Rychlost pravého motoru (číslo, ot/min – volitelné)",
        zrodlo: "Zdroj počasí",
        pogoda: "Entita počasí (prázdné = automaticky)",
        tlo: "Fotka výhledu (např. /local/okno.jpg – soubor ve složce www)",
        czujnik_lewe: "Kontaktní čidlo levého křídla (nebo jediné)",
        tryb_lewe: "Když je otevřeno, levé křídlo je…",
        czujnik_prawe: "Kontaktní čidlo pravého křídla",
        tryb_prawe: "Když je otevřeno, pravé křídlo je…"
      },
      zr: [
        [
          "auto",
          "entita HA, jinak internet"
        ],
        [
          "internet",
          "internet (Open-Meteo, poloha domova)"
        ],
        [
          "brak",
          "bez počasí (prostá obloha)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "vyklopené (nahoře dovnitř)"
        ],
        [
          "otworz",
          "otevřené (na pantech, dovnitř)"
        ]
      ],
      osl: "Typ stínění",
      osln: [
        "Den-noc",
        "Látková roleta",
        "Plisé",
        "Římská roleta",
        "Hliníková žaluzie",
        "Předokenní roleta s horním boxem",
        "Zatemňovací",
        "Plisé voštinové",
        "Dřevěná žaluzie",
        "Předokenní roleta s nástěnným boxem",
        "Podomítková roleta",
        "Perforovaná roleta",
        "Venkovní žaluzie C80",
        "Venkovní žaluzie Z90",
        "Screen ZIP"
      ],
      d_osl: "Vyber, co máš v okně. Karta upraví látku, box, boční vedení a koncovou lištu.",
      promienie: "Sluneční paprsky oknem (ve dne, když svítí slunce)",
      dzwiek: "Tichý zvuk motoru při jízdě (po klepnutí)",
      osld: [
        "Plné a průsvitné pruhy. Posuň je, aby světlo prošlo průsvitnými pruhy.",
        "Jednoduchá roleta z plné látky. Rozptyluje světlo.",
        "Hustá potažená látka. Jede v bílých bočních lištách a nepropustí světlo.",
        "Látka skládaná jako harmonika.",
        "Dvojité plisé. Voštinové komůrky drží teplo.",
        "Látka se skládá do měkkých záhybů.",
        "Tenké hliníkové lamely 25 mm na šňůrkách.",
        "Široké dřevěné lamely 50 mm na páskách.",
        "Box nad oknem v barvě rámu, montovaný s oknem. Pancíř z PVC nebo hliníkových profilů.",
        "Box na venkovní zdi se zkoseným čelem. Vhodné pro stávající domy.",
        "Box skrytý ve zdi pod omítkou. Viditelný je jen pancíř a vedení.",
        "Profily s malými otvory. Po zavření projde trochu světla.",
        "Prohnuté hliníkové lamely 80 mm na páskách. Dají se naklápět.",
        "Ploché lamely 90 mm ve tvaru Z s těsněním. Po zavření velmi tma.",
        "Venkovní tkanina v bočních vedeních se zipem. Zastaví slunce, výhled zůstane."
      ],
      osw: "Uvnitř",
      osz: "Venku",
      urz: "🔗 Toto okno pochází z integrace Motor HA – každá změna se automaticky uloží do zařízení (stejně jako „Nastavit“)."
    },
    kolory: {
      czarny: "černá",
      grafit: "grafitová",
      szary: "šedá",
      bezowy: "béžová",
      kremowy: "krémová",
      bialy: "bílá",
      braz: "hnědá",
      granat: "tmavě modrá",
      pomaranczowy: "oranžová",
      czerwony: "červená",
      bordo: "bordó",
      rozowy: "růžová",
      fiolet: "fialová",
      niebieski: "modrá",
      turkus: "tyrkysová",
      zielony: "zelená",
      limonka: "limetková",
      zolty: "žlutá",
      oliwka: "olivová",
      piaskowy: "písková",
      cappuccino: "cappuccino",
      mokka: "moka",
      wenge: "wenge",
      popiel: "popelavá",
      srebrny: "stříbrná",
      stalowy: "ocelová",
      lawendowy: "levandulová",
      pudrowy: "pudrově růžová",
      mietowy: "mátová",
      blekitny: "blankytná",
      morski: "petrolejová",
      butelkowy: "lahvově zelená",
      musztardowy: "hořčicová",
      terakota: "terakota",
      sliwkowy: "švestková"
    },
    kreator: {
      tytul: "Průvodce kartou",
      krok: "krok {0} z {1}",
      zamknij: "Zavřít průvodce",
      co: "Co:",
      poco: "Proč:",
      wstecz: "← Zpět",
      dalej: "Další →",
      gotowe: "Hotovo ✔",
      kroki: {
        roleta: {
          t: "Vyber svou roletu",
          co: "roleta nebo skupina rolet, kterou tato karta ukazuje a ovládá. Jsou uvedeny jen rolety – žádné brány, garážová vrata ani jiná zařízení.",
          poco: "karta jí posílá příkazy (otevřít, zavřít, nastavit %) a kreslí její skutečnou polohu."
        },
        okno: {
          t: "Okno a křídla",
          co: "kolik křídel má okno a která roleta je na kterém křídle.",
          poco: "každé křídlo na kartě se pohybuje se svou skutečnou roletou."
        },
        silnik: {
          t: "Rychlost motoru",
          co: "entita s rychlostí motoru (ot/min), pokud ji tvůj motor hlásí (např. Moes, Tuya). Jsou uvedeny jen entity rychlosti.",
          poco: "animace jede přesně rychlostí skutečné rolety. Bez ní se karta čas naučí sama."
        },
        czujniki: {
          t: "Okenní čidla",
          co: "kontaktní čidla okna – levé a pravé křídlo zvlášť. Jsou uvedena jen čidla oken, dveří a otevření.",
          poco: "když okno vyklopíš nebo otevřeš, karta to ukáže. Tento krok je volitelný."
        },
        pogoda: {
          t: "Počasí venku",
          co: "odkud karta bere počasí.",
          poco: "za sklem vidíš skutečnou oblohu: slunce, mraky, déšť, sníh, noc a teplotu."
        },
        wyglad: {
          t: "Vzhled a název",
          co: "hotová sada barev rámu a rolety a název na kartě.",
          poco: "aby karta vypadala jako tvé okno. Každou barvu můžeš později změnit v 🎨 Vzhled."
        },
        gdzie: {
          t: "Hotovo – zkontroluj a ulož",
          co: "souhrn toho, co karta našla, a kde se má objevit.",
          poco: "aby nezůstalo nic k opravě. Pokud je něco potřeba, napíše co a kde."
        }
      },
      najlepsze: "nejlepší shoda",
      auto: "vybráno automaticky",
      inna: "Jiná (jen vhodné entity)",
      inne: "Vhodné entity: {0}. Ostatní najdeš v seznamu „Jiná“ níže.",
      bez: "Bez čidla",
      niedost: "nedostupné",
      otwarte: "otevřené",
      zamkniete: "zavřené",
      why: {
        grupa: "skupina rolet",
        poz: "hlásí polohu %",
        czlonek: "z vybrané skupiny",
        urz: "stejné zařízení",
        pom: "stejná místnost",
        nazwa: "název sedí",
        nazwa2: "podobný název",
        lewa: "„levá“ v názvu",
        prawa: "„pravá“ v názvu",
        okno: "okenní čidlo",
        drzwi: "dveřní čidlo",
        rpm: "jednotka ot/min",
        typowa: "hlavní počasí HA",
        off: "⚠ nedostupné"
      },
      znaleziono: "Našel jsem {0} vhodných rolet. Nejlepší jsou nahoře.",
      brakRolet: "V Home Assistantu zatím není žádná roleta. Nejdřív přidej motor rolety: Nastavení → Zařízení a služby → „+ Přidat integraci“ (např. Zigbee2MQTT, ZHA, Tuya, Shelly). Pak se vrať – průvodce ji najde.",
      btnIntegr: "Otevřít Zařízení a služby",
      niedostepna: "„{0}“ je teď nedostupná. Zkontroluj napájení a dosah motoru (Zigbee / Wi-Fi). Kartu můžeš přidat hned – bude fungovat, jakmile se roleta vrátí.",
      bezPoz: "„{0}“ nehlásí polohu v %. Karta ukáže jen „otevřeno / zavřeno“ a tažení pošle otevřít nebo zavřít.",
      grupaOk: "Je to skupina {0} rolet – nastavil jsem dvoukřídlé okno, každé křídlo s vlastní roletou.",
      wybierz: "Pro pokračování vyber roletu ze seznamu.",
      sk1: "1 křídlo",
      sk2: "2 křídla",
      skL: "Levé křídlo",
      skP: "Pravé křídlo",
      skJ: "Okno",
      jednaNaDwa: "Jedna roleta na dvě křídla: obě poloviny na kartě se pohybují spolu. Má-li každé křídlo vlastní roletu, vyber je níže nebo vytvoř skupinu: Nastavení → Zařízení a služby → Pomocníci → „+ Vytvořit pomocníka“ → Skupina → Skupina rolet.",
      btnPomocnicy: "Otevřít Pomocníky",
      rpmOk: "{0}: motor {1} ot/min → celá jízda cca {2} s",
      rpmBrak: "{0}: motor nehlásí rychlost – nevadí, karta se dobu jízdy naučí z prvních pohybů.",
      rpmZadnej: "V HA není žádná entita rychlosti motoru. U většiny motorů je to normální – karta se dobu jízdy naučí sama. Chceš ji hned? Změř ji tlačítkem níže.",
      kal: "🤖 Změřit čas teď (roleta jede nahoru → dolů → nahoru)",
      czBrak: "V HA nejsou žádná okenní čidla (binární senzor typu okno, dveře nebo otevření). Tento krok můžeš přeskočit – karta funguje i bez nich.",
      czBezPom: "Roleta nemá místnost (oblast), takže průvodce nepozná, která čidla jsou ve stejné místnosti. Přiřaď zařízení rolety místnost (Nastavení → Zařízení → roleta → ✏️ → Oblast) pro lepší výsledky.",
      btnUrz: "Otevřít zařízení rolety",
      czAuto: "Čidla vybrána automaticky ze stejné místnosti. Můžeš vybrat jiná.",
      tryb: "Když čidlo hlásí „otevřeno“, křídlo je:",
      zr: [
        [
          "auto",
          "🔎 Automaticky"
        ],
        [
          "internet",
          "🌐 Z internetu"
        ],
        [
          "brak",
          "🚫 Bez počasí"
        ]
      ],
      wxTeraz: "Venku právě teď: {0}",
      wxBrak: "V HA není integrace počasí – karta bere počasí z internetu (Open-Meteo: zdarma, bez účtu i klíče) pro polohu tvého domova.",
      wxBezLok: "HA nezná polohu tvého domova, takže internetové počasí nebude fungovat. Nastav ji: Nastavení → Systém → Obecné → špendlík na mapě.",
      btnOgolne: "Otevřít obecná nastavení",
      wxNiedost: "„{0}“ je nedostupné – zkontroluj integraci počasí. Do té doby karta použije internetové počasí.",
      wxNic: "Bez počasí ukazuje sklo prostou denní / noční oblohu.",
      nazwa: "Název na kartě (prázdné = název rolety)",
      wlasny: "🎨 Libovolná barva z palety",
      wlasnyKol: "Stínění",
      wlasnyRam: "Rám",
      wlasnyOpis: "Klepni na duhové kolečko a vyber libovolnou barvu – náhled se hned změní.",
      podglad: "Živý náhled je níže – každá změna se ukáže hned.",
      jezyk: "Průvodce a karta mluví jazykem {0} – stejně jako tvůj profil HA. Změníš to v ⚙️ Pokročilé.",
      jezykNazwa: "čeština",
      pods: "Souhrn",
      pRoleta: "Roleta: {0}",
      pSk: "Křídla: {0}",
      pSil: "Motor: {0}",
      pSilU: "Doba jízdy: karta se ji naučí",
      pCz: "Okenní čidla: {0}",
      pCzB: "Okenní čidla: žádná (v pořádku, jsou volitelná)",
      pWx: "Počasí: {0}",
      pWxI: "Počasí: z internetu (Open-Meteo)",
      pWxB: "Počasí: vypnuto",
      pWyg: "Vzhled: rám – {0}, pruhy – {1}",
      gdzieT: "Kam karta půjde",
      tutaj: "Karta půjde do pohledu, který právě upravuješ. Klikni dole v tomto okně na „Uložit“ – hotovo.",
      tez: "Chceš ji i na jiné nástěnce? Vyber nástěnku a pohled – hned tam přidám kopii.",
      panel: "Nástěnka",
      widok: "Pohled",
      nowyWidok: "➕ Nový pohled „Rolety“",
      nowyTytul: "Rolety",
      dodaj: "Přidat tam kopii",
      dodano: "Přidáno ✔ {0} → {1}",
      blad: "Nepovedlo se: {0}",
      bezAdmina: "Přidávání karet na jiné nástěnky vyžaduje účet správce HA.",
      domyslny: "Přehled (výchozí)",
      tenPanel: " (tato – stačí „Uložit“)",
      autoPanel: " (automatická – nelze)",
      yaml: " (YAML – jen ručně)",
      widokPanel: " (panel – jen 1 karta)",
      wczytuje: "Načítám nástěnky…",
      verOk: "Karta je správně nainstalovaná – máš nejnovější verzi.",
      verNowa: "Je k dispozici novější verze Motor HA. Aktualizuj ji v Nastavení → Aktualizace a pak obnov stránku.",
      btnHacs: "Otevřít HACS",
      btnPrzeladuj: "🔄 Obnovit stránku",
      zasobyDup: "Karta je v Prostředcích přidaná {0}×. Ponech jednu položku (Nastavení → Nástěnky → ⋮ → Prostředky), jinak se mohou míchat staré a nové verze.",
      btnZasoby: "Otevřít Prostředky",
      obr: "ot/min"
    }
  };

  // translations/sk.json
  var sk_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Realistické okno s roletou deň-noc: animácia rýchlosťou motora, posun ťahaním, skutočné počasie vonku a sprievodca pre začiatočníkov",
      open: "Otvorené",
      closed: "Zatvorené",
      opening: "Otvára sa…",
      closing: "Zatvára sa…",
      unavailable: "Nedostupné",
      unknown: "Neznáme",
      czesc: "Čiastočne zatvorené",
      up: "Otvoriť",
      stop: "Stop",
      down: "Zatvoriť",
      brak: "Entita nenájdená",
      okno: "okno",
      lewe: "ľavé ",
      prawe: "pravé ",
      otw: "otvorené",
      uchyl: "vyklopené",
      oba: "Obe krídla",
      wx: {
        sunny: "slnečno",
        "clear-night": "jasno",
        partlycloudy: "polojasno",
        cloudy: "zamračené",
        exceptional: "výnimočné",
        fog: "hmla",
        rainy: "dážď",
        pouring: "lejak",
        hail: "krúpy",
        lightning: "blesky",
        "lightning-rainy": "búrka",
        snowy: "sneh",
        "snowy-rainy": "dážď so snehom",
        windy: "veterno",
        "windy-variant": "veterno, zamračené"
      }
    },
    edytor: {
      pv: "Živý náhľad – nehýbe skutočnou roletou",
      play: "▶ Ukázať animáciu",
      wxl: [
        "skutočné",
        "☀️ slnko",
        "⛅ polojasno",
        "☁️ zamračené",
        "🌧️ dážď",
        "💧 lejak",
        "⛈️ búrka",
        "❄️ sneh",
        "🌫️ hmla",
        "💨 vietor",
        "🌙 noc"
      ],
      kol: "Farba pásov",
      ram: "Farba rámu okna",
      own: "vlastná",
      sk: "Krídla okna",
      sk1: "1 krídlo",
      sk2: "2 krídla",
      pin: "Pripnúť náhľad hore",
      okp: [
        "🪟 zatvorené",
        "↘ vyklopené",
        "↔ otvorené"
      ],
      d_kol: "Farba plných (zatemňovacích) pásov ako v kolekciách roliet deň-noc; „vlastná“ = ľubovoľná farba.",
      d_sia: "Farba priesvitných pásov. „Ako plné“ = svetlejší odtieň farby pásov.",
      d_ram: "Farba rámu a krídel. Farby s kresbou sú drevodekory.",
      d_sk: "Počet krídel okna. Pri dvoch môže mať každé krídlo vlastnú roletu.",
      d_okn: "Zobrazí sa, keď kontaktný snímač hlási otvorené okno. Posuň posúvač a uvidíš to v náhľade.",
      d_kr: "Tlačidlá ▲ a ▼ posunú roletu o malý krok. Rýchle polohy sú tlačidlá s percentami.",
      sl: "Stĺpik medzi krídlami",
      sl1: "pevný",
      sl2: "pohyblivý",
      slh: "Pevný stĺpik zostáva v ráme. Pohyblivý patrí k ľavému krídlu – pri oboch otvorených je stred voľný.",
      roz: "Veľkosť a rýchlosť",
      wys: "Výška okna",
      auto: "Čas jazdy z rýchlosti motora (auto)",
      czas: "Celý čas jazdy (ručne)",
      obr: "Rýchlosť motora: {0} ot/min → celá jazda cca {1} s",
      obr0: "Táto roleta nehlási rýchlosť motora",
      obrA: " – predpokladá sa 30 s (karta sa ju naučí, alebo použi kalibráciu).",
      obrU: " – naučený čas jazdy: {0} s.",
      obrM: " (merané na motoroch Moes)",
      kal: "Kalibrácia času jazdy",
      kalh: "Ručné stopky: klikni a stlač „Dorazila“, keď roleta dôjde na koniec. Najlepšie z úplne otvorenej do úplne zatvorenej.",
      sia: "Farba priesvitných pásov",
      siaj: "ako plné",
      poz: "Rýchle polohy (percentá oddelené čiarkou, 100 = otvorené)",
      sec_wyg: "🎨 Vzhľad",
      sec_okn: "🪟 Okno",
      sec_ruch: "⏱ Pohyb a kalibrácia",
      sec_zaaw: "⚙️ Pokročilé",
      rst: "↺ Obnoviť predvolené",
      wz: "🪄 Sprievodca",
      pre: [
        "Moderný (antracit + grafit)",
        "Klasické drevo (zlatý dub + béžová)",
        "Škandinávsky (biela + krémová)",
        "Tmavý (čierna + čierne pásy)",
        "Teplý orech (orech + piesková)",
        "Farebný (biela + tyrkysová)"
      ],
      glob: "🌍 Globálne nastavenia",
      globh: "Ulož tento vzhľad (farby, rám, okno, tlačidlá, voľby) ako predvolený pre všetky karty roliet, aj nové. Každá karta ho môže ďalej meniť.",
      gSave: "🌍 Uložiť ako predvolené pre všetky karty",
      gClr: "Vymazať",
      gIle: "Uložené globálne: {0} nastavení. Používajú ich všetky karty.",
      gBrak: "Žiadne globálne nastavenia – karty používajú predvolené hodnoty.",
      wibracja: "Ľahká vibrácia telefónu pri dotyku",
      auto_czujniki: "Automaticky nájsť kontaktné snímače okien v tejto miestnosti",
      czA: "🔎 Nájdené automaticky (ľavé / pravé): {0}. Ručná voľba vyššie má prednosť.",
      czA0: "🔎 V miestnosti tejto rolety sa nenašli žiadne kontaktné snímače – vyber ich vyššie, ak nejaké máš.",
      klamki: "Kľučky okna (otáčajú sa pri vyklopení alebo otvorení)",
      kr: "Krokový pohyb",
      krs: "Jedno ťuknutie na ▲/▼ posunie roletu o",
      kr0: "vypnuté",
      ak: "🤖 Kalibrovať automaticky",
      akx: "■ Prerušiť",
      akh: "Pozor: hýbe to skutočnou roletou. Vyjde úplne hore, úplne dole a zase hore. Karta zmeria čas a uloží ho.",
      ak0: "Roleta ide hore…",
      ak1: "Meriam zatváranie… {0} s",
      ak2: "Zatváranie: {0} s. Meriam otváranie… {1} s",
      akok: "Hotovo ✔ Uložený čas jazdy {0} s",
      akstop: "Prerušené – roleta zastavená.",
      akrpm: "Motory hlásia svoju rýchlosť, takže karta už čas počíta ({0} s). Kalibrácia nie je potrebná ✔",
      aktm: "Roleta nenahlásila koniec jazdy. Použi ručné stopky nižšie.",
      kd: "⬇ Zatvoriť a zmerať",
      ku: "⬆ Otvoriť a zmerať",
      kok: "✔ Dorazila",
      kzap: "Uložiť tento čas",
      kwyn: "Zmerané: {0} s",
      opc: "Možnosti",
      jez: "Jazyk karty",
      jauto: "auto",
      przyciski: "Tlačidlá a rýchle polohy",
      niebo: "Obloha a počasie vonku",
      widok: "Kreslený výhľad: domy, stromy, ulica",
      uchwyty: "Úchyty na spodných lištách (posúvajú jedno krídlo)",
      uchwyt_srodek: "Stredový úchyt ⇕ (posúva obe krídla)",
      osobno: "Ťahanie po skle posunie len jedno krídlo",
      odwroc: "Obrátiť polohu (motor počíta opačne)",
      s_enc: "Rolety a motory",
      s_pog: "Počasie a výhľad",
      s_okn: "Okno – kontaktné snímače",
      uch: "Šírka vyklopenia (dovnútra)",
      otw: "Šírka otvorenia (dovnútra)",
      f: {
        entity: "Roleta alebo skupina roliet (ľavá + pravá)",
        name: "Názov",
        roleta_lewa: "Roleta ľavého krídla (voliteľné)",
        roleta_prawa: "Roleta pravého krídla (voliteľné)",
        predkosc_lewa: "Rýchlosť ľavého motora (číslo, ot/min – voliteľné)",
        predkosc_prawa: "Rýchlosť pravého motora (číslo, ot/min – voliteľné)",
        zrodlo: "Zdroj počasia",
        pogoda: "Entita počasia (prázdne = automaticky)",
        tlo: "Fotka výhľadu (napr. /local/okno.jpg – súbor v priečinku www)",
        czujnik_lewe: "Kontaktný snímač ľavého krídla (alebo jediný)",
        tryb_lewe: "Keď je otvorené, ľavé krídlo je…",
        czujnik_prawe: "Kontaktný snímač pravého krídla",
        tryb_prawe: "Keď je otvorené, pravé krídlo je…"
      },
      zr: [
        [
          "auto",
          "entita HA, inak internet"
        ],
        [
          "internet",
          "internet (Open-Meteo, poloha domova)"
        ],
        [
          "brak",
          "bez počasia (jednoduchá obloha)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "vyklopené (hore dovnútra)"
        ],
        [
          "otworz",
          "otvorené (na pántoch, dovnútra)"
        ]
      ],
      osl: "Typ tienenia",
      osln: [
        "Deň-noc",
        "Látková roleta",
        "Plisé",
        "Rímska roleta",
        "Hliníková žalúzia",
        "Predokenná roleta s horným boxom",
        "Zatemňovacia",
        "Plisé voštinové",
        "Drevená žalúzia",
        "Predokenná roleta s nástenným boxom",
        "Podomietková roleta",
        "Perforovaná roleta",
        "Vonkajšia žalúzia C80",
        "Vonkajšia žalúzia Z90",
        "Screen ZIP"
      ],
      d_osl: "Vyber, čo máš v okne. Karta upraví látku, box, bočné vedenie a koncovú lištu.",
      promienie: "Slnečné lúče cez okno (cez deň, keď svieti slnko)",
      dzwiek: "Tichý zvuk motora pri jazde (po ťuknutí)",
      osld: [
        "Plné a priesvitné pásy. Posuň ich, aby svetlo prešlo priesvitnými pásmi.",
        "Jednoduchá roleta z plnej látky. Rozptyľuje svetlo.",
        "Hustá potiahnutá látka. Ide v bielych bočných lištách a nepustí svetlo.",
        "Látka skladaná ako harmonika.",
        "Dvojité plisé. Voštinové komôrky držia teplo.",
        "Látka sa skladá do mäkkých záhybov.",
        "Tenké hliníkové lamely 25 mm na šnúrkach.",
        "Široké drevené lamely 50 mm na páskach.",
        "Box nad oknom vo farbe rámu, montovaný s oknom. Pancier z PVC alebo hliníkových profilov.",
        "Box na vonkajšej stene so skoseným čelom. Vhodné pre existujúce domy.",
        "Box skrytý v stene pod omietkou. Vidno len pancier a vedenie.",
        "Profily s malými otvormi. Po zatvorení prejde trochu svetla.",
        "Prehnuté hliníkové lamely 80 mm na páskach. Dajú sa nakláňať.",
        "Ploché lamely 90 mm v tvare Z s tesnením. Po zatvorení veľmi tma.",
        "Vonkajšia tkanina v bočných vedeniach so zipsom. Zastaví slnko, výhľad zostane."
      ],
      osw: "Vnútri",
      osz: "Vonku",
      urz: "🔗 Toto okno pochádza z integrácie Motor HA – každá zmena sa automaticky uloží do zariadenia (rovnako ako „Konfigurovať“)."
    },
    kolory: {
      czarny: "čierna",
      grafit: "grafitová",
      szary: "sivá",
      bezowy: "béžová",
      kremowy: "krémová",
      bialy: "biela",
      braz: "hnedá",
      granat: "tmavomodrá",
      pomaranczowy: "oranžová",
      czerwony: "červená",
      bordo: "bordová",
      rozowy: "ružová",
      fiolet: "fialová",
      niebieski: "modrá",
      turkus: "tyrkysová",
      zielony: "zelená",
      limonka: "limetková",
      zolty: "žltá",
      oliwka: "olivová",
      piaskowy: "piesková",
      cappuccino: "cappuccino",
      mokka: "moka",
      wenge: "wenge",
      popiel: "popolavá",
      srebrny: "strieborná",
      stalowy: "oceľová",
      lawendowy: "levanduľová",
      pudrowy: "púdrovo ružová",
      mietowy: "mätová",
      blekitny: "blankytná",
      morski: "petrolejová",
      butelkowy: "fľaškovo zelená",
      musztardowy: "horčicová",
      terakota: "terakota",
      sliwkowy: "slivková"
    },
    kreator: {
      tytul: "Sprievodca kartou",
      krok: "krok {0} z {1}",
      zamknij: "Zavrieť sprievodcu",
      co: "Čo:",
      poco: "Prečo:",
      wstecz: "← Späť",
      dalej: "Ďalej →",
      gotowe: "Hotovo ✔",
      kroki: {
        roleta: {
          t: "Vyber svoju roletu",
          co: "roleta alebo skupina roliet, ktorú táto karta ukazuje a ovláda. Uvedené sú len rolety – žiadne brány, garážové brány ani iné zariadenia.",
          poco: "karta jej posiela príkazy (otvoriť, zatvoriť, nastaviť %) a kreslí jej skutočnú polohu."
        },
        okno: {
          t: "Okno a krídla",
          co: "koľko krídel má okno a ktorá roleta je na ktorom krídle.",
          poco: "každé krídlo na karte sa pohybuje so svojou skutočnou roletou."
        },
        silnik: {
          t: "Rýchlosť motora",
          co: "entita s rýchlosťou motora (ot/min), ak ju tvoj motor hlási (napr. Moes, Tuya). Uvedené sú len entity rýchlosti.",
          poco: "animácia ide presne rýchlosťou skutočnej rolety. Bez nej sa karta čas naučí sama."
        },
        czujniki: {
          t: "Okenné snímače",
          co: "kontaktné snímače okna – ľavé a pravé krídlo zvlášť. Uvedené sú len snímače okien, dverí a otvorenia.",
          poco: "keď okno vyklopíš alebo otvoríš, karta to ukáže. Tento krok je voliteľný."
        },
        pogoda: {
          t: "Počasie vonku",
          co: "odkiaľ karta berie počasie.",
          poco: "za sklom vidíš skutočnú oblohu: slnko, mraky, dážď, sneh, noc a teplotu."
        },
        wyglad: {
          t: "Vzhľad a názov",
          co: "hotová sada farieb rámu a rolety a názov na karte.",
          poco: "aby karta vyzerala ako tvoje okno. Každú farbu môžeš neskôr zmeniť v 🎨 Vzhľad."
        },
        gdzie: {
          t: "Hotovo – skontroluj a ulož",
          co: "súhrn toho, čo karta našla, a kde sa má objaviť.",
          poco: "aby nezostalo nič na opravu. Ak treba niečo urobiť, napíše čo a kde."
        }
      },
      najlepsze: "najlepšia zhoda",
      auto: "vybraté automaticky",
      inna: "Iná (len vhodné entity)",
      inne: "Vhodné entity: {0}. Ostatné nájdeš v zozname „Iná“ nižšie.",
      bez: "Bez snímača",
      niedost: "nedostupné",
      otwarte: "otvorené",
      zamkniete: "zatvorené",
      why: {
        grupa: "skupina roliet",
        poz: "hlási polohu %",
        czlonek: "z vybranej skupiny",
        urz: "rovnaké zariadenie",
        pom: "rovnaká miestnosť",
        nazwa: "názov sedí",
        nazwa2: "podobný názov",
        lewa: "„ľavá“ v názve",
        prawa: "„pravá“ v názve",
        okno: "okenný snímač",
        drzwi: "dverový snímač",
        rpm: "jednotka ot/min",
        typowa: "hlavné počasie HA",
        off: "⚠ nedostupné"
      },
      znaleziono: "Našiel som {0} vhodných roliet. Najlepšie sú hore.",
      brakRolet: "V Home Assistante zatiaľ nie je žiadna roleta. Najprv pridaj motor rolety: Nastavenia → Zariadenia a služby → „+ Pridať integráciu“ (napr. Zigbee2MQTT, ZHA, Tuya, Shelly). Potom sa vráť – sprievodca ju nájde.",
      btnIntegr: "Otvoriť Zariadenia a služby",
      niedostepna: "„{0}“ je teraz nedostupná. Skontroluj napájanie a dosah motora (Zigbee / Wi-Fi). Kartu môžeš pridať hneď – bude fungovať, keď sa roleta vráti.",
      bezPoz: "„{0}“ nehlási polohu v %. Karta ukáže len „otvorené / zatvorené“ a ťahanie pošle otvoriť alebo zatvoriť.",
      grupaOk: "Je to skupina {0} roliet – nastavil som dvojkrídlové okno, každé krídlo s vlastnou roletou.",
      wybierz: "Na pokračovanie vyber roletu zo zoznamu.",
      sk1: "1 krídlo",
      sk2: "2 krídla",
      skL: "Ľavé krídlo",
      skP: "Pravé krídlo",
      skJ: "Okno",
      jednaNaDwa: "Jedna roleta na dve krídla: obe polovice na karte sa pohybujú spolu. Ak má každé krídlo vlastnú roletu, vyber ich nižšie alebo vytvor skupinu: Nastavenia → Zariadenia a služby → Pomocníci → „+ Vytvoriť pomocníka“ → Skupina → Skupina roliet.",
      btnPomocnicy: "Otvoriť Pomocníkov",
      rpmOk: "{0}: motor {1} ot/min → celá jazda cca {2} s",
      rpmBrak: "{0}: motor nehlási rýchlosť – nevadí, karta sa čas jazdy naučí z prvých pohybov.",
      rpmZadnej: "V HA nie je žiadna entita rýchlosti motora. Pri väčšine motorov je to normálne – karta sa čas jazdy naučí sama. Chceš ho hneď? Zmeraj ho tlačidlom nižšie.",
      kal: "🤖 Zmerať čas teraz (roleta ide hore → dole → hore)",
      czBrak: "V HA nie sú žiadne okenné snímače (binárny snímač typu okno, dvere alebo otvorenie). Tento krok môžeš preskočiť – karta funguje aj bez nich.",
      czBezPom: "Roleta nemá miestnosť (oblasť), takže sprievodca nevie, ktoré snímače sú v rovnakej miestnosti. Prideľ zariadeniu rolety miestnosť (Nastavenia → Zariadenia → roleta → ✏️ → Oblasť) pre lepšie výsledky.",
      btnUrz: "Otvoriť zariadenie rolety",
      czAuto: "Snímače vybraté automaticky z rovnakej miestnosti. Môžeš vybrať iné.",
      tryb: "Keď snímač hlási „otvorené“, krídlo je:",
      zr: [
        [
          "auto",
          "🔎 Automaticky"
        ],
        [
          "internet",
          "🌐 Z internetu"
        ],
        [
          "brak",
          "🚫 Bez počasia"
        ]
      ],
      wxTeraz: "Vonku práve teraz: {0}",
      wxBrak: "V HA nie je integrácia počasia – karta berie počasie z internetu (Open-Meteo: zadarmo, bez účtu aj kľúča) pre polohu tvojho domova.",
      wxBezLok: "HA nepozná polohu tvojho domova, takže internetové počasie nebude fungovať. Nastav ju: Nastavenia → Systém → Všeobecné → špendlík na mape.",
      btnOgolne: "Otvoriť všeobecné nastavenia",
      wxNiedost: "„{0}“ je nedostupné – skontroluj integráciu počasia. Dovtedy karta používa internetové počasie.",
      wxNic: "Bez počasia ukazuje sklo jednoduchú dennú / nočnú oblohu.",
      nazwa: "Názov na karte (prázdne = názov rolety)",
      wlasny: "🎨 Ľubovoľná farba z palety",
      wlasnyKol: "Tienenie",
      wlasnyRam: "Rám",
      wlasnyOpis: "Ťukni na dúhový krúžok a vyber ľubovoľnú farbu – náhľad sa hneď zmení.",
      podglad: "Živý náhľad je nižšie – každá zmena sa ukáže hneď.",
      jezyk: "Sprievodca a karta hovoria jazykom {0} – rovnako ako tvoj profil HA. Zmeníš to v ⚙️ Pokročilé.",
      jezykNazwa: "slovenčina",
      pods: "Súhrn",
      pRoleta: "Roleta: {0}",
      pSk: "Krídla: {0}",
      pSil: "Motor: {0}",
      pSilU: "Čas jazdy: karta sa ho naučí",
      pCz: "Okenné snímače: {0}",
      pCzB: "Okenné snímače: žiadne (v poriadku, sú voliteľné)",
      pWx: "Počasie: {0}",
      pWxI: "Počasie: z internetu (Open-Meteo)",
      pWxB: "Počasie: vypnuté",
      pWyg: "Vzhľad: rám – {0}, pásy – {1}",
      gdzieT: "Kam karta pôjde",
      tutaj: "Karta pôjde do zobrazenia, ktoré práve upravuješ. Klikni dole v tomto okne na „Uložiť“ – hotovo.",
      tez: "Chceš ju aj na inej nástenke? Vyber nástenku a zobrazenie – hneď tam pridám kópiu.",
      panel: "Nástenka",
      widok: "Zobrazenie",
      nowyWidok: "➕ Nové zobrazenie „Rolety“",
      nowyTytul: "Rolety",
      dodaj: "Pridať tam kópiu",
      dodano: "Pridané ✔ {0} → {1}",
      blad: "Nepodarilo sa: {0}",
      bezAdmina: "Pridávanie kariet na iné nástenky vyžaduje účet správcu HA.",
      domyslny: "Prehľad (predvolený)",
      tenPanel: " (táto – stačí „Uložiť“)",
      autoPanel: " (automatická – nedá sa)",
      yaml: " (YAML – len ručne)",
      widokPanel: " (panel – len 1 karta)",
      wczytuje: "Načítavam nástenky…",
      verOk: "Karta je správne nainštalovaná – máš najnovšiu verziu.",
      verNowa: "Je k dispozícii novšia verzia Motor HA. Aktualizuj ju v Nastavenia → Aktualizácie a potom obnov stránku.",
      btnHacs: "Otvoriť HACS",
      btnPrzeladuj: "🔄 Obnoviť stránku",
      zasobyDup: "Karta je v Zdrojoch pridaná {0}×. Ponechaj jednu položku (Nastavenia → Nástenky → ⋮ → Zdroje), inak sa môžu miešať staré a nové verzie.",
      btnZasoby: "Otvoriť Zdroje",
      obr: "ot/min"
    }
  };

  // translations/uk.json
  var uk_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Реалістичне вікно з ролетою день-ніч: анімація зі швидкістю двигуна, перетягування для руху, справжня погода надворі та майстер для початківців",
      open: "Відкрито",
      closed: "Закрито",
      opening: "Відкривається…",
      closing: "Закривається…",
      unavailable: "Недоступно",
      unknown: "Невідомо",
      czesc: "Частково закрито",
      up: "Відкрити",
      stop: "Стоп",
      down: "Закрити",
      brak: "Сутність не знайдено",
      okno: "вікно",
      lewe: "ліве ",
      prawe: "праве ",
      otw: "відчинене",
      uchyl: "відкинуте",
      oba: "Обидві стулки",
      wx: {
        sunny: "сонячно",
        "clear-night": "ясно",
        partlycloudy: "мінлива хмарність",
        cloudy: "хмарно",
        exceptional: "надзвичайно",
        fog: "туман",
        rainy: "дощ",
        pouring: "злива",
        hail: "град",
        lightning: "блискавки",
        "lightning-rainy": "гроза",
        snowy: "сніг",
        "snowy-rainy": "мокрий сніг",
        windy: "вітряно",
        "windy-variant": "вітряно, хмарно"
      }
    },
    edytor: {
      pv: "Попередній перегляд – не рухає справжню ролету",
      play: "▶ Показати анімацію",
      wxl: [
        "реальна",
        "☀️ сонце",
        "⛅ мінлива",
        "☁️ хмарно",
        "🌧️ дощ",
        "💧 злива",
        "⛈️ гроза",
        "❄️ сніг",
        "🌫️ туман",
        "💨 вітер",
        "🌙 ніч"
      ],
      kol: "Колір смуг",
      ram: "Колір рами вікна",
      own: "власний",
      sk: "Стулки вікна",
      sk1: "1 стулка",
      sk2: "2 стулки",
      pin: "Закріпити перегляд угорі",
      okp: [
        "🪟 закрите",
        "↘ відкинуте",
        "↔ відчинене"
      ],
      d_kol: "Колір щільних (затемнювальних) смуг, як у колекціях ролет день-ніч; «власний» = будь-який колір.",
      d_sia: "Колір прозорих смуг. «Як щільні» = світліший відтінок кольору смуг.",
      d_ram: "Колір рами та стулок. Кольори з текстурою – це деревні декори.",
      d_sk: "Кількість стулок вікна. Якщо дві, кожна стулка може мати свою ролету.",
      d_okn: "Показується, коли датчик відкриття повідомляє, що вікно відчинене. Посуньте повзунок, щоб побачити це в перегляді.",
      d_kr: "Кнопки ▲ і ▼ рухають ролету на невеликий крок. Швидкі положення – кнопки з відсотками.",
      sl: "Імпост між стулками",
      sl1: "нерухомий",
      sl2: "рухомий",
      slh: "Нерухомий імпост залишається в рамі. Рухомий належить лівій стулці – коли обидві відчинені, середина вільна.",
      roz: "Розмір і швидкість",
      wys: "Висота вікна",
      auto: "Час руху зі швидкості двигуна (авто)",
      czas: "Повний час руху (вручну)",
      obr: "Швидкість двигуна: {0} об/хв → повний хід близько {1} с",
      obr0: "Ця ролета не повідомляє швидкість двигуна",
      obrA: " – приймаємо 30 с (картка навчиться, або скористайтеся калібруванням).",
      obrU: " – вивчений час руху: {0} с.",
      obrM: " (виміряно на двигунах Moes)",
      kal: "Калібрування часу руху",
      kalh: "Ручний секундомір: натисніть, а потім «Доїхала», коли ролета дійде до кінця. Найкраще з повністю відкритої до повністю закритої.",
      sia: "Колір прозорих смуг",
      siaj: "як щільні",
      poz: "Швидкі положення (відсотки через кому, 100 = відкрито)",
      sec_wyg: "🎨 Вигляд",
      sec_okn: "🪟 Вікно",
      sec_ruch: "⏱ Рух і калібрування",
      sec_zaaw: "⚙️ Додатково",
      rst: "↺ Відновити типові",
      wz: "🪄 Майстер",
      pre: [
        "Сучасний (антрацит + графіт)",
        "Класичне дерево (золотий дуб + бежевий)",
        "Скандинавський (білий + кремовий)",
        "Темний (чорний + чорні смуги)",
        "Теплий горіх (горіх + пісочний)",
        "Яскравий (білий + бірюзовий)"
      ],
      glob: "🌍 Глобальні налаштування",
      globh: "Збережіть цей вигляд (кольори, рама, вікно, кнопки, параметри) як типовий для всіх карток ролет, зокрема нових. Кожна картка все одно може його змінити.",
      gSave: "🌍 Зберегти як типовий для всіх карток",
      gClr: "Очистити",
      gIle: "Збережено глобально: {0} налаштувань. Усі картки їх використовують.",
      gBrak: "Немає глобальних налаштувань – картки використовують типові значення.",
      wibracja: "Легка вібрація телефону при дотику",
      auto_czujniki: "Автоматично знаходити датчики вікон у цій кімнаті",
      czA: "🔎 Знайдено автоматично (ліва / права): {0}. Ручний вибір вище має пріоритет.",
      czA0: "🔎 У кімнаті цієї ролети не знайдено датчиків відкриття – виберіть їх вище, якщо вони є.",
      klamki: "Ручки вікна (повертаються при відкиданні чи відчиненні)",
      kr: "Покроковий рух",
      krs: "Одне натискання ▲/▼ рухає ролету на",
      kr0: "вимкнено",
      ak: "🤖 Калібрувати автоматично",
      akx: "■ Перервати",
      akh: "Увага: це рухає справжню ролету. Вона піде повністю вгору, повністю вниз і знову вгору. Картка виміряє час і збереже його.",
      ak0: "Ролета йде вгору…",
      ak1: "Вимірюю закриття… {0} с",
      ak2: "Закриття: {0} с. Вимірюю відкриття… {1} с",
      akok: "Готово ✔ Збережено час руху {0} с",
      akstop: "Перервано – ролету зупинено.",
      akrpm: "Двигуни повідомляють свою швидкість, тож картка вже рахує час ({0} с). Калібрування не потрібне ✔",
      aktm: "Ролета не повідомила про кінець руху. Скористайтеся ручним секундоміром нижче.",
      kd: "⬇ Закрити й виміряти",
      ku: "⬆ Відкрити й виміряти",
      kok: "✔ Доїхала",
      kzap: "Зберегти цей час",
      kwyn: "Виміряно: {0} с",
      opc: "Параметри",
      jez: "Мова картки",
      jauto: "авто",
      przyciski: "Кнопки та швидкі положення",
      niebo: "Небо й погода надворі",
      widok: "Намальований краєвид: будинки, дерева, вулиця",
      uchwyty: "Ручки на нижніх планках (рухають одну стулку)",
      uchwyt_srodek: "Центральна ручка ⇕ (рухає обидві стулки)",
      osobno: "Перетягування по склу рухає лише одну стулку",
      odwroc: "Інвертувати положення (двигун рахує навпаки)",
      s_enc: "Ролети та двигуни",
      s_pog: "Погода і краєвид",
      s_okn: "Вікно – датчики відкриття",
      uch: "Ширина відкидання (всередину)",
      otw: "Ширина відчинення (всередину)",
      f: {
        entity: "Ролета або група ролет (ліва + права)",
        name: "Назва",
        roleta_lewa: "Ролета лівої стулки (необов’язково)",
        roleta_prawa: "Ролета правої стулки (необов’язково)",
        predkosc_lewa: "Швидкість лівого двигуна (число, об/хв – необов’язково)",
        predkosc_prawa: "Швидкість правого двигуна (число, об/хв – необов’язково)",
        zrodlo: "Джерело погоди",
        pogoda: "Сутність погоди (порожньо = автоматично)",
        tlo: "Фото краєвиду (напр. /local/vikno.jpg – файл у теці www)",
        czujnik_lewe: "Датчик лівої стулки (або єдиний)",
        tryb_lewe: "Коли відкрито, ліва стулка…",
        czujnik_prawe: "Датчик правої стулки",
        tryb_prawe: "Коли відкрито, права стулка…"
      },
      zr: [
        [
          "auto",
          "сутність HA, а якщо немає – інтернет"
        ],
        [
          "internet",
          "інтернет (Open-Meteo, розташування дому)"
        ],
        [
          "brak",
          "без погоди (просте небо)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "відкинута (верх усередину)"
        ],
        [
          "otworz",
          "відчинена (на завісах, усередину)"
        ]
      ],
      osl: "Тип штори",
      osln: [
        "День-ніч",
        "Тканинна ролета",
        "Плісе",
        "Римська штора",
        "Алюмінієві жалюзі",
        "Ролета з верхнім коробом",
        "Затемнювальна",
        "Плісе «соти»",
        "Дерев’яні жалюзі",
        "Накладна ролета",
        "Прихована ролета",
        "Перфорована ролета",
        "Фасадні жалюзі C80",
        "Фасадні жалюзі Z90",
        "Screen ZIP"
      ],
      d_osl: "Виберіть, що у вас на вікні. Картка підбере тканину, короб, бічні напрямні й нижню планку.",
      promienie: "Сонячні промені крізь вікно (вдень, коли сонячно)",
      dzwiek: "Тихий звук двигуна під час руху (після натискання)",
      osld: [
        "Щільні та прозорі смуги. Посуньте їх, щоб світло проходило крізь прозорі смуги.",
        "Проста ролета зі щільної тканини. Розсіює світло.",
        "Щільна тканина з покриттям. Іде в білих бічних напрямних і не пропускає світло.",
        "Тканина, складена як гармошка.",
        "Подвійне плісе. Комірки-соти тримають тепло.",
        "Тканина збирається в м’які складки.",
        "Тонкі алюмінієві ламелі 25 мм на шнурах.",
        "Широкі дерев’яні ламелі 50 мм на стрічках.",
        "Короб над вікном у кольорі рами, монтується разом із вікном. Полотно з ПВХ або алюмінієвих профілів.",
        "Короб на зовнішній стіні зі скошеним фасадом. Добре для вже збудованих будинків.",
        "Короб схований у стіні під штукатуркою. Видно лише полотно й напрямні.",
        "Профілі з дрібними отворами. Закрита пропускає трохи світла.",
        "Вигнуті алюмінієві ламелі 80 мм на стрічках. Їх можна нахиляти.",
        "Пласкі Z-подібні ламелі 90 мм з ущільнювачем. Закриті – дуже темно.",
        "Зовнішня сітка в напрямних із блискавкою. Затримує сонце, зберігає вид."
      ],
      osw: "Усередині",
      osz: "Зовні",
      urz: "🔗 Це вікно з інтеграції Motor HA – кожна зміна автоматично зберігається в пристрої (так само, як «Налаштувати»)."
    },
    kolory: {
      czarny: "чорний",
      grafit: "графітовий",
      szary: "сірий",
      bezowy: "бежевий",
      kremowy: "кремовий",
      bialy: "білий",
      braz: "коричневий",
      granat: "темно-синій",
      pomaranczowy: "помаранчевий",
      czerwony: "червоний",
      bordo: "бордовий",
      rozowy: "рожевий",
      fiolet: "фіолетовий",
      niebieski: "синій",
      turkus: "бірюзовий",
      zielony: "зелений",
      limonka: "лаймовий",
      zolty: "жовтий",
      oliwka: "оливковий",
      piaskowy: "пісочний",
      cappuccino: "капучино",
      mokka: "мока",
      wenge: "венге",
      popiel: "попелястий",
      srebrny: "сріблястий",
      stalowy: "сталевий",
      lawendowy: "лавандовий",
      pudrowy: "пудрово-рожевий",
      mietowy: "м’ятний",
      blekitny: "блакитний",
      morski: "морська хвиля",
      butelkowy: "пляшково-зелений",
      musztardowy: "гірчичний",
      terakota: "теракотовий",
      sliwkowy: "сливовий"
    },
    kreator: {
      tytul: "Майстер картки",
      krok: "крок {0} з {1}",
      zamknij: "Закрити майстер",
      co: "Що:",
      poco: "Навіщо:",
      wstecz: "← Назад",
      dalej: "Далі →",
      gotowe: "Готово ✔",
      kroki: {
        roleta: {
          t: "Виберіть свою ролету",
          co: "ролета або група ролет, яку ця картка показує й керує. У списку лише ролети – без воріт, гаражних дверей та інших пристроїв.",
          poco: "картка надсилає їй команди (відкрити, закрити, встановити %) і малює її справжнє положення."
        },
        okno: {
          t: "Вікно й стулки",
          co: "скільки стулок має вікно і яка ролета на якій стулці.",
          poco: "кожна стулка на картці рухається разом зі своєю справжньою ролетою."
        },
        silnik: {
          t: "Швидкість двигуна",
          co: "сутність зі швидкістю двигуна (об/хв), якщо ваш двигун її повідомляє (напр. Moes, Tuya). У списку лише сутності швидкості.",
          poco: "анімація рухається точно зі швидкістю справжньої ролети. Без неї картка сама навчиться часу."
        },
        czujniki: {
          t: "Датчики вікна",
          co: "датчики відкриття вікна – ліва й права стулка окремо. У списку лише датчики вікон, дверей і відкриття.",
          poco: "коли ви відкидаєте чи відчиняєте вікно, картка це показує. Цей крок необов’язковий."
        },
        pogoda: {
          t: "Погода надворі",
          co: "звідки картка бере погоду.",
          poco: "за склом ви бачите справжнє небо: сонце, хмари, дощ, сніг, ніч і температуру."
        },
        wyglad: {
          t: "Вигляд і назва",
          co: "готовий набір кольорів рами й ролети та назва на картці.",
          poco: "щоб картка була схожа на ваше вікно. Кожен колір можна змінити пізніше в 🎨 Вигляд."
        },
        gdzie: {
          t: "Готово – перевірте й збережіть",
          co: "підсумок того, що знайшла картка, і де вона має з’явитися.",
          poco: "щоб нічого не лишилося виправляти. Якщо треба щось зробити, вона скаже що і де."
        }
      },
      najlepsze: "найкращий збіг",
      auto: "вибрано автоматично",
      inna: "Інша (лише відповідні сутності)",
      inne: "Відповідні сутності: {0}. Решту знайдете у списку «Інша» нижче.",
      bez: "Без датчика",
      niedost: "недоступно",
      otwarte: "відчинене",
      zamkniete: "закрите",
      why: {
        grupa: "група ролет",
        poz: "повідомляє положення %",
        czlonek: "з вибраної групи",
        urz: "той самий пристрій",
        pom: "та сама кімната",
        nazwa: "назва збігається",
        nazwa2: "схожа назва",
        lewa: "«ліва» в назві",
        prawa: "«права» в назві",
        okno: "датчик вікна",
        drzwi: "датчик дверей",
        rpm: "одиниця об/хв",
        typowa: "основна погода HA",
        off: "⚠ недоступно"
      },
      znaleziono: "Я знайшов {0} відповідних ролет. Найкращі – угорі.",
      brakRolet: "У Home Assistant ще немає жодної ролети. Спершу додайте двигун ролети: Налаштування → Пристрої та служби → «+ Додати інтеграцію» (напр. Zigbee2MQTT, ZHA, Tuya, Shelly). Потім поверніться – майстер її знайде.",
      btnIntegr: "Відкрити Пристрої та служби",
      niedostepna: "«{0}» зараз недоступна. Перевірте живлення та зв’язок двигуна (Zigbee / Wi-Fi). Картку можна додати вже зараз – вона запрацює, щойно ролета повернеться.",
      bezPoz: "«{0}» не повідомляє положення у %. Картка показуватиме лише «відкрито / закрито», а перетягування надсилатиме відкрити або закрити.",
      grupaOk: "Це група з {0} ролет – я налаштував двостулкове вікно, кожна стулка зі своєю ролетою.",
      wybierz: "Виберіть ролету зі списку, щоб продовжити.",
      sk1: "1 стулка",
      sk2: "2 стулки",
      skL: "Ліва стулка",
      skP: "Права стулка",
      skJ: "Вікно",
      jednaNaDwa: "Одна ролета на дві стулки: обидві половини на картці рухаються разом. Якщо кожна стулка має свою ролету, виберіть їх нижче або створіть групу: Налаштування → Пристрої та служби → Помічники → «+ Створити помічника» → Група → Група покриттів.",
      btnPomocnicy: "Відкрити Помічників",
      rpmOk: "{0}: двигун {1} об/хв → повний хід близько {2} с",
      rpmBrak: "{0}: двигун не повідомляє швидкість – нічого страшного, картка навчиться часу руху з перших рухів.",
      rpmZadnej: "У HA немає сутності швидкості двигуна. Для більшості двигунів це нормально – картка сама навчиться часу руху. Хочете одразу? Виміряйте кнопкою нижче.",
      kal: "🤖 Виміряти час зараз (ролета йде вгору → вниз → вгору)",
      czBrak: "У HA немає датчиків вікон (бінарний датчик типу вікно, двері чи відкриття). Цей крок можна пропустити – картка працює і без них.",
      czBezPom: "Ролета не має кімнати (зони), тому майстер не знає, які датчики в тій самій кімнаті. Призначте кімнату пристрою ролети (Налаштування → Пристрої → ролета → ✏️ → Зона) для кращих результатів.",
      btnUrz: "Відкрити пристрій ролети",
      czAuto: "Датчики вибрано автоматично з тієї ж кімнати. Можна вибрати інші.",
      tryb: "Коли датчик повідомляє «відкрито», стулка:",
      zr: [
        [
          "auto",
          "🔎 Автоматично"
        ],
        [
          "internet",
          "🌐 З інтернету"
        ],
        [
          "brak",
          "🚫 Без погоди"
        ]
      ],
      wxTeraz: "Надворі зараз: {0}",
      wxBrak: "У HA немає інтеграції погоди – картка бере погоду з інтернету (Open-Meteo: безкоштовно, без облікового запису й ключа) для розташування вашого дому.",
      wxBezLok: "HA не знає розташування вашого дому, тому погода з інтернету не працюватиме. Встановіть його: Налаштування → Система → Загальні → мітка на мапі.",
      btnOgolne: "Відкрити загальні налаштування",
      wxNiedost: "«{0}» недоступна – перевірте інтеграцію погоди. Доти картка використовує погоду з інтернету.",
      wxNic: "Без погоди скло показує просте денне / нічне небо.",
      nazwa: "Назва на картці (порожньо = назва ролети)",
      wlasny: "🎨 Будь-який колір із палітри",
      wlasnyKol: "Штора",
      wlasnyRam: "Рама",
      wlasnyOpis: "Торкніться веселкового кружечка й виберіть будь-який колір – перегляд одразу зміниться.",
      podglad: "Попередній перегляд нижче – кожну зміну видно одразу.",
      jezyk: "Майстер і картка говорять мовою «{0}» – як ваш профіль HA. Змінити можна в ⚙️ Додатково.",
      jezykNazwa: "українська",
      pods: "Підсумок",
      pRoleta: "Ролета: {0}",
      pSk: "Стулки: {0}",
      pSil: "Двигун: {0}",
      pSilU: "Час руху: картка навчиться",
      pCz: "Датчики вікна: {0}",
      pCzB: "Датчики вікна: немає (це нормально, вони необов’язкові)",
      pWx: "Погода: {0}",
      pWxI: "Погода: з інтернету (Open-Meteo)",
      pWxB: "Погода: вимкнено",
      pWyg: "Вигляд: рама – {0}, смуги – {1}",
      gdzieT: "Куди піде картка",
      tutaj: "Картка піде у вигляд, який ви зараз редагуєте. Натисніть «Зберегти» внизу цього вікна – готово.",
      tez: "Хочете й на іншій панелі? Виберіть панель і вигляд – я одразу додам туди копію.",
      panel: "Панель",
      widok: "Вигляд",
      nowyWidok: "➕ Новий вигляд «Ролети»",
      nowyTytul: "Ролети",
      dodaj: "Додати туди копію",
      dodano: "Додано ✔ {0} → {1}",
      blad: "Не вдалося: {0}",
      bezAdmina: "Щоб додавати картки на інші панелі, потрібен обліковий запис адміністратора HA.",
      domyslny: "Огляд (типовий)",
      tenPanel: " (ця – просто «Зберегти»)",
      autoPanel: " (автоматична – неможливо)",
      yaml: " (YAML – лише вручну)",
      widokPanel: " (панель – лише 1 картка)",
      wczytuje: "Завантаження панелей…",
      verOk: "Картку встановлено правильно – у вас найновіша версія.",
      verNowa: "Доступна новіша версія Motor HA. Оновіть її в Налаштування → Оновлення, потім перезавантажте сторінку.",
      btnHacs: "Відкрити HACS",
      btnPrzeladuj: "🔄 Перезавантажити сторінку",
      zasobyDup: "Картку додано {0} разів у Ресурсах. Залиште один запис (Налаштування → Панелі → ⋮ → Ресурси), інакше старі й нові версії можуть змішатися.",
      btnZasoby: "Відкрити Ресурси",
      obr: "об/хв"
    }
  };

  // translations/ru.json
  var ru_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Реалистичное окно с рулонной шторой день-ночь: анимация со скоростью мотора, перетаскивание, настоящая погода снаружи и мастер для начинающих",
      open: "Открыто",
      closed: "Закрыто",
      opening: "Открывается…",
      closing: "Закрывается…",
      unavailable: "Недоступно",
      unknown: "Неизвестно",
      czesc: "Частично закрыто",
      up: "Открыть",
      stop: "Стоп",
      down: "Закрыть",
      brak: "Сущность не найдена",
      okno: "окно",
      lewe: "левое ",
      prawe: "правое ",
      otw: "открыто",
      uchyl: "откинуто",
      oba: "Обе створки",
      wx: {
        sunny: "солнечно",
        "clear-night": "ясно",
        partlycloudy: "переменная облачность",
        cloudy: "облачно",
        exceptional: "необычно",
        fog: "туман",
        rainy: "дождь",
        pouring: "ливень",
        hail: "град",
        lightning: "молнии",
        "lightning-rainy": "гроза",
        snowy: "снег",
        "snowy-rainy": "мокрый снег",
        windy: "ветрено",
        "windy-variant": "ветрено, облачно"
      }
    },
    edytor: {
      pv: "Предпросмотр – не двигает настоящую рольставню",
      play: "▶ Показать анимацию",
      wxl: [
        "реальная",
        "☀️ солнце",
        "⛅ переменная",
        "☁️ облачно",
        "🌧️ дождь",
        "💧 ливень",
        "⛈️ гроза",
        "❄️ снег",
        "🌫️ туман",
        "💨 ветер",
        "🌙 ночь"
      ],
      kol: "Цвет полос",
      ram: "Цвет оконной рамы",
      own: "свой",
      sk: "Створки окна",
      sk1: "1 створка",
      sk2: "2 створки",
      pin: "Закрепить предпросмотр сверху",
      okp: [
        "🪟 закрыто",
        "↘ откинуто",
        "↔ открыто"
      ],
      d_kol: "Цвет плотных (затемняющих) полос, как в коллекциях штор день-ночь; «свой» = любой цвет.",
      d_sia: "Цвет прозрачных полос. «Как плотные» = более светлый оттенок цвета полос.",
      d_ram: "Цвет рамы и створок. Цвета с текстурой – это древесные декоры.",
      d_sk: "Количество створок. Если их две, у каждой может быть своя штора.",
      d_okn: "Показывается, когда датчик открытия сообщает, что окно открыто. Сдвиньте ползунок, чтобы увидеть это в предпросмотре.",
      d_kr: "Кнопки ▲ и ▼ двигают рольставню на небольшой шаг. Быстрые положения – кнопки с процентами.",
      sl: "Импост между створками",
      sl1: "неподвижный",
      sl2: "подвижный",
      slh: "Неподвижный импост остаётся в раме. Подвижный относится к левой створке – когда обе открыты, середина свободна.",
      roz: "Размер и скорость",
      wys: "Высота окна",
      auto: "Время хода по скорости мотора (авто)",
      czas: "Полное время хода (вручную)",
      obr: "Скорость мотора: {0} об/мин → полный ход около {1} с",
      obr0: "Эта рольставня не сообщает скорость мотора",
      obrA: " – принимаем 30 с (карточка научится, или используйте калибровку).",
      obrU: " – выученное время хода: {0} с.",
      obrM: " (измерено на моторах Moes)",
      kal: "Калибровка времени хода",
      kalh: "Ручной секундомер: нажмите, затем «Доехала», когда рольставня дойдёт до конца. Лучше всего от полностью открытой до полностью закрытой.",
      sia: "Цвет прозрачных полос",
      siaj: "как плотные",
      poz: "Быстрые положения (проценты через запятую, 100 = открыто)",
      sec_wyg: "🎨 Внешний вид",
      sec_okn: "🪟 Окно",
      sec_ruch: "⏱ Движение и калибровка",
      sec_zaaw: "⚙️ Дополнительно",
      rst: "↺ Сбросить по умолчанию",
      wz: "🪄 Мастер",
      pre: [
        "Современный (антрацит + графит)",
        "Классическое дерево (золотой дуб + бежевый)",
        "Скандинавский (белый + кремовый)",
        "Тёмный (чёрный + чёрные полосы)",
        "Тёплый орех (орех + песочный)",
        "Яркий (белый + бирюзовый)"
      ],
      glob: "🌍 Глобальные настройки",
      globh: "Сохраните этот вид (цвета, рама, окно, кнопки, параметры) как стандартный для всех карточек рольставен, включая новые. Каждая карточка всё равно может его изменить.",
      gSave: "🌍 Сохранить как стандарт для всех карточек",
      gClr: "Очистить",
      gIle: "Сохранено глобально: {0} настроек. Их используют все карточки.",
      gBrak: "Нет глобальных настроек – карточки используют значения по умолчанию.",
      wibracja: "Лёгкая вибрация телефона при касании",
      auto_czujniki: "Автоматически находить датчики окон в этой комнате",
      czA: "🔎 Найдено автоматически (левая / правая): {0}. Ручной выбор выше имеет приоритет.",
      czA0: "🔎 В комнате этой рольставни не найдено датчиков открытия – выберите их выше, если они есть.",
      klamki: "Ручки окна (поворачиваются при откидывании или открывании)",
      kr: "Пошаговое движение",
      krs: "Одно нажатие ▲/▼ двигает рольставню на",
      kr0: "выкл.",
      ak: "🤖 Откалибровать автоматически",
      akx: "■ Прервать",
      akh: "Внимание: это двигает настоящую рольставню. Она поедет полностью вверх, полностью вниз и снова вверх. Карточка измерит время и сохранит его.",
      ak0: "Рольставня едет вверх…",
      ak1: "Измеряю закрытие… {0} с",
      ak2: "Закрытие: {0} с. Измеряю открытие… {1} с",
      akok: "Готово ✔ Сохранено время хода {0} с",
      akstop: "Прервано – рольставня остановлена.",
      akrpm: "Моторы сообщают свою скорость, поэтому карточка уже считает время ({0} с). Калибровка не нужна ✔",
      aktm: "Рольставня не сообщила о конце хода. Используйте ручной секундомер ниже.",
      kd: "⬇ Закрыть и замерить",
      ku: "⬆ Открыть и замерить",
      kok: "✔ Доехала",
      kzap: "Сохранить это время",
      kwyn: "Измерено: {0} с",
      opc: "Параметры",
      jez: "Язык карточки",
      jauto: "авто",
      przyciski: "Кнопки и быстрые положения",
      niebo: "Небо и погода снаружи",
      widok: "Нарисованный вид: дома, деревья, улица",
      uchwyty: "Ручки на нижних планках (двигают одну створку)",
      uchwyt_srodek: "Центральная ручка ⇕ (двигает обе створки)",
      osobno: "Перетаскивание по стеклу двигает только одну створку",
      odwroc: "Инвертировать положение (мотор считает наоборот)",
      s_enc: "Рольставни и моторы",
      s_pog: "Погода и вид",
      s_okn: "Окно – датчики открытия",
      uch: "Ширина откидывания (внутрь)",
      otw: "Ширина открывания (внутрь)",
      f: {
        entity: "Рольставня или группа (левая + правая)",
        name: "Название",
        roleta_lewa: "Штора левой створки (необязательно)",
        roleta_prawa: "Штора правой створки (необязательно)",
        predkosc_lewa: "Скорость левого мотора (число, об/мин – необязательно)",
        predkosc_prawa: "Скорость правого мотора (число, об/мин – необязательно)",
        zrodlo: "Источник погоды",
        pogoda: "Сущность погоды (пусто = автоматически)",
        tlo: "Фото вида (напр. /local/okno.jpg – файл в папке www)",
        czujnik_lewe: "Датчик левой створки (или единственный)",
        tryb_lewe: "Когда открыто, левая створка…",
        czujnik_prawe: "Датчик правой створки",
        tryb_prawe: "Когда открыто, правая створка…"
      },
      zr: [
        [
          "auto",
          "сущность HA, если нет – интернет"
        ],
        [
          "internet",
          "интернет (Open-Meteo, расположение дома)"
        ],
        [
          "brak",
          "без погоды (простое небо)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "откинута (верх внутрь)"
        ],
        [
          "otworz",
          "открыта (на петлях, внутрь)"
        ]
      ],
      osl: "Тип шторы",
      osln: [
        "День-ночь",
        "Тканевая рулонная",
        "Плиссе",
        "Римская штора",
        "Алюминиевые жалюзи",
        "Рольставня с верхним коробом",
        "Блэкаут",
        "Плиссе «соты»",
        "Деревянные жалюзи",
        "Накладная рольставня",
        "Встроенная рольставня",
        "Перфорированная рольставня",
        "Фасадные жалюзи C80",
        "Фасадные жалюзи Z90",
        "Screen ZIP"
      ],
      d_osl: "Выберите, что у вас на окне. Карточка подберёт ткань, короб, боковые направляющие и нижнюю планку.",
      promienie: "Солнечные лучи сквозь окно (днём, когда солнечно)",
      dzwiek: "Тихий звук мотора при движении (после касания)",
      osld: [
        "Плотные и прозрачные полосы. Сдвиньте их, чтобы свет проходил сквозь прозрачные полосы.",
        "Простая рулонная штора из плотной ткани. Рассеивает свет.",
        "Плотная ткань с покрытием. Идёт в белых боковых направляющих и не пропускает свет.",
        "Ткань, сложенная гармошкой.",
        "Двойное плиссе. Ячейки-соты сохраняют тепло.",
        "Ткань собирается в мягкие складки.",
        "Тонкие алюминиевые ламели 25 мм на шнурах.",
        "Широкие деревянные ламели 50 мм на лентах.",
        "Короб над окном в цвет рамы, монтируется вместе с окном. Полотно из ПВХ или алюминиевых профилей.",
        "Короб на наружной стене со скошенным фасадом. Хорошо для готовых домов.",
        "Короб спрятан в стене под штукатуркой. Видно только полотно и направляющие.",
        "Профили с мелкими отверстиями. В закрытом виде пропускает немного света.",
        "Изогнутые алюминиевые ламели 80 мм на лентах. Их можно наклонять.",
        "Плоские Z-образные ламели 90 мм с уплотнителем. В закрытом виде очень темно.",
        "Наружная сетка в направляющих с молнией. Задерживает солнце, сохраняет вид."
      ],
      osw: "Внутри",
      osz: "Снаружи",
      urz: "🔗 Это окно из интеграции Motor HA – каждое изменение автоматически сохраняется в устройстве (так же, как «Настроить»)."
    },
    kolory: {
      czarny: "чёрный",
      grafit: "графитовый",
      szary: "серый",
      bezowy: "бежевый",
      kremowy: "кремовый",
      bialy: "белый",
      braz: "коричневый",
      granat: "тёмно-синий",
      pomaranczowy: "оранжевый",
      czerwony: "красный",
      bordo: "бордовый",
      rozowy: "розовый",
      fiolet: "фиолетовый",
      niebieski: "синий",
      turkus: "бирюзовый",
      zielony: "зелёный",
      limonka: "лаймовый",
      zolty: "жёлтый",
      oliwka: "оливковый",
      piaskowy: "песочный",
      cappuccino: "капучино",
      mokka: "мокко",
      wenge: "венге",
      popiel: "пепельный",
      srebrny: "серебристый",
      stalowy: "стальной",
      lawendowy: "лавандовый",
      pudrowy: "пудрово-розовый",
      mietowy: "мятный",
      blekitny: "голубой",
      morski: "морская волна",
      butelkowy: "бутылочно-зелёный",
      musztardowy: "горчичный",
      terakota: "терракотовый",
      sliwkowy: "сливовый"
    },
    kreator: {
      tytul: "Мастер карточки",
      krok: "шаг {0} из {1}",
      zamknij: "Закрыть мастер",
      co: "Что:",
      poco: "Зачем:",
      wstecz: "← Назад",
      dalej: "Далее →",
      gotowe: "Готово ✔",
      kroki: {
        roleta: {
          t: "Выберите рольставню",
          co: "рольставня или группа, которую эта карточка показывает и которой управляет. В списке только рольставни – без ворот, гаражей и других устройств.",
          poco: "карточка отправляет ей команды (открыть, закрыть, задать %) и рисует её настоящее положение."
        },
        okno: {
          t: "Окно и створки",
          co: "сколько створок у окна и какая рольставня на какой створке.",
          poco: "каждая створка на карточке движется вместе со своей настоящей рольставней."
        },
        silnik: {
          t: "Скорость мотора",
          co: "сущность со скоростью мотора (об/мин), если ваш мотор её сообщает (напр. Moes, Tuya). В списке только сущности скорости.",
          poco: "анимация движется точно со скоростью настоящей рольставни. Без неё карточка сама выучит время."
        },
        czujniki: {
          t: "Датчики окна",
          co: "датчики открытия окна – левая и правая створки отдельно. В списке только датчики окон, дверей и открытия.",
          poco: "когда вы откидываете или открываете окно, карточка это показывает. Этот шаг необязателен."
        },
        pogoda: {
          t: "Погода снаружи",
          co: "откуда карточка берёт погоду.",
          poco: "за стеклом вы видите настоящее небо: солнце, облака, дождь, снег, ночь и температуру."
        },
        wyglad: {
          t: "Внешний вид и название",
          co: "готовый набор цветов рамы и шторы и название на карточке.",
          poco: "чтобы карточка была похожа на ваше окно. Каждый цвет можно позже изменить в 🎨 Внешний вид."
        },
        gdzie: {
          t: "Готово – проверьте и сохраните",
          co: "сводка того, что нашла карточка, и где она должна появиться.",
          poco: "чтобы ничего не осталось исправлять. Если что-то нужно сделать, она скажет что и где."
        }
      },
      najlepsze: "лучшее совпадение",
      auto: "выбрано автоматически",
      inna: "Другая (только подходящие сущности)",
      inne: "Подходящие сущности: {0}. Остальные – в списке «Другая» ниже.",
      bez: "Без датчика",
      niedost: "недоступно",
      otwarte: "открыто",
      zamkniete: "закрыто",
      why: {
        grupa: "группа рольставен",
        poz: "сообщает положение %",
        czlonek: "из выбранной группы",
        urz: "то же устройство",
        pom: "та же комната",
        nazwa: "название совпадает",
        nazwa2: "похожее название",
        lewa: "«левая» в названии",
        prawa: "«правая» в названии",
        okno: "датчик окна",
        drzwi: "датчик двери",
        rpm: "единица об/мин",
        typowa: "основная погода HA",
        off: "⚠ недоступно"
      },
      znaleziono: "Я нашёл {0} подходящих рольставен. Лучшие – сверху.",
      brakRolet: "В Home Assistant пока нет ни одной рольставни. Сначала добавьте мотор: Настройки → Устройства и службы → «+ Добавить интеграцию» (напр. Zigbee2MQTT, ZHA, Tuya, Shelly). Затем вернитесь – мастер её найдёт.",
      btnIntegr: "Открыть Устройства и службы",
      niedostepna: "«{0}» сейчас недоступна. Проверьте питание и связь мотора (Zigbee / Wi-Fi). Карточку можно добавить уже сейчас – она заработает, как только рольставня вернётся.",
      bezPoz: "«{0}» не сообщает положение в %. Карточка будет показывать только «открыто / закрыто», а перетаскивание будет отправлять открыть или закрыть.",
      grupaOk: "Это группа из {0} рольставен – я настроил двустворчатое окно, каждая створка со своей рольставней.",
      wybierz: "Выберите рольставню из списка, чтобы продолжить.",
      sk1: "1 створка",
      sk2: "2 створки",
      skL: "Левая створка",
      skP: "Правая створка",
      skJ: "Окно",
      jednaNaDwa: "Одна рольставня на две створки: обе половины на карточке движутся вместе. Если у каждой створки своя рольставня, выберите их ниже или создайте группу: Настройки → Устройства и службы → Вспомогательные → «+ Создать» → Группа → Группа покрытий.",
      btnPomocnicy: "Открыть Вспомогательные",
      rpmOk: "{0}: мотор {1} об/мин → полный ход около {2} с",
      rpmBrak: "{0}: мотор не сообщает скорость – ничего страшного, карточка выучит время хода по первым движениям.",
      rpmZadnej: "В HA нет сущности скорости мотора. Для большинства моторов это нормально – карточка сама выучит время хода. Хотите сразу? Измерьте кнопкой ниже.",
      kal: "🤖 Измерить время сейчас (рольставня едет вверх → вниз → вверх)",
      czBrak: "В HA нет датчиков окон (бинарный датчик типа окно, дверь или открытие). Этот шаг можно пропустить – карточка работает и без них.",
      czBezPom: "У рольставни нет комнаты (пространства), поэтому мастер не знает, какие датчики в той же комнате. Назначьте комнату устройству рольставни (Настройки → Устройства → рольставня → ✏️ → Пространство) для лучших результатов.",
      btnUrz: "Открыть устройство рольставни",
      czAuto: "Датчики выбраны автоматически из той же комнаты. Можно выбрать другие.",
      tryb: "Когда датчик сообщает «открыто», створка:",
      zr: [
        [
          "auto",
          "🔎 Автоматически"
        ],
        [
          "internet",
          "🌐 Из интернета"
        ],
        [
          "brak",
          "🚫 Без погоды"
        ]
      ],
      wxTeraz: "Снаружи сейчас: {0}",
      wxBrak: "В HA нет интеграции погоды – карточка берёт погоду из интернета (Open-Meteo: бесплатно, без учётной записи и ключа) для расположения вашего дома.",
      wxBezLok: "HA не знает расположение вашего дома, поэтому погода из интернета работать не будет. Укажите его: Настройки → Система → Общие → метка на карте.",
      btnOgolne: "Открыть общие настройки",
      wxNiedost: "«{0}» недоступна – проверьте интеграцию погоды. Пока что карточка использует погоду из интернета.",
      wxNic: "Без погоды стекло показывает простое дневное / ночное небо.",
      nazwa: "Название на карточке (пусто = название рольставни)",
      wlasny: "🎨 Любой цвет из палитры",
      wlasnyKol: "Штора",
      wlasnyRam: "Рама",
      wlasnyOpis: "Коснитесь радужного кружка и выберите любой цвет – предпросмотр сразу изменится.",
      podglad: "Предпросмотр ниже – каждое изменение видно сразу.",
      jezyk: "Мастер и карточка говорят на языке «{0}» – как ваш профиль HA. Изменить можно в ⚙️ Дополнительно.",
      jezykNazwa: "русский",
      pods: "Сводка",
      pRoleta: "Рольставня: {0}",
      pSk: "Створки: {0}",
      pSil: "Мотор: {0}",
      pSilU: "Время хода: карточка выучит",
      pCz: "Датчики окна: {0}",
      pCzB: "Датчики окна: нет (это нормально, они необязательны)",
      pWx: "Погода: {0}",
      pWxI: "Погода: из интернета (Open-Meteo)",
      pWxB: "Погода: выкл.",
      pWyg: "Вид: рама – {0}, полосы – {1}",
      gdzieT: "Куда пойдёт карточка",
      tutaj: "Карточка пойдёт в вид, который вы сейчас редактируете. Нажмите «Сохранить» внизу этого окна – готово.",
      tez: "Хотите и на другой панели? Выберите панель и вид – я сразу добавлю туда копию.",
      panel: "Панель",
      widok: "Вид",
      nowyWidok: "➕ Новый вид «Рольставни»",
      nowyTytul: "Рольставни",
      dodaj: "Добавить туда копию",
      dodano: "Добавлено ✔ {0} → {1}",
      blad: "Не удалось: {0}",
      bezAdmina: "Для добавления карточек на другие панели нужна учётная запись администратора HA.",
      domyslny: "Обзор (по умолчанию)",
      tenPanel: " (эта – просто «Сохранить»)",
      autoPanel: " (автоматическая – нельзя)",
      yaml: " (YAML – только вручную)",
      widokPanel: " (панель – только 1 карточка)",
      wczytuje: "Загрузка панелей…",
      verOk: "Карточка установлена правильно – у вас последняя версия.",
      verNowa: "Доступна новая версия Motor HA. Обновите её в Настройки → Обновления, затем перезагрузите страницу.",
      btnHacs: "Открыть HACS",
      btnPrzeladuj: "🔄 Перезагрузить страницу",
      zasobyDup: "Карточка добавлена {0} раз в Ресурсах. Оставьте одну запись (Настройки → Панели → ⋮ → Ресурсы), иначе старые и новые версии могут смешаться.",
      btnZasoby: "Открыть Ресурсы",
      obr: "об/мин"
    }
  };

  // translations/pt.json
  var pt_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "Janela realista com estore dia-noite: animação à velocidade do motor, arrastar para mover, tempo real lá fora e um assistente para principiantes",
      open: "Aberta",
      closed: "Fechada",
      opening: "A abrir…",
      closing: "A fechar…",
      unavailable: "Indisponível",
      unknown: "Desconhecido",
      czesc: "Parcialmente fechada",
      up: "Abrir",
      stop: "Parar",
      down: "Fechar",
      brak: "Entidade não encontrada",
      okno: "janela",
      lewe: "esquerda ",
      prawe: "direita ",
      otw: "aberta",
      uchyl: "basculante",
      oba: "Ambas as folhas",
      wx: {
        sunny: "ensolarado",
        "clear-night": "limpo",
        partlycloudy: "parcialmente nublado",
        cloudy: "nublado",
        exceptional: "excecional",
        fog: "nevoeiro",
        rainy: "chuva",
        pouring: "aguaceiro",
        hail: "granizo",
        lightning: "relâmpagos",
        "lightning-rainy": "trovoada",
        snowy: "neve",
        "snowy-rainy": "chuva e neve",
        windy: "ventoso",
        "windy-variant": "ventoso, nublado"
      }
    },
    edytor: {
      pv: "Pré-visualização ao vivo – não move a persiana real",
      play: "▶ Ver animação",
      wxl: [
        "real",
        "☀️ sol",
        "⛅ abertas",
        "☁️ nublado",
        "🌧️ chuva",
        "💧 aguaceiro",
        "⛈️ trovoada",
        "❄️ neve",
        "🌫️ nevoeiro",
        "💨 vento",
        "🌙 noite"
      ],
      kol: "Cor das faixas",
      ram: "Cor do caixilho",
      own: "própria",
      sk: "Folhas da janela",
      sk1: "1 folha",
      sk2: "2 folhas",
      pin: "Fixar a pré-visualização no topo",
      okp: [
        "🪟 fechada",
        "↘ basculante",
        "↔ aberta"
      ],
      d_kol: "Cor das faixas opacas, como nas coleções de estores dia-noite; «própria» = qualquer cor.",
      d_sia: "Cor das faixas translúcidas. «Como a opaca» = tom mais claro da cor das faixas.",
      d_ram: "Cor do caixilho e das folhas. As cores com veio são folheados imitação madeira.",
      d_sk: "Número de folhas. Com duas, cada folha pode ter o seu próprio estore.",
      d_okn: "Mostrado quando um sensor de contacto indica a janela aberta. Mova um cursor para ver na pré-visualização.",
      d_kr: "Os botões ▲ e ▼ movem a persiana um pequeno passo. As posições rápidas são os botões de percentagem.",
      sl: "Pilar entre as folhas",
      sl1: "fixo",
      sl2: "móvel",
      slh: "Um pilar fixo fica no caixilho. Um móvel faz parte da folha esquerda: com ambas abertas, o centro fica livre.",
      roz: "Tamanho e velocidade",
      wys: "Altura da janela",
      auto: "Tempo de percurso pela velocidade do motor (auto)",
      czas: "Tempo de percurso completo (manual)",
      obr: "Velocidade do motor: {0} rpm → percurso completo aprox. {1} s",
      obr0: "Esta persiana não indica a velocidade do motor",
      obrA: " – assumindo 30 s (o cartão vai aprender, ou use a calibração).",
      obrU: " – tempo aprendido: {0} s.",
      obrM: " (medido em motores Moes)",
      kal: "Calibração do tempo de percurso",
      kalh: "Cronómetro manual: clique e depois carregue em «Chegou» quando a persiana chegar ao fim. De preferência de toda aberta a toda fechada.",
      sia: "Cor das faixas translúcidas",
      siaj: "como a opaca",
      poz: "Posições rápidas (percentagem, separadas por vírgulas, 100 = aberta)",
      sec_wyg: "🎨 Aspeto",
      sec_okn: "🪟 Janela",
      sec_ruch: "⏱ Movimento e calibração",
      sec_zaaw: "⚙️ Avançado",
      rst: "↺ Repor predefinições",
      wz: "🪄 Assistente",
      pre: [
        "Moderno (antracite + grafite)",
        "Madeira clássica (carvalho dourado + bege)",
        "Escandinavo (branco + creme)",
        "Escuro (preto + faixas pretas)",
        "Nogueira quente (nogueira + areia)",
        "Colorido (branco + turquesa)"
      ],
      glob: "🌍 Definições globais",
      globh: "Guarde este aspeto (cores, caixilho, janela, botões, opções) como predefinido para todos os cartões de persiana, incluindo novos. Cada cartão pode alterá-lo.",
      gSave: "🌍 Guardar como predefinido para todos",
      gClr: "Limpar",
      gIle: "Guardado globalmente: {0} definições. Todos os cartões as usam.",
      gBrak: "Sem definições globais – os cartões usam os valores predefinidos.",
      wibracja: "Vibração leve do telemóvel ao tocar",
      auto_czujniki: "Encontrar automaticamente os sensores da janela nesta divisão",
      czA: "🔎 Detetados automaticamente (esquerda / direita): {0}. A escolha manual acima tem prioridade.",
      czA0: "🔎 Não foram encontrados sensores de contacto na divisão desta persiana – escolha-os acima se os tiver.",
      klamki: "Puxadores da janela (rodam ao bascular ou abrir)",
      kr: "Movimento por passos",
      krs: "Um toque em ▲/▼ move a persiana",
      kr0: "desligado",
      ak: "🤖 Calibrar automaticamente",
      akx: "■ Interromper",
      akh: "Atenção: isto move a persiana real. Sobe totalmente, desce totalmente e volta a subir. O cartão mede o tempo e guarda-o.",
      ak0: "A persiana está a subir…",
      ak1: "A medir o fecho… {0} s",
      ak2: "Fecho: {0} s. A medir a abertura… {1} s",
      akok: "Pronto ✔ Tempo de percurso {0} s guardado",
      akstop: "Interrompido – persiana parada.",
      akrpm: "Os motores indicam a velocidade, por isso o cartão já calcula o tempo ({0} s). Não é preciso calibrar ✔",
      aktm: "A persiana não indicou o fim do percurso. Use o cronómetro manual abaixo.",
      kd: "⬇ Fechar e medir",
      ku: "⬆ Abrir e medir",
      kok: "✔ Chegou",
      kzap: "Guardar este tempo",
      kwyn: "Medido: {0} s",
      opc: "Opções",
      jez: "Idioma do cartão",
      jauto: "auto",
      przyciski: "Botões e posições rápidas",
      niebo: "Céu e tempo lá fora",
      widok: "Vista desenhada: casas, árvores, rua",
      uchwyty: "Puxadores nos perfis inferiores (movem uma folha)",
      uchwyt_srodek: "Puxador central ⇕ (move ambas as folhas)",
      osobno: "Arrastar no vidro move só uma folha",
      odwroc: "Inverter posição (motor conta ao contrário)",
      s_enc: "Persianas e motores",
      s_pog: "Tempo e vista",
      s_okn: "Janela – sensores de contacto",
      uch: "Abertura basculante (para dentro)",
      otw: "Largura de abertura (para dentro)",
      f: {
        entity: "Persiana ou grupo de persianas (esquerda + direita)",
        name: "Nome",
        roleta_lewa: "Persiana da folha esquerda (opcional)",
        roleta_prawa: "Persiana da folha direita (opcional)",
        predkosc_lewa: "Velocidade do motor esquerdo (número, rpm – opcional)",
        predkosc_prawa: "Velocidade do motor direito (número, rpm – opcional)",
        zrodlo: "Fonte do tempo",
        pogoda: "Entidade de tempo (vazio = automático)",
        tlo: "Foto da vista (ex. /local/janela.jpg – ficheiro na pasta www)",
        czujnik_lewe: "Sensor da folha esquerda (ou o único)",
        tryb_lewe: "Aberta, a folha esquerda fica…",
        czujnik_prawe: "Sensor da folha direita",
        tryb_prawe: "Aberta, a folha direita fica…"
      },
      zr: [
        [
          "auto",
          "entidade do HA, se não houver, Internet"
        ],
        [
          "internet",
          "Internet (Open-Meteo, localização da casa)"
        ],
        [
          "brak",
          "sem tempo (céu simples)"
        ]
      ],
      tr: [
        [
          "uchyl",
          "basculante (topo para dentro)"
        ],
        [
          "otworz",
          "aberta (em batente, para dentro)"
        ]
      ],
      osl: "Tipo de cortina",
      osln: [
        "Dia-noite",
        "Estore de rolo",
        "Plissado",
        "Estore romano",
        "Veneziana de alumínio",
        "Persiana com caixa superior",
        "Blackout",
        "Plissado favo de mel",
        "Veneziana de madeira",
        "Persiana de caixa exterior",
        "Persiana de caixa embutida",
        "Persiana perfurada",
        "Veneziana exterior C80",
        "Veneziana exterior Z90",
        "Screen ZIP"
      ],
      d_osl: "Escolha o que tem na janela. O cartão ajusta o tecido, a caixa, as guias e a barra inferior.",
      promienie: "Raios de sol através da janela (de dia, com sol)",
      dzwiek: "Som suave do motor em movimento (após um toque)",
      osld: [
        "Faixas opacas e translúcidas. Deslize-as para deixar passar luz pelas translúcidas.",
        "Um estore de rolo simples em tecido opaco. Difunde a luz.",
        "Tecido denso revestido. Corre em guias laterais brancas e bloqueia a luz.",
        "Tecido dobrado em acordeão.",
        "Plissado duplo. As células guardam o calor.",
        "O tecido recolhe em pregas suaves.",
        "Lâminas finas de alumínio de 25 mm em cordões.",
        "Lâminas largas de madeira de 50 mm em fitas.",
        "Caixa por cima da janela na cor do caixilho, montada com a janela. Lâminas de PVC ou alumínio.",
        "Caixa na parede exterior com frente chanfrada. Boa para casas existentes.",
        "Caixa escondida na parede sob o reboco. Só se veem as lâminas e as guias.",
        "Perfis com pequenos furos. Fechada deixa entrar alguma luz.",
        "Lâminas curvas de alumínio de 80 mm em fitas. Podem orientar-se.",
        "Lâminas planas em Z de 90 mm com vedante. Muito escuro quando fechada.",
        "Tela exterior em guias com fecho de correr. Trava o sol e mantém a vista."
      ],
      osw: "Interior",
      osz: "Exterior",
      urz: "🔗 Esta janela vem da integração Motor HA – cada alteração é guardada automaticamente no dispositivo (tal como «Configurar»)."
    },
    kolory: {
      czarny: "preto",
      grafit: "grafite",
      szary: "cinzento",
      bezowy: "bege",
      kremowy: "creme",
      bialy: "branco",
      braz: "castanho",
      granat: "azul-marinho",
      pomaranczowy: "laranja",
      czerwony: "vermelho",
      bordo: "bordô",
      rozowy: "rosa",
      fiolet: "violeta",
      niebieski: "azul",
      turkus: "turquesa",
      zielony: "verde",
      limonka: "lima",
      zolty: "amarelo",
      oliwka: "azeitona",
      piaskowy: "areia",
      cappuccino: "cappuccino",
      mokka: "moca",
      wenge: "wengué",
      popiel: "cinza",
      srebrny: "prateado",
      stalowy: "aço",
      lawendowy: "lavanda",
      pudrowy: "rosa pó",
      mietowy: "menta",
      blekitny: "azul-céu",
      morski: "azul-petróleo",
      butelkowy: "verde-garrafa",
      musztardowy: "mostarda",
      terakota: "terracota",
      sliwkowy: "ameixa"
    },
    kreator: {
      tytul: "Assistente do cartão",
      krok: "passo {0} de {1}",
      zamknij: "Fechar assistente",
      co: "O quê:",
      poco: "Para quê:",
      wstecz: "← Voltar",
      dalej: "Seguinte →",
      gotowe: "Pronto ✔",
      kroki: {
        roleta: {
          t: "Escolha a sua persiana",
          co: "a persiana ou grupo de persianas que este cartão mostra e controla. Só aparecem persianas – sem portões, portas de garagem ou outros dispositivos.",
          poco: "o cartão envia-lhe ordens (abrir, fechar, definir %) e desenha a sua posição real."
        },
        okno: {
          t: "Janela e folhas",
          co: "quantas folhas tem a janela e que persiana está em cada folha.",
          poco: "cada folha do cartão move-se com a sua persiana real."
        },
        silnik: {
          t: "Velocidade do motor",
          co: "uma entidade com a velocidade do motor (rpm), se o seu motor a indicar (ex. Moes, Tuya). Só aparecem entidades de velocidade.",
          poco: "a animação move-se exatamente à velocidade da persiana real. Sem ela, o cartão aprende o tempo sozinho."
        },
        czujniki: {
          t: "Sensores da janela",
          co: "os sensores de contacto da janela – folha esquerda e direita em separado. Só aparecem sensores de janela, porta e abertura.",
          poco: "quando bascula ou abre a janela, o cartão mostra-o. Este passo é opcional."
        },
        pogoda: {
          t: "Tempo lá fora",
          co: "de onde o cartão tira o tempo.",
          poco: "vê o céu real atrás do vidro: sol, nuvens, chuva, neve, noite e a temperatura."
        },
        wyglad: {
          t: "Aspeto e nome",
          co: "um conjunto pronto de cores de caixilho e estore e o nome no cartão.",
          poco: "para que o cartão se pareça com a sua janela. Pode alterar cada cor mais tarde em 🎨 Aspeto."
        },
        gdzie: {
          t: "Pronto – verificar e guardar",
          co: "um resumo do que o cartão encontrou e onde deve aparecer.",
          poco: "para que nada fique por corrigir. Se for preciso algo, diz o quê e onde."
        }
      },
      najlepsze: "melhor opção",
      auto: "escolhido automaticamente",
      inna: "Outra (só entidades compatíveis)",
      inne: "Entidades compatíveis: {0}. As restantes estão na lista «Outra» abaixo.",
      bez: "Sem sensor",
      niedost: "indisponível",
      otwarte: "aberta",
      zamkniete: "fechada",
      why: {
        grupa: "grupo de persianas",
        poz: "indica posição %",
        czlonek: "do grupo escolhido",
        urz: "mesmo dispositivo",
        pom: "mesma divisão",
        nazwa: "o nome coincide",
        nazwa2: "nome parecido",
        lewa: "«esquerda» no nome",
        prawa: "«direita» no nome",
        okno: "sensor de janela",
        drzwi: "sensor de porta",
        rpm: "unidade rpm",
        typowa: "tempo principal do HA",
        off: "⚠ indisponível"
      },
      znaleziono: "Encontrei {0} persianas compatíveis. As melhores estão no topo.",
      brakRolet: "Ainda não há nenhuma persiana no Home Assistant. Adicione primeiro o motor da persiana: Definições → Dispositivos e serviços → «+ Adicionar integração» (ex. Zigbee2MQTT, ZHA, Tuya, Shelly). Depois volte – o assistente vai encontrá-la.",
      btnIntegr: "Abrir Dispositivos e serviços",
      niedostepna: "«{0}» está indisponível neste momento. Verifique a alimentação e o alcance do motor (Zigbee / Wi-Fi). Pode adicionar o cartão já – vai funcionar quando a persiana voltar.",
      bezPoz: "«{0}» não indica posição em %. O cartão só mostra «aberta / fechada», e arrastar envia abrir ou fechar.",
      grupaOk: "É um grupo de {0} persianas – configurei uma janela de 2 folhas, cada uma com a sua persiana.",
      wybierz: "Escolha uma persiana da lista para continuar.",
      sk1: "1 folha",
      sk2: "2 folhas",
      skL: "Folha esquerda",
      skP: "Folha direita",
      skJ: "Janela",
      jednaNaDwa: "Uma persiana para duas folhas: as duas metades do cartão movem-se juntas. Se cada folha tiver a sua persiana, escolha-as abaixo ou crie um grupo: Definições → Dispositivos e serviços → Auxiliares → «+ Criar auxiliar» → Grupo → Grupo de coberturas.",
      btnPomocnicy: "Abrir Auxiliares",
      rpmOk: "{0}: motor {1} rpm → percurso completo aprox. {2} s",
      rpmBrak: "{0}: o motor não indica a velocidade – não faz mal, o cartão aprende o tempo com os primeiros movimentos.",
      rpmZadnej: "Não há nenhuma entidade de velocidade do motor no HA. É normal na maioria dos motores – o cartão aprende o tempo sozinho. Quer já? Meça-o com o botão abaixo.",
      kal: "🤖 Medir o tempo agora (a persiana sobe → desce → sobe)",
      czBrak: "Não há sensores de janela no HA (sensor binário do tipo janela, porta ou abertura). Pode saltar este passo – o cartão funciona sem eles.",
      czBezPom: "A persiana não tem divisão (área), por isso o assistente não sabe que sensores estão na mesma divisão. Atribua uma divisão ao dispositivo da persiana (Definições → Dispositivos → persiana → ✏️ → Área) para melhores resultados.",
      btnUrz: "Abrir o dispositivo da persiana",
      czAuto: "Sensores escolhidos automaticamente da mesma divisão. Pode escolher outros.",
      tryb: "Quando o sensor indica «aberta», a folha fica:",
      zr: [
        [
          "auto",
          "🔎 Automático"
        ],
        [
          "internet",
          "🌐 Da Internet"
        ],
        [
          "brak",
          "🚫 Sem tempo"
        ]
      ],
      wxTeraz: "Lá fora agora: {0}",
      wxBrak: "Não há integração de tempo no HA – o cartão tira o tempo da Internet (Open-Meteo: grátis, sem conta nem chave) para a localização da sua casa.",
      wxBezLok: "O HA não sabe a localização da sua casa, por isso o tempo da Internet não funciona. Defina-a: Definições → Sistema → Geral → marcador no mapa.",
      btnOgolne: "Abrir definições gerais",
      wxNiedost: "«{0}» está indisponível – verifique a integração de tempo. Até lá o cartão usa o tempo da Internet.",
      wxNic: "Sem tempo, o vidro mostra um céu simples de dia / noite.",
      nazwa: "Nome no cartão (vazio = nome da persiana)",
      wlasny: "🎨 Qualquer cor de uma paleta",
      wlasnyKol: "Cortina",
      wlasnyRam: "Caixilho",
      wlasnyOpis: "Toque no círculo arco-íris e escolha qualquer cor – a pré-visualização muda logo.",
      podglad: "A pré-visualização ao vivo está abaixo – cada alteração aparece logo.",
      jezyk: "O assistente e o cartão falam {0} – como o seu perfil do HA. Altere em ⚙️ Avançado.",
      jezykNazwa: "português",
      pods: "Resumo",
      pRoleta: "Persiana: {0}",
      pSk: "Folhas: {0}",
      pSil: "Motor: {0}",
      pSilU: "Tempo de percurso: o cartão aprende-o",
      pCz: "Sensores da janela: {0}",
      pCzB: "Sensores da janela: nenhum (tudo bem, são opcionais)",
      pWx: "Tempo: {0}",
      pWxI: "Tempo: da Internet (Open-Meteo)",
      pWxB: "Tempo: desligado",
      pWyg: "Aspeto: caixilho – {0}, faixas – {1}",
      gdzieT: "Onde vai o cartão",
      tutaj: "O cartão vai para a vista que está a editar. Clique em «Guardar» no fundo desta janela – pronto.",
      tez: "Quer também noutro painel? Escolha painel e vista – adiciono lá uma cópia de imediato.",
      panel: "Painel",
      widok: "Vista",
      nowyWidok: "➕ Nova vista «Persianas»",
      nowyTytul: "Persianas",
      dodaj: "Adicionar lá uma cópia",
      dodano: "Adicionado ✔ {0} → {1}",
      blad: "Falhou: {0}",
      bezAdmina: "Adicionar cartões a outros painéis requer uma conta de administrador do HA.",
      domyslny: "Visão geral (predefinido)",
      tenPanel: " (este – só «Guardar»)",
      autoPanel: " (automático – não é possível)",
      yaml: " (YAML – só manual)",
      widokPanel: " (painel – só 1 cartão)",
      wczytuje: "A carregar painéis…",
      verOk: "Cartão instalado corretamente – tem a versão mais recente.",
      verNowa: "Há uma versão mais recente do Motor HA. Atualize em Definições → Atualizações e depois recarregue a página.",
      btnHacs: "Abrir HACS",
      btnPrzeladuj: "🔄 Recarregar página",
      zasobyDup: "O cartão está adicionado {0} vezes em Recursos. Deixe só uma entrada (Definições → Painéis → ⋮ → Recursos), senão versões antigas e novas podem misturar-se.",
      btnZasoby: "Abrir Recursos",
      obr: "rpm"
    }
  };

  // translations/zh-hans.json
  var zh_hans_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "带日夜帘的逼真窗户：按电机速度播放动画、拖动即可移动、窗外显示真实天气，并附带新手向导",
      open: "打开",
      closed: "关闭",
      opening: "正在打开…",
      closing: "正在关闭…",
      unavailable: "不可用",
      unknown: "未知",
      czesc: "部分关闭",
      up: "打开",
      stop: "停止",
      down: "关闭",
      brak: "未找到实体",
      okno: "窗户",
      lewe: "左",
      prawe: "右",
      otw: "打开",
      uchyl: "内倒",
      oba: "两扇",
      wx: {
        sunny: "晴",
        "clear-night": "晴朗",
        partlycloudy: "多云间晴",
        cloudy: "多云",
        exceptional: "异常",
        fog: "雾",
        rainy: "雨",
        pouring: "暴雨",
        hail: "冰雹",
        lightning: "闪电",
        "lightning-rainy": "雷雨",
        snowy: "雪",
        "snowy-rainy": "雨夹雪",
        windy: "有风",
        "windy-variant": "有风、多云"
      }
    },
    edytor: {
      pv: "实时预览 – 不会移动真实的卷帘",
      play: "▶ 播放动画",
      wxl: [
        "实际",
        "☀️ 晴",
        "⛅ 间晴",
        "☁️ 多云",
        "🌧️ 雨",
        "💧 暴雨",
        "⛈️ 雷雨",
        "❄️ 雪",
        "🌫️ 雾",
        "💨 风",
        "🌙 夜"
      ],
      kol: "条纹颜色",
      ram: "窗框颜色",
      own: "自定义",
      sk: "窗扇",
      sk1: "1 扇",
      sk2: "2 扇",
      pin: "将预览固定在顶部",
      okp: [
        "🪟 关闭",
        "↘ 内倒",
        "↔ 打开"
      ],
      d_kol: "遮光条纹的颜色，如日夜帘系列；“自定义”= 任意颜色。",
      d_sia: "透光条纹的颜色。“同遮光”= 条纹颜色的浅色调。",
      d_ram: "窗框和窗扇的颜色。带纹理的颜色是仿木饰面。",
      d_sk: "窗扇数量。两扇时，每扇可以有自己的帘子。",
      d_okn: "当门窗传感器报告窗户打开时显示。移动滑块可在预览中查看。",
      d_kr: "▲ 和 ▼ 按钮会让卷帘移动一小步。快捷位置是百分比按钮。",
      sl: "窗扇之间的中梃",
      sl1: "固定",
      sl2: "活动",
      slh: "固定中梃留在窗框中。活动中梃属于左窗扇 – 两扇都打开时中间是空的。",
      roz: "尺寸和速度",
      wys: "窗户高度",
      auto: "根据电机转速计算行程时间（自动）",
      czas: "完整行程时间（手动）",
      obr: "电机转速：{0} rpm → 完整行程约 {1} 秒",
      obr0: "此卷帘不报告电机转速",
      obrA: " – 假定为 30 秒（卡片会自己学习，或使用校准）。",
      obrU: " – 已学到的行程时间：{0} 秒。",
      obrM: "（在 Moes 电机上测得）",
      kal: "行程时间校准",
      kalh: "手动秒表：点击后，在卷帘到达尽头时按“已到达”。最好从全开到全关。",
      sia: "透光条纹颜色",
      siaj: "同遮光",
      poz: "快捷位置（百分比，用逗号分隔，100 = 打开）",
      sec_wyg: "🎨 外观",
      sec_okn: "🪟 窗户",
      sec_ruch: "⏱ 运动和校准",
      sec_zaaw: "⚙️ 高级",
      rst: "↺ 恢复默认",
      wz: "🪄 向导",
      pre: [
        "现代（炭灰 + 石墨）",
        "经典木色（金橡木 + 米色）",
        "北欧（白色 + 奶油色）",
        "深色（黑色 + 黑色条纹）",
        "暖胡桃（胡桃木 + 沙色）",
        "多彩（白色 + 青绿）"
      ],
      glob: "🌍 全局设置",
      globh: "将此外观（颜色、窗框、窗户、按钮、选项）保存为所有卷帘卡片（包括新卡片）的默认设置。每张卡片仍可单独修改。",
      gSave: "🌍 保存为所有卡片的默认设置",
      gClr: "清除",
      gIle: "已全局保存：{0} 项设置。所有卡片都会使用。",
      gBrak: "没有全局设置 – 卡片使用默认值。",
      wibracja: "点击时手机轻微振动",
      auto_czujniki: "自动查找此房间里的窗户门磁传感器",
      czA: "🔎 自动检测到（左 / 右）：{0}。上方的手动选择优先。",
      czA0: "🔎 这个卷帘所在房间里没有找到门磁传感器 – 如果有，请在上方选择。",
      klamki: "窗户把手（内倒或打开时会转动）",
      kr: "步进移动",
      krs: "点一下 ▲/▼ 卷帘移动",
      kr0: "关闭",
      ak: "🤖 自动校准",
      akx: "■ 中止",
      akh: "注意：这会移动真实的卷帘。它会完全升起、完全降下再升起。卡片会测量时间并保存。",
      ak0: "卷帘正在升到顶部…",
      ak1: "正在计时关闭… {0} 秒",
      ak2: "关闭：{0} 秒。正在计时打开… {1} 秒",
      akok: "完成 ✔ 已保存行程时间 {0} 秒",
      akstop: "已中止 – 卷帘已停止。",
      akrpm: "电机会报告转速，所以卡片已经计算出时间（{0} 秒）。无需校准 ✔",
      aktm: "卷帘没有报告行程结束。请使用下方的手动秒表。",
      kd: "⬇ 关闭并计时",
      ku: "⬆ 打开并计时",
      kok: "✔ 已到达",
      kzap: "保存此时间",
      kwyn: "测得：{0} 秒",
      opc: "选项",
      jez: "卡片语言",
      jauto: "自动",
      przyciski: "按钮和快捷位置",
      niebo: "窗外天空和天气",
      widok: "绘制的景色：房屋、树木、街道",
      uchwyty: "底部横杆上的把手（移动一扇）",
      uchwyt_srodek: "中间把手 ⇕（同时移动两扇）",
      osobno: "在玻璃上拖动只移动一扇",
      odwroc: "反转位置（电机反向计数）",
      s_enc: "卷帘和电机",
      s_pog: "天气和景色",
      s_okn: "窗户 – 门磁传感器",
      uch: "内倒幅度（向内）",
      otw: "打开宽度（向内）",
      f: {
        entity: "卷帘或卷帘组（左 + 右）",
        name: "名称",
        roleta_lewa: "左窗扇卷帘（可选）",
        roleta_prawa: "右窗扇卷帘（可选）",
        predkosc_lewa: "左电机转速（数字，rpm – 可选）",
        predkosc_prawa: "右电机转速（数字，rpm – 可选）",
        zrodlo: "天气来源",
        pogoda: "天气实体（留空 = 自动）",
        tlo: "景色照片（例如 /local/window.jpg – www 文件夹中的文件）",
        czujnik_lewe: "左窗扇门磁传感器（或唯一的一个）",
        tryb_lewe: "打开时，左窗扇是…",
        czujnik_prawe: "右窗扇门磁传感器",
        tryb_prawe: "打开时，右窗扇是…"
      },
      zr: [
        [
          "auto",
          "HA 实体，没有则用网络"
        ],
        [
          "internet",
          "网络（Open-Meteo，家的位置）"
        ],
        [
          "brak",
          "无天气（纯色天空）"
        ]
      ],
      tr: [
        [
          "uchyl",
          "内倒（上部向内）"
        ],
        [
          "otworz",
          "平开（铰链，向内）"
        ]
      ],
      osl: "遮阳类型",
      osln: [
        "日夜帘",
        "布艺卷帘",
        "风琴帘",
        "罗马帘",
        "铝百叶",
        "上置卷帘窗",
        "遮光帘",
        "蜂巢帘",
        "木百叶",
        "外挂式卷帘窗",
        "暗装卷帘窗",
        "穿孔卷帘窗",
        "外遮阳百叶 C80",
        "外遮阳百叶 Z90",
        "Screen ZIP 拉链帘"
      ],
      d_osl: "选择你窗户上的类型。卡片会匹配面料、帘盒、侧轨和底杆。",
      promienie: "阳光透过窗户（白天、晴天时）",
      dzwiek: "移动时轻微的电机声（点击后）",
      osld: [
        "遮光条纹和透光条纹。滑动它们让光线从透光条纹透过。",
        "简单的全遮布艺卷帘。可以柔化光线。",
        "致密涂层面料。在白色侧轨中运行并挡住光线。",
        "像手风琴一样折叠的面料。",
        "双层风琴帘。蜂巢格能保暖。",
        "面料收拢成柔和的褶皱。",
        "细 25 毫米铝叶片，用拉绳。",
        "宽 50 毫米木叶片，用梯带。",
        "窗户上方与窗框同色的帘盒，随窗户一起安装。帘片为 PVC 或铝型材。",
        "外墙上带斜面的帘盒。适合已建成的房子。",
        "藏在墙内抹灰下的帘盒。只看得到帘片和导轨。",
        "带小孔的型材。关闭时仍有少量光线进入。",
        "弧形 80 毫米铝叶片，用带子。可以调角度。",
        "平直 Z 形 90 毫米叶片，带密封条。关闭时非常暗。",
        "室外网布，装在带拉链的侧轨中。挡住阳光，保留视野。"
      ],
      osw: "室内",
      osz: "室外",
      urz: "🔗 这扇窗户来自 Motor HA 集成 – 每次更改都会自动保存到设备（与“配置”相同）。"
    },
    kolory: {
      czarny: "黑色",
      grafit: "石墨",
      szary: "灰色",
      bezowy: "米色",
      kremowy: "奶油色",
      bialy: "白色",
      braz: "棕色",
      granat: "海军蓝",
      pomaranczowy: "橙色",
      czerwony: "红色",
      bordo: "酒红",
      rozowy: "粉色",
      fiolet: "紫色",
      niebieski: "蓝色",
      turkus: "青绿",
      zielony: "绿色",
      limonka: "青柠",
      zolty: "黄色",
      oliwka: "橄榄",
      piaskowy: "沙色",
      cappuccino: "卡布奇诺",
      mokka: "摩卡",
      wenge: "鸡翅木",
      popiel: "灰烬色",
      srebrny: "银色",
      stalowy: "钢蓝",
      lawendowy: "薰衣草",
      pudrowy: "粉扑色",
      mietowy: "薄荷",
      blekitny: "天蓝",
      morski: "水鸭蓝",
      butelkowy: "瓶绿",
      musztardowy: "芥末黄",
      terakota: "陶土色",
      sliwkowy: "梅子色"
    },
    kreator: {
      tytul: "卡片向导",
      krok: "第 {0} 步，共 {1} 步",
      zamknij: "关闭向导",
      co: "内容：",
      poco: "用途：",
      wstecz: "← 上一步",
      dalej: "下一步 →",
      gotowe: "完成 ✔",
      kroki: {
        roleta: {
          t: "选择你的卷帘",
          co: "这张卡片显示和控制的卷帘或卷帘组。只列出卷帘 – 不含大门、车库门或其他设备。",
          poco: "卡片向它发送指令（打开、关闭、设置 %），并画出它的真实位置。"
        },
        okno: {
          t: "窗户和窗扇",
          co: "窗户有几扇，以及哪个卷帘挂在哪一扇上。",
          poco: "卡片上的每一扇都会随它的真实卷帘一起移动。"
        },
        silnik: {
          t: "电机转速",
          co: "电机转速（rpm）实体，如果你的电机会报告（例如 Moes、Tuya）。只列出转速实体。",
          poco: "动画会严格按照真实卷帘的速度移动。没有它，卡片会自己学习时间。"
        },
        czujniki: {
          t: "窗户传感器",
          co: "窗户的门磁传感器 – 左右窗扇分开。只列出窗户、门和开口类传感器。",
          poco: "你内倒或打开窗户时，卡片会显示出来。此步骤可选。"
        },
        pogoda: {
          t: "室外天气",
          co: "卡片从哪里获取天气。",
          poco: "你会在玻璃后看到真实的天空：太阳、云、雨、雪、夜晚和温度。"
        },
        wyglad: {
          t: "外观和名称",
          co: "一套现成的窗框和帘子配色，以及卡片上的名称。",
          poco: "让卡片看起来像你的窗户。以后可以在 🎨 外观 中修改每种颜色。"
        },
        gdzie: {
          t: "完成 – 检查并保存",
          co: "卡片找到的内容摘要，以及它应该出现在哪里。",
          poco: "确保没有遗留问题。如果需要做什么，它会告诉你做什么、在哪里做。"
        }
      },
      najlepsze: "最佳匹配",
      auto: "自动选择",
      inna: "其他（仅匹配的实体）",
      inne: "匹配的实体：{0}。其余的在下方“其他”列表中。",
      bez: "无传感器",
      niedost: "不可用",
      otwarte: "打开",
      zamkniete: "关闭",
      why: {
        grupa: "卷帘组",
        poz: "报告位置 %",
        czlonek: "来自所选组",
        urz: "同一设备",
        pom: "同一房间",
        nazwa: "名称匹配",
        nazwa2: "名称相似",
        lewa: "名称含“左”",
        prawa: "名称含“右”",
        okno: "窗户传感器",
        drzwi: "门传感器",
        rpm: "单位 rpm",
        typowa: "HA 主要天气",
        off: "⚠ 不可用"
      },
      znaleziono: "找到 {0} 个匹配的卷帘。最合适的在最上面。",
      brakRolet: "Home Assistant 中还没有卷帘。请先添加卷帘电机：设置 → 设备与服务 → “+ 添加集成”（例如 Zigbee2MQTT、ZHA、Tuya、Shelly）。然后回来 – 向导会找到它。",
      btnIntegr: "打开设备与服务",
      niedostepna: "“{0}”现在不可用。请检查电机的供电和信号（Zigbee / Wi-Fi）。你现在就可以添加卡片 – 卷帘恢复后就能工作。",
      bezPoz: "“{0}”不报告百分比位置。卡片只会显示“打开 / 关闭”，拖动会发送打开或关闭。",
      grupaOk: "这是一个包含 {0} 个卷帘的组 – 我设置成了双扇窗，每扇有自己的卷帘。",
      wybierz: "从列表中选择一个卷帘以继续。",
      sk1: "1 扇",
      sk2: "2 扇",
      skL: "左窗扇",
      skP: "右窗扇",
      skJ: "窗户",
      jednaNaDwa: "一个卷帘用于两扇：卡片上的两半会一起移动。如果每扇都有自己的卷帘，请在下方选择，或创建一个组：设置 → 设备与服务 → 辅助元素 → “+ 创建辅助元素” → 组 → 窗帘组。",
      btnPomocnicy: "打开辅助元素",
      rpmOk: "{0}：电机 {1} rpm → 完整行程约 {2} 秒",
      rpmBrak: "{0}：电机不报告转速 – 没关系，卡片会从最初几次移动中学习行程时间。",
      rpmZadnej: "HA 中没有电机转速实体。大多数电机都是这样 – 卡片会自己学习行程时间。想现在就设置？用下面的按钮测量。",
      kal: "🤖 现在测量时间（卷帘上升 → 下降 → 上升）",
      czBrak: "HA 中没有窗户传感器（窗户、门或开口类型的二元传感器）。可以跳过此步骤 – 卡片没有它们也能工作。",
      czBezPom: "卷帘没有房间（区域），所以向导无法判断哪些传感器在同一个房间。请为卷帘设备分配区域（设置 → 设备 → 卷帘 → ✏️ → 区域）以获得更好的匹配。",
      btnUrz: "打开卷帘设备",
      czAuto: "已从同一房间自动选择传感器。你也可以选择其他的。",
      tryb: "传感器报告“打开”时，窗扇是：",
      zr: [
        [
          "auto",
          "🔎 自动"
        ],
        [
          "internet",
          "🌐 来自网络"
        ],
        [
          "brak",
          "🚫 无天气"
        ]
      ],
      wxTeraz: "现在室外：{0}",
      wxBrak: "HA 中没有天气集成 – 卡片从网络获取你家位置的天气（Open-Meteo：免费，无需账号或密钥）。",
      wxBezLok: "HA 不知道你家的位置，所以网络天气无法使用。请设置：设置 → 系统 → 常规 → 在地图上放置图钉。",
      btnOgolne: "打开常规设置",
      wxNiedost: "“{0}”不可用 – 请检查天气集成。修复前卡片会使用网络天气。",
      wxNic: "没有天气时，玻璃显示简单的白天 / 夜晚天空。",
      nazwa: "卡片上的名称（留空 = 卷帘名称）",
      wlasny: "🎨 调色板中的任意颜色",
      wlasnyKol: "遮阳",
      wlasnyRam: "窗框",
      wlasnyOpis: "点击彩虹圆圈并选择任意颜色 – 预览会立即改变。",
      podglad: "实时预览在下方 – 每次更改都会立即显示。",
      jezyk: "向导和卡片使用 {0} – 与你的 HA 个人资料相同。可在 ⚙️ 高级 中更改。",
      jezykNazwa: "简体中文",
      pods: "摘要",
      pRoleta: "卷帘：{0}",
      pSk: "窗扇：{0}",
      pSil: "电机：{0}",
      pSilU: "行程时间：卡片会学习",
      pCz: "窗户传感器：{0}",
      pCzB: "窗户传感器：无（没关系，它们是可选的）",
      pWx: "天气：{0}",
      pWxI: "天气：来自网络（Open-Meteo）",
      pWxB: "天气：关闭",
      pWyg: "外观：窗框 – {0}，条纹 – {1}",
      gdzieT: "卡片放在哪里",
      tutaj: "卡片会放在你正在编辑的视图中。点击此对话框底部的“保存” – 完成。",
      tez: "也想放到其他仪表盘？选择仪表盘和视图 – 我会立即在那里添加一份副本。",
      panel: "仪表盘",
      widok: "视图",
      nowyWidok: "➕ 新视图“卷帘”",
      nowyTytul: "卷帘",
      dodaj: "在那里添加副本",
      dodano: "已添加 ✔ {0} → {1}",
      blad: "失败：{0}",
      bezAdmina: "将卡片添加到其他仪表盘需要 HA 管理员账户。",
      domyslny: "概览（默认）",
      tenPanel: "（当前 – 只需“保存”）",
      autoPanel: "（自动 – 不可用）",
      yaml: "（YAML – 仅手动）",
      widokPanel: "（面板 – 仅 1 张卡片）",
      wczytuje: "正在加载仪表盘…",
      verOk: "卡片安装正确 – 你使用的是最新版本。",
      verNowa: "Motor HA 有新版本。请在 设置 → 更新 中更新，然后重新加载页面。",
      btnHacs: "打开 HACS",
      btnPrzeladuj: "🔄 重新加载页面",
      zasobyDup: "卡片在资源中被添加了 {0} 次。只保留一条（设置 → 仪表盘 → ⋮ → 资源），否则新旧版本可能混在一起。",
      btnZasoby: "打开资源",
      obr: "rpm"
    }
  };

  // translations/ja.json
  var ja_default = {
    karta: {
      nazwaKarty: "Motor HA",
      opisKarty: "調光ロールスクリーン付きのリアルな窓：モーター速度のアニメーション、ドラッグで操作、外は実際の天気、初心者向けウィザード付き",
      open: "開",
      closed: "閉",
      opening: "開いています…",
      closing: "閉じています…",
      unavailable: "利用不可",
      unknown: "不明",
      czesc: "一部閉",
      up: "開く",
      stop: "停止",
      down: "閉じる",
      brak: "エンティティが見つかりません",
      okno: "窓",
      lewe: "左",
      prawe: "右",
      otw: "開",
      uchyl: "内倒し",
      oba: "両方の窓",
      wx: {
        sunny: "晴れ",
        "clear-night": "快晴",
        partlycloudy: "晴れ時々曇り",
        cloudy: "曇り",
        exceptional: "異常",
        fog: "霧",
        rainy: "雨",
        pouring: "大雨",
        hail: "ひょう",
        lightning: "雷",
        "lightning-rainy": "雷雨",
        snowy: "雪",
        "snowy-rainy": "みぞれ",
        windy: "強風",
        "windy-variant": "強風、曇り"
      }
    },
    edytor: {
      pv: "ライブプレビュー – 実際のシャッターは動きません",
      play: "▶ アニメーションを表示",
      wxl: [
        "実際",
        "☀️ 晴れ",
        "⛅ 時々曇り",
        "☁️ 曇り",
        "🌧️ 雨",
        "💧 大雨",
        "⛈️ 雷雨",
        "❄️ 雪",
        "🌫️ 霧",
        "💨 風",
        "🌙 夜"
      ],
      kol: "ストライプの色",
      ram: "窓枠の色",
      own: "カスタム",
      sk: "窓の枚数",
      sk1: "1 枚",
      sk2: "2 枚",
      pin: "プレビューを上部に固定",
      okp: [
        "🪟 閉",
        "↘ 内倒し",
        "↔ 開"
      ],
      d_kol: "調光ロールスクリーンのコレクションのような、遮光ストライプの色。「カスタム」= 任意の色。",
      d_sia: "透過ストライプの色。「遮光と同じ」= ストライプの色の明るい色合い。",
      d_ram: "窓枠と窓の色。木目のある色は木目調シートです。",
      d_sk: "窓の枚数。2 枚なら、それぞれに専用のスクリーンを付けられます。",
      d_okn: "開閉センサーが窓の開を報告したときに表示されます。スライダーを動かすとプレビューで確認できます。",
      d_kr: "▲ と ▼ ボタンでシャッターが少しずつ動きます。クイック位置はパーセントのボタンです。",
      sl: "窓の間の方立",
      sl1: "固定",
      sl2: "可動",
      slh: "固定の方立は窓枠に残ります。可動の方立は左の窓の一部で、両方開けると中央が空きます。",
      roz: "サイズと速度",
      wys: "窓の高さ",
      auto: "モーター回転数から移動時間（自動）",
      czas: "全行程の時間（手動）",
      obr: "モーター回転数：{0} rpm → 全行程 約 {1} 秒",
      obr0: "このシャッターはモーター回転数を報告しません",
      obrA: " – 30 秒と仮定します（カードが学習するか、校正を使ってください）。",
      obrU: " – 学習した移動時間：{0} 秒。",
      obrM: "（Moes モーターで測定）",
      kal: "移動時間の校正",
      kalh: "手動ストップウォッチ：クリックして、シャッターが端に着いたら「到着」を押します。全開から全閉で測るのが最適です。",
      sia: "透過ストライプの色",
      siaj: "遮光と同じ",
      poz: "クイック位置（パーセント、カンマ区切り、100 = 開）",
      sec_wyg: "🎨 見た目",
      sec_okn: "🪟 窓",
      sec_ruch: "⏱ 動作と校正",
      sec_zaaw: "⚙️ 詳細",
      rst: "↺ 初期値に戻す",
      wz: "🪄 ウィザード",
      pre: [
        "モダン（アンスラサイト + グラファイト）",
        "クラシックウッド（ゴールデンオーク + ベージュ）",
        "北欧（ホワイト + クリーム）",
        "ダーク（ブラック + 黒ストライプ）",
        "あたたかいウォールナット（ウォールナット + サンド）",
        "カラフル（ホワイト + ターコイズ）"
      ],
      glob: "🌍 全体設定",
      globh: "この見た目（色、窓枠、窓、ボタン、オプション）を、新しいものも含むすべてのシャッターカードの初期値として保存します。各カードで変更もできます。",
      gSave: "🌍 すべてのカードの初期値として保存",
      gClr: "クリア",
      gIle: "全体に保存済み：{0} 件の設定。すべてのカードで使われます。",
      gBrak: "全体設定なし – カードは初期値を使います。",
      wibracja: "タップ時にスマホを軽く振動",
      auto_czujniki: "この部屋の窓の開閉センサーを自動で探す",
      czA: "🔎 自動検出（左 / 右）：{0}。上の手動選択が優先されます。",
      czA0: "🔎 このシャッターの部屋に開閉センサーが見つかりません – お持ちなら上で選んでください。",
      klamki: "窓のハンドル（内倒しや開閉時に回転）",
      kr: "ステップ移動",
      krs: "▲/▼ を 1 回タップでシャッターが動く量",
      kr0: "オフ",
      ak: "🤖 自動で校正",
      akx: "■ 中止",
      akh: "注意：実際のシャッターが動きます。全開、全閉、また全開と動きます。カードが時間を測って保存します。",
      ak0: "シャッターを上まで上げています…",
      ak1: "閉じる時間を計測中… {0} 秒",
      ak2: "閉：{0} 秒。開く時間を計測中… {1} 秒",
      akok: "完了 ✔ 移動時間 {0} 秒を保存しました",
      akstop: "中止 – シャッターを停止しました。",
      akrpm: "モーターが回転数を報告するので、カードはすでに時間を計算しています（{0} 秒）。校正は不要です ✔",
      aktm: "シャッターが移動の終わりを報告しませんでした。下の手動ストップウォッチを使ってください。",
      kd: "⬇ 閉じて計測",
      ku: "⬆ 開けて計測",
      kok: "✔ 到着",
      kzap: "この時間を保存",
      kwyn: "測定値：{0} 秒",
      opc: "オプション",
      jez: "カードの言語",
      jauto: "自動",
      przyciski: "ボタンとクイック位置",
      niebo: "外の空と天気",
      widok: "描かれた景色：家、木、通り",
      uchwyty: "下のバーのハンドル（1 枚を動かす）",
      uchwyt_srodek: "中央ハンドル ⇕（両方を動かす）",
      osobno: "ガラスをドラッグすると 1 枚だけ動く",
      odwroc: "位置を反転（モーターが逆にカウント）",
      s_enc: "シャッターとモーター",
      s_pog: "天気と景色",
      s_okn: "窓 – 開閉センサー",
      uch: "内倒しの幅（内側へ）",
      otw: "開く幅（内側へ）",
      f: {
        entity: "シャッターまたはシャッターグループ（左 + 右）",
        name: "名前",
        roleta_lewa: "左の窓のシャッター（任意）",
        roleta_prawa: "右の窓のシャッター（任意）",
        predkosc_lewa: "左モーターの回転数（数値、rpm – 任意）",
        predkosc_prawa: "右モーターの回転数（数値、rpm – 任意）",
        zrodlo: "天気の取得元",
        pogoda: "天気エンティティ（空欄 = 自動）",
        tlo: "景色の写真（例：/local/window.jpg – www フォルダー内のファイル）",
        czujnik_lewe: "左の窓の開閉センサー（または唯一のもの）",
        tryb_lewe: "開いたとき、左の窓は…",
        czujnik_prawe: "右の窓の開閉センサー",
        tryb_prawe: "開いたとき、右の窓は…"
      },
      zr: [
        [
          "auto",
          "HA エンティティ、なければインターネット"
        ],
        [
          "internet",
          "インターネット（Open-Meteo、自宅の位置）"
        ],
        [
          "brak",
          "天気なし（シンプルな空）"
        ]
      ],
      tr: [
        [
          "uchyl",
          "内倒し（上部が内側へ）"
        ],
        [
          "otworz",
          "開（ヒンジで内側へ）"
        ]
      ],
      osl: "シェードの種類",
      osln: [
        "調光ロールスクリーン",
        "ロールスクリーン",
        "プリーツスクリーン",
        "シェード（ローマン）",
        "アルミブラインド",
        "上部ボックス付きシャッター",
        "遮光スクリーン",
        "ハニカムスクリーン",
        "木製ブラインド",
        "外付けシャッター",
        "埋め込みシャッター",
        "パンチングシャッター",
        "外付けブラインド C80",
        "外付けブラインド Z90",
        "Screen ZIP"
      ],
      d_osl: "窓に付いているものを選んでください。カードが生地、ボックス、サイドレール、ボトムバーを合わせます。",
      promienie: "窓から差し込む日差し（昼間、晴れのとき）",
      dzwiek: "動作中の静かなモーター音（タップ後）",
      osld: [
        "遮光と透過のストライプ。ずらすと透過ストライプから光が入ります。",
        "遮光生地のシンプルなロールスクリーン。光をやわらげます。",
        "目の詰まったコーティング生地。白いサイドレールを走り、光を遮ります。",
        "アコーディオンのように折りたたまれた生地。",
        "ダブルプリーツ。ハニカム構造が暖かさを保ちます。",
        "生地がやわらかいひだにまとまります。",
        "コードで吊った 25 mm の薄いアルミスラット。",
        "テープで吊った 50 mm の幅広い木製スラット。",
        "窓の上に窓枠と同色のボックス、窓と一緒に取り付け。PVC またはアルミのスラット。",
        "外壁に付ける面取り前面のボックス。既存の家に最適。",
        "壁の中、しっくいの下に隠したボックス。見えるのはスラットとレールだけ。",
        "小さな穴のあるスラット。閉じても少し光が入ります。",
        "テープで吊った 80 mm の湾曲アルミスラット。角度を変えられます。",
        "シール付きの 90 mm 平らな Z 形スラット。閉じるととても暗くなります。",
        "ファスナー付きサイドレールの屋外メッシュ。日差しを遮り、眺めは残ります。"
      ],
      osw: "室内",
      osz: "屋外",
      urz: "🔗 この窓は Motor HA 統合から来ています – 変更はすべて自動でデバイスに保存されます（「設定」と同じ）。"
    },
    kolory: {
      czarny: "ブラック",
      grafit: "グラファイト",
      szary: "グレー",
      bezowy: "ベージュ",
      kremowy: "クリーム",
      bialy: "ホワイト",
      braz: "ブラウン",
      granat: "ネイビー",
      pomaranczowy: "オレンジ",
      czerwony: "レッド",
      bordo: "ボルドー",
      rozowy: "ピンク",
      fiolet: "パープル",
      niebieski: "ブルー",
      turkus: "ターコイズ",
      zielony: "グリーン",
      limonka: "ライム",
      zolty: "イエロー",
      oliwka: "オリーブ",
      piaskowy: "サンド",
      cappuccino: "カプチーノ",
      mokka: "モカ",
      wenge: "ウェンジ",
      popiel: "アッシュ",
      srebrny: "シルバー",
      stalowy: "スチール",
      lawendowy: "ラベンダー",
      pudrowy: "パウダーピンク",
      mietowy: "ミント",
      blekitny: "スカイブルー",
      morski: "ティール",
      butelkowy: "ボトルグリーン",
      musztardowy: "マスタード",
      terakota: "テラコッタ",
      sliwkowy: "プラム"
    },
    kreator: {
      tytul: "カードウィザード",
      krok: "ステップ {0}/{1}",
      zamknij: "ウィザードを閉じる",
      co: "内容：",
      poco: "目的：",
      wstecz: "← 戻る",
      dalej: "次へ →",
      gotowe: "完了 ✔",
      kroki: {
        roleta: {
          t: "シャッターを選ぶ",
          co: "このカードが表示・操作するシャッターまたはシャッターグループ。シャッターのみ表示 – 門、ガレージ、その他の機器は出ません。",
          poco: "カードがコマンド（開く、閉じる、% 設定）を送り、実際の位置を描きます。"
        },
        okno: {
          t: "窓と枚数",
          co: "窓が何枚か、どのシャッターがどの窓に付いているか。",
          poco: "カードの各窓が、実際のシャッターと一緒に動きます。"
        },
        silnik: {
          t: "モーター回転数",
          co: "モーターが報告する場合（例：Moes、Tuya）の回転数（rpm）エンティティ。回転数のエンティティのみ表示。",
          poco: "アニメーションが実際のシャッターとまったく同じ速さで動きます。なければカードが自分で時間を学習します。"
        },
        czujniki: {
          t: "窓のセンサー",
          co: "窓の開閉センサー – 左右別々に。窓、ドア、開口部のセンサーのみ表示。",
          poco: "窓を内倒しや開にすると、カードに表示されます。このステップは任意です。"
        },
        pogoda: {
          t: "外の天気",
          co: "カードがどこから天気を取るか。",
          poco: "ガラスの向こうに本物の空が見えます：太陽、雲、雨、雪、夜、そして気温。"
        },
        wyglad: {
          t: "見た目と名前",
          co: "窓枠とスクリーンの色のセット、カードに表示する名前。",
          poco: "カードをあなたの窓に似せるため。どの色もあとで 🎨 見た目 で変更できます。"
        },
        gdzie: {
          t: "完了 – 確認して保存",
          co: "カードが見つけた内容の要約と、どこに表示するか。",
          poco: "直すものが残らないように。やることがあれば、何をどこでするか表示します。"
        }
      },
      najlepsze: "最適",
      auto: "自動選択",
      inna: "その他（一致するエンティティのみ）",
      inne: "一致するエンティティ：{0}。残りは下の「その他」リストにあります。",
      bez: "センサーなし",
      niedost: "利用不可",
      otwarte: "開",
      zamkniete: "閉",
      why: {
        grupa: "シャッターグループ",
        poz: "位置 % を報告",
        czlonek: "選んだグループから",
        urz: "同じデバイス",
        pom: "同じ部屋",
        nazwa: "名前が一致",
        nazwa2: "似た名前",
        lewa: "名前に「左」",
        prawa: "名前に「右」",
        okno: "窓センサー",
        drzwi: "ドアセンサー",
        rpm: "単位 rpm",
        typowa: "HA のメイン天気",
        off: "⚠ 利用不可"
      },
      znaleziono: "一致するシャッターが {0} 件見つかりました。おすすめが上にあります。",
      brakRolet: "Home Assistant にまだシャッターがありません。まずシャッターのモーターを追加してください：設定 → デバイスとサービス → 「+ 統合を追加」（例：Zigbee2MQTT、ZHA、Tuya、Shelly）。その後戻ってくれば、ウィザードが見つけます。",
      btnIntegr: "デバイスとサービスを開く",
      niedostepna: "「{0}」は現在利用できません。モーターの電源と通信範囲（Zigbee / Wi-Fi）を確認してください。カードは今追加できます – シャッターが戻れば動きます。",
      bezPoz: "「{0}」は % の位置を報告しません。カードは「開 / 閉」のみ表示し、ドラッグで開くか閉じるを送ります。",
      grupaOk: "これは {0} 台のシャッターのグループです – 2 枚の窓に設定し、それぞれに専用のシャッターを割り当てました。",
      wybierz: "続けるにはリストからシャッターを選んでください。",
      sk1: "1 枚",
      sk2: "2 枚",
      skL: "左の窓",
      skP: "右の窓",
      skJ: "窓",
      jednaNaDwa: "1 台のシャッターで 2 枚の窓：カードの両側が一緒に動きます。各窓に専用のシャッターがあれば、下で選ぶかグループを作成してください：設定 → デバイスとサービス → ヘルパー → 「+ ヘルパーを作成」 → グループ → カバーグループ。",
      btnPomocnicy: "ヘルパーを開く",
      rpmOk: "{0}：モーター {1} rpm → 全行程 約 {2} 秒",
      rpmBrak: "{0}：モーターは回転数を報告しません – 問題ありません。カードが最初の数回の動きから移動時間を学習します。",
      rpmZadnej: "HA にモーター回転数のエンティティがありません。多くのモーターでは普通のことです – カードが自分で移動時間を学習します。今すぐ設定したい場合は、下のボタンで測ってください。",
      kal: "🤖 今すぐ時間を測る（シャッターが上 → 下 → 上）",
      czBrak: "HA に窓のセンサー（窓、ドア、開口部タイプのバイナリセンサー）がありません。このステップは飛ばせます – センサーがなくてもカードは動きます。",
      czBezPom: "シャッターに部屋（エリア）が設定されていないため、同じ部屋のセンサーを判断できません。シャッターのデバイスにエリアを割り当てると（設定 → デバイス → シャッター → ✏️ → エリア）精度が上がります。",
      btnUrz: "シャッターのデバイスを開く",
      czAuto: "同じ部屋からセンサーを自動で選びました。別のものも選べます。",
      tryb: "センサーが「開」を報告したとき、窓は：",
      zr: [
        [
          "auto",
          "🔎 自動"
        ],
        [
          "internet",
          "🌐 インターネットから"
        ],
        [
          "brak",
          "🚫 天気なし"
        ]
      ],
      wxTeraz: "現在の外の天気：{0}",
      wxBrak: "HA に天気の統合がありません – カードは自宅の位置の天気をインターネットから取得します（Open-Meteo：無料、アカウントやキー不要）。",
      wxBezLok: "HA が自宅の位置を知らないため、インターネットの天気は使えません。設定してください：設定 → システム → 一般 → 地図上のピン。",
      btnOgolne: "一般設定を開く",
      wxNiedost: "「{0}」は利用できません – 天気の統合を確認してください。直るまでカードはインターネットの天気を使います。",
      wxNic: "天気がないと、ガラスにはシンプルな昼 / 夜の空が表示されます。",
      nazwa: "カードの名前（空欄 = シャッターの名前）",
      wlasny: "🎨 パレットから好きな色",
      wlasnyKol: "シェード",
      wlasnyRam: "窓枠",
      wlasnyOpis: "虹色の丸をタップして好きな色を選ぶと、プレビューがすぐ変わります。",
      podglad: "ライブプレビューは下にあります – 変更はすぐに表示されます。",
      jezyk: "ウィザードとカードは {0} で表示されます – HA のプロフィールと同じです。⚙️ 詳細 で変更できます。",
      jezykNazwa: "日本語",
      pods: "まとめ",
      pRoleta: "シャッター：{0}",
      pSk: "窓の枚数：{0}",
      pSil: "モーター：{0}",
      pSilU: "移動時間：カードが学習します",
      pCz: "窓のセンサー：{0}",
      pCzB: "窓のセンサー：なし（任意なので問題ありません）",
      pWx: "天気：{0}",
      pWxI: "天気：インターネットから（Open-Meteo）",
      pWxB: "天気：オフ",
      pWyg: "見た目：窓枠 – {0}、ストライプ – {1}",
      gdzieT: "カードの配置先",
      tutaj: "カードは今編集中のビューに追加されます。このダイアログ下部の「保存」をクリックすれば完了です。",
      tez: "別のダッシュボードにも置きますか？ダッシュボードとビューを選べば、すぐにコピーを追加します。",
      panel: "ダッシュボード",
      widok: "ビュー",
      nowyWidok: "➕ 新しいビュー「シャッター」",
      nowyTytul: "シャッター",
      dodaj: "そこにコピーを追加",
      dodano: "追加しました ✔ {0} → {1}",
      blad: "失敗しました：{0}",
      bezAdmina: "他のダッシュボードにカードを追加するには HA の管理者アカウントが必要です。",
      domyslny: "概要（初期設定）",
      tenPanel: "（このダッシュボード – 「保存」だけ）",
      autoPanel: "（自動 – 追加不可）",
      yaml: "（YAML – 手動のみ）",
      widokPanel: "（パネル – カード 1 枚のみ）",
      wczytuje: "ダッシュボードを読み込み中…",
      verOk: "カードは正しくインストールされています – 最新バージョンです。",
      verNowa: "Motor HA の新しいバージョンがあります。設定 → アップデート で更新し、ページを再読み込みしてください。",
      btnHacs: "HACS を開く",
      btnPrzeladuj: "🔄 ページを再読み込み",
      zasobyDup: "カードがリソースに {0} 回追加されています。1 つだけ残してください（設定 → ダッシュボード → ⋮ → リソース）。そうしないと新旧のバージョンが混ざることがあります。",
      btnZasoby: "リソースを開く",
      obr: "rpm"
    }
  };

  // src/jezyk.js
  var rrFn = (v) => typeof v === "string" && /\{\d\}/.test(v) ? (...a) => v.replace(/\{(\d)\}/g, (_, i) => a[i] ?? "") : Array.isArray(v) ? v.map(rrFn) : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, rrFn(x)])) : v;
  var SUROWE = { pl: pl_default, en: en_default, de: de_default, fr: fr_default, es: es_default, it: it_default, nl: nl_default, cs: cs_default, sk: sk_default, uk: uk_default, ru: ru_default, pt: pt_default, "zh-hans": zh_hans_default, ja: ja_default };
  var rrScal = (baza, x) => Array.isArray(baza) ? Array.isArray(x) && x.length === baza.length ? x : baza : baza && typeof baza === "object" ? Object.fromEntries(Object.entries(baza).map(([k, v]) => [k, rrScal(v, x?.[k])])) : typeof x === typeof baza ? x : baza;
  var RR_JEZYKI = Object.fromEntries(Object.entries(SUROWE).map(([k, v]) => [k, rrFn(k === "en" || k === "pl" ? v : rrScal(en_default, v))]));
  var RR_NAZWY_JEZYKOW = { pl: "Polski", en: "English", de: "Deutsch", fr: "Français", es: "Español", it: "Italiano", nl: "Nederlands", cs: "Čeština", sk: "Slovenčina", uk: "Українська", ru: "Русский", pt: "Português", "zh-hans": "简体中文", ja: "日本語" };
  var rrMapa = (co) => Object.fromEntries(Object.entries(RR_JEZYKI).map(([k, v]) => [k, v[co]]));
  var RR_TXT = rrMapa("karta");
  var RR_ED = rrMapa("edytor");
  var RR_KOL_NAZWY = rrMapa("kolory");
  var rrKod = (s) => {
    const k = String(s || "").toLowerCase().replace("_", "-"), p = k.split("-")[0];
    return RR_JEZYKI[k] ? k : RR_JEZYKI[p] ? p : p === "zh" && RR_JEZYKI["zh-hans"] ? "zh-hans" : "en";
  };
  var rrJezyk = (c, hass) => RR_JEZYKI[c?.jezyk] ? c.jezyk : rrKod(hass?.locale?.language || hass?.language || navigator.language || "pl");

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
 background:radial-gradient(circle at 35% 30%,#fff,#dcdcdc 70%,#bdbdbd);box-shadow:0 2px 5px rgba(0,0,0,.5),0 0 0 2px var(--accent-color,#ff9800);
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
.ghost{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--accent-color,#ff9800);z-index:6;display:none}
.ghost span{position:absolute;left:50%;transform:translateX(-50%);top:-22px;background:var(--accent-color,#ff9800);color:var(--rr-na-akcencie,#fff);font-size:12px;font-weight:600;padding:1px 7px;border-radius:9px;white-space:nowrap}
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
.qk button.on{color:var(--rr-na-glownym,var(--text-primary-color,#fff));background:var(--primary-color,#009ac7);box-shadow:none}
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
  var RR_ODSW = { id: null, szukane: 0 };
  function rrSamoOdswiez(hass) {
    const st = hass?.states || {};
    if (!RR_ODSW.id && !RR_ODSW.szukane) {
      RR_ODSW.szukane = 1;
      RR_ODSW.id = Object.keys(st).find((k) => k.startsWith("update.") && /roleta-realistyczna/.test(String(st[k].attributes?.release_url || ""))) || null;
    }
    const inst = RR_ODSW.id && st[RR_ODSW.id]?.attributes?.installed_version;
    if (!inst || rrNumerWersji(inst) <= rrNumerWersji(RR_WERSJA)) return;
    const klucz = "okno-ha-odswiezone-" + inst;
    try {
      if (sessionStorage.getItem(klucz)) return;
      sessionStorage.setItem(klucz, "1");
    } catch (e) {
      return;
    }
    console.info("Motor HA: zainstalowana " + inst + ", działa " + RR_WERSJA + " – przeładowuję stronę");
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
  <div><div><span class="nm"></span></div><div class="sb"></div></div><div class="pc"></div></div>
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
      rrKontrast(this);
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
:host{display:block;container-type:inline-size;
 /* v38: styl kafelków z opisu – tło grafitowe (jasne w jasnym motywie), pełna zaokrąglona ramka, cień; zaznaczenia w kolorze akcentu */
 --rr-kafel:color-mix(in srgb,var(--primary-text-color,#e1e1e1) 6%,var(--card-background-color,#1c1c1c));
 --rr-ramka:color-mix(in srgb,var(--primary-text-color,#e1e1e1) 14%,transparent);
 --rr-cien:0 2px 10px rgba(0,0,0,.18);--rr-akc:var(--accent-color,#ff9800)}
.ed{display:grid;gap:16px}
/* v32: szeroki ekran (np. strona Motor HA) – ustawienia po lewej, duży podgląd po prawej, zawsze na wierzchu */
@container (min-width:900px){
 .ed{grid-template-columns:minmax(0,1fr) minmax(380px,44%);column-gap:24px;align-items:start}
 .ed>*{grid-column:1}
 .ed>.pv{grid-column:2;grid-row:1/span 40;position:sticky;top:12px;max-height:calc(100vh - 24px);overflow:auto}
 .ed>.pv .slot{max-width:none;zoom:1}
 .ed>.pv .pin-b:not(.wzo){display:none}
 .ed>.pv.pin .wxp.wx1,.ed>.pv.pin .pvh>span:first-child{display:revert}
}
.pv{background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien);border-radius:16px;padding:10px;display:grid;gap:8px;transition:box-shadow .3s}
.pv.pin{position:sticky;top:0;z-index:6;box-shadow:0 6px 14px rgba(0,0,0,.35);background:var(--card-background-color,var(--ha-card-background,#1c1c1c))}
.pv .slot{width:100%;max-width:520px;margin:0 auto}
.pv.pin .slot{zoom:.75}
.pv.pin .wxp.wx1,.pv.pin .pvh>span:first-child{display:none}.pv.pin .pvh{justify-content:flex-end}
.pv.fl{box-shadow:0 0 0 2px var(--primary-color,#009ac7),0 6px 14px rgba(0,0,0,.35)}
.pin-b{border:none;background:none;cursor:pointer;font-size:16px;opacity:.45;padding:2px 4px}.pv.pin .pin-b{opacity:1}
.wxp{display:flex;flex-wrap:wrap;gap:6px}
.wxp button{border:none;border-radius:14px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer;color:var(--primary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wxp button[aria-pressed="true"]{background:var(--rr-akc);color:var(--rr-na-akcencie,#fff);box-shadow:none}
.pvh{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:var(--secondary-text-color)}
.play{border:none;border-radius:16px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;background:var(--accent-color,#ff9800);color:var(--rr-na-akcencie,#fff)}
.grp{display:grid;gap:8px}
.lb{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--secondary-text-color)}
.dots{display:flex;flex-wrap:wrap;gap:6px;padding:6px 2px 6px}
.dots .dot{flex:0 0 auto;scroll-snap-align:center}
.dot[aria-pressed="true"] .own{box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 6px var(--rr-akc),0 0 14px 4px color-mix(in srgb,var(--rr-akc) 60%,transparent);transform:scale(1.35)}
.sec{border-radius:16px;background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien);padding:0 14px}
.sec>summary{cursor:pointer;padding:14px 0;font-size:15px;font-weight:500;color:var(--primary-text-color);list-style:none}
.sec>summary::-webkit-details-marker{display:none}.sec>summary:after{content:"▾";float:right;transition:transform .2s}.sec[open]>summary:after{transform:rotate(180deg)}
.sec[open]{padding-bottom:12px}
.sec>.grp{margin-bottom:18px}
.rst{justify-self:start;border:none;background:none;color:var(--primary-color,#009ac7);font:inherit;font-size:13px;cursor:pointer;padding:4px 0}
.wiz{border-radius:16px;padding:16px;display:grid;gap:14px;background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien)}
.wiz[hidden]{display:none}
.ed.kr>:not(.wiz):not(.pv){display:none}
.wzh{display:flex;align-items:center;gap:8px;color:var(--primary-color,#009ac7)}.wzh b{color:var(--primary-text-color);font-size:16px;font-weight:500}
.wzh span{font-size:12px;color:var(--secondary-text-color)}.wzx{margin-left:auto;border:none;background:none;color:var(--secondary-text-color);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:50%}
.wzs{display:flex;align-items:center}.wzs i{flex:1;height:2px;background:var(--divider-color,rgba(127,127,127,.3))}
.wzd{flex:none;width:34px;height:34px;padding:0;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;--mdc-icon-size:18px;
 background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color);transition:background .2s,box-shadow .2s}
.wzd.ok{background:color-mix(in srgb,var(--primary-color,#009ac7) 22%,transparent);color:var(--primary-color,#009ac7)}
.wzd.on{background:var(--primary-color,#009ac7);color:var(--rr-na-glownym,var(--text-primary-color,#fff));box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 5px var(--rr-akc)}
.wzt{display:flex;align-items:center;gap:12px}.wzt h3{margin:0;font-size:20px;font-weight:400;color:var(--primary-text-color)}
.wzt ha-icon{--mdc-icon-size:26px;color:var(--primary-color,#009ac7);background:color-mix(in srgb,var(--primary-color,#009ac7) 15%,transparent);border-radius:50%;padding:8px}
.wzc{font-size:14px;line-height:1.45;color:var(--secondary-text-color);background:color-mix(in srgb,var(--primary-text-color,#e1e1e1) 5%,transparent);border:1px solid var(--rr-ramka);border-radius:12px;padding:8px 12px}
.wzc p{margin:3px 0}.wzc b{color:var(--primary-text-color);font-weight:500}
.wzb{display:grid;gap:12px}.wzb:empty{display:none}.wzp{display:grid;gap:8px}
.wzl{display:grid;gap:6px}
.wzl button{display:flex;align-items:center;gap:14px;text-align:left;border:none;border-radius:12px;padding:10px 12px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color);
 background:var(--card-background-color,rgba(127,127,127,.1));box-shadow:inset 0 0 0 1px var(--rr-ramka);transition:box-shadow .15s,background .15s}
.wzl button:hover{background:var(--secondary-background-color,rgba(127,127,127,.12))}
.wzl button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--rr-akc);background:color-mix(in srgb,var(--rr-akc) 8%,transparent)}
.wzl ha-icon{flex:none;color:var(--primary-color,#009ac7)}.wzl button[aria-pressed="true"] ha-icon{color:var(--primary-color,#009ac7)}
.wzl small{display:block;color:var(--secondary-text-color);font-size:12px;margin-top:1px}
.wzl em{font-style:normal;font-size:11px;font-weight:500;color:var(--primary-color,#009ac7);margin-left:6px;white-space:nowrap}.wzl em.au{color:var(--accent-color,#ff9800)}
.wzw{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.wzw b{font-weight:400;font-size:11px;padding:1px 8px;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color)}
.wor{display:flex;flex-wrap:wrap;gap:10px}.wo{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:12px;cursor:pointer;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4));font-size:14px;font-weight:500;color:var(--primary-text-color)}.wo .sw2{width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}.wown{display:grid;gap:8px;margin-top:4px}
.wzl .sw2{flex:none;display:inline-block;width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.4)}
.wzn{display:flex;gap:8px;align-items:center;border-top:1px solid var(--divider-color,rgba(127,127,127,.3));padding-top:12px}.wzn span{flex:1}
.wb{border:none;border-radius:20px;padding:9px 18px;font:inherit;font-size:14px;font-weight:500;cursor:pointer;background:var(--primary-color,#009ac7);color:var(--rr-na-glownym,var(--text-primary-color,#fff))}
.wb.sec{background:transparent;color:var(--primary-color,#009ac7);box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wb.sm{padding:5px 12px;font-size:13px}.wb[disabled]{opacity:.4;cursor:default}.wb[hidden]{display:none}
.wzg{display:grid;gap:10px}.wzg>.wb{justify-self:start}
ha-alert{display:block}
ha-alert:not(:defined){padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:color-mix(in srgb,var(--info-color,#039be5) 12%,transparent);border-left:4px solid var(--info-color,#008bb3)}
ha-alert[alert-type=warning]:not(:defined){background:color-mix(in srgb,var(--warning-color,#ffa600) 12%,transparent);border-color:var(--warning-color,#ffa600)}
ha-alert[alert-type=error]:not(:defined){background:color-mix(in srgb,var(--error-color,#db4437) 12%,transparent);border-color:var(--error-color,#db4437)}
ha-alert[alert-type=success]:not(:defined){background:color-mix(in srgb,var(--success-color,#43a047) 12%,transparent);border-color:var(--success-color,#43a047)}
ha-alert:not(:defined) [slot=action]{display:inline-block;margin:8px 8px 0 0}
.wzi{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:14px;color:var(--primary-text-color)}
.wzi li{display:flex;align-items:flex-start;gap:8px}.wzi ha-icon{flex:none;--mdc-icon-size:20px;color:var(--primary-color,#009ac7)}.wzi ha-icon.uw{color:var(--warning-color,#ffa600)}.wzi ha-icon.in{color:var(--secondary-text-color)}
.wza{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:color-mix(in srgb,var(--primary-color,#009ac7) 12%,transparent);border-left:4px solid var(--primary-color,#009ac7)}.wza ha-icon{flex:none;color:var(--primary-color,#009ac7)}.wza .wb{margin:8px 8px 0 0}
.lb .kn{text-transform:none;letter-spacing:0;color:var(--primary-text-color);margin-left:6px}
.dot{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;padding:0;color:var(--primary-text-color);font:inherit;font-size:12px;font-weight:500;line-height:1.25;text-align:center;width:74px}
.dot i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5);transition:transform .15s}
.dot[aria-pressed="true"] i{box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 6px var(--rr-akc),0 0 14px 4px color-mix(in srgb,var(--rr-akc) 60%,transparent);transform:scale(1.35)}
.dots .dot[aria-pressed="true"]{width:74px;font-weight:600}
.dots .dot[aria-pressed="true"] i,.dots .dot[aria-pressed="true"] .own{margin:4px 0 9px}
.dots{padding:14px 10px 8px}
.psl{display:none}
.dot[aria-pressed="true"]{color:var(--primary-text-color)}
.own{position:relative;width:34px;height:34px;border-radius:50%;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}
.own input{position:absolute;inset:-8px;width:50px;height:50px;opacity:0;cursor:pointer}
.osg{font-size:12px;font-weight:500;color:var(--primary-text-color);margin-top:4px}.seg.osl{display:flex;flex-wrap:wrap}.seg.osl button{display:inline-flex;align-items:center;gap:4px;padding:7px 10px;white-space:nowrap}.seg.osl ha-icon{--mdc-icon-size:18px}
.seg{display:inline-flex;border-radius:12px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--rr-ramka)}
.seg button{border:none;background:none;padding:8px 16px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color)}
.seg button[aria-pressed="true"]{background:var(--rr-akc);color:var(--rr-na-akcencie,#fff)}
.sl{display:grid;gap:2px}
.sl div{display:flex;justify-content:space-between;font-size:14px;color:var(--primary-text-color)}
.sl b{font-weight:500;font-variant-numeric:tabular-nums}
.sl input{width:100%;accent-color:var(--primary-color,#009ac7)}
.sl input.txt{box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--divider-color,rgba(127,127,127,.4));background:transparent;color:inherit;font:inherit}
.sw{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:14px;color:var(--primary-text-color);padding:4px 0}
.hint{font-size:12px;color:var(--secondary-text-color);line-height:1.4;margin:0}
.ver{font-size:11px;color:var(--secondary-text-color);text-align:right}
.kal{display:flex;flex-wrap:wrap;gap:8px}.kal .ok{background:var(--primary-color,#009ac7)}.play[disabled]{opacity:.4;cursor:default}
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
    /* v38: otwarty kreator = jedyna rzecz w edytorze (obok podglądu); po „Gotowe” albo ✕ – wszystkie ustawienia */
    otworz(n = 0) {
      this.el.hidden = false;
      this.el.parentElement?.classList.add("kr");
      this.pokaz(n);
    }
    zamknij() {
      this.el.hidden = true;
      this.el.parentElement?.classList.remove("kr");
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
      const przyc = akcje.map(([t, p]) => ` <button class="wb sm sec" data-open="${esc(p)}">${esc(t)}</button>`).join("");
      if (typ === "success" || typ === "info") return `<div class="wza"><ha-icon icon="${typ === "success" ? "mdi:check-circle" : "mdi:information"}"></ha-icon><div>${esc(txt)}${przyc ? `<div>${przyc}</div>` : ""}</div></div>`;
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
          this._html(box, this._alert("warning", W.verNowa, [[W.btnHacs, "/hacs/dashboard"], [W.btnPrzeladuj, "reload"]]));
        else this._html(box, this._alert("success", W.verOk));
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
      const hx = (v) => /^#[0-9a-f]{6}$/i.test(v || "") ? v : rrHex(v) || "#000000";
      const w = document.createElement("div");
      w.className = "wown";
      w.innerHTML = `<div class="lb">${esc(W.wlasny)}</div><div class="wor">${[["kolor", W.wlasnyKol], ["rama", W.wlasnyRam]].map(([k, n]) => `<label class="wo"><span class="own"><input type="color" data-wo="${k}" value="${hx(this.ed._val(k))}"></span><span class="sw2" style="background:${hx(this.ed._val(k))}"></span><span class="won">${esc(n)}</span></label>`).join("")}</div><p class="hint">${esc(W.wlasnyOpis)}</p>`;
      w.querySelectorAll("[data-wo]").forEach((i) => {
        i.oninput = () => {
          this.ed._set(i.dataset.wo, i.value);
          i.closest(".wo").querySelector(".sw2").style.background = i.value;
        };
        i.onchange = () => this._ustaw({ [i.dataset.wo]: i.value });
      });
      B.appendChild(w);
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
      pkt.push([st && st.state !== "unavailable" ? "ok" : "uw", W.pRoleta(rrNazwa(h, c.entity))]);
      pkt.push(["ok", W.pSk(sk.length > 1 ? sk.map((x) => rrNazwa(h, x.cover)).join(" / ") : W.sk1)]);
      const rpm = sk.map((x) => rrRpm(h, x.cover, c[x.i ? "predkosc_prawa" : "predkosc_lewa"])).filter((x) => x > 0);
      pkt.push(rpm.length ? ["ok", W.pSil([...new Set(rpm)].join(" / ") + " " + W.obr)] : ["in", W.pSilU]);
      const auto = c.auto_czujniki !== false ? rrCzujnikiAuto(h, c.entity) : [];
      const cz = sk.map((x) => c[x.i ? "czujnik_prawe" : "czujnik_lewe"] || auto[x.i]).filter(Boolean);
      pkt.push(cz.length ? ["ok", W.pCz(cz.map((x) => rrNazwa(h, x)).join(" / "))] : ["in", W.pCzB]);
      const zr = this.ed._val("zrodlo"), wid = zr === "auto" ? rrPogodaId(c, h) : null;
      pkt.push(zr === "brak" ? ["in", W.pWxB] : wid && h.states[wid] ? ["ok", W.pWx(rrNazwa(h, wid) + " – " + this._stan(wid))] : ["ok", W.pWxI]);
      const rama = this.ed._val("rama"), kol = this.ed._val("kolor");
      pkt.push(["ok", W.pWyg(RR_RAMY[rama]?.[ri] || rama, RR_KOL_NAZWY[this.ed._lang][kol] || kol)]);
      this._html(B, `<div class="lb">${W.pods}</div><ul class="wzi">${pkt.map(([i, t]) => `<li><ha-icon class="${i}" icon="${{ ok: "mdi:check-circle", uw: "mdi:alert-circle", in: "mdi:information-outline" }[i]}"></ha-icon>${esc(t)}</li>`).join("")}</ul>`);
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

  // src/edytor.js
  var RR_POLA = ["entity", "name", "roleta_lewa", "roleta_prawa", "predkosc_lewa", "predkosc_prawa", "zrodlo", "pogoda", "tlo", "czujnik_lewe", "tryb_lewe", "czujnik_prawe", "tryb_prawe"];
  var RR_PRZEL = ["auto_czujniki", "klamki", "promienie", "dzwiek", "wibracja", "przyciski", "niebo", "widok", "uchwyty", "uchwyt_srodek", "osobno", "odwroc"];
  var RR_KARTA_KLUCZE = ["type", "entity", "grid_options", "view_layout", "visibility"];
  var rrTylkoKarta = (c) => Object.fromEntries(Object.entries(c).filter(([k]) => RR_KARTA_KLUCZE.includes(k)));
  var RoletaRealistycznaEditor = class extends HTMLElement {
    setConfig(c) {
      this._cfg = Object.assign({}, c);
      this._go();
    }
    set hass(h) {
      this._hass = h;
      this._go();
      this._wersja();
    }
    /* v34: jeden numer – wersja integracji Motor HA (karta jest w jej środku); bez integracji nic */
    _wersja() {
      const w = this.shadowRoot?.querySelector("#wer");
      if (!w || !this._hass) return;
      const u = Object.values(this._hass.states).find((s) => s.entity_id.startsWith("update.") && String(s.attributes?.release_url || "").includes("okno-ha-integracja") && s.attributes?.installed_version);
      w.textContent = u ? RR_TXT[this._lang].nazwaKarty + " " + String(u.attributes.installed_version).replace(/^v/, "") : "";
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
      const urz = this._urz();
      this.dispatchEvent(new CustomEvent("config-changed", { detail: { config: urz ? rrTylkoKarta(c) : c }, bubbles: true, composed: true }));
      if (urz) this._zapiszUrz();
      this._sync();
      this._preview();
      const pv = this._r?.querySelector(".pv");
      if (pv) {
        pv.classList.add("fl");
        clearTimeout(this._flT);
        this._flT = setTimeout(() => pv.classList.remove("fl"), 500);
      }
    }
    _urz() {
      return !!this._hass?.states?.[this._cfg?.entity]?.attributes?.okno_ha;
    }
    _zapiszUrz() {
      clearTimeout(this._urzT);
      this._urzT = setTimeout(() => this._hass.callWS({ type: "okno_ha/zapisz", entity_id: this._cfg.entity, karta: this._cfg }).catch((e) => console.warn("Motor HA: nie zapisałem w urządzeniu", e)), 600);
    }
    _go() {
      if (!this._hass || !this._cfg) return;
      rrKontrast(this);
      if (this._urz() && this._urzE !== this._cfg.entity) {
        this._urzE = this._cfg.entity;
        this._cfg = Object.assign({}, this._cfg, this._hass.states[this._cfg.entity].attributes.okno_ha, rrTylkoKarta(this._cfg));
      }
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
 <p class="hint urz" hidden>${L.urz}</p>
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
 <div class="grp"><div class="lb">${L.jez}</div><div class="seg osl">${[["auto", L.jauto], ...Object.keys(RR_JEZYKI).map((k) => [k, RR_NAZWY_JEZYKOW[k] || k])].map(([v, t]) => `<button data-jz="${v}">${t}</button>`).join("")}</div></div>
 <div class="grp"><div class="lb">${L.opc}</div>
  ${RR_PRZEL.map((k) => `<label class="sw">${L[k]} <ha-switch id="${k}"></ha-switch></label>`).join("")}</div>
 <div class="grp"><div class="lb">${L.glob}</div><p class="hint">${L.globh}</p>
  <div class="kal"><button class="play" id="gSave">${L.gSave}</button><button class="play" id="gClr" style="background:var(--secondary-text-color)">${L.gClr}</button></div><p class="hint" id="gInfo"></p></div>
 <button class="rst" data-rst="zaaw">${L.rst}</button></details>
 <div class="ver" id="wer"></div>
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
      this._kr.otworz(0);
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
  console.info("%c Motor HA " + RR_WERSJA + " %c © superdarco78 · CC BY-NC-SA 4.0 · github.com/superdarco78/roleta-realistyczna ", "background:#232427;color:#fff;border-radius:3px 0 0 3px", "background:#ff8f00;color:#fff;border-radius:0 3px 3px 0");
  var rej = (nazwa, klasa) => {
    if (!customElements.get(nazwa)) customElements.define(nazwa, klasa);
  };
  rej("okno-ha", RoletaRealistyczna);
  rej("okno-ha-editor", RoletaRealistycznaEditor);
  rej("roleta-realistyczna", class extends RoletaRealistyczna {
  });
  rej("roleta-realistyczna-editor", class extends RoletaRealistycznaEditor {
  });
  var T = RR_TXT[rrKod(document.documentElement.lang || navigator.language || "pl")];
  window.customCards = window.customCards || [];
  for (let i = window.customCards.length - 1; i >= 0; i--) if (["okno-ha", "roleta-realistyczna"].includes(window.customCards[i]?.type)) window.customCards.splice(i, 1);
  window.customCards.push({
    type: "okno-ha",
    name: T.nazwaKarty,
    description: T.opisKarty,
    preview: true,
    documentationURL: "https://github.com/superdarco78/roleta-realistyczna#readme",
    /* v31: „Dodaj do panelu” na stronie urządzenia (HA 2026.6+) proponuje kartę Motor HA dla okien z integracji i dla rolet */
    getEntitySuggestion: (hass, entityId) => {
      if (!String(entityId).startsWith("cover.")) return null;
      return { label: T.nazwaKarty, config: { type: "custom:okno-ha", entity: entityId } };
    }
  });
})();
