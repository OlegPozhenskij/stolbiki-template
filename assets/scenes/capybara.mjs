import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#c4ecff", "#effaff", "#9fd27a", 430)}${sun(400, 80, 38)}${cloud(40, 90, 0.7)}
      <path d="M0 520 Q240 500 480 520 V640 H0Z" fill="#6cb8e6"/><path d="M0 520 Q240 500 480 520" fill="none" ${S}/>
      <path d="M30 570 q50 -12 100 0 M300 590 q60 -12 120 0" fill="none" stroke="#bfe6fb" stroke-width="6" stroke-linecap="round"/>
      ${tree(440, 440, 0.9)}${tufts([[40, 440], [180, 430]])}
      <g fill="#ffd23f" opacity=".9"><circle cx="90" cy="600" r="5"/><circle cx="380" cy="560" r="4"/></g>`,
    fg: `<path d="M90 430 Q100 320 260 320 Q380 330 390 430 Q380 520 250 524 Q110 520 90 430Z" fill="#a8743f" ${S}/>
      <g fill="#a8743f" ${s(5)}><rect x="140" y="490" width="34" height="50" rx="12"/><rect x="320" y="490" width="34" height="50" rx="12"/></g>
      <path d="M90 430 Q60 380 90 340 Q140 300 190 340 Q200 400 160 440Z" fill="#b8844f" ${S}/>
      <ellipse cx="72" cy="380" rx="22" ry="34" fill="#8a5a2e" ${S}/>
      <circle cx="160" cy="320" r="12" fill="#8a5a2e" ${S}/>
      ${eye(130, 356, 9)}
      <path d="M60 400 q14 8 26 0" fill="none" ${s(3)}/>
      <circle cx="140" cy="250" r="34" fill="#ffa23a" ${S}/><path d="M140 216 q6 -14 18 -16" fill="none" ${s(4)}/><path d="M144 210 q16 -10 26 0 q-12 8 -26 0Z" fill="#5fbf4a" ${s(3)}/>`,
  };
