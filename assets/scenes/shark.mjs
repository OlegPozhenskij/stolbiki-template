import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#7fb3d8", "#4f86b8")}
      <g fill="#ffffff" ${s(5)}><path d="M-10 0 h200 l-20 50 h-180Z"/><path d="M300 0 h190 v40 h-170Z"/></g>
      <g fill="#fff" opacity=".12"><path d="M190 40 L300 40 L400 640 L140 640Z"/></g>
      <path d="M0 590 Q160 570 300 592 T480 586 V640 H0Z" fill="#3f6f9a"/>
      <g fill="#5a8ab4" ${s(4)}><path d="M40 600 q-6 -60 10 -90 q10 50 4 90Z"/><path d="M430 600 q-4 -50 14 -80 q8 40 -2 80Z"/></g>
      ${bubbles([[80, 120, 9], [96, 90, 5], [420, 480, 10]])}
      ${fish(400, 140, 0.9, "#ffd23f", true)}${fish(70, 480, 0.85, "#ff9a3c")}
      <g fill="#fff" opacity=".5"><circle cx="160" cy="200" r="3"/><circle cx="330" cy="160" r="2"/><circle cx="120" cy="330" r="3"/><circle cx="390" cy="380" r="2"/><circle cx="250" cy="560" r="3"/></g>`,
    fg: `<path d="M370 380 L450 320 L440 390 L460 450 Z" fill="#8a8478" ${S}/>
      <path d="M60 390 Q100 320 230 320 Q340 324 380 380 Q340 440 230 446 Q100 446 60 390Z" fill="#9a9488" ${S}/>
      <path d="M210 326 L250 270 L270 330Z" fill="#8a8478" ${S}/>
      <path d="M180 430 L150 480 L220 440Z" fill="#8a8478" ${S}/>
      <path d="M70 400 Q140 440 230 436 Q300 432 350 410" fill="none" stroke="#d8d4c8" stroke-width="12" stroke-linecap="round" opacity=".8"/>
      <path d="M160 360 v24 M176 358 v26 M192 358 v26" ${s(3)}/>
      ${eye(110, 376, 9)}
      <path d="M70 404 q20 10 40 4" fill="none" ${s(4)}/>
      <g fill="#7a7468"><circle cx="250" cy="370" r="5"/><circle cx="290" cy="390" r="4"/><circle cx="320" cy="360" r="4"/><circle cx="230" cy="400" r="3"/></g>`,
  };
