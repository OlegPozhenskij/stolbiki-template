import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {read,write} from './lib/project.mjs';
const objects=read('episodes/cosmic-size-300/objects.json');
if(process.argv.includes('--sbdb')){
 for(const [id,num] of [['pallas','2'],['vesta','4'],['lutetia','21'],['ida','243'],['eros','433'],['ryugu','162173'],['bennu','101955'],['itokawa','25143'],['tempel-1','9P']]){
  const url=`https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=${num}&phys-par=1`,j=await(await fetch(url)).json(),v=j.phys_par?.find(x=>x.name==='extent');
  if(!v)throw new Error(`JPL extent missing: ${id}`);
  const size=Math.max(...v.value.split(/x/i).map(Number));if(!(size>0))throw new Error(id);
  const o=objects.find(o=>o.id===id);o.physicalSizeKm=size;if(!o.source.urls.includes(url))o.source.urls.push(url);
  o.source.sizeEvidence=`${v.value} km; ${v.ref}`;o.source.scope='Наибольший линейный размер по JPL SBDB extent, км; не масса и не средний радиус.';
 }
 objects.sort((a,b)=>a.physicalSizeKm-b.physicalSizeKm);write('episodes/cosmic-size-300/objects.json',objects);console.log('JPL: девять наибольших размеров из измеренных осей');process.exit(0);
}
if(process.argv.includes('--jpl')){
 const h=await(await fetch('https://ssd.jpl.nasa.gov/sats/phys_par/')).text();let n=0;
 for(const row of h.matchAll(/<tr\b[\s\S]*?<\/tr>/g)){
  const cells=[...row[0].matchAll(/<td\b[^>]*>([\s\S]*?)(?=<td\b|<\/tr>)/g)].map(x=>x[1].replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
  const o=objects.find(o=>o.family==='moon'&&o.id===cells[1]?.toLowerCase());
  if(o){const radius=Number(cells[6]);if(!(radius>0))throw new Error(o.id);o.physicalSizeKm=radius*2;o.source.jplMeanRadiusKm=radius;n++;}
 }
 if(n!==20)throw new Error(`JPL matched ${n}/20`);
 objects.sort((a,b)=>a.physicalSizeKm-b.physicalSizeKm);write('episodes/cosmic-size-300/objects.json',objects);console.log(`JPL: ${n} moon diameters = 2 × mean radius`);process.exit(0);
}
const needles={
 'ingenuity':['1.2','first'],curiosity:['3 meters','drill'], 'new-horizons':['2.7','Pluto'],cassini:['6.8','Saturn'],voyager:['boom','Golden'],hubble:['13','cloud'],jwst:['21','early'],iss:['109','90'],
 bennu:['492','sample'],itokawa:['535','sample'],ryugu:['900','top'],eros:['33','land'],ida:['58','moon'],lutetia:['124','Rosetta'],hygiea:['434','spher'],pallas:['582','crater'],vesta:['569','crater'],
 halley:['15','76'], '67p':['4.3','duck'], 'tempel-1':['7.6','copper'], 'hartley-2':['2.2','ice'], 'wild-2':['5.5','sample'],
 moon:['1,737','same'],ganymede:['2,631','magnetic'],titan:['2,574','methane'],callisto:['2,410','crater'],io:['1,821','volcano'],europa:['1,560','ocean'],triton:['1,353','opposite'],titania:['788','queen'],rhea:['763','ice'],oberon:['761','king'],iapetus:['734','dark'],charon:['606','same'],umbriel:['584','Pope'],ariel:['578','spirit'],dione:['561','cliffs'],tethys:['531','Ithaca'],enceladus:['252','plume'],miranda:['235','patch'],mimas:['198','Herschel'],hyperion:['135','chaotic'],
 pluto:['2,377','heart'],eris:['2,326','Dysnomia'],haumea:['2,322','elongated'],makemake:['1,430','reddish'],ceres:['965','1801'],
 'andromeda':['152,000','naked'], 'milky-way':['100,000','Sun'],triangulum:['60 000','star formation'], 'eagle-nebula':['70 by 55','newborn'], 'orion-nebula':['24 light','naked'], 'crab-nebula':['11 light','explosion'], 'horsehead-nebula':['five light','dust'], 'helix-nebula':['three light','dying'], 'ring-nebula':['one light','dying'],
 'm87-black-hole':['40 billion','first'], 'sagittarius-a':['26 million','centre'], 'crab-pulsar':['20','30 times'],sun:['1,392','8 minutes'], 'sirius-b':['12 thousand','white dwarf'],betelgeuse:['764','red supergiant'],antares:['700','red supergiant'],rigel:['79','Rigel'],aldebaran:['44.2','K5'],arcturus:['25.4','giant'],sirius:['1.713','brightest']};
const cache='tmp/cosmic-research-v2';fs.mkdirSync(cache,{recursive:true});
function clean(s){s=s.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1]??s;return s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'').replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi,'').replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi,'').replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi,'').replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi,'').replace(/<[^>]+>/g,' ').replace(/&nbsp;|&#160;/g,' ').replace(/&amp;/g,'&').replace(/&#8217;|&rsquo;/g,"'").replace(/&[a-z#0-9]+;/gi,' ').replace(/\s+/g,' ');}
const urls=[...new Set(objects.flatMap(o=>o.source.urls))],pages={},results=[];let next=0;
await Promise.all(Array.from({length:4},async()=>{while(next<urls.length){const url=urls[next++],file=`${cache}/${createHash('sha256').update(url).digest('hex')}.txt`;try{if(/\.pdf(?:\?|$)/.test(url)){pages[url]={status:'pdf'};continue;}if(fs.existsSync(file)){pages[url]={status:200,text:fs.readFileSync(file,'utf8')};continue;}const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok){pages[url]={status:response.status};continue;}const text=clean(await response.text());fs.writeFileSync(file,text);pages[url]={status:response.status,text};}catch(e){pages[url]={status:'error',error:e.message};}}}));
for(const obj of objects){const result={id:obj.id,title:obj.title,size:obj.physicalSizeKm,fact:obj.fact,pages:[]};
 for(const url of obj.source.urls){const p=pages[url],snippets=[];for(const needle of needles[obj.id]??[]){const at=p.text?.toLowerCase().indexOf(needle.toLowerCase())??-1;if(at>=0)snippets.push({needle,text:p.text.slice(Math.max(0,at-65),at+220)});}result.pages.push({url,status:p.status,snippets});}
 results.push(result);
}
write('tmp/cosmic-research.json',results);
const failed=Object.entries(pages).filter(([,p])=>![200,'pdf'].includes(p.status)).map(([url,p])=>({url,status:p.status}));
console.log(JSON.stringify({objects:objects.length,uniqueSources:urls.length,failed},null,2));
