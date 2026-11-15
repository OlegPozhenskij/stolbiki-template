import { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart } from "./helpers.mjs";
export default {
    bg: `${sky("#b79cff", "#e7dcff")}
      <path d="M0 120 h480 M0 240 h480 M0 360 h480" stroke="#a48af0" stroke-width="3" opacity=".6"/>
      <g fill="#9b7fe8"><circle cx="40" cy="60" r="6"/><circle cx="140" cy="180" r="6"/><circle cx="60" cy="300" r="6"/><circle cx="230" cy="80" r="6"/><circle cx="440" cy="330" r="6"/></g>
      <rect x="270" y="60" width="170" height="230" rx="8" fill="#9fe0ff" ${S}/><path d="M355 60 v230 M270 175 h170" ${S}/>
      ${cloud(290, 120, 0.5)}
      <path d="M444 60 q-36 60 0 230 h22 q-28 -120 0 -230Z" fill="#ff8fb1" ${s(4)}/>
      <rect x="40" y="140" width="110" height="90" fill="#fff6d8" ${S}/><rect x="54" y="154" width="82" height="62" fill="#9ad3ff" ${s(4)}/>
      <path d="M54 216 l24 -30 l18 18 l14 -14 l26 26Z" fill="#5fc24a" ${s(3)}/><circle cx="118" cy="172" r="8" fill="#ffd84a" ${s(3)}/>
      <rect y="470" width="480" height="170" fill="#e2603c"/><path d="M0 470 h480" ${S}/>
      <path d="M0 520 q40 -18 80 0 t80 0 t80 0 t80 0 t80 0 t80 0 M0 590 q40 -18 80 0 t80 0 t80 0 t80 0 t80 0 t80 0" fill="none" stroke="#f7a07f" stroke-width="6"/>
      <circle cx="420" cy="560" r="34" fill="#6ec6ff" ${S}/>
      <path d="M392 548 q28 -14 56 6 M394 570 q30 -12 54 8 M404 532 q20 18 14 60" fill="none" ${s(3)}/>
      <path d="M386 580 q-40 20 -90 10" fill="none" stroke="#6ec6ff" stroke-width="5"/>
      ${shadow(230, 560, 150)}`,
    fg: `<path d="M330 520 Q440 520 420 420 Q410 372 372 392" fill="none" stroke="${K}" stroke-width="36" stroke-linecap="round"/>
      <path d="M330 520 Q440 520 420 420 Q410 372 372 392" fill="none" stroke="#f59a2f" stroke-width="24" stroke-linecap="round"/>
      <path d="M418 450 l18 4 M424 420 l16 -4 M404 398 l12 -10" stroke="#c96d12" stroke-width="7" stroke-linecap="round"/>
      <path d="M130 548 Q110 380 230 370 Q350 380 336 548Z" fill="#f59a2f" ${S}/>
      <path d="M186 548 Q180 440 232 432 Q286 440 280 548Z" fill="#fff3df"/>
      <path d="M150 440 q20 8 36 -4 M146 480 q20 8 36 -4 M316 440 q-20 8 -36 -4 M320 480 q-20 8 -36 -4" fill="none" stroke="#c96d12" stroke-width="7" stroke-linecap="round"/>
      <path d="M140 250 L150 150 L214 214Z" fill="#f59a2f" ${S}/><path d="M326 250 L318 150 L254 214Z" fill="#f59a2f" ${S}/>
      <path d="M160 222 L160 176 L190 208Z" fill="#f7b7c3"/><path d="M308 222 L310 176 L280 208Z" fill="#f7b7c3"/>
      <path d="M158 196 l12 4 M156 210 l12 2 M310 196 l-12 4 M312 210 l-12 2" ${s(2)}/>
      <ellipse cx="234" cy="290" rx="112" ry="96" fill="#f59a2f" ${S}/>
      <path d="M214 200 v30 M234 196 v36 M254 200 v30" stroke="#c96d12" stroke-width="7" stroke-linecap="round"/>
      <path d="M128 290 l20 4 M130 310 l18 0 M340 290 l-20 4 M338 310 l-18 0" stroke="#c96d12" stroke-width="6" stroke-linecap="round"/>
      <ellipse cx="234" cy="330" rx="56" ry="40" fill="#fff3df"/>
      ${eye(192, 284, 18)}${eye(276, 284, 18)}
      <path d="M224 316 h20 l-10 12Z" fill="#f06a8a" ${s(4)}/>
      <path d="M234 330 q-14 18 -30 6 M234 330 q14 18 30 6" fill="none" ${s(4)}/>
      <g fill="${K}"><circle cx="206" cy="332" r="2.5"/><circle cx="198" cy="340" r="2.5"/><circle cx="262" cy="332" r="2.5"/><circle cx="270" cy="340" r="2.5"/></g>
      <path d="M170 320 l-70 -10 M170 334 l-70 10 M298 320 l70 -10 M298 334 l70 10" ${s(3)}/>
      <ellipse cx="190" cy="548" rx="34" ry="18" fill="#fff3df" ${S}/><ellipse cx="276" cy="548" rx="34" ry="18" fill="#fff3df" ${S}/>
      <path d="M180 540 v12 M196 540 v12 M266 540 v12 M282 540 v12" ${s(3)}/>`,
  };
