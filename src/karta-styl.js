import { RR_KASETA, RR_LISTWA, RR_PAS, RR_OKRES } from './stale.js';
import { rrHex, rrShade, rrRgba } from './kolory.js';

/* Wygląd karty (CSS) – zależy od koloru pasów, ramy, wysokości i liczby skrzydeł */
export const rrKartaStyl = ({ H, n, sloje, rama, col, c }) => `
:host{display:block}
.rr{padding:14px 14px 12px;user-select:none;-webkit-user-select:none}
.hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.hd ha-icon{--mdc-icon-size:22px;color:var(--primary-text-color);background:rgba(127,127,127,.18);border-radius:50%;padding:8px}
.nm{font-size:16px;font-weight:500;color:var(--primary-text-color)}
.ver{font-size:10px;font-weight:500;color:var(--secondary-text-color);border:1px solid var(--divider-color,rgba(127,127,127,.4));border-radius:8px;padding:0 5px;margin-left:6px;vertical-align:2px}
.sb{font-size:13px;color:var(--secondary-text-color)}
.pc{margin-left:auto;white-space:nowrap;font-size:22px;font-weight:600;color:var(--primary-text-color);font-variant-numeric:tabular-nums}
.win{position:relative;display:flex;height:${H}px;max-width:${Math.round(H * (n === 1 ? .55 : .9))}px;margin:0 auto;padding:6px;border-radius:3px;
 background:${sloje ? sloje + ',' : ''}${rama};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.45)}
.win.stal .slot+.slot{margin-left:10px}
.win.ruch .slot{margin:0;box-shadow:inset 0 8px 8px -8px rgba(0,0,0,.6),inset 0 -8px 8px -8px rgba(0,0,0,.6)}
.win.ruch .sash[data-i="0"]{padding-right:13px;background-image:linear-gradient(90deg,transparent calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 5px),transparent calc(100% - 5px))${sloje ? ',' + sloje : ''}}
.win.ruch .sash[data-i="0"] .handle{display:none}
.slot{position:relative;flex:1;margin:0 1.5px;perspective:700px;border-radius:2px;background:#2b3138;box-shadow:inset 0 0 8px rgba(0,0,0,.6)}
.sash{position:relative;height:100%;box-sizing:border-box;transition:transform 1.4s cubic-bezier(.4,.1,.2,1);padding:7px;border-radius:2px;background:${sloje ? sloje + ',' : ''}${rrShade(rama, -.03)};
 box-shadow:inset 0 0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.22);touch-action:none;cursor:ns-resize}
.handle{position:absolute;top:56%;width:6px;height:14px;margin-top:-7px;border-radius:3px;z-index:4;
 background:linear-gradient(90deg,${rrShade(rama, -.1)},${rrShade(rama, .25)},${rrShade(rama, -.16)});box-shadow:0 1px 2px rgba(0,0,0,.35)}
/* v19: klamka obraca się jak w prawdziwym oknie: w dół = zamknięte, poziomo = otwarte, w górę = uchylone;
   przy otwieraniu najpierw klamka, potem skrzydło – przy zamykaniu odwrotnie */
.handle:after{content:"";position:absolute;left:.5px;top:3px;width:5px;height:24px;border-radius:2.5px;transform-origin:2.5px 4px;
 background:linear-gradient(90deg,${rrShade(rama, -.14)},#fff,${rrShade(rama, -.2)});box-shadow:0 2px 3px rgba(0,0,0,.4);transition:transform .5s 1.3s}
.sash.otw[data-i="0"] .handle:after{transform:rotate(90deg);transition-delay:0s}
.sash.otw[data-i="1"] .handle:after{transform:rotate(-90deg);transition-delay:0s}
.sash.uchyl .handle:after{transform:rotate(180deg);transition-delay:0s}
.sash.otw,.sash.uchyl{transition-delay:.45s}
.sash[data-i="0"] .handle{right:0}.sash[data-i="1"] .handle{left:0}
.glass{position:relative;height:100%;overflow:hidden;border-radius:1px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),inset 0 3px 8px rgba(0,0,0,.28)}
.sky{position:absolute;inset:0}
.sky.day{background:linear-gradient(180deg,#5ea4e6 0%,#9fd0f5 60%,#d9eefb 100%)}
.sky.night{background:radial-gradient(1px 1px at 20% 40%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 70% 62%,#fff 50%,transparent 51%),
 radial-gradient(1.5px 1.5px at 45% 78%,#fff 50%,transparent 51%),radial-gradient(1px 1px at 80% 88%,#fff 50%,transparent 51%),
 linear-gradient(180deg,#0b1430 0%,#1b2a52 100%)}
.sky.plain{background:linear-gradient(180deg,#5b6b7a,#8d9aa6)}
.wx{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.wx i{position:absolute;display:block}
.wx .scn{position:absolute;left:0;bottom:0;width:100%;height:58%;display:block}
.drz{animation:rrdrz 2.4s ease-in-out infinite alternate}
@keyframes rrdrz{from{transform:rotate(-4deg)}to{transform:rotate(4deg)}}
.sun{top:52%;width:26%;aspect-ratio:1;border-radius:50%;background:radial-gradient(circle,#fffbe0 0 30%,#ffd84d 45%,rgba(255,216,77,.35) 58%,rgba(255,216,77,0) 70%);animation:rrsun 5s ease-in-out infinite}
@keyframes rrsun{50%{transform:scale(1.08);filter:brightness(1.1)}}
.sun.zl{top:66%;background:radial-gradient(circle,#fff0c0 0 28%,#ff9a3c 46%,rgba(255,120,50,.35) 60%,rgba(255,120,50,0) 72%)}
.moon{top:50%;width:15%;aspect-ratio:1;border-radius:50%;box-shadow:inset -6px 3px 0 0 #f1edcf;filter:drop-shadow(0 0 5px rgba(241,237,207,.55))}
.st{width:2px;height:2px;border-radius:50%;background:#fff;animation:rrst 3s ease-in-out infinite}
@keyframes rrst{50%{opacity:.15}}
.cl{left:-60%;aspect-ratio:3.2;border-radius:999px;filter:blur(.6px);animation:rrcl 60s linear infinite}
.cl:before,.cl:after{content:"";position:absolute;border-radius:50%;background:inherit}
.cl:before{left:14%;bottom:30%;width:38%;aspect-ratio:1}.cl:after{left:42%;bottom:22%;width:44%;aspect-ratio:1}
@keyframes rrcl{to{left:110%}}
.fog{left:-50%;width:200%;height:20%;background:linear-gradient(90deg,transparent,rgba(236,239,241,.75) 30%,rgba(236,239,241,.55) 70%,transparent);filter:blur(5px);animation:rrfog 18s ease-in-out infinite alternate}
@keyframes rrfog{to{transform:translateX(22%)}}
.dr{top:-14%;width:1.5px;height:12%;background:linear-gradient(rgba(225,236,247,0),rgba(225,236,247,.85));transform:skewX(-12deg);animation:rrdr .8s linear infinite}
@keyframes rrdr{to{transform:translate(-14px,1000%) skewX(-12deg)}}
.fl{top:-5%;border-radius:50%;background:#fff;opacity:.92;box-shadow:0 0 2px rgba(255,255,255,.8);animation:rrfl 7s linear infinite}
@keyframes rrfl{0%{top:-5%;transform:translateX(0)}25%{transform:translateX(7px)}75%{transform:translateX(-7px)}100%{top:105%;transform:translateX(0)}}
.fla{inset:0;background:#fff;opacity:0;animation:rrfla 7s linear infinite}
@keyframes rrfla{0%,88%,91%,93%,100%{opacity:0}89%,92%{opacity:.55}}
.refl{position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.15) 38%,transparent 46%)}
.cas{position:absolute;left:-1px;right:-1px;top:0;height:${RR_KASETA}px;z-index:4;border-radius:0 0 6px 6px;
 background:linear-gradient(180deg,#ffffff 0%,#f1f1f1 55%,#cfcfcf 100%);box-shadow:0 2px 3px rgba(0,0,0,.35)}
.cas:before{content:"";position:absolute;left:0;top:0;bottom:0;width:4px;background:#e2e2e2;border-radius:0 0 0 6px;box-shadow:1px 0 0 rgba(0,0,0,.08)}
.cas:after{content:"";position:absolute;right:0;top:0;bottom:0;width:4px;background:#e2e2e2;border-radius:0 0 6px 0;box-shadow:-1px 0 0 rgba(0,0,0,.08)}
.fabric{position:absolute;left:1px;right:1px;top:${RR_KASETA - 2}px;height:0;z-index:2;
 background:
  linear-gradient(90deg,rgba(0,0,0,.22),rgba(255,255,255,.05) 30%,rgba(0,0,0,0) 60%,rgba(0,0,0,.2)),
  repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px),
  linear-gradient(180deg,
   ${rrShade(col, .12)} 0px,${col} 2px,${col} ${RR_PAS - 3}px,${rrShade(col, -.25)} ${RR_PAS}px,
   ${rrRgba(c.siatka ? rrHex(c.siatka) : rrShade(col, .3), .62)} ${RR_PAS}px,${rrRgba(c.siatka ? rrShade(rrHex(c.siatka), .1) : rrShade(col, .4), .55)} ${RR_OKRES}px);
 background-size:100% 100%,100% 100%,100% ${RR_OKRES}px}
.bar{position:absolute;left:0;right:0;height:${RR_LISTWA}px;top:${RR_KASETA}px;z-index:3;border-radius:1px;
 background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)}
/* uchwyt do podnoszenia na środku dolnej listwy – złap i przeciągnij */
.bar:after{content:"";position:absolute;left:50%;top:100%;width:22px;height:9px;transform:translateX(-50%);border-radius:0 0 7px 7px;
 background:linear-gradient(180deg,#e9e9e9,#a9a9a9);box-shadow:0 2px 3px rgba(0,0,0,.45),inset 0 -2px 0 rgba(0,0,0,.12);cursor:grab}
.sash:active .bar:after{cursor:grabbing;filter:brightness(1.08)}
/* środkowy uchwyt (v11): na słupku między skrzydłami, na wysokości listew – rusza oba skrzydła */
.mid{position:absolute;left:50%;top:0;z-index:7;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;cursor:grab;touch-action:none;
 background:radial-gradient(circle at 35% 30%,#fff,#dcdcdc 70%,#bdbdbd);box-shadow:0 2px 5px rgba(0,0,0,.5),0 0 0 2px var(--primary-color,#03a9f4);
 display:flex;align-items:center;justify-content:center;color:#444}
.mid:active{cursor:grabbing;transform:scale(1.1)}
.mid svg{width:20px;height:20px;fill:currentColor}
.bezuch .bar:after,.bezuch .bar:before{display:none}
.bar:before{content:"";position:absolute;left:50%;top:-12px;width:48px;height:34px;transform:translateX(-50%);cursor:grab}
/* okno uchylone / otwarte (v15) – skrzydło razem z roletą (kaseta na skrzydle) */
.out{position:absolute;inset:3px;overflow:hidden;border-radius:2px}
.osky{position:absolute;inset:0}
.sash.uchyl{transform-origin:50% 100%;transform:rotateX(calc(-1deg * var(--rr-uch,14))) scaleY(calc(1 - var(--rr-uch,14) / 140));box-shadow:0 6px 14px rgba(0,0,0,.55)}   /* góra skrzydła do środka pokoju */
.sash.otw[data-i="0"]{transform-origin:0 50%;transform:rotateY(calc(-1deg * var(--rr-otw,41)));z-index:8}
.sash.otw[data-i="1"]{transform-origin:100% 50%;transform:rotateY(calc(1deg * var(--rr-otw,41)));z-index:8}
.sash.otw{box-shadow:0 0 14px rgba(0,0,0,.55)}
.ghost{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--primary-color,#03a9f4);z-index:6;display:none}
.ghost span{position:absolute;left:50%;transform:translateX(-50%);top:-22px;background:var(--primary-color,#03a9f4);color:#fff;font-size:12px;font-weight:600;padding:1px 7px;border-radius:9px;white-space:nowrap}
.mv{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:5;color:#fff;background:rgba(0,0,0,.5);
 width:26px;height:26px;border-radius:50%;display:none;align-items:center;justify-content:center}
.mv ha-icon{--mdc-icon-size:18px;animation:rrb 1s ease-in-out infinite}
@keyframes rrb{50%{transform:translateY(var(--rr-dy,-3px))}}
.bt{display:flex;gap:8px;margin-top:12px}
.bt button{flex:1;height:42px;border:none;border-radius:12px;cursor:pointer;color:var(--primary-text-color);
 background:var(--secondary-background-color,rgba(127,127,127,.15));display:flex;align-items:center;justify-content:center;transition:background .15s}
.bt button:active{background:rgba(127,127,127,.35)}
.bt button[disabled]{opacity:.35;cursor:default}
.bt ha-icon{--mdc-icon-size:22px}
.qk{display:flex;gap:6px;margin-top:8px}
.qk button{flex:1;height:28px;border:none;border-radius:9px;font-size:12px;cursor:pointer;color:var(--secondary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3))}
.qk button.on{color:var(--text-primary-color,#fff);background:var(--primary-color,#03a9f4);box-shadow:none}
`;
