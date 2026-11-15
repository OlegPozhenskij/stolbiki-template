import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
import {buildTimeline,visibleIntervals,ENGINE_VERSION} from '../../src/engine/timeline.mjs';
export const ROOT=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
export const read=(p)=>JSON.parse(fs.readFileSync(path.resolve(ROOT,p),'utf8'));
export function write(p,data){const f=path.resolve(ROOT,p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,JSON.stringify(data,null,2)+'\n');}
export const hash=(...parts)=>createHash('sha256').update(parts.map(p=>typeof p==='string'?p:JSON.stringify(p)).join('\0')).digest('hex');
export function fileHash(p){return hash(fs.readFileSync(path.resolve(ROOT,p)));}
export function episodePath(id){if(typeof id!=='string'||!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error('Укажите ID выпуска: латинские буквы, цифры и дефис');return `episodes/${id}`;}
export function loadEpisode(id){const dir=episodePath(id);return {id,dir,brief:read(`${dir}/brief.json`),content:read(`${dir}/content.json`),sources:read(`${dir}/sources.json`),assets:read(`${dir}/assets.json`)};}
export function publicPath(p){const root=path.join(ROOT,'public');const absolute=path.resolve(root,p);if(!absolute.startsWith(root+path.sep))throw new Error('Путь изображения должен быть внутри public/');return absolute;}
export function calendarDate(now,timeZone='Europe/Moscow'){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const p=Object.fromEntries(parts.map(x=>[x.type,x.value]));return `${p.year}-${p.month}-${p.day}`;
}
export function validateEpisode(ep,{assetsRequired=true,now=new Date()}={}){
 const errors=[],b=ep.brief,c=ep.content;
 const today=calendarDate(now,b.timezone??'Europe/Moscow');
 if(b.engine!=='cards-v1')errors.push('Поддерживается engine: cards-v1');
 if(!['episode','demo'].includes(b.kind))errors.push('brief.kind: episode или demo');
 const skin=read('designs/catalog.json')[b.design];
 if(!skin)errors.push(`Неизвестный design: ${b.design}`);
 else if(!['album','panel'].includes(skin.layout)||!['hand','body'].includes(skin.heading)||!['hex','round'].includes(skin.badgeShape))errors.push('Некорректный layout, heading или badgeShape оформления');
 if(c.motif && !read('src/motifs.json')[c.motif])errors.push(`Неизвестный motif: ${c.motif}`);
 if(!read('worlds/catalog.json')[b.world])errors.push(`Неизвестный world: ${b.world}`);
 if(!['pencil','vector','photo'].includes(b.media))errors.push('media: pencil, vector или photo');
 if(!['bright','calm'].includes(b.music))errors.push('music: bright или calm');
 if(!c.title || !c.cta || !Array.isArray(c.items)||!c.items.length)errors.push('Нужны title, cta и items');
 const items=c.items??[],ids=new Set(),catalog=read('assets/catalog.json');
 for(const i of items){
  if(!/^[a-z0-9][a-z0-9-]*$/.test(i.id??'')||ids.has(i.id))errors.push(`Недопустимый или повторный id: ${i.id}`);ids.add(i.id);
  if(!i.title || !i.fact || [...i.fact].length>45)errors.push(`${i.id}: заголовок и факт до 45 знаков обязательны`);
  if(!((typeof i.value==='number'&&Number.isFinite(i.value))||(typeof i.value==='string'&&i.value.length>0)))errors.push(`${i.id}: нужно число или непустой текст value`);
  if(typeof i.unit!=='string')errors.push(`${i.id}: нужна единица unit`);
  if(skin?.cardStyle==='cosmic'&&(!(i.physicalSizeKm>0)||!Number.isFinite(i.physicalSizeKm)||!(i.artWidth>0)))errors.push(`${i.id}: нужны физический размер и ширина рисунка для реальных пропорций`);
  if(i.move&&!['hop','fly','swim','pulse','wiggle','float'].includes(i.move))errors.push(`${i.id}: неизвестное движение`);
  if(i.details){
   if(!Array.isArray(i.details))errors.push(`${i.id}: details должны быть массивом`);
   else {let last=0;for(const beat of i.details){
    if(!Number.isInteger(beat.at)||beat.at<=last||beat.at>=b.timing.step||typeof beat.text!=='string'||!beat.text.trim()||[...beat.text].length>45)errors.push(`${i.id}: подписи details требуют возрастающий кадр внутри шага и текст до 45 знаков`);
    last=beat.at;
   }}
  }
  const src=ep.sources[i.id];
  if(b.kind!=='demo'){
   if(src?.status!=='verified'||!src.checkedAt||!src.urls?.length||!src.scope||!src.fact)errors.push(`${i.id}: нужны проверенные источники, checkedAt, scope, fact`);
   if(src?.urls?.some(u=>!/^https?:\/\//.test(u)))errors.push(`${i.id}: неверная ссылка источника`);
   if(src?.checkedAt && (!/^\d{4}-\d{2}-\d{2}$/.test(src.checkedAt)||src.checkedAt>today))errors.push(`${i.id}: неверная или будущая checkedAt`);
   if(src?.refresh && (!src.validUntil || src.validUntil<today))errors.push(`${i.id}: перепроверьте меняющееся сведение и validUntil`);
  }
  if(assetsRequired){const a=ep.assets[i.id];
   if(a?.scene){if(!catalog[a.scene])errors.push(`${i.id}: сцена ${a.scene} отсутствует в assets/catalog.json`);}
   else if(a?.composite){for(const key of ['composite','background','foreground'])if(a[key]&&!fs.existsSync(publicPath(a[key])))errors.push(`${i.id}: отсутствует public/${a[key]}`);
    if(Boolean(a.background)!==Boolean(a.foreground))errors.push(`${i.id}: background и foreground задаются вместе`);
    if(a.bounds&&(!['x','y','w','h'].every(k=>Number.isFinite(a.bounds[k])&&a.bounds[k]>=0&&a.bounds[k]<=1)||a.bounds.w===0||a.bounds.h===0))errors.push(`${i.id}: bounds должны содержать нормализованные x,y,w,h`);
   }else errors.push(`${i.id}: выберите scene или composite в assets.json`);
   if(b.media==='photo'&&a?.scene)errors.push(`${i.id}: для photo укажите composite или пару слоёв`);
  }
 }
 const th=c.thumb;
 if(!th?.title||!th.badge||!Array.isArray(th.ids)||th.ids.length<1||th.ids.length>3||new Set(th.ids).size!==th.ids.length||th.ids.some(id=>!ids.has(id)))errors.push('thumb: заголовок, badge и 1–3 разных id из items');
 let timeline;
 try{timeline=buildTimeline(items.length,b.timing);if(Math.abs(timeline.total/timeline.fps-b.seconds)>0.001)errors.push(`Длительность ${timeline.total/timeline.fps} с не равна brief.seconds=${b.seconds}`);}catch(e){errors.push(e.message);}
 if(errors.length)throw new Error(errors.join('\n'));
 return timeline;
}
export function chunkKeys(ep,t,assetMap,globalKey){
 const n=ep.content.items.length;
 return Array.from({length:Math.ceil(t.total/600)},(_,c)=>{
  const a=c*600,b=Math.min(t.total-1,a+599);
  const visible=ep.content.items.map((item,i)=>({item,i})).filter(({i})=>visibleIntervals(i,n,t).some(([lo,hi])=>lo<=b&&hi>=a));
  return hash(ENGINE_VERSION,globalKey,t,a,b,
   visible.map(({item,i})=>({i,item,asset:assetMap[item.id]})),
   a<t.intro?{title:ep.content.title,subtitle:ep.content.subtitle}:null,
   b>=t.ctaAt?{cta:ep.content.cta,ctaSub:ep.content.ctaSub}:null);
 });
}
