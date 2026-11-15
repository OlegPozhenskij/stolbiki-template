import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#c9f0c4", "#effbe8")}
      <g fill="#a8dca0" opacity=".9"><circle cx="40" cy="120" r="70"/><circle cx="440" cy="110" r="80"/><circle cx="400" cy="200" r="50"/></g>
      <g fill="none" stroke="#8a5a2e" stroke-width="22" stroke-linecap="round"><path d="M20 640 V140"/><path d="M460 640 V160"/></g>
      <path d="M0 500 Q240 470 480 500 V640 H0Z" fill="#7cc25a"/><path d="M0 500 Q240 470 480 500" fill="none" ${S}/>
      <g fill="none" stroke="#3f9b34" stroke-width="5" stroke-linecap="round"><path d="M60 520 q-30 -40 -50 -40 M60 520 q-20 -50 -10 -80 M60 520 q10 -50 30 -60"/><path d="M420 530 q30 -40 50 -40 M420 530 q20 -50 10 -80 M420 530 q-10 -50 -30 -60"/></g>
      ${flower(100, 560, "#ffd23f", 1)}${flower(380, 590, "#ff8fb1", 1)}
      ${stones([[220, 600, 16], [300, 620, 12]])}
      <g fill="#fff6a8"><circle cx="120" cy="260" r="4"/><circle cx="360" cy="300" r="4"/><circle cx="260" cy="150" r="3"/></g>`,
    fg: `<path d="M160 470 Q140 320 240 300 Q340 320 320 470 Q300 540 240 540 Q180 540 160 470Z" fill="#9ccc4a" ${S}/>
      <path d="M180 400 q20 10 40 0 M180 440 q20 10 40 0 M260 400 q20 10 40 0 M260 440 q20 10 40 0 M210 490 q20 10 40 0" fill="none" stroke="#5f8a2a" stroke-width="5" stroke-linecap="round"/>
      <path d="M170 420 Q130 470 150 520 Q180 500 190 450Z" fill="#7fae3a" ${S}/><path d="M310 420 Q350 470 330 520 Q300 500 290 450Z" fill="#7fae3a" ${S}/>
      <circle cx="240" cy="290" r="74" fill="#c4dc6a" ${S}/>
      <path d="M180 260 q20 -10 40 0 M260 260 q20 -10 40 0" fill="none" stroke="#e8f0a0" stroke-width="10" stroke-linecap="round"/>
      ${eye(208, 284, 14)}${eye(272, 284, 14)}
      <path d="M226 304 Q240 300 254 304 Q252 340 240 344 Q228 340 226 304Z" fill="#f2e4c4" ${S}/>
      <g fill="none" ${s(5)}><path d="M210 540 v20 l-10 10 M210 560 l10 10 M270 540 v20 l-10 10 M270 560 l10 10"/></g>`,
  };
