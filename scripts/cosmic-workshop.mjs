import fs from 'node:fs';
import {read,write} from './lib/project.mjs';
import {cosmicArt} from './cosmic-art.mjs';
const pilot=process.argv[2]!=='full',dir=`episodes/${pilot?'cosmic-size-pilot':'cosmic-size-300'}`;
const old=read('episodes/planets-journal-180/content.json'),oldSources=read('episodes/planets-journal-180/sources.json');
const pilotRows=['earth','saturn','jupiter'].map((id,i)=>{const o=old.items.find(x=>x.id===id);return {id,title:o.title,family:'planet',physicalSizeKm:o.value,fact:id==='jupiter'?'Красное пятно — огромный шторм!':id==='saturn'?'Плавал бы в огромной ванне!':'Здесь океаны жидкой воды.',emotion:[2,3,1][i],accent:o.accent,source:oldSources[id]};});
const objects=(pilot?pilotRows:read('episodes/cosmic-size-300/objects.json')).sort((a,b)=>a.physicalSizeKm-b.physicalSizeKm);
if(!pilot&&!fs.existsSync('episodes/cosmic-size-pilot/review.json'))throw new Error('Сначала одна проба и review.json');
const designs=read('designs/catalog.json');designs['cosmic-pencil-hex']={name:'Карандашный космос · шестиугольник',layout:'panel',background:'#172b46',ink:'#fff5df',title:'#fff5df',accent:'#e2b97f',badge:'#e1bd82',heading:'body',badgeShape:'hex',texture:false,cardStyle:'cosmic'};write('designs/catalog.json',designs);
const group=0;
const catalog=read('assets/catalog.json'),assets={},sources={},items=[];
for(const [i,obj] of objects.entries()){
 const {scene,artWidth,portraitWidth}=cosmicArt(obj,i),sceneId=`cosmic-${obj.id}`,module=`assets/scenes/${sceneId}.mjs`;
 fs.writeFileSync(module,`export default ${JSON.stringify(scene)};\n`);catalog[sceneId]={module,label:obj.title,layers:['background','foreground'],license:'project-original'};assets[obj.id]={scene:sceneId};
 let number=obj.physicalSizeKm,unit='км',prefix='';
 if(number>=9.4607304725808e15){number=Number((number/9.4607304725808e15).toPrecision(3));unit='тыс. св. лет';prefix='≈';}
 else if(number>=9.4607304725808e12){number=Number((number/9.4607304725808e12).toPrecision(3));unit='св. лет';prefix='≈';}
 else if(number>=1e9){number=Number((number/1e9).toPrecision(3));unit='млрд км';prefix='≈';}
 else if(number>=1e6){number=Number((number/1e6).toPrecision(3));unit='млн км';prefix='≈';}
 else if(number<1){number=Number((number*1000).toPrecision(3));unit='м';prefix='≈';}
 else if(number>=1000){number=Number((number/1000).toPrecision(3));unit='тыс. км';prefix='≈';}
 else {number=Number(number.toPrecision(3));prefix=obj.approximate?'≈':'';}
 items.push({id:obj.id,title:obj.title,value:number,unit,prefix,fact:obj.fact,metricLabel:obj.family==='black-hole'?'ГОРИЗОНТ':obj.family==='comet'?'ЯДРО':'РАЗМЕР',physicalSizeKm:obj.physicalSizeKm,scaleGroup:group,artWidth,portraitWidth,emotion:obj.emotion??i%8,accent:obj.accent??['#3d7e86','#a76c56','#727498','#5f8079','#a47a44'][i%5],move:'float'});
 sources[obj.id]={...obj.source,fact:obj.fact};
}
write('assets/catalog.json',catalog);
const brief=read('episodes/cosmic-size-300/brief.json');
write(`${dir}/brief.json`,{...brief,seconds:objects.length*4,cardCount:objects.length,production:{...brief.production,pilotCards:pilotRows.map(x=>x.id)},timing:{fps:30,intro:0,step:120,holdLast:0,outro:0}});
write(`${dir}/content.json`,{title:brief.title,subtitle:'',cta:'Кто удивил тебя?',ctaSub:'Выбери своего космического героя',motif:'sky',items,thumb:{title:'Огромный космос',ids:pilot?['jupiter','saturn','earth']:['milky-way','jupiter','iss'],badge:{shown:String(items.length),unit:'объектов'}}});
write(`${dir}/sources.json`,sources);write(`${dir}/assets.json`,assets);write(`${dir}/status.json`,{stage:'design',reviewCycles:1,notes:'Одна проба. Смена масштаба явно обозначена; крупный план появления отделён от общего масштаба.'});
console.log(`${objects.length} карточек × 4 секунды = ${objects.length*4} секунд; ${group+1} масштабных групп`);
