import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d8f0ff", "#f6fcff", "#f4f9ff", 480)}
      <g fill="#cfe6f7" ${s(4)}><path d="M20 480 L80 380 L140 480Z"/><path d="M360 480 L430 360 L480 420 V480Z"/></g>
      ${cloud(250, 70, 0.7)}${sun(80, 90, 30)}
      <path d="M60 540 q60 -10 120 0 M300 580 q60 -10 120 0" fill="none" stroke="#bcd8ee" stroke-width="5" stroke-linecap="round"/>
      <g fill="#fff"><circle cx="100" cy="160" r="4"/><circle cx="380" cy="200" r="4"/><circle cx="300" cy="140" r="3"/><circle cx="160" cy="260" r="3"/></g>`,
    fg: `<path d="M170 540 Q140 380 200 260 Q240 200 280 260 Q340 380 310 540Z" fill="#56647a" ${S}/>
      <path d="M200 520 Q180 400 220 300 Q240 280 260 300 Q300 400 280 520Z" fill="#fbfbfb" ${s(4)}/>
      <path d="M212 290 Q240 310 268 290 Q262 330 240 336 Q218 330 212 290Z" fill="#ffc64a"/>
      <g fill="#56647a" ${s(5)}><path d="M176 330 Q140 400 150 460 Q176 420 190 360Z"/><path d="M304 330 Q340 400 330 460 Q304 420 290 360Z"/></g>
      ${eye(220, 250, 9)}${eye(260, 250, 9)}
      <path d="M232 266 L240 290 L248 266Z" fill="#ff9a3c" ${s(3)}/>
      <ellipse cx="240" cy="540" rx="34" ry="22" fill="#fff6dc" ${S}/>
      <g fill="#ff9a3c" ${s(4)}><path d="M190 556 l-20 10 h50Z"/><path d="M290 556 l20 10 h-50Z"/></g>`,
  };
