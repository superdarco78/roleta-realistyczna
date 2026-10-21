/* Wygląd edytora (CSS) */
export const RR_EDYTOR_STYL = `
:host{display:block;container-type:inline-size;
 /* v39: wygląd 1:1 jak HA – tylko zmienne motywu HA (tło, ramka, zaokrąglenie i cień kart); zaznaczenia w kolorze akcentu */
 --rr-kafel:var(--ha-card-background,var(--card-background-color,#fff));
 --rr-ramka:var(--ha-card-border-color,var(--divider-color,#e0e0e0));
 --rr-cien:var(--ha-card-box-shadow,none);--rr-r:var(--ha-card-border-radius,12px);
 --rr-akc:var(--accent-color,#ff9800)}
.ed{display:grid;gap:16px}
/* v32: szeroki ekran (np. strona Motor HA) – ustawienia po lewej, duży podgląd po prawej, zawsze na wierzchu */
@container (min-width:900px){
 .ed{grid-template-columns:minmax(0,1fr) minmax(380px,44%);column-gap:24px;align-items:start}
 .ed>*{grid-column:1}
 .ed>.pv{grid-column:2;grid-row:1/span 40;position:sticky;top:12px;max-height:calc(100vh - 24px);overflow:auto}
 .ed>.pv .slot{max-width:none;zoom:1}
 .ed>.pv .pin-b:not(.wzo){display:none}
 .ed>.pv.pin .wxp.wx1,.ed>.pv.pin .pvh>span:first-child{display:revert}
}
.pv{background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien);border-radius:var(--rr-r);padding:10px;display:grid;gap:8px;transition:box-shadow .3s}
.pv.pin{position:sticky;top:0;z-index:6;box-shadow:0 6px 14px rgba(0,0,0,.35);background:var(--card-background-color,var(--ha-card-background,#1c1c1c))}
.pv .slot{width:100%;max-width:520px;margin:0 auto}
.pv.pin .slot{zoom:.75}
.pv.pin .wxp.wx1,.pv.pin .pvh>span:first-child{display:none}.pv.pin .pvh{justify-content:flex-end}
.pv.fl{box-shadow:0 0 0 2px var(--primary-color,#009ac7),0 6px 14px rgba(0,0,0,.35)}
.pin-b{border:none;background:none;cursor:pointer;font-size:16px;opacity:.45;padding:2px 4px}.pv.pin .pin-b{opacity:1}
.wxp{display:flex;flex-wrap:wrap;gap:6px}
.wxp button{border:none;border-radius:8px;height:32px;padding:0 12px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wxp button[aria-pressed="true"]{background:var(--rr-akc);color:var(--rr-na-akcencie,#fff);box-shadow:none}
.pvh{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:13px;color:var(--secondary-text-color)}
.play{border:none;border-radius:var(--rr-r);padding:6px 12px;font:inherit;font-size:13px;cursor:pointer;background:var(--accent-color,#ff9800);color:var(--rr-na-akcencie,#fff)}
.grp{display:grid;gap:8px}
.lb{font-size:13px;letter-spacing:.05em;text-transform:uppercase;color:var(--secondary-text-color)}
.dots{display:flex;flex-wrap:wrap;gap:6px;padding:6px 2px 6px}
.dots .dot{flex:0 0 auto;scroll-snap-align:center}
.dot[aria-pressed="true"] .own{box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 6px var(--rr-akc),0 0 14px 4px color-mix(in srgb,var(--rr-akc) 60%,transparent);transform:scale(1.35)}
.sec{border-radius:var(--rr-r);background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien);padding:0 14px}
.sec>summary{cursor:pointer;padding:14px 0;font-size:15px;font-weight:500;color:var(--primary-text-color);list-style:none}
.sec>summary::-webkit-details-marker{display:none}.sec>summary:after{content:"▾";float:right;transition:transform .2s}.sec[open]>summary:after{transform:rotate(180deg)}
.sec[open]{padding-bottom:12px}
.sec>.grp{margin-bottom:18px}
.rst{justify-self:start;border:none;background:none;color:var(--primary-color,#009ac7);font:inherit;font-size:13px;cursor:pointer;padding:4px 0}
.wiz{border-radius:var(--rr-r);padding:16px;display:grid;gap:14px;background:var(--rr-kafel);border:1px solid var(--rr-ramka);box-shadow:var(--rr-cien)}
.wiz[hidden]{display:none}
.ed.kr>:not(.wiz):not(.pv){display:none}
.wzh{display:flex;align-items:center;gap:8px;color:var(--primary-color,#009ac7)}.wzh b{color:var(--primary-text-color);font-size:16px;font-weight:500}
.wzh span{font-size:13px;color:var(--secondary-text-color)}.wzx{margin-left:auto;border:none;background:none;color:var(--secondary-text-color);cursor:pointer;font-size:18px;padding:4px 8px;border-radius:50%}
.wzs{display:flex;align-items:center}.wzs i{flex:1;height:2px;background:var(--divider-color,rgba(127,127,127,.3))}
.wzd{flex:none;width:38px;height:38px;padding:0;border:none;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;--mdc-icon-size:20px;
 background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color);transition:background .2s,box-shadow .2s}
.wzd.ok{background:color-mix(in srgb,var(--primary-color,#009ac7) 22%,transparent);color:var(--primary-color,#009ac7)}
.wzd.on{background:var(--primary-color,#009ac7);color:var(--rr-na-glownym,var(--text-primary-color,#fff));box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 5px var(--rr-akc)}
.wzt{display:flex;align-items:center;gap:12px}.wzt h3{margin:0;font-size:20px;font-weight:400;color:var(--primary-text-color)}
.wzt ha-icon{--mdc-icon-size:26px;color:var(--primary-color,#009ac7);background:color-mix(in srgb,var(--primary-color,#009ac7) 15%,transparent);border-radius:50%;padding:8px}
.wzc{font-size:15px;line-height:1.5;color:color-mix(in srgb,var(--primary-text-color,#e1e1e1) 82%,transparent);background:var(--secondary-background-color,rgba(127,127,127,.1));border-radius:var(--rr-r);padding:8px 12px}
.wzc p{margin:4px 0}.wzc b{color:var(--rr-akc);font-weight:600}
.wzb{display:grid;gap:12px}.wzb:empty{display:none}.wzp{display:grid;gap:8px}
.wzl{display:grid;gap:6px}
.wzl button{display:flex;align-items:center;gap:14px;text-align:left;border:none;border-radius:12px;padding:10px 12px;font:inherit;font-size:15px;cursor:pointer;color:var(--primary-text-color);
 background:var(--card-background-color,rgba(127,127,127,.1));box-shadow:inset 0 0 0 1px var(--rr-ramka);transition:box-shadow .15s,background .15s}
.wzl button:hover{background:var(--secondary-background-color,rgba(127,127,127,.12))}
.wzl button[aria-pressed="true"]{box-shadow:inset 0 0 0 2px var(--rr-akc);background:color-mix(in srgb,var(--rr-akc) 8%,transparent)}
.wzl ha-icon{flex:none;--mdc-icon-size:24px;color:var(--primary-color,#009ac7)}.wzl button[aria-pressed="true"] ha-icon{color:var(--primary-color,#009ac7)}
.wzl small{display:block;color:var(--secondary-text-color);font-size:13px;margin-top:1px}
.wzl em{font-style:normal;font-size:12px;font-weight:500;color:var(--primary-color,#009ac7);margin-left:6px;white-space:nowrap}.wzl em.au{color:var(--accent-color,#ff9800)}
.wzw{display:flex;flex-wrap:wrap;gap:4px;margin-top:5px}.wzw b{font-weight:400;font-size:12px;padding:1px 8px;border-radius:10px;background:var(--secondary-background-color,rgba(127,127,127,.15));color:var(--secondary-text-color)}
.wor{display:flex;flex-wrap:wrap;gap:10px}.wo{display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:12px;cursor:pointer;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4));font-size:14px;font-weight:500;color:var(--primary-text-color)}.wo .sw2{width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}.wown{display:grid;gap:8px;margin-top:4px}
.wzl .sw2{flex:none;display:inline-block;width:26px;height:26px;border-radius:6px;box-shadow:inset 0 0 0 1px rgba(127,127,127,.4)}
.wzn{display:flex;gap:8px;align-items:center;border-top:1px solid var(--divider-color,rgba(127,127,127,.3));padding-top:12px}.wzn span{flex:1}
.wb{border:none;border-radius:20px;height:40px;padding:0 20px;font:inherit;font-size:14px;font-weight:500;cursor:pointer;background:var(--primary-color,#009ac7);color:var(--rr-na-glownym,var(--text-primary-color,#fff))}
.wb.sec{background:transparent;color:var(--primary-color,#009ac7);box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.4))}
.wb.sm{height:32px;padding:0 14px;font-size:14px}.wb[disabled]{opacity:.4;cursor:default}.wb[hidden]{display:none}
.wzg{display:grid;gap:10px}.wzg>.wb{justify-self:start}
ha-alert{display:block}
ha-alert:not(:defined){padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:color-mix(in srgb,var(--info-color,#039be5) 12%,transparent);border-left:4px solid var(--info-color,#008bb3)}
ha-alert[alert-type=warning]:not(:defined){background:color-mix(in srgb,var(--warning-color,#ffa600) 12%,transparent);border-color:var(--warning-color,#ffa600)}
ha-alert[alert-type=error]:not(:defined){background:color-mix(in srgb,var(--error-color,#db4437) 12%,transparent);border-color:var(--error-color,#db4437)}
ha-alert[alert-type=success]:not(:defined){background:color-mix(in srgb,var(--success-color,#43a047) 12%,transparent);border-color:var(--success-color,#43a047)}
ha-alert:not(:defined) [slot=action]{display:inline-block;margin:8px 8px 0 0}
.wzi{margin:0;padding-left:4px;list-style:none;display:grid;gap:6px;font-size:15px;color:var(--primary-text-color)}
.wzi li{display:flex;align-items:flex-start;gap:8px}.wzi ha-icon{flex:none;--mdc-icon-size:20px;color:var(--primary-color,#009ac7)}.wzi ha-icon.uw{color:var(--warning-color,#ffa600)}.wzi ha-icon.in{color:var(--secondary-text-color)}
.wza{display:flex;gap:10px;align-items:flex-start;padding:10px 12px;border-radius:8px;font-size:14px;line-height:1.45;color:var(--primary-text-color);background:color-mix(in srgb,var(--primary-color,#009ac7) 12%,transparent);border-left:4px solid var(--primary-color,#009ac7)}.wza ha-icon{flex:none;color:var(--primary-color,#009ac7)}.wza .wb{margin:8px 8px 0 0}
.lb .kn{text-transform:none;letter-spacing:0;color:var(--primary-text-color);margin-left:6px}
.dot{display:flex;flex-direction:column;align-items:center;gap:3px;border:none;background:none;cursor:pointer;padding:0;color:var(--primary-text-color);font:inherit;font-size:13px;font-weight:500;line-height:1.25;text-align:center;width:78px}
.dot i{width:34px;height:34px;border-radius:50%;box-shadow:inset 0 0 0 1px rgba(127,127,127,.5);transition:transform .15s}
.dot[aria-pressed="true"] i{box-shadow:0 0 0 3px var(--rr-kafel),0 0 0 6px var(--rr-akc),0 0 14px 4px color-mix(in srgb,var(--rr-akc) 60%,transparent);transform:scale(1.35)}
.dots .dot[aria-pressed="true"]{width:78px;font-weight:600}
.dots .dot[aria-pressed="true"] i,.dots .dot[aria-pressed="true"] .own{margin:4px 0 9px}
.dots{padding:14px 10px 8px}
.psl{display:none}
.dot[aria-pressed="true"]{color:var(--primary-text-color)}
.own{position:relative;width:34px;height:34px;border-radius:50%;overflow:hidden;background:conic-gradient(red,yellow,lime,cyan,blue,magenta,red);box-shadow:inset 0 0 0 1px rgba(127,127,127,.5)}
.own input{position:absolute;inset:-8px;width:50px;height:50px;opacity:0;cursor:pointer}
.osg{font-size:13.5px;font-weight:500;color:var(--primary-text-color);margin-top:4px}.seg.osl{display:flex;flex-wrap:wrap}.seg.osl button{display:inline-flex;align-items:center;gap:4px;padding:7px 10px;white-space:nowrap}.seg.osl ha-icon{--mdc-icon-size:20px}
.seg{display:inline-flex;border-radius:var(--rr-r);overflow:hidden;box-shadow:inset 0 0 0 1px var(--rr-ramka)}
.seg button{border:none;background:none;min-height:40px;padding:0 16px;font:inherit;font-size:14px;cursor:pointer;color:var(--primary-text-color)}
.seg button[aria-pressed="true"]{background:var(--rr-akc);color:var(--rr-na-akcencie,#fff)}
.sl{display:grid;gap:2px}
.sl div{display:flex;justify-content:space-between;font-size:14px;color:var(--primary-text-color)}
.sl b{font-weight:500;font-variant-numeric:tabular-nums}
.sl input{width:100%;accent-color:var(--primary-color,#009ac7)}
.sl input.txt{box-sizing:border-box;padding:8px 10px;border-radius:8px;border:1px solid var(--divider-color,rgba(127,127,127,.4));background:transparent;color:inherit;font:inherit}
.sw{display:flex;align-items:center;justify-content:space-between;gap:12px;font-size:14px;color:var(--primary-text-color);padding:4px 0}
.hint{font-size:13.5px;color:color-mix(in srgb,var(--primary-text-color,#e1e1e1) 72%,transparent);line-height:1.4;margin:0}
.ver{font-size:12px;color:var(--secondary-text-color);text-align:right}
.kal{display:flex;flex-wrap:wrap;gap:8px}.kal .ok{background:var(--primary-color,#009ac7)}.play[disabled]{opacity:.4;cursor:default}
.kalw{display:flex;align-items:center;gap:12px;font-size:20px;font-variant-numeric:tabular-nums;color:var(--primary-text-color)}
`;
