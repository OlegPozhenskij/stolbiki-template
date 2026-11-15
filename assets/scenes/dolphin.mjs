import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${water("#9ad8f0", "#4f9fd0", "#e8d29f")}${weeds([40, 440])}${bubbles([[100, 140, 10], [118, 108, 6], [380, 120, 8]])}
      ${fish(380, 520, 0.9, "#ffd23f", true)}${fish(90, 480, 0.85, "#ff9a3c")}`,
    fg: `<path d="M100 420 Q120 300 260 290 Q370 290 400 340 Q420 380 380 400 Q300 440 200 440 Q140 440 100 420Z" fill="#8fb6d8" ${S}/>
      <path d="M130 430 Q220 430 300 410 Q360 396 384 396 Q340 432 220 444Z" fill="#e8f2fb"/>
      <path d="M250 296 L280 230 L310 300Z" fill="#7ea4c8" ${S}/>
      <path d="M120 420 L60 390 L70 440 L50 480 L130 440Z" fill="#7ea4c8" ${S}/>
      <path d="M260 420 L240 470 L290 428Z" fill="#7ea4c8" ${S}/>
      <path d="M396 360 Q440 360 444 376 Q420 388 396 384Z" fill="#8fb6d8" ${S}/>
      ${eye(350, 340, 11)}
      <path d="M396 384 q-30 10 -60 0" fill="none" ${s(4)}/>
      ${zzz(200, 250)}`,
  };
