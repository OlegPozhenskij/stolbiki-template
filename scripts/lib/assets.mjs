import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {ROOT,read,write,hash,fileHash,publicPath} from './project.mjs';
import {run,PYTHON,environment} from './runtime.mjs';
export async function prepareAssets(ep){
 const catalog=read('assets/catalog.json'),world=read('worlds/catalog.json')[ep.brief.world];
 const stage=path.join(ROOT,'tmp','asset-stage',String(process.pid));
 const art=path.join(stage,'art'),output=path.join(stage,'rendered');fs.mkdirSync(art,{recursive:true});fs.mkdirSync(output,{recursive:true});
 const result={},pending=[];
 const renderer=ep.brief.media==='pencil'?'scripts/sketch/sketch.py':'scripts/rasterize.py';
 for(const item of ep.content.items){
  const asset=ep.assets[item.id];
  if(!asset.scene){
   const files=[...['composite','background','foreground'].filter(k=>asset[k]).map(k=>asset[k]),...(asset.contexts??[]).map(c=>c.image)];
   result[item.id]={...asset,key:hash(asset,...files.map(file=>fileHash(publicPath(file))))};continue;
  }
  const module=catalog[asset.scene].module;
  const key=hash(fileHash(module),fileHash('assets/scenes/helpers.mjs'),fileHash(renderer),ep.brief.media,world,asset.scene);
  const base=`generated/${key.slice(0,24)}`;
  const target=publicPath(`${base}/${item.id}.jpg`);
  const manifest=path.join(path.dirname(target),'asset.json');
  if(fs.existsSync(manifest)){
   const saved=JSON.parse(fs.readFileSync(manifest));
   if(['composite','background','foreground'].every(k=>fs.existsSync(publicPath(saved[k])))){result[item.id]=saved;continue;}
  }
  const shared=pending.find(p=>p.key===key);
  if(shared){shared.cardIds.push(item.id);continue;}
  const scene=(await import(pathToFileURL(path.join(ROOT,module)).href)).default;
  const wrap=x=>`<svg xmlns="http://www.w3.org/2000/svg" width="480" height="640" viewBox="0 0 480 640">${x}</svg>`;
  const clean=x=>x.replace(/\n\s+/g,'').replace(/<[^>]+>/g,tag=>(tag.match(/stroke-width=/g)||[]).length>1?tag.replace(' stroke-width="6"',''):tag);
  fs.writeFileSync(path.join(art,`${asset.scene}-bg.svg`),clean(wrap(world.background??scene.bg)));
  fs.writeFileSync(path.join(art,`${asset.scene}-fg.svg`),clean(wrap(scene.fg)));
  pending.push({id:asset.scene,key,base,cardIds:[item.id]});
 }
 if(pending.length){
  const env=environment({ART_DIR:art,OUTPUT_DIR:output});
  run(PYTHON,[renderer,...pending.map(p=>p.id)],{env,quiet:true});
  const meta=JSON.parse(fs.readFileSync(path.join(output,'meta.json'),'utf8'));
  for(const {id,key,base,cardIds} of pending){
   fs.mkdirSync(publicPath(base),{recursive:true});
   for(const suffix of ['.jpg','-bg.jpg','-fg.png'])fs.copyFileSync(path.join(output,id+suffix),publicPath(`${base}/${id}${suffix}`));
   const record={composite:`${base}/${id}.jpg`,background:`${base}/${id}-bg.jpg`,foreground:`${base}/${id}-fg.png`,bounds:meta[id],key};
   write(`public/${base}/asset.json`,record);for(const card of cardIds)result[card]=record;
  }
 }
 console.log(`Изображения: создано ${pending.length}, использовано готовых ${ep.content.items.length-pending.length}`);
 return result;
}
