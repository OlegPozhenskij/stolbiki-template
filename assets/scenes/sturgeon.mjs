import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${water("#b4e0d8", "#6aaec0", "#d8c89a")}${weeds([30, 450])}${stones([[120, 600, 22], [360, 610, 18]])}
      ${bubbles([[90, 150, 9], [104, 118, 5], [400, 180, 8]])}${fish(400, 260, 0.85, "#ffd23f", true)}`,
    fg: `<path d="M370 380 L450 320 L430 390 L460 450Z" fill="#8a9a84" ${S}/>
      <path d="M50 400 Q90 340 220 336 Q340 340 380 390 Q340 440 220 444 Q100 444 50 400Z" fill="#a8b49a" ${S}/>
      <path d="M70 412 Q160 440 260 436 Q330 432 360 410" fill="none" stroke="#e8ecd8" stroke-width="12" stroke-linecap="round"/>
      <g fill="#e8e2c8" ${s(3)}><path d="M120 344 l10 -14 l10 14Z"/><path d="M160 338 l10 -14 l10 14Z"/><path d="M200 336 l10 -14 l10 14Z"/><path d="M240 336 l10 -14 l10 14Z"/><path d="M280 340 l10 -14 l10 14Z"/><path d="M320 350 l10 -14 l10 14Z"/></g>
      <g fill="#e8e2c8" ${s(3)}><path d="M140 400 l10 -10 l10 10 l-10 10Z"/><path d="M190 404 l10 -10 l10 10 l-10 10Z"/><path d="M240 404 l10 -10 l10 10 l-10 10Z"/><path d="M290 400 l10 -10 l10 10 l-10 10Z"/></g>
      <path d="M200 440 L180 480 L230 444Z" fill="#8a9a84" ${S}/>
      ${eye(100, 380, 9)}
      <path d="M60 414 l-6 20 M72 418 l-2 22 M84 420 l2 20" ${s(3)}/>`,
  };
