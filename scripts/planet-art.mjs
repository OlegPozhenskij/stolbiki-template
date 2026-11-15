// Original layered illustrations. Generated scene modules contain their full SVG,
// so the existing content cache sees every change without hidden dependencies.
const palettes={earth:['#102c45','#327c7a','#72ddc0'],saturn:['#342a51','#80607a','#f5c997'],jupiter:['#382c3b','#966553','#f0bd80'],mercury:['#202b43','#696e87','#d8c4ae'],mars:['#3d2635','#9b544c','#f2b27b'],venus:['#34274b','#9f665b','#ffe1a0'],uranus:['#123c4e','#317f81','#a5f2dd'],neptune:['#1a3052','#4e6d9e','#c5e8ed']};
function background(id,rev){
 const [dark,mid,light]=palettes[id],seed=Object.keys(palettes).indexOf(id)+2;
 let stars='';for(let i=0;i<38;i++){const x=(i*137+seed*31)%460+10,y=(i*83+seed*53)%600+20;stars+=`<circle cx="${x}" cy="${y}" r="${i%5===0?2:1}" fill="${light}" opacity="${.2+(i%4)*.12}"/>`;}
 const nebula=rev>=2?`<path d="M-100 540 Q320 550 560 50" stroke="${light}" stroke-width="90" opacity=".07" fill="none" filter="url(#blur)"/><path d="M-90 480 Q230 470 490 80" stroke="${light}" stroke-width="20" opacity=".09" fill="none" filter="url(#blur)"/>`:'';
 const orbit=rev>=3?`<ellipse cx="240" cy="320" rx="215" ry="240" transform="rotate(${seed*13} 240 320)" fill="none" stroke="${light}" stroke-width="1" opacity=".2" stroke-dasharray="3 11"/><path d="M36 80h25m-12-12v25 M400 552h30m-15-15v30" stroke="${light}" stroke-width="1.5" opacity=".6"/>`:'';
 return `<defs><radialGradient id="sky"><stop stop-color="${mid}"/><stop offset="1" stop-color="${dark}"/></radialGradient><filter id="blur" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="22"/></filter></defs><rect width="480" height="640" fill="url(#sky)"/>${nebula}${orbit}${stars}<path d="M42 590h92m-92 6h54" stroke="${light}" opacity=".3" stroke-width="2"/>`;
}
function face(kind,rev){
 const y=kind==='saturn'?302:kind==='earth'?330:316;
 const x=kind==='saturn'?215:240,ink=kind==='earth'?'#143858':'#453531';
 if(rev===1)return `<g fill="${ink}" stroke="${ink}" stroke-linecap="round"><circle cx="${x-34}" cy="${y}" r="8"/><circle cx="${x+34}" cy="${y}" r="8"/><path d="M${x-18} ${y+27}q18 20 36 0" fill="none" stroke-width="5"/></g>`;
 let eyes=kind==='jupiter'?`<path d="M${x-46} ${y-14}q12-8 24-3m20 0q12-5 24 3" stroke-width="5" fill="none"/><ellipse cx="${x-30}" cy="${y+2}" rx="6" ry="8"/><ellipse cx="${x+30}" cy="${y+2}" rx="6" ry="8"/>`:kind==='saturn'?`<path d="M${x-44} ${y}q12-16 24 0" fill="none" stroke-width="5"/><ellipse cx="${x+28}" cy="${y-2}" rx="6" ry="9"/>`:`<ellipse cx="${x-31}" cy="${y}" rx="7" ry="10"/><ellipse cx="${x+31}" cy="${y-3}" rx="7" ry="10"/><path d="M${x+18} ${y-23}q10-8 22-1" fill="none" stroke-width="4"/>`;
 if(kind==='venus')eyes=`<path d="M${x-43} ${y-2}q12 12 24 0m38 0q12 12 24 0" fill="none" stroke-width="4"/>`;
 if(kind==='mercury')eyes=`<ellipse cx="${x-36}" cy="${y-2}" rx="6" ry="10"/><ellipse cx="${x+24}" cy="${y-2}" rx="6" ry="10"/><path d="M${x-45} ${y-22}l20-5m30 0l21 5" fill="none" stroke-width="4"/>`;
 if(kind==='mars')eyes=`<circle cx="${x-30}" cy="${y-1}" r="8"/><ellipse cx="${x+31}" cy="${y-1}" rx="7" ry="11"/><path d="M${x-43} ${y-21}q13-11 25-2" fill="none" stroke-width="4"/>`;
 if(kind==='neptune')eyes=`<path d="M${x-44} ${y-5}l24 7m21-2l24-8" stroke-width="4" fill="none"/><circle cx="${x-30}" cy="${y+4}" r="6"/><circle cx="${x+29}" cy="${y+1}" r="6"/>`;
 if(kind==='uranus')eyes=`<ellipse cx="${x-30}" cy="${y+4}" rx="7" ry="6"/><ellipse cx="${x+30}" cy="${y-8}" rx="7" ry="6"/><path d="M${x-43} ${y-12}l20-4m31-7l20-4" stroke-width="4" fill="none"/>`;
 return `<g fill="${ink}" stroke="${ink}" stroke-linecap="round">${eyes}<path d="M${x-16} ${y+27}q17 ${kind==='jupiter'?12:20} 34-3" fill="none" stroke-width="4.5"/></g><g fill="#ffc2a6" opacity=".38"><ellipse cx="${x-54}" cy="${y+17}" rx="12" ry="6"/><ellipse cx="${x+53}" cy="${y+15}" rx="12" ry="6"/></g>`;
}
function defs(rx,ry,base,shadow){return `<defs><clipPath id="body"><ellipse cx="240" cy="330" rx="${rx}" ry="${ry}"/></clipPath><radialGradient id="globe" cx="30%" cy="25%" r="82%"><stop stop-color="${base}"/><stop offset=".55" stop-color="${base}"/><stop offset="1" stop-color="${shadow}"/></radialGradient><radialGradient id="shade" cx="30%" cy="20%" r="90%"><stop stop-color="#fff5dc" stop-opacity=".24"/><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#102238" stop-opacity=".62"/></radialGradient><filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".19" numOctaves="3" seed="7"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".12"/></feComponentTransfer><feBlend in="SourceGraphic" mode="soft-light"/></filter></defs>`;}
function body(rx,ry,base,shadow,markings,rev){
 let pencil='';if(rev>=2)for(let i=0;i<220;i++){const x=42+(i*71)%396,y=135+(i*113)%390;pencil+=`<path d="M${x} ${y}l${3+i%5} -2" stroke="${i%3===0?'#fff4d6':'#263b49'}" stroke-width=".8" opacity="${rev>=3?.13:.08}" stroke-linecap="round"/>`;}
 return `${defs(rx,ry,base,shadow)}<g clip-path="url(#body)"><ellipse cx="240" cy="330" rx="${rx}" ry="${ry}" fill="url(#globe)"/>${markings}<ellipse cx="240" cy="330" rx="${rx}" ry="${ry}" fill="url(#shade)"/>${rev>=2?`<rect x="30" y="120" width="420" height="420" fill="#b7a5a0" opacity=".3" filter="url(#grain)"/>`:''}${pencil}</g><ellipse cx="240" cy="330" rx="${rx}" ry="${ry}" fill="none" stroke="#fff6df" stroke-width="${rev>=3?2:1}" opacity=".33"/><path d="M${240-rx*.8} ${330-ry*.43}Q${240-rx*.7} ${330-ry*.82} ${240-rx*.26} ${330-ry*.93}" fill="none" stroke="#fff7dd" stroke-width="4" opacity=".25" stroke-linecap="round"/>`;
}
function earth(rev){
 const r=rev===1?168:rev===2?180:188;
 const land=`<g fill="#78af81" stroke="#b4d99e" stroke-width="2"><path d="M75 225l25-31 38-13 35 12 22-12 26 17 37 15-13 27-37 9-10 26-25-4-13 23-30-10-17-31-25-7z M157 307l33-5 26 22 27 16-6 38-20 21-12 35-24 23-14-21 6-32-19-25-9-37z M254 208l32-20 39 14 10 20 33 6 38 32-14 35-28 1-22-23-20 13-32-15-7-26-33-7z M273 286l29-7 31 20 3 36-24 40-18 24-20-21 4-33-21-25z M347 399l34-6 21 23-17 23-40-5-9-16z"/></g><path d="M158 156q80-34 145 5l-37 16-55-6z M183 499q57 14 104-2l-8 17-77 4z" fill="#f7f2dc"/><g fill="none" stroke="#f6ffef" stroke-linecap="round" opacity=".7" stroke-width="${rev>=3?7:10}"><path d="M77 283q24-23 63-10m109-42q24-7 50 5 M254 418q38-16 76-3 M330 350q25-10 44-2 M173 208q20-10 35-4"/></g>`;
 const rounded=rev>=2?land.replace(/d="M75[^"]+"/,'d="M74 231Q91 194 137 182Q155 177 173 193L195 181Q219 199 253 211Q256 236 218 246L200 271Q183 267 171 285L142 280Q128 264 120 251Z M157 309Q178 294 197 310L239 340Q241 364 222 388L209 423Q196 446 181 454Q167 445 172 415L157 381Q142 349 157 309Z M254 208Q281 181 310 193L334 219Q373 226 402 258Q414 274 390 294L366 293L341 270Q321 282 302 268L281 244L254 236Z M273 286Q303 268 325 291Q345 316 326 347L307 381Q294 405 279 378L278 347Q254 325 262 308Z M347 400Q377 382 400 412Q408 429 381 439L346 432Q332 418 347 400Z"'):land;
 return body(r,r,'#4d9fb4','#15496c',rounded,rev)+face('earth',rev);
}
function gas(kind,rev){
 const sat=kind==='saturn',rx=sat?(rev===1?140:152):(rev===1?173:191),ry=sat?rx*.91:rx*.94;
 const colors=sat?['#d4b384','#a98a67','#f8dfb0','#cfb78c']:['#d89d77','#a56f59','#efcdab','#bd8b70','#f3ddbd'];
 let bands='';for(let i=0;i<17;i++){const y=150+i*22;bands+=`<path d="M25 ${y}Q130 ${y-10+(i%3)*6} 235 ${y+4}T450 ${y-2}v${11+i%3*3}Q320 ${y+14} 240 ${y+16}T25 ${y+11}z" fill="${colors[i%colors.length]}" opacity=".8"/>`;if(rev>=2)bands+=`<path d="M55 ${y+5}q80-9 150 0t200 0" fill="none" stroke="${colors[(i+2)%colors.length]}" stroke-width="2" opacity=".6"/>`;}
 if(!sat)bands+=`<ellipse cx="319" cy="402" rx="42" ry="23" fill="#bd6b57" transform="rotate(-9 319 402)"/><ellipse cx="319" cy="402" rx="30" ry="14" fill="none" stroke="#e6b38a" stroke-width="3" transform="rotate(-9 319 402)"/><path d="M295 404q28-17 45-2" fill="none" stroke="#d79373" stroke-width="4"/>`;
 let globe=body(rx,ry,sat?'#e9cda0':'#e4bd97',sat?'#927b68':'#886958',bands,rev)+face(kind,rev);
 if(!sat)return globe;
 const ring=(front)=>`<g transform="rotate(-18 240 330)" ${front?'clip-path="url(#front)"':''}>${[222,213,203,192].map((r,i)=>`<ellipse cx="240" cy="330" rx="${r}" ry="${r*.28}" fill="none" stroke="${['#e4c59f','#bfa787','#f3d9b2','#c5ac88'][i]}" stroke-width="${i===0?9:7}" opacity=".96"/>`).join('')}<ellipse cx="240" cy="330" rx="226" ry="64" fill="none" stroke="#fff0cf" stroke-width="1.5" opacity=".6"/></g>`;
 return `<defs><clipPath id="front"><rect x="0" y="330" width="480" height="310"/></clipPath></defs>${ring(false)}${globe}${ring(true)}`;
}
function rocky(kind,rev){
 const mars=kind==='mars',r=185;let marks='';
 for(let i=0;i<19;i++){let x=90+(i*71)%300,y=187+(i*59)%290,cr=5+(i*7)%23;marks+=`<ellipse cx="${x}" cy="${y}" rx="${cr}" ry="${cr*.75}" fill="${mars?'#aa6450':'#6b7180'}" opacity=".36" stroke="${mars?'#e8a77a':'#d2d0c3'}" stroke-width="2"/><path d="M${x-cr*.7} ${y+3}q${cr*.6} ${cr*.5} ${cr*1.3} 0" fill="none" stroke="${mars?'#874f45':'#535c73'}" opacity=".3" stroke-width="2"/>`;}
 if(mars)marks+=`<path d="M115 174q88-39 181-1l-37 23-77-6z" fill="#f1ddd0"/><path d="M112 350q88-37 200 27" fill="none" stroke="#8e514a" stroke-width="12" opacity=".65"/><path d="M130 276l23-28 31 26z" fill="#a8614d"/>`;
 return body(r,r,mars?'#d58c66':'#aaa9a4',mars?'#80493e':'#565f76',marks,rev)+face(kind,rev);
}
function ice(kind,rev){
 const ur=kind==='uranus';let marks='';for(let i=0;i<9;i++)marks+=`<path d="M30 ${180+i*36}Q235 ${160+i*36} 450 ${191+i*36}" fill="none" stroke="${ur?'#c3e7d9':'#c1dbe3'}" stroke-width="${4+i%3*2}" opacity="${ur?.13:.27}"/>`;
 if(!ur)marks+=`<path d="M279 397q43-13 70 2m-97-167q32-7 58 3" fill="none" stroke="#eff0df" stroke-width="6" opacity=".8"/>`;
 const b=body(188,184,ur?'#9ed0cb':'#81b9cc',ur?'#4c919b':'#3b739b',marks,rev)+face(kind,rev);
 return ur?`<g transform="rotate(70 240 330)"><ellipse cx="240" cy="330" rx="220" ry="53" fill="none" stroke="#d5d6b8" stroke-width="2" opacity=".65"/></g>${b}<g transform="rotate(70 240 330)"><path d="M20 330a220 53 0 0 0 440 0" fill="none" stroke="#d5d6b8" stroke-width="2" opacity=".65"/></g>`:b;
}
function venus(rev){let m='';for(let i=0;i<12;i++)m+=`<path d="M20 ${175+i*29}Q130 ${130+i*29} 250 ${173+i*29}T460 ${165+i*29}" fill="none" stroke="${i%2?'#f9d698':'#c48d65'}" stroke-width="${12+i%3*3}" opacity=".5"/>`;return body(187,187,'#e0b47d','#98654d',m,rev)+face('venus',rev);}
export function planetScene(id,rev=3){const fg=id==='earth'?earth(rev):id==='saturn'||id==='jupiter'?gas(id,rev):id==='mercury'||id==='mars'?rocky(id,rev):id==='venus'?venus(rev):ice(id,rev);return {bg:background(id,rev),fg};}
