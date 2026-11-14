import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#9fd8ff", "#e6f6ff")}
      ${sun(70, 80, 38)}${cloud(300, 70, 0.8)}${cloud(180, 140, 0.5)}
      <path d="M0 440 Q240 400 480 440 V640 H0Z" fill="#8fd16a"/><path d="M0 440 Q240 400 480 440" fill="none" ${S}/>
      ${tufts([[40, 470], [140, 500], [420, 480], [300, 600], [80, 610], [460, 590]])}
      ${flower(60, 500, "#ff8fb1", 1.4)}${flower(150, 560, "#ffd23f", 1.2)}${flower(330, 560, "#b892ff", 1.3)}${flower(420, 510, "#ff8fb1", 1.2)}${flower(240, 610, "#ffffff", 1)}
      <g transform="translate(400 300)"><path d="M-40 0 Q-40 -60 0 -60 Q40 -60 40 0 Q40 70 0 70 Q-40 70 -40 0Z" fill="#f2b440" ${S}/><path d="M-40 -20 h80 M-40 10 h80 M-36 40 h72" ${s(4)}/><ellipse cx="0" cy="30" rx="10" ry="8" fill="${K}"/></g>
      <path d="M400 240 V200" ${S}/>`,
    fg: `<g fill="#eaf7ff" opacity=".85" ${s(4)}><ellipse cx="210" cy="270" rx="46" ry="70" transform="rotate(-30 210 270)"/><ellipse cx="280" cy="268" rx="44" ry="66" transform="rotate(28 280 268)"/></g>
      <ellipse cx="250" cy="370" rx="104" ry="78" fill="#ffd23f" ${S}/>
      <path d="M190 312 q-14 58 6 118 M250 292 q-16 78 0 156 M310 306 q16 60 0 124" fill="none" stroke="${K}" stroke-width="22" stroke-linecap="round"/>
      <path d="M352 380 l26 6 l-24 10" fill="${K}"/>
      <circle cx="162" cy="352" r="56" fill="#ffd23f" ${S}/>
      ${eye(142, 340, 14)}${eye(182, 336, 14)}
      <path d="M144 374 q18 16 36 0" fill="none" ${s(4)}/>
      <circle cx="128" cy="370" r="8" fill="#ff8fb1" opacity=".7"/><circle cx="196" cy="368" r="8" fill="#ff8fb1" opacity=".7"/>
      <path d="M150 300 q-14 -36 -36 -44 M176 298 q6 -38 28 -50" fill="none" ${s(4)}/><circle cx="112" cy="254" r="7" fill="${K}"/><circle cx="206" cy="246" r="7" fill="${K}"/>
      <path d="M210 440 l-8 34 M250 446 l0 34 M290 440 l8 32" fill="none" ${s(5)}/>`,
  };
