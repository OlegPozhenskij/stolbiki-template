import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(70, 80, 34)}${cloud(260, 70, 0.6)}
      <g fill="#e8c27a" ${s(4)}><path d="M0 380 h220 M0 430 h220" fill="none"/><rect x="20" y="350" width="16" height="120"/><rect x="90" y="350" width="16" height="120"/><rect x="160" y="350" width="16" height="120"/></g>
      <g transform="translate(400 470)"><path d="M-60 0 V-80 L0 -130 L60 -80 V0Z" fill="#e2603c" ${S}/><path d="M-26 0 V-50 Q0 -74 26 -50 V0Z" fill="#5a3a2a"/><path d="M-70 -76 L0 -140 L70 -76" fill="none" stroke="#8a3a1a" stroke-width="14" stroke-linecap="round"/></g>
      <g transform="translate(120 590) rotate(-10)"><rect x="-30" y="-6" width="60" height="12" rx="6" fill="#fff" ${s(3)}/><circle cx="-32" cy="-8" r="9" fill="#fff" ${s(3)}/><circle cx="-32" cy="8" r="9" fill="#fff" ${s(3)}/><circle cx="32" cy="-8" r="9" fill="#fff" ${s(3)}/><circle cx="32" cy="8" r="9" fill="#fff" ${s(3)}/></g>
      ${tufts([[260, 480], [460, 600], [40, 620]])}`,
    fg: `<path d="M150 560 Q140 420 240 410 Q340 420 330 560Z" fill="#d9954a" ${S}/>
      <path d="M200 560 Q200 470 240 460 Q280 470 280 560Z" fill="#fff3df"/>
      <path d="M330 520 q50 -20 50 -70" fill="none" stroke="${K}" stroke-width="24" stroke-linecap="round"/><path d="M330 520 q50 -20 50 -70" fill="none" stroke="#d9954a" stroke-width="12" stroke-linecap="round"/>
      <path d="M180 430 Q240 450 300 430" fill="none" stroke="#e2453a" stroke-width="14" stroke-linecap="round"/><circle cx="240" cy="448" r="10" fill="#ffd23f" ${s(3)}/>
      <path d="M150 280 Q120 300 120 380 Q140 400 166 360Z" fill="#8a5a2e" ${S}/><path d="M330 280 Q360 300 360 380 Q340 400 314 360Z" fill="#8a5a2e" ${S}/>
      <circle cx="240" cy="330" r="86" fill="#d9954a" ${S}/>
      <ellipse cx="240" cy="372" rx="50" ry="38" fill="#fff3df"/>
      ${eye(206, 314, 13)}${eye(274, 314, 13)}
      <ellipse cx="240" cy="352" rx="18" ry="12" fill="${K}"/>
      <path d="M240 364 v10 M240 374 q-14 12 -26 2 M240 374 q14 12 26 2" fill="none" ${s(4)}/>
      <path d="M232 384 q8 26 16 0Z" fill="#f06a8a" ${s(3)}/>`,
  };
