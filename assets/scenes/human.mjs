import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `<rect width="480" height="640" fill="#ffe8d0"/>
      <path d="M0 60 Q60 100 120 60 Q180 100 240 60 Q300 100 360 60 Q420 100 480 60" fill="none" ${s(4)}/>
      <g ${s(3)}><path d="M40 72 l14 30 l14 -26Z" fill="#ff8fb1"/><path d="M160 72 l14 30 l14 -26Z" fill="#ffd23f"/><path d="M280 72 l14 30 l14 -26Z" fill="#7cc8e8"/><path d="M400 72 l14 30 l14 -26Z" fill="#b892ff"/></g>
      <rect x="320" y="150" width="130" height="150" rx="8" fill="#bfe6ff" ${S}/><path d="M385 150 v150 M320 225 h130" ${S}/>
      <rect y="480" width="480" height="160" fill="#d89a5a"/><path d="M0 480 h480" ${S}/>
      <g transform="translate(390 470)"><rect x="-56" y="-60" width="112" height="60" rx="8" fill="#fff3df" ${S}/><path d="M-56 -40 q14 10 28 0 q14 10 28 0 q14 10 28 0 q14 10 28 0" fill="none" stroke="#ff8fb1" stroke-width="6"/><g ${s(3)}><rect x="-34" y="-92" width="8" height="32" fill="#7cc8e8"/><rect x="-4" y="-92" width="8" height="32" fill="#ffd23f"/><rect x="26" y="-92" width="8" height="32" fill="#ff8fb1"/></g><g fill="#ffb347"><ellipse cx="-30" cy="-100" rx="5" ry="8"/><ellipse cx="0" cy="-100" rx="5" ry="8"/><ellipse cx="30" cy="-100" rx="5" ry="8"/></g></g>
      <g fill="#e2453a" ${s(3)}><circle cx="60" cy="240" r="24"/><path d="M60 264 q-6 40 6 80" fill="none"/></g>`,
    fg: `<path d="M120 600 Q120 420 220 410 Q320 420 320 600Z" fill="#9fc8e8" ${S}/>
      <path d="M220 420 v180" ${s(3)}/><g fill="#fff"><circle cx="210" cy="460" r="5"/><circle cx="210" cy="510" r="5"/><circle cx="210" cy="560" r="5"/></g>
      <path d="M300 440 Q350 380 350 320" fill="none" stroke="${K}" stroke-width="34" stroke-linecap="round"/><path d="M300 440 Q350 380 350 320" fill="none" stroke="#9fc8e8" stroke-width="22" stroke-linecap="round"/>
      <circle cx="352" cy="306" r="18" fill="#ffd9b8" ${S}/>
      <circle cx="220" cy="230" r="34" fill="#e8e8ee" ${S}/>
      <path d="M150 330 Q140 230 220 230 Q300 230 290 330 Q270 280 220 276 Q170 280 150 330Z" fill="#e8e8ee" ${S}/>
      <circle cx="220" cy="330" r="70" fill="#ffd9b8" ${S}/>
      <path d="M152 320 Q160 270 220 270 Q280 270 288 320 Q260 290 220 292 Q180 290 152 320Z" fill="#e8e8ee" ${s(4)}/>
      <g fill="none" ${s(4)}><circle cx="194" cy="330" r="18"/><circle cx="246" cy="330" r="18"/><path d="M212 330 h16"/></g>
      <g fill="${K}"><circle cx="196" cy="332" r="5"/><circle cx="248" cy="332" r="5"/></g>
      <path d="M196 366 q24 20 48 0" fill="none" ${s(4)}/>
      <circle cx="170" cy="360" r="9" fill="#ff9ab0" opacity=".7"/><circle cx="270" cy="360" r="9" fill="#ff9ab0" opacity=".7"/>`,
  };
