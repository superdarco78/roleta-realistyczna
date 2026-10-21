<p align="center"><img src="img/hero-en.png" alt="Roleta dzień-noc" width="100%"></p>

<p align="center">
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/v/release/superdarco78/roleta-realistyczna?style=for-the-badge&label=release&color=0288d1" alt="release"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/releases"><img src="https://img.shields.io/github/downloads/superdarco78/roleta-realistyczna/total?style=for-the-badge&label=downloads&color=2e7d32" alt="downloads"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/stargazers"><img src="https://img.shields.io/github/stars/superdarco78/roleta-realistyczna?style=for-the-badge&label=stars&color=f9a825&logo=github" alt="stars"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/commits/main"><img src="https://img.shields.io/github/commit-activity/y/superdarco78/roleta-realistyczna?style=for-the-badge&label=activity&color=6a1b9a" alt="activity"></a>
  <br>
  <a href="https://hacs.xyz"><img src="https://img.shields.io/badge/HACS-custom-41BDF5?style=for-the-badge&logo=homeassistantcommunitystore&logoColor=white" alt="HACS"></a>
  <a href="https://www.home-assistant.io/"><img src="https://img.shields.io/badge/Home%20Assistant-2024.8%2B-41BDF5?style=for-the-badge&logo=homeassistant&logoColor=white" alt="Home Assistant"></a>
  <a href="#translations"><img src="https://img.shields.io/badge/translations-PL%20%7C%20EN-2e7d32?style=for-the-badge&logo=googletranslate&logoColor=white" alt="translations"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-CC%20BY--NC--SA%204.0-green?style=for-the-badge" alt="license"></a>
  <br>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/validate.yml?style=for-the-badge&label=HACS%20validate&logo=homeassistantcommunitystore&logoColor=white" alt="HACS validate"></a>
  <a href="https://github.com/superdarco78/roleta-realistyczna/actions/workflows/release.yml"><img src="https://img.shields.io/github/actions/workflow/status/superdarco78/roleta-realistyczna/release.yml?style=for-the-badge&label=release%20build&logo=githubactions&logoColor=white" alt="Release build"></a>
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

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="img/animacja-ciemna.gif"><img src="img/animacja.gif" width="100%" alt="Animation"></picture></p>

<a name="start-in-4-steps"></a>
## 🚀 Start in 4 steps

<p align="center"><a href="#installation"><img src="img/start-en.png" width="100%" alt="Start in 4 steps"></a></p>

<p align="center"><a href="https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin"><img src="https://my.home-assistant.io/badges/hacs_repository.svg" alt="Open in HACS" height="48"></a><br><sub>⬆️ This is the button from step 1</sub></p>


#### 📖 Glossary: what do these words mean?


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


---

<a name="table-of-contents"></a>
## 📑 Table of contents

- [🚀 Start in 4 steps](#start-in-4-steps)
- [⬆️ Upgrading to v23](#upgrading-to-v23)
- [🪟 The Roleta dzień-noc card](#the-roleta-dzien-noc-card)
  - [Goals](#goals)
  - [How it looks](#how-it-looks)
  - [Colours and wood finishes](#colours-and-wood-finishes)
- [⬇️ Installation](#installation)
  - [With HACS (recommended)](#with-hacs-recommended)
  - [Manual](#manual)
- [🪄 First run: the wizard](#first-run-the-wizard)
- [👆 Actions: how to control it](#actions-how-to-control-it)
- [🎛 Editor](#editor)
- [📄 Options](#options)
- [🧪 Examples](#examples)
- [🔎 Auto-detection](#auto-detection)
- [🔌 Moes / Tuya motors](#moes-tuya-motors)
- [🧩 Card elements](#card-elements)
- [❓ FAQ](#faq)
- [🙋 Help wanted](#help-wanted)
- [🌍 Translations](#translations)
- [🧱 Project structure](#project-structure)
- [☕ Support](#support)

---

<a name="upgrading-to-v23"></a>
## ⬆️ Upgrading to v23

> [!IMPORTANT]
> Version 23 **does not change** your settings. Existing cards keep working.

**What's new**

- 🪄 A **7-step wizard** for beginners. Every step says **what** you pick and **why**.
- 🔍 The card finds blinds, motors, window sensors and weather by itself, best matches first.
- 🧹 Lists show only matching devices: no gates, garages or motion sensors.
- 🧭 When something is missing, the wizard says what to do and opens the right HA page in one click.
- 📋 Add a copy of the card to another dashboard or a new “Blinds” view in one click.
- 🌍 The wizard, card and menu follow your HA profile language.

**What to do:** click **Update** in HACS, then refresh with **Ctrl + Shift + R**. Full list: [📝 Changelog](CHANGELOG.md).

---


<a name="the-roleta-dzien-noc-card"></a>
## 🪟 The Roleta dzień-noc card

The card shows your day-night blind on a real-looking window. Drag the blind with your finger; the animation moves at the speed of the motor, and you see the current weather and time of day behind the glass.

<p align="center"><picture><source media="(prefers-color-scheme: dark)" srcset="img/opis-elementow-ciemny.png"><img src="img/opis-elementow.png" width="100%" alt="Card elements"></picture></p>

<a name="goals"></a>
### Goals

- ✅ The blind on screen should look and move **like the real one**.
- ✅ Setup should take **a minute, no YAML**, no extra helpers.
- ✅ Comfortable **touch control** on phones and tablets.
- ✅ Work with **any** blind and **any** home (language, weather, sensors).

<a name="how-it-looks"></a>
### How it looks

**Weather:**

<table>
<tr>
<td align="center" width="33%"><b>☀️ Sun</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/dzien.png"><img src="img/stany-jasne/dzien.png" width="100%"></picture></td>
<td align="center" width="33%"><b>🌧 Rain</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/deszcz.png"><img src="img/stany-jasne/deszcz.png" width="100%"></picture></td>
<td align="center" width="33%"><b>⛈ Storm</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/burza.png"><img src="img/stany-jasne/burza.png" width="100%"></picture></td>
</tr>
<tr>
<td align="center" width="33%"><b>❄️ Snow</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/snieg.png"><img src="img/stany-jasne/snieg.png" width="100%"></picture></td>
<td align="center" width="33%"><b>🌫 Fog</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/mgla.png"><img src="img/stany-jasne/mgla.png" width="100%"></picture></td>
<td align="center" width="33%"><b>☁️ Cloudy (English UI)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/en.png"><img src="img/stany-jasne/en.png" width="100%"></picture></td>
</tr>
</table>

**Time of day:**

<table>
<tr>
<td align="center" width="33%"><b>☀️ Day</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zwinieta.png"><img src="img/stany-jasne/zwinieta.png" width="100%"></picture></td>
<td align="center" width="33%"><b>🌅 Sunset</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zachod.png"><img src="img/stany-jasne/zachod.png" width="100%"></picture></td>
<td align="center" width="33%"><b>🌙 Night</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/noc.png"><img src="img/stany-jasne/noc.png" width="100%"></picture></td>
</tr>
</table>

**Blind position:**

<table>
<tr>
<td align="center" width="33%"><b>⬆️ Open (100%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zwinieta.png"><img src="img/stany-jasne/zwinieta.png" width="100%"></picture></td>
<td align="center" width="33%"><b>↕️ Half (50%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zachod.png"><img src="img/stany-jasne/zachod.png" width="100%"></picture></td>
<td align="center" width="33%"><b>⬇️ Closed (0%)</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/opuszczona.png"><img src="img/stany-jasne/opuszczona.png" width="100%"></picture></td>
</tr>
</table>

**Window (from contact sensors):**

<table>
<tr>
<td align="center" width="33%"><b>↘ Left tilted</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/uchylone.png"><img src="img/stany-jasne/uchylone.png" width="100%"></picture></td>
<td align="center" width="33%"><b>↔ Right opened</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/otwarte.png"><img src="img/stany-jasne/otwarte.png" width="100%"></picture></td>
<td align="center" width="33%"><b>🪟 Tilted and opened</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/okno.png"><img src="img/stany-jasne/okno.png" width="100%"></picture></td>
</tr>
</table>

<a name="colours-and-wood-finishes"></a>
### Colours and wood finishes

<table>
<tr>
<td align="center" width="33%"><b>Golden oak + beige</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/zloty.png"><img src="img/stany-jasne/zloty.png" width="100%"></picture></td>
<td align="center" width="33%"><b>Anthracite + turquoise</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/turkus.png"><img src="img/stany-jasne/turkus.png" width="100%"></picture></td>
<td align="center" width="33%"><b>1 sash</b><br><picture><source media="(prefers-color-scheme: dark)" srcset="img/stany/jedno.png"><img src="img/stany-jasne/jedno.png" width="100%"></picture></td>
</tr>
</table>

---

<a name="installation"></a>
## ⬇️ Installation

**Requirements:** Home Assistant **2024.8** or newer and a blind as a `cover.*` entity.

<a name="with-hacs-recommended"></a>
### With HACS (recommended)

**Step 1.** Click:

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=superdarco78&repository=roleta-realistyczna&category=plugin)

**Step 2.** Click **Open link**, then **Add** when HACS asks to add the repository.

<img src="img/instalacja/hacs-1.png" width="100%" alt="Step 2">

**Step 3.** Click **Download** (bottom right), then **Download** again.

<img src="img/instalacja/hacs-2.png" width="100%" alt="Step 3">

**Step 4.** Refresh the page: **Ctrl + Shift + R** (on a phone, close and reopen the HA app).


#### Button not working? Add the repository in HACS manually


1. **HACS → ⋮ → Custom repositories**.
2. Repository `https://github.com/superdarco78/roleta-realistyczna`, type **Dashboard**, **Add**.
3. Search for “Roleta dzień-noc” → **Download**.


<a name="manual"></a>
### Manual

Screenshots show the Polish HA interface; the buttons are in the same places in English.

**Step 1. Download the card file**

Open the [latest release](https://github.com/superdarco78/roleta-realistyczna/releases/latest) and click `roleta-realistyczna.js`.

<img src="img/instalacja/krok-1.png" width="100%" alt="Step 1">

**Step 2. Upload it to Home Assistant**

Open **File editor**, click the folder icon, go to `www` and upload the file with the up arrow.

<img src="img/instalacja/krok-2.png" width="100%" alt="Step 2">

**Step 3. Open Dashboards**

Click **Settings** at the bottom of the left menu, then **Dashboards**.

<img src="img/instalacja/krok-3.png" width="100%" alt="Step 3">

**Step 4. Open Resources**

Click the three dots **⋮** top right, then **Resources**.

<img src="img/instalacja/krok-4.png" width="100%" alt="Step 4">

**Step 4a. No “Resources”? Turn on Advanced mode**

Click your name at the bottom of the left menu and turn on **Advanced mode**. Then go back to step 4.

<img src="img/instalacja/krok-7.png" width="100%" alt="Step 4a">

**Step 5. Add the card as a resource**

Click **Add resource**, type `/local/roleta-realistyczna.js`, choose **JavaScript module** and click **Create**. Then refresh: **Ctrl + Shift + R**.

<img src="img/instalacja/krok-5.png" width="100%" alt="Step 5">

---

<a name="first-run-the-wizard"></a>
## 🪄 First run: the wizard

**Step 1. Add the card**

On your dashboard click the pencil, then **＋ Add card**, type **Roleta** and click the card.

<img src="img/instalacja/krok-6.png" width="100%" alt="Add card">

**Step 2. The wizard guides you**

The wizard opens by itself. It has 7 short steps:

| Step | What you pick | Why |
|:---:|---|---|
| 1 | 🪟 **Blind** | Which blind (or blind group) the card controls |
| 2 | 🔲 **Window** | How many sashes and which blind is on which |
| 3 | ⏱ **Motor** | So the animation moves as fast as the real blind |
| 4 | 🚪 **Window sensors** | So the card shows a tilted or open window |
| 5 | 🌦 **Weather** | Real weather behind the glass |
| 6 | 🎨 **Look and name** | A ready colour set and the card title |
| 7 | ✅ **Summary** | Check everything and choose where the card goes |

> [!TIP]
> Not sure? Keep what is selected at the top of the list. The card picked the best match.

<br>

**Step 1 of 7: pick the blind**

<img src="img/kreator/wizard-1-blind-light-en.png" width="100%" alt="Wizard: pick the blind">

<br>

**Step 7 of 7: check and save**

<img src="img/kreator/wizard-7-where-dark-en.png" width="100%" alt="Wizard: summary">

✅ **Done.** Click **Save**. Change anything later in the [editor](#editor).

---


<a name="actions-how-to-control-it"></a>
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

<picture><source media="(prefers-color-scheme: dark)" srcset="img/opis-elementow-ciemny.png"><img src="img/opis-elementow.png" width="100%" alt="Handles and buttons"></picture>

---

<a name="editor"></a>
## 🎛 Editor

Settings are grouped in collapsible sections, each with **↺ Restore defaults**. The live preview at the top **never moves the real blind**; pin it 📌 to see every change.

| Section | What you set |
|---|---|
| 🎨 Look | Stripe colours, frame colour (wood finishes and plain), sashes, mullion, height. |
| 🪟 Window | Contact sensors per sash, tilted or opened, how much. |
| ⏱ Motion & calibration | Travel time from motor speed, learned, or **🤖 Auto-calibrate**. |
| ⚙️ Advanced | Language, buttons, handles, steps, quick positions, vibration, inverted position, weather source, own background photo. |
| 🌍 Global | **Save as default** for all blind cards. |

<picture><source media="(prefers-color-scheme: dark)" srcset="img/edytor-jasne/para-podglad-dzialy-ciemne.png"><img src="img/edytor-jasne/para-podglad-dzialy.png" width="100%" alt="Preview and sections"></picture>

<picture><source media="(prefers-color-scheme: dark)" srcset="img/edytor-jasne/kontaktrony-ciemne.png"><img src="img/edytor-jasne/kontaktrony.png" width="100%" alt="Contact sensors"></picture>

---

<a name="options"></a>
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


---

<a name="examples"></a>
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


---

<a name="auto-detection"></a>
## 🔎 Auto-detection

| What | How |
|---|---|
| **Blind group** | Suggested first for a new card. |
| **Motor speed** | `number.*_motor_speed` on the same device. |
| **Contact sensors** | Window/door `binary_sensor.*` in the same area; left/right by name. |
| **Weather** | `weather.*`; if none, Open-Meteo for your home location (no API key). |
| **Language** | From your HA profile. |


---

<a name="moes-tuya-motors"></a>
## 🔌 Moes / Tuya motors

Tested with **Moes TS0601** (zigbee2mqtt). Travel time from motor speed ≈ 20.2 + 394 / rpm. False 0% / 100% reports while moving are ignored.


---

<a name="card-elements"></a>
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


---

<a name="faq"></a>
## ❓ FAQ


#### The card is not in “Add card”

Refresh with <b>Ctrl + Shift + R</b>, or restart the HA app on your phone.


#### Animation faster/slower than the blind

Editor → ⏱ Motion → <b>🤖 Auto-calibrate</b>.


#### Blind moves the wrong way

Enable <b>Invert position</b> in ⚙️ Advanced.


#### No weather

⚙️ Advanced → weather source <code>auto</code> or <code>internet</code>.


Still stuck? [Open an issue](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) or ask on the [HA forum](https://community.home-assistant.io/).


---

<a name="help-wanted"></a>
## 🙋 Help wanted

Different blind or motor? Tell us how it works with the card, with a screenshot. Ideas: [request a feature](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose).


---

<a name="translations"></a>
## 🌍 Translations

| Language | Status |
|---|---|
| 🇵🇱 Polski | ✅ 100% |
| 🇬🇧 English | ✅ 100% |

Want your language? Copy [`translations/en.json`](translations/en.json) to `translations/<code>.json`, translate it and send it in an [issue](https://github.com/superdarco78/roleta-realistyczna/issues/new/choose) or a pull request.


---

<a name="project-structure"></a>
## 🧱 Project structure

Source code is split into modules in [`src/`](src) (card, editor, 7-step wizard, dashboards, weather, detection and ranking, motor timing, colours, global settings, language), texts in [`translations/`](translations), tests in [`test/`](test). `npm install` → `npm run check` lints, tests and bundles everything with esbuild into `dist/roleta-realistyczna.js`, the single file HACS installs. GitHub runs the same checks on every change.


---

<a name="support"></a>
## ☕ Support

If you like the card, leave a ⭐ at the top of the page. Thank you!

<!-- Support (uncomment when links are ready):
[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-%E2%98%95-ffdd00?style=for-the-badge&logo=buymeacoffee&logoColor=black)](https://www.buymeacoffee.com/LINK)
-->

---

[CC BY-NC-SA 4.0](LICENSE) © [superdarco78](https://github.com/superdarco78). Personal, non-commercial use with attribution.

> [!NOTE]
> **© 2026 superdarco78.** The card, graphics and texts are licensed under [CC BY-NC-SA 4.0](LICENSE). Free for use in your home. Selling, reselling, republishing as your own or any commercial use only with the author's permission. Official source: [github.com/superdarco78/roleta-realistyczna](https://github.com/superdarco78/roleta-realistyczna).
