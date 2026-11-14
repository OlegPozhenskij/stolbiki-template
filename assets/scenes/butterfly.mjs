import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${land("#d4f0ff", "#f4fcff", "#9fd27a", 480)}${sun(400, 90, 36)}${cloud(40, 90, 0.7)}${cloud(250, 150, 0.45)}
      ${flower(70, 530, "#ff8fb1", 1.5)}${flower(180, 590, "#ffd23f", 1.3)}${flower(330, 550, "#b892ff", 1.4)}${flower(430, 600, "#ff8fb1", 1.2)}${flower(260, 620, "#ffffff", 1)}
      ${tufts([[30, 490], [140, 500], [400, 490], [460, 530]])}`,
    fg: `<g ${S}>
        <path d="M228 360 C150 250 70 270 86 340 C96 400 170 410 228 384Z" fill="#ffb3d1"/>
        <path d="M252 360 C330 250 410 270 394 340 C384 400 310 410 252 384Z" fill="#ffb3d1"/>
        <path d="M228 392 C170 400 136 440 156 474 C180 500 220 460 232 404Z" fill="#c9a8ff"/>
        <path d="M252 392 C310 400 344 440 324 474 C300 500 260 460 248 404Z" fill="#c9a8ff"/></g>
      <g fill="#fff6a8" ${s(3)}><circle cx="130" cy="330" r="16"/><circle cx="350" cy="330" r="16"/><circle cx="176" cy="372" r="9"/><circle cx="304" cy="372" r="9"/></g>
      <g fill="#ffffff" opacity=".9"><circle cx="186" cy="448" r="8"/><circle cx="294" cy="448" r="8"/></g>
      <ellipse cx="240" cy="420" rx="18" ry="54" fill="#ffd9a8" ${S}/>
      <path d="M224 404 h32 M224 426 h32 M228 448 h24" stroke="#f2b46a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="240" cy="340" r="44" fill="#ffd9a8" ${S}/>
      ${eye(222, 334, 12)}${eye(258, 334, 12)}
      <circle cx="210" cy="356" r="8" fill="#ff8fb1" opacity=".75"/><circle cx="270" cy="356" r="8" fill="#ff8fb1" opacity=".75"/>
      <path d="M228 358 q12 12 24 0" fill="none" ${s(4)}/>
      <path d="M226 300 q-10 -34 -34 -44 M254 300 q10 -34 34 -44" fill="none" ${s(4)}/>
      ${heart(190, 254, 1.3, "#ff6f8f")}${heart(290, 254, 1.3, "#ff6f8f")}`,
  };
