import globals from 'globals';

/* Sprawdzanie kodu: `npm run lint` */
export default [
  {
    files: ['src/**/*.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.browser },
    rules: { 'no-undef': 'error', 'no-unused-vars': ['error', { args: 'none', caughtErrors: 'none' }], 'no-dupe-keys': 'error', 'no-unreachable': 'error', eqeqeq: ['error', 'smart'] }
  },
  {
    files: ['test/**/*.js', 'scripts/**/*.mjs', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 2022, sourceType: 'module', globals: globals.node }
  }
];
