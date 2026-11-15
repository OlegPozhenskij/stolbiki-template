import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {buildTimeline} from '../src/engine/timeline.mjs';
import {loadEpisode,validateEpisode} from '../scripts/lib/project.mjs';
import {PYTHON} from '../scripts/lib/runtime.mjs';

test('three-minute timing gives eight readable cards and an exact 5400-frame export',()=>{
 const t=buildTimeline(8,{fps:30,intro:180,step:630,holdLast:0,outro:180});
 assert.equal(t.total,5400);assert.equal(t.cardStarts.length,8);
 assert.equal(t.outroStart,5220);
 assert.ok(t.cardStarts.every((f,i)=>i===0||f-t.cardStarts[i-1]===630));
});
test('long card intervals keep the soundtrack musical and aligned to card starts',()=>{
 const bars=JSON.parse(execFileSync(PYTHON,['-c','import sys,json;sys.path.insert(0,"scripts");from music_timing import bar_seconds;print(json.dumps([bar_seconds(s,30) for s in [60,150,630,900]]))'],{encoding:'utf8'}));
 for(const [i,seconds] of [2,5,21,30].entries()){
  assert.ok(240/bars[i]>=75&&240/bars[i]<=125);
  assert.ok(Math.abs(seconds/bars[i]-Math.round(seconds/bars[i]))<1e-9);
 }
 assert.equal(bars[1],2.5);
});
test('timed captions cannot exceed the card interval or bypass text limits',()=>{
 const ep=structuredClone(loadEpisode('design-lab-atlas'));
 ep.content.items[0].details=[{at:30,text:'Короткий новый факт'}];validateEpisode(ep);
 for(const details of [[{at:ep.brief.timing.step,text:'Слишком поздно'}],[{at:10,text:'x'.repeat(46)}],[{at:30,text:'Первый'},{at:20,text:'Обратно'}]]){
  ep.content.items[0].details=details;assert.throws(()=>validateEpisode(ep));
 }
});
