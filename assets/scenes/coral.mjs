import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#4f8fc8", "#2f6aa0")}
      <g fill="#fff" opacity=".1"><path d="M120 0 L220 0 L320 640 L80 640Z"/></g>
      <path d="M0 560 Q160 530 300 556 T480 548 V640 H0Z" fill="#8a7a6a"/><path d="M0 560 Q160 530 300 556 T480 548" fill="none" ${S}/>
      ${stones([[60, 580, 26], [420, 590, 30]], "#a8988a")}
      ${bubbles([[80, 160, 9], [96, 124, 5], [400, 300, 8]])}${fish(400, 160, 0.9, "#ffd23f", true)}${fish(70, 380, 0.85, "#ff9ec4")}
      <g fill="#fff" opacity=".5"><circle cx="160" cy="100" r="3"/><circle cx="320" cy="140" r="2"/><circle cx="380" cy="420" r="3"/><circle cx="120" cy="480" r="2"/></g>`,
    fg: `<g fill="none" stroke="${K}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round">
        <path d="M240 560 V420 L170 340 L140 250 M170 340 L110 320 M240 420 L320 330 L350 240 M320 330 L380 310 M240 470 L300 450 L360 440 M240 480 L180 460 L120 450"/></g>
      <g fill="none" stroke="#5a3a2a" stroke-width="22" stroke-linecap="round" stroke-linejoin="round">
        <path d="M240 560 V420 L170 340 L140 250 M170 340 L110 320 M240 420 L320 330 L350 240 M320 330 L380 310 M240 470 L300 450 L360 440 M240 480 L180 460 L120 450"/></g>
      <g fill="#ff9a5a" ${s(3)}><circle cx="140" cy="244" r="14"/><circle cx="110" cy="316" r="12"/><circle cx="350" cy="234" r="14"/><circle cx="384" cy="306" r="12"/><circle cx="364" cy="440" r="12"/><circle cx="116" cy="450" r="12"/><circle cx="170" cy="300" r="9"/><circle cx="330" cy="290" r="9"/><circle cx="200" cy="380" r="9"/><circle cx="290" cy="380" r="9"/></g>
      <g fill="#fff"><circle cx="140" cy="240" r="4"/><circle cx="350" cy="230" r="4"/><circle cx="110" cy="312" r="3"/><circle cx="384" cy="302" r="3"/></g>
      ${eye(226, 510, 10)}${eye(256, 510, 10)}
      <path d="M232 536 q10 8 20 0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`,
  };
