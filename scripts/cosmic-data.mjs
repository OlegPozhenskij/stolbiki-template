import fs from 'node:fs';
import {read,write} from './lib/project.mjs';
if(fs.existsSync('episodes/cosmic-size-300/objects.json'))throw new Error('Список уже существует. Правьте objects.json; исходный черновик не заменяет проверенный выпуск.');
const N='https://science.nasa.gov/',J='https://ssd.jpl.nasa.gov/sats/phys_par/',A='https://nssdc.gsfc.nasa.gov/planetary/factsheet/asteroidfact.html';
const ly=9.4607304725808e12,solarDiameter=1391400;
const objects=[];
function add(id,title,family,size,fact,url,scope,extra={}){
 objects.push({id,title,family,physicalSizeKm:size,fact,approximate:true,...extra,source:{status:'pending',urls:Array.isArray(url)?url:[url],scope,fact,refresh:false}});
}
const already=read('episodes/planets-journal-180/content.json'),oldSources=read('episodes/planets-journal-180/sources.json');
for(const o of already.items){const facts={mercury:'Год длится всего 88 земных суток!',mars:'Красный цвет ему придаёт ржавчина.',venus:'Солнце встаёт на западе!',earth:'Здесь океаны жидкой воды.',neptune:'Ветры быстрее скорости звука!',uranus:'Вращается почти лёжа на боку!',saturn:'Плавал бы в огромной ванне!',jupiter:'Красное пятно — огромный шторм!'};add(o.id,o.title,'planet',o.value,facts[o.id],oldSources[o.id].urls,'Экваториальный диаметр диска планеты без колец, км. Факт NASA.',{accent:o.accent});}
const moonData=[
 ['ganymede','Ганимед',5262.4,'У него есть собственное магнитное поле!','jupiter/jupiter-moons/ganymede/'],
 ['titan','Титан',5149.52,'Здесь текут реки из метана!','saturn/moons/titan/facts/'],
 ['callisto','Каллисто',4820.6,'Вся поверхность усыпана кратерами.','jupiter/jupiter-moons/callisto/'],
 ['io','Ио',3643,'Здесь сотни действующих вулканов!','jupiter/jupiter-moons/io/'],
 ['moon','Луна',3474.8,'Всегда смотрит на нас одной стороной.','moon/facts/'],
 ['europa','Европа',3121.6,'Подо льдом, вероятно, скрыт океан.','jupiter/jupiter-moons/europa/'],
 ['triton','Тритон',2706.8,'Движется по орбите в обратную сторону!','neptune/moons/triton/'],
 ['titania','Титания',1577.8,'Названа в честь царицы фей.','uranus/moons/titania/'],
 ['rhea','Рея',1527.6,'Её поверхность покрыта льдом.','saturn/moons/rhea/'],
 ['oberon','Оберон',1522.8,'Назван в честь короля фей.','uranus/moons/oberon/'],
 ['iapetus','Япет',1468.6,'Одна половина тёмная, другая светлая!','saturn/moons/iapetus/'],
 ['charon','Харон',1212,'С Плутоном всегда смотрят друг на друга.','dwarf-planets/pluto/moons/charon/'],
 ['umbriel','Умбриэль',1169.4,'Его имя взято из старинной поэмы.','uranus/moons/umbriel/'],
 ['ariel','Ариэль',1157.8,'Назван в честь волшебного духа.','uranus/moons/ariel/'],
 ['dione','Диона',1122.8,'Здесь сверкают ледяные обрывы.','saturn/moons/dione/'],
 ['tethys','Тефия',1062.2,'По ней тянется гигантский каньон!','saturn/moons/tethys/'],
 ['enceladus','Энцелад',504.2,'Из трещин бьют ледяные фонтаны!','saturn/moons/enceladus/'],
 ['miranda','Миранда',471.6,'Пейзаж похож на лоскутное одеяло!','uranus/moons/miranda/'],
 ['mimas','Мимас',396.4,'Огромный кратер делает его похожим на глаз.','saturn/moons/mimas/'],
 ['hyperion','Гиперион',270,'Кувыркается, как брошенный камень!','saturn/moons/hyperion/']
];
for(const [id,title,size,fact,p] of moonData)add(id,title,'moon',size,fact,[J,N+p],'Средний диаметр: удвоенный средний радиус JPL, км. Для Гипериона эквивалентный диаметр, не большая ось.');
for(const [id,title,size,fact] of [
 ['pluto','Плутон',2376.6,'На нём есть ледяное «сердце»!'],
 ['eris','Эрида',2326,'Её спутник зовут Дисномия.'],
 ['haumea','Хаумеа',2322,'Вытянутая, словно яйцо!'],
 ['makemake','Макемаке',1430,'Она окрашена в красноватый цвет.'],
 ['ceres','Церера',965,'Первая открытая в поясе астероидов.']
])add(id,title,'dwarf',size,fact,[N+`dwarf-planets/${id}/facts/`,A],id==='haumea'?'Оценка наибольшего размера вытянутого тела; не сферический диаметр.':id==='ceres'?'Наибольшая ось 965 км из NASA Asteroid Fact Sheet.':'Оценка диаметра, км.');
for(const [id,title,size,fact,path] of [
 ['vesta','Веста',569,'На полюсе зияет огромный кратер!','4-vesta/'],
 ['pallas','Паллада',582,'Усыпана следами древних столкновений.','2-pallas/'],
 ['hygiea','Гигея',434,'Она почти круглая, как планета!','10-hygiea/'],
 ['lutetia','Лютеция',124,'Мимо неё пролетел зонд «Розетта».','21-lutetia/'],
 ['ida','Ида',58,'У неё есть собственный спутник!','243-ida/'],
 ['eros','Эрос',33,'На неё первым сел земной зонд!','433-eros/'],
 ['itokawa','Итокава',.535,'С неё на Землю привезли пылинки!','25143-itokawa/'],
 ['ryugu','Рюгу',.9,'Форма похожа на волчок!','162173-ryugu/'],
 ['bennu','Бенну',.492,'Его камешки доставили на Землю!','101955-bennu/']
])add(id,title,'asteroid',size,fact,[N+'solar-system/asteroids/'+path,A],'Для вытянутых тел — наибольший размер NASA; для близких к круглым — опубликованный диаметр. Размеры приблизительные.');
for(const [id,title,size,fact,path] of [
 ['halley','Комета Галлея',15,'Возвращается примерно раз в 76 лет.','1p-halley/'],
 ['67p','Комета 67P',4.3,'Похожа на космическую уточку!','67p-churyumov-gerasimenko/'],
 ['tempel-1','Темпель 1',7.6,'В неё запустили медный ударник!','9p-tempel-1/'],
 ['hartley-2','Хартли 2',2.2,'Газовые струи разбрасывают лёд!','103p-hartley-hartley-2/'],
 ['wild-2','Вильда 2',5.5,'Её пыль привезли на Землю!','81p-wild/']
])add(id,title,'comet',size,fact,N+'solar-system/comets/'+path,'Размер ледяного ядра, км. Хвост и газовая оболочка не входят в сравнение.');
for(const [id,title,size,fact,path,scope] of [
 ['iss','МКС',.109,'Облетает Землю за полтора часа!','https://www.nasa.gov/international-space-station/space-station-facts-and-figures/','Максимальный размах станции с солнечными батареями 109 м.'],
 ['hubble','Хаббл',.0132,'Смотрит на звёзды выше облаков.','https://science.nasa.gov/mission/hubble/overview/hubble-by-the-numbers/','Длина корпуса телескопа около13 м; не диаметр зеркала.'],
 ['jwst','Джеймс Уэбб',.0212,'Заглядывает в далёкое прошлое!','https://science.nasa.gov/mission/webb/spacecraft/','Длина развёрнутого солнцезащитного экрана около21.2м.'],
 ['voyager','Вояджер-1',.013,'Несёт золотую пластинку с Земли!','https://science.nasa.gov/mission/voyager/spacecraft/','Длина с развёрнутыми выносными штангами; требует проверки.'],
 ['cassini','Кассини',.0068,'Нырнул в атмосферу Сатурна.','https://science.nasa.gov/mission/cassini/spacecraft/','Высота аппарата со связанной конфигурацией; требует проверки.'],
 ['new-horizons','Новые горизонты',.0027,'Показал ледяное «сердце» Плутона!','https://science.nasa.gov/mission/new-horizons/spacecraft/','Наибольшая ширина аппарата; требует проверки.'],
 ['curiosity','Кьюриосити',.003,'Сверлит камни на Марсе!','https://science.nasa.gov/mission/msl/curiosity-rover/','Длина марсохода около3м.'],
 ['ingenuity','Индженьюити',.0012,'Впервые взлетел в небе Марса!','https://science.nasa.gov/mission/mars-2020-perseverance/ingenuity-mars-helicopter/','Диаметр несущих винтов1.2м; корпус меньше.']
])add(id,title,'spacecraft',size,fact,path,scope);
for(const [id,title,mult,fact,url,color] of [
 ['betelgeuse','Бетельгейзе',764,'Красный сверхгигант меняет яркость.','https://arxiv.org/abs/2006.09837','#d99a7e'],
 ['antares','Антарес',700,'Красная звезда — «сердце» Скорпиона.','https://www.eso.org/public/news/eso1726/','#ce967f'],
 ['rigel','Ригель',79,'Голубой сверхгигант в Орионе.','https://www.aanda.org/articles/aa/pdf/2014/06/aa22894-13.pdf','#acd0dc'],
 ['aldebaran','Альдебаран',44.2,'Оранжевый «глаз» небесного Тельца.','https://arxiv.org/abs/astro-ph/0502181','#e3b885'],
 ['arcturus','Арктур',25.4,'Он помогал морякам находить путь.','https://arxiv.org/abs/1109.4425','#d8b789'],
 ['sirius','Сириус',1.713,'Самая яркая звезда ночного неба!','https://arxiv.org/abs/1010.3790','#c6d4d9'],
 ['sun','Солнце',1,'Его свет идёт к нам около 8 минут.','https://science.nasa.gov/sun/facts/','#edcb89']
])add(id,title,'star',mult*solarDiameter,fact,url,'Оценка диаметра фотосферы. Отношение радиусов в R☉ равно отношению диаметров; номинальный солнечный диаметр1 391 400км.',{color});
add('sirius-b','Сириус B','star',12000,'Белый карлик — плотный звёздный кроха!','https://esahubble.org/images/heic0516b/','Приблизительный диаметр белого карлика12000км.',{color:'#b9d4dd'});
add('crab-pulsar','Крабовый пульсар','pulsar',20,'Вращается около 30 раз в секунду!','https://science.nasa.gov/missions/hubble/the-crab-nebula/','Оценка диаметра нейтронной звезды около20км; не размер всей туманности.',{color:'#adc9d4'});
add('m87-black-hole','Чёрная дыра M87*','black-hole',40e9,'Её «тень» первой попала на снимок.','https://www.eso.org/public/news/eso1907/','Приблизительный размер горизонта событий, не светящегося диска и не тени.');
add('sagittarius-a','Стрелец A*','black-hole',26e6,'Скрывается в центре нашей Галактики.','https://www.eso.org/public/news/eso2208/','Приблизительный размер горизонта событий, не тени.');
for(const [id,title,n,fact,url] of [
 ['andromeda','Андромеда',152000,'Её видно без телескопа!','https://science.nasa.gov/missions/hubble/hubble-zooms-into-the-rosy-tendrils-of-andromeda/'],
 ['milky-way','Млечный Путь',100000,'Здесь живёт наше Солнце.','https://science.nasa.gov/universe/galaxies/'],
 ['triangulum','Галактика Треугольника',60000,'Здесь рождаются новые звёзды.','https://esahubble.org/news/heic1901/'],
 ['eagle-nebula','Туманность Орёл',70,'Здесь рождаются звёзды в газовых столпах.','https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-16/'],
 ['orion-nebula','Туманность Ориона',24,'Её можно увидеть даже без телескопа!','https://science.nasa.gov/solar-system/skywatching/night-sky-network/a-flame-in-the-sky-the-orion-nebula/'],
 ['crab-nebula','Крабовидная туманность',11,'Остаток взорвавшейся звезды!','https://science.nasa.gov/asset/hubble/crab-nebula-3/'],
 ['horsehead-nebula','Конская Голова',5,'Тёмный конь из космической пыли!','https://science.nasa.gov/image-article/apod-2025-december-10-the-horsehead-nebula/'],
 ['helix-nebula','Туманность Улитка',3,'Звезда сбросила светящуюся оболочку.','https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-caldwell-catalog/caldwell-63/'],
 ['ring-nebula','Туманность Кольцо',1,'Газовое кольцо вокруг старой звезды.','https://science.nasa.gov/missions/hubble/looking-down-a-barrel-of-gas-at-a-doomed-star/']
])add(id,title,id.includes('nebula')?'nebula':'galaxy',n*ly,fact,url,id.includes('nebula')?'Приблизительный видимый размер газовой структуры; у Конской Головы высота, у Улитки яркое кольцо.':'Приблизительный диаметр видимого звёздного диска, не протяжённого тёмного гало.');
if(objects.length!==75||new Set(objects.map(o=>o.id)).size!==75)throw new Error('Нужно75разныхобъектов');
for(const o of objects)if([...o.fact].length>45)throw new Error('Сократите факт: '+o.id);
objects.sort((a,b)=>a.physicalSizeKm-b.physicalSizeKm);
write('episodes/cosmic-size-300/objects.json',objects);
write('episodes/cosmic-size-300/count.json',{cards:objects.length,planets:objects.filter(x=>x.family==='planet').length,other:objects.filter(x=>x.family!=='planet').length,secondsPerCard:4,totalSeconds:objects.length*4,families:Object.fromEntries([...new Set(objects.map(o=>o.family))].map(f=>[f,objects.filter(o=>o.family===f).length]))});
console.log('75 карточек = 8 планет + 67 других объектов = 300 секунд. Источники пока pending.');
