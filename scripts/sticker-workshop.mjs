import fs from 'node:fs';
import {read,write} from './lib/project.mjs';
const id='cosmic-stickers-pilot',dir=`episodes/${id}`,target=`public/media/${id}`;
fs.mkdirSync(target,{recursive:true});
const media=read(`${dir}/media.json`),old=read('episodes/cosmic-size-300/content.json'),sources=read('episodes/cosmic-size-300/sources.json');
// Uniform source-image crops. Source photographs stay unchanged; SVG masks and
// morphology make the sticker silhouette and border at display time.
const shapes={
 iss:{crop:[440,280,410,280],size:[1280,850],span:370,portrait:550},
 bennu:{crop:[0,0,1024,968],size:[1024,968],span:950,portrait:550,mask:'<path d="M525 6Q556 0 582 43L651 67 730 108 774 174 812 255 835 317 889 398 950 486Q979 535 961 596L925 671 866 734 793 811 710 879Q620 945 521 958L442 960 356 947 268 916 193 872 139 805 91 719 48 620 29 523Q15 456 43 395L105 278 199 174 301 95 419 32Z"/>'},
 '67p':{crop:[700,1090,450,380],size:[2048,2048],span:380,portrait:540,mask:'<path d="M750 1156Q790 1120 830 1140L856 1138 883 1169 915 1180 948 1175 960 1144Q980 1124 1007 1137L1015 1181 1033 1207 1070 1228 1083 1260 1104 1289Q1116 1332 1092 1362L1070 1413Q1039 1445 1007 1430L960 1425 918 1385 895 1337 864 1300 840 1281 806 1322Q766 1329 747 1294L733 1252 736 1198Z"/>'},
 moon:{crop:[0,0,800,800],size:[800,800],span:796,portrait:570,circle:[400,400,398]},
 saturn:{crop:[120,120,2050,900],size:[2307,1117],span:830,portrait:245,mask:'<ellipse cx="1154" cy="557" rx="979" ry="108"/><ellipse cx="1160" cy="566" rx="418" ry="389"/>'},
 sun:{crop:[260,260,3580,3580],size:[4096,4096],span:3480,portrait:550,circle:[2048,2048,1740]}
};
const captions={iss:'Здесь космонавты спят на стене!',bennu:'Космический аппарат забрал его камни!','67p':'Похожа на космическую уточку!',moon:'Её тёмные «моря» — застывшая лава!',saturn:'Его кольца — миллиарды льдинок!',sun:'Его свет летит к нам около 8 минут.'};
const assets={},items=[];
for(const [index,m] of media.entries()){
 const s=shapes[m.id], [x,y,w,h]=s.crop,[iw,ih]=s.size,scale=570/Math.max(w,h),px=(640-w*scale)/2,py=(640-h*scale)/2;
 const encoded=fs.readFileSync(m.file).toString('base64'),href=`data:image/jpeg;base64,${encoded}`;
 const image=`<image href="${href}" width="${iw}" height="${ih}" preserveAspectRatio="none"/>`;
 const silhouette=s.mask??(s.circle?`<circle cx="${s.circle[0]}" cy="${s.circle[1]}" r="${s.circle[2]}" fill="white"/>`:`<g filter="url(#key)">${image}</g>`);
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><defs><filter id="key" x="-10%" y="-10%" width="120%" height="120%" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 .333 .333 .333 0 0"/><feComponentTransfer><feFuncA type="linear" slope="1000" intercept="-70"/></feComponentTransfer><feMorphology operator="erode" radius="${1/scale}"/><feMorphology operator="dilate" radius="${1/scale}"/><feMorphology operator="dilate" radius="${w/100}"/><feMorphology operator="erode" radius="${w/100}"/></filter><mask id="cut" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}"><g fill="white">${silhouette}</g></mask><filter id="border" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="${7/scale}"/><feFlood flood-color="#fffaf0"/><feComposite operator="in" in2="dilate"/></filter><filter id="outline" x="-20%" y="-20%" width="140%" height="140%"><feMorphology in="SourceAlpha" operator="dilate" radius="${7/scale}" result="edge"/><feFlood flood-color="#fffaf0"/><feComposite operator="in" in2="edge"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g transform="translate(${px} ${py}) scale(${scale}) translate(${-x} ${-y})">${s.mask||s.circle?`<g fill="#fffaf0" stroke="#fffaf0" stroke-width="${14/scale}" stroke-linejoin="round">${silhouette}</g><g mask="url(#cut)">${image}</g>`:`<g filter="url(#outline)"><g mask="url(#cut)">${image}</g></g>`}</g></svg>`;
 fs.writeFileSync(`${target}/${m.id}.svg`,svg);
 assets[m.id]={composite:`media/${id}/${m.id}.svg`};
 const previous=old.items.find(i=>i.id===m.id);const item={...previous,title:m.id==='67p'?'Комета 67P':previous.title,fact:captions[m.id],portraitWidth:s.portrait,artWidth:s.span*scale,contextKind:m.id,photoCredit:m.id==='sun'?'NASA/SDO · УФ-снимок, условный цвет':m.id==='67p'?'ESA/Rosetta/NAVCAM':m.credit,accent:['#67d7ff','#ac9dff','#7ce8dc','#aacdff','#ffd27b','#ffb04a'][index]};
 delete item.details;delete item.tag;items.push(item);sources[m.id]={...sources[m.id],fact:item.fact};
 const proof={iss:'https://www.csa-asc.gc.ca/eng/astronauts/living-in-space/sleeping-in-space.asp',bennu:'https://science.nasa.gov/mission/osiris-rex/osiris-rex-faq/','67p':'https://www.esa.int/About_Us/ESAC/Comet_horizon',moon:'https://science.nasa.gov/moon/facts/',saturn:'https://science.nasa.gov/mission/cassini/faq/',sun:'https://science.nasa.gov/earth/facts/'};
 sources[m.id].urls=[...new Set([...sources[m.id].urls,proof[m.id]])];
 if(m.id==='moon')sources[m.id].scope='Средний диаметр 3474.8 км по JPL; тёмные моря — базальтовые равнины древних лавовых потоков, NASA Moon Facts.';
}
const selected=Object.fromEntries(items.map(i=>[i.id,sources[i.id]]));
const design=read('designs/catalog.json');design['cosmic-photo-stickers']={name:'Космос · реальные фотостикеры',layout:'panel',background:'#080c24',ink:'#fffaf2',title:'#fffaf2',accent:'#ffe29a',badge:'#172447',heading:'body',badgeShape:'hex',texture:false,cardStyle:'sticker',columns:3};write('designs/catalog.json',design);
write(`${dir}/brief.json`,{schemaVersion:1,engine:'cards-v1',kind:'episode',title:'Космос крупным планом',audience:'Дети и семейная аудитория',seconds:24,cardCount:6,design:'cosmic-photo-stickers',world:'native',media:'photo',music:'calm',timezone:'Europe/Moscow',timing:{fps:30,intro:0,step:120,holdLast:0,outro:0},production:{reviewCycles:1,deepseek:false,scriptAuthor:'Codex with video-producer and video-script-writer',order:'ascending-physical-span, six different families',processProfile:'photo-sticker-comparison',scope:'Only six-card pilot; wait for user review before the full episode'}});
write(`${dir}/content.json`,{title:'А насколько огромен космос?',subtitle:'',cta:'Кто удивил тебя?',ctaSub:'',motif:'sky',items,thumb:{title:'ЭТО ВСЁ\nКОСМОС?!',ids:['iss','saturn','sun'],badge:{shown:'6',unit:'миров'}}});
write(`${dir}/sources.json`,selected);write(`${dir}/assets.json`,assets);
if(!fs.existsSync(`${dir}/status.json`))write(`${dir}/status.json`,{stage:'draft',reviewCycles:1});
console.log(`${id}: six photos, SVG sticker masks, 24 seconds`);
