import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffd59a", "#fff2d4", "#e8c86a", 480)}${sun(90, 100, 50)}${birdV(380, 90, 1)}${birdV(410, 110, 0.85)}
      <g transform="translate(420 480)"><path d="M0 0 V-110" stroke="#8a5a2e" stroke-width="14" stroke-linecap="round"/><ellipse cx="0" cy="-120" rx="70" ry="24" fill="#6cb04a" ${S}/></g>
      ${tufts([[30, 500], [140, 600], [460, 610]], "#a08a2e")}
      ${stones([[80, 560, 30]], "#c9b48a")}`,
    fg: `<path d="M170 560 Q160 440 250 430 Q340 440 340 560Z" fill="#f2b45a" ${S}/>
      <g fill="#f2b45a" ${s(5)}><rect x="180" y="520" width="40" height="40" rx="12"/><rect x="280" y="520" width="40" height="40" rx="12"/></g>
      <g fill="#c96a1e" ${S}>
        <circle cx="250" cy="250" r="44"/><circle cx="190" cy="270" r="44"/><circle cx="310" cy="270" r="44"/><circle cx="160" cy="330" r="44"/><circle cx="340" cy="330" r="44"/><circle cx="180" cy="390" r="44"/><circle cx="320" cy="390" r="44"/><circle cx="250" cy="420" r="44"/></g>
      <circle cx="250" cy="340" r="84" fill="#c96a1e"/>
      <circle cx="250" cy="340" r="70" fill="#f7c46a" ${S}/>
      <g fill="#f7c46a" ${s(4)}><circle cx="200" cy="284" r="16"/><circle cx="300" cy="284" r="16"/></g>
      ${eye(224, 328, 12)}${eye(276, 328, 12)}
      <path d="M238 352 h24 l-12 12Z" fill="#8a4a3a" ${s(3)}/>
      <path d="M250 364 q-14 14 -26 4 M250 364 q14 14 26 4" fill="none" ${s(4)}/>`,
  };
