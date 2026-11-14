import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffd6e4", "#fff2f6", "#a8dcc0", 440)}${sun(80, 90, 36)}${cloud(300, 70, 0.6)}
      <path d="M0 500 Q240 480 480 500 V640 H0Z" fill="#8fd0ec"/><path d="M0 500 Q240 480 480 500" fill="none" ${S}/>
      <path d="M30 560 q50 -12 100 0 M310 590 q60 -12 120 0" fill="none" stroke="#c8ecfa" stroke-width="6" stroke-linecap="round"/>
      <g fill="#ff9a8a" ${s(3)}><path d="M90 610 q14 -12 28 0 q-14 6 -28 0Z"/><path d="M380 560 q14 -12 28 0 q-14 6 -28 0Z"/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M450 450 q8 -90 -6 -160"/></g>`,
    fg: `<path d="M240 420 V560 M240 470 L280 440 L250 420" fill="none" stroke="${K}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M240 420 V560 M240 470 L280 440 L250 420" fill="none" stroke="#ff8fa8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="260" cy="380" rx="90" ry="54" fill="#ff9ab8" ${S}/>
      <path d="M220 360 q60 -30 120 10 q-30 30 -80 20Z" fill="#ff7aa0" ${s(4)}/>
      <path d="M190 370 Q130 330 150 270 Q170 220 200 230 Q230 240 200 270" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/>
      <path d="M190 370 Q130 330 150 270 Q170 220 200 230 Q230 240 200 270" fill="none" stroke="#ff9ab8" stroke-width="18" stroke-linecap="round"/>
      <circle cx="198" cy="236" r="26" fill="#ff9ab8" ${S}/>${eye(202, 230, 9)}
      <path d="M220 236 Q250 240 246 270 Q234 260 218 250Z" fill="#fff" ${s(4)}/><path d="M240 256 Q248 262 246 270 Q238 266 236 258Z" fill="${K}"/>`,
  };
