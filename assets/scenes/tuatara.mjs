import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d4f0dc", "#f2fbf4", "#a8cf7a", 470)}${cloud(300, 70, 0.6)}${sun(80, 90, 30)}
      ${stones([[60, 500, 40], [420, 520, 46], [300, 610, 26]], "#b9b0a6")}
      <g fill="#6cb04a" ${s(3)}><path d="M20 470 q30 -80 70 -100 q-20 60 -40 100Z"/><path d="M460 470 q-30 -80 -70 -100 q20 60 40 100Z"/></g>
      ${tufts([[200, 480], [120, 610]])}`,
    fg: `<path d="M340 440 Q440 440 450 500 Q400 480 340 470Z" fill="#8a9a6a" ${S}/>
      <path d="M120 430 Q150 360 250 360 Q350 364 350 440 Q320 480 240 482 Q150 480 120 430Z" fill="#9aaa78" ${S}/>
      <path d="M150 372 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18" fill="#fffaf0" ${s(3)}/>
      <g fill="#c4c89a"><circle cx="200" cy="420" r="6"/><circle cx="240" cy="440" r="5"/><circle cx="280" cy="420" r="6"/><circle cx="310" cy="440" r="4"/></g>
      <g fill="#9aaa78" ${s(5)}><path d="M170 470 l-24 40 h40Z"/><path d="M310 470 l20 40 h-38Z"/></g>
      <path d="M140 420 Q90 420 70 400 Q70 360 110 350 Q150 350 160 380Z" fill="#a8b884" ${S}/>
      <circle cx="116" cy="352" r="5" fill="#ffd23f" ${s(2)}/>
      ${eye(112, 376, 10)}
      <path d="M74 400 q16 6 30 0" fill="none" ${s(3)}/>
      <g transform="translate(400 540) scale(.45)"><path d="M120 430 Q150 360 250 360 Q350 364 350 440 Q320 480 240 482 Q150 480 120 430Z" fill="#9aaa78" ${S}/><path d="M140 420 Q90 420 70 400 Q70 360 110 350 Q150 350 160 380Z" fill="#a8b884" ${S}/>${eye(112, 376, 14)}</g>`,
  };
