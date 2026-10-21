<p align="center"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/hero-pl.png" alt="Roleta dzień-noc" width="100%"></p>

<p align="center">
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/v/release/superdarco78/roleta-realistyczna?style=for-the-badge&label=wersja&color=0288d1" alt="wersja"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/downloads/superdarco78/roleta-realistyczna/total?style=for-the-badge&label=pobrania&color=2e7d32" alt="pobrania"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/stargazers"><img src="https://img.shields.io/github/stars/superdarco78/roleta-realistyczna?style=for-the-badge&label=gwiazdki&color=f9a825&logo=github" alt="gwiazdki"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/commits/main"><img src="https://img.shields.io/github/commit-activity/y/superdarco78/roleta-realistyczna?style=for-the-badge&label=aktywno%C5%9B%C4%87&color=6a1b9a" alt="Aktywność"></a>
  <br>
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/Home%20Assistant-2024.8%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="#tlumaczenia"><img src="https://img.shields.io/badge/t%C5%82umaczenia-PL%20%7C%20EN-2e7d32?style=for-the-badge&logo=googletranslate&logoColor=white" alt="Tłumaczenia"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencja-CC%20BY--NC--SA%204.0-green?style=for-the-badge" alt="licencja"></a>
  <br>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/validate.yml?style=for-the-badge&label=HACS%20validate&logo=homeassistantcommunitystore&logoColor=white" alt="HACS validate"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/release.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/release.yml?style=for-the-badge&label=wydanie&logo=githubactions&logoColor=white" alt="wydanie"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/issues"><img src="https://img.shields.io/github/issues/superdarco78/roleta-realistyczna?style=for-the-badge&label=zg%C5%82oszenia&color=e64a19" alt="Zgłoszenia"></a>
  <a href="https://github.com/superdarco78"><img src="https://img.shields.io/badge/maintainer-%40superdarco78-d32f2f?style=for-the-badge&logo=github" alt="maintainer"></a>
  <br>
  <a href="https://community.home-assistant.io/"><img src="https://img.shields.io/badge/forum-Home%20Assistant-41BDF5?style=for-the-badge&logo=discourse&logoColor=white" alt="Forum HA"></a>
  <a href="https://forum.arturhome.pl/"><img src="https://img.shields.io/badge/forum%20PL-arturhome.pl-dc143c?style=for-the-badge&logo=discourse&logoColor=white" alt="Forum PL"></a>
  <!-- Wsparcie (odkomentuj po podaniu linku): <a href="https://www.buymeacoffee.com/LINK"><img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy me a coffee"></a> -->
</p>

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Otwórz w HACS" height="56"></a></p>
README: **🇵🇱 Polski** | [🇬🇧 English](README_EN.md)

> [!TIP]
> Karta działa z **każdą roletą** w Home Assistancie (`cover.*`): Zigbee, Z-Wave, Tuya, Shelly, Somfy i innymi. Najlepiej wygląda z roletą dzień-noc (zebra) i oknem 2-skrzydłowym, ale ustawisz też 1 skrzydło. Po dodaniu karty **kreator ustawi wszystko sam**.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/animacja.webp"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/animacja-ciemna.webp"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/animacja.webp" width="420" alt="Animacja rolety"></picture></a></p>

<table>
<tr><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/weather-partly-cloudy.png" height="48" align="absmiddle"><br><b>Prawdziwa pogoda</b><br><sub>Deszcz, śnieg, burza, słońce i noc za szybą</sub></td><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/gesture-swipe-vertical.png" height="48" align="absmiddle"><br><b>Sterowanie palcem</b><br><sub>Ciągniesz roletę jak prawdziwą</sub></td><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/auto-fix.png" height="48" align="absmiddle"><br><b>Kreator</b><br><sub>Sam znajduje roletę, silnik i czujniki</sub></td></tr>
<tr><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/window-open-variant.png" height="48" align="absmiddle"><br><b>Okno jak w domu</b><br><sub>Uchylone i otwarte według czujników</sub></td><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/theme-light-dark.png" height="48" align="absmiddle"><br><b>Motyw HA</b><br><sub>Jasny i ciemny, wygląd jak w Home Assistancie</sub></td><td align="center" width="33%"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/translate.png" height="48" align="absmiddle"><br><b>Polski i angielski</b><br><sub>Język według Twojego profilu HA</sub></td></tr>
</table>

<a name="spis-tresci"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/format-list-bulleted.png" height="30" align="absmiddle"> Spis treści

**<img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/rocket-launch.png" height="22" align="absmiddle"> [Część 1. Dla początkujących](#dla-poczatkujacych)** · wystarczy to
- [Kliknij niebieski przycisk](#krok-1)
- [Kliknij „Pobierz”](#krok-2)
- [Dodaj kartę](#krok-3)
- [Kreator zrobi resztę](#krok-4)
- [Jak sterować](#akcje-jak-sterowac)
- [Aktualizacja do v23](#aktualizacja-do-v23)
- [Słowniczek: co znaczą te słowa?](#slowniczek)
- [Pytania i problemy](#pytania-i-problemy)

**<img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/wrench.png" height="22" align="absmiddle"> [Część 2. Dla zaawansowanych](#dla-zaawansowanych)** · nie musisz

---

<a name="dla-poczatkujacych"></a>
# <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/rocket-launch.png" height="40" align="absmiddle"> Część 1. Dla początkujących

<a name="start-w-4-krokach"></a>
> [!TIP]
> **To wszystko, czego potrzebujesz.** 4 kroki, około minuty. Resztę ustawi kreator. Część 2 możesz pominąć.

<a name="krok-1"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/numeric-1-circle.png" height="26" align="absmiddle"> Kliknij niebieski przycisk

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Otwórz w HACS" height="56"></a></p>

Kliknij **Otwórz link**. Za pierwszym razem strona zapyta o adres Twojego HA. Gdy HACS zapyta „Dodać repozytorium?”, kliknij **Dodaj**.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/hacs-1.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/hacs-1.png" width="100%" alt="Krok 1"></a></p>

<br>

<a name="krok-2"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/numeric-2-circle.png" height="26" align="absmiddle"> Kliknij „Pobierz”

Kliknij **Pobierz** na dole po prawej, potem jeszcze raz **Pobierz** w okienku. Potem odśwież stronę: **Ctrl + Shift + R**. W telefonie zamknij i otwórz aplikację HA.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/hacs-2.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/hacs-2.png" width="100%" alt="Krok 2"></a></p>

<br>

<a name="krok-3"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/numeric-3-circle.png" height="26" align="absmiddle"> Dodaj kartę

Na pulpicie kliknij ołówek, potem **＋ Dodaj kartę**. Wpisz **Roleta** i kliknij kartę.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-6.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-6.png" width="100%" alt="Krok 3"></a></p>

<br>

<a name="krok-4"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/numeric-4-circle.png" height="26" align="absmiddle"> Kreator zrobi resztę

Kreator otwiera się sam. Ma 7 krótkich kroków. Karta sama znajduje roletę, silnik, czujniki okna i pogodę.

| Krok | Co wybierasz | Po co |
|:---:|---|---|
| 1 | 🪟 **Roleta** | Którą roletą (albo grupą rolet) karta ma sterować |
| 2 | 🔲 **Okno** | Ile skrzydeł i która roleta jest na którym |
| 3 | ⏱ **Silnik** | Żeby animacja jechała tak szybko jak prawdziwa roleta |
| 4 | 🚪 **Czujniki okna** | Żeby karta pokazała uchylone albo otwarte okno |
| 5 | 🌦 **Pogoda** | Żeby za szybą było widać prawdziwą pogodę |
| 6 | 🎨 **Wygląd i nazwa** | Gotowy zestaw kolorów i nazwa na karcie |
| 7 | ✅ **Podsumowanie** | Sprawdzasz wszystko i wybierasz, gdzie ma być karta |

> [!TIP]
> Nie wiesz, co wybrać? Zostaw to, co jest zaznaczone na górze listy. Karta wybrała najlepiej pasujące.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-1-roleta-jasny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-1-roleta-jasny-pl.png" width="560" alt="Kreator: wybierz roletę"></a></p>

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-7-gdzie-jasny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-7-gdzie-jasny-pl.png" width="560" alt="Kreator: podsumowanie"></a></p>

> [!IMPORTANT]
> ✅ **Gotowe.** Kliknij **Zapisz**. Karta działa.

---

<a name="akcje-jak-sterowac"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/gesture-tap.png" height="26" align="absmiddle"> Jak sterować

| | Co robisz | Co się dzieje |
|:---:|---|---|
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/uchwyt-listwa.png" height="24" align="absmiddle"> | Ciągniesz uchwyt na dole skrzydła | Jedzie tylko to skrzydło |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/uchwyt-srodek.png" height="24" align="absmiddle"> | Ciągniesz okrągły uchwyt na środku | Jadą oba skrzydła |
| 👆 | Ciągniesz palcem po szybie | Jadą oba skrzydła |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/stop.png" height="24" align="absmiddle"> | Klikasz STOP albo dotykasz rolety, gdy jedzie | Roleta staje |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/zwin.png" height="24" align="absmiddle"> | Klikasz strzałkę w górę | Roleta jedzie na samą górę |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/opusc.png" height="24" align="absmiddle"> | Klikasz strzałkę w dół | Roleta jedzie na sam dół |
| **▲&nbsp;5%** | Klikasz mały krok | Roleta jedzie o&nbsp;5% w górę |
| **75%** | Klikasz gotową pozycję | Roleta jedzie do tej pozycji |

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/opis-elementow.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/opis-elementow-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/opis-elementow.png" width="100%" alt="Uchwyty i przyciski"></picture></a></p>

---

<a name="aktualizacja-do-v23"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/update.png" height="26" align="absmiddle"> Aktualizacja do v23

> [!IMPORTANT]
> Wersja 23 **nie zmienia** Twoich ustawień. Karty, które już masz, działają dalej.

**Co nowego**

- 🪄 **Kreator w 7 krokach** dla początkujących. W każdym kroku krótko: **co** wybierasz i **po co**.
- 🔍 Karta sama znajduje rolety, silniki, czujniki okna i pogodę. Najlepiej pasujące są na górze.
- 🧹 Na listach są tylko pasujące urządzenia: bez bram, garaży i czujników ruchu.
- 🧭 Gdy czegoś brakuje, kreator mówi, co zrobić, i jednym przyciskiem otwiera właściwe miejsce w HA.
- 📋 Kopię karty dodasz na inny panel albo do nowego widoku „Rolety” jednym kliknięciem.
- 🌍 Język kreatora, karty i menu ustawia się sam według profilu HA.

**Co zrobić**

1. W HACS kliknij **Aktualizuj**.
2. Odśwież stronę: **Ctrl + Shift + R**.

Pełna lista zmian: [📝 Historia zmian](CHANGELOG.md).

---

<a name="slowniczek"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/book-open-variant.png" height="26" align="absmiddle"> Słowniczek: co znaczą te słowa?


| Słowo | Po ludzku |
|---|---|
| **Home Assistant (HA)** | Program, który steruje Twoim domem. |
| **HACS** | „Sklep” z dodatkami do HA. Stąd instalujesz kartę i jej aktualizacje. |
| **Karta** | Okienko na ekranie HA, np. ta roleta. |
| **Pulpit** | Ekran w HA, na którym leżą karty. |
| **Encja cover.…** | Twoja roleta, tak jak widzi ją HA. |
| **Kontaktron** | Czujnik na oknie: wie, czy okno jest zamknięte, uchylone czy otwarte. |
| **Zwinięta / 100%** | Roleta na samej górze, okno odsłonięte. |
| **Opuszczona / 0%** | Roleta na samym dole, okno zasłonięte. |
| **YAML** | Ręczne pisanie ustawień. **Tu niepotrzebne.** |

---

<a name="pytania-i-problemy"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/help-circle.png" height="26" align="absmiddle"> Pytania i problemy

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Nie ma karty na liście „Dodaj kartę”

Odśwież stronę: **Ctrl + Shift + R**. W telefonie zamknij i otwórz aplikację HA. Potem wpisz **Roleta** w wyszukiwarce kart.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-6.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-6.png" width="100%" alt=""></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Animacja jedzie szybciej albo wolniej niż roleta

Otwórz edytor karty, dział **Ruch i kalibracja**, kliknij **Kalibruj automatycznie**. Karta sama zmierzy czas. Karta uczy się też z każdego ruchu.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja.png" width="440" alt=""></picture></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Roleta skacze do 0% albo 100% w trakcie jazdy

To złe meldunki silnika. Karta je pomija. Jeśli dalej skacze, [zgłoś błąd](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) i podaj nazwę silnika.

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Nie widać pogody za oknem

Otwórz edytor, dział **Zaawansowane**, ustaw źródło pogody **auto** albo **internet**. Karta weźmie pogodę dla lokalizacji Twojego domu.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/deszcz.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/deszcz.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/deszcz.png" width="360" alt=""></picture></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Roleta jedzie odwrotnie (góra to dół)

Otwórz edytor, dział **Zaawansowane**, włącz **Odwróć pozycję**.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane.png" width="440" alt=""></picture></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Karta jest po angielsku, a chcę po polsku

Karta bierze język z Twojego profilu HA. Możesz też wybrać **Polski** w dziale **Zaawansowane**, pole **Język karty**.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/en.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/en.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/en.png" width="360" alt=""></picture></a></p>

<br>

#### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/alert-circle-outline.png" height="22" align="absmiddle"> Czujnik okna nie działa

Otwórz edytor, dział **Okno**. Wybierz czujnik lewego i prawego skrzydła. Ustaw, czy okno się **uchyla**, czy **otwiera**.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno.png" width="440" alt=""></picture></a></p>

Nie ma tu odpowiedzi? [Zgłoś błąd](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) albo napisz na [forum HA](https://community.home-assistant.io/) / [forum arturhome.pl](https://forum.arturhome.pl/).

---

<a name="dla-zaawansowanych"></a>
# <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/wrench.png" height="40" align="absmiddle"> Część 2. Dla zaawansowanych

> [!NOTE]
> **Nie musisz tego czytać.** Kreator ustawił już wszystko. Tu są szczegóły: wszystkie ekrany kreatora, edytor, opcje, YAML i instalacja bez HACS.

- [Karta Roleta dzień-noc](#karta-roleta-dzien-noc)
  - [Cele](#cele)
  - [Wygląd w różnych sytuacjach](#wyglad-w-roznych-sytuacjach)
  - [Kolory i okleiny](#kolory-i-okleiny)
- [Kreator: wszystkie ekrany](#kreator-krok-po-kroku)
- [Edytor](#edytor)
  - [Podgląd na żywo](#podglad-na-zywo)
  - [Wygląd](#wyglad)
  - [Okno i kontaktrony](#okno-i-kontaktrony)
  - [Ruch i kalibracja](#ruch-i-kalibracja)
  - [Zaawansowane](#zaawansowane)
  - [Ustawienia globalne](#ustawienia-globalne)
- [Opcje](#opcje)
  - [Podstawowe](#podstawowe)
  - [Wygląd](#wyglad-1)
  - [Okno i kontaktrony](#okno-i-kontaktrony-1)
  - [Ruch](#ruch)
  - [Pogoda i widok](#pogoda-i-widok)
  - [Przyciski i sterowanie](#przyciski-i-sterowanie)
- [Przykłady](#przyklady)
- [Automatyczne wykrywanie](#automatyczne-wykrywanie)
- [Silniki Moes / Tuya](#silniki-moes-tuya)
- [Elementy karty](#elementy-karty)
- [Instalacja bez HACS (ręcznie)](#recznie)

---

<a name="karta-roleta-dzien-noc"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/window-shutter.png" height="30" align="absmiddle"> Karta Roleta dzień-noc

Karta pokazuje Twoją roletę dzień-noc na prawdziwym oknie. Roletę przesuwasz palcem, animacja jest zsynchronizowana z silnikiem, a za szybą widać aktualną pogodę i porę dnia.

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/opis-elementow-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/opis-elementow.png" width="100%" alt="Opis elementów karty"></picture></p>

<a name="cele"></a>
### Cele

- ✅ Roleta na ekranie ma wyglądać i ruszać się **jak prawdziwa**.
- ✅ Ustawienie ma zająć **minutę, bez YAML** i bez dodawania pomocników.
- ✅ Wygodne sterowanie **palcem na telefonie i tablecie**.
- ✅ Karta ma działać z **każdą** roletą i **każdym** domem (język, pogoda, czujniki).

---

<a name="wyglad-w-roznych-sytuacjach"></a>
### Wygląd w różnych sytuacjach

Zrzuty dopasowują się do motywu (jasny / ciemny), tak jak karta dopasowuje się do motywu Home Assistanta.

**Pogoda za oknem:**

<table>
<tr>
<td align="center" width="33%"><b>☀️ Słońce</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/dzien.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/dzien.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/dzien.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>🌧 Deszcz</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/deszcz.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/deszcz.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/deszcz.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>⛈ Burza</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/burza.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/burza.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/burza.png" width="100%"></picture></a></td>
</tr>
<tr>
<td align="center" width="33%"><b>❄️ Śnieg</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/snieg.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/snieg.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/snieg.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>🌫 Mgła</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/mgla.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/mgla.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/mgla.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>☁️ Pochmurno (po angielsku)</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/en.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/en.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/en.png" width="100%"></picture></a></td>
</tr>
</table>

**Pora dnia:**

<table>
<tr>
<td align="center" width="33%"><b>☀️ Dzień</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zwinieta.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/zwinieta.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zwinieta.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>🌅 Zachód słońca</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zachod.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/zachod.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zachod.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>🌙 Noc</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/noc.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/noc.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/noc.png" width="100%"></picture></a></td>
</tr>
</table>


**Pozycja rolety:**

<table>
<tr>
<td align="center" width="33%"><b>⬆️ Zwinięta (100%)</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zwinieta.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/zwinieta.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zwinieta.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>↕️ W połowie (50%)</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zachod.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/zachod.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zachod.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>⬇️ Opuszczona (0%)</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/opuszczona.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/opuszczona.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/opuszczona.png" width="100%"></picture></a></td>
</tr>
</table>

**Okno (według kontaktronów):**

<table>
<tr>
<td align="center" width="33%"><b>↘ Lewe uchylone</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/uchylone.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/uchylone.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/uchylone.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>↔ Prawe otwarte</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/otwarte.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/otwarte.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/otwarte.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>🪟 Uchylone i otwarte</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/okno.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/okno.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/okno.png" width="100%"></picture></a></td>
</tr>
</table>

---

<a name="kolory-i-okleiny"></a>
### Kolory i okleiny

<table>
<tr>
<td align="center" width="33%"><b>Złoty dąb + beż</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zloty.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/zloty.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/zloty.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>Antracyt + turkus</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/turkus.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/turkus.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/turkus.png" width="100%"></picture></a></td>
<td align="center" width="33%"><b>1 skrzydło</b><br><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/jedno.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany/jedno.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/stany-jasne/jedno.png" width="100%"></picture></a></td>
</tr>
</table>


**Okleiny ze słojami:**

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/okleiny.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/okleiny-ciemne.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/okleiny.png" width="100%" alt="Okleiny"></picture></a></p>

---

<a name="kreator-krok-po-kroku"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/auto-fix.png" height="30" align="absmiddle"> Kreator: wszystkie ekrany

<br>

**Krok 1 z 7: wybierz roletę**

Najlepiej pasująca roleta jest na górze, z dopiskiem „najlepsze dopasowanie”.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-1-roleta-jasny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-1-roleta-jasny-pl.png" width="560" alt="Kreator: wybierz roletę"></a>

<br>

**Krok 3 z 7: prędkość silnika**

Karta znajduje silnik rolety sama. Możesz też zmierzyć czas przejazdu prosto z kreatora.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-3-silnik-ciemny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-3-silnik-ciemny-pl.png" width="560" alt="Kreator: prędkość silnika"></a>

<br>

**Krok 4 z 7: czujniki okna**

Na liście są tylko czujniki okien i drzwi z tego samego pomieszczenia.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-4-czujniki-jasny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-4-czujniki-jasny-pl.png" width="560" alt="Kreator: czujniki okna"></a>

<br>

**Krok 6 z 7: wygląd i nazwa**

Wybierz gotowy zestaw kolorów. Każdy kolor zmienisz później w menu karty.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-6-wyglad-ciemny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-6-wyglad-ciemny-pl.png" width="560" alt="Kreator: wygląd"></a>

<br>

**Krok 7 z 7: sprawdź i zapisz**

Widzisz wszystko, co karta znalazła. Kopię karty dodasz tu na inny panel albo do nowego widoku „Rolety”.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-7-gdzie-jasny-pl.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/kreator/kreator-7-gdzie-jasny-pl.png" width="560" alt="Kreator: podsumowanie i miejsce karty"></a>

✅ **Gotowe.** Kliknij **Zapisz**. Wszystko inne zmienisz później w [edytorze](#edytor).

---

<a name="edytor"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/tune.png" height="30" align="absmiddle"> Edytor

Edytor otworzysz tak: pulpit → ołówek → kliknij kartę rolety. Ustawienia są w rozwijanych działach. W każdym jest **↺ Przywróć domyślne**.

<a name="podglad-na-zywo"></a>
### Podgląd na żywo

Na górze edytora jest podgląd, który **nie rusza prawdziwej rolety**. **▶ Pokaż animację** pokazuje ruch z prędkością Twojego silnika, a przyciski pogody pokazują deszcz, burzę, śnieg albo noc. Pinezka 📌 przypina podgląd u góry, żeby widzieć każdą zmianę od razu.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/przeglad.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/przeglad-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/przeglad.png" width="440" alt="przeglad"></picture></a></p>

<a name="wyglad"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/palette.png" height="26" align="absmiddle"> Wygląd

Kolor pasów pełnych i przezroczystych, kolor ramy (okleiny ze słojami i kolory gładkie), liczba skrzydeł, słupek i wysokość okna. Kolor wybierasz kółkiem albo przesuwając palcem suwak pod paletą.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/wyglad.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/wyglad-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/wyglad.png" width="440" alt="wyglad"></picture></a></p>

<a name="okno-i-kontaktrony"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/window-open-variant.png" height="26" align="absmiddle"> Okno i kontaktrony

Wybierz kontaktron lewego i prawego skrzydła (albo zostaw automatyczne wykrywanie) i powiedz karcie, czy skrzydło po otwarciu jest **uchylone** czy **otwarte**. Suwaki ustalają, jak mocno.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/okno.png" width="440" alt="okno"></picture></a></p>

<a name="ruch-i-kalibracja"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/timer-outline.png" height="26" align="absmiddle"> Ruch i kalibracja

Czas przejazdu karta ustala sama z prędkości silnika albo uczy się go z każdego ruchu. Jeśli animacja nie zgadza się z roletą, kliknij **🤖 Kalibruj automatycznie**: roleta sama pojedzie na górę, na dół i znowu do góry, a karta zapisze czas. Można też zmierzyć ręcznie stoperem.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/kalibracja.png" width="440" alt="kalibracja"></picture></a></p>

<a name="zaawansowane"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/cog.png" height="26" align="absmiddle"> Zaawansowane

Język karty, przyciski, uchwyty, ruch krokowy, szybkie pozycje, wibracja, odwrócona pozycja, źródło pogody i własne zdjęcie zza okna.

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/edytor/zaawansowane.png" width="440" alt="Zaawansowane"></picture></a></p>

<a name="ustawienia-globalne"></a>
### <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/earth.png" height="26" align="absmiddle"> Ustawienia globalne

**🌍 Zapisz jako domyślne** przenosi Twój wygląd na wszystkie karty rolet, także nowe. Każda karta może go nadal zmienić u siebie.

---

<a name="opcje"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/file-document-outline.png" height="30" align="absmiddle"> Opcje

Wszystko ustawisz w edytorze. Tabele są dla chętnych, którzy wolą YAML.

<a name="podstawowe"></a>
### Podstawowe

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `type` | tekst | **wymagane** | custom:roleta-realistyczna |
| `entity` | encja | **wymagane** | Roleta cover.* albo grupa rolet (lewa + prawa). Przykład: cover.zaluzje_salon |
| `name` | tekst | nazwa encji | Nazwa na karcie. |
| `jezyk` | tekst | auto | auto (wg języka HA), pl albo en. |

<a name="wyglad-1"></a>
### Wygląd

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `kolor` | tekst | czarny | Kolor pełnych pasów: nazwa z palety (np. bezowy, grafit, turkus) albo #rrggbb. |
| `siatka` | tekst | jak pełne | Kolor pasów przezroczystych. |
| `rama` | tekst | #f4f4f2 | Kolor ramy, np. #8a5a3b (złoty dąb), #3b3f45 (antracyt). |
| `skrzydla` | liczba | 2 | Liczba skrzydeł: 1 albo 2. |
| `slupek` | tekst | staly | staly albo ruchomy. |
| `klamki` | tak/nie | true | Klamki obracają się przy uchyleniu i otwarciu. |
| `wysokosc` | liczba | 260 | Wysokość okna w px. |

<a name="okno-i-kontaktrony-1"></a>
### Okno i kontaktrony

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `czujnik_lewe` | encja | auto | Kontaktron lewego (lub jedynego) skrzydła, binary_sensor.*. |
| `czujnik_prawe` | encja | auto | Kontaktron prawego skrzydła. |
| `tryb_lewe` / `tryb_prawe` | tekst | uchyl | Po otwarciu skrzydło jest uchyl (uchylone) albo otworz (otwarte). |
| `kat_uchyl` | liczba | 14 | Jak mocno uchylone (stopnie). |
| `otwarcie` | liczba | 40 | Jak szeroko otwarte (% szerokości). |
| `auto_czujniki` | tak/nie | true | Sama szukaj kontaktronów w pomieszczeniu rolety. |

<a name="ruch"></a>
### Ruch

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `roleta_lewa` / `roleta_prawa` | encja | – | Osobne rolety skrzydeł (zamiast grupy). |
| `czas` | liczba / auto | auto | Czas pełnego przejazdu w sekundach. |
| `predkosc_lewa` / `predkosc_prawa` | encja | auto | Prędkość silników (number.*, obr/min). |
| `odwroc` | tak/nie | false | Odwrócona pozycja (gdy silnik liczy odwrotnie). |

<a name="pogoda-i-widok"></a>
### Pogoda i widok

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `zrodlo` | tekst | auto | auto (encja HA, a gdy brak – internet), internet, brak. |
| `pogoda` | encja | auto | Encja weather.*. |
| `niebo` | tak/nie | true | Niebo i pogoda za oknem. |
| `widok` | tak/nie | true | Rysowany widok: domy, drzewa, ulica. |
| `tlo` | tekst | – | Własne zdjęcie zza okna, np. /local/okno.jpg. |

<a name="przyciski-i-sterowanie"></a>
### Przyciski i sterowanie

| Nazwa | Typ | Domyślnie | Opis |
|---|---|---|---|
| `przyciski` | tak/nie | true | Przyciski i szybkie pozycje. |
| `pozycje` | tekst | 100,75,50,25,0 | Szybkie pozycje (100 = zwinięta). |
| `krok` | liczba | 5 | Krok przycisków ▲/▼ w %, 0 = wyłączony. |
| `uchwyty` | tak/nie | true | Uchwyty na listwach. |
| `uchwyt_srodek` | tak/nie | true | Środkowy uchwyt ⇕. |
| `osobno` | tak/nie | false | Przeciąganie po szybie rusza tylko jedno skrzydło. |
| `wibracja` | tak/nie | true | Lekka wibracja telefonu przy kliknięciu. |

---

<a name="przyklady"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/flask-outline.png" height="30" align="absmiddle"> Przykłady

**Najprościej** (resztę karta wykryje sama):

```yaml
type: custom:roleta-realistyczna
entity: cover.zaluzje_salon
```

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex1.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex1-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex1.png" width="400" alt="Wygląd"></picture></a></p>

**Okno 2-skrzydłowe z osobnymi roletami i kontaktronami:**

```yaml
type: custom:roleta-realistyczna
entity: cover.salon_lewa
name: Salon
roleta_lewa: cover.salon_lewa
roleta_prawa: cover.salon_prawa
czujnik_lewe: binary_sensor.okno_salon_lewe
tryb_lewe: uchyl
czujnik_prawe: binary_sensor.okno_salon_prawe
tryb_prawe: otworz
```

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex2.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex2-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex2.png" width="400" alt="Wygląd"></picture></a></p>

**Drewniane okno (złoty dąb) z beżową tkaniną:**

```yaml
type: custom:roleta-realistyczna
entity: cover.zaluzje_kuchnia
name: Kuchnia
kolor: bezowy
rama: '#8a5a3b'
wysokosc: 300
```

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex3.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex3-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex3.png" width="400" alt="Wygląd"></picture></a></p>

**Własne zdjęcie widoku zza okna:**

```yaml
type: custom:roleta-realistyczna
entity: cover.zaluzje_sypialnia
tlo: /local/widok-sypialnia.jpg
```

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex4.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex4-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex4.png" width="400" alt="Wygląd"></picture></a></p>

**Jedno skrzydło, bez pogody, po angielsku:**

```yaml
type: custom:roleta-realistyczna
entity: cover.bedroom
skrzydla: 1
zrodlo: brak
jezyk: en
```

<p align="center"><a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex5.png"><picture><source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex5-ciemny.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/przyklady/ex5.png" width="400" alt="Wygląd"></picture></a></p>

---

<a name="automatyczne-wykrywanie"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/magnify.png" height="30" align="absmiddle"> Automatyczne wykrywanie

Karta sama szuka w Twoim Home Assistancie:

| Co | Jak szuka |
|---|---|
| **Grupa rolet** | Przy nowej karcie najpierw proponuje grupę (okno 2-skrzydłowe). |
| **Prędkość silnika** | Encja `number.*_motor_speed` z tego samego urządzenia co roleta. |
| **Kontaktrony** | `binary_sensor.*` typu okno/drzwi z tego samego pomieszczenia; lewe i prawe po nazwie. |
| **Pogoda** | `weather.dom` albo pierwsza encja `weather.*`; gdy nie ma żadnej, Open-Meteo dla lokalizacji domu. |
| **Język** | Z profilu użytkownika HA. |

Ręczny wybór w edytorze zawsze ma pierwszeństwo.

---

<a name="silniki-moes-tuya"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/power-plug.png" height="30" align="absmiddle"> Silniki Moes / Tuya

Karta była testowana na silnikach **Moes TS0601** (zigbee2mqtt).

- Jeśli silnik ma encję `number.<nazwa>_motor_speed`, czas animacji liczy się sam: czas ≈ 20,2 + 394 / obroty.
- Silnik nie melduje „otwiera się / zamyka się”. Karta rozpoznaje start ruchu po zmianie stanu.
- Fałszywe meldunki 0% / 100% w trakcie jazdy (nawet do 60 s po zatrzymaniu) są pomijane.
- Gdy silnik pokazuje złą pozycję końcową, ustaw ponownie krańcówki w zigbee2mqtt.

---

<a name="elementy-karty"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/puzzle.png" height="30" align="absmiddle"> Elementy karty

| Element | Znaczenie |
|:---:|---|
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/roleta.png" height="24" align="absmiddle"> | Ikona rolety. Kliknięcie otwiera szczegóły encji w HA. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/uchwyt-srodek.png" height="24" align="absmiddle"> | Uchwyt środkowy: przeciągnij, żeby ruszyć oba skrzydła. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/uchwyt-listwa.png" height="24" align="absmiddle"> | Uchwyt na listwie: przeciągnij, żeby ruszyć jedno skrzydło. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/klamki.png" height="24" align="absmiddle"> | Klamki: w dół = zamknięte, poziomo = otwarte, w górę = uchylone. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/zwin.png" height="24" align="absmiddle"> | Zwiń roletę do końca. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/stop.png" height="24" align="absmiddle"> | Zatrzymaj. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/opusc.png" height="24" align="absmiddle"> | Opuść roletę do końca. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/slonce.png" height="24" align="absmiddle"> | Słońce: dzień według `sun.sun`. |
| <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikony/ksiezyc.png" height="24" align="absmiddle"> | Księżyc i gwiazdy: noc. |
| `v22` | Numer wersji karty obok nazwy. |
| `30% → 50%` | Roleta jedzie z 30% do 50%. |

---

<a name="recznie"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/toolbox.png" height="30" align="absmiddle"> Instalacja bez HACS (ręcznie)

Bez HACS. Potrzebny dodatek **File editor** (Ustawienia → Dodatki → Sklep z dodatkami → File editor → Zainstaluj).

**Krok 1. Pobierz plik karty**

Wejdź w [najnowsze wydanie](https://github.com/superdarco78/roleta-realistyczna/releases/latest) i kliknij `roleta-realistyczna.js`. Plik zapisze się w folderze Pobrane.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-1.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-1.png" width="100%" alt="Krok 1"></a>

**Krok 2. Wgraj plik do Home Assistanta**

Otwórz **File editor**. Kliknij ikonę folderu, wejdź do folderu `www` i wgraj plik strzałką w górę.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-2.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-2.png" width="100%" alt="Krok 2"></a>

**Krok 3. Otwórz Pulpity**

Kliknij **Ustawienia** na dole menu po lewej, potem **Pulpity**.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-3.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-3.png" width="100%" alt="Krok 3"></a>

**Krok 4. Otwórz Zasoby**

Kliknij trzy kropki **⋮** w prawym górnym rogu, potem **Zasoby**.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-4.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-4.png" width="100%" alt="Krok 4"></a>

**Krok 4a. Nie widzisz „Zasoby”? Włącz tryb zaawansowany**

Kliknij swoje imię na dole menu po lewej i włącz **Tryb zaawansowany**. Potem wróć do kroku 4.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-7.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-7.png" width="100%" alt="Krok 4a"></a>

**Krok 5. Dodaj kartę jako zasób**

Kliknij **Dodaj zasób**, wpisz `/local/roleta-realistyczna.js`, wybierz **Moduł JavaScript** i kliknij **Utwórz**. Na koniec odśwież stronę: **Ctrl + Shift + R**.

<a href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-5.png"><img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/instalacja/krok-5.png" width="100%" alt="Krok 5"></a>

**Przycisk HACS nie działa?**


1. **HACS → ⋮ (prawy górny róg) → Własne repozytoria**.
2. Repozytorium: `https://github.com/superdarco78/roleta-realistyczna`, typ: **Dashboard**, **Dodaj**.
3. Wyszukaj „Roleta dzień-noc” → **Pobierz**.


---

<a name="pomoc-mile-widziana"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/hand-wave.png" height="30" align="absmiddle"> Pomoc mile widziana

- Masz inną roletę lub silnik? Napisz, jak działa z kartą, i dołącz zrzut.
- Masz pomysł? [Zaproponuj funkcję](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose).

---

<a name="tlumaczenia"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/translate.png" height="30" align="absmiddle"> Tłumaczenia

| Język | Stan |
|---|---|
| 🇵🇱 Polski | ✅ 100% |
| 🇬🇧 English | ✅ 100% |

Chcesz dodać swój język? Skopiuj [`translations/en.json`](translations/en.json) jako `translations/<kod>.json`, przetłumacz teksty i wyślij w [zgłoszeniu](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) albo jako pull request.

---

<a name="budowa-projektu"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/code-braces.png" height="30" align="absmiddle"> Budowa projektu

```
src/                    kod źródłowy (moduły)
├─ index.js             rejestracja karty i edytora w HA
├─ karta.js             karta: okno, roleta, przeciąganie, animacja w tempie silnika
├─ karta-styl.js        wygląd karty (CSS)
├─ edytor.js            edytor graficzny, kalibracja
├─ kreator.js           kreator w 7 krokach dla początkujących
├─ panele.js            dodanie karty na panel, sprawdzenie instalacji
├─ edytor-styl.js       wygląd edytora (CSS)
├─ pogoda.js            niebo, pogoda, rysowany widok, pogoda z internetu
├─ wykrywanie.js        wykrywanie i ranking rolet, silników, kontaktronów, pogody
├─ silnik.js            czas przejazdu (prędkość, nauka, kalibracja)
├─ kolory.js            tkaniny, ramy i okleiny
├─ globalne.js          ustawienia globalne (profil użytkownika HA)
├─ jezyk.js             wybór języka wg HA
└─ stale.js             wersja, ustawienia domyślne
translations/           pl.json, en.json
test/                   testy (`npm test`)
scripts/build.mjs       składanie w jeden plik (esbuild)
dist/roleta-realistyczna.js   gotowy plik dla HACS
```

`npm install` → `npm run check` (sprawdzenie kodu, testy, budowanie). GitHub sprawdza to samo przy każdej zmianie.

---

<a name="wsparcie"></a>
## <img src="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/v23/ikony/coffee.png" height="30" align="absmiddle"> Wsparcie

Jeśli karta Ci się podoba, zostaw ⭐ na górze strony. Dziękuję!

<!-- Wsparcie (odkomentuj po podaniu linków):
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/LINK)
-->

---

[CC BY-NC-SA 4.0](LICENSE) © [superdarco78](https://github.com/superdarco78). Do własnego, niekomercyjnego użytku z podaniem autora.

> [!NOTE]
> **© 2026 superdarco78.** Karta, grafiki i opisy są chronione licencją [CC BY-NC-SA 4.0](LICENSE). Możesz używać za darmo w swoim domu. Sprzedaż, odsprzedaż, wgrywanie jako własne i użycie komercyjne tylko za zgodą autora. Oficjalne źródło: [github.com/superdarco78/roleta-realistyczna](https://github.com/superdarco78/roleta-realistyczna).
