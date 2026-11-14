import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#ffe6b8", "#fff8e2", "#e8c86a", 520)}${sun(400, 90, 40)}${cloud(30, 100, 0.6)}
      ${tufts([[40, 540], [160, 610], [420, 600]], "#a08a2e")}${stones([[440, 560, 22]], "#c9b48a")}
      <g transform="translate(60 520)"><path d="M0 0 V-80" stroke="#8a5a2e" stroke-width="12"/><ellipse cx="0" cy="-90" rx="50" ry="18" fill="#6cb04a" ${S}/></g>`,
    fg: `<g fill="none" stroke="#f2a6a0" stroke-width="16" stroke-linecap="round"><path d="M220 440 L200 520 L210 580"/><path d="M280 440 L300 520 L290 580"/></g>
      <g fill="none" ${s(4)}><path d="M212 440 L192 520 L202 580 M228 440 L208 520 L218 580 M272 440 L292 520 L282 580 M288 440 L308 520 L298 580"/></g>
      <path d="M190 584 h36 M274 584 h36" ${s(6)}/>
      <ellipse cx="260" cy="400" rx="120" ry="70" fill="#6e6874" ${S}/>
      <path d="M370 380 q40 -20 50 10 q-20 30 -50 20Z" fill="#fff" ${S}/>
      <path d="M180 380 q30 30 80 20 q60 -10 90 -40" fill="none" stroke="#8c8692" stroke-width="10" stroke-linecap="round"/>
      <path d="M170 380 Q130 300 150 220" fill="none" stroke="${K}" stroke-width="36" stroke-linecap="round"/>
      <path d="M170 380 Q130 300 150 220" fill="none" stroke="#f2b6b0" stroke-width="24" stroke-linecap="round"/>
      <ellipse cx="160" cy="200" rx="40" ry="30" fill="#f2b6b0" ${S}/>
      <circle cx="166" cy="194" r="18" fill="#fff" ${S}/><circle cx="170" cy="196" r="10" fill="${K}"/><circle cx="174" cy="190" r="4" fill="#fff"/>
      <path d="M124 206 L96 214 L124 220Z" fill="#e8b878" ${s(3)}/>`,
  };
