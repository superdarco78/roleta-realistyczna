# 📝 Historia zmian

## v34 – Kolory z motywu Home Assistanta

- 🎨 Karta, kreator i edytor biorą kolory z Twojego profilu HA na żywo: kolor główny i kolor akcentu (uchwyt, linia celu, przycisk animacji). Zmiana koloru w profilu od razu zmienia kartę
- 🔢 Jeden numer: bez plakietki wersji karty; w edytorze wersja integracji Okno HA

## v33 – Dowolny kolor z palety w kreatorze

- 🎨 W kreatorze z kółkami (krok „Wygląd”) można wybrać dowolny kolor osłony i ramy z palety. Podgląd zmienia się na żywo, kolor zapisuje się sam
- 🔤 Podpisy pod kółkami kolorów (Czarny, Grafit…) są większe i wyraźniejsze w motywie jasnym i ciemnym

## v32 – Edytor z dużym podglądem obok

- 🖥️ Na szerokim ekranie edytor ma dwie kolumny: ustawienia po lewej, duży podgląd po prawej. Podgląd zostaje na miejscu przy przewijaniu, a każda zmiana widać od razu
- 🎨 Kółka kolorów pokazują prawdziwe kolory i układają się w kilka rzędów. Bez paska przewijania i suwaka pod kolorami
- 📌 Przypięty podgląd w wąskim oknie jest większy (75% zamiast 50%)

## v31 – Edytor zapisuje w urządzeniu Okno HA

- 🔗 Gdy karta pokazuje okno z integracji **Okno HA**, każda zmiana w edytorze (także w kreatorze z kółkami) zapisuje się sama w urządzeniu, tak jak „Konfiguruj”. Na pulpicie zostaje tylko wybór okna
- ➕ „Dodaj do panelu” na stronie urządzenia proponuje kartę Okno HA (Home Assistant 2026.6 i nowszy)
- 🪟 Panel **Okno HA** w menu bocznym używa tego samego kreatora

## v30 – Aktualizacja jednym kliknięciem

- 🔔 Z integracją **Okno HA** nowa wersja karty pokazuje się sama w **Ustawienia → Aktualizacje** (sprawdza co 2 minuty), bez wchodzenia w HACS
- 🔄 Po kliknięciu „Zainstaluj” otwarta strona sama przeładowuje się na nową wersję karty

## v29 – Współpraca z integracją Okno HA

- 🔌 Karta sama bierze ustawienia z integracji **Okno HA** (Ustawienia → Integracje). Wystarczy wybrać okno z listy
- ✏️ Zmiany w integracji („Konfiguruj”) od razu widać na karcie
- 🔄 Po aktualizacji w HACS karta sama raz przeładowuje stronę, gdy przeglądarka trzyma starą wersję. Nie trzeba czyścić pamięci ani naciskać Ctrl + F5
- ✅ Karty bez integracji działają jak wcześniej

## v28.1 – Klikalne kafelki i przyciski w HACS

- 👆 Kafelki, spis treści i przyciski kreatora w opisie działają też w HACS (otwierają właściwe miejsce na GitHubie)
- ✅ Sama karta bez zmian

## v28 – Kreator nie myli się przy wersjach „.1”

- 🩹 Kreator nie pokazuje już żółtej ramki „jest nowsza wersja”, gdy wyszło tylko wydanie z nowym opisem (np. v27.1). Liczy się numer karty
- ✅ Wygląd i ustawienia bez zmian

## v27.1 – Opis jasny i ciemny

- 🌗 Obrazki w opisie same zmieniają się na ciemne, gdy masz ciemny motyw (w HACS i na GitHubie)
- 🧩 Kafelki bez linii tabeli, ładne w każdym motywie
- 🪟 Nowy dział „Rodzaje osłon” w opisie (5 języków)
- ✅ Sama karta bez zmian

## v27 – 15 rodzajów osłon, każda wygląda jak prawdziwa

- 🏠 **W pokoju**: dzień-noc, materiałowa, zaciemniająca (w białych prowadnicach), plisa, plaster miodu, rzymska, żaluzja aluminiowa 25 mm i drewniana 50 mm (z taśmami)
- 🧱 **Na zewnątrz**: roleta nadstawna (kaseta w kolorze ramy), natynkowa (skrzynka ze ściętym frontem), podtynkowa (skrzynka w ścianie), z perforacją (świetliki), żaluzja fasadowa C80 i Z90, screen ZIP
- 📐 Każdy rodzaj ma swoją kasetę, prowadnice boczne i listwę dolną
- 🗂️ W edytorze i kreatorze typy są w dwóch grupach (**W pokoju** i **Na zewnątrz**) z krótkim opisem każdego
- ✅ Twoje karty wyglądają tak samo jak wcześniej

## v26.1 – Poprawiony opis w HACS

- 📄 Opis karty w HACS wygląda teraz tak samo jak na GitHubie: obrazki zamiast kodu, nic nie wychodzi poza ekran
- 🌅 Nowy baner na górze opisu
- ✅ Sama karta bez zmian

## v26 – Typy osłon, promienie słońca i dźwięk silnika

- 🪟 **Typ osłony** do wyboru: dzień-noc, pełna, plisa, rzymska, żaluzja i roleta zewnętrzna. Wybierasz w edytorze (🎨 Wygląd) albo w kreatorze
- ☀️ **Promienie słońca**: w słoneczny dzień przez okno wpada ciepłe światło (można wyłączyć)
- 🔊 **Dźwięk silnika**: cichy szum, gdy roleta jedzie po kliknięciu (domyślnie wyłączony)
- 🎨 Ikona karty zmienia się według typu osłony
- ✅ Twoje karty wyglądają tak samo jak wcześniej – nowe opcje są dodatkowe

## v25 – Nowa nazwa: Okno HA

- 🪟 Karta nazywa się teraz **Okno HA** (po angielsku **HA Window**), bo wkrótce pokaże też zasłony, markizy, żaluzje, okiennice i plisy
- ➕ Nowe karty mają typ `custom:okno-ha`
- ✅ Twoje karty z typem `custom:roleta-realistyczna` działają dalej bez żadnych zmian
- 🔧 Klamki okna są większe, srebrne z ciemnym obrysem i zawsze nad roletą – dobrze widać, jak się obracają
- 🌍 Nowa nazwa w oknie wyboru kart, w edytorze i w kreatorze (po polsku i po angielsku)

## v24 – Większe okno jednoskrzydłowe

- 🪟 Okno z jednym skrzydłem jest teraz większe: wyższe i szersze, wypełnia kartę tak jak okno z dwoma skrzydłami
- 👀 To samo w podglądzie edytora i kreatora
- 📖 W oknie wyboru kart jest link do instrukcji

## v23 – Kreator dla początkujących w 7 krokach

- 🪄 Nowy kreator: roleta → okno i skrzydła → prędkość silnika → czujniki okna → pogoda → wygląd i nazwa → podsumowanie i miejsce karty
- 💬 W każdym kroku krótko: **co** wybierasz i **po co**
- 🏠 Wygląd jak w Home Assistancie: komunikaty, pola wyboru, ikony i kolory Twojego motywu (jasny i ciemny)
- 🔎 Karta sama znajduje rolety, silniki, kontaktrony i pogodę i układa je od najlepiej pasujących (to samo urządzenie, to samo pomieszczenie, „lewe/prawe” w nazwie) – przy każdej pozycji widać dlaczego
- 🎯 W listach tylko pasujące encje: bez bram, garaży, czujników ruchu i zwykłych liczb
- 🆘 Gdy czegoś brakuje albo coś nie działa, kreator mówi dokładnie co zrobić i jednym przyciskiem otwiera właściwe miejsce w HA (integracje, pomocnicy, urządzenie, lokalizacja domu, HACS, zasoby)
- ⏱ Pomiar czasu przejazdu prosto z kreatora
- ✅ Sprawdzenie instalacji: czy jest nowsza wersja i czy karta nie jest dodana dwa razy w zasobach
- ➕ Kopia karty na inny panel albo nowy widok „Rolety” jednym kliknięciem – bez pisania kodu
- 🔄 Kreator odświeża się sam, gdy w HA pojawi się nowe urządzenie
- 🌍 Język kreatora, karty i menu automatycznie wg profilu HA
- 🧹 Te same ścisłe filtry w zwykłym menu karty
- 🧱 Kod karty podzielony na moduły (`src/`, `translations/`) z testami i automatycznym budowaniem

## v22 – Kreator w 3 krokach

- 🪄 kreator w 3 krokach (wybierz roletę → co karta wykryła sama → gotowy wygląd), sam się otwiera przy nowej karcie
- Menu w rozwijanych działach: 🎨 Wygląd, 🪟 Okno, ⏱ Ruch i kalibracja, ⚙️ Zaawansowane
- W każdym „↺ Przywróć domyślne”

## v21 – Automatyczne wykrywanie i ustawienia globalne

- Edytor: wybrane kółko koloru duże i świecące
- Pod każdą paletą suwak – przesuwasz palcem i od razu wybierasz kolor
- Automatyczne wykrywanie: prędkość silnika z tego samego urządzenia co roleta, kontaktrony okna z tego samego pomieszczenia (lewe/prawe po nazwie)
- W edytorze widać, co wykryto (opcja auto_czujniki, ręczny wybór ma pierwszeństwo)
- Ustawienia globalne: „🌍 Zapisz jako domyślne dla wszystkich kart” – wygląd zapisany w profilu użytkownika HA, każda karta (i każda nowa) go przejmuje, a własne ustawienia karty mają pierwszeństwo
- Nowa karta sama wybiera grupę rolet

## v20 – Palety kolorów w jednej linii

- Edytor: palety kolorów w kółkach w jednej przewijanej linii
- Wybrany kolor podświetlony i przewinięty na środek, pozostałe wyszarzone
- Nazwa wybranego koloru przy tytule grupy

## v19 – Okleiny drewnopodobne i klamki

- Kolory ram jak w sklepach z oknami: okleiny drewnopodobne ze słojami (złoty dąb, orzech, mahoń, winchester, dąb bagienny, dąb jasny) i kolory gładkie (szary agat, srebrny, czarny, zieleń, ...)
- Słupek między skrzydłami: stały (zostaje w oknie) albo ruchomy (przy lewym skrzydle, po otwarciu obu skrzydeł środek jest wolny
- Lewe skrzydło bez klamki) – opcja slupek
- Edytor: podgląd przypięty u góry (📌) – przy każdym ustawieniu od razu widać, jak wygląda
- Krótki opis pod każdą grupą
- W podglądzie okno zamknięte / uchylone / otwarte, a suwaki uchyłu i otwarcia same pokazują okno w tym położeniu
- Paleta tkanin dzień-noc jak u producentów (naturalne, szarości, pastele, jaskrawe) i własny kolor
- Klamki okna jak prawdziwe (w dół zamknięte, poziomo otwarte, w górę uchylone
- Najpierw obrót klamki, potem skrzydło) – opcja klamki

## v18 – Automatyczna kalibracja i nowe kolory

- Poprawka: otwarte skrzydło (lewe i prawe) otwiera się naprawdę do środka pokoju (wolny brzeg w naszą stronę), a nie na zewnątrz
- Automatyczna kalibracja jednym przyciskiem (roleta sama jedzie góra → dół → góra, karta mierzy i zapisuje czas)
- Karta sama uczy się czasu przejazdu z każdego ruchu rolety, która melduje „otwiera/zamyka się”
- Ruch krokowy: przyciski ▲ 5% / ▼ 5% – każde kliknięcie to mały krok, kliknięcia się sumują (opcja krok, 0 = wyłączony)
- 10 jaskrawych kolorów pasów (czerwony, bordo, różowy, fiolet, niebieski, turkus, zielony, limonka, żółty, oliwka) i osobny kolor pasów przezroczystych (opcja siatka, puste = jak pełne)
- Własne szybkie pozycje (opcja pozycje, np. „100,60,30,0”)
- Lekka wibracja telefonu przy kliknięciu (opcja wibracja)

## v17 – Uniwersalna dla każdego, język PL/EN

- Uniwersalna dla każdego, nic na sztywno: w ustawieniach wybierasz rolety lewego i prawego skrzydła (albo grupę), encje prędkości silników (albo czas), źródło pogody (encja HA / internet / brak), kontaktrony
- Kalibracja czasu przejazdu stoperem w edytorze
- Język karty i edytora: auto / polski / English
- Uchwyty na listwie i środkowy można wyłączyć
- Ustawienia w edytorze pogrupowane w rozwijane sekcje
- Suwaki „jak mocno uchylone” (stopnie) i „jak szeroko otwarte” (% szerokości) – oba do środka pokoju
- Przy uchyleniu i otwarciu widać wyraźną szczelinę, a przez nią to, co za oknem (niebo, widok, pogoda)

## v16 – Pogoda z internetu i pory dnia

- Uniwersalnie, także bez integracji pogody: gdy w HA nie ma encji weather.*, karta sama pobiera aktualną pogodę z internetu (Open-Meteo, darmowe, bez klucza) dla lokalizacji domu z HA, odświeżanie co 15 min
- Niebo zmienia się z porą dnia wg wysokości słońca (sun.sun): dzień, złota godzina przy wschodzie/zachodzie (pomarańczowe niebo, nisko słońce), zmierzch (fioletowe niebo, zapalone okna), noc
- Uchylenie skrzydła teraz do środka pokoju (góra skrzydła do nas), otwarcie też do środka
- Dotknięcie rolety jak pilot z jednym przyciskiem: w trakcie jazdy = STOP, kolejne dotknięcie = jazda w przeciwną stronę (stojąca na dole jedzie w górę, na górze w dół)

## v15 – Okno uchylone i otwarte wg kontaktronu

- Okno uchylone albo otwarte wg kontaktronu: dla lewego i prawego skrzydła wybierasz czujnik (binary_sensor) i tryb – „uchyl” (góra skrzydła odchyla się do środka) albo „otworz” (skrzydło otwiera się na zawiasach)
- Animacja ruchu skrzydła, za skrzydłem widać to, co za oknem
- W podtytule „okno lewe uchylone”

## v14 – Rysowany widok za oknem

- Rysowany widok za oknem (gdy nie ma zdjęcia): wzgórza, domy, drzewa, ulica i latarnia, jeden widok przez oba skrzydła
- Zmienia się z pogodą: śnieg na dachach i trawie, mokra ulica z odbiciami przy deszczu, drzewa kołyszą się przy wietrze i burzy, pochmurno = szarzej
- W nocy zapalone okna i świecące latarnie
- Jedno słońce/księżyc na całe okno
- Opcja „widok” (wyłączenie = samo niebo)

## v13 – Poprawka po STOP

- Poprawka: po STOP i po dojechaniu animacja nie skacze od spóźnionych meldunków silnika (Moes potrafi wysłać fałszywe 100% nawet 50 s później) – okno spokoju wydłużone do 60 s i działa też po STOP

## v12 – Własne zdjęcie widoku zza okna

- Własne zdjęcie widoku zza okna jako tło (opcja „tlo”, np. /local/okno.jpg): jedno zdjęcie przez oba skrzydła, na nim animowana pogoda (chmury, deszcz, śnieg, mgła, błyski), przyciemnienie wg pogody i noc (ciemno + gwiazdy)

## v11 – Trzy uchwyty

- 3 uchwyty: uchwyt na dolnej listwie skrzydła steruje tylko tym skrzydłem, okrągły uchwyt na środku okna (na słupku) steruje oboma naraz
- Przeciąganie w innym miejscu szyby jak dotąd (oba, albo jedno z opcją „osobno”)

## v10 – Odporność na fałszywe meldunki i linia celu

- Animacja nie skacze od fałszywych meldunków Moes (test 20.10 19:28: przy „50%” silniki meldowały 0 i 100 w trakcie jazdy, prawy nawet na końcu 100, choć oba stanęły w połowie): po komendzie z karty liczy się cel komendy, meldunki 0/100 niezgodne z celem są pomijane, a każdy meldunek brany jest tylko raz
- Po przeciągnięciu lub kliknięciu przerywana linia z „→ 50%” pokazuje, gdzie roleta jedzie, aż dojedzie
- W nagłówku „32% → 50%”

## v9 – Pogoda także przy oszczędzaniu baterii

- Pogoda rusza się też na telefonie z włączonym „ograniczeniem ruchu” / oszczędzaniem baterii (v8 ją wtedy zamrażała)
- Błysk burzy w obu skrzydłach naraz

## v8 – Prawdziwa pogoda za oknem

- Prawdziwa pogoda za oknem z Home Assistanta (encja weather, domyślnie weather.dom): słońce, chmury płynące po niebie, deszcz, ulewa, burza z błyskami, śnieg, mgła, wiatr
- W nocy księżyc i migające gwiazdy (wg sun.sun)
- Temperatura i opis pogody w podtytule
- W edytorze wybór encji pogody i przyciski „pogoda w podglądzie”
- Uchwyt do podnoszenia na środku dolnej listwy każdego skrzydła

## v7 – Czas przejazdu zmierzony na prawdziwych roletach

- „open 0%” na końcu opuszczania jest przyjmowane (to prawdziwe 0%), na starcie podnoszenia pomijane
- Czas zmierzony na prawdziwych roletach 20.10: 40 obr/min ≈ 30 s, 255 obr/min ≈ 22 s → czas = 20,2 + 394 / obroty (tryb „auto”, domyślny)
- Ruch startuje też, gdy roletę ruszy ktoś inny (pilot, automatyzacja, inny panel) – silnik Moes od razu zmienia stan na „open”/„closed”, a pozycję podaje dopiero na końcu
- Ręczny czas nadal możliwy

## v6 – Edytor graficzny z podglądem

- Edytor graficzny jak symulator: kółka kolorów (pasy i rama, plus własny kolor), przyciski skrzydeł, suwaki, przełączniki i żywy podgląd z przyciskiem „Pokaż animację” (udawany silnik w tempie prawdziwych silników)

## v5 – Numer wersji na karcie

- Numer wersji widoczny na karcie (obok nazwy) i w nazwie karty na liście kart

## v4 – Tempo z prędkości silnika Moes

- Tempo animacji z prawdziwej prędkości silnika Moes (encja number.*_motor_speed, obr/min) osobno dla każdego skrzydła: czas przejazdu = „czas” × („obroty_ref” / obroty silnika)
- Zmiana prędkości silnika w HA od razu zmienia animację

## v3 – Śledzenie meldunków silnika

- Śledzenie silnika: każdy meldunek pozycji z silnika od razu (płynnie, ~0,5 s) przesuwa roletę na zgłoszone miejsce, a między meldunkami jedzie zsynchronizowana z silnikiem
- Chwilowe „0%” przy stanie otwarta jest pomijane (błąd meldunku Zigbee)

## v2 – Oba skrzydła naraz i tempo silnika

- Przeciąganie ustawia oba skrzydła naraz (opcja „osobno” = jedno)
- Animacja 1:1 z prędkością silnika (czas przejazdu), rusza od razu po kliknięciu
- Poprawka silników Zigbee, które przy „open” podają 0%
- Opcja „odwroc”
- Numer wersji w konsoli

## v1 – Pierwsza wersja

- Okno 2-skrzydłowe, biała kasetka, pasy dzień-noc, przeciąganie, przyciski, niebo dzień/noc, edytor wizualny
