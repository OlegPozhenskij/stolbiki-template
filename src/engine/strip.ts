import {Easing,interpolate} from 'remotion';
import {Timeline} from './timeline.mjs';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const smooth=Easing.bezier(.65,0,.35,1);
export function cameraOffset(frame:number,count:number,t:Timeline,layout={visible:4,width:480}){
 let x=0;
 for(let i=layout.visible;i<count;i++)x+=interpolate(frame,[t.cardStarts[i]-8,t.cardStarts[i]+18],[0,layout.width],{...clamp,easing:smooth});
 return x;
}
export function cardWash(frame:number,index:number,count:number,t:Timeline){
 return (index<count-1?interpolate(frame,[t.cardStarts[index+1],t.cardStarts[index+1]+16],[0,1],clamp):0)*
 (count>4?1:1-interpolate(frame,[t.outroStart,t.outroStart+30],[0,1],clamp));
}
