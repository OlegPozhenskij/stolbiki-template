import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#bfe6ff", "#f0fbff")}
      ${cloud(60, 90, 0.7)}${cloud(320, 70, 0.6)}${sun(420, 120, 34)}
      <path d="M0 330 Q120 300 240 320 T480 310 V420 H0Z" fill="#8bcf6a"/>
      <path d="M0 420 Q240 400 480 420 V640 H0Z" fill="#6cb8e6"/><path d="M0 420 Q240 400 480 420" fill="none" ${S}/>
      <path d="M30 480 q50 -12 100 0 M280 500 q60 -12 120 0 M150 580 q60 -12 120 0" fill="none" stroke="#bfe6fb" stroke-width="6" stroke-linecap="round"/>
      ${tufts([[20, 330], [200, 320], [460, 318]])}
      <g transform="translate(70 380)"><ellipse cx="0" cy="0" rx="52" ry="20" fill="#b07a45" ${S}/><path d="M-44 -6 q20 -10 40 0 q20 -10 44 0" fill="none" stroke="#8a5a2e" stroke-width="4"/><ellipse cx="-14" cy="-12" rx="14" ry="18" fill="#fff6dc" ${s(4)}/><ellipse cx="14" cy="-14" rx="14" ry="18" fill="#fff6dc" ${s(4)}/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="6" stroke-linecap="round"><path d="M440 420 q-6 -60 10 -110"/><path d="M460 420 q4 -50 -4 -90"/></g>
      ${fish(380, 560, 0.9, "#ffb347", true)}`,
    fg: `<path d="M330 470 Q420 470 440 430 Q450 500 360 510Z" fill="#7a4a2a" ${S}/>
      <path d="M346 474 l60 -10 M350 492 l64 -14" stroke="#5c3418" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="270" cy="450" rx="110" ry="64" fill="#a8693c" ${S}/>
      <g fill="#a8693c" ${s(5)}><path d="M200 500 l-30 24 l40 6Z"/><path d="M320 500 l20 26 l-36 4Z"/></g>
      <circle cx="170" cy="420" r="52" fill="#a8693c" ${S}/>
      <path d="M126 410 Q70 400 52 424 Q60 452 128 444Z" fill="#4a3a36" ${S}/>
      <path d="M70 420 h10 M64 432 h10" ${s(3)}/>
      ${eye(176, 400, 11)}
      <path d="M200 440 q-10 10 -24 6" fill="none" ${s(3)}/>
      <g fill="#c98a5a"><circle cx="270" cy="430" r="4"/><circle cx="300" cy="460" r="4"/><circle cx="240" cy="470" r="3"/></g>`,
  };
