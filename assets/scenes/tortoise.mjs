import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#a8dcff", "#e8f7ff")}
      ${sun(70, 80, 36)}${cloud(280, 60, 0.7)}${cloud(380, 140, 0.45)}
      <path d="M0 300 H480 V340 H0Z" fill="#5aa8e0"/>
      <path d="M0 330 Q120 300 240 320 T480 316 V640 H0Z" fill="#8fd16a"/><path d="M0 330 Q120 300 240 320 T480 316" fill="none" ${S}/>
      <g transform="translate(430 330)"><path d="M0 0 q-10 -100 10 -180" stroke="#a5683a" stroke-width="14" fill="none" stroke-linecap="round"/><g fill="#5fbf4a" ${s(4)}><path d="M10 -180 q-60 -10 -80 30 q40 -20 80 -30Z"/><path d="M10 -180 q60 -20 70 20 q-40 -16 -70 -20Z"/><path d="M10 -180 q-20 -50 10 -70 q4 40 -10 70Z"/></g></g>
      ${tufts([[30, 600], [120, 620], [380, 610], [460, 590]])}
      ${flower(40, 560, "#ff8fb1", 1.1)}${flower(450, 560, "#ffd23f", 1.1)}`,
    fg: `<g fill="#b8a07a" ${S}><rect x="150" y="470" width="44" height="70" rx="16"/><rect x="300" y="470" width="44" height="70" rx="16"/></g>
      <path d="M118 480 Q130 320 250 316 Q370 320 382 480Z" fill="#a8783c" ${S}/>
      <g fill="#c99a52" ${s(4)}><path d="M210 360 l40 -20 l40 20 v40 l-40 20 l-40 -20Z"/><path d="M150 420 l40 -16 l20 20 v40 l-50 4Z"/><path d="M350 420 l-40 -16 l-20 20 v40 l50 4Z"/><path d="M220 440 l30 -16 l30 16 v34 h-60Z"/></g>
      <path d="M110 480 H390" fill="none" ${S}/>
      <path d="M120 470 Q80 460 70 420 Q60 380 90 370" fill="none" stroke="${K}" stroke-width="44" stroke-linecap="round"/>
      <path d="M120 470 Q80 460 70 420 Q60 380 90 370" fill="none" stroke="#c4ac84" stroke-width="32" stroke-linecap="round"/>
      <path d="M72 440 q12 -4 20 6 M70 410 q12 -4 20 6" fill="none" ${s(3)}/>
      <ellipse cx="100" cy="356" rx="44" ry="34" fill="#c4ac84" ${S}/>
      ${eye(106, 346, 11)}
      <path d="M66 372 q16 10 32 2" fill="none" ${s(4)}/>`,
  };
