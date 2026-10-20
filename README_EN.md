<p align="center"><img src="img/hero-en.png" alt="Roleta dzień-noc" width="620"></p>

<p align="center">
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/v/release/superdarco78/roleta-realistyczna?style=for-the-badge&label=release&color=0288d1" alt="release"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/downloads/superdarco78/roleta-realistyczna/total?style=for-the-badge&label=downloads&color=2e7d32" alt="downloads"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/stargazers"><img src="https://img.shields.io/github/stars/superdarco78/roleta-realistyczna?style=for-the-badge&label=stars&color=f9a825&logo=github" alt="stars"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/commits/main"><img src="https://img.shields.io/github/commit-activity/y/superdarco78/roleta-realistyczna?style=for-the-badge&label=activity&color=6a1b9a" alt="activity"></a>
  <br>
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/Home%20Assistant-2024.8%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="#-translations"><img src="https://img.shields.io/badge/translations-PL%20%7C%20EN-2e7d32?style=for-the-badge&logo=googletranslate&logoColor=white" alt="translations"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-green?style=for-the-badge" alt="license"></a>
  <br>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/validate.yml?style=for-the-badge&label=HACS%20validate&logo=homeassistantcommunitystore&logoColor=white" alt="HACS validate"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/release.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/release.yml?style=for-the-badge&label=release%20build&logo=githubactions&logoColor=white" alt="release%20build"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/issues"><img src="https://img.shields.io/github/issues/superdarco78/roleta-realistyczna?style=for-the-badge&label=issues&color=e64a19" alt="issues"></a>
  <a href="https://github.com/superdarco78"><img src="https://img.shields.io/badge/maintainer-%40superdarco78-d32f2f?style=for-the-badge&logo=github" alt="maintainer"></a>
  <br>
  <a href="https://community.home-assistant.io/"><img src="https://img.shields.io/badge/forum-Home%20Assistant-41BDF5?style=for-the-badge&logo=discourse&logoColor=white" alt="Forum HA"></a>
  <a href="https://forum.arturhome.pl/"><img src="https://img.shields.io/badge/forum%20PL-arturhome.pl-dc143c?style=for-the-badge&logo=discourse&logoColor=white" alt="Forum PL"></a>
  <!-- Support (uncomment when the link is ready): <a href="https://www.buymeacoffee.com/LINK"><img src="https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black" alt="Buy me a coffee"></a> -->
</p>

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open in HACS" height="44"></a></p>
README: [🇵🇱 Polski](README.md) | **🇬🇧 English**

> [!TIP]
> The card works with **any roller blind** in Home Assistant (`cover.*`): Zigbee, Z-Wave, Tuya, Shelly, Somfy and more. It looks best with a day-night (zebra) blind on a 2-sash window, but 1 sash works too. When you add the card, **the wizard sets everything up for you**.

<p align="center"><img src="img/animacja.gif" width="380" alt="Animation"></p>

## 🚀 Start in 4 steps

<p align="center"><a href="#️-installation"><img src="img/start-en.png" width="100%" alt="Start in 4 steps"></a></p>

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open in HACS" height="48"></a><br><sub>⬆️ This is the button from step 1</sub></p>

<details><summary><b>📖 Glossary: what do these words mean?</b></summary>

| Word | In plain words |
|---|---|
| **Home Assistant (HA)** | The app that runs your smart home. |
| **HACS** | An “app store” for HA add-ons. You install the card and its updates from here. |
| **Card** | A tile on your HA screen, like this blind. |
| **Dashboard** | An HA screen that holds cards. |
| **`cover.…` entity** | Your blind, as HA sees it. |
| **Contact sensor** | A window sensor: knows if it is closed, tilted or open. |
| **Open / 100%** | Blind fully up, window uncovered. |
| **Closed / 0%** | Blind fully down, window covered. |
| **YAML** | Typing settings by hand. **Not needed here.** |
</details>

## 📑 Table of contents

- [🚀 Start in 4 steps](#-start-in-4-steps)
- [⬆️ Upgrading to v22](#️-upgrading-to-v22)
- [🪟 The Roleta dzień-noc card](#-the-roleta-dzień-noc-card)
  - [Goals](#goals)
  - [How it looks](#how-it-looks)
  - [Colours and wood finishes](#colours-and-wood-finishes)
- [⬇️ Installation](#️-installation)
  - [With HACS (recommended)](#with-hacs-recommended)
  - [Manual](#manual)
- [🪄 First run: the wizard](#-first-run-the-wizard)
- [👆 Actions: how to control it](#-actions-how-to-control-it)
- [🎛 Editor](#-editor)
- [📄 Options](#-options)
- [🧪 Examples](#-examples)
- [🔎 Auto-detection](#-auto-detection)
- [🔌 Moes / Tuya motors](#-moes--tuya-motors)
- [🧩 Card elements](#-card-elements)
- [❓ FAQ](#-faq)
- [🙋 Help wanted](#-help-wanted)
- [🌍 Translations](#-translations)
- [☕ Support](#-support)

---

## ⬆️ Upgrading to v22

> [!IMPORTANT]
> Version 22 **does not change** existing settings. Your cards keep working.

**What's new:**

- 🪄 A **3-step wizard** opens automatically when you add a new card.
- The editor is split into collapsible sections: 🎨 Look, 🪟 Window, ⏱ Motion & calibration, ⚙️ Advanced. Each has **↺ Restore defaults**.

**What to do:** update in HACS, refresh the page (**Ctrl + Shift + R**) and open the card editor to check everything. Full list: [📝 Changelog](CHANGELOG.md).

---

## 🪟 The Roleta dzień-noc card

The card shows your day-night blind on a real-looking window. Drag the blind with your finger; the animation moves at the speed of the motor, and you see the current weather and time of day behind the glass.

<p align="center"><img src="img/opis-elementow.png" width="100%" alt="Card elements"></p>

### Goals

- ✅ The blind on screen should look and move **like the real one**.
- ✅ Setup should take **a minute, no YAML**, no extra helpers.
- ✅ Comfortable **touch control** on phones and tablets.
- ✅ Work with **any** blind and **any** home (language, weather, sensors).

### How it looks

**Weather:**

<table>
<tr>
<td align="center"><b>☀️ Sun</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/dzien.png"><img src="img/stany-jasne/dzien.png" width="250"></picture></td>
<td align="center"><b>🌧 Rain</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/deszcz.png"><img src="img/stany-jasne/deszcz.png" width="250"></picture></td>
<td align="center"><b>⛈ Storm</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/burza.png"><img src="img/stany-jasne/burza.png" width="250"></picture></td>
</tr>
<tr>
<td align="center"><b>❄️ Snow</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/snieg.png"><img src="img/stany-jasne/snieg.png" width="250"></picture></td>
<td align="center"><b>🌫 Fog</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/mgla.png"><img src="img/stany-jasne/mgla.png" width="250"></picture></td>
<td align="center"><b>☁️ Cloudy (English UI)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/en.png"><img src="img/stany-jasne/en.png" width="250"></picture></td>
</tr>
</table>

**Time of day:**

<table>
<tr>
<td align="center"><b>☀️ Day</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zwinieta.png"><img src="img/stany-jasne/zwinieta.png" width="250"></picture></td>
<td align="center"><b>🌅 Sunset</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zachod.png"><img src="img/stany-jasne/zachod.png" width="250"></picture></td>
<td align="center"><b>🌙 Night</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/noc.png"><img src="img/stany-jasne/noc.png" width="250"></picture></td>
</tr>
</table>

**Blind position:**

<table>
<tr>
<td align="center"><b>⬆️ Open (100%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zwinieta.png"><img src="img/stany-jasne/zwinieta.png" width="250"></picture></td>
<td align="center"><b>↕️ Half (50%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zachod.png"><img src="img/stany-jasne/zachod.png" width="250"></picture></td>
<td align="center"><b>⬇️ Closed (0%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/opuszczona.png"><img src="img/stany-jasne/opuszczona.png" width="250"></picture></td>
</tr>
</table>

**Window (from contact sensors):**

<table>
<tr>
<td align="center"><b>↘ Left tilted</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/uchylone.png"><img src="img/stany-jasne/uchylone.png" width="250"></picture></td>
<td align="center"><b>↔ Right opened</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/otwarte.png"><img src="img/stany-jasne/otwarte.png" width="250"></picture></td>
<td align="center"><b>🪟 Tilted and opened</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/okno.png"><img src="img/stany-jasne/okno.png" width="250"></picture></td>
</tr>
</table>

### Colours and wood finishes

<table>
<tr>
<td align="center"><b>Golden oak + beige</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zloty.png"><img src="img/stany-jasne/zloty.png" width="250"></picture></td>
<td align="center"><b>Anthracite + turquoise</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/turkus.png"><img src="img/stany-jasne/turkus.png" width="250"></picture></td>
<td align="center"><b>1 sash</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/jedno.png"><img src="img/stany-jasne/jedno.png" width="250"></picture></td>
</tr>
</table>

---

## ⬇️ Installation

**Requirements:** Home Assistant **2024.8** or newer and a blind as a `cover.*` entity.

### With HACS (recommended)

**Step 1.** Click:

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin)

**Step 2.** Click **Open link**, then **Add** when HACS asks to add the repository.

<img src="img/instalacja/hacs-1.png" width="640" alt="Step 2">

**Step 3.** Click **Download** (bottom right), then **Download** again.

<img src="img/instalacja/hacs-2.png" width="640" alt="Step 3">

**Step 4.** Refresh the page: **Ctrl + Shift + R** (on a phone, close and reopen the HA app).

<details>
<summary>Button not working? Add the repository in HACS manually</summary>

1. **HACS → ⋮ → Custom repositories**.
2. Repository `https://github.com/superdarco78/roleta-realistyczna`, type **Dashboard**, **Add**.
3. Search for “Roleta dzień-noc” → **Download**.
</details>

### Manual

1. Download `roleta-realistyczna.js` from the [latest release](https://github.com/superdarco78/roleta-realistyczna/releases/latest).
2. Upload it to `/config/www/` (e.g. with the File editor add-on).
3. **Settings → Dashboards → ⋮ → Resources → Add resource**: `/local/roleta-realistyczna.js`, **JavaScript module**.
4. Refresh with **Ctrl + Shift + R**.

---

## 🪄 First run: the wizard

Dashboard → pencil (Edit) → **＋ Add card** → type **Roleta** → click the card. The wizard opens by itself:

| 1️⃣ Pick the blind | 2️⃣ What was detected | 3️⃣ Pick a look |
|:---:|:---:|:---:|
| <img src="img/kreator-1.png" width="250"> | <img src="img/kreator-2.png" width="250"> | <img src="img/kreator-3.png" width="250"> |
| Blind groups are listed first. | Motor, contact sensors, weather. Nothing to add. | 6 styles: modern, wood, Scandinavian, dark, walnut, colourful. |

---

## 👆 Actions: how to control it

| Action | How | Result |
|---|---|---|
| **Move one sash** | Drag the handle <img src="img/ikony/uchwyt-listwa.png" height="22"> on its bottom rail | Only that sash moves. |
| **Move both sashes** | Drag the round centre handle <img src="img/ikony/uchwyt-srodek.png" height="22"> | Both move together. |
| **Move anywhere** | Drag on the glass | Both sashes (or one with `osobno`). |
| **Stop** | Tap the blind while it moves, or <img src="img/ikony/stop.png" height="22"> | STOP. Next tap = move the other way. |
| **Open / close fully** | <img src="img/ikony/zwin.png" height="22"> / <img src="img/ikony/opusc.png" height="22"> | Moves to the end. |
| **Small step** | ▲ 5% / ▼ 5% | Clicks add up. |
| **Quick position** | Open / 75% / 50% / 25% / Closed | Set your own with `pozycje`. |

A dashed **“→ 50%”** line shows where the blind is going.

<img src="img/edytor/linia-celu.png" width="420" alt="Target line"> <img src="img/edytor/uchwyty.png" width="360" alt="Handles">

---

## 🎛 Editor

Settings are grouped in collapsible sections, each with **↺ Restore defaults**. The live preview at the top **never moves the real blind**; pin it 📌 to see every change.

| Section | What you set |
|---|---|
| 🎨 Look | Stripe colours, frame colour (wood finishes and plain), sashes, mullion, height. |
| 🪟 Window | Contact sensors per sash, tilted or opened, how much. |
| ⏱ Motion & calibration | Travel time from motor speed, learned, or **🤖 Auto-calibrate**. |
| ⚙️ Advanced | Language, buttons, handles, steps, quick positions, vibration, inverted position, weather source, own background photo. |
| 🌍 Global | **Save as default** for all blind cards. |

<img src="img/edytor/podglad.png" width="380" alt="Preview"> <img src="img/edytor/kontaktrony.png" width="420" alt="Contact sensors">

---

## 📄 Options

Everything can be set in the editor; the tables are for YAML fans. Option names are Polish.

| Name | Type | Default | Description |
|---|---|---|---|
| `type` | text | **required** | `custom:roleta-realistyczna` |
| `entity` | entity | **required** | `cover.*` or a blind group (left + right). |
| `name` | text | entity name | Card title. |
| `jezyk` | text | `auto` | `auto` (HA language), `pl`, `en`. |
| `kolor` | text | `czarny` | Solid stripe colour (palette name or `#rrggbb`). |
| `siatka` | text | like solid | Sheer stripe colour. |
| `rama` | text | `#f4f4f2` | Frame colour, e.g. `#8a5a3b` golden oak, `#3b3f45` anthracite. |
| `skrzydla` | number | `2` | Sashes: `1` or `2`. |
| `slupek` | text | `staly` | Mullion: `staly` (fixed) or `ruchomy` (moving). |
| `klamki` | bool | `true` | Handles turn when tilted/opened. |
| `wysokosc` | number | `260` | Window height in px. |
| `czujnik_lewe` / `czujnik_prawe` | entity | auto | Contact sensor per sash. |
| `tryb_lewe` / `tryb_prawe` | text | `uchyl` | `uchyl` (tilt) or `otworz` (open). |
| `kat_uchyl` | number | `14` | Tilt angle. |
| `otwarcie` | number | `40` | Opening width (%). |
| `auto_czujniki` | bool | `true` | Find contact sensors in the blind's area. |
| `roleta_lewa` / `roleta_prawa` | entity | – | Separate blinds per sash. |
| `czas` | number / `auto` | `auto` | Full travel time (s). |
| `predkosc_lewa` / `predkosc_prawa` | entity | auto | Motor speed `number.*`. |
| `odwroc` | bool | `false` | Inverted position. |
| `zrodlo` | text | `auto` | Weather: `auto`, `internet`, `brak` (none). |
| `pogoda` | entity | `auto` | `weather.*` entity. |
| `niebo` / `widok` | bool | `true` | Sky & weather / drawn street view. |
| `tlo` | text | – | Own background photo, e.g. `/local/view.jpg`. |
| `przyciski` | bool | `true` | Buttons and quick positions. |
| `pozycje` | text | `100,75,50,25,0` | Quick positions (100 = open). |
| `krok` | number | `5` | ▲/▼ step in %, `0` = off. |
| `uchwyty` / `uchwyt_srodek` | bool | `true` | Rail handles / centre handle. |
| `osobno` | bool | `false` | Dragging the glass moves one sash only. |
| `wibracja` | bool | `true` | Haptic feedback. |

## 🧪 Examples

```yaml
type: custom:roleta-realistyczna
entity: cover.living_room
```

```yaml
type: custom:roleta-realistyczna
entity: cover.living_left
name: Living room
roleta_lewa: cover.living_left
roleta_prawa: cover.living_right
czujnik_lewe: binary_sensor.window_left
tryb_lewe: uchyl
czujnik_prawe: binary_sensor.window_right
tryb_prawe: otworz
```

```yaml
type: custom:roleta-realistyczna
entity: cover.bedroom
skrzydla: 1
kolor: bezowy
rama: '#8a5a3b'
zrodlo: brak
jezyk: en
```

## 🔎 Auto-detection

| What | How |
|---|---|
| **Blind group** | Suggested first for a new card. |
| **Motor speed** | `number.*_motor_speed` on the same device. |
| **Contact sensors** | Window/door `binary_sensor.*` in the same area; left/right by name. |
| **Weather** | `weather.*`; if none, Open-Meteo for your home location (no API key). |
| **Language** | From your HA profile. |

## 🔌 Moes / Tuya motors

Tested with **Moes TS0601** (zigbee2mqtt). Travel time from motor speed ≈ 20.2 + 394 / rpm. False 0% / 100% reports while moving are ignored.

## 🧩 Card elements

| Element | Meaning |
|:---:|---|
| <img src="img/ikony/roleta.png" height="32"> | Blind icon: opens the entity details. |
| <img src="img/ikony/uchwyt-srodek.png" height="32"> | Centre handle: both sashes. |
| <img src="img/ikony/uchwyt-listwa.png" height="32"> | Rail handle: one sash. |
| <img src="img/ikony/klamki.png" height="32"> | Handles: down = closed, sideways = open, up = tilted. |
| <img src="img/ikony/zwin.png" height="32"> | Open fully. |
| <img src="img/ikony/stop.png" height="32"> | Stop. |
| <img src="img/ikony/opusc.png" height="32"> | Close fully. |
| <img src="img/ikony/slonce.png" height="32"> | Sun: daytime from `sun.sun`. |
| <img src="img/ikony/ksiezyc.png" height="32"> | Moon and stars: night. |

## ❓ FAQ

<details><summary><b>The card is not in “Add card”</b></summary>Refresh with <b>Ctrl + Shift + R</b>, or restart the HA app on your phone.</details>
<details><summary><b>Animation faster/slower than the blind</b></summary>Editor → ⏱ Motion → <b>🤖 Auto-calibrate</b>.</details>
<details><summary><b>Blind moves the wrong way</b></summary>Enable <b>Invert position</b> in ⚙️ Advanced.</details>
<details><summary><b>No weather</b></summary>⚙️ Advanced → weather source <code>auto</code> or <code>internet</code>.</details>

Still stuck? [Open an issue](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) or ask on the [HA forum](https://community.home-assistant.io/).

## 🙋 Help wanted

Different blind or motor? Tell us how it works with the card, with a screenshot. Ideas: [request a feature](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose).

## 🌍 Translations

| Language | Status |
|---|---|
| 🇵🇱 Polski | ✅ 100% |
| 🇬🇧 English | ✅ 100% |

Want your language? Open an [issue](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose). Texts live in `RR_TXT` and `RR_ED` in `roleta-realistyczna.js`.

## ☕ Support

If you like the card, leave a ⭐ at the top of the page. Thank you!

<!-- Support (uncomment when links are ready):
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/LINK)
-->

---

[CC BY-NC-SA 4.0](LICENSE) © [superdarco78](https://github.com/superdarco78). Personal, non-commercial use with attribution.

> [!NOTE]
> **© 2026 superdarco78.** The card, graphics and texts are licensed under [CC BY-NC-SA 4.0](LICENSE). Free for use in your home. Selling, reselling, republishing as your own or any commercial use only with the author's permission. Official source: [github.com/superdarco78/roleta-realistyczna](https://github.com/superdarco78/roleta-realistyczna).
