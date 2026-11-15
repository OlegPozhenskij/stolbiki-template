import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `<rect width="480" height="640" fill="#d6f5e4"/>
      <g fill="#bde8cf"><circle cx="60" cy="80" r="8"/><circle cx="200" cy="140" r="8"/><circle cx="420" cy="90" r="8"/><circle cx="120" cy="260" r="8"/></g>
      <g transform="translate(380 330)"><circle r="90" fill="none" stroke="#5aa8e0" stroke-width="12"/><circle r="90" fill="none" ${s(3)}/><path d="M-90 0 H90 M0 -90 V90 M-64 -64 L64 64 M-64 64 L64 -64" stroke="#5aa8e0" stroke-width="4"/><path d="M0 90 L-30 170 M0 90 L30 170" ${S}/></g>
      <rect y="490" width="480" height="150" fill="#f5d98a"/><path d="M0 490 h480" ${S}/>
      <g stroke="#d9b45a" stroke-width="5" stroke-linecap="round"><path d="M30 520 l20 6 M100 560 l24 -4 M180 530 l18 8 M300 600 l22 -6 M400 540 l20 4 M60 610 l18 -6"/></g>
      <path d="M60 470 l30 30 h-60Z" fill="#ffb347" ${s(4)}/>`,
    fg: `<ellipse cx="240" cy="440" rx="130" ry="100" fill="#f2a65a" ${S}/>
      <path d="M150 470 Q240 560 330 470 Q300 420 240 420 Q180 420 150 470Z" fill="#fff3df"/>
      <g fill="#f2a65a" ${S}><circle cx="160" cy="300" r="26"/><circle cx="320" cy="300" r="26"/></g>
      <g fill="#f7b7c3"><circle cx="160" cy="300" r="13"/><circle cx="320" cy="300" r="13"/></g>
      <circle cx="240" cy="360" r="90" fill="#f2a65a" ${S}/>
      <circle cx="166" cy="396" r="40" fill="#ffd9a8" ${S}/><circle cx="314" cy="396" r="40" fill="#ffd9a8" ${S}/>
      <g fill="#c98a3c"><circle cx="160" cy="390" r="5"/><circle cx="176" cy="404" r="5"/><circle cx="306" cy="390" r="5"/><circle cx="322" cy="404" r="5"/></g>
      ${eye(208, 346, 13)}${eye(272, 346, 13)}
      <ellipse cx="240" cy="380" rx="10" ry="7" fill="#f06a8a" ${s(3)}/>
      <path d="M240 388 q-10 12 -20 4 M240 388 q10 12 20 4" fill="none" ${s(3)}/>
      <g fill="#ffd9a8" ${s(4)}><ellipse cx="210" cy="450" rx="16" ry="12"/><ellipse cx="270" cy="450" rx="16" ry="12"/></g>`,
  };
