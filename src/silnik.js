/* Silnik rolety: czas przejazdu (z prędkości, nauczony albo ręczny) */
export const rrCzas = (c, rpm, ucz) => c === 'auto' || !(+c > 0) ? (rpm > 0 ? 20.2 + 394 / rpm : ucz > 0 ? ucz : 30) : Math.max(3, +c);   // s pełnego przejazdu
/* v18: czas przejazdu, którego karta sama się nauczyła z prawdziwych ruchów rolety (pamięć przeglądarki) */
export const rrUcz = { get: e => { try { return +localStorage.getItem('rr-czas:' + e) || 0; } catch (x) { return 0; } },
  set: (e, v) => { try { localStorage.setItem('rr-czas:' + e, v.toFixed(1)); } catch (x) { /* brak pamięci – trudno */ } } };
