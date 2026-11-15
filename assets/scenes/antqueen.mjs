import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `<rect width="480" height="640" fill="#e8b878"/>
      <rect width="480" height="110" fill="#bfe6ff"/><path d="M0 110 Q120 96 240 110 T480 106 V130 H0Z" fill="#8fd16a"/><path d="M0 130 H480" ${S}/>
      ${tufts([[40, 112], [220, 108], [440, 110]])}
      <g fill="#d89a55" ${s(4)}><ellipse cx="90" cy="250" rx="70" ry="40"/><ellipse cx="400" cy="270" rx="66" ry="38"/><ellipse cx="80" cy="560" rx="70" ry="40"/><ellipse cx="410" cy="570" rx="64" ry="38"/></g>
      <path d="M90 210 Q140 160 160 130 M400 232 Q360 180 340 130" fill="none" stroke="#d89a55" stroke-width="22"/>
      <g fill="#fffaf0" ${s(3)}><ellipse cx="70" cy="560" rx="10" ry="14"/><ellipse cx="92" cy="566" rx="10" ry="14"/><ellipse cx="110" cy="556" rx="10" ry="14"/><ellipse cx="390" cy="270" rx="12" ry="8"/><ellipse cx="414" cy="276" rx="12" ry="8"/></g>
      <g fill="#8a4a2a"><ellipse cx="80" cy="250" rx="10" ry="6"/><circle cx="96" cy="250" r="5"/><ellipse cx="420" cy="572" rx="10" ry="6"/><circle cx="436" cy="572" r="5"/></g>`,
    fg: `<g fill="none" ${s(5)}><path d="M210 380 L160 440 L140 500"/><path d="M230 390 L210 470 L200 530"/><path d="M260 390 L290 460 L300 520"/><path d="M200 370 L140 380 L110 420"/><path d="M270 370 L330 390 L350 440"/><path d="M280 380 L340 430 L380 470"/></g>
      <ellipse cx="320" cy="430" rx="90" ry="70" fill="#a8582a" ${S}/>
      <path d="M260 400 q60 -30 120 0 M250 440 q70 -30 140 0 M270 480 q50 -20 100 0" fill="none" stroke="#7a3a1a" stroke-width="5"/>
      <ellipse cx="226" cy="370" rx="40" ry="30" fill="#b8683a" ${S}/>
      <circle cx="160" cy="330" r="46" fill="#b8683a" ${S}/>
      ${eye(144, 320, 11)}${eye(178, 320, 11)}
      <path d="M150 350 q10 8 20 0" fill="none" ${s(3)}/>
      <path d="M140 290 q-20 -30 -10 -60 M176 288 q10 -34 34 -46" fill="none" ${s(4)}/>
      <path d="M126 290 L132 262 L146 278 L160 256 L174 278 L188 262 L194 290Z" fill="#ffd23f" ${s(4)}/>`,
  };
