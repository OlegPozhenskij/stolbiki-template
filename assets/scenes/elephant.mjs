import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#ffe2a8", "#fff6d8")}
      ${sun(400, 90, 46)}${cloud(40, 80, 0.7)}${birdV(180, 110, 1)}${birdV(220, 90, 0.85)}
      <path d="M0 470 Q240 440 480 470 V640 H0Z" fill="#e8c86a"/><path d="M0 470 Q240 440 480 470" fill="none" ${S}/>
      ${tufts([[440, 470]], "#a08a2e")}
      ${tufts([[30, 500], [120, 600], [420, 520], [460, 600]], "#a08a2e")}
      <ellipse cx="60" cy="570" rx="40" ry="10" fill="#7cc8e8" ${s(3)}/>`,
    fg: `<ellipse cx="240" cy="470" rx="120" ry="84" fill="#aab6c8" ${S}/>
      <g fill="#aab6c8" ${S}><rect x="150" y="490" width="50" height="70" rx="20"/><rect x="280" y="490" width="50" height="70" rx="20"/></g>
      <g fill="#e2e8f0" ${s(3)}><path d="M156 552 q10 -8 20 0 q10 -8 20 0"/><path d="M286 552 q10 -8 20 0 q10 -8 20 0"/></g>
      <path d="M150 300 Q60 250 50 330 Q46 420 150 410Z" fill="#aab6c8" ${S}/>
      <path d="M330 300 Q420 250 430 330 Q434 420 330 410Z" fill="#aab6c8" ${S}/>
      <path d="M140 316 Q86 290 80 336 Q78 392 140 390Z" fill="#f7c4d0"/>
      <path d="M340 316 Q394 290 400 336 Q402 392 340 390Z" fill="#f7c4d0"/>
      <circle cx="240" cy="340" r="96" fill="#b8c4d4" ${S}/>
      ${eye(204, 322, 14)}${eye(276, 322, 14)}
      <circle cx="184" cy="360" r="11" fill="#f7a8bc" opacity=".8"/><circle cx="296" cy="360" r="11" fill="#f7a8bc" opacity=".8"/>
      <path d="M216 372 Q210 430 232 456 Q250 476 276 460 Q300 444 286 420 Q272 432 262 426 Q252 420 258 372Z" fill="#b8c4d4" ${S}/>
      <path d="M220 400 h34 M224 424 h30" ${s(3)}/>
      <path d="M200 388 q10 14 24 12 M280 388 q-10 14 -24 12" fill="none" ${s(4)}/>`,
  };
