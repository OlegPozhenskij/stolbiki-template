import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {buildTimeline} from '../src/engine/timeline.mjs';
import {counterValue} from '../src/engine/numbers.mjs';
import {ROOT,read,loadEpisode,validateEpisode as validate,chunkKeys,episodePath,calendarDate} from '../scripts/lib/project.mjs';
const validateEpisode=(ep,options={})=>validate(ep,{now:new Date('2026-11-15T12:00:00Z'),...options});

test('source dates follow the episode calendar at the UTC midnight boundary',()=>{
 assert.equal(calendarDate(new Date('2026-11-14T21:30:00Z')),'2026-11-15');
 assert.equal(calendarDate(new Date('2026-11-14T21:30:00Z'),'UTC'),'2026-11-14');
 const ep=structuredClone(loadEpisode('animal-longevity'));ep.sources.cat.checkedAt='2026-11-16';assert.throws(()=>validateEpisode(ep));
});

test('finished episode remains exactly one minute; empty or unreadable timelines fail',()=>{
 const ep=loadEpisode('animal-longevity'),t=validateEpisode(ep);
 assert.equal(t.total,1800);assert.equal(t.cardStarts.length,10);assert.equal(t.ctaAt,1680);
 assert.throws(()=>buildTimeline(0,ep.brief.timing));
 assert.throws(()=>buildTimeline(4,{...ep.brief.timing,step:10}));
 assert.throws(()=>buildTimeline(4,{...ep.brief.timing,fps:60}));
 assert.throws(()=>episodePath(undefined));assert.throws(()=>episodePath('../outside'));
});
test('sources and missing artwork cannot be bypassed by a normal episode',()=>{
 for(const mutate of [e=>e.sources.cat.status='pending',e=>e.assets.cat.scene='missing',e=>e.sources.tortoise.validUntil='2000-01-01',e=>e.content.items[0].id=e.content.items[1].id,e=>e.content.items[0].fact='x'.repeat(46),e=>e.brief.seconds=61]){
  const ep=structuredClone(loadEpisode('animal-longevity'));mutate(ep);assert.throws(()=>validateEpisode(ep));
 }
});
test('counter supports zero, negative values, decimals and infinity without falsifying final value',()=>{
 for(const n of [0,-2,-0.5,1.25,12345])assert.equal(counterValue(n,1),String(n));
 assert.equal(counterValue('∞',.25),'∞');assert.equal(counterValue(0,.5),'0');assert.equal(counterValue(-2,.5),'-1');
});
test('editing the second card invalidates intro and visible chunks but preserves the final chunk',()=>{
 const before=loadEpisode('animal-longevity'),t=validateEpisode(before),after=structuredClone(before);
 after.content.items[1].fact='Новая проверенная формулировка';
 const a=chunkKeys(before,t,{},'same-code'),b=chunkKeys(after,t,{},'same-code');
 assert.notEqual(a[0],b[0]);assert.notEqual(a[1],b[1]);assert.equal(a[2],b[2]);
});
test('title, final question, code, artwork and timing invalidate their actual dependencies',()=>{
 const ep=loadEpisode('animal-longevity'),t=validateEpisode(ep),a=chunkKeys(ep,t,{},'code');
 let next=structuredClone(ep);next.content.title='Другая заставка';let b=chunkKeys(next,t,{},'code');
 assert.notEqual(a[0],b[0]);assert.equal(a[1],b[1]);assert.equal(a[2],b[2]);
 next=structuredClone(ep);next.content.cta='Другой финал';b=chunkKeys(next,t,{},'code');
 assert.equal(a[0],b[0]);assert.equal(a[1],b[1]);assert.notEqual(a[2],b[2]);
 assert.ok(chunkKeys(ep,t,{},'new-code').every((x,i)=>x!==a[i]));
 b=chunkKeys(ep,t,{jellyfish:{key:'new-image'}},'code');assert.notEqual(a[0],b[0]);assert.equal(a[1],b[1]);assert.notEqual(a[2],b[2]);
 b=chunkKeys(ep,{...t,step:151}, {},'code');assert.ok(b.every((x,i)=>x!==a[i]));
 assert.deepEqual(a,chunkKeys(ep,t,{},'code'));
});
test('every authored scene exports usable independent foreground and background',async()=>{
 const catalog=read('assets/catalog.json');assert.ok(Object.keys(catalog).length>=49);
 for(const [name,entry] of Object.entries(catalog)){
  const scene=(await import(pathToFileURL(path.join(ROOT,entry.module)).href)).default;
  assert.ok(scene.bg?.includes('<'),name+' bg');assert.ok(scene.fg?.includes('<'),name+' fg');
 }
});
test('the same four non-animal cards validate in two independent design/world/media configurations',()=>{
 const a=loadEpisode('design-lab-pencil'),b=loadEpisode('design-lab-atlas');
 assert.deepEqual(a.content,b.content);assert.equal(validateEpisode(a).total,validateEpisode(b).total);
 const mixed=structuredClone(b);mixed.brief.design='pencil-album';validateEpisode(mixed);
 mixed.brief.world='underwater';validateEpisode(mixed);
});
test('external media files are checked instead of trusting arbitrary paths',()=>{
 const ep=structuredClone(loadEpisode('design-lab-atlas'));ep.assets.sun={composite:'../outside.jpg'};assert.throws(()=>validateEpisode(ep));
});
