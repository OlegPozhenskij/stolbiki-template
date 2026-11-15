import React from 'react';
export function hashSeed(text:string){return [...text].reduce((s,c)=>Math.imul(s^c.charCodeAt(0),16777619)>>>0,2166136261);}
export function starPositions(seed:number,width:number,height:number,count=130){
 let state=seed>>>0;const random=()=>{state=(state+0x6D2B79F5)>>>0;let t=state;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
 return Array.from({length:count},()=>({x:random()*width,y:random()*height,r:.6+random()**3*2.5,opacity:.2+random()*.7,hue:random()}));
}
export const SpaceBackdrop:React.FC<{seed:string;width:number;height:number;frame?:number}>=({seed,width,height,frame=0})=>{
 const stars=starPositions(hashSeed(seed),width,height),uid=`space-${seed}`;
 return <svg width={width} height={height} style={{position:'absolute',inset:0}}>
  <defs><radialGradient id={uid}><stop stopColor="#394b8d" stopOpacity=".7"/><stop offset="1" stopColor="#090e29" stopOpacity="0"/></radialGradient></defs>
  <rect width={width} height={height} fill="#080d23"/>
  <ellipse cx={width*.78} cy={height*.35} rx={width*.9} ry={height*.5} fill={`url(#${uid})`}/>
  <ellipse cx={width*.12} cy={height*.77} rx={width*.7} ry={height*.38} fill="#703082" opacity=".1"/>
  {stars.map((s,i)=><circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.hue>.8?'#ffe5b9':s.hue>.5?'#c4d5ff':'#fff'} opacity={s.opacity*(.85+.15*Math.sin(frame/23+i*3.7))}/>)}
 </svg>;
};
