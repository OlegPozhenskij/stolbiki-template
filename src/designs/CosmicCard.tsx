import React from 'react';
import {Img,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {BODY} from '../fonts';
import {Item,MediaAsset} from '../theme';
import {Design} from './registry';
import {Comparison} from '../engine/scale.mjs';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.16,1,.3,1);

export const CosmicCard:React.FC<{item:Item;index:number;wash:number;skin:Design;asset?:MediaAsset;comparison?:Comparison}>=({item,index,wash,skin,asset,comparison})=>{
 const f=useCurrentFrame(),accent=item.accent??skin.accent;
 const settle=interpolate(f,[24,52],[0,1],{...clamp,easing:ease});
 const ratio=comparison?.ratio??1,portrait=item.portraitWidth??380;
 const bodyWidth=portrait+((comparison?.referencePixels??380)*ratio-portrait)*settle;
 const visible=comparison?.visible??true;
 const titleSize=item.title.length>15?42:item.title.length>10?49:62;
 const bob= f<60?Math.sin(f/6)*5*(1-f/60):Math.sin(f/24)*1.5;
 return <div style={{position:'absolute',width:480,height:1080,overflow:'hidden',background:skin.background,fontFamily:BODY,translate:interpolate(f,[0,24],['0px 1080px','0px 0px'],{...clamp,easing:ease})}}>
  {asset?.background&&<Img src={staticFile(asset.background)} style={{position:'absolute',left:0,top:0,width:480,height:810,objectFit:'cover'}}/>}
  <div style={{position:'absolute',left:0,top:150,width:480,height:640,transformOrigin:'240px 330px',transform:`translateY(${bob}px) rotate(${f<55?Math.sin(f/8)*2*(1-f/55):0}deg) scale(${bodyWidth/(item.artWidth??376)})`,opacity:visible?1:0}}>
   {asset&&<Img src={staticFile(asset.foreground??asset.composite)} style={{width:480,height:640,objectFit:'contain'}}/>}
  </div>
  {!visible&&<div style={{position:'absolute',top:450,width:480,textAlign:'center',fontSize:23,fontWeight:900,color:'#fff5df88'}}>Предыдущий масштаб</div>}
  <svg width="480" height="810" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
   {Array.from({length:7},(_,j)=>{const a=(index*.9+j)*2.399,p=Math.max(0,Math.min(1,(f-12)/34)),r=30+150*p;return <path key={j} d="M-7 0H7 M0-7V7" stroke={j%2?'#f8d694':'#b8e0ef'} strokeWidth="2.5" strokeLinecap="round" opacity={(1-p)*.8} transform={`translate(${240+Math.cos(a)*r} ${480+Math.sin(a)*r}) rotate(${p*60})`}/>;})}
   <g transform={`translate(${interpolate(f,[0,60],[-80,560],clamp)} ${730+(index%3)*14}) rotate(-12)`} opacity={f<60?.6:0}><path d="M-45 8L0 0" stroke="#ffdba6" strokeWidth="3" strokeLinecap="round"/><ellipse rx="13" ry="6" fill="#e5d6a7"/><path d="M-3-5l6-10 5 11" fill="#d38d72"/></g>
  </svg>
  <div style={{position:'absolute',top:742,width:480,textAlign:'center',fontSize:18,fontWeight:900,letterSpacing:1,color:'#fff5dfbb'}}>{visible?(f<52?'КРУПНЫЙ ПЛАН':comparison?.reset?'НОВЫЙ МАСШТАБ':'В ОДНОМ МАСШТАБЕ'):''}</div>
  <div style={{position:'absolute',top:8,left:74,width:332,height:228,filter:'drop-shadow(0 6px 0 #0003)',color:'#26334a',textAlign:'center'}}>
   <svg width="332" height="228" style={{position:'absolute',inset:0}}><path d="M82 5H250L327 114 250 223H82L5 114Z" fill="#fff3d6" stroke="#394050" strokeWidth="4"/><path d="M89 15H243L314 114 243 213H89L18 114Z" fill="none" stroke={accent} strokeWidth="2.5" strokeDasharray="5 3"/></svg>
   <div style={{position:'relative',paddingTop:28,fontSize:21,fontWeight:900,letterSpacing:2}}>{item.metricLabel??'РАЗМЕР'}</div>
   <div style={{position:'relative',fontSize:Math.min(72,Math.floor(260/(.6*String(item.value).length))),fontWeight:900,lineHeight:1.05,marginTop:5,letterSpacing:-1}}>{item.prefix}{typeof item.value==='number'?item.value.toLocaleString('ru-RU'):item.value}</div>
   <div style={{position:'relative',fontSize:item.unit.length>9?23:30,fontWeight:900,marginTop:2,lineHeight:1}}>{item.unit}</div>
  </div>
  <div style={{position:'absolute',top:810,bottom:0,width:480,boxSizing:'border-box',background:'#fff5df',borderTop:`5px solid ${accent}`,padding:'10px 24px 14px',color:'#253344',textAlign:'center'}}>
   <div style={{height:88,display:'flex',alignItems:'center',justifyContent:'center',fontSize:titleSize,fontWeight:900,lineHeight:1.02,textWrap:'balance'}}>{item.title}</div>
   <div style={{height:140,display:'flex',alignItems:'center',justifyContent:'center',fontSize:42,fontWeight:900,lineHeight:1.08,textWrap:'balance'}}>{item.fact}</div>
  </div>
  <div style={{position:'absolute',inset:0,background:skin.background,opacity:wash*.1,pointerEvents:'none'}}/>
  <div style={{position:'absolute',right:0,top:0,bottom:0,width:3,background:'#fff5df66'}}/>
 </div>;
};
