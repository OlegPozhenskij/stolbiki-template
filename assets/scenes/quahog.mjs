import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${water("#9ad0e0", "#4f8fb8", "#d8c89a")}${weeds([40, 440], "#5a9a6a")}${stones([[100, 600, 18], [400, 600, 24]])}
      ${bubbles([[240, 150, 10], [254, 116, 6], [230, 90, 4]])}${fish(90, 260, 0.85, "#ffd23f")}${fish(400, 220, 0.85, "#ff9a3c", true)}`,
    fg: `<path d="M100 470 Q100 330 240 320 Q380 330 380 470 Q240 500 100 470Z" fill="#c9a07a" ${S}/>
      <g fill="none" stroke="#8a6a4a" stroke-width="5"><path d="M120 450 Q130 350 240 342 Q350 350 360 450"/><path d="M140 452 Q150 372 240 366 Q330 372 340 452"/><path d="M160 456 Q170 394 240 390 Q310 394 320 456"/><path d="M180 460 Q190 416 240 414 Q290 416 300 460"/></g>
      <path d="M100 470 Q240 520 380 470 Q370 530 240 540 Q110 530 100 470Z" fill="#b88e66" ${S}/>
      <path d="M150 482 Q240 506 330 482" fill="#3a2a2a" ${s(3)}/>
      ${eye(200, 486, 9)}${eye(280, 486, 9)}
      <path d="M220 330 l20 -20 l20 20" fill="none" ${s(4)}/>`,
  };
