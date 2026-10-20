/* Wygląd edytora (CSS) */
export const RR_EDYTOR_STYL = `
:host{display:block}
.ed{display:grid;gap:16px}
.pv{background:var(--secondary-background-color,rgba(127,127,127,.12));border-radius:12px;padding:10px;display:grid;gap:8px;transition:box-shadow .3s}
.pv.pin{position:sticky;top:0;z-index:6;box-shadow:0 6px 14px rgba(0,0,0,.35);background:var(--card-background-color,var(--ha-card-background,#1c1c1c))}
.pv.pin .slot{zoom:.5}
.pv.pin .wxp.wx1,.pv.pin .pvh>span:first-child{display:none}.pv.pin .pvh{justify-content:flex-end}
.pv.fl{box-shadow:0 0 0 2px var(--primary-color,#03a9f4),0 6px 14px rgba(0,0,0,.35)}
.pin-b{border:none;background:none;cursor:pointer;font-size:16px;opacity:.45;padding:2px 4px}.pv.pin .pin-b{opacity:1}
.wxp{display:flex;flex-wrap:wrap;gap:6px}
.wxp button{border:none;border-radius:14px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer;color:var(--primary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wxp button[aria-pressed="true"]{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);box-shadow:none}
.pvh{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:var(--secondary-text-color)}
.play{border:none;border-radius:16px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.grp{display:grid;gap:8px}
.lb{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--secondary-text-color)}
.dots{display:flex;flex-wrap:nowrap;gap:6px;overflow-x:auto;scroll-snap-type:x proximity;padding:6px 2px 6px;scrollbar-width:thin;-webkit-overflow-scrolling:touch}
.dots .dot{flex:0 0 auto;scroll-snap-align:center}
.dots:has([aria-pressed="true"]) .dot:not([aria-pressed="true"]) i,.dots:has([aria-pressed="true"]) .dot:not([aria-pressed="true"]) .own{filter:grayscale(1);opacity:.38;transition:filter .2s,opacity .2s}
.dots .dot:not([aria-pressed="true"]):hover i{filter:none;opacity:1}
.dot[aria-pressed="true"] .own{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.sec{border-radius:12px;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3));padding:0 12px}
.sec>summary{cursor:pointer;padding:12px 0;font-size:15px;font-weight:500;color:var(--primary-text-color);list-style:none}
.sec>summary::-webkit-details-marker{display:none}.sec>summary:after{content:"▾";float:right;transition:transform .2s}.sec[open]>summary:after{transform:rotate(180deg)}
.sec[open]{padding-bottom:12px}
.sec>.grp{margin-bottom:18px}
.rst{justify-self:start;border:none;background:none;color:var(--primary-color,#03a9f4);font:inherit;font-size:13px;cursor:pointer;padding:4px 0}
.wiz{border-radius:14px;padding:12px;display:grid;gap:10px;background:var(--secondary-background-color,rgba(127,127,127,.12));box-shadow:inset 0 0 0 2px var(--primary-color,#03a9f4)}
.wiz[hidden]{display:none}
.wzh{display:flex;align-items:center;gap:8px}.wzh span{font-size:12px;color:var(--secondary-text-color)}.wzx{margin-left:auto;border:none;background:none;color:inherit;cursor:pointer;font-size:16px}
.wzl{display:grid;gap:6px}.wzl button{text-align:left;border:none;border-radius:10px;padding:10px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color);background:var(--card-background-color,rgba(127,127,127,.1));box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3))}
.wzl button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--primary-color,#03a9f4)}.wzl small{display:block;color:var(--secondary-text-color);font-size:12px}
.wzl .sw2{display:inline-block;width:22px;height:22px;border-radius:5px;vertical-align:middle;margin-right:8px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.4)}
.wzi{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:14px}
.lb .kn{text-transform:none;letter-spacing:0;color:var(--primary-text-color);margin-left:6px}
.dot{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;padding:0;color:var(--secondary-text-color);font:inherit;font-size:11px;width:52px}
.dot i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5);transition:transform .15s}
.dot[aria-pressed="true"] i{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.dots .dot[aria-pressed="true"]{width:70px;font-weight:600}
.dots .dot[aria-pressed="true"] i,.dots .dot[aria-pressed="true"] .own{margin:4px 0 9px}
.dots{padding:14px 10px 8px}
.psl{width:100%;margin:2px 0 0;accent-color:var(--primary-color,#03a9f4);height:28px}
.dot[aria-pressed="true"]{color:var(--primary-text-color)}
.own{position:relative;width:34px;height:34px;border-radius:50%;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}
.own input{position:absolute;inset:-8px;width:50px;height:50px;opacity:0;cursor:pointer}
.seg{display:inline-flex;border-radius:10px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.seg button{border:none;background:none;padding:8px 16px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color)}
.seg button[aria-pressed="true"]{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.sl{display:grid;gap:2px}
.sl div{display:flex;justify-content:space-between;font-size:14px;color:var(--primary-text-color)}
.sl b{font-weight:500;font-variant-numeric:tabular-nums}
.sl input{width:100%;accent-color:var(--primary-color,#03a9f4)}
.sl input.txt{box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--divider-color,rgba(127,127,127,.4));background:transparent;color:inherit;font:inherit}
.sw{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:14px;color:var(--primary-text-color);padding:4px 0}
.hint{font-size:12px;color:var(--secondary-text-color);line-height:1.4;margin:0}
.ver{font-size:11px;color:var(--secondary-text-color);text-align:right}
.kal{display:flex;flex-wrap:wrap;gap:8px}.kal .ok{background:#2e7d32}.play[disabled]{opacity:.4;cursor:default}
.kalw{display:flex;align-items:center;gap:12px;font-size:20px;font-variant-numeric:tabular-nums;color:var(--primary-text-color)}
`;
