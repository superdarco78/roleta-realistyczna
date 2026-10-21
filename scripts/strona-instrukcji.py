# Strona instrukcji z powiększaniem zdjęć (GitHub Pages, folder docs/).
# Uruchom z katalogu głównego repo po wgraniu zmian w README:
#   for f in README README_EN README_DE README_FR README_CS; do
#     gh api "repos/superdarco78/roleta-realistyczna/contents/$f.md?ref=main" -H "Accept: application/vnd.github.html" > /tmp/$f.html; done
#   python3 scripts/strona-instrukcji.py /tmp
import re,os,html,sys
IN=sys.argv[1] if len(sys.argv)>1 else '.'
OUT='docs/'
os.makedirs(OUT,exist_ok=True)
CSS=open(os.path.join(os.path.dirname(os.path.abspath(__file__)),'github-markdown.css')).read()
M={'README':('index.html','pl','Roleta dzień-noc – instrukcja','Kliknij zdjęcie, aby je powiększyć. Kliknij jeszcze raz, aby wrócić.','Zobacz na GitHubie'),
'README_EN':('en.html','en','Roleta dzień-noc – guide','Click a picture to enlarge it. Click again to go back.','View on GitHub'),
'README_DE':('de.html','de','Roleta dzień-noc – Anleitung','Bild anklicken zum Vergrößern. Nochmal klicken, um zurückzukehren.','Auf GitHub ansehen'),
'README_FR':('fr.html','fr','Roleta dzień-noc – guide','Clique sur une image pour l’agrandir. Clique encore pour revenir.','Voir sur GitHub'),
'README_CS':('cs.html','cs','Roleta dzień-noc – návod','Klikni na obrázek pro zvětšení. Klikni znovu pro návrat.','Zobrazit na GitHubu')}
BLOB='https://github.com/superdarco78/roleta-realistyczna/blob/main/'
JS=r'''
(function(){
var ov=document.getElementById('lb'),im=ov.querySelector('img');
function open(src,alt){im.src=src;im.alt=alt||'';ov.classList.add('on');document.body.style.overflow='hidden';}
function close(){ov.classList.remove('on');document.body.style.overflow='';im.removeAttribute('src');}
ov.addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
document.querySelectorAll('.markdown-body img').forEach(function(i){
  var a=i.closest('a'),h=a?a.getAttribute('href')||'':'';
  var local=!a||h.charAt(0)==='#'||/raw\.githubusercontent|camo\./.test(h);
  if(!local)return;
  if(i.getAttribute('width')==='0'||i.getAttribute('height')==='0'||/odstep\.png/.test(i.src))return;
  var small=(+i.getAttribute('height')||999)<60;
  if(small){i.style.cursor='default';if(a)a.addEventListener('click',function(e){e.preventDefault();});return;}
  i.style.cursor='zoom-in';
  (a||i).addEventListener('click',function(e){e.preventDefault();open(i.currentSrc||i.src,i.alt);});
});
function go(id){var el=document.getElementById(id)||document.getElementsByName(id)[0];if(el)el.scrollIntoView();}
document.addEventListener('click',function(e){var a=e.target.closest('a[href^="#"]');if(!a||a.querySelector('img'))return;e.preventDefault();var id=decodeURIComponent(a.getAttribute('href').slice(1));history.replaceState(null,'','#'+id);go(id);});
if(location.hash)setTimeout(function(){go(decodeURIComponent(location.hash.slice(1)));},300);
})();
'''
for src,(out,lang,title,hint,gh) in M.items():
  h=open(os.path.join(IN,src+'.html')).read()
  h=re.sub(r'^<div id="file"[^>]*>','',h); h=re.sub(r'</div>\s*$','',h)
  h=h.replace('id="user-content-','id="').replace('name="user-content-','name="')
  def fixlink(m):
    u=m.group(1)
    base=u.split('#')[0];frag=('#'+u.split('#',1)[1]) if '#' in u else ''
    if base in ('README.md','README_EN.md','README_DE.md','README_FR.md','README_CS.md'):
      return 'href="'+M[base[:-3]][0]+frag+'"'
    if re.match(r'^[A-Za-z0-9_./-]+$',base) and not base.startswith(('http','#','/')) and base:
      return 'href="'+BLOB+u+'"'
    return m.group(0)
  h=re.sub(r'href="([^"]*)"',fixlink,h)
  h=re.sub(r'<p align="center" dir="auto"><a href="https://superdarco78\.github\.io/[^"]*"[^>]*><img[^>]*lupa-[^>]*></a></p>','',h)
  AT={'pl':{'Tip':'Wskazówka','Note':'Uwaga','Important':'Ważne','Warning':'Ostrzeżenie','Caution':'Uwaga'},'de':{'Tip':'Tipp','Note':'Hinweis','Important':'Wichtig','Warning':'Warnung','Caution':'Achtung'},'fr':{'Tip':'Astuce','Note':'Remarque','Important':'Important','Warning':'Avertissement','Caution':'Attention'},'cs':{'Tip':'Tip','Note':'Poznámka','Important':'Důležité','Warning':'Varování','Caution':'Pozor'}}.get(lang,{})
  for a,b in AT.items(): h=h.replace('</svg>'+a+'</p>','</svg>'+b+'</p>')
  page=f'''<!doctype html><html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{html.escape(title)}</title><link rel="icon" href="https://raw.githubusercontent.com/superdarco78/roleta-realistyczna/main/img/ikona.png">
<style>{CSS}
body{{margin:0;background:#fff}}@media (prefers-color-scheme:dark){{body{{background:#0d1117}}}}
.markdown-body{{box-sizing:border-box;max-width:980px;margin:0 auto;padding:24px 16px 64px}}
.top{{position:sticky;top:0;z-index:5;display:flex;gap:12px;align-items:center;justify-content:space-between;max-width:980px;margin:0 auto;padding:10px 16px;background:rgba(3,169,244,.97);color:#fff;font:600 15px/1.3 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;border-radius:0 0 12px 12px;box-shadow:0 2px 10px rgba(0,0,0,.2)}}
.top a{{color:#fff;text-decoration:underline;white-space:nowrap}}
#lb{{position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.88);display:none;align-items:center;justify-content:center;cursor:zoom-out;padding:12px;box-sizing:border-box}}
#lb.on{{display:flex}}#lb img{{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;background:transparent}}
#lb span{{position:absolute;top:10px;right:18px;color:#fff;font:700 34px/1 Arial}}
</style></head><body>
<div class="top"><span>🔍 {html.escape(hint)}</span><a href="{BLOB}{src}.md">{html.escape(gh)}</a></div>
<article class="markdown-body">{h}</article>
<div id="lb"><span>×</span><img alt=""></div>
<script>{JS}</script></body></html>'''
  open(OUT+out,'w').write(page);print(out,len(page))
open(OUT+'.nojekyll','w').write('')
