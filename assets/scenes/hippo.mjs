import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#c4ecff", "#effaff", "#9fd27a", 420)}${sun(400, 80, 36)}${cloud(40, 90, 0.6)}
      <path d="M0 500 Q240 480 480 500 V640 H0Z" fill="#6cb8e6"/><path d="M0 500 Q240 480 480 500" fill="none" ${S}/>
      <path d="M40 560 q50 -12 100 0 M300 590 q60 -12 120 0" fill="none" stroke="#bfe6fb" stroke-width="6" stroke-linecap="round"/>
      ${tufts([[40, 430], [440, 430]])}<g fill="#7cc25a" ${s(3)}><ellipse cx="420" cy="600" rx="40" ry="12"/></g>${flower(420, 580, "#ff9ec4", 0.9)}`,
    fg: `<path d="M100 420 Q110 320 270 320 Q400 330 400 430 Q390 520 260 524 Q110 520 100 420Z" fill="#a898b8" ${S}/>
      <g fill="#a898b8" ${s(5)}><rect x="150" y="480" width="40" height="50" rx="12"/><rect x="320" y="480" width="40" height="50" rx="12"/></g>
      <path d="M90 420 Q60 380 80 330 Q120 280 200 300 Q220 360 200 420Z" fill="#b8a8c8" ${S}/>
      <ellipse cx="110" cy="390" rx="50" ry="40" fill="#c4b4d4" ${S}/>
      <g fill="#8a7a9a"><ellipse cx="90" cy="378" rx="7" ry="5"/><ellipse cx="120" cy="374" rx="7" ry="5"/></g>
      <g fill="#a898b8" ${s(4)}><circle cx="150" cy="290" r="14"/><circle cx="190" cy="296" r="14"/></g>
      ${eye(150, 320, 10)}${eye(184, 324, 10)}
      <path d="M80 408 q30 20 60 0" fill="none" ${s(4)}/>
      <g fill="#e2453a" ${s(2)}><path d="M240 360 q6 10 0 16 q-6 -6 0 -16Z"/><path d="M290 380 q6 10 0 16 q-6 -6 0 -16Z"/><path d="M330 350 q6 10 0 16 q-6 -6 0 -16Z"/></g>`,
  };
