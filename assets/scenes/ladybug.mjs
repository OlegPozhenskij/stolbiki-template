import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d4f5d0", "#f0fbe8", "#9fd27a", 520)}${sun(400, 80, 34)}${cloud(40, 90, 0.6)}
      <path d="M0 500 Q160 400 300 420 Q420 436 480 400 L480 480 Q380 510 260 490 Q120 470 0 540Z" fill="#6cc25a" ${S}/>
      <path d="M40 500 Q200 440 440 444" fill="none" stroke="#4f9a35" stroke-width="5"/>
      ${flower(60, 580, "#ff8fb1", 1.1)}${flower(420, 590, "#ffd23f", 1.1)}${tufts([[200, 610], [320, 615]])}`,
    fg: `<path d="M120 430 Q120 300 240 300 Q360 300 360 430 Q350 490 240 494 Q130 490 120 430Z" fill="#ff4f3f" ${S}/>
      <path d="M240 300 V494" ${S}/>
      <g fill="#3a3a48"><circle cx="186" cy="370" r="20"/><circle cx="294" cy="370" r="20"/><circle cx="170" cy="444" r="16"/><circle cx="310" cy="444" r="16"/><circle cx="214" cy="470" r="9"/><circle cx="266" cy="470" r="9"/></g>
      <ellipse cx="160" cy="340" rx="16" ry="10" fill="#fff" opacity=".7" transform="rotate(-30 160 340)"/>
      <g fill="#3a3a48" ${s(4)}><ellipse cx="190" cy="496" rx="16" ry="9"/><ellipse cx="290" cy="496" rx="16" ry="9"/></g>
      <circle cx="240" cy="270" r="66" fill="#ffe2c4" ${S}/>
      <path d="M176 262 Q180 200 240 200 Q300 200 304 262 Q280 226 240 226 Q200 226 176 262Z" fill="#3a3a48" ${s(4)}/>
      ${eye(216, 268, 13)}${eye(264, 268, 13)}
      <circle cx="196" cy="292" r="10" fill="#ff8fb1" opacity=".75"/><circle cx="284" cy="292" r="10" fill="#ff8fb1" opacity=".75"/>
      <path d="M226 296 q14 14 28 0" fill="none" ${s(4)}/>
      <path d="M218 206 q-8 -30 -26 -40 M262 206 q8 -30 26 -40" fill="none" ${s(4)}/><circle cx="190" cy="164" r="9" fill="#ff4f3f" ${s(3)}/><circle cx="290" cy="164" r="9" fill="#ff4f3f" ${s(3)}/>`,
  };
