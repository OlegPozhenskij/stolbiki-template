import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffd1b8", "#fff0d6", "#9fd27a", 470)}${sun(400, 90, 36)}${cloud(40, 100, 0.6)}
      <ellipse cx="300" cy="570" rx="170" ry="40" fill="#7cc8e8" ${s(4)}/><path d="M200 570 q50 -10 100 0 M300 590 q40 -8 80 0" fill="none" stroke="#bfe8f7" stroke-width="5" stroke-linecap="round"/>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M30 480 q-6 -100 10 -180"/><path d="M60 480 q4 -80 -6 -140"/><path d="M450 480 q8 -90 -6 -170"/></g>
      ${flower(110, 540, "#ff9ec4", 1.1)}${tufts([[200, 480], [420, 500], [60, 600]])}`,
    fg: `<g fill="#eaf6ff" opacity=".85" ${s(4)}><ellipse cx="200" cy="300" rx="30" ry="80" transform="rotate(-40 200 300)"/><ellipse cx="290" cy="290" rx="30" ry="78" transform="rotate(40 290 290)"/></g>
      <g fill="none" ${s(4)}><path d="M220 380 Q160 420 120 520"/><path d="M236 384 Q210 450 190 540"/><path d="M262 384 Q290 450 310 540"/><path d="M276 380 Q340 420 380 520"/><path d="M228 370 Q150 360 100 420"/><path d="M272 370 Q350 360 400 420"/></g>
      <ellipse cx="250" cy="420" rx="28" ry="70" fill="#b8a07a" ${S} transform="rotate(20 250 420)"/>
      <path d="M232 380 l30 10 M226 410 l32 12 M222 440 l30 12" stroke="#7a6040" stroke-width="5" stroke-linecap="round"/>
      <circle cx="250" cy="350" r="34" fill="#b8a07a" ${S}/>
      <circle cx="226" cy="330" r="26" fill="#c8b490" ${S}/>
      ${eye(216, 324, 12)}${eye(238, 330, 9)}
      <path d="M204 344 L130 380" ${s(5)}/>
      <path d="M220 304 q-20 -30 -10 -50 M232 304 q4 -34 24 -44" fill="none" ${s(3)}/>`,
  };
