import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffe2a8", "#fff6d8", "#e8c86a", 520)}${sun(400, 90, 40)}${cloud(40, 110, 0.6)}
      <g transform="translate(430 520)"><path d="M-4 0 V-120" stroke="#8a5a2e" stroke-width="14" stroke-linecap="round"/><ellipse cx="0" cy="-130" rx="60" ry="22" fill="#6cb04a" ${S}/></g>
      ${tufts([[30, 540], [160, 600], [320, 610]], "#a08a2e")}`,
    fg: `<g fill="#f2c25a" ${S}><rect x="150" y="440" width="26" height="140" rx="10"/><rect x="290" y="440" width="26" height="140" rx="10"/></g>
      <ellipse cx="236" cy="430" rx="110" ry="60" fill="#f2c25a" ${S}/>
      <path d="M170 410 l-60 -200 l50 -10 l60 200Z" fill="#f2c25a" ${S}/>
      <g fill="#c97a2a"><circle cx="200" cy="420" r="14"/><circle cx="250" cy="440" r="16"/><circle cx="290" cy="410" r="12"/><circle cx="160" cy="330" r="10"/><circle cx="140" cy="270" r="9"/></g>
      <ellipse cx="128" cy="200" rx="50" ry="34" fill="#f2c25a" ${S} transform="rotate(-20 128 200)"/>
      <path d="M130 168 v-24 M150 172 v-22" ${S}/><g fill="#8a5a2e"><circle cx="130" cy="144" r="8"/><circle cx="150" cy="150" r="8"/></g>
      ${eye(130, 192, 9)}
      <path d="M80 214 q-20 20 -6 40 q10 -10 12 -30Z" fill="#5a5ab8" ${s(4)}/>
      <g fill="#f2c25a" ${s(4)}><rect x="200" y="460" width="26" height="120" rx="10"/><rect x="250" y="460" width="26" height="120" rx="10"/></g>`,
  };
