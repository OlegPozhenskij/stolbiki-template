import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `<rect width="480" height="640" fill="#fff0c4"/>
      <path d="M0 80 h480 M0 200 h480 M0 320 h480" stroke="#f5d98a" stroke-width="4"/>
      <rect x="290" y="60" width="150" height="190" rx="8" fill="#a8dcff" ${S}/><path d="M365 60 v190 M290 155 h150" ${S}/>${cloud(300, 110, 0.45)}
      <rect y="470" width="480" height="170" fill="#c98a52"/><path d="M0 470 h480" ${S}/><path d="M0 520 h480 M0 580 h480" stroke="#a86e3a" stroke-width="4"/>
      <ellipse cx="90" cy="500" rx="70" ry="18" fill="#fff" ${S}/><circle cx="80" cy="470" r="30" fill="#ff5a4a" ${S}/><path d="M80 440 q4 -16 14 -20" fill="none" ${s(4)}/><path d="M90 430 q16 -6 22 4 q-12 6 -22 -4Z" fill="#5fbf4a" ${s(3)}/>
      <rect x="380" y="400" width="60" height="80" rx="8" fill="#ffd23f" ${S}/><path d="M380 420 h60" ${s(3)}/>`,
    fg: `<g fill="#eaf6ff" opacity=".85" ${s(4)}><ellipse cx="190" cy="330" rx="40" ry="86" transform="rotate(-50 190 330)"/><ellipse cx="300" cy="330" rx="40" ry="86" transform="rotate(50 300 330)"/></g>
      <g fill="none" ${s(5)}><path d="M210 420 l-40 50 l-14 20"/><path d="M230 430 l-14 60"/><path d="M270 430 l14 60"/><path d="M290 420 l40 50 l14 20"/></g>
      <ellipse cx="250" cy="400" rx="66" ry="52" fill="#7d8a96" ${S}/>
      <path d="M200 390 q50 20 100 0 M206 414 q44 18 88 0" fill="none" stroke="#5a6672" stroke-width="5"/>
      <circle cx="250" cy="330" r="48" fill="#8d9aa6" ${S}/>
      <ellipse cx="216" cy="320" rx="26" ry="30" fill="#e2453a" ${S}/><ellipse cx="284" cy="320" rx="26" ry="30" fill="#e2453a" ${S}/>
      <circle cx="212" cy="310" r="7" fill="#fff" opacity=".8"/><circle cx="280" cy="310" r="7" fill="#fff" opacity=".8"/>
      <path d="M236 360 q14 10 28 0" fill="none" ${s(4)}/>`,
  };
