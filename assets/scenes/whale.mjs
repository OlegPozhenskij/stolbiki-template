import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#d8f0ff", "#f4fbff")}
      <path d="M0 150 H480 V640 H0Z" fill="#5f9fd0"/>
      <g fill="#ffffff" ${s(5)}><path d="M-10 120 h170 l-10 50 h-160Z"/><path d="M190 110 h120 l10 50 h-140Z"/><path d="M340 124 h150 v46 h-160Z"/></g>
      <path d="M160 130 l14 20 l-10 14 M326 130 l-10 18 l12 16" fill="none" ${s(3)}/>
      <g fill="#fff" opacity=".14"><path d="M170 160 L320 160 L420 640 L120 640Z"/></g>
      ${bubbles([[200, 210, 10], [216, 186, 6], [60, 400, 8], [440, 460, 9]])}
      ${fish(70, 260, 0.85, "#ffb347")}${fish(420, 580, 0.85, "#ffd23f", true)}`,
    fg: `<path d="M60 400 Q80 250 260 250 Q420 260 440 380 Q470 340 480 300 Q500 420 430 440 Q380 520 240 520 Q90 520 60 400Z" fill="#6b7f9e" ${S}/>
      <path d="M70 420 Q120 500 240 500 Q300 500 330 470 Q240 470 170 440 Q110 420 70 420Z" fill="#f4f7fb" ${s(4)}/>
      <path d="M78 380 Q150 420 250 400" fill="none" ${s(5)}/>
      ${eye(220, 370, 10)}
      <path d="M260 470 q-30 40 -60 50" fill="#6b7f9e" ${s(5)}/>
      <g fill="#94a6c2"><circle cx="300" cy="300" r="6"/><circle cx="340" cy="320" r="5"/><circle cx="260" cy="290" r="4"/></g>
      <path d="M180 252 q-6 -30 6 -50 M196 252 q6 -30 20 -42" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  };
