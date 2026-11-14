import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `<rect width="480" height="640" fill="#f0c98a"/>
      <rect width="480" height="120" fill="#bfe6ff"/>${cloud(330, 50, 0.6)}${sun(70, 50, 28)}
      <path d="M0 120 Q120 104 240 120 T480 116 V150 H0Z" fill="#8fd16a"/><path d="M0 150 H480" ${S}/>
      ${tufts([[40, 122], [180, 116], [300, 120], [440, 118]])}
      <path d="M-20 300 Q120 260 240 300 T500 280 L500 560 Q360 600 240 560 T-20 580Z" fill="#d89a55" ${s(5)}/>
      <g fill="none" stroke="#b07a45" stroke-width="5" stroke-linecap="round"><path d="M60 150 q10 60 -10 110"/><path d="M60 200 q30 20 40 50"/><path d="M400 150 q-16 50 10 90"/><path d="M400 190 q-30 10 -40 40"/></g>
      ${stones([[40, 610, 18], [140, 620, 12], [420, 610, 20], [300, 230, 12], [180, 200, 9]], "#b9a28a")}
      <g fill="#c9853f"><circle cx="100" cy="230" r="4"/><circle cx="360" cy="240" r="5"/><circle cx="250" cy="620" r="4"/><circle cx="340" cy="610" r="3"/></g>`,
    fg: `<path d="M110 450 Q120 360 250 356 Q380 360 390 450 Q380 520 250 524 Q120 520 110 450Z" fill="#f7b6b0" ${S}/>
      <path d="M380 450 q40 10 56 -6" fill="none" ${s(5)}/>
      <path d="M200 380 q4 20 -2 40 M250 372 q6 22 0 46 M300 380 q4 20 -2 40 M180 470 q30 8 60 0 M270 480 q30 8 60 -4" fill="none" stroke="#e08a86" stroke-width="5" stroke-linecap="round"/>
      <g fill="#f7b6b0" ${s(5)}><ellipse cx="170" cy="526" rx="24" ry="12"/><ellipse cx="320" cy="526" rx="24" ry="12"/></g>
      <ellipse cx="150" cy="430" rx="72" ry="62" fill="#f9c2bc" ${S}/>
      <circle cx="132" cy="408" r="5" fill="${K}"/><circle cx="168" cy="406" r="5" fill="${K}"/>
      <ellipse cx="150" cy="440" rx="14" ry="10" fill="#e88a8a" ${s(3)}/>
      <g fill="#fffaf0" ${s(4)}><rect x="138" y="452" width="11" height="30" rx="3"/><rect x="151" y="452" width="11" height="30" rx="3"/></g>
      <path d="M100 430 l-36 -6 M100 444 l-34 8 M200 430 l30 -6" ${s(2)}/>`,
  };
