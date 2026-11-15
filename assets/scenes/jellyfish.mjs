import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#3a7cc0", "#1a4f86")}
      <g fill="#fff" opacity=".07"><path d="M80 0 L200 0 L330 640 L150 640Z"/><path d="M320 0 L380 0 L480 480 L480 640 L440 640Z"/></g>
      <path d="M0 600 Q120 570 240 598 T480 590 V640 H0Z" fill="#163c66"/>
      <g fill="#2a6a9a" ${s(4)}><path d="M30 610 q-6 -60 12 -96 q12 50 4 96Z"/><path d="M440 610 q-4 -50 16 -84 q8 46 -2 84Z"/></g>
      ${bubbles([[70, 120, 10], [96, 80, 6], [400, 520, 12], [420, 470, 7], [60, 520, 8]])}
      ${fish(380, 120, 0.95, "#ffd23f", true)}${fish(430, 165, 0.75, "#ffd23f", true)}${fish(80, 400, 0.95, "#ff9a3c")}
      <g fill="#fff" opacity=".45"><circle cx="160" cy="100" r="3"/><circle cx="330" cy="80" r="2"/><circle cx="100" cy="300" r="3"/><circle cx="380" cy="380" r="2"/><circle cx="210" cy="560" r="3"/><circle cx="300" cy="540" r="2"/><circle cx="420" cy="260" r="3"/></g>
      <g transform="translate(110 520) scale(.35)" opacity=".8"><path d="M0 0 Q0 -60 40 -60 Q80 -60 80 0Z" fill="#ffb3d9" ${S}/><path d="M20 0 v40 M40 0 v50 M60 0 v40" fill="none" stroke="#ffd1e8" stroke-width="8"/></g>`,
    fg: `<g fill="none" stroke="#ffd1e8" stroke-width="5" stroke-linecap="round" opacity=".95">
        <path d="M160 340 q-20 60 6 120 q20 50 -6 110"/><path d="M200 350 q20 70 -6 130 q-20 50 10 110"/><path d="M240 352 q-16 80 10 140 q16 50 -4 100"/><path d="M280 350 q22 70 -4 130 q-22 50 6 110"/><path d="M320 340 q16 60 -8 120 q-16 50 8 100"/>
      </g>
      <g fill="none" stroke="#ff9ccc" stroke-width="10" stroke-linecap="round" opacity=".8"><path d="M214 344 q-10 40 6 70 q10 24 -4 44"/><path d="M266 344 q12 40 -6 70 q-10 24 4 44"/></g>
      <path d="M120 330 Q120 170 240 166 Q360 170 360 330 Q300 350 240 344 Q180 350 120 330Z" fill="#ffb3d9" opacity=".92" ${S}/>
      <path d="M150 300 Q160 200 240 196" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/>
      <path d="M200 316 q40 -26 80 0" fill="none" stroke="#ff7ab8" stroke-width="6" stroke-linecap="round" opacity=".7"/>
      <g fill="#ff6f8f" opacity=".6"><ellipse cx="240" cy="304" rx="24" ry="11"/><ellipse cx="240" cy="304" rx="11" ry="24"/></g>
      <g fill="#ff7ab8"><circle cx="180" cy="210" r="5"/><circle cx="300" cy="206" r="5"/><circle cx="240" cy="186" r="4"/><circle cx="330" cy="260" r="4"/><circle cx="150" cy="260" r="4"/></g>
      <path d="M120 330 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0" fill="none" ${S}/>
      ${eye(204, 238, 13)}${eye(276, 238, 13)}
      <path d="M226 262 q14 12 28 0" fill="none" ${s(4)}/>
      <circle cx="186" cy="258" r="8" fill="#ff7ab8" opacity=".7"/><circle cx="294" cy="258" r="8" fill="#ff7ab8" opacity=".7"/>`,
  };
