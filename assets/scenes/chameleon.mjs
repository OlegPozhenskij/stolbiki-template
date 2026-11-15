import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffe3b0", "#fff6e0", "#e0b878", 500)}${sun(80, 90, 40)}${cloud(300, 80, 0.6)}
      <path d="M0 395 Q120 385 240 395 Q360 405 480 385" fill="none" stroke="#8a5a2e" stroke-width="22" stroke-linecap="round"/>
      <path d="M0 395 Q120 385 240 395 Q360 405 480 385" fill="none" stroke="${K}" stroke-width="4" opacity=".6"/>
      <g fill="#7cc25a" ${s(3)}><ellipse cx="60" cy="370" rx="22" ry="10" transform="rotate(-20 60 370)"/><ellipse cx="430" cy="365" rx="22" ry="10" transform="rotate(20 430 365)"/></g>
      <g transform="translate(360 560)"><ellipse cx="0" cy="0" rx="60" ry="18" fill="#c99a5a" ${S}/><g fill="#fff6dc" ${s(3)}><ellipse cx="-22" cy="-10" rx="11" ry="14"/><ellipse cx="0" cy="-14" rx="11" ry="14"/><ellipse cx="22" cy="-10" rx="11" ry="14"/></g></g>
      ${tufts([[40, 520], [200, 540], [460, 520]], "#a08a2e")}`,
    fg: `<g transform="translate(240 390) scale(1.35) translate(-240 -390)"><path d="M320 360 Q400 360 400 420 Q400 470 360 470 Q330 470 330 440 Q330 420 352 420" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/>
      <path d="M320 360 Q400 360 400 420 Q400 470 360 470 Q330 470 330 440 Q330 420 352 420" fill="none" stroke="#5cb84a" stroke-width="18" stroke-linecap="round"/>
      <path d="M120 330 Q150 250 250 260 Q340 270 340 330 Q300 360 230 362 Q150 362 120 330Z" fill="#6cc85a" ${S}/>
      <path d="M150 268 l16 -14 l14 12 l16 -14 l14 12 l16 -14 l14 12 l16 -12" fill="none" ${s(4)}/>
      <path d="M170 300 l20 20 M210 296 l18 22 M250 300 l18 20 M290 304 l14 18" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>
      <g fill="#6cc85a" ${s(5)}><path d="M170 356 l-10 30 h24Z"/><path d="M290 356 l10 30 h-24Z"/></g>
      <path d="M130 316 Q80 300 80 270 Q100 240 150 260Z" fill="#7ad468" ${S}/>
      <circle cx="122" cy="282" r="20" fill="#7ad468" ${S}/>${eye(122, 282, 9)}
      <path d="M84 290 q16 8 30 2" fill="none" ${s(3)}/></g>`,
  };
