import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${water("#8fd6e8", "#4fa8cc")}${weeds([40, 450])}${stones([[100, 590, 20], [380, 600, 24]])}
      ${bubbles([[80, 160, 10], [96, 120, 6], [400, 200, 9], [420, 160, 5]])}${fish(400, 300, 0.9, "#ffd23f", true)}${fish(70, 420, 0.8, "#ff8fb1")}`,
    fg: `<g fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round">
        <path d="M180 380 Q120 420 110 480 Q100 530 140 530"/><path d="M200 400 Q170 470 190 530"/><path d="M230 410 Q220 480 250 540"/><path d="M260 410 Q280 480 270 540"/><path d="M290 400 Q330 460 320 530"/><path d="M310 380 Q370 420 380 480 Q390 530 350 530"/></g>
      <g fill="none" stroke="#ff8a4a" stroke-width="18" stroke-linecap="round">
        <path d="M180 380 Q120 420 110 480 Q100 530 140 530"/><path d="M200 400 Q170 470 190 530"/><path d="M230 410 Q220 480 250 540"/><path d="M260 410 Q280 480 270 540"/><path d="M290 400 Q330 460 320 530"/><path d="M310 380 Q370 420 380 480 Q390 530 350 530"/></g>
      <path d="M150 340 Q150 200 245 200 Q340 200 340 340 Q300 400 245 400 Q190 400 150 340Z" fill="#ff9a5a" ${S}/>
      <g fill="#ffc49a"><circle cx="200" cy="250" r="10"/><circle cx="290" cy="240" r="8"/><circle cx="250" cy="226" r="6"/></g>
      ${eye(212, 320, 15)}${eye(278, 320, 15)}
      <path d="M230 356 q15 12 30 0" fill="none" ${s(4)}/>
      ${heart(90, 260, 1.4)}${heart(400, 250, 1.4)}${heart(410, 330, 1.2)}`,
  };
