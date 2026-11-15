import fs from 'node:fs';
import crypto from 'node:crypto';
import {read,write} from './lib/project.mjs';
const id='cosmic-stickers-300',dir=`episodes/${id}`,target=`public/media/${id}`;
fs.mkdirSync(target,{recursive:true});
const rows=read(`${dir}/media.json`),shapes=read(`${dir}/image-shapes.json`),objects=read(`${dir}/objects.json`);
const pilot=read('episodes/cosmic-stickers-pilot/content.json'),pilotSources=read('episodes/cosmic-stickers-pilot/sources.json');
const records={},jobs=[];
for(const [key,s] of Object.entries(shapes)){
 const row=rows.find(r=>r.id===(s.sourceId??key));if(!row)throw Error(`Missing source ${key}`);
 let bytes=fs.readFileSync(s.file),mime=/\.png$/i.test(s.file)?'image/png':/\.webp$/i.test(s.file)?'image/webp':'image/jpeg';
 if(s.nativeModel==='aldebaran-disc'){
  const source=bytes.toString('utf8'),defs=source.match(/<defs>[\s\S]*?<\/defs>/)[0],circle=source.match(/<circle[^>]*cx="61"[^>]*\/>/)[0];
  bytes=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="-370 15 862 862">${defs}${circle}</svg>`);mime='image/svg+xml';
 }
 const [x,y,w,h]=s.crop,[W,H]=s.size,scale=570/Math.max(w,h),px=(640-w*scale)/2,py=(640-h*scale)/2;
 const shape=s.path?`<path d="${s.path}"/>`:`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${26/scale}"/>`;
 const image=`<image href="data:${mime};base64,${bytes.toString('base64')}" width="${W}" height="${H}"/>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640" viewBox="0 0 640 640"><defs><mask id="cut" maskUnits="userSpaceOnUse" x="${x}" y="${y}" width="${w}" height="${h}"><g fill="white">${shape}</g></mask></defs><g transform="translate(${px} ${py}) scale(${scale}) translate(${-x} ${-y})"><g fill="#fffaf0" stroke="#fffaf0" stroke-width="${14/scale}" stroke-linejoin="round">${shape}</g><g mask="url(#cut)">${image}</g></g></svg>`;
 const digest=crypto.createHash('sha256').update('photo-sticker-raster-v1').update(svg).digest('hex').slice(0,24);
 const vector=`${target}/${key}.svg`,composite=`generated/sticker-cache/${digest}.png`;
 fs.writeFileSync(vector,svg);records[key]={composite,vector:vector.slice(7),artWidth:s.span*scale,portraitWidth:s.portrait??550};jobs.push({id:key,source:vector,target:`public/${composite}`});
}
write(`${dir}/render-assets.json`,jobs);
const assets={},sources={},items=[],accent=['#67d7ff','#ac9dff','#7ce8dc','#aacdff','#ffd27b','#ffb04a'];
function measure(size){
 let value=size,unit='км';if(size>=9.4607304725808e15){value=size/9.4607304725808e15;unit='тыс. св. лет';}
 else if(size>=9.4607304725808e12){value=size/9.4607304725808e12;unit='св. лет';}
 else if(size>=1e9){value=size/1e9;unit='млрд км';}else if(size>=1e6){value=size/1e6;unit='млн км';}else if(size>=1000){value=size/1000;unit='тыс. км';}else if(size<1){value=size*1000;unit='м';}
 return {value:Number(value.toPrecision(3)),unit,prefix:'≈'};
}
const parents={mimas:'saturn',hyperion:'saturn',enceladus:'saturn',tethys:'saturn',dione:'saturn',iapetus:'saturn',rhea:'saturn',titan:'saturn',miranda:'uranus',umbriel:'uranus',titania:'uranus',triton:'neptune',europa:'jupiter',io:'jupiter',ganymede:'jupiter',charon:'pluto',callisto:'jupiter',dimorphos:'didymos'};
const companions={ingenuity:['mars'],curiosity:['mars'],hubble:['earth'],'falcon-heavy':['earth'],iss:['earth','moon'],bennu:['osiris'],itokawa:['hayabusa'],ryugu:['hayabusa2'],'hartley-2':['epoxi'],'67p':['rosetta'],halley:['sun'],eros:['near'],ida:['galileo'],lutetia:['rosetta'],vesta:['dawn'],ceres:['dawn'],sedna:['sun'],quaoar:['sun'],makemake:['hubble'],haumea:['hubble'],eris:['hubble'],pluto:['new-horizons','charon'],moon:['earth','lunar'],mercury:['sun'],venus:['sun'],earth:['moon','iss'],mars:['curiosity','ingenuity'],jupiter:['io','europa'],saturn:['titan','enceladus'],uranus:['voyager','titania'],neptune:['voyager','triton'],sun:['earth','mercury'],sirius:['sirius-b'],'sirius-b':['sirius'],'sagittarius-a':['milky-way'],'milky-way':['sun','sagittarius-a'],andromeda:['triangulum'],'ring-nebula':['jwst'],'orion-nebula':['hubble','jwst'],'eagle-nebula':['hubble'],m13:['hubble'],tuc47:['hubble'],pleiades:['hubble']};
for(const [index,obj] of objects.entries()){
 const record=records[obj.id];if(!record)throw Error(`Missing portrait ${obj.id}`);
 const prior=pilot.items.find(x=>x.id===obj.id);const item={id:obj.id,title:prior?.title??obj.title,...measure(obj.physicalSizeKm),fact:prior?.fact??obj.fact,metricLabel:obj.family==='black-hole'?'ГОРИЗОНТ':obj.family==='comet'?'ЯДРО':'РАЗМЕР',physicalSizeKm:obj.physicalSizeKm,scaleGroup:0,artWidth:record.artWidth,portraitWidth:record.portraitWidth,accent:accent[index%accent.length],move:'float'};
 const related=obj.id==='quaoar'?['quaoar-system','sun']:obj.id==='crab-pulsar'?['crab-pulsar-beams']:(companions[obj.id]??(parents[obj.id]?[parents[obj.id]]:[]));
 const contexts=related.filter(key=>records[key]).map((key,i)=>({image:records[key].composite,x:i?538:96,y:i?338:760,size:i?112:147,rotate:i?12:-12}));
 assets[obj.id]={composite:record.composite,contexts};sources[obj.id]={...(prior?pilotSources[obj.id]:obj.source),fact:item.fact};items.push(item);
}
if(items.length!==75||!items.every((o,i)=>i===0||o.physicalSizeKm>=items[i-1].physicalSizeKm))throw Error('Need exactly75 increasing objects');
const designs=read('designs/catalog.json');designs['cosmic-photo-stickers-v2']={...designs['cosmic-photo-stickers'],name:'Космос · фотостикеры с окружением',revision:2};write('designs/catalog.json',designs);
write(`${dir}/content.json`,{title:'А насколько огромен космос?',subtitle:'',cta:'Кто удивил тебя?',ctaSub:'Выбери своего космического героя',motif:'sky',items,thumb:{title:'ЭТО ВСЁ\nКОСМОС?!',ids:['iss','saturn','sun'],badge:{shown:'75',unit:'объектов'}}});
write(`${dir}/sources.json`,sources);write(`${dir}/assets.json`,assets);
const brief=read(`${dir}/brief.json`);brief.production={...brief.production,metadata:'No text below portraits; credits in CREDITS.md',footerHeight:188,background:'Seeded stars; subtle per-card nebula colors',animation:'Rigid floating, rotation and entrance; no shape deformation',auxiliaryScale:'Decorative context stickers have independent scale; numeric physical comparison concerns the main objects only'};write(`${dir}/brief.json`,brief);
write(`${dir}/count.json`,{cards:75,secondsPerCard:4,totalSeconds:300,planets:objects.filter(x=>x.family==='planet').length,families:objects.reduce((a,o)=>(a[o.family]=(a[o.family]??0)+1,a),{})});
let credits='# Изображения и музыка\n\nФотографии, фотомозаики и научные визуализации используются раздельно. Визуализация не выдаётся за наблюдение поверхности. Исходники не перерисованы; изменения: равномерное кадрирование, SVG-маска, белая обводка, тень. Для Альдебарана выделен полный векторный диск из сравнительной схемы. Условия исходных лицензий сохраняются у соответствующих изображений и производных стикеров.\n\nСтикеры окружения показывают научный контекст; их масштаб и взаимное положение условны. Масштабирование основных тел рассчитывается отдельно по числам в content.json. Округление, неопределённости и определения размеров — в sources.json. Удалённые звёзды/карликовые миры могут быть представлены моделями, условными цветами и реконструкциями. Пульсар показан типовой иллюстрацией физического класса, а не фотографией поверхности Крабовидного пульсара.\n\n';
for(const row of rows)credits+=`- **${row.id}** — ${row.credit??'см. источник'}. ${row.kind??'image'}. [Источник](${row.page}); ${row.license}${row.licenseUrl?` ([условия](${row.licenseUrl}))`:''}.\n`;
credits+='\nМузыка: оригинальный синтез проекта, scripts/cosmic-music.py. Внешние музыкальные сэмплы и платная генерация не использовались.\n';fs.writeFileSync(`${dir}/CREDITS.md`,credits);
console.log(`75 cards, ${jobs.length} source stickers; rasterize once, then preview/render.`);
