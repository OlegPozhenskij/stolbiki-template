import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#c9f0c4", "#effbe8")}${sun(400, 80, 32)}${cloud(60, 90, 0.6)}
      <path d="M-10 236 Q120 210 240 226 Q360 240 490 214" fill="none" stroke="${K}" stroke-width="40" stroke-linecap="round"/>
      <path d="M-10 236 Q120 210 240 226 Q360 240 490 214" fill="none" stroke="#a5683a" stroke-width="28" stroke-linecap="round"/>
      <g fill="#6cc25a" ${s(3)}><ellipse cx="40" cy="206" rx="30" ry="12" transform="rotate(-20 40 206)"/><ellipse cx="80" cy="256" rx="26" ry="11" transform="rotate(30 80 256)"/><ellipse cx="420" cy="196" rx="30" ry="12" transform="rotate(20 420 196)"/><ellipse cx="450" cy="244" rx="26" ry="11" transform="rotate(-30 450 244)"/></g>
      <path d="M0 560 Q240 540 480 560 V640 H0Z" fill="#7cc25a"/><path d="M0 560 Q240 540 480 560" fill="none" ${S}/>
      ${flower(60, 600, "#ff8fb1", 1)}${flower(420, 610, "#ffd23f", 1)}`,
    fg: `<g fill="#b0906a" ${S}><path d="M170 360 Q150 290 166 226 h34 Q196 300 210 360Z"/><path d="M310 360 Q330 290 314 226 h-34 Q284 300 270 360Z"/></g>
      <g fill="none" ${s(5)}><path d="M168 226 q4 -16 14 -16 M186 226 q4 -16 14 -16 M282 226 q4 -16 14 -16 M300 226 q4 -16 14 -16"/></g>
      <ellipse cx="240" cy="440" rx="96" ry="110" fill="#b0906a" ${S}/>
      <path d="M180 430 q20 -10 40 0 M260 430 q20 -10 40 0 M210 480 q30 -10 60 0" fill="none" stroke="#8a6a4a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="240" cy="350" r="70" fill="#b0906a" ${S}/>
      <ellipse cx="240" cy="360" rx="56" ry="46" fill="#f2e2c8" ${s(4)}/>
      <g fill="#7a5a3a"><ellipse cx="212" cy="352" rx="20" ry="13" transform="rotate(-20 212 352)"/><ellipse cx="268" cy="352" rx="20" ry="13" transform="rotate(20 268 352)"/></g>
      ${eye(214, 350, 9)}${eye(266, 350, 9)}
      <ellipse cx="240" cy="372" rx="9" ry="6" fill="#4a3a2a"/>
      <path d="M226 384 q14 12 28 0" fill="none" ${s(4)}/>
      <circle cx="200" cy="378" r="7" fill="#ff9ab0" opacity=".7"/><circle cx="280" cy="378" r="7" fill="#ff9ab0" opacity=".7"/>`,
  };
