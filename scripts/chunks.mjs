import {loadEpisode,validateEpisode} from './lib/project.mjs';
import {visibleIntervals} from '../src/engine/timeline.mjs';
const [command='total',cards='',id='animal-longevity']=process.argv.slice(2);
const ep=loadEpisode(id),t=validateEpisode(ep);
if(command==='total')console.log(t.total);
else if(command==='cards'){
 const result=new Set();
 for(const name of cards.split(',')){
  const index=ep.content.items.findIndex(i=>i.id===name);if(index<0)throw new Error(`Unknown card: ${name}`);
  for(const [lo,hi] of visibleIntervals(index,ep.content.items.length,t))for(let c=Math.floor(lo/600);c<=Math.floor(Math.min(hi,t.total-1)/600);c++)result.add(c);
 }
 console.log([...result].sort().join(' '));
}else throw new Error('Use total or cards');
