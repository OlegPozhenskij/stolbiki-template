import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#d4f5d0", "#f0fbe8")}${sun(240, 70, 30)}
      <g stroke="#7cc25a" stroke-width="16" stroke-linecap="round"><path d="M40 640 V60"/><path d="M90 640 V160"/><path d="M400 640 V80"/><path d="M450 640 V140"/></g>
      <g stroke="#4f9a35" stroke-width="4"><path d="M32 200 h16 M32 360 h16 M82 300 h16 M392 240 h16 M392 420 h16 M442 300 h16"/></g>
      <g fill="#8fd16a" ${s(3)}><ellipse cx="66" cy="150" rx="26" ry="9" transform="rotate(-30 66 150)"/><ellipse cx="424" cy="190" rx="26" ry="9" transform="rotate(30 424 190)"/><ellipse cx="110" cy="260" rx="26" ry="9" transform="rotate(20 110 260)"/></g>
      <path d="M0 540 Q240 520 480 540 V640 H0Z" fill="#9fd27a"/><path d="M0 540 Q240 520 480 540" fill="none" ${S}/>`,
    fg: `<ellipse cx="240" cy="470" rx="110" ry="90" fill="#fbfbfb" ${S}/>
      <g fill="#55555e" ${S}><ellipse cx="160" cy="540" rx="40" ry="24"/><ellipse cx="320" cy="540" rx="40" ry="24"/><ellipse cx="160" cy="440" rx="26" ry="50" transform="rotate(20 160 440)"/></g>
      <path d="M300 480 L360 260" stroke="#7cc25a" stroke-width="16" stroke-linecap="round"/><path d="M300 480 L360 260" ${s(3)}/>
      <ellipse cx="320" cy="440" rx="26" ry="50" transform="rotate(-20 320 440)" fill="#55555e" ${S}/>
      <g fill="#55555e" ${S}><circle cx="172" cy="270" r="30"/><circle cx="308" cy="270" r="30"/></g>
      <circle cx="240" cy="340" r="84" fill="#fbfbfb" ${S}/>
      <g fill="#55555e"><ellipse cx="206" cy="330" rx="22" ry="28" transform="rotate(20 206 330)"/><ellipse cx="274" cy="330" rx="22" ry="28" transform="rotate(-20 274 330)"/></g>
      ${eye(208, 330, 10)}${eye(272, 330, 10)}
      <ellipse cx="240" cy="370" rx="12" ry="8" fill="${K}"/>
      <path d="M240 378 q-12 12 -22 4 M240 378 q12 12 22 4" fill="none" ${s(3)}/>`,
  };
