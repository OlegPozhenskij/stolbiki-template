import React from 'react';
import {AbsoluteFill,Img,staticFile} from 'remotion';
import {ThumbProps} from '../theme';
import {BODY} from '../fonts';
import {SpaceBackdrop} from './SpaceBackdrop';
export const StickerCover:React.FC<ThumbProps>=({assets,badge})=><AbsoluteFill style={{background:'#070c24',fontFamily:BODY,overflow:'hidden'}}>
 <SpaceBackdrop seed="cover-cosmic-stickers" width={1280} height={720}/>
 <div style={{position:'absolute',left:830,top:-100,width:570,height:800,background:'radial-gradient(ellipse,#ffb05b66,transparent 67%)'}}/>
 <div style={{position:'absolute',left:858,top:35,width:390,height:570,borderRadius:32,background:'linear-gradient(150deg,#493471,#171e43)',border:'3px solid #ada3e6',rotate:'13deg',boxShadow:'0 22px 60px #0008'}}>
  {assets?.sun&&<Img src={staticFile(assets.sun.composite)} style={{position:'absolute',width:510,height:510,left:-62,top:25}}/>}
  <div style={{position:'absolute',bottom:24,width:'100%',textAlign:'center',color:'#fff3c9',fontSize:36,fontWeight:900}}>СОЛНЦЕ</div>
 </div>
 <div style={{position:'absolute',left:655,top:142,width:415,height:555,borderRadius:32,background:'linear-gradient(150deg,#1b3961,#13142d)',border:'3px solid #78c8e8',rotate:'-10deg',boxShadow:'0 22px 60px #000b'}}>
  {assets?.saturn&&<Img src={staticFile(assets.saturn.composite)} style={{position:'absolute',width:570,height:570,left:-80,top:-25}}/>}
  <div style={{position:'absolute',bottom:25,width:'100%',textAlign:'center',color:'#fff3c9',fontSize:43,fontWeight:900}}>САТУРН</div>
 </div>
 <div style={{position:'absolute',left:47,top:40,padding:'12px 24px',background:'#caff6b',color:'#0a1729',fontSize:28,fontWeight:900,borderRadius:14,rotate:'-3deg'}}>{Number(badge.shown)>6?'НАСТОЯЩИЙ КОСМОС':'РЕАЛЬНЫЕ СНИМКИ'}</div>
 <div style={{position:'absolute',left:40,top:165,width:620,color:'#fff7e7',fontSize:120,fontWeight:900,lineHeight:.96,letterSpacing:-5,textShadow:'0 7px 0 #111529',WebkitTextStroke:'2px #0d142d'}}>ЭТО ВСЁ<br/><span style={{color:'#92e8ff'}}>КОСМОС?!</span></div>
 <svg width="1280" height="720" style={{position:'absolute',inset:0}}><path d="M438 510Q550 592 697 495l-20 44M697 495l-48-2" fill="none" stroke="#ffdc80" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round"/></svg>
 <div style={{position:'absolute',left:53,top:571,color:'#ffe497',fontSize:29,fontWeight:900}}>ОТ МАЛЕНЬКОГО — К ОГРОМНОМУ</div>
 <div style={{position:'absolute',left:55,bottom:45,color:'#adc2df',fontSize:19,fontWeight:800}}>{Number(badge.shown)>6?`${badge.shown} космических объектов · 5 минут`:'Снимки NASA · проба из 6 карточек'}</div>
</AbsoluteFill>;
