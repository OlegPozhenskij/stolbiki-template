// Reuse the accepted images and text; remove sticker framing and comparison scaling.
import fs from 'node:fs';
import crypto from 'node:crypto';
import {read,write} from './lib/project.mjs';
const source='cosmic-stickers-300',id='cosmic-photos-300',dir=`episodes/${id}`;
fs.mkdirSync(dir,{recursive:true});
for(const file of ['content.json','sources.json','objects.json','count.json','media.json','image-shapes.json']){
 if(!fs.existsSync(`${dir}/${file}`))fs.copyFileSync(`episodes/${source}/${file}`,`${dir}/${file}`);
}
const brief=read(`episodes/${source}/brief.json`);
brief.design='cosmic-plain-photos';
brief.production={...brief.production,processProfile:'large-photos',scope:'Same accepted five-minute video; large borderless images, no shrinking or companion objects',sideObjects:'none',comparisonScale:'disabled; portraits stay large',auxiliaryScale:'not applicable'};
write(`${dir}/brief.json`,brief);
const designs=read('designs/catalog.json');
designs[brief.design]={...designs['cosmic-photo-stickers-v2'],name:'Космос · крупные фотографии',plainPhotos:true};
write('designs/catalog.json',designs);
const shapes=read(`${dir}/image-shapes.json`),items=read(`${dir}/content.json`),assets={},jobs=[];
fs.mkdirSync(`public/media/${id}`,{recursive:true});
for(const item of items.items){
 const s=shapes[item.id];let bytes=fs.readFileSync(s.file),mime=s.file.endsWith('.png')?'image/png':'image/jpeg';
 if(s.nativeModel==='aldebaran-disc'){
  const text=bytes.toString(),defs=text.match(/<defs>[\s\S]*?<\/defs>/)[0],circle=text.match(/<circle[^>]*cx="61"[^>]*\/>/)[0];
  bytes=Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="1000" viewBox="-370 15 862 862">${defs}${circle}</svg>`);mime='image/svg+xml';
 }
 const [x,y,w,h]=s.crop,[W,H]=s.size,k=600/Math.max(w,h),px=(640-w*k)/2,py=(640-h*k)/2;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="640"><svg x="${px}" y="${py}" width="${w*k}" height="${h*k}" viewBox="${x} ${y} ${w} ${h}" preserveAspectRatio="xMidYMid meet"><image width="${W}" height="${H}" href="data:${mime};base64,${bytes.toString('base64')}"/></svg></svg>`;
 const digest=crypto.createHash('sha256').update(svg).digest('hex').slice(0,24),vector=`public/media/${id}/${item.id}.svg`,composite=`generated/photo-cache/${digest}.png`;
 fs.writeFileSync(vector,svg);assets[item.id]={composite};jobs.push({id:item.id,source:vector,target:`public/${composite}`});
 item.artWidth=600;item.portraitWidth=600;
}
write(`${dir}/assets.json`,assets);write(`${dir}/content.json`,items);write(`${dir}/render-assets.json`,jobs);
if(!fs.existsSync(`${dir}/status.json`))write(`${dir}/status.json`,{stage:'draft',reviewCycles:0,deepseekUsed:false});
let credits=fs.readFileSync(`episodes/${source}/CREDITS.md`,'utf8');
credits=credits.replace('Изменения:','Изменения:').replace('изменения: равномерное кадрирование, SVG-маска, белая обводка, тень.','изменения в этом выпуске: прежнее кадрирование, без маски и белой обводки.');
credits=credits.replace(/Стикеры окружения[\s\S]*?Округление,/, 'Дополнительных объектов и сравнения в общем масштабе в этом выпуске нет. Изображения показаны крупно, каждое в собственной рамке кадра. Округление,');
fs.writeFileSync(`${dir}/CREDITS.md`,credits);
fs.writeFileSync(`${dir}/production.md`,'# Крупные фотографии\n\nПравка принятого cosmic-stickers-300: те же 75 изображений, факты, порядок, музыка, фон, анимация, шестиугольник и нижний блок. Убраны маска и белая обводка стикеров, все дополнительные объекты и уменьшение прежних карточек. Каждый главный объект постоянно занимает большую область карточки без искажения пропорций. Старый выпуск сохранён.\n\nПовторная подготовка: node scripts/plain-photos.mjs && python scripts/render-stickers.py cosmic-photos-300. Затем штатные preview/render. Никаких новых сценариев, изображений, поиска источников или платных вызовов.\n');
fs.mkdirSync(`out/${id}`,{recursive:true});
for(const file of ['soundtrack.wav','music-cache.json'])if(!fs.existsSync(`out/${id}/${file}`)&&fs.existsSync(`out/${source}/${file}`))fs.copyFileSync(`out/${source}/${file}`,`out/${id}/${file}`);
console.log(`${id}: ${items.items.length} large photos; no borders, companion objects or shrinking.`);
