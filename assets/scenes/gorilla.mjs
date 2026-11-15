import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#c9f0c4", "#effbe8")}
      <g fill="#6cb04a" ${s(4)}><path d="M0 120 q60 40 40 120 q-30 -20 -40 -40Z"/><path d="M480 100 q-70 40 -50 130 q30 -20 50 -40Z"/><path d="M0 330 q80 20 70 90 q-40 -10 -70 -30Z"/><path d="M480 330 q-80 20 -70 90 q40 -10 70 -30Z"/></g>
      <path d="M0 520 Q240 500 480 520 V640 H0Z" fill="#7cc25a"/><path d="M0 520 Q240 500 480 520" fill="none" ${S}/>
      ${flower(60, 580, "#ff8fb1", 1.1)}${flower(420, 600, "#ffd23f", 1)}${tufts([[200, 610], [320, 600]])}
      <g transform="translate(400 560)"><path d="M0 0 q20 -40 0 -60" stroke="#ffd23f" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M0 0 q20 -40 0 -60" ${s(3)} fill="none"/></g>`,
    fg: `<path d="M120 560 Q100 380 240 350 Q380 380 360 560Z" fill="#6e7480" ${S}/>
      <ellipse cx="240" cy="470" rx="60" ry="64" fill="#8e8a92"/>
      <g fill="#6e7480" ${S}><path d="M140 400 Q90 470 110 560 h40 Q150 480 170 430Z"/><path d="M340 400 Q390 470 370 560 h-40 Q330 480 310 430Z"/></g>
      <circle cx="240" cy="300" r="76" fill="#6e7480" ${S}/>
      <path d="M180 300 Q180 250 240 250 Q300 250 300 300 Q300 360 240 364 Q180 360 180 300Z" fill="#a8968a" ${s(4)}/>
      ${eye(216, 290, 11)}${eye(264, 290, 11)}
      <path d="M220 320 q20 -10 40 0" fill="none" ${s(4)}/><g fill="${K}"><ellipse cx="232" cy="322" rx="5" ry="4"/><ellipse cx="248" cy="322" rx="5" ry="4"/></g>
      <path d="M226 342 q14 8 28 0" fill="none" ${s(3)}/>`,
  };
