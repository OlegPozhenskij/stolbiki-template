import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d0f0d8", "#f0fbf2", "#9fd27a", 440)}${sun(400, 80, 34)}${cloud(40, 90, 0.6)}
      <path d="M0 520 Q240 500 480 520 V640 H0Z" fill="#7cbfa8"/><path d="M0 520 Q240 500 480 520" fill="none" ${S}/>
      <g fill="#7cc25a" ${s(3)}><ellipse cx="80" cy="580" rx="40" ry="12"/><ellipse cx="380" cy="600" rx="44" ry="12"/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M450 450 q8 -90 -6 -160"/><path d="M30 450 q-4 -80 10 -140"/></g>`,
    fg: `<path d="M380 420 Q470 430 470 470 Q430 470 380 460Z" fill="#5fae5a" ${S}/>
      <path d="M120 420 Q140 360 260 360 Q380 370 390 430 Q370 480 260 484 Q140 480 120 420Z" fill="#6cbf64" ${S}/>
      <path d="M180 366 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14" fill="none" ${s(4)}/>
      <g fill="#6cbf64" ${s(5)}><path d="M170 470 l-20 40 h36Z"/><path d="M330 470 l20 40 h-36Z"/></g>
      <path d="M150 400 L30 410 Q20 430 40 440 L150 444Z" fill="#7ad070" ${S}/>
      <path d="M44 440 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12" fill="#fff" ${s(3)}/>
      <circle cx="140" cy="370" r="22" fill="#7ad070" ${S}/>${eye(140, 368, 10)}
      <g fill="${K}"><circle cx="40" cy="416" r="4"/></g>`,
  };
