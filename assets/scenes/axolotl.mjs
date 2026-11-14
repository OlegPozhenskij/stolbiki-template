import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#9fe3e0", "#5fb9c4")}
      <g fill="#fff" opacity=".12"><path d="M60 0 L160 0 L280 640 L120 640Z"/><path d="M330 0 L380 0 L480 420 L480 560Z"/></g>
      <path d="M0 560 Q120 530 240 556 T480 548 V640 H0Z" fill="#e8c98f"/><path d="M0 560 Q120 530 240 556 T480 548" fill="none" ${S}/>
      ${stones([[60, 580, 26], [420, 590, 30], [300, 610, 18]])}
      <g fill="none" stroke="#3f9b5a" stroke-width="10" stroke-linecap="round"><path d="M30 570 q-20 -90 10 -170 q16 -50 -6 -110"/><path d="M450 570 q24 -100 -6 -190 q-14 -40 8 -90"/><path d="M110 580 q10 -60 -8 -100"/></g>
      <g fill="#5cc27a" ${s(3)}><ellipse cx="44" cy="330" rx="20" ry="9" transform="rotate(-30 44 330)"/><ellipse cx="438" cy="300" rx="20" ry="9" transform="rotate(30 438 300)"/><ellipse cx="20" cy="440" rx="18" ry="8"/></g>
      ${bubbles([[90, 160, 10], [110, 120, 6], [380, 140, 9], [400, 100, 5], [420, 420, 8]])}
      ${fish(380, 220, 0.9, "#ff9a3c", true)}${fish(90, 260, 0.8, "#ffd23f")}`,
    fg: `<path d="M330 430 Q420 420 450 370 Q430 450 340 470Z" fill="#ffb3c7" ${S}/>
      <path d="M150 440 Q140 360 240 350 Q340 350 350 440 Q340 490 240 492 Q150 490 150 440Z" fill="#ffb3c7" ${S}/>
      <g fill="#ffb3c7" ${s(5)}><path d="M180 480 l-20 50 l30 -6 Z"/><path d="M300 480 l18 50 l-30 -6Z"/></g>
      <g fill="#ff6f9a" ${s(4)}>
        <path d="M150 300 q-50 -30 -70 -10 q30 20 66 30Z"/><path d="M146 330 q-56 -6 -70 20 q36 6 70 -6Z"/><path d="M152 356 q-50 16 -56 48 q34 -14 60 -30Z"/>
        <path d="M330 300 q50 -30 70 -10 q-30 20 -66 30Z"/><path d="M334 330 q56 -6 70 20 q-36 6 -70 -6Z"/><path d="M328 356 q50 16 56 48 q-34 -14 -60 -30Z"/>
      </g>
      <ellipse cx="240" cy="320" rx="100" ry="76" fill="#ffc4d4" ${S}/>
      ${eye(196, 306, 13)}${eye(284, 306, 13)}
      <path d="M190 344 q50 34 100 0" fill="none" ${s(5)}/>
      <circle cx="172" cy="338" r="9" fill="#ff7aa0" opacity=".6"/><circle cx="308" cy="338" r="9" fill="#ff7aa0" opacity=".6"/>
      <g fill="#ff9ab8"><circle cx="220" cy="410" r="5"/><circle cx="270" cy="420" r="4"/><circle cx="300" cy="400" r="4"/></g>`,
  };
