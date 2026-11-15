import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {ROOT,read,write,hash,fileHash,loadEpisode,episodePath,validateEpisode,chunkKeys} from './lib/project.mjs';
import {prepareAssets} from './lib/assets.mjs';
import {run,remotion,PYTHON,FFMPEG,FFPROBE,environment,workers,chrome} from './lib/runtime.mjs';

const log=console.log;
function argsOf(args){const options={};for(let i=0;i<args.length;i++){if(args[i].startsWith('--')){options[args[i].slice(2)]=args[i+1]&&!args[i+1].startsWith('--')?args[++i]:true;}}return options;}
function state(ep,stage){const f=`${ep.dir}/status.json`;const previous=fs.existsSync(path.join(ROOT,f))?read(f):{};if(previous.stage!==stage)write(f,{...previous,stage});}
function lock(){
 const f=path.join(ROOT,'tmp/pipeline.lock');fs.mkdirSync(path.dirname(f),{recursive:true});
 if(fs.existsSync(f)){const pid=Number(fs.readFileSync(f,'utf8'));let live=true;try{process.kill(pid,0);}catch(e){if(e.code==='ESRCH')live=false;}if(live)throw new Error(`Сборка уже идёт (PID ${pid}). Дождитесь завершения.`);fs.unlinkSync(f);}
 fs.writeFileSync(f,String(process.pid),{flag:'wx'});return()=>{if(fs.existsSync(f)&&fs.readFileSync(f,'utf8')===String(process.pid))fs.unlinkSync(f);};
}
export function setup(){
 const env=environment();
 run(PYTHON,['-c','import numpy,scipy,PIL,playwright;print("Python: OK")'],{env,quiet:true});
 for(const d of ['public/fonts','public/pencil','public/audio','public/art'])fs.mkdirSync(path.join(ROOT,d),{recursive:true});
 for(const [family,weights] of [['nunito',[800,900]],['caveat',[700]]])for(const lang of ['cyrillic','latin'])for(const w of weights){const name=`${family}-${lang}-${w}-normal.woff2`;fs.copyFileSync(path.join(ROOT,`node_modules/@fontsource/${family}/files/${name}`),path.join(ROOT,`public/fonts/${name}`));}
 if(!fs.existsSync(path.join(ROOT,'scripts/sketch/bundle.js')))run(process.execPath,['node_modules/esbuild/bin/esbuild','scripts/sketch/entry.js','--bundle','--format=iife','--outfile=scripts/sketch/bundle.js'],{env,quiet:true});
 if(!fs.existsSync(path.join(ROOT,'public/pencil/paper.jpg'))||!fs.existsSync(path.join(ROOT,'public/pencil/vline.png')))run(PYTHON,['scripts/sketch/textures.py'],{env,quiet:true});
 log('Среда готова: Node, Python, Chrome, шрифты и текстуры.');
}
async function badge(ep){
 if(read('designs/catalog.json')[ep.brief.design].layout!=='album')return;
 const name=ep.content.motif??'classic';
 const badgeColor=read('designs/catalog.json')[ep.brief.design].badge;
 const key=hash(name,badgeColor,read('src/motifs.json')[name],fileHash('scripts/badge.mjs'),fileHash('scripts/sketch/sketch.py'));
 const stamp='public/pencil/badge-cache.json';
 const cached=`public/generated/badges/${key.slice(0,24)}`;
 const pairs=[['public/pencil/badge.png','badge.png'],['public/art/badge-mask.svg','badge-mask.svg'],['public/art/badge.svg','badge.svg']];
 if(pairs.every(([,file])=>fs.existsSync(path.join(ROOT,cached,file)))){
  for(const [target,file] of pairs)fs.copyFileSync(path.join(ROOT,cached,file),path.join(ROOT,target));
  write(stamp,{key});return;
 }
 if(fs.existsSync(path.join(ROOT,stamp))&&read(stamp).key===key&&pairs.every(([file])=>fs.existsSync(path.join(ROOT,file)))){
  fs.mkdirSync(path.join(ROOT,cached),{recursive:true});
  for(const [source,file] of pairs)fs.copyFileSync(path.join(ROOT,source),path.join(ROOT,cached,file));return;
 }
 run(process.execPath,['scripts/badge.mjs',name,...(badgeColor?[badgeColor]:[])],{quiet:true});
 run(PYTHON,['scripts/sketch/sketch.py','badge'],{quiet:true});
 run(PYTHON,['scripts/sketch/to_alpha.py','public/pencil/badge.png'],{quiet:true});
 fs.mkdirSync(path.join(ROOT,cached),{recursive:true});
 for(const [source,file] of pairs)fs.copyFileSync(path.join(ROOT,source),path.join(ROOT,cached,file));
 write(stamp,{key});
}
export async function prepare(ep){
 const t=validateEpisode(ep);
 if(!fs.existsSync(path.join(ROOT,'public/fonts/nunito-cyrillic-900-normal.woff2'))||!fs.existsSync(path.join(ROOT,'scripts/sketch/bundle.js')))setup();
 await badge(ep);
 const assets=await prepareAssets(ep);
 const b=ep.brief,c=ep.content;
 const runtime={video:{...c,theme:b.media,design:b.design,assets,pace:b.timing},thumb:{...c.thumb,theme:b.media,design:b.design,motif:c.motif,assets}};
 delete runtime.video.thumb;
 write('src/generated/episode.json',runtime);write('src/generated/timeline.json',t);
 write(`out/${ep.id}/timeline.json`,t);write(`out/${ep.id}/runtime.json`,runtime);
 return {ep,t,assets,runtime};
}
function sourceFiles(dir){return fs.readdirSync(path.join(ROOT,dir),{withFileTypes:true}).flatMap(d=>d.name==='generated'?[]:d.isDirectory()?sourceFiles(`${dir}/${d.name}`):/\.(tsx?|mjs)$/.test(d.name)?[`${dir}/${d.name}`]:[]);}
function globalKey(ep){
 const files=[...sourceFiles('src'),'package-lock.json','remotion.config.ts'];
 const skin=read('designs/catalog.json')[ep.brief.design];
 if(skin.layout==='album')files.push('public/pencil/badge.png','public/art/badge-mask.svg','public/pencil/vline.png','public/pencil/paper.jpg','public/pencil/paper-thumb.jpg');
 files.push(...fs.readdirSync(path.join(ROOT,'public/fonts')).sort().map(n=>`public/fonts/${n}`));
 return hash(skin,ep.content.motif,read('src/motifs.json'),files.map(f=>[f,fileHash(f)]),'crf=18,jpeg,1080p');
}
function bundle(){run(process.execPath,['node_modules/typescript/bin/tsc','--noEmit'],{quiet:true});remotion(['bundle','--out-dir=build','--log=error'],{quiet:true});}
export function verifyVideo(file,t){
 const info=JSON.parse(run(FFPROBE,['-v','error','-show_entries','format=duration,size:stream=codec_name,codec_type,width,height,r_frame_rate,nb_frames,duration','-of','json',file],{quiet:true}));
 const v=info.streams.find(s=>s.codec_type==='video'),a=info.streams.find(s=>s.codec_type==='audio');
 if(!v||!a||v.width!==1920||v.height!==1080||Number(v.nb_frames)!==t.total||Math.abs(Number(info.format.duration)-t.total/t.fps)>.05||Math.abs(Number(a.duration)-t.total/t.fps)>.05)throw new Error('Не прошла проверка длительности, кадров или звука');
 return info;
}
async function soundtrack(ep,t){
 const musicScript=ep.brief.music==='cosmic'?'scripts/cosmic-music.py':'scripts/music.py';
 const key=hash(t,ep.brief.music,fileHash(musicScript),fileHash('scripts/music_timing.py'));
 const dir=`out/${ep.id}`,audio=`${dir}/soundtrack.wav`,stamp=`${dir}/music-cache.json`;
 if(!fs.existsSync(path.join(ROOT,audio))||!fs.existsSync(path.join(ROOT,stamp))||read(stamp).key!==key){
  run(PYTHON,[musicScript],{env:environment({TIMELINE_PATH:path.join(ROOT,dir,'timeline.json'),OUTPUT_AUDIO:path.join(ROOT,audio),MUSIC_PRESET:ep.brief.music}),quiet:true});write(stamp,{key});log('Музыка: создана');
 }else log('Музыка: из кэша');
 return {key,audio};
}
export async function render(ep){
 const {t,assets,runtime}=await prepare(ep);
 const out=`out/${ep.id}`,dir=`${out}/chunks`,g=globalKey(ep),keys=chunkKeys(ep,t,assets,g);
 const music=await soundtrack(ep,t),coverKey=hash(runtime.thumb,g),finalKey=hash(keys,music.key,coverKey);
 const cached=fs.existsSync(path.join(ROOT,out,'render-cache.json'))?read(`${out}/render-cache.json`):{};
 if(cached.finalKey===finalKey&&fs.existsSync(path.join(ROOT,out,'video.mp4'))&&fs.existsSync(path.join(ROOT,out,'thumb.png'))){verifyVideo(`${out}/video.mp4`,t);state(ep,'rendered');log(`Готовый выпуск из кэша: ${out}/video.mp4`);return;}
 bundle();fs.mkdirSync(path.join(ROOT,dir),{recursive:true});
 let changed=0;
 for(let i=0;i<keys.length;i++){
  const file=`${dir}/${String(i).padStart(3,'0')}.mp4`,stamp=`${file}.json`;
  if(fs.existsSync(path.join(ROOT,file))&&fs.existsSync(path.join(ROOT,stamp))&&read(stamp).key===keys[i]){log(`Фрагмент ${i+1}/${keys.length}: из кэша`);continue;}
  const temporary=`${dir}/${String(i).padStart(3,'0')}.tmp.mp4`;
  remotion(['render','build','Episode',temporary,`--frames=${i*600}-${Math.min(t.total-1,(i+1)*600-1)}`,`--browser-executable=${chrome()}`,'--crf=18',`--concurrency=${workers()}`,'--log=error'],{quiet:true});
  fs.renameSync(path.join(ROOT,temporary),path.join(ROOT,file));write(stamp,{key:keys[i]});changed++;log(`Фрагмент ${i+1}/${keys.length}: готов`);
 }
 fs.writeFileSync(path.join(ROOT,dir,'list.txt'),keys.map((_,i)=>`file '${String(i).padStart(3,'0')}.mp4'`).join('\n')+'\n');
 run(FFMPEG,['-y','-loglevel','error','-f','concat','-safe','0','-i',`${dir}/list.txt`,'-i',music.audio,'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-t',String(t.total/t.fps),'-movflags','+faststart',`${out}/video.tmp.mp4`],{quiet:true});
 const verified=verifyVideo(`${out}/video.tmp.mp4`,t);fs.renameSync(path.join(ROOT,out,'video.tmp.mp4'),path.join(ROOT,out,'video.mp4'));
 if(cached.coverKey!==coverKey||!fs.existsSync(path.join(ROOT,out,'thumb.png')))remotion(['still','build','Cover',`${out}/thumb.png`,`--browser-executable=${chrome()}`,'--log=error'],{quiet:true});
 write(`${out}/verification.json`,verified);write(`${out}/render-cache.json`,{finalKey,coverKey,chunks:keys,renderedChunks:changed});state(ep,'rendered');
 log(`Готово: ${out}/video.mp4 (${t.total/t.fps} с), thumb.png; пересобрано ${changed}/${keys.length} фрагментов`);
}
export async function preview(ep,options={}){
 const {t}=await prepare(ep);bundle();
 const selected=options.cards?String(options.cards).split(','):ep.content.items.map(i=>i.id);
 for(const id of selected)if(!ep.content.items.some(i=>i.id===id))throw new Error(`Карточка не найдена: ${id}`);
 const frames=[t.intro?Math.floor(t.intro*.45):45,...ep.content.items.flatMap((item,i)=>selected.includes(item.id)?[t.cardStarts[i]+60]:[]),t.total-10];
 for(const f of new Set(frames))remotion(['still','build','Episode',`out/${ep.id}/check-${String(f).padStart(6,'0')}.png`,`--frame=${f}`,`--browser-executable=${chrome()}`,'--log=error'],{quiet:true});
 remotion(['still','build','Cover',`out/${ep.id}/thumb.png`,`--browser-executable=${chrome()}`,'--log=error'],{quiet:true});
 write(`out/${ep.id}/contact-frames.json`,[...new Set(frames)].map(f=>`check-${String(f).padStart(6,'0')}.png`));
 run(PYTHON,['scripts/contact-sheet.py',`out/${ep.id}`],{quiet:true});state(ep,'preview-ready');log(`Предпросмотр: out/${ep.id}/check.jpg`);
}
function newEpisode(id,o){
 const dir=episodePath(id);if(fs.existsSync(path.join(ROOT,dir)))throw new Error('Выпуск уже существует; выберите другой id');
 const seconds=Number(o.seconds??60),count=Number(o.cards??((seconds-10)/5));
 if(!Number.isInteger(count)||count<1)throw new Error('Укажите --cards; по умолчанию длительность должна равняться 10 + 5 × число карточек');
 const fps=30,intro=150,outro=150,step=(seconds*fps-intro-outro)/count;
 const brief={schemaVersion:1,engine:'cards-v1',kind:'episode',title:o.title??id,audience:o.audience??'8–15 лет',seconds,design:o.design??'pencil-album',world:o.world??'native',media:o.media??'pencil',music:'bright',timing:{fps,intro,step,holdLast:0,outro}};
 // Check timing before creating any files.
 if(!Number.isInteger(step)||step<60)throw new Error('Для выбранного числа карточек длительность не даёт целый и читаемый шаг');
 const items=Array.from({length:count},(_,i)=>({id:`item-${i+1}`,prefix:'',value:i+1,unit:'',title:`Герой ${i+1}`,fact:'Добавьте проверенный факт',move:'wiggle'}));
 write(`${dir}/brief.json`,brief);write(`${dir}/content.json`,{title:brief.title,subtitle:'',cta:'Кто удивил тебя?',ctaSub:'Пиши в комментариях!',motif:'classic',items,thumb:{title:brief.title,ids:items.slice(-3).map(i=>i.id),badge:{shown:'?',unit:''}}});
 write(`${dir}/sources.json`,Object.fromEntries(items.map(i=>[i.id,{status:'pending',urls:[],scope:'',fact:''}])));write(`${dir}/assets.json`,Object.fromEntries(items.map(i=>[i.id,{scene:null}])));write(`${dir}/status.json`,{stage:'brief'});
 log(`Создан ${dir}. Заполните content.json, sources.json и assets.json. Черновик нельзя отрендерить до проверки источников.`);
}
export async function main(args){
 const [command='help',id,...rest]=args,o=argsOf(rest);
 if(command==='help'){log('episode: list | new <id> --title ... --seconds 60 | inspect <id> | validate <id> | prepare <id> | preview <id> | render <id> | setup');return;}
 if(command==='list'){log(JSON.stringify({episodes:fs.readdirSync(path.join(ROOT,'episodes')),designs:Object.keys(read('designs/catalog.json')),worlds:Object.keys(read('worlds/catalog.json')),assets:Object.keys(read('assets/catalog.json'))},null,2));return;}
 if(command==='new'){newEpisode(id,o);return;}
 if(command==='setup'){setup();return;}
 const ep=loadEpisode(id);
 if(command==='inspect'){log(JSON.stringify({brief:ep.brief,status:read(`${ep.dir}/status.json`),cards:ep.content.items.length},null,2));return;}
 if(command==='validate'){const t=validateEpisode(ep);log(`OK: ${id}, ${t.cardStarts.length} карточек, ${t.total} кадров, ${t.total/t.fps} с`);return;}
 if(!['prepare','preview','render'].includes(command))throw new Error(`Неизвестная команда: ${command}`);
 const unlock=lock();try{await ({prepare,preview,render}[command])(ep,o);}finally{unlock();}
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main(process.argv.slice(2)).catch(e=>{console.error(e.message);process.exitCode=1;});
