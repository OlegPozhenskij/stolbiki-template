import React from 'react';
import {Easing,Img,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {BODY} from '../fonts';
import {Item,MediaAsset} from '../theme';
import {Design} from './registry';
import {counterValue} from '../engine/numbers.mjs';
import {subjectMotion,MOTION_START} from '../engine/motion';

const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.16,1,.3,1);
const img:React.CSSProperties={position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'fill'};

// Presentation only: entrance, counter, subject motion and wash use the shared engine.
export const JournalCard:React.FC<{item:Item;index:number;wash:number;skin:Design;asset?:MediaAsset;special?:boolean}>=({item,index,wash,skin,asset,special})=>{
 const frame=useCurrentFrame(),rev=skin.revision??1;
 const accent=item.accent??skin.accent;
 const shown=counterValue(item.value,interpolate(frame,[12,36],[0,1],{...clamp,easing:Easing.out(Easing.cubic)}));
 const formatted=/^-?\d+$/.test(shown)?Number(shown).toLocaleString('ru-RU'):shown;
 const improved=rev>=2,final=rev>=3;
 const ink='#253344',cream='#fff5df';
 const beats=[{at:0,text:item.fact},...(item.details??[])];
 const active=beats.filter(b=>frame>=b.at);
 const beat=active[active.length-1]??beats[0];
 const factOpacity=beat.at===0?1:interpolate(frame,[beat.at,beat.at+12],[0,1],clamp);
 return <div style={{position:'absolute',width:480,height:1080,overflow:'hidden',background:skin.background,fontFamily:BODY,translate:interpolate(frame,[0,24],['0px 1080px','0px 0px'],{...clamp,easing:ease})}}>
  <div style={{position:'absolute',left:0,top:190,width:480,height:640,overflow:'hidden'}}>
   {asset?.background&&<Img src={staticFile(asset.background)} style={img}/>}
   {asset&&<Img src={staticFile(asset.foreground??asset.composite)} style={{...img,...subjectMotion(item.move??'float',frame-MOTION_START,asset.bounds)}}/>}
  </div>
  <div style={{position:'absolute',left:18,top:16,width:444,height:174,borderRadius:final?'12px 28px 12px 12px':16,background:cream,color:ink,boxSizing:'border-box',padding:'15px 22px',borderBottom:`6px solid ${accent}`,boxShadow:'0 8px 0 #0002',overflow:'hidden'}}>
   <svg width="160" height="160" viewBox="0 0 160 160" style={{position:'absolute',right:-28,top:20,opacity:.13,color:accent}}><circle cx="80" cy="80" r="48" fill="none" stroke="currentColor" strokeWidth="2"/><ellipse cx="80" cy="80" rx="75" ry="22" transform="rotate(-35 80 80)" fill="none" stroke="currentColor" strokeWidth="3"/><circle cx="130" cy="40" r="8" fill="currentColor"/></svg>
   <div style={{fontWeight:900,fontSize:improved?18:20,letterSpacing:improved?2:1,opacity:.75}}>{item.metricLabel??'СРАВНИВАЕМ'}</div>
   <div style={{fontSize:Math.min(final?70:64,Math.floor(330/(.62*formatted.length))),fontWeight:900,lineHeight:1.05,letterSpacing:-2,marginTop:improved?8:5,fontVariantNumeric:'tabular-nums',position:'relative'}}>{item.prefix&&<span style={{fontSize:22,letterSpacing:0,marginRight:6}}>{item.prefix}</span>}{formatted}<span style={{fontSize:item.unit.length>6?18:28,letterSpacing:0,marginLeft:8,fontWeight:800}}>{item.unit}</span></div>
   <div style={{display:'flex',alignItems:'center',gap:10,marginTop:7,fontSize:15,fontWeight:900,color:accent}}><span>{String(index+1).padStart(2,'0')}</span><div style={{width:final?180:120,height:3,borderRadius:3,background:`linear-gradient(90deg,${accent},${accent}22)`}}/></div>
  </div>
  <div style={{position:'absolute',top:improved?810:830,bottom:0,left:0,width:480,background:cream,color:ink,boxSizing:'border-box',padding:improved?'18px 28px 16px':'14px 24px',borderTop:`5px solid ${accent}`}}>
   <div style={{fontWeight:900,color:accent,fontSize:final?18:17,letterSpacing:2,textTransform:'uppercase',marginBottom:final?10:6}}>{item.tag??'Характер героя'}</div>
   <div style={{fontWeight:900,fontSize:improved?62:58,lineHeight:1,letterSpacing:-1,marginBottom:improved?12:8}}>{item.title}</div>
   <div style={{fontWeight:800,fontSize:final?34:improved?36:33,lineHeight:1.15,textWrap:'balance',maxWidth:424,opacity:factOpacity}}>{beat.text}</div>
  </div>
  <div style={{position:'absolute',inset:0,background:skin.background,opacity:wash*(final?.15:.25),pointerEvents:'none'}}/>
  <div style={{position:'absolute',right:0,top:0,bottom:0,width:3,background:'#fff5df66'}}/>
  {special&&item.finaleLabel&&<div style={{position:'absolute',left:28,top:final?748:770,color:'#fff5df',fontSize:17,fontWeight:900,letterSpacing:2,opacity:interpolate(frame,[30,48],[0,1],clamp)}}>★ {item.finaleLabel}</div>}
 </div>;
};
