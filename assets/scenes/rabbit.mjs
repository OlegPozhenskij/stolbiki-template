import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d4f0ff", "#f4fcff", "#9fd27a", 470)}${sun(70, 90, 36)}${cloud(320, 80, 0.7)}
      <g transform="translate(400 540)"><path d="M0 0 L-14 80 L14 80Z" fill="#ff9a3c" ${s(4)} transform="rotate(180)"/><path d="M-8 0 q-14 -26 -6 -40 M0 0 q0 -30 6 -42 M8 0 q14 -24 10 -38" stroke="#3f9b34" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      ${tufts([[40, 480], [180, 470], [100, 600], [300, 610]])}${flower(60, 560, "#b892ff", 1.1)}${flower(250, 600, "#ffd23f", 1)}`,
    fg: `<g fill="#f2f2f2" ${S}><path d="M190 300 Q160 180 190 170 Q220 180 220 300Z"/><path d="M260 300 Q270 170 300 176 Q324 190 286 304Z"/></g>
      <g fill="#f7b7c3"><path d="M196 290 Q180 200 192 190 Q206 200 208 290Z"/><path d="M270 292 Q282 200 296 196 Q306 210 280 296Z"/></g>
      <ellipse cx="250" cy="460" rx="110" ry="90" fill="#f2f2f2" ${S}/>
      <circle cx="352" cy="470" r="22" fill="#fff" ${S}/>
      <circle cx="240" cy="350" r="70" fill="#f2f2f2" ${S}/>
      ${eye(212, 340, 12)}${eye(268, 340, 12)}
      <path d="M232 368 h16 l-8 8Z" fill="#f06a8a" ${s(3)}/>
      <path d="M240 376 q-10 12 -20 4 M240 376 q10 12 20 4" fill="none" ${s(3)}/>
      <path d="M200 372 l-44 -6 M200 382 l-42 6 M280 372 l44 -6 M280 382 l42 6" ${s(2)}/>
      <g fill="#f2f2f2" ${s(5)}><ellipse cx="200" cy="546" rx="30" ry="14"/><ellipse cx="290" cy="546" rx="30" ry="14"/></g>
      <circle cx="198" cy="372" r="8" fill="#f7b7c3" opacity=".7"/><circle cx="282" cy="372" r="8" fill="#f7b7c3" opacity=".7"/>`,
  };
