/* Składa src/ + translations/ w jeden plik dist/roleta-realistyczna.js (ten plik pobiera HACS).
   Na górze pliku: nagłówek © i licencja oraz historia zmian z src/historia-zmian.txt. */
import * as esbuild from 'esbuild';
import { readFileSync } from 'node:fs';

const banner = readFileSync('scripts/naglowek.txt', 'utf8') + readFileSync('src/historia-zmian.txt', 'utf8');
const opcje = {
  entryPoints: ['src/index.js'],
  outfile: 'dist/roleta-realistyczna.js',
  bundle: true,
  format: 'iife',
  target: 'es2020',
  charset: 'utf8',
  legalComments: 'none',
  banner: { js: banner.trimEnd() },
  logLevel: 'info'
};
if (process.argv.includes('--watch')) await (await esbuild.context(opcje)).watch();
else await esbuild.build(opcje);
