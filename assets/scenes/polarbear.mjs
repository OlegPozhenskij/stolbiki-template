import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#d8f0ff", "#f4fbff")}${sun(400, 80, 30)}${cloud(50, 80, 0.6)}
      <path d="M0 360 H480 V640 H0Z" fill="#6fa8d8"/>
      <path d="M-10 480 Q100 450 260 470 Q400 470 500 490 L500 600 L-10 600Z" fill="#f4f9ff" ${S}/>
      <g fill="#e2eef8" ${s(4)}><path d="M360 360 L400 300 L450 360Z"/></g>
      <path d="M40 400 q50 -10 100 0 M300 420 q50 -10 100 0" fill="none" stroke="#a8ccec" stroke-width="5" stroke-linecap="round"/>
      ${fish(80, 560, 0.9, "#7aa8d8")}`,
    fg: `<path d="M110 470 Q110 360 250 350 Q390 360 390 470 Q390 530 250 534 Q110 530 110 470Z" fill="#f8f8f2" ${S}/>
      <g fill="#f8f8f2" ${s(5)}><rect x="140" y="480" width="44" height="70" rx="16"/><rect x="310" y="480" width="44" height="70" rx="16"/></g>
      <path d="M140 548 h44 M310 548 h44" ${s(3)}/>
      <g fill="#f8f8f2" ${S}><circle cx="120" cy="300" r="20"/><circle cx="210" cy="296" r="20"/></g>
      <ellipse cx="164" cy="350" rx="70" ry="60" fill="#f8f8f2" ${S}/>
      <ellipse cx="124" cy="376" rx="34" ry="24" fill="#f0eee4" ${s(4)}/>
      <ellipse cx="108" cy="368" rx="12" ry="9" fill="#3a3a3a"/>
      ${eye(150, 334, 10)}${eye(196, 334, 10)}
      <path d="M110 390 q14 10 28 0" fill="none" ${s(3)}/>`,
  };
