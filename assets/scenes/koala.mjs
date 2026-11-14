import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#c4f0dc", "#eefbf4")}${cloud(300, 70, 0.7)}${sun(70, 80, 32)}
      <path d="M220 640 V420 Q200 380 140 360 M240 420 Q270 380 340 370" fill="none" stroke="${K}" stroke-width="44" stroke-linecap="round"/>
      <path d="M220 640 V420 Q200 380 140 360 M240 420 Q270 380 340 370" fill="none" stroke="#a8826a" stroke-width="32" stroke-linecap="round"/>
      <g fill="#7cc2a0" ${s(3)}><ellipse cx="110" cy="350" rx="40" ry="14" transform="rotate(-20 110 350)"/><ellipse cx="90" cy="380" rx="34" ry="12" transform="rotate(20 90 380)"/><ellipse cx="380" cy="360" rx="40" ry="14" transform="rotate(20 380 360)"/><ellipse cx="400" cy="390" rx="34" ry="12" transform="rotate(-20 400 390)"/></g>
      <g fill="#7cc2a0" ${s(3)}><ellipse cx="60" cy="560" rx="40" ry="14"/><ellipse cx="420" cy="590" rx="40" ry="14"/></g>`,
    fg: `<ellipse cx="236" cy="470" rx="90" ry="80" fill="#a9b0b8" ${S}/>
      <ellipse cx="236" cy="490" rx="50" ry="50" fill="#e8ecef"/>
      <g fill="#a9b0b8" ${s(5)}><ellipse cx="160" cy="430" rx="22" ry="46" transform="rotate(30 160 430)"/><ellipse cx="312" cy="430" rx="22" ry="46" transform="rotate(-30 312 430)"/></g>
      <g fill="#a9b0b8" ${S}><circle cx="156" cy="300" r="46"/><circle cx="316" cy="300" r="46"/></g>
      <g fill="#f2f2f2"><circle cx="156" cy="304" r="26"/><circle cx="316" cy="304" r="26"/></g>
      <circle cx="236" cy="340" r="80" fill="#b8bec6" ${S}/>
      <path d="M196 330 q12 10 24 0 M252 330 q12 10 24 0" fill="none" ${s(5)}/>
      <ellipse cx="236" cy="368" rx="22" ry="28" fill="#4a4a52" ${s(4)}/>
      <path d="M224 404 q12 8 24 0" fill="none" ${s(4)}/>
      ${zzz(320, 250)}`,
  };
