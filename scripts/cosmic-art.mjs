import {planetScene} from './planet-art.mjs';
const ink='#3c4154';
const schemes=[['#172b50','#49658d','#a8d7eb'],['#392d50','#836589','#ecc3ac'],['#19484e','#518c88','#bfe2b4'],['#422d4c','#956377','#efbb95'],['#28314d','#637b8b','#d6e2b9']];
function face(emotion,cx=240,cy=330){
 const e=emotion%8,eyes=e===0?'<ellipse cx="-48" cy="-8" rx="17" ry="25"/><ellipse cx="48" cy="-8" rx="17" ry="25"/>':e===1?'<path d="M-67-10q19-31 38 0M29-10q19-31 38 0" fill="none" stroke-width="8"/>':e===2?'<path d="M-67-8q19-26 38 0" fill="none" stroke-width="8"/><ellipse cx="48" cy="-8" rx="17" ry="25"/>':e===3?'<ellipse cx="-48" cy="-7" rx="18" ry="28"/><ellipse cx="48" cy="-7" rx="18" ry="28"/><path d="M-67-45l30-6m55 6l30 6" fill="none" stroke-width="6"/>':e===4?'<path d="M-66-6q18 22 36 0m60 0q18 22 36 0" fill="none" stroke-width="8"/>':e===5?'<path d="M-69-31l39 15m60 0l39-15" fill="none" stroke-width="7"/><circle cx="-48" cy="-3" r="13"/><circle cx="48" cy="-3" r="13"/>':e===6?'<path d="M-68-10l36-12m64 12l36-12" fill="none" stroke-width="7"/><ellipse cx="-48" cy="-4" rx="14" ry="21"/><ellipse cx="48" cy="-12" rx="14" ry="21"/>':'<path d="M-48-30l9 17 19 3-15 13 4 20-17-10-17 10 4-20-15-13 19-3z M48-30l9 17 19 3-15 13 4 20-17-10-17 10 4-20-15-13 19-3z"/>';
 const mouth=e===3?'<ellipse cy="45" rx="19" ry="25" fill="#4d3542"/>':e===5?'<path d="M-28 39q28 16 56-2" fill="none" stroke-width="7"/>':e===1?'<path d="M-33 30q33 58 66 0z" fill="#593d46"/><path d="M-20 50q20-10 40 0" stroke="#db9b9d" fill="none" stroke-width="8"/>':'<path d="M-30 34q30 38 60-2" fill="none" stroke-width="7"/>';
 return `<g transform="translate(${cx} ${cy})" fill="${ink}" stroke="${ink}" stroke-linecap="round" stroke-linejoin="round">${eyes}${mouth}<g fill="#fff7df" stroke="none" opacity=".9">${[0,2,3,5,6].includes(e)?'<circle cx="-53" cy="-16" r="4"/><circle cx="43" cy="-16" r="4"/>':''}</g></g><g fill="#efa8a0" opacity=".45"><ellipse cx="${cx-86}" cy="${cy+24}" rx="20" ry="10"/><ellipse cx="${cx+86}" cy="${cy+24}" rx="20" ry="10"/></g>`;
}
function paperGrain(svg){return `<defs><filter id="pencil-grain" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".7" numOctaves="3" seed="13" result="noise"/><feColorMatrix in="noise" type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope=".65" intercept=".35"/><feFuncG type="linear" slope=".65" intercept=".35"/><feFuncB type="linear" slope=".65" intercept=".35"/></feComponentTransfer><feComposite in2="SourceAlpha" operator="in"/><feBlend in="SourceGraphic" mode="multiply"/></filter></defs><g filter="url(#pencil-grain)">${svg}</g>`;}
function backdrop(seed,family){
 const [dark,mid,light]=schemes[seed%schemes.length];let s=`<defs><radialGradient id="cosmic-sky"><stop stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient></defs><rect width="480" height="640" fill="url(#cosmic-sky)"/>`;
 for(let i=0;i<130;i++){const x=(i*137+seed*47)%480,y=(i*97+seed*29)%640;s+=`<path d="M${x} ${y}l${3+i%5} -2" stroke="${light}" stroke-width=".8" opacity=".08"/>`;if(i<37)s+=`<circle cx="${x}" cy="${y}" r="${i%7===0?2:1}" fill="${light}" opacity="${.3+i%3*.15}"/>`;}
 const q=seed%4;
 if(q===0)s+=`<path d="M30 112L96 70 149 126 204 88" stroke="${light}" fill="none" stroke-width="1.3" opacity=".45"/><g fill="${light}"><circle cx="30" cy="112" r="3"/><circle cx="96" cy="70" r="3"/><circle cx="149" cy="126" r="3"/><circle cx="204" cy="88" r="3"/></g>`;
 if(q===1)s+=`<g transform="translate(397 105) rotate(-25)"><path d="M-20 14Q-18-23 0-36Q20-23 20 14Z" fill="${light}" opacity=".45"/><circle cy="-12" r="8" fill="${dark}"/><path d="M-10 18L0 42 10 18" fill="#edb57b" opacity=".6"/></g>`;
 if(q===2)s+=`<g transform="translate(80 530) rotate(18)" opacity=".45"><path d="M0-30l9 20 23 3-17 15 4 23-19-12-20 12 5-23-18-15 23-3z" fill="${light}"/><path d="M-26-33q-18 5-25 23m76 35q19-5 26-22" fill="none" stroke="${light}" stroke-width="2"/></g>`;
 if(q===3)s+=`<path d="M330 578l65-27m-48 38l54-25" stroke="${light}" stroke-width="2" stroke-linecap="round" opacity=".5"/><path d="M405 545l5 10 11 2-8 7 2 11-10-6-10 6 2-11-8-7 11-2z" fill="#f1d19d" opacity=".75"/>`;
 if(family==='spacecraft')s+=`<path d="M-40 670Q240 405 520 670" fill="#4c8da3" opacity=".25"/><path d="M-40 670Q240 405 520 670" fill="none" stroke="#a7d9d4" stroke-width="8" opacity=".17"/>`;
 return s;
}
function paint(shape,color,detail=''){
 let hatch='';for(let i=0;i<150;i++){const x=48+(i*73)%386,y=140+(i*97)%380;hatch+=`<path d="M${x} ${y}l${8+i%9} -5" stroke="${i%3?'#323d54':'#fff2cd'}" stroke-width="1" opacity=".17" stroke-linecap="round"/>`;}
 return `<defs><clipPath id="drawn-body">${shape}</clipPath></defs><g fill="${color}" stroke="${ink}" stroke-width="2.5" stroke-linejoin="round">${shape}</g><g clip-path="url(#drawn-body)">${detail}${hatch}</g>`;
}
export function cosmicArt(obj,seed=0){
 const e=obj.emotion??seed%8,family=obj.family;let fg='',artWidth=380,portraitWidth=380;
 if(family==='planet'){
  const old=planetScene(obj.id,3);
  fg=old.fg.replace(/<g fill="#(?:143858|453531)" stroke="#(?:143858|453531)" stroke-linecap="round">[\s\S]*?<\/g><g fill="#ffc2a6" opacity=".38">[\s\S]*?<\/g>/,face(e,obj.id==='saturn'?215:240,obj.id==='saturn'?288:326));
  artWidth=obj.id==='saturn'?304:obj.id==='jupiter'?382:obj.id==='mercury'||obj.id==='mars'?370:obj.id==='venus'?374:376;
  if(obj.id==='saturn')portraitWidth=310;
 }else if(family==='galaxy'){
  const tilt=obj.id==='andromeda'?.43:obj.id==='milky-way'?.92:.76;
  fg=`<ellipse cx="240" cy="330" rx="192" ry="${192*tilt}" fill="#788bb2" opacity=".16"/>`;
  for(let j=0;j<5;j++){let d='';for(let k=0;k<65;k++){const a=k*.068+j*Math.PI*2/5,r=12+k*2.7;d+=`${k?'L':'M'}${240+Math.cos(a)*r} ${330+Math.sin(a)*r*tilt}`;}fg+=`<path d="${d}" fill="none" stroke="${['#c1d6db','#dabdd0','#e9cc9f'][j%3]}" stroke-width="${12+j%2*4}" stroke-linecap="round" opacity=".65"/>`;}
  fg+=`<ellipse cx="240" cy="330" rx="${obj.id==='triangulum'?22:42}" ry="${30*tilt}" fill="#f2d6a4"/>`+face(e);artWidth=384;
 }else if(family==='nebula'){
  if(['helix-nebula','ring-nebula'].includes(obj.id)){
   fg='<g fill="none" stroke-linecap="round"><ellipse cx="240" cy="330" rx="176" ry="142" stroke="#dca88e" stroke-width="30"/><ellipse cx="240" cy="330" rx="147" ry="118" stroke="#dcc99d" stroke-width="18"/><ellipse cx="240" cy="330" rx="121" ry="93" stroke="#7fbfc1" stroke-width="20"/></g>'+face(e);artWidth=382;
  }else if(obj.id==='horsehead-nebula'){
   fg=paint('<path d="M98 510L149 363 185 326 156 273 193 254 185 197 219 222 258 194 266 238 330 272 347 307 316 328 268 300 268 383 347 510Z"/>','#9a8ab0', '<path d="M183 329l45 16-52 116m104-200l30 25" fill="none" stroke="#deacb5" stroke-width="17" opacity=".4"/>')+face(e,243,351);artWidth=313;
  }else{
   const shape='<path d="M58 385Q15 292 96 248Q73 161 165 186Q218 115 269 196Q363 130 386 243Q472 263 424 351Q469 434 363 459Q314 537 239 480Q143 535 113 451Q42 470 58 385Z"/>';
   fg=paint(shape,seed%2?'#b37e9c':'#739cb2');for(let j=0;j<14;j++)fg+=`<path d="M${110+j*20} ${228+j%3*16}Q${60+j*25} 320 ${108+j*20} ${435-j%4*17}" stroke="${j%2?'#edba8e':'#b7d9d3'}" stroke-width="${4+j%3}" fill="none" opacity=".35"/>`;fg+=face(e);artWidth=420;
  }
 }else if(family==='black-hole'){
  fg='<g fill="none" stroke-linecap="round"><ellipse cx="240" cy="330" rx="141" ry="52" transform="rotate(-17 240 330)" stroke="#e7b585" stroke-width="14"/><circle cx="240" cy="330" r="124" stroke="#d1a4a3" stroke-width="7"/><circle cx="240" cy="330" r="114" stroke="#fff0bf" stroke-width="4"/></g><circle cx="240" cy="330" r="110" fill="#273045"/>'+face(e).replaceAll(ink,'#f1dfc2');artWidth=220;portraitWidth=330;
 }else if(family==='star'||family==='pulsar'){
  const color=obj.color??'#edc67f';fg=paint('<circle cx="240" cy="330" r="183"/>',color);
  for(let j=0;j<12;j++){let a=j*Math.PI/6;fg+=`<path d="M${240+Math.cos(a)*193} ${330+Math.sin(a)*193}l${Math.cos(a)*17} ${Math.sin(a)*17}" stroke="${color}" opacity=".5" stroke-width="4" stroke-linecap="round"/>`;}
  if(family==='pulsar')fg+='<path d="M232 149L188 86 214 155M248 511l44 63-26-69" fill="#aed5df" opacity=".75"/>';
  fg+=face(e);artWidth=366;
 }else if(family==='spacecraft'){
  const gold='#d6b77c',blue='#7299ae';
  if(obj.id==='iss')fg=`<g stroke="${ink}" stroke-width="3"><path d="M48 230h110v190H48zM322 230h110v190H322z" fill="${blue}"/><path d="M62 230v190m18-190v190m18-190v190m18-190v190m18-190v190m202-190v190m18-190v190m18-190v190m18-190v190m18-190v190" opacity=".4"/><path d="M35 325h410" stroke="#ddd4b3" stroke-width="14"/><rect x="166" y="273" width="148" height="105" rx="28" fill="#d3d7c9"/><rect x="216" y="219" width="49" height="206" rx="18" fill="#ddc998"/></g>`+face(e,240,313);
  else if(obj.id==='jwst')fg=`<path d="M65 450L240 228 421 450 240 503Z" fill="#b3aabd" stroke="${ink}" stroke-width="3"/>`+Array.from({length:7},(_,i)=>{const a=i*Math.PI/3,x=i===6?240:240+Math.cos(a)*62,y=i===6?299:299+Math.sin(a)*53;return `<path d="M${x-30} ${y-18}l30-18 30 18v36l-30 18-30-18z" fill="${gold}" stroke="#665044" stroke-width="2"/>`;}).join('')+face(e,240,300);
  else if(obj.id==='curiosity')fg=`<g stroke="${ink}" stroke-width="4"><path d="M90 350L390 350 365 440H115Z" fill="${gold}"/><path d="M221 350v-87h70" fill="none" stroke-width="15"/><rect x="244" y="234" width="89" height="53" rx="12" fill="#d6d6c4"/>${[130,235,340].map(x=>`<circle cx="${x}" cy="441" r="37" fill="#65717a"/>`).join('')}</g>`+face(e,242,345);
  else if(obj.id==='ingenuity')fg=`<g stroke="${ink}" stroke-width="4"><path d="M147 418L120 471m210-53l30 53M238 311V219"/><path d="M74 222h333m-285 19h242" stroke="#b7b8c2" stroke-width="8"/><rect x="169" y="300" width="143" height="122" rx="17" fill="${gold}"/></g>`+face(e,240,344);
  else if(obj.id==='hubble')fg=`<g stroke="${ink}" stroke-width="3"><path d="M39 289h105v140H39zM337 289h105v140H337z" fill="${blue}"/><path d="M134 252q106-57 207 0v177q-106 55-207 0z" fill="#c0c8cd"/><ellipse cx="237" cy="252" rx="104" ry="38" fill="#7d8b9d"/></g>`+face(e,239,338);
  else if(obj.id==='cassini')fg=`<g stroke="${ink}" stroke-width="3"><rect x="164" y="239" width="152" height="227" rx="17" fill="${gold}"/><path d="M129 226Q240 300 351 226Z" fill="#c8c9bb"/><path d="M240 226V145" stroke-width="7"/><path d="M161 443L122 494m183-51l45 51" fill="none" stroke-width="7"/><circle cx="318" cy="374" r="41" fill="#c9946b"/></g>`+face(e,235,328);
  else if(obj.id==='new-horizons')fg=`<g stroke="${ink}" stroke-width="3"><path d="M109 412L167 246 353 415Z" fill="${gold}"/><path d="M133 245q105 131 210 0z" fill="#dadbc8"/><path d="M238 245v-67m90 201l83 57" fill="none" stroke-width="7"/></g>`+face(e,235,334);
  else fg=`<g stroke="${ink}" stroke-width="3"><path d="M131 301L72 200m58 177l-61 87m222-90l93 84" fill="none" stroke="#c6c2b5" stroke-width="8"/><rect x="161" y="309" width="155" height="134" rx="16" fill="${gold}"/><path d="M112 233q126 155 253 0z" fill="#d7d8c8"/><path d="M237 243v-78" stroke-width="7"/></g>`+face(e,240,330);
  artWidth=['iss','hubble'].includes(obj.id)?410:obj.id==='jwst'?356:obj.id==='ingenuity'?333:obj.id==='curiosity'?300:obj.id==='cassini'?349:320;
 }else{
  const irregular=family==='asteroid'||family==='comet'||obj.id==='hyperion',oval=obj.id==='haumea';
  let shape=irregular?(obj.id==='67p'?'<path d="M65 367Q34 239 152 214Q232 190 252 285Q276 238 350 264Q434 295 415 396Q384 464 298 433Q248 430 226 398Q135 488 65 367Z"/>':'<path d="M61 318L104 213 210 163 320 196 414 280 416 387 340 470 216 500 106 446 51 375Z"/>'):oval?'<ellipse cx="240" cy="330" rx="195" ry="112"/>':'<circle cx="240" cy="330" r="182"/>';
  if(obj.id==='ryugu'||obj.id==='bennu')shape='<path d="M240 148Q294 218 350 244L430 330 350 401Q290 445 240 512Q190 445 130 401L50 330 130 244Q186 218 240 148Z"/>';
  let details='';for(let j=0;j<17;j++){const x=90+(j*71)%300,y=190+(j*59)%290,r=7+(j*5)%18;details+=`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.7}" fill="#343f53" opacity=".13" stroke="#eee0bd" stroke-width="2"/>`;}
  if(obj.id==='europa'||obj.id==='enceladus')details+='<path d="M120 150l79 111-52 79 93 149m93-328l-41 120 63 91-41 113" stroke="#a57f7d" stroke-width="3" fill="none"/>';
  if(obj.id==='io')details+='<path d="M70 280l95 23m124 80l64-18M190 160l22 56" stroke="#a86f50" stroke-width="16" stroke-linecap="round"/>';
  if(obj.id==='iapetus')details+='<rect x="30" y="135" width="210" height="390" fill="#626775" opacity=".75"/>';
  if(obj.id==='pluto')details+='<path d="M287 205Q260 173 245 205Q239 225 293 266Q349 224 339 204Q320 177 287 205Z" fill="#f0e6ca"/>';
  if(obj.id==='mimas')details+='<circle cx="135" cy="250" r="59" fill="#717d8c" stroke="#dce0cb" stroke-width="7"/><ellipse cx="135" cy="267" rx="37" ry="20" fill="#a4adb0"/>';
  if(obj.id==='tethys'||obj.id==='dione')details+='<path d="M150 148l35 72-18 61 46 86-17 57 45 85" stroke="#d7e1d4" stroke-width="10" fill="none"/><path d="M153 150l35 72-18 61 46 86-17 57 45 85" stroke="#8b9fa7" stroke-width="3" fill="none"/>';
  const colorMap={io:'#d6bc7f',titan:'#c9aa7d',europa:'#d9ceb6',enceladus:'#d6ded4',rhea:'#cbd0c9',ganymede:'#a7aaa0',callisto:'#8e969b',triton:'#c4b5b1',pluto:'#ccb7a2',eris:'#c8d0cc',makemake:'#c39c82',haumea:'#d0cbb7',ceres:'#9ba5a5'};
  const axis=obj.axisRatio??1;
  const body=paint(shape,obj.color??colorMap[obj.id]??(['#b7b9b0','#b9a497','#c5cfc5','#a5b5c1','#d7c59e'][seed%5]),details);
  const faceArt=face(e);
  fg=(axis===1?body:`<g transform="translate(240 330) scale(1 ${axis}) translate(-240 -330)">${body}</g>`)+(axis<.55?`<g transform="translate(240 330) scale(.6) translate(-240 -330)">${faceArt}</g>`:faceArt);
  if(obj.id==='enceladus')fg+='<path d="M215 504l-25 62m50-60v74m25-76l27 62" stroke="#b5d9db" stroke-width="5" opacity=".7" stroke-linecap="round"/>';
  artWidth=['ryugu','bennu'].includes(obj.id)?380:irregular?365:oval?390:364;
 }
 return {scene:{bg:backdrop(seed,family),fg:paperGrain(fg)},artWidth,portraitWidth};
}
