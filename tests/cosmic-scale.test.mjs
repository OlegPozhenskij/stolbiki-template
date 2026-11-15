import test from 'node:test';
import assert from 'node:assert/strict';
import {buildTimeline} from '../src/engine/timeline.mjs';
import {comparisonState} from '../src/engine/scale.mjs';
test('75 uninterrupted four-second cards give exactly five minutes',()=>{
 const t=buildTimeline(75,{fps:30,intro:0,step:120,holdLast:0,outro:0});assert.equal(t.total,9000);assert.equal(t.cardStarts[74],8880);assert.equal(t.ctaAt,8955);
 assert.throws(()=>buildTimeline(75,{fps:30,intro:20,step:120,holdLast:0,outro:0}));
});
test('one common linear scale preserves physical ratios without minimum-size clamps',()=>{
 const items=[{physicalSizeKm:12756,scaleGroup:0},{physicalSizeKm:120536,scaleGroup:0},{physicalSizeKm:142984,scaleGroup:0}];
 const t=buildTimeline(3,{fps:30,intro:0,step:120,holdLast:0,outro:0}),s=comparisonState(300,items,t);
 assert.equal(s[0].ratio/s[2].ratio,12756/142984);assert.ok(s[0].ratio<.1);assert.ok(s.every(x=>x.visible));
 assert.ok(s[0].ratio<comparisonState(180,items,t)[0].ratio);
 const reset=comparisonState(300,[...items.slice(0,2),{physicalSizeKm:.001,scaleGroup:1}],t);
 assert.equal(reset[0].visible,false);assert.equal(reset[2].ratio,1);assert.equal(reset[2].reset,true);
});
