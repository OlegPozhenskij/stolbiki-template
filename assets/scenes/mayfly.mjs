import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#ffd9a8", "#fff3c9")}
      ${sun(400, 90, 40)}${cloud(40, 110, 0.8)}${cloud(250, 60, 0.55)}
      <path d="M0 470 Q240 440 480 470 V640 H0Z" fill="#7cc8e8"/><path d="M0 470 Q240 440 480 470" fill="none" ${S}/>
      <path d="M40 530 q60 -14 120 0 M260 560 q70 -14 140 0 M120 600 q50 -10 100 0" fill="none" stroke="#bfe8f7" stroke-width="6" stroke-linecap="round"/>
      <g fill="#5fbf4a" ${s(4)}><ellipse cx="90" cy="560" rx="46" ry="14"/><ellipse cx="380" cy="600" rx="52" ry="15"/></g>
      ${flower(380, 584, "#ff9ec4", 0.9)}
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M24 480 q-6 -120 10 -220"/><path d="M48 480 q4 -100 -6 -180"/><path d="M450 470 q8 -110 -6 -200"/><path d="M430 470 q-4 -80 6 -140"/></g>
      <g fill="#a5683a" ${s(3)}><rect x="26" y="240" width="16" height="44" rx="8"/><rect x="438" y="252" width="16" height="44" rx="8"/></g>
      ${birdV(200, 130, 1.1)}${birdV(240, 150, 0.9)}
      <g fill="#ffb347"><circle cx="120" cy="380" r="4"/><circle cx="360" cy="330" r="4"/><circle cx="300" cy="420" r="3"/></g>`,
    fg: `<g transform="translate(0 50)"><g fill="#e8f6ff" opacity=".85" ${s(4)}><path d="M220 330 Q170 170 250 140 Q290 200 250 330Z"/><path d="M250 330 Q300 190 370 200 Q360 280 268 336Z"/></g>
      <path d="M232 300 L244 180 M256 316 L330 214" fill="none" stroke="#9fc7e0" stroke-width="3"/>
      <path d="M150 410 Q200 370 290 344 Q330 334 350 350 Q340 372 300 380 Q220 400 160 422Z" fill="#c98a3c" ${S}/>
      <path d="M200 386 l6 18 M230 374 l6 18 M260 364 l6 16" stroke="#8a5a1e" stroke-width="5" stroke-linecap="round"/>
      <g fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"><path d="M156 416 Q100 440 60 500"/><path d="M152 410 Q96 410 50 450"/><path d="M158 420 Q120 470 100 540"/></g>
      <path d="M290 372 l-14 40 M310 368 l2 42 M330 362 l18 36" fill="none" ${s(3)}/>
      <circle cx="350" cy="346" r="22" fill="#c98a3c" ${S}/>
      ${eye(346, 340, 10)}${eye(366, 350, 8)}
      <path d="M362 330 q10 -30 30 -40 M354 328 q-2 -30 10 -46" fill="none" ${s(3)}/></g>`,
  };
