import defaults from './pace.json';
import {buildTimeline, Pace} from './engine/timeline.mjs';
export const FPS=30, WIDTH=1920, HEIGHT=1080, COL_W=480, VISIBLE=4;
export const timing=(count:number,short=false,custom?:Pace)=>{
  const timeline=buildTimeline(count,custom ?? {fps:defaults.fps,step:defaults.step,...(short?defaults.short:defaults.normal)});
  return {...timeline,cardStart:(index:number)=>timeline.intro+index*timeline.step};
};
