import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#bfe8ff", "#f2fbff", "#9fd27a", 500)}${cloud(40, 90, 0.6)}${sun(80, 200, 30)}
      <path d="M400 640 V300" stroke="#3f9b34" stroke-width="8"/><g fill="#5fbf4a" ${s(3)}><ellipse cx="380" cy="420" rx="26" ry="10" transform="rotate(30 380 420)"/><ellipse cx="424" cy="460" rx="26" ry="10" transform="rotate(-30 424 460)"/></g>
      <g fill="#ff4f6a" ${s(4)}><path d="M400 300 Q360 280 350 240 Q380 250 400 270 Q420 250 450 240 Q440 280 400 300Z"/><path d="M380 340 Q340 330 330 300 Q360 300 380 316Z"/></g>
      ${tufts([[40, 520], [200, 510], [100, 610]])}${flower(80, 560, "#ffd23f", 1.1)}${flower(240, 600, "#b892ff", 1)}`,
    fg: `<g fill="#cfeaff" opacity=".8" ${s(3)}><path d="M220 320 Q180 220 230 200 Q260 260 240 330Z"/><path d="M200 330 Q140 260 170 236 Q220 280 220 340Z"/></g>
      <path d="M140 380 Q190 330 250 340 Q290 350 290 380 Q260 420 200 420 Q160 420 140 380Z" fill="#4fbf7a" ${S}/>
      <path d="M140 380 L90 420 L110 380 L80 370Z" fill="#3f9b6a" ${S}/>
      <path d="M200 412 Q230 420 260 400" fill="none" stroke="#e8f8ee" stroke-width="10" stroke-linecap="round"/>
      <circle cx="290" cy="340" r="36" fill="#4fbf7a" ${S}/>
      <path d="M270 370 Q290 386 316 366 Q300 360 270 370Z" fill="#ff4f6a" ${s(3)}/>
      ${eye(298, 332, 11)}
      <path d="M322 338 L400 312 L326 350Z" fill="#3a3a3a" ${s(3)}/>`,
  };
