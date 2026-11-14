import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(400, 80, 34)}${cloud(80, 80, 0.7)}
      <g fill="#e8c27a" ${s(4)}><rect x="20" y="380" width="14" height="100"/><rect x="120" y="384" width="14" height="96"/><rect x="380" y="386" width="14" height="94"/><rect x="450" y="380" width="14" height="100"/></g>
      <path d="M0 400 h150 M0 440 h150 M370 404 h110 M370 444 h110" stroke="#e8c27a" stroke-width="10"/>
      ${tufts([[60, 500], [220, 610], [430, 560]])}${flower(120, 590, "#ffd23f", 1)}${flower(380, 610, "#ff8fb1", 1)}`,
    fg: `<g fill="#b06a3a" ${S}><rect x="150" y="410" width="30" height="140" rx="10"/><rect x="320" y="410" width="30" height="140" rx="10"/></g>
      <path d="M150 548 h30 M320 548 h30" stroke="${K}" stroke-width="12"/>
      <path d="M350 360 q60 10 50 110 q-20 -40 -40 -60Z" fill="#6a3a1e" ${S}/>
      <ellipse cx="260" cy="390" rx="110" ry="60" fill="#c07a44" ${S}/>
      <g fill="#c07a44" ${s(5)}><rect x="190" y="420" width="30" height="130" rx="10"/><rect x="290" y="420" width="30" height="130" rx="10"/></g>
      <path d="M190 548 h30 M290 548 h30" stroke="${K}" stroke-width="12"/>
      <path d="M180 380 L120 260 L170 240 L220 360Z" fill="#c07a44" ${S}/>
      <path d="M124 250 Q150 270 176 340 Q190 300 168 240Z" fill="#6a3a1e" ${s(4)}/>
      <path d="M140 230 Q80 230 70 280 Q80 310 120 300 L170 270Z" fill="#c07a44" ${S}/>
      <path d="M150 230 l6 -26 l14 24" fill="#c07a44" ${s(4)}/>
      <path d="M124 252 q10 8 20 0" fill="none" ${s(4)}/>
      <ellipse cx="82" cy="284" rx="6" ry="4" fill="${K}"/>
      ${zzz(40, 200)}`,
  };
