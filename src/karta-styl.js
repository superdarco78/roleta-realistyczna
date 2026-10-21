import { RR_KASETA, RR_LISTWA, RR_PAS, RR_OKRES } from './stale.js';
import { rrHex, rrShade, rrRgba } from './kolory.js';

/* v26: materiał osłony – 3 warstwy: cień brzegów, splot, wzór powtarzany co RR_OKRES px (jedzie razem z listwą) */
export function rrTkanina(typ, col, c) {
  const S = (k) => rrShade(col, k), A = (x, a) => rrRgba(x, a);
  const brzegi = 'linear-gradient(90deg,rgba(0,0,0,.22),rgba(255,255,255,.05) 30%,rgba(0,0,0,0) 60%,rgba(0,0,0,.2))';
  const splot = 'repeating-linear-gradient(90deg,rgba(255,255,255,.07) 0 1px,transparent 1px 3px)', bez = 'linear-gradient(transparent,transparent)';
  const h = RR_OKRES / 2;
  /* dwa pionowe paski na 25% i 75% szerokości: sznurki drabinek (żaluzje) albo taśmy podnoszące (żaluzje fasadowe) */
  const tasmy = (k, w) => `linear-gradient(90deg,transparent calc(25% - ${w / 2}px),${k} calc(25% - ${w / 2}px),${k} calc(25% + ${w / 2}px),transparent calc(25% + ${w / 2}px),transparent calc(75% - ${w / 2}px),${k} calc(75% - ${w / 2}px),${k} calc(75% + ${w / 2}px),transparent calc(75% + ${w / 2}px))`;
  const pancerz = o => `${S(.25)} ${o}px,${col} ${o + 3}px,${col} ${o + 9}px,${S(-.35)} ${o + 12}px,rgba(0,0,0,.55) ${o + 12}px,rgba(0,0,0,.55) ${o + h}px`;
  switch (typ) {
    case 'pelna': case 'kasetowa': return `${brzegi},${splot},linear-gradient(180deg,${col} 0,${S(-.06)} ${h}px,${col} ${RR_OKRES}px)`;
    /* v27: zaciemniająca – gęsta tkanina z powłoką, lekki połysk, bez prześwitu */
    case 'zaciemniajaca': return `${brzegi},linear-gradient(90deg,rgba(255,255,255,0) 20%,rgba(255,255,255,.07) 45%,rgba(255,255,255,0) 70%),linear-gradient(180deg,${col} 0,${S(.03)} ${h}px,${col} ${RR_OKRES}px)`;
    case 'plisa': return `${brzegi},${bez},linear-gradient(180deg,${A(S(.2), .94)} 0,${A(col, .94)} 5px,${A(S(-.24), .96)} ${h - .5}px,${A(S(.2), .94)} ${h}px,${A(col, .94)} ${h + 5}px,${A(S(-.24), .96)} ${RR_OKRES - .5}px,${A(S(.2), .94)} ${RR_OKRES}px)`;
    /* v27: plaster miodu – plisa podwójna, w każdym fałdzie widać szew komórki */
    case 'plaster': {
      const kom = o => `${A(S(.24), .95)} ${o}px,${A(col, .93)} ${o + 3}px,${A(S(-.12), .94)} ${o + 6}px,${A(S(-.34), .97)} ${o + 6.5}px,${A(S(.1), .93)} ${o + 7}px,${A(col, .93)} ${o + 10}px,${A(S(-.28), .96)} ${o + h - .5}px`;
      return `${brzegi},${bez},linear-gradient(180deg,${kom(0)},${kom(h)},${A(S(.24), .95)} ${RR_OKRES}px)`;
    }
    case 'rzymska': return `${brzegi},${splot},linear-gradient(180deg,${A(col, .93)} 0,${A(S(.12), .93)} 17px,${A(S(-.28), .96)} ${RR_OKRES - 1}px,${A(S(.1), .93)} ${RR_OKRES}px)`;
    case 'zaluzja': {
      const lam = o => `${S(.32)} ${o}px,${col} ${o + 4}px,${S(-.3)} ${o + 10}px,rgba(0,0,0,.35) ${o + 10}px,transparent ${o + 11}px,transparent ${o + h}px`;
      return `${tasmy('rgba(235,235,235,.75)', 1)},${bez},linear-gradient(180deg,${lam(0)},${lam(h)})`;
    }
    /* v27: drewniana 50 mm – szerokie lamele ze słojami, taśmy drabinkowe */
    case 'drewniana': return `${tasmy(A(S(-.18), .95), 6)},repeating-linear-gradient(90deg,rgba(0,0,0,.07) 0 1px,transparent 1px 5px,rgba(255,255,255,.06) 5px 6px,transparent 6px 11px),` +
      `linear-gradient(180deg,${S(.2)} 0,${col} 5px,${S(-.1)} 15px,${S(-.34)} 21px,rgba(0,0,0,.4) 21px,transparent 22.5px,transparent ${RR_OKRES}px)`;
    case 'zewnetrzna': case 'podtynkowa': return `${brzegi},${bez},linear-gradient(180deg,${pancerz(0)},${pancerz(h)})`;
    /* v27: natynkowa – profil aluminiowy z rowkiem na środku */
    case 'natynkowa': {
      const pro = o => `${S(.28)} ${o}px,${col} ${o + 3}px,${S(.08)} ${o + 6}px,${S(-.2)} ${o + 6.5}px,${col} ${o + 7.5}px,${S(-.38)} ${o + 12}px,rgba(0,0,0,.55) ${o + 12}px,rgba(0,0,0,.55) ${o + h}px`;
      return `${brzegi},${bez},linear-gradient(180deg,${pro(0)},${pro(h)})`;
    }
    /* v27: perforowana – w każdym profilu rząd małych otworów, przez które wpada światło */
    case 'perforowana': return `${brzegi},radial-gradient(1.8px 1px at 50% 6.5px,rgba(255,246,214,.9) 70%,transparent 100%),linear-gradient(180deg,${pancerz(0)},${pancerz(h)})`;
    /* v27: żaluzja fasadowa C80 – wygięte lamele, taśmy podnoszące */
    case 'fasadowa': {
      const c80 = o => `${S(-.3)} ${o}px,${S(.28)} ${o + 3}px,${S(.1)} ${o + 7}px,${S(-.26)} ${o + 11}px,rgba(0,0,0,.6) ${o + 11.5}px,rgba(0,0,0,.3) ${o + h}px`;
      return `${tasmy('rgba(30,30,30,.55)', 2)},${bez},linear-gradient(180deg,${c80(0)},${c80(h)})`;
    }
    /* v27: żaluzja fasadowa Z90 – płaskie lamele w kształcie Z z czarną uszczelką */
    case 'fasadowaz': {
      const z90 = o => `${S(.16)} ${o}px,${col} ${o + 2}px,${col} ${o + 9}px,${S(-.22)} ${o + 10.5}px,#1d1d1d ${o + 10.5}px,#1d1d1d ${o + 12}px,${S(-.45)} ${o + h}px`;
      return `${tasmy('rgba(30,30,30,.45)', 2)},${bez},linear-gradient(180deg,${z90(0)},${z90(h)})`;
    }
    /* v27: screen ZIP – zewnętrzna tkanina z siatki, przez którą trochę widać */
    case 'screen': return `${brzegi},repeating-linear-gradient(90deg,rgba(0,0,0,.2) 0 1px,transparent 1px 2px),linear-gradient(180deg,${A(col, .82)} 0,${A(S(.06), .8)} ${h}px,${A(col, .82)} ${RR_OKRES}px)`;
    /* v40: markiza tarasowa – szerokie pasy, lekkie fałdy w poprzek */
    case 'markiza': return `${brzegi},repeating-linear-gradient(90deg,${col} 0 14px,${A('#f3efe6', .97)} 14px 28px),linear-gradient(180deg,rgba(255,255,255,.1) 0,rgba(0,0,0,.12) ${h}px,rgba(255,255,255,.1) ${RR_OKRES}px)`;
    default: return `${brzegi},${splot},linear-gradient(180deg,
   ${S(.12)} 0px,${col} 2px,${col} ${RR_PAS - 3}px,${S(-.25)} ${RR_PAS}px,
   ${A(c.siatka ? rrHex(c.siatka) : S(.3), .62)} ${RR_PAS}px,${A(c.siatka ? rrShade(rrHex(c.siatka), .1) : S(.4), .55)} ${RR_OKRES}px)`;
  }
}

/* v27: kaseta, prowadnice boczne i listwa dolna zależne od rodzaju osłony (dopisywane na końcu stylu karty) */
export function rrOslonaStyl(typ, col, rama) {
  const S = k => rrShade(col, k), R = k => rrShade(rama, k);
  const kas = (bg, ext = '') => `.cas{background:${bg};border-radius:0 0 2px 2px;${ext}}.cas:before,.cas:after{background:${S(-.12)};border-radius:0}`;
  const prow = (w, bg) => `.glass:before,.glass:after{content:"";position:absolute;top:${RR_KASETA - 2}px;bottom:0;width:${w}px;z-index:4;pointer-events:none;background:${bg};box-shadow:0 0 2px rgba(0,0,0,.45)}
.glass:before{left:0}.glass:after{right:0}.fabric{left:${w - 2}px;right:${w - 2}px}.bar{left:${w - 3}px;right:${w - 3}px}`;
  const alu = `linear-gradient(90deg,${S(-.4)},${S(.22)} 40%,${S(-.05)} 70%,${S(-.45)})`;
  const listwa = `.bar{background:linear-gradient(180deg,${S(.35)},${S(.05)} 55%,${S(-.4)});box-shadow:0 2px 0 rgba(20,20,20,.85),0 3px 3px rgba(0,0,0,.4)}`;
  const lamela = `.bar{background:linear-gradient(180deg,${S(.3)},${col} 50%,${S(-.3)})}`;
  switch (typ) {
    case 'zaciemniajaca': return prow(4, 'linear-gradient(90deg,#c9c9c9,#fafafa 45%,#b5b5b5)');
    /* v40: wolnowisząca – sam wałek z tkaniną na uchwytach, bez kasety i prowadnic */
    case 'pelna': return `.cas{left:3px;right:3px;height:${RR_KASETA - 2}px;border-radius:${RR_KASETA}px;background:linear-gradient(180deg,${S(.3)},${col} 50%,${S(-.38)})}.cas:before,.cas:after{width:5px;background:linear-gradient(90deg,#d8d8d8,#fafafa,#bdbdbd);border-radius:2px}`;
    /* v40: w kasecie – kaseta i prowadnice w kolorze ramy okna */
    case 'kasetowa': return `.cas{background:linear-gradient(180deg,${R(.06)},${rama} 50%,${R(-.18)});border-radius:0 0 3px 3px}.cas:before,.cas:after{background:${R(-.06)};border-radius:0}` + prow(4, `linear-gradient(90deg,${R(-.2)},${R(.06)} 45%,${R(-.14)})`);
    /* v40: markiza – kaseta aluminiowa i profil przedni z falbaną */
    case 'markiza': return kas(`linear-gradient(180deg,#e8eaec,#c3c7cb 60%,#8d9297)`, `height:${RR_KASETA + 4}px;box-shadow:0 3px 5px rgba(0,0,0,.45)`) +
      `.bar{height:16px;background:linear-gradient(180deg,#eef0f2,#a7acb1) top/100% ${RR_LISTWA}px no-repeat,radial-gradient(circle at 7px 0,${col} 6.5px,transparent 7px) 0 ${RR_LISTWA}px/14px 11px repeat-x;box-shadow:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.35))}`;
    case 'zaluzja': case 'drewniana': return kas(`linear-gradient(180deg,${S(.3)},${col} 55%,${S(-.35)})`) + lamela;
    case 'zewnetrzna': case 'perforowana':   // nadstawna: kaseta nad oknem w kolorze ramy
      return `.cas{background:linear-gradient(180deg,${R(.05)},${rama} 45%,${R(-.16)});border-radius:0;box-shadow:inset 0 -2px 0 rgba(0,0,0,.12),0 2px 3px rgba(0,0,0,.35)}.cas:before,.cas:after{background:${R(-.08)};border-radius:0}` + prow(5, alu) + listwa;
    case 'natynkowa':   // skrzynka na elewacji ze ściętym frontem 45°
      return kas(`linear-gradient(180deg,${S(.36)} 0,${S(.18)} 50%,${S(-.3)} 51%,${S(-.05)} 100%)`, `height:${RR_KASETA + 8}px;box-shadow:0 3px 5px rgba(0,0,0,.5)`) + prow(6, alu) + listwa;
    case 'podtynkowa':   // skrzynka schowana w ścianie: widać tylko tynk i szczelinę
      return `.cas{background:linear-gradient(180deg,#ebe7de 0,#d6d1c6 58%,#3a3a3a 60%,#151515 100%);border-radius:0;box-shadow:none}.cas:before,.cas:after{background:#ddd8cd;border-radius:0;box-shadow:none}` + prow(5, alu) + listwa;
    case 'fasadowa': case 'fasadowaz': return kas(`linear-gradient(180deg,${S(.3)},${S(.05)} 70%,${S(-.3)})`) + prow(4, alu) + listwa;
    case 'screen': return kas(`linear-gradient(180deg,${S(.3)},${S(.08)} 60%,${S(-.35)})`) + prow(6, `linear-gradient(90deg,${S(-.45)},${S(.15)} 35%,#111 50%,${S(.15)} 65%,${S(-.45)})`) + listwa;
    default: return '';
  }
}

/* Wygląd karty (CSS) – zależy od koloru pasów, ramy, wysokości i liczby skrzydeł */
export const rrKartaStyl = ({ H, n, sloje, rama, col, c }) => `
:host{display:block}
.rr{padding:12px;user-select:none;-webkit-user-select:none}
.hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.hd ha-icon{--mdc-icon-size:24px;color:var(--primary-color,#009ac7);background:color-mix(in srgb,var(--primary-color,#009ac7) 20%,transparent);border-radius:50%;padding:8px}
.nm{font-size:16px;font-weight:500;color:var(--primary-text-color)}
.sb{font-size:14px;color:var(--secondary-text-color)}
.pc{margin-left:auto;white-space:nowrap;font-size:22px;font-weight:600;color:var(--primary-text-color);font-variant-numeric:tabular-nums}
.win{position:relative;display:flex;height:${H}px;max-width:${Math.round(H * (n === 1 ? .72 : .9))}px;margin:0 auto;padding:6px;border-radius:3px;
 background:${sloje ? sloje + ',' : ''}${rama};box-shadow:inset 0 0 0 1px rgba(0,0,0,.18),0 3px 10px rgba(0,0,0,.45)}
.win.stal .slot+.slot{margin-left:10px}
.win.ruch .slot{margin:0;box-shadow:inset 0 8px 8px -8px rgba(0,0,0,.6),inset 0 -8px 8px -8px rgba(0,0,0,.6)}
.win.ruch .sash[data-i="0"]{padding-right:13px;background-image:linear-gradient(90deg,transparent calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 7px),rgba(0,0,0,.2) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 6px),rgba(255,255,255,.25) calc(100% - 5px),transparent calc(100% - 5px))${sloje ? ',' + sloje : ''}}
.win.ruch .sash[data-i="0"] .handle{display:none}
.slot{position:relative;flex:1;margin:0 1.5px;perspective:700px;border-radius:2px;background:#2b3138;box-shadow:inset 0 0 8px rgba(0,0,0,.6)}
.sash{position:relative;height:100%;box-sizing:border-box;transition:transform 1.4s cubic-bezier(.4,.1,.2,1);padding:7px;border-radius:2px;background:${sloje ? sloje + ',' : ''}${rrShade(rama, -.03)};
 box-shadow:inset 0 0 0 1px rgba(0,0,0,.16),0 1px 2px rgba(0,0,0,.22);touch-action:none;cursor:ns-resize}
.handle{position:absolute;top:56%;width:8px;height:18px;margin-top:-9px;border-radius:4px;z-index:9;
 background:linear-gradient(90deg,#8d9297,#f4f5f6 45%,#6f7479);box-shadow:0 0 0 1px rgba(0,0,0,.45),0 1px 3px rgba(0,0,0,.5)}
/* v25: klamka zawsze nad roletą, większa i w kolorze srebrnym z ciemnym obrysem – widać ją na każdej ramie i w każdym motywie */
/* v19: klamka obraca się jak w prawdziwym oknie: w dół = zamknięte, poziomo = otwarte, w górę = uchylone;
   przy otwieraniu najpierw klamka, potem skrzydło – przy zamykaniu odwrotnie */
.handle:after{content:"";position:absolute;left:.5px;top:4px;width:7px;height:32px;border-radius:3.5px;transform-origin:3.5px 5px;
 background:linear-gradient(90deg,#7d8287,#fff 45%,#5f6469);box-shadow:0 0 0 1px rgba(0,0,0,.5),0 2px 4px rgba(0,0,0,.5);transition:transform .5s 1.3s}
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
 background:${rrTkanina(c.oslona, col, c)};
 background-size:100% 100%,${c.oslona === 'perforowana' ? '7px ' + RR_OKRES / 2 + 'px' : '100% 100%'},100% ${RR_OKRES}px}
/* v26: promienie słońca wpadające przez okno (tylko w dzień, przy słońcu) */
.ray{position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0;transition:opacity 1.5s;mix-blend-mode:screen;
 background:linear-gradient(115deg,rgba(255,214,120,0) 15%,rgba(255,214,120,.26) 40%,rgba(255,214,120,0) 62%),
  linear-gradient(115deg,rgba(255,236,190,0) 55%,rgba(255,236,190,.16) 70%,rgba(255,236,190,0) 82%);filter:blur(2px)}
.sash.slonce .ray{opacity:1;animation:rrray 7s ease-in-out infinite alternate}
@keyframes rrray{from{opacity:.75}to{opacity:1}}
.bar{position:absolute;left:0;right:0;height:${RR_LISTWA}px;top:${RR_KASETA}px;z-index:3;border-radius:1px;
 background:linear-gradient(180deg,#fafafa,#bdbdbd);box-shadow:0 2px 3px rgba(0,0,0,.4)}
/* uchwyt do podnoszenia na środku dolnej listwy – złap i przeciągnij */
.bar:after{content:"";position:absolute;left:50%;top:100%;width:22px;height:9px;transform:translateX(-50%);border-radius:0 0 7px 7px;
 background:linear-gradient(180deg,#e9e9e9,#a9a9a9);box-shadow:0 2px 3px rgba(0,0,0,.45),inset 0 -2px 0 rgba(0,0,0,.12);cursor:grab}
.sash:active .bar:after{cursor:grabbing;filter:brightness(1.08)}
/* środkowy uchwyt (v11): na słupku między skrzydłami, na wysokości listew – rusza oba skrzydła */
.mid{position:absolute;left:50%;top:0;z-index:7;width:30px;height:30px;margin:-15px 0 0 -15px;border-radius:50%;cursor:grab;touch-action:none;
 background:radial-gradient(circle at 35% 30%,#fff,#dcdcdc 70%,#bdbdbd);box-shadow:0 2px 5px rgba(0,0,0,.5),0 0 0 2px var(--accent-color,#ff9800);
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
.ghost{position:absolute;left:0;right:0;height:0;border-top:2px dashed var(--accent-color,#ff9800);z-index:6;display:none}
.ghost span{position:absolute;left:50%;transform:translateX(-50%);top:-22px;background:var(--accent-color,#ff9800);color:var(--rr-na-akcencie,#fff);font-size:12px;font-weight:600;padding:1px 7px;border-radius:9px;white-space:nowrap}
.mv{position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:5;color:#fff;background:rgba(0,0,0,.5);
 width:26px;height:26px;border-radius:50%;display:none;align-items:center;justify-content:center}
.mv ha-icon{--mdc-icon-size:18px;animation:rrb 1s ease-in-out infinite}
@keyframes rrb{50%{transform:translateY(var(--rr-dy,-3px))}}
.bt{display:flex;gap:8px;margin-top:12px}
.bt button{flex:1;height:42px;border:none;border-radius:12px;cursor:pointer;color:var(--primary-text-color);
 background:var(--secondary-background-color,rgba(127,127,127,.15));display:flex;align-items:center;justify-content:center;transition:background .15s}
.bt button:active{background:rgba(127,127,127,.35)}
.bt button[disabled]{opacity:.35;cursor:default}
.bt ha-icon{--mdc-icon-size:24px}
.qk{display:flex;gap:6px;margin-top:8px}
.qk button{flex:1;height:32px;border:none;border-radius:var(--ha-card-border-radius,12px);font-size:13px;cursor:pointer;color:var(--secondary-text-color);background:transparent;box-shadow:inset 0 0 0 1px var(--divider-color,rgba(127,127,127,.3))}
.qk button.on{color:var(--rr-na-glownym,var(--text-primary-color,#fff));background:var(--primary-color,#009ac7);box-shadow:none}
${rrOslonaStyl(c.oslona, col, rama)}
/* v40: osłona zewnętrzna – widok z zewnątrz: okno w ścianie z tynkiem, parapet, za szybą ciemny pokój (wieczorem zapalone światło),
   deszcz i śnieg padają przed osłoną; skrzydło otwiera się do środka, więc osłona na ścianie zostaje na miejscu */
.zew .elew{position:relative;margin:0 -12px;padding:22px 16px 20px;
 background:radial-gradient(circle at 20% 30%,rgba(255,255,255,.08),transparent 40%),repeating-linear-gradient(45deg,rgba(0,0,0,.018) 0 2px,transparent 2px 5px),linear-gradient(180deg,#e2ddd3,#d3cdc1)}
.zew .win{box-shadow:0 0 0 5px #c4bdb0,0 0 0 6px rgba(0,0,0,.08),-4px 4px 10px 6px rgba(0,0,0,.28)}
.zew .win:after{content:"";position:absolute;left:-14px;right:-14px;bottom:-12px;height:9px;z-index:9;border-radius:1px 1px 2px 2px;
 background:linear-gradient(180deg,#f2f3f4,#b9bec3 55%,#8a9096);box-shadow:0 4px 5px rgba(0,0,0,.35)}
.zew .handle,.zew .ray,.zew .out,.zew .wx .scn,.zew .wx .sun,.zew .wx .moon,.zew .wx .cl,.zew .wx .st{display:none}
.zew .slot{background:#2c2723!important}
.zew .glass .wx{z-index:5}
.zew .refl{background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 38%,transparent 46%),linear-gradient(180deg,rgba(150,185,215,.32),rgba(150,185,215,0) 45%),linear-gradient(180deg,rgba(28,25,22,.74),rgba(44,38,33,.66))}
.zew.noc .elew{background:repeating-linear-gradient(45deg,rgba(0,0,0,.03) 0 2px,transparent 2px 5px),linear-gradient(180deg,#5d5953,#4f4b46)}
.zew.noc .refl{background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.06) 38%,transparent 46%),radial-gradient(ellipse 70% 45% at 50% 22%,rgba(255,206,130,.62),rgba(96,66,38,.86) 70%,rgba(40,28,18,.92))}
.zew .sash.uchyl,.zew .sash.otw{transform:none;box-shadow:inset 0 0 0 1px rgba(0,0,0,.16)}
.zew .sash.uchyl .refl{box-shadow:inset 0 22px 14px -10px rgba(0,0,0,.7)}
.zew .sash.otw .refl{box-shadow:inset 0 0 0 999px rgba(12,10,8,.55),inset 6px 0 6px -2px rgba(0,0,0,.6)}
`;
