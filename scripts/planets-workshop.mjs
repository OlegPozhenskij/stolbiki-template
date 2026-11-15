import fs from 'node:fs';
import {read,write} from './lib/project.mjs';
import {planetScene} from './planet-art.mjs';

const rows=[
 ['mercury','Меркурий',4879,'Ночью холоднее, чем в морозилке!','#746a60','Маленький спринтер','mercury/facts/',['Ближе всех планет к Солнцу.','Год длится всего 88 земных суток.']],
 ['mars','Марс',6792,'Красный цвет ему придаёт ржавчина.','#b35e45','Рыжий исследователь','mars/facts/',['Олимп — крупнейший вулкан нашей системы.','Его спутники — Фобос и Деймос.']],
 ['venus','Венера',12104,'Солнце встаёт на западе!','#9f6f3c','Горячая загадка','venus/venus-facts/',['Самая горячая планета нашей системы.','Её скрывает плотная пелена облаков.']],
 ['earth','Земля',12756,'Океаны жидкой воды на поверхности.','#287d75','Любопытная соседка','earth/facts/',['Крупнейшая из каменистых планет.','Вокруг неё обращается одна Луна.']],
 ['neptune','Нептун',49528,'Ветры быстрее скорости звука!','#426b9c','Неугомонный ветреник','neptune/neptune-facts/',['Дальше всех планет от Солнца.','Год длится около 165 земных лет.']],
 ['uranus','Уран',51118,'Вращается почти лёжа на боку!','#337e82','Мастер неожиданных поворотов','uranus/facts/',['Его открыли с помощью телескопа.','У него есть узкие тёмные кольца.']],
 ['saturn','Сатурн',120536,'Кольца изо льда и камней.','#9d693d','Элегантный мечтатель','saturn/facts/',['На северном полюсе — шестиугольник.','Его средняя плотность ниже, чем у воды.']],
 ['jupiter','Юпитер',142984,'Красное пятно — гигантский шторм.','#ab6549','Спокойный великан','jupiter/jupiter-facts/',['Это самая большая планета системы.','Оборот вокруг оси — меньше 10 часов.']],
];
const mode=process.argv[2],rev=Number(process.argv[3]??1),full=mode==='full';
if(mode==='refresh-pilot'){
 const assets=read(`episodes/planets-pilot-${rev}/assets.json`),catalog=read('assets/catalog.json');
 for(const [id,{scene}] of Object.entries(assets))fs.writeFileSync(catalog[scene].module,`export default ${JSON.stringify(planetScene(id,rev))};\n`);
 console.log(`Обновлены только три сцены пилота ${rev}`);process.exit(0);
}
if(!['pilot','full'].includes(mode)||![1,2,3].includes(rev))throw new Error('pilot 1|2|3 или full 3');
if((full||rev>1)&&!fs.existsSync(`episodes/planets-pilot-${full?rev:rev-1}/review.json`))throw new Error('Сначала просмотрите пробу и сохраните review.json');
if(full&&!['selected','approved'].includes(read(`episodes/planets-pilot-${rev}/review.json`).verdict))throw new Error('Выберите проверенный вариант в review.json; повторные циклы не обязательны');
const id=full?'planets-journal-180':`planets-pilot-${rev}`;
if(fs.existsSync(`episodes/${id}/brief.json`))throw new Error(`Уже существует: ${id}`);
const selected=full?rows:['earth','saturn','jupiter'].map(id=>rows.find(r=>r[0]===id));
const design=`planet-journal-v${rev}`,designs=read('designs/catalog.json');
designs[design]={name:`Иллюстрированный журнал · ${rev}`,layout:'panel',background:'#142b40',ink:'#fff5df',title:'#fff5df',accent:'#e1b477',badge:'#ad7953',heading:'body',badgeShape:'round',texture:false,cardStyle:'journal',revision:rev};write('designs/catalog.json',designs);
const items=selected.map(([id,title,value,fact,accent,tag,,details])=>({id,title,value,fact,unit:'км',move:'float',accent,tag,metricLabel:'ДИАМЕТР · ЭКВАТОР',...(id==='jupiter'?{finaleLabel:'САМЫЙ БОЛЬШОЙ'}:{}),...(full?{details:details.map((text,i)=>({at:210*(i+1),text}))}:{})}));
for(const item of items)for(const text of [item.fact,...(item.details??[]).map(b=>b.text)])if([...text].length>45)throw new Error(`Подпись длиннее 45: ${text}`);
const catalog=read('assets/catalog.json'),assets={};
for(const item of items){const scene=`planet-${item.id}-v${rev}`,module=`assets/scenes/${scene}.mjs`;fs.writeFileSync(module,`export default ${JSON.stringify(planetScene(item.id,rev))};\n`);catalog[scene]={module,label:`${item.title} · иллюстрация ${rev}`,layers:['background','foreground'],license:'project-original'};assets[item.id]={scene};}write('assets/catalog.json',catalog);
const dir=`episodes/${id}`;
write(`${dir}/brief.json`,{schemaVersion:1,engine:'cards-v1',kind:'episode',title:'Планеты с характером',audience:'Семейное научно-популярное видео',seconds:full?180:20,design,world:'native',media:'vector',music:'calm',timezone:'Europe/Moscow',timing:{fps:30,intro:full?180:60,step:full?630:150,holdLast:0,outro:full?180:90},production:{reviewCycles:full?rev:1,pilotCards:['earth','saturn','jupiter'],provider:'ManyMotions free editor + local Remotion',paidGeneration:false,illustrationsToScale:false}});
write(`${dir}/content.json`,{title:'Планеты с характером',subtitle:full?'От маленькой к гигантской. Рисунки не в масштабе.':'Три героя. Рисунки не в масштабе.',cta:'Кто удивил тебя?',ctaSub:'Выбери своего космического героя',motif:'sky',items,thumb:{title:'Планеты',ids:['earth','saturn','jupiter'],badge:{shown:String(items.length),unit:full?'планет':'планеты'}}});
write(`${dir}/assets.json`,assets);
write(`${dir}/sources.json`,Object.fromEntries(selected.map(([id,,,,,,url,details])=>[id,{status:'verified',checkedAt:'2026-11-15',urls:['https://nssdc.gsfc.nasa.gov/planetary/factsheet/',`https://science.nasa.gov/${url}`],scope:'Экваториальный диаметр, километры; единое определение для всех восьми планет. Иллюстрации не в масштабе.',fact:[items.find(i=>i.id===id).fact,...(full?details:[])].join(' '),refresh:false}])));
write(`${dir}/status.json`,{stage:'design',reviewCycle:rev,notes:full?'Выбран после просмотра пилота. Итоговая длительность 180 секунд.':'Ровно три карточки. Перед полным выпуском просмотреть результат.'});
console.log(`Создан ${id}`);
