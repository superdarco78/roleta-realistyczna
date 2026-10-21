/* Tworzy opis wydania z CHANGELOG.md i szablonu .github/release-notes.md.
   Użycie: node scripts/notatki-wydania.mjs owner/repo > notes.md
   Wypisuje też wersję i tytuł do pliku podanego w GITHUB_OUTPUT (gdy jest).
   Obrazek wydania: img/wydania/vNN.png (opcjonalny). */
import { readFileSync, existsSync, appendFileSync } from 'node:fs';

const repo = process.argv[2] || process.env.GITHUB_REPOSITORY || 'superdarco78/roleta-realistyczna';
const [wlasciciel, nazwa] = repo.split('/');
const log = readFileSync('CHANGELOG.md', 'utf8').split('\n');
const naglowki = log.map((l, i) => [l, i]).filter(([l]) => /^## v\d+/.test(l));
if (!naglowki.length) throw new Error('Brak „## vNN” w CHANGELOG.md');
const [glowa, od] = naglowki[0];
const wersja = glowa.match(/v\d+(\.\d+)*/)[0];
const tytul = glowa.replace(/^## /, '');
const poprzednia = naglowki[1]?.[0].match(/v\d+(\.\d+)*/)[0];
const zmiany = log.slice(od + 1, naglowki[1]?.[1] ?? log.length).join('\n').trim();

const url = `https://github.com/${repo}`;
const raw = `https://raw.githubusercontent.com/${repo}/main`;
const obrazek = existsSync(`img/wydania/${wersja}.png`)
  ? `<p align="center"><a name="r0" href="#r0"><img src="${raw}/img/wydania/${wersja}.png" width="100%" alt="${wersja}"></a></p>` : '';
const pola = {
  REPO: repo, REPO_URL: url, RAW: raw, WLASCICIEL: wlasciciel, NAZWA: nazwa, WERSJA: wersja, TYTUL: tytul, ZMIANY: zmiany, OBRAZEK: obrazek,
  POBIERZ: `${url}/releases/download/${wersja}/roleta-realistyczna.js`,
  PELNA_LISTA: poprzednia ? `${url}/compare/${poprzednia}...${wersja}` : `${url}/blob/main/CHANGELOG.md`
};
const szablon = readFileSync('.github/release-notes.md', 'utf8');
process.stdout.write(szablon.replace(/\{\{(\w+)\}\}/g, (m, k) => pola[k] ?? m));
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `wersja=${wersja}\ntytul=${tytul}\n`);
