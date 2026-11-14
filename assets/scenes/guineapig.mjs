import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(70, 80, 34)}${cloud(300, 80, 0.7)}
      <g fill="#f5d98a" ${s(3)}><path d="M20 520 q60 -40 120 0Z"/><path d="M340 600 q60 -40 120 0Z"/></g>
      <g transform="translate(400 500) rotate(-30)"><path d="M0 0 L-12 70 L12 70Z" fill="#ff9a3c" ${s(4)}/><path d="M0 0 q-10 -20 -4 -30 M0 0 q10 -20 4 -30" stroke="#3f9b34" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      ${tufts([[40, 480], [200, 470], [300, 600], [100, 620]])}${flower(200, 600, "#ff8fb1", 1)}`,
    fg: `<path d="M100 430 Q100 330 240 320 Q380 330 380 430 Q380 520 240 524 Q100 520 100 430Z" fill="#c9844a" ${S}/>
      <path d="M240 322 Q300 330 330 380 Q340 470 300 520 Q240 524 240 500 Z" fill="#fff6e8"/>
      <path d="M140 360 Q180 330 220 340 Q200 400 150 410Z" fill="#fff6e8"/>
      <path d="M100 430 Q100 330 240 320 Q380 330 380 430 Q380 520 240 524 Q100 520 100 430Z" fill="none" ${S}/>
      <g fill="#c9844a" ${s(5)}><ellipse cx="130" cy="330" rx="22" ry="16"/><ellipse cx="216" cy="318" rx="22" ry="16"/></g>
      ${eye(140, 380, 12)}${eye(200, 376, 12)}
      <ellipse cx="164" cy="412" rx="12" ry="9" fill="#f06a8a" ${s(3)}/>
      <g fill="#fff" ${s(3)}><rect x="156" y="424" width="8" height="16" rx="2"/><rect x="166" y="424" width="8" height="16" rx="2"/></g>
      <g fill="#c9844a" ${s(4)}><ellipse cx="160" cy="520" rx="22" ry="11"/><ellipse cx="320" cy="520" rx="22" ry="11"/></g>`,
  };
