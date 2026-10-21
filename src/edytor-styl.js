/* Wygląd edytora (CSS) */
export const RR_EDYTOR_STYL = `
:host{display:block;container-type:inline-size}
.ed{display:grid;gap:16px}
/* v32: szeroki ekran (np. strona Okno HA) – ustawienia po lewej, duży podgląd po prawej, zawsze na wierzchu */
@container (min-width:900px){
 .ed{grid-template-columns:minmax(0,1fr) minmax(380px,44%);column-gap:24px;align-items:start}
 .ed>*{grid-column:1}
 .ed>.pv{grid-column:2;grid-row:1/span 40;position:sticky;top:12px;max-height:calc(100vh - 24px);overflow:auto}
 .ed>.pv .slot{max-width:none;zoom:1}
 .ed>.pv .pin-b:not(.wzo){display:none}
 .ed>.pv.pin .wxp.wx1,.ed>.pv.pin .pvh>span:first-child{display:revert}
}
.pv{background:var(--secondary-background-color,rgba(127,127,127,.12));border-radius:12px;padding:10px;display:grid;gap:8px;transition:box-shadow .3s}
.pv.pin{position:sticky;top:0;z-index:6;box-shadow:0 6px 14px rgba(0,0,0,.35);background:var(--card-background-color,var(--ha-card-background,#1c1c1c))}
.pv .slot{width:100%;max-width:520px;margin:0 auto}
.pv.pin .slot{zoom:.75}
.pv.pin .wxp.wx1,.pv.pin .pvh>span:first-child{display:none}.pv.pin .pvh{justify-content:flex-end}
.pv.fl{box-shadow:0 0 0 2px var(--primary-color,#03a9f4),0 6px 14px rgba(0,0,0,.35)}
.pin-b{border:none;background:none;cursor:pointer;font-size:16px;opacity:.45;padding:2px 4px}.pv.pin .pin-b{opacity:1}
.wxp{display:flex;flex-wrap:wrap;gap:6px}
.wxp button{border:none;border-radius:14px;padding:4px 10px;font:inherit;font-size:12px;cursor:pointer;color:var(--primary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wxp button[aria-pressed="true"]{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);box-shadow:none}
.pvh{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:12px;color:var(--secondary-text-color)}
.play{border:none;border-radius:16px;padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;background:var(--accent-color,var(--primary-color,#03a9f4));color:var(--text-accent-color,#fff)}
.grp{display:grid;gap:8px}
.lb{font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--secondary-text-color)}
.dots{display:flex;flex-wrap:wrap;gap:6px;padding:6px 2px 6px}
.dots .dot{flex:0 0 auto;scroll-snap-align:center}
.dot[aria-pressed="true"] .own{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.sec{border-radius:12px;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3));padding:0 12px}
.sec>summary{cursor:pointer;padding:12px 0;font-size:15px;font-weight:500;color:var(--primary-text-color);list-style:none}
.sec>summary::-webkit-details-marker{display:none}.sec>summary:after{content:"▾";float:right;transition:transform .2s}.sec[open]>summary:after{transform:rotate(180deg)}
.sec[open]{padding-bottom:12px}
.sec>.grp{margin-bottom:18px}
.rst{justify-self:start;border:none;background:none;color:var(--primary-color,#03a9f4);font:inherit;font-size:13px;cursor:pointer;padding:4px 0}
.wiz{border-radius:var(--ha-card-border-radius,12px);padding:16px;display:grid;gap:14px;background:var(--card-background-color,#1c1c1c);box-shadow:0 0 0 2px var(--primary-color,#03a9f4),0 4px 16px rgba(0,0,0,.25)}
.wiz[hidden]{display:none}
.wzh{display:flex;align-items:center;gap:8px;color:var(--primary-color,#03a9f4)}.wzh b{color:var(--primary-text-color);font-size:16px;font-weight:500}
.wzh span{font-size:12px;color:var(--secondary-text-color)}.wzx{margin-left:auto;border:none;background:none;color:var(--secondary-text-color);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:50%}
.wzs{display:flex;align-items:center}.wzs i{flex:1;height:2px;background:var(--divider-color,rgba(127,127,127,.3))}
.wzd{flex:none;width:34px;height:34px;padding:0;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;--mdc-icon-size:18px;
 background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color);transition:background .2s,box-shadow .2s}
.wzd.ok{background:rgba(var(--rgb-primary-color,3,169,244),.22);color:var(--primary-color,#03a9f4)}
.wzd.on{background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff);box-shadow:0 0 0 4px rgba(var(--rgb-primary-color,3,169,244),.25)}
.wzt{display:flex;align-items:center;gap:12px}.wzt h3{margin:0;font-size:20px;font-weight:400;color:var(--primary-text-color)}
.wzt ha-icon{--mdc-icon-size:26px;color:var(--primary-color,#03a9f4);background:rgba(var(--rgb-primary-color,3,169,244),.15);border-radius:50%;padding:8px}
.wzc{font-size:14px;line-height:1.45;color:var(--secondary-text-color);background:var(--secondary-background-color,rgba(127,127,127,.12));border-radius:10px;padding:8px 12px}
.wzc p{margin:3px 0}.wzc b{color:var(--primary-text-color);font-weight:500}
.wzb{display:grid;gap:12px}.wzb:empty{display:none}.wzp{display:grid;gap:8px}
.wzl{display:grid;gap:6px}
.wzl button{display:flex;align-items:center;gap:14px;text-align:left;border:none;border-radius:12px;padding:10px 12px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color);
 background:var(--card-background-color,rgba(127,127,127,.1));box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3));transition:box-shadow .15s,background .15s}
.wzl button:hover{background:var(--secondary-background-color,rgba(127,127,127,.12))}
.wzl button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--primary-color,#03a9f4);background:rgba(var(--rgb-primary-color,3,169,244),.08)}
.wzl ha-icon{flex:none;color:var(--state-icon-color,#44739e)}.wzl button[aria-pressed="true"] ha-icon{color:var(--primary-color,#03a9f4)}
.wzl small{display:block;color:var(--secondary-text-color);font-size:12px;margin-top:1px}
.wzl em{font-style:normal;font-size:11px;font-weight:500;color:var(--primary-color,#03a9f4);margin-left:6px;white-space:nowrap}.wzl em.au{color:var(--success-color,#43a047)}
.wzw{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.wzw b{font-weight:400;font-size:11px;padding:1px 8px;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color)}
.wor{display:flex;flex-wrap:wrap;gap:10px}.wo{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:12px;cursor:pointer;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4));font-size:14px;font-weight:500;color:var(--primary-text-color)}.wo .sw2{width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}.wown{display:grid;gap:8px;margin-top:4px}
.wzl .sw2{flex:none;display:inline-block;width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.4)}
.wzn{display:flex;gap:8px;align-items:center;border-top:1px solid var(--divider-color,rgba(127,127,127,.3));padding-top:12px}.wzn span{flex:1}
.wb{border:none;border-radius:20px;padding:9px 18px;font:inherit;font-size:14px;font-weight:500;cursor:pointer;background:var(--primary-color,#03a9f4);color:var(--text-primary-color,#fff)}
.wb.sec{background:transparent;color:var(--primary-color,#03a9f4);box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wb.sm{padding:5px 12px;font-size:13px}.wb[disabled]{opacity:.4;cursor:default}.wb[hidden]{display:none}
.wzg{display:grid;gap:10px}.wzg>.wb{justify-self:start}
ha-alert{display:block}
ha-alert:not(:defined){padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:rgba(3,155,229,.12);border-left:4px solid var(--info-color,#039be5)}
ha-alert[alert-type=warning]:not(:defined){background:rgba(255,166,0,.12);border-color:var(--warning-color,#ffa600)}
ha-alert[alert-type=error]:not(:defined){background:rgba(219,68,55,.12);border-color:var(--error-color,#db4437)}
ha-alert[alert-type=success]:not(:defined){background:rgba(67,160,71,.12);border-color:var(--success-color,#43a047)}
ha-alert:not(:defined) [slot=action]{display:inline-block;margin:8px 8px 0 0}
.wzi{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:14px;color:var(--primary-text-color)}
.lb .kn{text-transform:none;letter-spacing:0;color:var(--primary-text-color);margin-left:6px}
.dot{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;padding:0;color:var(--primary-text-color);font:inherit;font-size:12px;font-weight:500;line-height:1.25;text-align:center;width:74px}
.dot i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5);transition:transform .15s}
.dot[aria-pressed="true"] i{box-shadow:0 0 0 3px var(--card-background-color,#1c1c1c),0 0 0 6px var(--primary-color,#03a9f4),0 0 16px 6px var(--primary-color,#03a9f4);transform:scale(1.35)}
.dots .dot[aria-pressed="true"]{width:74px;font-weight:600}
.dots .dot[aria-pressed="true"] i,.dots .dot[aria-pressed="true"] .own{margin:4px 0 9px}
.dots{padding:14px 10px 8px}
.psl{display:none}
.dot[aria-pressed="true"]{color:var(--primary-text-color)}
.own{position:relative;width:34px;height:34px;border-radius:50%;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}
.own input{position:absolute;inset:-8px;width:50px;height:50px;opacity:0;cursor:pointer}
.osg{font-size:12px;font-weight:500;color:var(--primary-text-color);margin-top:4px}.seg.osl{display:flex;flex-wrap:wrap}.seg.osl button{display:inline-flex;align-items:center;gap:4px;padding:7px 10px;white-space:nowrap}.seg.osl ha-icon{--mdc-icon-size:18px}
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
