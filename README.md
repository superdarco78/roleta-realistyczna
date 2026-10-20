<p align="center">
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/v/release/superdarco78/roleta-realistyczna?style=for-the-badge&label=wersja&color=0288d1" alt="Wersja"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/downloads/superdarco78/roleta-realistyczna/total?style=for-the-badge&label=pobrania&color=2e7d32" alt="Pobrania"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/commits/main"><img src="https://img.shields.io/github/commit-activity/y/superdarco78/roleta-realistyczna?style=for-the-badge&label=aktywno%C5%9B%C4%87&color=0288d1" alt="Aktywność"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/commits/main"><img src="https://img.shields.io/github/last-commit/superdarco78/roleta-realistyczna?style=for-the-badge&label=ostatnia%20zmiana&color=6a1b9a" alt="Ostatnia zmiana"></a>
  <br>
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/Home%20Assistant-2024.8%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/licencja-CC%20BY--NC--SA%204.0-green?style=for-the-badge" alt="Licencja"></a>
    <br>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/release.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/release.yml?style=for-the-badge&label=wydanie&logo=githubactions&logoColor=white" alt="Wydanie"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/stargazers"><img src="https://img.shields.io/github/stars/superdarco78/roleta-realistyczna?style=for-the-badge&label=gwiazdki&color=f9a825&logo=github" alt="Gwiazdki"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/issues"><img src="https://img.shields.io/github/issues/superdarco78/roleta-realistyczna?style=for-the-badge&label=zg%C5%82oszenia&color=e64a19" alt="Zgłoszenia"></a>
  <img src="https://img.shields.io/github/size/superdarco78/roleta-realistyczna/dist/roleta-realistyczna.js?style=for-the-badge&label=rozmiar&color=546e7a" alt="Rozmiar">
  <img src="https://img.shields.io/badge/t%C5%82umaczenia-PL%20100%25%20%7C%20EN%20100%25-2e7d32?style=for-the-badge&logo=googletranslate&logoColor=white" alt="Tłumaczenia">
  <a href="https://github.com/superdarco78"><img src="https://img.shields.io/badge/autor-%40superdarco78-6a1b9a?style=for-the-badge&logo=github" alt="Autor"></a>
</p>
<p align="center">
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/home--assistant.io-strona-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="https://community.home-assistant.io/"><img src="https://img.shields.io/discourse/users?server=https%3A%2F%2Fcommunity.home-assistant.io&style=for-the-badge&logo=discourse&logoColor=white&label=forum%20HA&color=41BDF5" alt="Forum HA"></a>
  <a href="https://forum.arturhome.pl/"><img src="https://img.shields.io/discourse/users?server=https%3A%2F%2Fforum.arturhome.pl&style=for-the-badge&logo=discourse&logoColor=white&label=forum%20PL%20arturhome&color=dc143c" alt="Forum arturhome.pl"></a>
  <a href="https://hacs.xyz/"><img src="https://img.shields.io/badge/hacs.xyz-HACS-orange?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
</p>

# 🪟 Roleta dzień-noc

README: **Polski** | [English](README_EN.md)

<p align="center"><img src="img/logo.png" width="260" alt="Roleta dzień-noc"></p>

> 💡 **Roleta dzień-noc** to karta do Home Assistanta, która pokazuje Twoją roletę dzień-noc (zebra) na prawdziwym oknie. Roletę przesuwasz palcem, animacja jedzie w tempie silnika, a za szybą widać aktualną pogodę i porę dnia. Przy dodaniu karty kreator ustawia wszystko sam.

<p align="center">
  <img src="img/stany/dzien.png" width="32%" alt="Dzień">
  <img src="img/stany/zachod.png" width="32%" alt="Zachód słońca">
  <img src="img/stany/noc.png" width="32%" alt="Noc">
</p>

## 📑 Spis treści

- [✨ Co potrafi](#-co-potrafi)
- [🖼 Jak wygląda](#-jak-wygląda)
- [⬇️ Instalacja przez HACS (zalecana)](#️-instalacja-przez-hacs-zalecana)
- [🧩 Dodanie karty i kreator](#-dodanie-karty-i-kreator)
- [🛠 Instalacja ręczna](#-instalacja-ręczna)
- [🎛 Edytor](#-edytor)
- [🔄 Aktualizacja](#-aktualizacja)
- [❓ Problemy](#-problemy)
- [📝 Historia zmian](CHANGELOG.md)

## ✨ Co potrafi

| | |
|---|---|
| 🪄 **Kreator** | Sam się otwiera przy nowej karcie: wybierasz roletę, karta pokazuje, co wykryła, i gotowe. |
| 🔍 **Sama wykrywa** | Grupę rolet (lewa + prawa), prędkość silnika z tego samego urządzenia, kontaktrony okna z tego samego pomieszczenia. Bez pomocników i bez YAML. |
| 🌍 **Twój język** | Polski albo angielski, automatycznie według języka ustawionego w Home Assistancie. |
| 👆 **Sterowanie palcem** | Uchwyt na listwie rusza jedno skrzydło, okrągły uchwyt na środku oba. Dotknięcie w trakcie jazdy = STOP. Przyciski ▲ ■ ▼, kroki 5% i szybkie pozycje. |
| ⏱ **Animacja 1:1 z silnikiem** | Tempo z prędkości silnika albo z kalibracji jednym przyciskiem. Fałszywe meldunki Zigbee (0% / 100%) nie psują animacji. |
| 🌦 **Pogoda za oknem** | Słońce, chmury, deszcz, burza, śnieg, mgła i wiatr. Bez integracji pogody karta sama pobiera ją z internetu (Open-Meteo, bez klucza). |
| 🌅 **Pora dnia** | Dzień, złota godzina, zmierzch i noc z księżycem, gwiazdami i zapalonymi oknami, według słońca w HA. |
| 🪟 **Okno jak prawdziwe** | Uchylone albo otwarte według kontaktronu, obracające się klamki, słupek stały lub ruchomy, 1 albo 2 skrzydła. |
| 🎨 **Kolory jak w sklepie** | Tkaniny dzień-noc, okleiny drewnopodobne (złoty dąb, orzech, winchester…) i kolory gładkie. |

## 🖼 Jak wygląda

| ☀️ Słońce | 🌧 Deszcz | ❄️ Śnieg |
|:---:|:---:|:---:|
| <img src="img/stany/dzien.png" width="260"> | <img src="img/stany/deszcz.png" width="260"> | <img src="img/stany/snieg.png" width="260"> |
| **⛈ Burza** | **🌫 Mgła** | **🌙 Noc** |
| <img src="img/stany/burza.png" width="260"> | <img src="img/stany/mgla.png" width="260"> | <img src="img/stany/noc.png" width="260"> |
| **🪟 Okno uchylone i otwarte** | **🎨 Okleina drewnopodobna** | **🇬🇧 Po angielsku (język HA)** |
| <img src="img/stany/okno.png" width="260"> | <img src="img/okleiny.png" width="260"> | <img src="img/stany/en.png" width="260"> |

<details>
<summary>🌅 Pory dnia (dzień, złota godzina, zmierzch, noc, uchylenie, otwarcie)</summary>
<img src="img/pora-dnia.png" width="700">
</details>

## ⬇️ Instalacja przez HACS (zalecana)

Wymaga [HACS](https://hacs.xyz). Dzięki HACS każdą nową wersję zainstalujesz jednym kliknięciem „Aktualizuj”.

**Krok 1.** Kliknij ten przycisk:

[![Otwórz w HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin)

**Krok 2.** Kliknij **Otwórz link**. Gdy HACS zapyta „Dodać repozytorium?”, kliknij **Dodaj**.

<img src="img/instalacja/hacs-1.png" width="640" alt="Krok 2">

**Krok 3.** Kliknij **Pobierz** na dole po prawej i jeszcze raz **Pobierz** w okienku. Potem odśwież stronę: **Ctrl + Shift + R** (w telefonie zamknij i otwórz aplikację).

<img src="img/instalacja/hacs-2.png" width="640" alt="Krok 3">

<details>
<summary>Przycisk nie działa? Dodaj repozytorium ręcznie</summary>

1. **HACS → ⋮ (prawy górny róg) → Własne repozytoria**.
2. Repozytorium: `https://github.com/superdarco78/roleta-realistyczna`, typ: **Dashboard**, **Dodaj**.
3. Wyszukaj „Roleta dzień-noc” → **Pobierz**.
</details>

## 🧩 Dodanie karty i kreator

**Krok 4.** Na pulpicie kliknij ołówek (Edytuj) → **＋ Dodaj kartę** → wpisz **Roleta** → kliknij kartę.

<img src="img/instalacja/krok-6.png" width="640" alt="Krok 4">

**Krok 5.** Kreator otworzy się sam. Wybierz roletę, sprawdź, co karta wykryła, i wybierz wygląd.

<p>
  <img src="img/kreator-1.png" width="32%" alt="Kreator 1">
  <img src="img/kreator-2.png" width="32%" alt="Kreator 2">
  <img src="img/kreator-3.png" width="32%" alt="Kreator 3">
</p>

✅ **Gotowe.**

## 🛠 Instalacja ręczna

<details>
<summary>Bez HACS (rozwiń)</summary>

1. Pobierz `roleta-realistyczna.js` z [najnowszego wydania](https://github.com/superdarco78/roleta-realistyczna/releases/latest).

   <img src="img/instalacja/krok-1.png" width="560">
2. W dodatku **File editor** wgraj plik do folderu `www`.

   <img src="img/instalacja/krok-2.png" width="560">
3. **Ustawienia → Pulpity**.

   <img src="img/instalacja/krok-3.png" width="560">
4. **⋮ → Zasoby**.

   <img src="img/instalacja/krok-4.png" width="560">
5. **Dodaj zasób**: `/local/roleta-realistyczna.js`, **Moduł JavaScript**, **Utwórz**, potem **Ctrl + Shift + R**.

   <img src="img/instalacja/krok-5.png" width="560">
6. Dodaj kartę jak w [kroku 4](#-dodanie-karty-i-kreator).
</details>

## 🎛 Edytor

Wszystko ustawisz klikając, bez YAML. Działy: 🎨 Wygląd, 🪟 Okno, ⏱ Ruch i kalibracja, ⚙️ Zaawansowane. Na górze podgląd na żywo, który nie rusza prawdziwej rolety. Przycisk „🌍 Zapisz jako domyślne” przenosi Twój wygląd na wszystkie karty.

<img src="img/edytor.png" width="360" alt="Edytor">

<details>
<summary>YAML (dla zaawansowanych)</summary>

```yaml
type: custom:roleta-realistyczna
entity: cover.zaluzje_salon   # roleta albo grupa rolet (lewa + prawa)
name: Salon
```
</details>

## 🔄 Aktualizacja

Przez HACS: gdy pojawi się nowa wersja, w **Ustawieniach** zobaczysz aktualizację „Roleta dzień-noc”. Kliknij **Aktualizuj** i odśwież stronę. Co się zmieniło: [📝 Historia zmian](CHANGELOG.md) albo [Wydania](https://github.com/superdarco78/roleta-realistyczna/releases).

## ❓ Problemy

- **Nie ma karty na liście** → odśwież stronę (Ctrl + Shift + R), w telefonie zamknij i otwórz aplikację.
- **Animacja nie zgadza się z roletą** → w edytorze: ⏱ Ruch i kalibracja → **Kalibruj automatycznie**.
- **Coś innego** → [zgłoś błąd](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose).

Testowane z silnikami **Moes TS0601** (zigbee2mqtt); działa z każdą encją `cover.*`.

## 📜 Licencja

[CC BY-NC-SA 4.0](LICENSE) © [superdarco78](https://github.com/superdarco78). Do własnego, niekomercyjnego użytku z podaniem autora.
