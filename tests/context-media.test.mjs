import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {ROOT,loadEpisode,validateEpisode} from '../scripts/lib/project.mjs';
import {prepareAssets} from '../scripts/lib/assets.mjs';

test('changing a context sticker invalidates its card media cache and missing context fails validation',async()=>{
 const root=path.join(ROOT,'public');fs.mkdirSync(root,{recursive:true});
 const folder=fs.mkdtempSync(path.join(root,'context-fixture-'));
 const main=path.join(folder,'main.png'),context=path.join(folder,'context.png');
 try{
  fs.writeFileSync(main,'main-image-bytes');fs.writeFileSync(context,'first-context-image');
  const relative=file=>path.relative(root,file).replaceAll('\\','/');
  const asset={composite:relative(main),contexts:[{image:relative(context),x:90,y:720,size:120}]};
  const ep={brief:{world:'native',media:'photo'},content:{items:[{id:'sun'}]},assets:{sun:asset}};
  const first=await prepareAssets(ep);fs.writeFileSync(context,'replacement-context-image');const second=await prepareAssets(ep);
  assert.notEqual(first.sun.key,second.sun.key);
  const actual=structuredClone(loadEpisode('design-lab-atlas'));actual.assets.sun=structuredClone(asset);validateEpisode(actual);
  actual.assets.sun.contexts[0].image='missing-context.png';assert.throws(()=>validateEpisode(actual),/стикер окружения/);
  actual.assets.sun=structuredClone(asset);actual.assets.sun.contexts[0].size=-1;assert.throws(()=>validateEpisode(actual),/размещение/);
 }finally{for(const file of [main,context])if(fs.existsSync(file))fs.unlinkSync(file);fs.rmdirSync(folder);}
});
