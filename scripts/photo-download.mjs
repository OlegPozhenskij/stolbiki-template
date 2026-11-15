import fs from 'node:fs';
import {read,write} from './lib/project.mjs';
import {FFMPEG,run} from './lib/runtime.mjs';
const dir='episodes/cosmic-stickers-300',folder='assets/photos/cosmic-stickers-300',cache='tmp/photo-download-cache';fs.mkdirSync(folder,{recursive:true});fs.mkdirSync(cache,{recursive:true});
for(const file of fs.readdirSync(folder).filter(f=>f.endsWith('-download.json')))fs.renameSync(`${folder}/${file}`,`${cache}/${file}`);
const current=fs.existsSync(`${dir}/media.json`)?read(`${dir}/media.json`):[];
const rows=current;
if(!rows.length)throw Error('Нужен сохранённый media.json с проверенным выбором изображений.');
if(!rows.some(x=>x.id==='md2011')&&current.some(x=>x.id==='md2011'))rows.push(current.find(x=>x.id==='md2011'));
let cursor=0,lastRequest=0;const finished=[];
await Promise.all(Array.from({length:1},async()=>{while(cursor<rows.length){const row=rows[cursor++];
 try{
 if(row.file&&fs.existsSync(row.file)){finished.push(row);continue;}
 const stamp=`${cache}/${row.id}-download.json`;if(fs.existsSync(stamp)){const saved=read(stamp);if(saved.url===row.url&&fs.existsSync(saved.file)){finished.push({...row,...saved});continue;}}
 const wait=Math.max(0,1200-(Date.now()-lastRequest));if(wait)await new Promise(r=>setTimeout(r,wait));lastRequest=Date.now();
 const r=await fetch(row.url.split('?')[0]);if(!r.ok)throw Error(`${row.id}: HTTP ${r.status}`);const type=r.headers.get('content-type')??'';
 const ext=type.includes('jpeg')?'jpg':type.includes('png')?'png':type.includes('gif')?'gif':type.includes('webp')?'webp':type.includes('tiff')?'tif':null;
 if(!ext)throw Error(`${row.id}: unexpected ${type}`);const originalFile=`${folder}/${row.id}.${ext}`;fs.writeFileSync(originalFile,Buffer.from(await r.arrayBuffer()));
 let file=originalFile;if(['gif','tif'].includes(ext)){file=`${folder}/${row.id}-still.png`;run(FFMPEG,['-y','-loglevel','error','-i',originalFile,'-frames:v','1',file],{quiet:true});}
 const item={...row,file,originalFile,changes:'Uniform crop, SVG sticker mask, white border and shadow; no generative repainting'};write(stamp,{url:row.url,file,originalFile});finished.push(item);console.log(`${row.id}: downloaded`);
 }catch(e){console.log(String(e));}
}}));
write(`${dir}/media.json`,finished);console.log(`Media ready ${finished.length}/${rows.length}`);
