import React from 'react';
import {Img,Easing,interpolate,staticFile,useCurrentFrame} from 'remotion';
import {BODY} from '../fonts';
import {Item,MediaAsset} from '../theme';
import {Design} from './registry';
import {Comparison} from '../engine/scale.mjs';
import {SpaceBackdrop} from './SpaceBackdrop';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const ease=Easing.bezier(.16,1,.3,1);

const Probe:React.FC<{x:number;y:number;type?:string;accent:string}>=({x,y,type,accent})=><g transform={`translate(${x} ${y}) rotate(-18)`} stroke="#e3efff" strokeWidth="2.5" fill="#c6d8ed"><path d="M-10-10h20v20h-20z"/><path d="M-62-13h43v26h-43zM19-13h43v26H19z" fill={accent} opacity=".9"/><path d="M-7-12l18-14 8 7M0 12v21M-8 33H8" fill="none"/>{type==='lunar'&&<path d="M-15 7L-25 26M15 7L25 26"/>}</g>;
const Context:React.FC<{item:Item;f:number}>=({item,f})=>{
 const drift=Math.sin(f/28)*7,a=item.accent??'#9bdfff',kind=item.contextKind;
 return <svg width="640" height="900" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  {kind==='iss'&&<g transform={`translate(70 ${740+drift})`}><circle r="77" fill="#176aa1" stroke="#83ddff" strokeWidth="3"/><path d="M-45-42l35 2 12 22 35 10-18 20-28-3-15 27-25-18z" fill="#78b4a3"/><path d="M-61-22q72-40 121 12M-49 39q50-17 95-3" fill="none" stroke="#f1f6ff" strokeWidth="10" opacity=".65"/></g>}
  {kind==='bennu'&&<Probe x={533} y={320+drift} accent={a}/>}
  {kind==='67p'&&<><Probe x={526} y={325+drift} accent={a}/><path d="M460 354l-38 45" stroke={a} strokeWidth="2" strokeDasharray="4 8" opacity=".6"/></>}
  {kind==='moon'&&<Probe x={105} y={776+drift} accent="#f2cd85" type="lunar"/>}
  {kind==='saturn'&&<><circle cx="105" cy={760+drift} r="37" fill="#cda570" stroke="#ffddb0" strokeWidth="3"/><circle cx="546" cy={367-drift} r="20" fill="#b7cbd3" stroke="#eefaff" strokeWidth="3"/><path d="M77 780Q320 891 567 412" fill="none" stroke={a} strokeWidth="1.5" strokeDasharray="4 14" opacity=".3"/></>}
  {kind==='sun'&&<Probe x={95} y={790+drift} accent="#d9b669"/>}
 </svg>;
};

export const StickerCard:React.FC<{item:Item;index:number;wash:number;skin:Design;asset?:MediaAsset;comparison?:Comparison}>=({item,index,wash,skin,asset,comparison})=>{
 const f=useCurrentFrame(),accent=item.accent??'#9bdfff',portrait=item.portraitWidth??550,updated=(skin.revision??1)>=2;
 const settled=interpolate(f,[34,60],[0,1],{...clamp,easing:ease});
 const bodyWidth=portrait+((comparison?.referencePixels??portrait)*(comparison?.ratio??1)-portrait)*settled;
 const number=typeof item.value==='number'?item.value.toLocaleString('ru-RU'):item.value;
 const valueSize=String(number).length>5?43:57;
 return <div style={{position:'absolute',width:640,height:1080,overflow:'hidden',fontFamily:BODY,color:'#fff8ef',background:skin.background,translate:interpolate(f,[0,22],['0px 1080px','0px 0px'],{...clamp,easing:ease})}}>
  <SpaceBackdrop seed={item.id} width={640} height={1080} frame={f} varied={updated}/>
  {updated?<>{asset?.contexts?.map((c,j)=><div key={j} style={{position:'absolute',left:c.x-c.size/2,top:c.y-c.size/2,width:c.size,height:c.size,opacity:interpolate(f,[10,32],[0,1],clamp),transform:`translate(${Math.sin(f/31+j)*7}px,${Math.sin(f/23+j*2)*9}px) rotate(${(c.rotate??0)+Math.sin(f/37+j)*4}deg)`,filter:'drop-shadow(0 4px 3px #0008)'}}><Img src={staticFile(c.image)} style={{width:'100%',height:'100%',objectFit:'contain'}}/></div>)}</>:<Context item={item} f={f}/>}
  <div style={{position:'absolute',left:0,top:242,width:640,height:640,transformOrigin:'320px 320px',transform:`translate(${updated?Math.sin(f/29+index)*4:0}px,${Math.sin(f/17)*(updated?6:2)}px) rotate(${updated?Math.sin(f/29+index*.8)*1.6+Math.sin(f/8)*4*Math.exp(-f/25):f<45?Math.sin(f/10)*(1-f/45)*2:0}deg) scale(${bodyWidth/(item.artWidth??570)})`,opacity:comparison?.visible===false?0:1,filter:`drop-shadow(0 7px 0 #111527) drop-shadow(0 0 ${updated?13+Math.sin(f/20)*3:15}px ${accent}55)`}}>
   {asset&&<Img src={staticFile(asset.composite)} style={{width:640,height:640,objectFit:'contain'}}/>}
  </div>
  <div style={{position:'absolute',top:17,left:213,width:214,height:246,filter:'drop-shadow(0 7px 0 #0007)'}}>
   <svg width="214" height="246"><path d="M107 3L211 63V183L107 243 3 183V63Z" fill="#111c3d" stroke={accent} strokeWidth="4"/><path d="M107 13L202 68V178L107 233 12 178V68Z" fill="none" stroke="#fff8e9" strokeOpacity=".2"/></svg>
   <div style={{position:'absolute',inset:'43px 8px 35px',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',textAlign:'center'}}>
    <div style={{fontSize:17,fontWeight:900,letterSpacing:2,color:accent,lineHeight:1}}>{item.metricLabel??'РАЗМЕР'}</div>
    <div style={{fontSize:valueSize,fontWeight:900,lineHeight:1.1,margin:'8px 0 1px',whiteSpace:'nowrap'}}><span style={{fontSize:25,verticalAlign:'middle'}}>{item.prefix}</span>{number}</div>
    <div style={{fontSize:item.unit.length>6?27:42,fontWeight:900,lineHeight:1.05}}>{item.unit}</div>
   </div>
  </div>
  {!updated&&<><div style={{position:'absolute',top:843,width:640,textAlign:'center',fontSize:16,fontWeight:800,color:'#d2def1',letterSpacing:.7}}>{f<60?'КРУПНЫЙ ПЛАН':'ОБЩИЙ МАСШТАБ'} · окружение условно</div>
  <div style={{position:'absolute',top:870,width:640,textAlign:'center',fontSize:15,color:'#b6c9e1'}}>{item.photoCredit}</div></>}
  <div style={{position:'absolute',left:9,right:9,top:updated?883:907,bottom:9,borderRadius:'25px 25px 15px 15px',border:'1.5px solid #aec4fa55',background:'linear-gradient(115deg,#182c53ee,#222047f5 60%,#342344f5)',boxShadow:'inset 0 2px 0 #ffffff12,0 -14px 35px #0a102344',textAlign:'center',padding:updated?'17px 26px':'10px 26px',boxSizing:'border-box'}}>
   <svg width="620" height="164" style={{position:'absolute',inset:0,pointerEvents:'none'}}><path d="M20 34L27 27 34 34 27 41Z M587 117l7-7 7 7-7 7Z" fill={accent}/><path d="M49 13Q310-3 570 13" fill="none" stroke={accent} strokeWidth="2" opacity=".65"/><circle cx="55" cy="132" r="1.5" fill="#fff"/><circle cx="580" cy="42" r="2" fill="#fff"/></svg>
   <div style={{position:'relative',height:59,display:'flex',alignItems:'center',justifyContent:'center',fontSize:item.title.length>14?42:54,fontWeight:900,lineHeight:1,color:'#fff8e8'}}>{item.title}</div>
   <div style={{position:'relative',height:77,display:'flex',alignItems:'center',justifyContent:'center',fontSize:34,fontWeight:800,lineHeight:1.12,textWrap:'balance',color:'#dfeaff'}}>{item.fact}</div>
  </div>
  <div style={{position:'absolute',inset:0,background:'#080d23',opacity:wash*.08,pointerEvents:'none'}}/>
  <div style={{position:'absolute',right:0,top:0,bottom:0,width:2,background:'#91c9ff44'}}/>
 </div>;
};
