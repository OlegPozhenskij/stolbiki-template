import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${water("#a8dcf0", "#5aa8d0", "#e8d29f")}
      <g fill="none" stroke="#7a9a3a" stroke-width="16" stroke-linecap="round"><path d="M40 600 Q20 400 60 180"/><path d="M440 600 Q470 380 420 160"/></g>
      <g fill="#9ab84a" ${s(3)}><ellipse cx="70" cy="300" rx="30" ry="12" transform="rotate(-30 70 300)"/><ellipse cx="410" cy="300" rx="30" ry="12" transform="rotate(30 410 300)"/><ellipse cx="50" cy="440" rx="30" ry="12"/></g>
      ${stones([[380, 590, 26], [120, 600, 18]])}${bubbles([[200, 140, 9], [214, 110, 5]])}${fish(360, 200, 0.85, "#ffd23f", true)}`,
    fg: `<g stroke="${K}" stroke-width="12" stroke-linecap="round">
        <path d="M240 420 L240 250"/><path d="M240 420 L330 270"/><path d="M240 420 L390 340"/><path d="M240 420 L410 430"/><path d="M240 420 L380 520"/><path d="M240 420 L100 520"/><path d="M240 420 L70 430"/><path d="M240 420 L90 340"/><path d="M240 420 L150 270"/><path d="M240 420 L190 256"/><path d="M240 420 L290 256"/></g>
      <g stroke="#c43a5a" stroke-width="6" stroke-linecap="round">
        <path d="M240 420 L240 250"/><path d="M240 420 L330 270"/><path d="M240 420 L390 340"/><path d="M240 420 L410 430"/><path d="M240 420 L380 520"/><path d="M240 420 L100 520"/><path d="M240 420 L70 430"/><path d="M240 420 L90 340"/><path d="M240 420 L150 270"/><path d="M240 420 L190 256"/><path d="M240 420 L290 256"/></g>
      <ellipse cx="240" cy="440" rx="110" ry="90" fill="#d9486a" ${S}/>
      <g fill="#f58aa0"><circle cx="190" cy="400" r="6"/><circle cx="290" cy="400" r="6"/><circle cx="240" cy="380" r="6"/><circle cx="170" cy="460" r="5"/><circle cx="310" cy="460" r="5"/></g>
      ${eye(208, 440, 13)}${eye(272, 440, 13)}
      <path d="M226 474 q14 12 28 0" fill="none" ${s(4)}/>
      <g fill="#ffd1dc" ${s(2)}><circle cx="170" cy="536" r="6"/><circle cx="200" cy="546" r="6"/><circle cx="240" cy="550" r="6"/><circle cx="280" cy="546" r="6"/><circle cx="310" cy="536" r="6"/></g>`,
  };
