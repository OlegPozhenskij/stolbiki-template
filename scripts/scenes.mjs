// Сцены для карандашной версии. Каждая сцена = фон (bg) + животное (fg).
// Животное рисуется отдельным слоем, чтобы в ролике оно могло немного подвигаться, а фон стоял.
// Пишет public/art/<id>-bg.svg и public/art/<id>-fg.svg (480x640).
import { writeFileSync, mkdirSync, readFileSync } from "node:fs";

const K = "#1d1b2e"; // контур
const S = `stroke="${K}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
const s = (w) => `stroke="${K}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const eye = (x, y, r = 13) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${S}/><circle cx="${x + r * 0.2}" cy="${y + r * 0.1}" r="${r * 0.48}" fill="${K}"/><circle cx="${x + r * 0.4}" cy="${y - r * 0.2}" r="${r * 0.17}" fill="#fff"/>`;
const cloud = (x, y, k = 1) =>
  `<g transform="translate(${x} ${y}) scale(${k})" fill="#fff" opacity=".92"><circle cx="0" cy="0" r="26"/><circle cx="30" cy="-12" r="32"/><circle cx="64" cy="0" r="24"/><rect x="0" y="0" width="64" height="24" rx="12"/></g>`;
const sun = (x, y, r = 46) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffd84a" ${S}/>` +
  [0, 45, 90, 135, 180, 225, 270, 315]
    .map((a) => {
      const c = Math.cos((a * Math.PI) / 180), d = Math.sin((a * Math.PI) / 180);
      return `<path d="M${x + c * (r + 12)} ${y + d * (r + 12)} L${x + c * (r + 30)} ${y + d * (r + 30)}" stroke="#f5b21a" stroke-width="7" stroke-linecap="round"/>`;
    })
    .join("");
const sky = (a, b) =>
  `<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="480" height="640" fill="url(#g)"/>`;
const shadow = (x, y, rx) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${rx * 0.16}" fill="#000" opacity=".18"/>`;
const bubbles = (pts) =>
  pts.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#fff" stroke-width="4" opacity=".6"/>`).join("");
const tufts = (pts, c = "#3f8f2e") =>
  pts.map(([x, y]) => `<path d="M${x - 10} ${y} q4 -22 8 -2 q4 -26 8 -1 q5 -20 8 2" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`).join("");
const stones = (pts, c = "#9a8f84") =>
  pts.map(([x, y, r]) => `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * 0.65}" fill="${c}" ${s(4)}/>`).join("");
const flower = (x, y, c = "#ff8fb1", k = 1) =>
  `<path d="M${x} ${y + 34 * k} V${y + 8 * k}" stroke="#3f9b34" stroke-width="5" stroke-linecap="round"/>` +
  `<g fill="${c}" ${s(3)}><circle cx="${x}" cy="${y - 9 * k}" r="${8 * k}"/><circle cx="${x + 9 * k}" cy="${y}" r="${8 * k}"/><circle cx="${x}" cy="${y + 9 * k}" r="${8 * k}"/><circle cx="${x - 9 * k}" cy="${y}" r="${8 * k}"/></g><circle cx="${x}" cy="${y}" r="${5 * k}" fill="#ffd23f" ${s(3)}/>`;
const fish = (x, y, k = 1, c = "#ff9a3c", flip = false) =>
  `<g transform="translate(${x} ${y}) scale(${flip ? -k : k} ${k})"><path d="M-22 0 Q-6 -14 14 0 Q-6 14 -22 0Z" fill="${c}" ${s(3)}/><path d="M-20 0 L-34 -10 L-32 10Z" fill="${c}" ${s(3)}/><circle cx="6" cy="-2" r="2.5" fill="${K}"/></g>`;
const birdV = (x, y, k = 1) =>
  `<path d="M${x - 12 * k} ${y} q6 -8 12 0 q6 -8 12 0" fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"/>`;
const svg = (inner) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 640" width="480" height="640">${inner}</svg>`;

// Общие фоны и детали (для сцен ниже)
const land = (a, b, g, y = 460) =>
  `${sky(a, b)}<path d="M0 ${y} Q240 ${y - 30} 480 ${y} V640 H0Z" fill="${g}"/><path d="M0 ${y} Q240 ${y - 30} 480 ${y}" fill="none" ${S}/>`;
const water = (a, b, sand = "#e8c98f") =>
  `${sky(a, b)}<g fill="#fff" opacity=".12"><path d="M60 0 L160 0 L280 640 L120 640Z"/><path d="M330 0 L380 0 L480 420 L480 560Z"/></g><path d="M0 570 Q120 545 240 568 T480 560 V640 H0Z" fill="${sand}"/><path d="M0 570 Q120 545 240 568 T480 560" fill="none" ${S}/>`;
const weeds = (xs, c = "#3f9b5a") =>
  xs.map((x) => `<path d="M${x} 580 q-16 -60 6 -120 q12 -40 -4 -80" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`).join("");
const tree = (x, y, k = 1, c = "#6cb04a") =>
  `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 0 V-90" stroke="#8a5a2e" stroke-width="16" stroke-linecap="round"/><circle cx="0" cy="-120" r="50" fill="${c}" ${S}/><circle cx="-34" cy="-96" r="30" fill="${c}"/><circle cx="34" cy="-98" r="32" fill="${c}"/></g>`;
const zzz = (x, y) => `<g fill="none" ${s(4)}><path d="M${x} ${y} h18 l-18 18 h18"/><path d="M${x + 26} ${y - 30} h12 l-12 12 h12"/></g>`;
const heart = (x, y, k = 1, c = "#ff6f8f") => `<path transform="translate(${x} ${y}) scale(${k})" d="M0 8 C-14 -6 -10 -16 0 -8 C10 -16 14 -6 0 8Z" fill="${c}" ${s(3)}/>`;

export const scenes = {
  // 4. Рыжая кошка в комнате
  cat: {
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
  },

  // 12. «Бессмертная» медуза
  jellyfish: {
    bg: `${sky("#3a7cc0", "#1a4f86")}
      <g fill="#fff" opacity=".07"><path d="M80 0 L200 0 L330 640 L150 640Z"/><path d="M320 0 L380 0 L480 480 L480 640 L440 640Z"/></g>
      <path d="M0 600 Q120 570 240 598 T480 590 V640 H0Z" fill="#163c66"/>
      <g fill="#2a6a9a" ${s(4)}><path d="M30 610 q-6 -60 12 -96 q12 50 4 96Z"/><path d="M440 610 q-4 -50 16 -84 q8 46 -2 84Z"/></g>
      ${bubbles([[70, 120, 10], [96, 80, 6], [400, 520, 12], [420, 470, 7], [60, 520, 8]])}
      ${fish(380, 120, 0.95, "#ffd23f", true)}${fish(430, 165, 0.75, "#ffd23f", true)}${fish(80, 400, 0.95, "#ff9a3c")}
      <g fill="#fff" opacity=".45"><circle cx="160" cy="100" r="3"/><circle cx="330" cy="80" r="2"/><circle cx="100" cy="300" r="3"/><circle cx="380" cy="380" r="2"/><circle cx="210" cy="560" r="3"/><circle cx="300" cy="540" r="2"/><circle cx="420" cy="260" r="3"/></g>
      <g transform="translate(110 520) scale(.35)" opacity=".8"><path d="M0 0 Q0 -60 40 -60 Q80 -60 80 0Z" fill="#ffb3d9" ${S}/><path d="M20 0 v40 M40 0 v50 M60 0 v40" fill="none" stroke="#ffd1e8" stroke-width="8"/></g>`,
    fg: `<g fill="none" stroke="#ffd1e8" stroke-width="5" stroke-linecap="round" opacity=".95">
        <path d="M160 340 q-20 60 6 120 q20 50 -6 110"/><path d="M200 350 q20 70 -6 130 q-20 50 10 110"/><path d="M240 352 q-16 80 10 140 q16 50 -4 100"/><path d="M280 350 q22 70 -4 130 q-22 50 6 110"/><path d="M320 340 q16 60 -8 120 q-16 50 8 100"/>
      </g>
      <g fill="none" stroke="#ff9ccc" stroke-width="10" stroke-linecap="round" opacity=".8"><path d="M214 344 q-10 40 6 70 q10 24 -4 44"/><path d="M266 344 q12 40 -6 70 q-10 24 4 44"/></g>
      <path d="M120 330 Q120 170 240 166 Q360 170 360 330 Q300 350 240 344 Q180 350 120 330Z" fill="#ffb3d9" opacity=".92" ${S}/>
      <path d="M150 300 Q160 200 240 196" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity=".6"/>
      <path d="M200 316 q40 -26 80 0" fill="none" stroke="#ff7ab8" stroke-width="6" stroke-linecap="round" opacity=".7"/>
      <g fill="#ff6f8f" opacity=".6"><ellipse cx="240" cy="304" rx="24" ry="11"/><ellipse cx="240" cy="304" rx="11" ry="24"/></g>
      <g fill="#ff7ab8"><circle cx="180" cy="210" r="5"/><circle cx="300" cy="206" r="5"/><circle cx="240" cy="186" r="4"/><circle cx="330" cy="260" r="4"/><circle cx="150" cy="260" r="4"/></g>
      <path d="M120 330 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0 q20 14 40 0" fill="none" ${S}/>
      ${eye(204, 238, 13)}${eye(276, 238, 13)}
      <path d="M226 262 q14 12 28 0" fill="none" ${s(4)}/>
      <circle cx="186" cy="258" r="8" fill="#ff7ab8" opacity=".7"/><circle cx="294" cy="258" r="8" fill="#ff7ab8" opacity=".7"/>`,
  },
  // 1. Подёнка над прудом
  mayfly: {
    bg: `${sky("#ffd9a8", "#fff3c9")}
      ${sun(400, 90, 40)}${cloud(40, 110, 0.8)}${cloud(250, 60, 0.55)}
      <path d="M0 470 Q240 440 480 470 V640 H0Z" fill="#7cc8e8"/><path d="M0 470 Q240 440 480 470" fill="none" ${S}/>
      <path d="M40 530 q60 -14 120 0 M260 560 q70 -14 140 0 M120 600 q50 -10 100 0" fill="none" stroke="#bfe8f7" stroke-width="6" stroke-linecap="round"/>
      <g fill="#5fbf4a" ${s(4)}><ellipse cx="90" cy="560" rx="46" ry="14"/><ellipse cx="380" cy="600" rx="52" ry="15"/></g>
      ${flower(380, 584, "#ff9ec4", 0.9)}
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M24 480 q-6 -120 10 -220"/><path d="M48 480 q4 -100 -6 -180"/><path d="M450 470 q8 -110 -6 -200"/><path d="M430 470 q-4 -80 6 -140"/></g>
      <g fill="#a5683a" ${s(3)}><rect x="26" y="240" width="16" height="44" rx="8"/><rect x="438" y="252" width="16" height="44" rx="8"/></g>
      ${birdV(200, 130, 1.1)}${birdV(240, 150, 0.9)}
      <g fill="#ffb347"><circle cx="120" cy="380" r="4"/><circle cx="360" cy="330" r="4"/><circle cx="300" cy="420" r="3"/></g>`,
    fg: `<g transform="translate(0 50)"><g fill="#e8f6ff" opacity=".85" ${s(4)}><path d="M220 330 Q170 170 250 140 Q290 200 250 330Z"/><path d="M250 330 Q300 190 370 200 Q360 280 268 336Z"/></g>
      <path d="M232 300 L244 180 M256 316 L330 214" fill="none" stroke="#9fc7e0" stroke-width="3"/>
      <path d="M150 410 Q200 370 290 344 Q330 334 350 350 Q340 372 300 380 Q220 400 160 422Z" fill="#c98a3c" ${S}/>
      <path d="M200 386 l6 18 M230 374 l6 18 M260 364 l6 16" stroke="#8a5a1e" stroke-width="5" stroke-linecap="round"/>
      <g fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round"><path d="M156 416 Q100 440 60 500"/><path d="M152 410 Q96 410 50 450"/><path d="M158 420 Q120 470 100 540"/></g>
      <path d="M290 372 l-14 40 M310 368 l2 42 M330 362 l18 36" fill="none" ${s(3)}/>
      <circle cx="350" cy="346" r="22" fill="#c98a3c" ${S}/>
      ${eye(346, 340, 10)}${eye(366, 350, 8)}
      <path d="M362 330 q10 -30 30 -40 M354 328 q-2 -30 10 -46" fill="none" ${s(3)}/></g>`,
  },

  // 2. Пчела на лугу
  bee: {
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
  },

  // 3. Аксолотль в озере
  axolotl: {
    bg: `${sky("#9fe3e0", "#5fb9c4")}
      <g fill="#fff" opacity=".12"><path d="M60 0 L160 0 L280 640 L120 640Z"/><path d="M330 0 L380 0 L480 420 L480 560Z"/></g>
      <path d="M0 560 Q120 530 240 556 T480 548 V640 H0Z" fill="#e8c98f"/><path d="M0 560 Q120 530 240 556 T480 548" fill="none" ${S}/>
      ${stones([[60, 580, 26], [420, 590, 30], [300, 610, 18]])}
      <g fill="none" stroke="#3f9b5a" stroke-width="10" stroke-linecap="round"><path d="M30 570 q-20 -90 10 -170 q16 -50 -6 -110"/><path d="M450 570 q24 -100 -6 -190 q-14 -40 8 -90"/><path d="M110 580 q10 -60 -8 -100"/></g>
      <g fill="#5cc27a" ${s(3)}><ellipse cx="44" cy="330" rx="20" ry="9" transform="rotate(-30 44 330)"/><ellipse cx="438" cy="300" rx="20" ry="9" transform="rotate(30 438 300)"/><ellipse cx="20" cy="440" rx="18" ry="8"/></g>
      ${bubbles([[90, 160, 10], [110, 120, 6], [380, 140, 9], [400, 100, 5], [420, 420, 8]])}
      ${fish(380, 220, 0.9, "#ff9a3c", true)}${fish(90, 260, 0.8, "#ffd23f")}`,
    fg: `<path d="M330 430 Q420 420 450 370 Q430 450 340 470Z" fill="#ffb3c7" ${S}/>
      <path d="M150 440 Q140 360 240 350 Q340 350 350 440 Q340 490 240 492 Q150 490 150 440Z" fill="#ffb3c7" ${S}/>
      <g fill="#ffb3c7" ${s(5)}><path d="M180 480 l-20 50 l30 -6 Z"/><path d="M300 480 l18 50 l-30 -6Z"/></g>
      <g fill="#ff6f9a" ${s(4)}>
        <path d="M150 300 q-50 -30 -70 -10 q30 20 66 30Z"/><path d="M146 330 q-56 -6 -70 20 q36 6 70 -6Z"/><path d="M152 356 q-50 16 -56 48 q34 -14 60 -30Z"/>
        <path d="M330 300 q50 -30 70 -10 q-30 20 -66 30Z"/><path d="M334 330 q56 -6 70 20 q-36 6 -70 -6Z"/><path d="M328 356 q50 16 56 48 q-34 -14 -60 -30Z"/>
      </g>
      <ellipse cx="240" cy="320" rx="100" ry="76" fill="#ffc4d4" ${S}/>
      ${eye(196, 306, 13)}${eye(284, 306, 13)}
      <path d="M190 344 q50 34 100 0" fill="none" ${s(5)}/>
      <circle cx="172" cy="338" r="9" fill="#ff7aa0" opacity=".6"/><circle cx="308" cy="338" r="9" fill="#ff7aa0" opacity=".6"/>
      <g fill="#ff9ab8"><circle cx="220" cy="410" r="5"/><circle cx="270" cy="420" r="4"/><circle cx="300" cy="400" r="4"/></g>`,
  },

  // 4. Утконос на берегу реки, рядом гнездо с яйцами
  platypus: {
    bg: `${sky("#bfe6ff", "#f0fbff")}
      ${cloud(60, 90, 0.7)}${cloud(320, 70, 0.6)}${sun(420, 120, 34)}
      <path d="M0 330 Q120 300 240 320 T480 310 V420 H0Z" fill="#8bcf6a"/>
      <path d="M0 420 Q240 400 480 420 V640 H0Z" fill="#6cb8e6"/><path d="M0 420 Q240 400 480 420" fill="none" ${S}/>
      <path d="M30 480 q50 -12 100 0 M280 500 q60 -12 120 0 M150 580 q60 -12 120 0" fill="none" stroke="#bfe6fb" stroke-width="6" stroke-linecap="round"/>
      ${tufts([[20, 330], [200, 320], [460, 318]])}
      <g transform="translate(70 380)"><ellipse cx="0" cy="0" rx="52" ry="20" fill="#b07a45" ${S}/><path d="M-44 -6 q20 -10 40 0 q20 -10 44 0" fill="none" stroke="#8a5a2e" stroke-width="4"/><ellipse cx="-14" cy="-12" rx="14" ry="18" fill="#fff6dc" ${s(4)}/><ellipse cx="14" cy="-14" rx="14" ry="18" fill="#fff6dc" ${s(4)}/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="6" stroke-linecap="round"><path d="M440 420 q-6 -60 10 -110"/><path d="M460 420 q4 -50 -4 -90"/></g>
      ${fish(380, 560, 0.9, "#ffb347", true)}`,
    fg: `<path d="M330 470 Q420 470 440 430 Q450 500 360 510Z" fill="#7a4a2a" ${S}/>
      <path d="M346 474 l60 -10 M350 492 l64 -14" stroke="#5c3418" stroke-width="5" stroke-linecap="round"/>
      <ellipse cx="270" cy="450" rx="110" ry="64" fill="#a8693c" ${S}/>
      <g fill="#a8693c" ${s(5)}><path d="M200 500 l-30 24 l40 6Z"/><path d="M320 500 l20 26 l-36 4Z"/></g>
      <circle cx="170" cy="420" r="52" fill="#a8693c" ${S}/>
      <path d="M126 410 Q70 400 52 424 Q60 452 128 444Z" fill="#4a3a36" ${S}/>
      <path d="M70 420 h10 M64 432 h10" ${s(3)}/>
      ${eye(176, 400, 11)}
      <path d="M200 440 q-10 10 -24 6" fill="none" ${s(3)}/>
      <g fill="#c98a5a"><circle cx="270" cy="430" r="4"/><circle cx="300" cy="460" r="4"/><circle cx="240" cy="470" r="3"/></g>`,
  },

  // 5. Голый землекоп в норке
  molerat: {
    bg: `<rect width="480" height="640" fill="#f0c98a"/>
      <rect width="480" height="120" fill="#bfe6ff"/>${cloud(330, 50, 0.6)}${sun(70, 50, 28)}
      <path d="M0 120 Q120 104 240 120 T480 116 V150 H0Z" fill="#8fd16a"/><path d="M0 150 H480" ${S}/>
      ${tufts([[40, 122], [180, 116], [300, 120], [440, 118]])}
      <path d="M-20 300 Q120 260 240 300 T500 280 L500 560 Q360 600 240 560 T-20 580Z" fill="#d89a55" ${s(5)}/>
      <g fill="none" stroke="#b07a45" stroke-width="5" stroke-linecap="round"><path d="M60 150 q10 60 -10 110"/><path d="M60 200 q30 20 40 50"/><path d="M400 150 q-16 50 10 90"/><path d="M400 190 q-30 10 -40 40"/></g>
      ${stones([[40, 610, 18], [140, 620, 12], [420, 610, 20], [300, 230, 12], [180, 200, 9]], "#b9a28a")}
      <g fill="#c9853f"><circle cx="100" cy="230" r="4"/><circle cx="360" cy="240" r="5"/><circle cx="250" cy="620" r="4"/><circle cx="340" cy="610" r="3"/></g>`,
    fg: `<path d="M110 450 Q120 360 250 356 Q380 360 390 450 Q380 520 250 524 Q120 520 110 450Z" fill="#f7b6b0" ${S}/>
      <path d="M380 450 q40 10 56 -6" fill="none" ${s(5)}/>
      <path d="M200 380 q4 20 -2 40 M250 372 q6 22 0 46 M300 380 q4 20 -2 40 M180 470 q30 8 60 0 M270 480 q30 8 60 -4" fill="none" stroke="#e08a86" stroke-width="5" stroke-linecap="round"/>
      <g fill="#f7b6b0" ${s(5)}><ellipse cx="170" cy="526" rx="24" ry="12"/><ellipse cx="320" cy="526" rx="24" ry="12"/></g>
      <ellipse cx="150" cy="430" rx="72" ry="62" fill="#f9c2bc" ${S}/>
      <circle cx="132" cy="408" r="5" fill="${K}"/><circle cx="168" cy="406" r="5" fill="${K}"/>
      <ellipse cx="150" cy="440" rx="14" ry="10" fill="#e88a8a" ${s(3)}/>
      <g fill="#fffaf0" ${s(4)}><rect x="138" y="452" width="11" height="30" rx="3"/><rect x="151" y="452" width="11" height="30" rx="3"/></g>
      <path d="M100 430 l-36 -6 M100 444 l-34 8 M200 430 l30 -6" ${s(2)}/>`,
  },

  // 6. Слон в саванне
  elephant: {
    bg: `${sky("#ffe2a8", "#fff6d8")}
      ${sun(400, 90, 46)}${cloud(40, 80, 0.7)}${birdV(180, 110, 1)}${birdV(220, 90, 0.85)}
      <path d="M0 470 Q240 440 480 470 V640 H0Z" fill="#e8c86a"/><path d="M0 470 Q240 440 480 470" fill="none" ${S}/>
      ${tufts([[440, 470]], "#a08a2e")}
      ${tufts([[30, 500], [120, 600], [420, 520], [460, 600]], "#a08a2e")}
      <ellipse cx="60" cy="570" rx="40" ry="10" fill="#7cc8e8" ${s(3)}/>`,
    fg: `<ellipse cx="240" cy="470" rx="120" ry="84" fill="#aab6c8" ${S}/>
      <g fill="#aab6c8" ${S}><rect x="150" y="490" width="50" height="70" rx="20"/><rect x="280" y="490" width="50" height="70" rx="20"/></g>
      <g fill="#e2e8f0" ${s(3)}><path d="M156 552 q10 -8 20 0 q10 -8 20 0"/><path d="M286 552 q10 -8 20 0 q10 -8 20 0"/></g>
      <path d="M150 300 Q60 250 50 330 Q46 420 150 410Z" fill="#aab6c8" ${S}/>
      <path d="M330 300 Q420 250 430 330 Q434 420 330 410Z" fill="#aab6c8" ${S}/>
      <path d="M140 316 Q86 290 80 336 Q78 392 140 390Z" fill="#f7c4d0"/>
      <path d="M340 316 Q394 290 400 336 Q402 392 340 390Z" fill="#f7c4d0"/>
      <circle cx="240" cy="340" r="96" fill="#b8c4d4" ${S}/>
      ${eye(204, 322, 14)}${eye(276, 322, 14)}
      <circle cx="184" cy="360" r="11" fill="#f7a8bc" opacity=".8"/><circle cx="296" cy="360" r="11" fill="#f7a8bc" opacity=".8"/>
      <path d="M216 372 Q210 430 232 456 Q250 476 276 460 Q300 444 286 420 Q272 432 262 426 Q252 420 258 372Z" fill="#b8c4d4" ${S}/>
      <path d="M220 400 h34 M224 424 h30" ${s(3)}/>
      <path d="M200 388 q10 14 24 12 M280 388 q-10 14 -24 12" fill="none" ${s(4)}/>`,
  },

  // 7. Попугай какапо в лесу
  kakapo: {
    bg: `${sky("#c9f0c4", "#effbe8")}
      <g fill="#a8dca0" opacity=".9"><circle cx="40" cy="120" r="70"/><circle cx="440" cy="110" r="80"/><circle cx="400" cy="200" r="50"/></g>
      <g fill="none" stroke="#8a5a2e" stroke-width="22" stroke-linecap="round"><path d="M20 640 V140"/><path d="M460 640 V160"/></g>
      <path d="M0 500 Q240 470 480 500 V640 H0Z" fill="#7cc25a"/><path d="M0 500 Q240 470 480 500" fill="none" ${S}/>
      <g fill="none" stroke="#3f9b34" stroke-width="5" stroke-linecap="round"><path d="M60 520 q-30 -40 -50 -40 M60 520 q-20 -50 -10 -80 M60 520 q10 -50 30 -60"/><path d="M420 530 q30 -40 50 -40 M420 530 q20 -50 10 -80 M420 530 q-10 -50 -30 -60"/></g>
      ${flower(100, 560, "#ffd23f", 1)}${flower(380, 590, "#ff8fb1", 1)}
      ${stones([[220, 600, 16], [300, 620, 12]])}
      <g fill="#fff6a8"><circle cx="120" cy="260" r="4"/><circle cx="360" cy="300" r="4"/><circle cx="260" cy="150" r="3"/></g>`,
    fg: `<path d="M160 470 Q140 320 240 300 Q340 320 320 470 Q300 540 240 540 Q180 540 160 470Z" fill="#9ccc4a" ${S}/>
      <path d="M180 400 q20 10 40 0 M180 440 q20 10 40 0 M260 400 q20 10 40 0 M260 440 q20 10 40 0 M210 490 q20 10 40 0" fill="none" stroke="#5f8a2a" stroke-width="5" stroke-linecap="round"/>
      <path d="M170 420 Q130 470 150 520 Q180 500 190 450Z" fill="#7fae3a" ${S}/><path d="M310 420 Q350 470 330 520 Q300 500 290 450Z" fill="#7fae3a" ${S}/>
      <circle cx="240" cy="290" r="74" fill="#c4dc6a" ${S}/>
      <path d="M180 260 q20 -10 40 0 M260 260 q20 -10 40 0" fill="none" stroke="#e8f0a0" stroke-width="10" stroke-linecap="round"/>
      ${eye(208, 284, 14)}${eye(272, 284, 14)}
      <path d="M226 304 Q240 300 254 304 Q252 340 240 344 Q228 340 226 304Z" fill="#f2e4c4" ${S}/>
      <g fill="none" ${s(5)}><path d="M210 540 v20 l-10 10 M210 560 l10 10 M270 540 v20 l-10 10 M270 560 l10 10"/></g>`,
  },

  // 8. Черепаха Джонатан на лужайке у моря
  tortoise: {
    bg: `${sky("#a8dcff", "#e8f7ff")}
      ${sun(70, 80, 36)}${cloud(280, 60, 0.7)}${cloud(380, 140, 0.45)}
      <path d="M0 300 H480 V340 H0Z" fill="#5aa8e0"/>
      <path d="M0 330 Q120 300 240 320 T480 316 V640 H0Z" fill="#8fd16a"/><path d="M0 330 Q120 300 240 320 T480 316" fill="none" ${S}/>
      <g transform="translate(430 330)"><path d="M0 0 q-10 -100 10 -180" stroke="#a5683a" stroke-width="14" fill="none" stroke-linecap="round"/><g fill="#5fbf4a" ${s(4)}><path d="M10 -180 q-60 -10 -80 30 q40 -20 80 -30Z"/><path d="M10 -180 q60 -20 70 20 q-40 -16 -70 -20Z"/><path d="M10 -180 q-20 -50 10 -70 q4 40 -10 70Z"/></g></g>
      ${tufts([[30, 600], [120, 620], [380, 610], [460, 590]])}
      ${flower(40, 560, "#ff8fb1", 1.1)}${flower(450, 560, "#ffd23f", 1.1)}`,
    fg: `<g fill="#b8a07a" ${S}><rect x="150" y="470" width="44" height="70" rx="16"/><rect x="300" y="470" width="44" height="70" rx="16"/></g>
      <path d="M118 480 Q130 320 250 316 Q370 320 382 480Z" fill="#a8783c" ${S}/>
      <g fill="#c99a52" ${s(4)}><path d="M210 360 l40 -20 l40 20 v40 l-40 20 l-40 -20Z"/><path d="M150 420 l40 -16 l20 20 v40 l-50 4Z"/><path d="M350 420 l-40 -16 l-20 20 v40 l50 4Z"/><path d="M220 440 l30 -16 l30 16 v34 h-60Z"/></g>
      <path d="M110 480 H390" fill="none" ${S}/>
      <path d="M120 470 Q80 460 70 420 Q60 380 90 370" fill="none" stroke="${K}" stroke-width="44" stroke-linecap="round"/>
      <path d="M120 470 Q80 460 70 420 Q60 380 90 370" fill="none" stroke="#c4ac84" stroke-width="32" stroke-linecap="round"/>
      <path d="M72 440 q12 -4 20 6 M70 410 q12 -4 20 6" fill="none" ${s(3)}/>
      <ellipse cx="100" cy="356" rx="44" ry="34" fill="#c4ac84" ${S}/>
      ${eye(106, 346, 11)}
      <path d="M66 372 q16 10 32 2" fill="none" ${s(4)}/>`,
  },

  // 9. Гренландский кит подо льдом
  whale: {
    bg: `${sky("#d8f0ff", "#f4fbff")}
      <path d="M0 150 H480 V640 H0Z" fill="#5f9fd0"/>
      <g fill="#ffffff" ${s(5)}><path d="M-10 120 h170 l-10 50 h-160Z"/><path d="M190 110 h120 l10 50 h-140Z"/><path d="M340 124 h150 v46 h-160Z"/></g>
      <path d="M160 130 l14 20 l-10 14 M326 130 l-10 18 l12 16" fill="none" ${s(3)}/>
      <g fill="#fff" opacity=".14"><path d="M170 160 L320 160 L420 640 L120 640Z"/></g>
      ${bubbles([[200, 210, 10], [216, 186, 6], [60, 400, 8], [440, 460, 9]])}
      ${fish(70, 260, 0.85, "#ffb347")}${fish(420, 580, 0.85, "#ffd23f", true)}`,
    fg: `<path d="M60 400 Q80 250 260 250 Q420 260 440 380 Q470 340 480 300 Q500 420 430 440 Q380 520 240 520 Q90 520 60 400Z" fill="#6b7f9e" ${S}/>
      <path d="M70 420 Q120 500 240 500 Q300 500 330 470 Q240 470 170 440 Q110 420 70 420Z" fill="#f4f7fb" ${s(4)}/>
      <path d="M78 380 Q150 420 250 400" fill="none" ${s(5)}/>
      ${eye(220, 370, 10)}
      <path d="M260 470 q-30 40 -60 50" fill="#6b7f9e" ${s(5)}/>
      <g fill="#94a6c2"><circle cx="300" cy="300" r="6"/><circle cx="340" cy="320" r="5"/><circle cx="260" cy="290" r="4"/></g>
      <path d="M180 252 q-6 -30 6 -50 M196 252 q6 -30 20 -42" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  },

  // 10. Гренландская акула в холодном море
  shark: {
    bg: `${sky("#7fb3d8", "#4f86b8")}
      <g fill="#ffffff" ${s(5)}><path d="M-10 0 h200 l-20 50 h-180Z"/><path d="M300 0 h190 v40 h-170Z"/></g>
      <g fill="#fff" opacity=".12"><path d="M190 40 L300 40 L400 640 L140 640Z"/></g>
      <path d="M0 590 Q160 570 300 592 T480 586 V640 H0Z" fill="#3f6f9a"/>
      <g fill="#5a8ab4" ${s(4)}><path d="M40 600 q-6 -60 10 -90 q10 50 4 90Z"/><path d="M430 600 q-4 -50 14 -80 q8 40 -2 80Z"/></g>
      ${bubbles([[80, 120, 9], [96, 90, 5], [420, 480, 10]])}
      ${fish(400, 140, 0.9, "#ffd23f", true)}${fish(70, 480, 0.85, "#ff9a3c")}
      <g fill="#fff" opacity=".5"><circle cx="160" cy="200" r="3"/><circle cx="330" cy="160" r="2"/><circle cx="120" cy="330" r="3"/><circle cx="390" cy="380" r="2"/><circle cx="250" cy="560" r="3"/></g>`,
    fg: `<path d="M370 380 L450 320 L440 390 L460 450 Z" fill="#8a8478" ${S}/>
      <path d="M60 390 Q100 320 230 320 Q340 324 380 380 Q340 440 230 446 Q100 446 60 390Z" fill="#9a9488" ${S}/>
      <path d="M210 326 L250 270 L270 330Z" fill="#8a8478" ${S}/>
      <path d="M180 430 L150 480 L220 440Z" fill="#8a8478" ${S}/>
      <path d="M70 400 Q140 440 230 436 Q300 432 350 410" fill="none" stroke="#d8d4c8" stroke-width="12" stroke-linecap="round" opacity=".8"/>
      <path d="M160 360 v24 M176 358 v26 M192 358 v26" ${s(3)}/>
      ${eye(110, 376, 9)}
      <path d="M70 404 q20 10 40 4" fill="none" ${s(4)}/>
      <g fill="#7a7468"><circle cx="250" cy="370" r="5"/><circle cx="290" cy="390" r="4"/><circle cx="320" cy="360" r="4"/><circle cx="230" cy="400" r="3"/></g>`,
  },
  mosquito: {
    bg: `${land("#ffd1b8", "#fff0d6", "#9fd27a", 470)}${sun(400, 90, 36)}${cloud(40, 100, 0.6)}
      <ellipse cx="300" cy="570" rx="170" ry="40" fill="#7cc8e8" ${s(4)}/><path d="M200 570 q50 -10 100 0 M300 590 q40 -8 80 0" fill="none" stroke="#bfe8f7" stroke-width="5" stroke-linecap="round"/>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M30 480 q-6 -100 10 -180"/><path d="M60 480 q4 -80 -6 -140"/><path d="M450 480 q8 -90 -6 -170"/></g>
      ${flower(110, 540, "#ff9ec4", 1.1)}${tufts([[200, 480], [420, 500], [60, 600]])}`,
    fg: `<g fill="#eaf6ff" opacity=".85" ${s(4)}><ellipse cx="200" cy="300" rx="30" ry="80" transform="rotate(-40 200 300)"/><ellipse cx="290" cy="290" rx="30" ry="78" transform="rotate(40 290 290)"/></g>
      <g fill="none" ${s(4)}><path d="M220 380 Q160 420 120 520"/><path d="M236 384 Q210 450 190 540"/><path d="M262 384 Q290 450 310 540"/><path d="M276 380 Q340 420 380 520"/><path d="M228 370 Q150 360 100 420"/><path d="M272 370 Q350 360 400 420"/></g>
      <ellipse cx="250" cy="420" rx="28" ry="70" fill="#b8a07a" ${S} transform="rotate(20 250 420)"/>
      <path d="M232 380 l30 10 M226 410 l32 12 M222 440 l30 12" stroke="#7a6040" stroke-width="5" stroke-linecap="round"/>
      <circle cx="250" cy="350" r="34" fill="#b8a07a" ${S}/>
      <circle cx="226" cy="330" r="26" fill="#c8b490" ${S}/>
      ${eye(216, 324, 12)}${eye(238, 330, 9)}
      <path d="M204 344 L130 380" ${s(5)}/>
      <path d="M220 304 q-20 -30 -10 -50 M232 304 q4 -34 24 -44" fill="none" ${s(3)}/>`,
  },

  housefly: {
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
  },

  chameleon: {
    bg: `${land("#ffe3b0", "#fff6e0", "#e0b878", 500)}${sun(80, 90, 40)}${cloud(300, 80, 0.6)}
      <path d="M0 395 Q120 385 240 395 Q360 405 480 385" fill="none" stroke="#8a5a2e" stroke-width="22" stroke-linecap="round"/>
      <path d="M0 395 Q120 385 240 395 Q360 405 480 385" fill="none" stroke="${K}" stroke-width="4" opacity=".6"/>
      <g fill="#7cc25a" ${s(3)}><ellipse cx="60" cy="370" rx="22" ry="10" transform="rotate(-20 60 370)"/><ellipse cx="430" cy="365" rx="22" ry="10" transform="rotate(20 430 365)"/></g>
      <g transform="translate(360 560)"><ellipse cx="0" cy="0" rx="60" ry="18" fill="#c99a5a" ${S}/><g fill="#fff6dc" ${s(3)}><ellipse cx="-22" cy="-10" rx="11" ry="14"/><ellipse cx="0" cy="-14" rx="11" ry="14"/><ellipse cx="22" cy="-10" rx="11" ry="14"/></g></g>
      ${tufts([[40, 520], [200, 540], [460, 520]], "#a08a2e")}`,
    fg: `<g transform="translate(240 390) scale(1.35) translate(-240 -390)"><path d="M320 360 Q400 360 400 420 Q400 470 360 470 Q330 470 330 440 Q330 420 352 420" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/>
      <path d="M320 360 Q400 360 400 420 Q400 470 360 470 Q330 470 330 440 Q330 420 352 420" fill="none" stroke="#5cb84a" stroke-width="18" stroke-linecap="round"/>
      <path d="M120 330 Q150 250 250 260 Q340 270 340 330 Q300 360 230 362 Q150 362 120 330Z" fill="#6cc85a" ${S}/>
      <path d="M150 268 l16 -14 l14 12 l16 -14 l14 12 l16 -14 l14 12 l16 -12" fill="none" ${s(4)}/>
      <path d="M170 300 l20 20 M210 296 l18 22 M250 300 l18 20 M290 304 l14 18" stroke="#ffd23f" stroke-width="6" stroke-linecap="round"/>
      <g fill="#6cc85a" ${s(5)}><path d="M170 356 l-10 30 h24Z"/><path d="M290 356 l10 30 h-24Z"/></g>
      <path d="M130 316 Q80 300 80 270 Q100 240 150 260Z" fill="#7ad468" ${S}/>
      <circle cx="122" cy="282" r="20" fill="#7ad468" ${S}/>${eye(122, 282, 9)}
      <path d="M84 290 q16 8 30 2" fill="none" ${s(3)}/></g>`,
  },

  octopus: {
    bg: `${water("#8fd6e8", "#4fa8cc")}${weeds([40, 450])}${stones([[100, 590, 20], [380, 600, 24]])}
      ${bubbles([[80, 160, 10], [96, 120, 6], [400, 200, 9], [420, 160, 5]])}${fish(400, 300, 0.9, "#ffd23f", true)}${fish(70, 420, 0.8, "#ff8fb1")}`,
    fg: `<g fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round">
        <path d="M180 380 Q120 420 110 480 Q100 530 140 530"/><path d="M200 400 Q170 470 190 530"/><path d="M230 410 Q220 480 250 540"/><path d="M260 410 Q280 480 270 540"/><path d="M290 400 Q330 460 320 530"/><path d="M310 380 Q370 420 380 480 Q390 530 350 530"/></g>
      <g fill="none" stroke="#ff8a4a" stroke-width="18" stroke-linecap="round">
        <path d="M180 380 Q120 420 110 480 Q100 530 140 530"/><path d="M200 400 Q170 470 190 530"/><path d="M230 410 Q220 480 250 540"/><path d="M260 410 Q280 480 270 540"/><path d="M290 400 Q330 460 320 530"/><path d="M310 380 Q370 420 380 480 Q390 530 350 530"/></g>
      <path d="M150 340 Q150 200 245 200 Q340 200 340 340 Q300 400 245 400 Q190 400 150 340Z" fill="#ff9a5a" ${S}/>
      <g fill="#ffc49a"><circle cx="200" cy="250" r="10"/><circle cx="290" cy="240" r="8"/><circle cx="250" cy="226" r="6"/></g>
      ${eye(212, 320, 15)}${eye(278, 320, 15)}
      <path d="M230 356 q15 12 30 0" fill="none" ${s(4)}/>
      ${heart(90, 260, 1.4)}${heart(400, 250, 1.4)}${heart(410, 330, 1.2)}`,
  },

  hamster: {
    bg: `<rect width="480" height="640" fill="#d6f5e4"/>
      <g fill="#bde8cf"><circle cx="60" cy="80" r="8"/><circle cx="200" cy="140" r="8"/><circle cx="420" cy="90" r="8"/><circle cx="120" cy="260" r="8"/></g>
      <g transform="translate(380 330)"><circle r="90" fill="none" stroke="#5aa8e0" stroke-width="12"/><circle r="90" fill="none" ${s(3)}/><path d="M-90 0 H90 M0 -90 V90 M-64 -64 L64 64 M-64 64 L64 -64" stroke="#5aa8e0" stroke-width="4"/><path d="M0 90 L-30 170 M0 90 L30 170" ${S}/></g>
      <rect y="490" width="480" height="150" fill="#f5d98a"/><path d="M0 490 h480" ${S}/>
      <g stroke="#d9b45a" stroke-width="5" stroke-linecap="round"><path d="M30 520 l20 6 M100 560 l24 -4 M180 530 l18 8 M300 600 l22 -6 M400 540 l20 4 M60 610 l18 -6"/></g>
      <path d="M60 470 l30 30 h-60Z" fill="#ffb347" ${s(4)}/>`,
    fg: `<ellipse cx="240" cy="440" rx="130" ry="100" fill="#f2a65a" ${S}/>
      <path d="M150 470 Q240 560 330 470 Q300 420 240 420 Q180 420 150 470Z" fill="#fff3df"/>
      <g fill="#f2a65a" ${S}><circle cx="160" cy="300" r="26"/><circle cx="320" cy="300" r="26"/></g>
      <g fill="#f7b7c3"><circle cx="160" cy="300" r="13"/><circle cx="320" cy="300" r="13"/></g>
      <circle cx="240" cy="360" r="90" fill="#f2a65a" ${S}/>
      <circle cx="166" cy="396" r="40" fill="#ffd9a8" ${S}/><circle cx="314" cy="396" r="40" fill="#ffd9a8" ${S}/>
      <g fill="#c98a3c"><circle cx="160" cy="390" r="5"/><circle cx="176" cy="404" r="5"/><circle cx="306" cy="390" r="5"/><circle cx="322" cy="404" r="5"/></g>
      ${eye(208, 346, 13)}${eye(272, 346, 13)}
      <ellipse cx="240" cy="380" rx="10" ry="7" fill="#f06a8a" ${s(3)}/>
      <path d="M240 388 q-10 12 -20 4 M240 388 q10 12 20 4" fill="none" ${s(3)}/>
      <g fill="#ffd9a8" ${s(4)}><ellipse cx="210" cy="450" rx="16" ry="12"/><ellipse cx="270" cy="450" rx="16" ry="12"/></g>`,
  },

  guineapig: {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(70, 80, 34)}${cloud(300, 80, 0.7)}
      <g fill="#f5d98a" ${s(3)}><path d="M20 520 q60 -40 120 0Z"/><path d="M340 600 q60 -40 120 0Z"/></g>
      <g transform="translate(400 500) rotate(-30)"><path d="M0 0 L-12 70 L12 70Z" fill="#ff9a3c" ${s(4)}/><path d="M0 0 q-10 -20 -4 -30 M0 0 q10 -20 4 -30" stroke="#3f9b34" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      ${tufts([[40, 480], [200, 470], [300, 600], [100, 620]])}${flower(200, 600, "#ff8fb1", 1)}`,
    fg: `<path d="M100 430 Q100 330 240 320 Q380 330 380 430 Q380 520 240 524 Q100 520 100 430Z" fill="#c9844a" ${S}/>
      <path d="M240 322 Q300 330 330 380 Q340 470 300 520 Q240 524 240 500 Z" fill="#fff6e8"/>
      <path d="M140 360 Q180 330 220 340 Q200 400 150 410Z" fill="#fff6e8"/>
      <path d="M100 430 Q100 330 240 320 Q380 330 380 430 Q380 520 240 524 Q100 520 100 430Z" fill="none" ${S}/>
      <g fill="#c9844a" ${s(5)}><ellipse cx="130" cy="330" rx="22" ry="16"/><ellipse cx="216" cy="318" rx="22" ry="16"/></g>
      ${eye(140, 380, 12)}${eye(200, 376, 12)}
      <ellipse cx="164" cy="412" rx="12" ry="9" fill="#f06a8a" ${s(3)}/>
      <g fill="#fff" ${s(3)}><rect x="156" y="424" width="8" height="16" rx="2"/><rect x="166" y="424" width="8" height="16" rx="2"/></g>
      <g fill="#c9844a" ${s(4)}><ellipse cx="160" cy="520" rx="22" ry="11"/><ellipse cx="320" cy="520" rx="22" ry="11"/></g>`,
  },

  capybara: {
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
  },

  rabbit: {
    bg: `${land("#d4f0ff", "#f4fcff", "#9fd27a", 470)}${sun(70, 90, 36)}${cloud(320, 80, 0.7)}
      <g transform="translate(400 540)"><path d="M0 0 L-14 80 L14 80Z" fill="#ff9a3c" ${s(4)} transform="rotate(180)"/><path d="M-8 0 q-14 -26 -6 -40 M0 0 q0 -30 6 -42 M8 0 q14 -24 10 -38" stroke="#3f9b34" stroke-width="6" fill="none" stroke-linecap="round"/></g>
      ${tufts([[40, 480], [180, 470], [100, 600], [300, 610]])}${flower(60, 560, "#b892ff", 1.1)}${flower(250, 600, "#ffd23f", 1)}`,
    fg: `<g fill="#f2f2f2" ${S}><path d="M190 300 Q160 180 190 170 Q220 180 220 300Z"/><path d="M260 300 Q270 170 300 176 Q324 190 286 304Z"/></g>
      <g fill="#f7b7c3"><path d="M196 290 Q180 200 192 190 Q206 200 208 290Z"/><path d="M270 292 Q282 200 296 196 Q306 210 280 296Z"/></g>
      <ellipse cx="250" cy="460" rx="110" ry="90" fill="#f2f2f2" ${S}/>
      <circle cx="352" cy="470" r="22" fill="#fff" ${S}/>
      <circle cx="240" cy="350" r="70" fill="#f2f2f2" ${S}/>
      ${eye(212, 340, 12)}${eye(268, 340, 12)}
      <path d="M232 368 h16 l-8 8Z" fill="#f06a8a" ${s(3)}/>
      <path d="M240 376 q-10 12 -20 4 M240 376 q10 12 20 4" fill="none" ${s(3)}/>
      <path d="M200 372 l-44 -6 M200 382 l-42 6 M280 372 l44 -6 M280 382 l42 6" ${s(2)}/>
      <g fill="#f2f2f2" ${s(5)}><ellipse cx="200" cy="546" rx="30" ry="14"/><ellipse cx="290" cy="546" rx="30" ry="14"/></g>
      <circle cx="198" cy="372" r="8" fill="#f7b7c3" opacity=".7"/><circle cx="282" cy="372" r="8" fill="#f7b7c3" opacity=".7"/>`,
  },

  hummingbird: {
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
  },

  dog: {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(70, 80, 34)}${cloud(260, 70, 0.6)}
      <g fill="#e8c27a" ${s(4)}><path d="M0 380 h220 M0 430 h220" fill="none"/><rect x="20" y="350" width="16" height="120"/><rect x="90" y="350" width="16" height="120"/><rect x="160" y="350" width="16" height="120"/></g>
      <g transform="translate(400 470)"><path d="M-60 0 V-80 L0 -130 L60 -80 V0Z" fill="#e2603c" ${S}/><path d="M-26 0 V-50 Q0 -74 26 -50 V0Z" fill="#5a3a2a"/><path d="M-70 -76 L0 -140 L70 -76" fill="none" stroke="#8a3a1a" stroke-width="14" stroke-linecap="round"/></g>
      <g transform="translate(120 590) rotate(-10)"><rect x="-30" y="-6" width="60" height="12" rx="6" fill="#fff" ${s(3)}/><circle cx="-32" cy="-8" r="9" fill="#fff" ${s(3)}/><circle cx="-32" cy="8" r="9" fill="#fff" ${s(3)}/><circle cx="32" cy="-8" r="9" fill="#fff" ${s(3)}/><circle cx="32" cy="8" r="9" fill="#fff" ${s(3)}/></g>
      ${tufts([[260, 480], [460, 600], [40, 620]])}`,
    fg: `<path d="M150 560 Q140 420 240 410 Q340 420 330 560Z" fill="#d9954a" ${S}/>
      <path d="M200 560 Q200 470 240 460 Q280 470 280 560Z" fill="#fff3df"/>
      <path d="M330 520 q50 -20 50 -70" fill="none" stroke="${K}" stroke-width="24" stroke-linecap="round"/><path d="M330 520 q50 -20 50 -70" fill="none" stroke="#d9954a" stroke-width="12" stroke-linecap="round"/>
      <path d="M180 430 Q240 450 300 430" fill="none" stroke="#e2453a" stroke-width="14" stroke-linecap="round"/><circle cx="240" cy="448" r="10" fill="#ffd23f" ${s(3)}/>
      <path d="M150 280 Q120 300 120 380 Q140 400 166 360Z" fill="#8a5a2e" ${S}/><path d="M330 280 Q360 300 360 380 Q340 400 314 360Z" fill="#8a5a2e" ${S}/>
      <circle cx="240" cy="330" r="86" fill="#d9954a" ${S}/>
      <ellipse cx="240" cy="372" rx="50" ry="38" fill="#fff3df"/>
      ${eye(206, 314, 13)}${eye(274, 314, 13)}
      <ellipse cx="240" cy="352" rx="18" ry="12" fill="${K}"/>
      <path d="M240 364 v10 M240 374 q-14 12 -26 2 M240 374 q14 12 26 2" fill="none" ${s(4)}/>
      <path d="M232 384 q8 26 16 0Z" fill="#f06a8a" ${s(3)}/>`,
  },

  lion: {
    bg: `${land("#ffd59a", "#fff2d4", "#e8c86a", 480)}${sun(90, 100, 50)}${birdV(380, 90, 1)}${birdV(410, 110, 0.85)}
      <g transform="translate(420 480)"><path d="M0 0 V-110" stroke="#8a5a2e" stroke-width="14" stroke-linecap="round"/><ellipse cx="0" cy="-120" rx="70" ry="24" fill="#6cb04a" ${S}/></g>
      ${tufts([[30, 500], [140, 600], [460, 610]], "#a08a2e")}
      ${stones([[80, 560, 30]], "#c9b48a")}`,
    fg: `<path d="M170 560 Q160 440 250 430 Q340 440 340 560Z" fill="#f2b45a" ${S}/>
      <g fill="#f2b45a" ${s(5)}><rect x="180" y="520" width="40" height="40" rx="12"/><rect x="280" y="520" width="40" height="40" rx="12"/></g>
      <g fill="#c96a1e" ${S}>
        <circle cx="250" cy="250" r="44"/><circle cx="190" cy="270" r="44"/><circle cx="310" cy="270" r="44"/><circle cx="160" cy="330" r="44"/><circle cx="340" cy="330" r="44"/><circle cx="180" cy="390" r="44"/><circle cx="320" cy="390" r="44"/><circle cx="250" cy="420" r="44"/></g>
      <circle cx="250" cy="340" r="84" fill="#c96a1e"/>
      <circle cx="250" cy="340" r="70" fill="#f7c46a" ${S}/>
      <g fill="#f7c46a" ${s(4)}><circle cx="200" cy="284" r="16"/><circle cx="300" cy="284" r="16"/></g>
      ${eye(224, 328, 12)}${eye(276, 328, 12)}
      <path d="M238 352 h24 l-12 12Z" fill="#8a4a3a" ${s(3)}/>
      <path d="M250 364 q-14 14 -26 4 M250 364 q14 14 26 4" fill="none" ${s(4)}/>`,
  },

  koala: {
    bg: `${sky("#c4f0dc", "#eefbf4")}${cloud(300, 70, 0.7)}${sun(70, 80, 32)}
      <path d="M220 640 V420 Q200 380 140 360 M240 420 Q270 380 340 370" fill="none" stroke="${K}" stroke-width="44" stroke-linecap="round"/>
      <path d="M220 640 V420 Q200 380 140 360 M240 420 Q270 380 340 370" fill="none" stroke="#a8826a" stroke-width="32" stroke-linecap="round"/>
      <g fill="#7cc2a0" ${s(3)}><ellipse cx="110" cy="350" rx="40" ry="14" transform="rotate(-20 110 350)"/><ellipse cx="90" cy="380" rx="34" ry="12" transform="rotate(20 90 380)"/><ellipse cx="380" cy="360" rx="40" ry="14" transform="rotate(20 380 360)"/><ellipse cx="400" cy="390" rx="34" ry="12" transform="rotate(-20 400 390)"/></g>
      <g fill="#7cc2a0" ${s(3)}><ellipse cx="60" cy="560" rx="40" ry="14"/><ellipse cx="420" cy="590" rx="40" ry="14"/></g>`,
    fg: `<ellipse cx="236" cy="470" rx="90" ry="80" fill="#a9b0b8" ${S}/>
      <ellipse cx="236" cy="490" rx="50" ry="50" fill="#e8ecef"/>
      <g fill="#a9b0b8" ${s(5)}><ellipse cx="160" cy="430" rx="22" ry="46" transform="rotate(30 160 430)"/><ellipse cx="312" cy="430" rx="22" ry="46" transform="rotate(-30 312 430)"/></g>
      <g fill="#a9b0b8" ${S}><circle cx="156" cy="300" r="46"/><circle cx="316" cy="300" r="46"/></g>
      <g fill="#f2f2f2"><circle cx="156" cy="304" r="26"/><circle cx="316" cy="304" r="26"/></g>
      <circle cx="236" cy="340" r="80" fill="#b8bec6" ${S}/>
      <path d="M196 330 q12 10 24 0 M252 330 q12 10 24 0" fill="none" ${s(5)}/>
      <ellipse cx="236" cy="368" rx="22" ry="28" fill="#4a4a52" ${s(4)}/>
      <path d="M224 404 q12 8 24 0" fill="none" ${s(4)}/>
      ${zzz(320, 250)}`,
  },

  penguin: {
    bg: `${land("#d8f0ff", "#f6fcff", "#f4f9ff", 480)}
      <g fill="#cfe6f7" ${s(4)}><path d="M20 480 L80 380 L140 480Z"/><path d="M360 480 L430 360 L480 420 V480Z"/></g>
      ${cloud(250, 70, 0.7)}${sun(80, 90, 30)}
      <path d="M60 540 q60 -10 120 0 M300 580 q60 -10 120 0" fill="none" stroke="#bcd8ee" stroke-width="5" stroke-linecap="round"/>
      <g fill="#fff"><circle cx="100" cy="160" r="4"/><circle cx="380" cy="200" r="4"/><circle cx="300" cy="140" r="3"/><circle cx="160" cy="260" r="3"/></g>`,
    fg: `<path d="M170 540 Q140 380 200 260 Q240 200 280 260 Q340 380 310 540Z" fill="#56647a" ${S}/>
      <path d="M200 520 Q180 400 220 300 Q240 280 260 300 Q300 400 280 520Z" fill="#fbfbfb" ${s(4)}/>
      <path d="M212 290 Q240 310 268 290 Q262 330 240 336 Q218 330 212 290Z" fill="#ffc64a"/>
      <g fill="#56647a" ${s(5)}><path d="M176 330 Q140 400 150 460 Q176 420 190 360Z"/><path d="M304 330 Q340 400 330 460 Q304 420 290 360Z"/></g>
      ${eye(220, 250, 9)}${eye(260, 250, 9)}
      <path d="M232 266 L240 290 L248 266Z" fill="#ff9a3c" ${s(3)}/>
      <ellipse cx="240" cy="540" rx="34" ry="22" fill="#fff6dc" ${S}/>
      <g fill="#ff9a3c" ${s(4)}><path d="M190 556 l-20 10 h50Z"/><path d="M290 556 l20 10 h-50Z"/></g>`,
  },

  giraffe: {
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
  },

  polarbear: {
    bg: `${sky("#d8f0ff", "#f4fbff")}${sun(400, 80, 30)}${cloud(50, 80, 0.6)}
      <path d="M0 360 H480 V640 H0Z" fill="#6fa8d8"/>
      <path d="M-10 480 Q100 450 260 470 Q400 470 500 490 L500 600 L-10 600Z" fill="#f4f9ff" ${S}/>
      <g fill="#e2eef8" ${s(4)}><path d="M360 360 L400 300 L450 360Z"/></g>
      <path d="M40 400 q50 -10 100 0 M300 420 q50 -10 100 0" fill="none" stroke="#a8ccec" stroke-width="5" stroke-linecap="round"/>
      ${fish(80, 560, 0.9, "#7aa8d8")}`,
    fg: `<path d="M110 470 Q110 360 250 350 Q390 360 390 470 Q390 530 250 534 Q110 530 110 470Z" fill="#f8f8f2" ${S}/>
      <g fill="#f8f8f2" ${s(5)}><rect x="140" y="480" width="44" height="70" rx="16"/><rect x="310" y="480" width="44" height="70" rx="16"/></g>
      <path d="M140 548 h44 M310 548 h44" ${s(3)}/>
      <g fill="#f8f8f2" ${S}><circle cx="120" cy="300" r="20"/><circle cx="210" cy="296" r="20"/></g>
      <ellipse cx="164" cy="350" rx="70" ry="60" fill="#f8f8f2" ${S}/>
      <ellipse cx="124" cy="376" rx="34" ry="24" fill="#f0eee4" ${s(4)}/>
      <ellipse cx="108" cy="368" rx="12" ry="9" fill="#3a3a3a"/>
      ${eye(150, 334, 10)}${eye(196, 334, 10)}
      <path d="M110 390 q14 10 28 0" fill="none" ${s(3)}/>`,
  },

  antqueen: {
    bg: `<rect width="480" height="640" fill="#e8b878"/>
      <rect width="480" height="110" fill="#bfe6ff"/><path d="M0 110 Q120 96 240 110 T480 106 V130 H0Z" fill="#8fd16a"/><path d="M0 130 H480" ${S}/>
      ${tufts([[40, 112], [220, 108], [440, 110]])}
      <g fill="#d89a55" ${s(4)}><ellipse cx="90" cy="250" rx="70" ry="40"/><ellipse cx="400" cy="270" rx="66" ry="38"/><ellipse cx="80" cy="560" rx="70" ry="40"/><ellipse cx="410" cy="570" rx="64" ry="38"/></g>
      <path d="M90 210 Q140 160 160 130 M400 232 Q360 180 340 130" fill="none" stroke="#d89a55" stroke-width="22"/>
      <g fill="#fffaf0" ${s(3)}><ellipse cx="70" cy="560" rx="10" ry="14"/><ellipse cx="92" cy="566" rx="10" ry="14"/><ellipse cx="110" cy="556" rx="10" ry="14"/><ellipse cx="390" cy="270" rx="12" ry="8"/><ellipse cx="414" cy="276" rx="12" ry="8"/></g>
      <g fill="#8a4a2a"><ellipse cx="80" cy="250" rx="10" ry="6"/><circle cx="96" cy="250" r="5"/><ellipse cx="420" cy="572" rx="10" ry="6"/><circle cx="436" cy="572" r="5"/></g>`,
    fg: `<g fill="none" ${s(5)}><path d="M210 380 L160 440 L140 500"/><path d="M230 390 L210 470 L200 530"/><path d="M260 390 L290 460 L300 520"/><path d="M200 370 L140 380 L110 420"/><path d="M270 370 L330 390 L350 440"/><path d="M280 380 L340 430 L380 470"/></g>
      <ellipse cx="320" cy="430" rx="90" ry="70" fill="#a8582a" ${S}/>
      <path d="M260 400 q60 -30 120 0 M250 440 q70 -30 140 0 M270 480 q50 -20 100 0" fill="none" stroke="#7a3a1a" stroke-width="5"/>
      <ellipse cx="226" cy="370" rx="40" ry="30" fill="#b8683a" ${S}/>
      <circle cx="160" cy="330" r="46" fill="#b8683a" ${S}/>
      ${eye(144, 320, 11)}${eye(178, 320, 11)}
      <path d="M150 350 q10 8 20 0" fill="none" ${s(3)}/>
      <path d="M140 290 q-20 -30 -10 -60 M176 288 q10 -34 34 -46" fill="none" ${s(4)}/>
      <path d="M126 290 L132 262 L146 278 L160 256 L174 278 L188 262 L194 290Z" fill="#ffd23f" ${s(4)}/>`,
  },

  horse: {
    bg: `${land("#cfeaff", "#f2fbff", "#9fd27a", 470)}${sun(400, 80, 34)}${cloud(80, 80, 0.7)}
      <g fill="#e8c27a" ${s(4)}><rect x="20" y="380" width="14" height="100"/><rect x="120" y="384" width="14" height="96"/><rect x="380" y="386" width="14" height="94"/><rect x="450" y="380" width="14" height="100"/></g>
      <path d="M0 400 h150 M0 440 h150 M370 404 h110 M370 444 h110" stroke="#e8c27a" stroke-width="10"/>
      ${tufts([[60, 500], [220, 610], [430, 560]])}${flower(120, 590, "#ffd23f", 1)}${flower(380, 610, "#ff8fb1", 1)}`,
    fg: `<g fill="#b06a3a" ${S}><rect x="150" y="410" width="30" height="140" rx="10"/><rect x="320" y="410" width="30" height="140" rx="10"/></g>
      <path d="M150 548 h30 M320 548 h30" stroke="${K}" stroke-width="12"/>
      <path d="M350 360 q60 10 50 110 q-20 -40 -40 -60Z" fill="#6a3a1e" ${S}/>
      <ellipse cx="260" cy="390" rx="110" ry="60" fill="#c07a44" ${S}/>
      <g fill="#c07a44" ${s(5)}><rect x="190" y="420" width="30" height="130" rx="10"/><rect x="290" y="420" width="30" height="130" rx="10"/></g>
      <path d="M190 548 h30 M290 548 h30" stroke="${K}" stroke-width="12"/>
      <path d="M180 380 L120 260 L170 240 L220 360Z" fill="#c07a44" ${S}/>
      <path d="M124 250 Q150 270 176 340 Q190 300 168 240Z" fill="#6a3a1e" ${s(4)}/>
      <path d="M140 230 Q80 230 70 280 Q80 310 120 300 L170 270Z" fill="#c07a44" ${S}/>
      <path d="M150 230 l6 -26 l14 24" fill="#c07a44" ${s(4)}/>
      <path d="M124 252 q10 8 20 0" fill="none" ${s(4)}/>
      <ellipse cx="82" cy="284" rx="6" ry="4" fill="${K}"/>
      ${zzz(40, 200)}`,
  },

  panda: {
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
  },

  ostrich: {
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
  },

  hippo: {
    bg: `${land("#c4ecff", "#effaff", "#9fd27a", 420)}${sun(400, 80, 36)}${cloud(40, 90, 0.6)}
      <path d="M0 500 Q240 480 480 500 V640 H0Z" fill="#6cb8e6"/><path d="M0 500 Q240 480 480 500" fill="none" ${S}/>
      <path d="M40 560 q50 -12 100 0 M300 590 q60 -12 120 0" fill="none" stroke="#bfe6fb" stroke-width="6" stroke-linecap="round"/>
      ${tufts([[40, 430], [440, 430]])}<g fill="#7cc25a" ${s(3)}><ellipse cx="420" cy="600" rx="40" ry="12"/></g>${flower(420, 580, "#ff9ec4", 0.9)}`,
    fg: `<path d="M100 420 Q110 320 270 320 Q400 330 400 430 Q390 520 260 524 Q110 520 100 420Z" fill="#a898b8" ${S}/>
      <g fill="#a898b8" ${s(5)}><rect x="150" y="480" width="40" height="50" rx="12"/><rect x="320" y="480" width="40" height="50" rx="12"/></g>
      <path d="M90 420 Q60 380 80 330 Q120 280 200 300 Q220 360 200 420Z" fill="#b8a8c8" ${S}/>
      <ellipse cx="110" cy="390" rx="50" ry="40" fill="#c4b4d4" ${S}/>
      <g fill="#8a7a9a"><ellipse cx="90" cy="378" rx="7" ry="5"/><ellipse cx="120" cy="374" rx="7" ry="5"/></g>
      <g fill="#a898b8" ${s(4)}><circle cx="150" cy="290" r="14"/><circle cx="190" cy="296" r="14"/></g>
      ${eye(150, 320, 10)}${eye(184, 324, 10)}
      <path d="M80 408 q30 20 60 0" fill="none" ${s(4)}/>
      <g fill="#e2453a" ${s(2)}><path d="M240 360 q6 10 0 16 q-6 -6 0 -16Z"/><path d="M290 380 q6 10 0 16 q-6 -6 0 -16Z"/><path d="M330 350 q6 10 0 16 q-6 -6 0 -16Z"/></g>`,
  },

  gorilla: {
    bg: `${sky("#c9f0c4", "#effbe8")}
      <g fill="#6cb04a" ${s(4)}><path d="M0 120 q60 40 40 120 q-30 -20 -40 -40Z"/><path d="M480 100 q-70 40 -50 130 q30 -20 50 -40Z"/><path d="M0 330 q80 20 70 90 q-40 -10 -70 -30Z"/><path d="M480 330 q-80 20 -70 90 q40 -10 70 -30Z"/></g>
      <path d="M0 520 Q240 500 480 520 V640 H0Z" fill="#7cc25a"/><path d="M0 520 Q240 500 480 520" fill="none" ${S}/>
      ${flower(60, 580, "#ff8fb1", 1.1)}${flower(420, 600, "#ffd23f", 1)}${tufts([[200, 610], [320, 600]])}
      <g transform="translate(400 560)"><path d="M0 0 q20 -40 0 -60" stroke="#ffd23f" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M0 0 q20 -40 0 -60" ${s(3)} fill="none"/></g>`,
    fg: `<path d="M120 560 Q100 380 240 350 Q380 380 360 560Z" fill="#6e7480" ${S}/>
      <ellipse cx="240" cy="470" rx="60" ry="64" fill="#8e8a92"/>
      <g fill="#6e7480" ${S}><path d="M140 400 Q90 470 110 560 h40 Q150 480 170 430Z"/><path d="M340 400 Q390 470 370 560 h-40 Q330 480 310 430Z"/></g>
      <circle cx="240" cy="300" r="76" fill="#6e7480" ${S}/>
      <path d="M180 300 Q180 250 240 250 Q300 250 300 300 Q300 360 240 364 Q180 360 180 300Z" fill="#a8968a" ${s(4)}/>
      ${eye(216, 290, 11)}${eye(264, 290, 11)}
      <path d="M220 320 q20 -10 40 0" fill="none" ${s(4)}/><g fill="${K}"><ellipse cx="232" cy="322" rx="5" ry="4"/><ellipse cx="248" cy="322" rx="5" ry="4"/></g>
      <path d="M226 342 q14 8 28 0" fill="none" ${s(3)}/>`,
  },

  dolphin: {
    bg: `${water("#9ad8f0", "#4f9fd0", "#e8d29f")}${weeds([40, 440])}${bubbles([[100, 140, 10], [118, 108, 6], [380, 120, 8]])}
      ${fish(380, 520, 0.9, "#ffd23f", true)}${fish(90, 480, 0.85, "#ff9a3c")}`,
    fg: `<path d="M100 420 Q120 300 260 290 Q370 290 400 340 Q420 380 380 400 Q300 440 200 440 Q140 440 100 420Z" fill="#8fb6d8" ${S}/>
      <path d="M130 430 Q220 430 300 410 Q360 396 384 396 Q340 432 220 444Z" fill="#e8f2fb"/>
      <path d="M250 296 L280 230 L310 300Z" fill="#7ea4c8" ${S}/>
      <path d="M120 420 L60 390 L70 440 L50 480 L130 440Z" fill="#7ea4c8" ${S}/>
      <path d="M260 420 L240 470 L290 428Z" fill="#7ea4c8" ${S}/>
      <path d="M396 360 Q440 360 444 376 Q420 388 396 384Z" fill="#8fb6d8" ${S}/>
      ${eye(350, 340, 11)}
      <path d="M396 384 q-30 10 -60 0" fill="none" ${s(4)}/>
      ${zzz(200, 250)}`,
  },

  crocodile: {
    bg: `${land("#d0f0d8", "#f0fbf2", "#9fd27a", 440)}${sun(400, 80, 34)}${cloud(40, 90, 0.6)}
      <path d="M0 520 Q240 500 480 520 V640 H0Z" fill="#7cbfa8"/><path d="M0 520 Q240 500 480 520" fill="none" ${S}/>
      <g fill="#7cc25a" ${s(3)}><ellipse cx="80" cy="580" rx="40" ry="12"/><ellipse cx="380" cy="600" rx="44" ry="12"/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M450 450 q8 -90 -6 -160"/><path d="M30 450 q-4 -80 10 -140"/></g>`,
    fg: `<path d="M380 420 Q470 430 470 470 Q430 470 380 460Z" fill="#5fae5a" ${S}/>
      <path d="M120 420 Q140 360 260 360 Q380 370 390 430 Q370 480 260 484 Q140 480 120 420Z" fill="#6cbf64" ${S}/>
      <path d="M180 366 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14 l10 -14 l10 14" fill="none" ${s(4)}/>
      <g fill="#6cbf64" ${s(5)}><path d="M170 470 l-20 40 h36Z"/><path d="M330 470 l20 40 h-36Z"/></g>
      <path d="M150 400 L30 410 Q20 430 40 440 L150 444Z" fill="#7ad070" ${S}/>
      <path d="M44 440 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12 l8 -12 l8 12" fill="#fff" ${s(3)}/>
      <circle cx="140" cy="370" r="22" fill="#7ad070" ${S}/>${eye(140, 368, 10)}
      <g fill="${K}"><circle cx="40" cy="416" r="4"/></g>`,
  },

  flamingo: {
    bg: `${land("#ffd6e4", "#fff2f6", "#a8dcc0", 440)}${sun(80, 90, 36)}${cloud(300, 70, 0.6)}
      <path d="M0 500 Q240 480 480 500 V640 H0Z" fill="#8fd0ec"/><path d="M0 500 Q240 480 480 500" fill="none" ${S}/>
      <path d="M30 560 q50 -12 100 0 M310 590 q60 -12 120 0" fill="none" stroke="#c8ecfa" stroke-width="6" stroke-linecap="round"/>
      <g fill="#ff9a8a" ${s(3)}><path d="M90 610 q14 -12 28 0 q-14 6 -28 0Z"/><path d="M380 560 q14 -12 28 0 q-14 6 -28 0Z"/></g>
      <g fill="none" stroke="#4f9a35" stroke-width="7" stroke-linecap="round"><path d="M450 450 q8 -90 -6 -160"/></g>`,
    fg: `<path d="M240 420 V560 M240 470 L280 440 L250 420" fill="none" stroke="${K}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M240 420 V560 M240 470 L280 440 L250 420" fill="none" stroke="#ff8fa8" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
      <ellipse cx="260" cy="380" rx="90" ry="54" fill="#ff9ab8" ${S}/>
      <path d="M220 360 q60 -30 120 10 q-30 30 -80 20Z" fill="#ff7aa0" ${s(4)}/>
      <path d="M190 370 Q130 330 150 270 Q170 220 200 230 Q230 240 200 270" fill="none" stroke="${K}" stroke-width="30" stroke-linecap="round"/>
      <path d="M190 370 Q130 330 150 270 Q170 220 200 230 Q230 240 200 270" fill="none" stroke="#ff9ab8" stroke-width="18" stroke-linecap="round"/>
      <circle cx="198" cy="236" r="26" fill="#ff9ab8" ${S}/>${eye(202, 230, 9)}
      <path d="M220 236 Q250 240 246 270 Q234 260 218 250Z" fill="#fff" ${s(4)}/><path d="M240 256 Q248 262 246 270 Q238 266 236 258Z" fill="${K}"/>`,
  },

  tuatara: {
    bg: `${land("#d4f0dc", "#f2fbf4", "#a8cf7a", 470)}${cloud(300, 70, 0.6)}${sun(80, 90, 30)}
      ${stones([[60, 500, 40], [420, 520, 46], [300, 610, 26]], "#b9b0a6")}
      <g fill="#6cb04a" ${s(3)}><path d="M20 470 q30 -80 70 -100 q-20 60 -40 100Z"/><path d="M460 470 q-30 -80 -70 -100 q20 60 40 100Z"/></g>
      ${tufts([[200, 480], [120, 610]])}`,
    fg: `<path d="M340 440 Q440 440 450 500 Q400 480 340 470Z" fill="#8a9a6a" ${S}/>
      <path d="M120 430 Q150 360 250 360 Q350 364 350 440 Q320 480 240 482 Q150 480 120 430Z" fill="#9aaa78" ${S}/>
      <path d="M150 372 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18 l8 -18 l8 18" fill="#fffaf0" ${s(3)}/>
      <g fill="#c4c89a"><circle cx="200" cy="420" r="6"/><circle cx="240" cy="440" r="5"/><circle cx="280" cy="420" r="6"/><circle cx="310" cy="440" r="4"/></g>
      <g fill="#9aaa78" ${s(5)}><path d="M170 470 l-24 40 h40Z"/><path d="M310 470 l20 40 h-38Z"/></g>
      <path d="M140 420 Q90 420 70 400 Q70 360 110 350 Q150 350 160 380Z" fill="#a8b884" ${S}/>
      <circle cx="116" cy="352" r="5" fill="#ffd23f" ${s(2)}/>
      ${eye(112, 376, 10)}
      <path d="M74 400 q16 6 30 0" fill="none" ${s(3)}/>
      <g transform="translate(400 540) scale(.45)"><path d="M120 430 Q150 360 250 360 Q350 364 350 440 Q320 480 240 482 Q150 480 120 430Z" fill="#9aaa78" ${S}/><path d="M140 420 Q90 420 70 400 Q70 360 110 350 Q150 350 160 380Z" fill="#a8b884" ${S}/>${eye(112, 376, 14)}</g>`,
  },

  human: {
    bg: `<rect width="480" height="640" fill="#ffe8d0"/>
      <path d="M0 60 Q60 100 120 60 Q180 100 240 60 Q300 100 360 60 Q420 100 480 60" fill="none" ${s(4)}/>
      <g ${s(3)}><path d="M40 72 l14 30 l14 -26Z" fill="#ff8fb1"/><path d="M160 72 l14 30 l14 -26Z" fill="#ffd23f"/><path d="M280 72 l14 30 l14 -26Z" fill="#7cc8e8"/><path d="M400 72 l14 30 l14 -26Z" fill="#b892ff"/></g>
      <rect x="320" y="150" width="130" height="150" rx="8" fill="#bfe6ff" ${S}/><path d="M385 150 v150 M320 225 h130" ${S}/>
      <rect y="480" width="480" height="160" fill="#d89a5a"/><path d="M0 480 h480" ${S}/>
      <g transform="translate(390 470)"><rect x="-56" y="-60" width="112" height="60" rx="8" fill="#fff3df" ${S}/><path d="M-56 -40 q14 10 28 0 q14 10 28 0 q14 10 28 0 q14 10 28 0" fill="none" stroke="#ff8fb1" stroke-width="6"/><g ${s(3)}><rect x="-34" y="-92" width="8" height="32" fill="#7cc8e8"/><rect x="-4" y="-92" width="8" height="32" fill="#ffd23f"/><rect x="26" y="-92" width="8" height="32" fill="#ff8fb1"/></g><g fill="#ffb347"><ellipse cx="-30" cy="-100" rx="5" ry="8"/><ellipse cx="0" cy="-100" rx="5" ry="8"/><ellipse cx="30" cy="-100" rx="5" ry="8"/></g></g>
      <g fill="#e2453a" ${s(3)}><circle cx="60" cy="240" r="24"/><path d="M60 264 q-6 40 6 80" fill="none"/></g>`,
    fg: `<path d="M120 600 Q120 420 220 410 Q320 420 320 600Z" fill="#9fc8e8" ${S}/>
      <path d="M220 420 v180" ${s(3)}/><g fill="#fff"><circle cx="210" cy="460" r="5"/><circle cx="210" cy="510" r="5"/><circle cx="210" cy="560" r="5"/></g>
      <path d="M300 440 Q350 380 350 320" fill="none" stroke="${K}" stroke-width="34" stroke-linecap="round"/><path d="M300 440 Q350 380 350 320" fill="none" stroke="#9fc8e8" stroke-width="22" stroke-linecap="round"/>
      <circle cx="352" cy="306" r="18" fill="#ffd9b8" ${S}/>
      <circle cx="220" cy="230" r="34" fill="#e8e8ee" ${S}/>
      <path d="M150 330 Q140 230 220 230 Q300 230 290 330 Q270 280 220 276 Q170 280 150 330Z" fill="#e8e8ee" ${S}/>
      <circle cx="220" cy="330" r="70" fill="#ffd9b8" ${S}/>
      <path d="M152 320 Q160 270 220 270 Q280 270 288 320 Q260 290 220 292 Q180 290 152 320Z" fill="#e8e8ee" ${s(4)}/>
      <g fill="none" ${s(4)}><circle cx="194" cy="330" r="18"/><circle cx="246" cy="330" r="18"/><path d="M212 330 h16"/></g>
      <g fill="${K}"><circle cx="196" cy="332" r="5"/><circle cx="248" cy="332" r="5"/></g>
      <path d="M196 366 q24 20 48 0" fill="none" ${s(4)}/>
      <circle cx="170" cy="360" r="9" fill="#ff9ab0" opacity=".7"/><circle cx="270" cy="360" r="9" fill="#ff9ab0" opacity=".7"/>`,
  },

  sturgeon: {
    bg: `${water("#b4e0d8", "#6aaec0", "#d8c89a")}${weeds([30, 450])}${stones([[120, 600, 22], [360, 610, 18]])}
      ${bubbles([[90, 150, 9], [104, 118, 5], [400, 180, 8]])}${fish(400, 260, 0.85, "#ffd23f", true)}`,
    fg: `<path d="M370 380 L450 320 L430 390 L460 450Z" fill="#8a9a84" ${S}/>
      <path d="M50 400 Q90 340 220 336 Q340 340 380 390 Q340 440 220 444 Q100 444 50 400Z" fill="#a8b49a" ${S}/>
      <path d="M70 412 Q160 440 260 436 Q330 432 360 410" fill="none" stroke="#e8ecd8" stroke-width="12" stroke-linecap="round"/>
      <g fill="#e8e2c8" ${s(3)}><path d="M120 344 l10 -14 l10 14Z"/><path d="M160 338 l10 -14 l10 14Z"/><path d="M200 336 l10 -14 l10 14Z"/><path d="M240 336 l10 -14 l10 14Z"/><path d="M280 340 l10 -14 l10 14Z"/><path d="M320 350 l10 -14 l10 14Z"/></g>
      <g fill="#e8e2c8" ${s(3)}><path d="M140 400 l10 -10 l10 10 l-10 10Z"/><path d="M190 404 l10 -10 l10 10 l-10 10Z"/><path d="M240 404 l10 -10 l10 10 l-10 10Z"/><path d="M290 400 l10 -10 l10 10 l-10 10Z"/></g>
      <path d="M200 440 L180 480 L230 444Z" fill="#8a9a84" ${S}/>
      ${eye(100, 380, 9)}
      <path d="M60 414 l-6 20 M72 418 l-2 22 M84 420 l2 20" ${s(3)}/>`,
  },

  urchin: {
    bg: `${water("#a8dcf0", "#5aa8d0", "#e8d29f")}
      <g fill="none" stroke="#7a9a3a" stroke-width="16" stroke-linecap="round"><path d="M40 600 Q20 400 60 180"/><path d="M440 600 Q470 380 420 160"/></g>
      <g fill="#9ab84a" ${s(3)}><ellipse cx="70" cy="300" rx="30" ry="12" transform="rotate(-30 70 300)"/><ellipse cx="410" cy="300" rx="30" ry="12" transform="rotate(30 410 300)"/><ellipse cx="50" cy="440" rx="30" ry="12"/></g>
      ${stones([[380, 590, 26], [120, 600, 18]])}${bubbles([[200, 140, 9], [214, 110, 5]])}${fish(360, 200, 0.85, "#ffd23f", true)}`,
    fg: `<g stroke="${K}" stroke-width="12" stroke-linecap="round">
        <path d="M240 420 L240 250"/><path d="M240 420 L330 270"/><path d="M240 420 L390 340"/><path d="M240 420 L410 430"/><path d="M240 420 L380 520"/><path d="M240 420 L100 520"/><path d="M240 420 L70 430"/><path d="M240 420 L90 340"/><path d="M240 420 L150 270"/><path d="M240 420 L190 256"/><path d="M240 420 L290 256"/></g>
      <g stroke="#c43a5a" stroke-width="6" stroke-linecap="round">
        <path d="M240 420 L240 250"/><path d="M240 420 L330 270"/><path d="M240 420 L390 340"/><path d="M240 420 L410 430"/><path d="M240 420 L380 520"/><path d="M240 420 L100 520"/><path d="M240 420 L70 430"/><path d="M240 420 L90 340"/><path d="M240 420 L150 270"/><path d="M240 420 L190 256"/><path d="M240 420 L290 256"/></g>
      <ellipse cx="240" cy="440" rx="110" ry="90" fill="#d9486a" ${S}/>
      <g fill="#f58aa0"><circle cx="190" cy="400" r="6"/><circle cx="290" cy="400" r="6"/><circle cx="240" cy="380" r="6"/><circle cx="170" cy="460" r="5"/><circle cx="310" cy="460" r="5"/></g>
      ${eye(208, 440, 13)}${eye(272, 440, 13)}
      <path d="M226 474 q14 12 28 0" fill="none" ${s(4)}/>
      <g fill="#ffd1dc" ${s(2)}><circle cx="170" cy="536" r="6"/><circle cx="200" cy="546" r="6"/><circle cx="240" cy="550" r="6"/><circle cx="280" cy="546" r="6"/><circle cx="310" cy="536" r="6"/></g>`,
  },

  quahog: {
    bg: `${water("#9ad0e0", "#4f8fb8", "#d8c89a")}${weeds([40, 440], "#5a9a6a")}${stones([[100, 600, 18], [400, 600, 24]])}
      ${bubbles([[240, 150, 10], [254, 116, 6], [230, 90, 4]])}${fish(90, 260, 0.85, "#ffd23f")}${fish(400, 220, 0.85, "#ff9a3c", true)}`,
    fg: `<path d="M100 470 Q100 330 240 320 Q380 330 380 470 Q240 500 100 470Z" fill="#c9a07a" ${S}/>
      <g fill="none" stroke="#8a6a4a" stroke-width="5"><path d="M120 450 Q130 350 240 342 Q350 350 360 450"/><path d="M140 452 Q150 372 240 366 Q330 372 340 452"/><path d="M160 456 Q170 394 240 390 Q310 394 320 456"/><path d="M180 460 Q190 416 240 414 Q290 416 300 460"/></g>
      <path d="M100 470 Q240 520 380 470 Q370 530 240 540 Q110 530 100 470Z" fill="#b88e66" ${S}/>
      <path d="M150 482 Q240 506 330 482" fill="#3a2a2a" ${s(3)}/>
      ${eye(200, 486, 9)}${eye(280, 486, 9)}
      <path d="M220 330 l20 -20 l20 20" fill="none" ${s(4)}/>`,
  },

  coral: {
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
  },
  butterfly: {
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
  },

  ladybug: {
    bg: `${land("#d4f5d0", "#f0fbe8", "#9fd27a", 520)}${sun(400, 80, 34)}${cloud(40, 90, 0.6)}
      <path d="M0 500 Q160 400 300 420 Q420 436 480 400 L480 480 Q380 510 260 490 Q120 470 0 540Z" fill="#6cc25a" ${S}/>
      <path d="M40 500 Q200 440 440 444" fill="none" stroke="#4f9a35" stroke-width="5"/>
      ${flower(60, 580, "#ff8fb1", 1.1)}${flower(420, 590, "#ffd23f", 1.1)}${tufts([[200, 610], [320, 615]])}`,
    fg: `<path d="M120 430 Q120 300 240 300 Q360 300 360 430 Q350 490 240 494 Q130 490 120 430Z" fill="#ff4f3f" ${S}/>
      <path d="M240 300 V494" ${S}/>
      <g fill="#3a3a48"><circle cx="186" cy="370" r="20"/><circle cx="294" cy="370" r="20"/><circle cx="170" cy="444" r="16"/><circle cx="310" cy="444" r="16"/><circle cx="214" cy="470" r="9"/><circle cx="266" cy="470" r="9"/></g>
      <ellipse cx="160" cy="340" rx="16" ry="10" fill="#fff" opacity=".7" transform="rotate(-30 160 340)"/>
      <g fill="#3a3a48" ${s(4)}><ellipse cx="190" cy="496" rx="16" ry="9"/><ellipse cx="290" cy="496" rx="16" ry="9"/></g>
      <circle cx="240" cy="270" r="66" fill="#ffe2c4" ${S}/>
      <path d="M176 262 Q180 200 240 200 Q300 200 304 262 Q280 226 240 226 Q200 226 176 262Z" fill="#3a3a48" ${s(4)}/>
      ${eye(216, 268, 13)}${eye(264, 268, 13)}
      <circle cx="196" cy="292" r="10" fill="#ff8fb1" opacity=".75"/><circle cx="284" cy="292" r="10" fill="#ff8fb1" opacity=".75"/>
      <path d="M226 296 q14 14 28 0" fill="none" ${s(4)}/>
      <path d="M218 206 q-8 -30 -26 -40 M262 206 q8 -30 26 -40" fill="none" ${s(4)}/><circle cx="190" cy="164" r="9" fill="#ff4f3f" ${s(3)}/><circle cx="290" cy="164" r="9" fill="#ff4f3f" ${s(3)}/>`,
  },
  sloth: {
    bg: `${sky("#c9f0c4", "#effbe8")}${sun(400, 80, 32)}${cloud(60, 90, 0.6)}
      <path d="M-10 236 Q120 210 240 226 Q360 240 490 214" fill="none" stroke="${K}" stroke-width="40" stroke-linecap="round"/>
      <path d="M-10 236 Q120 210 240 226 Q360 240 490 214" fill="none" stroke="#a5683a" stroke-width="28" stroke-linecap="round"/>
      <g fill="#6cc25a" ${s(3)}><ellipse cx="40" cy="206" rx="30" ry="12" transform="rotate(-20 40 206)"/><ellipse cx="80" cy="256" rx="26" ry="11" transform="rotate(30 80 256)"/><ellipse cx="420" cy="196" rx="30" ry="12" transform="rotate(20 420 196)"/><ellipse cx="450" cy="244" rx="26" ry="11" transform="rotate(-30 450 244)"/></g>
      <path d="M0 560 Q240 540 480 560 V640 H0Z" fill="#7cc25a"/><path d="M0 560 Q240 540 480 560" fill="none" ${S}/>
      ${flower(60, 600, "#ff8fb1", 1)}${flower(420, 610, "#ffd23f", 1)}`,
    fg: `<g fill="#b0906a" ${S}><path d="M170 360 Q150 290 166 226 h34 Q196 300 210 360Z"/><path d="M310 360 Q330 290 314 226 h-34 Q284 300 270 360Z"/></g>
      <g fill="none" ${s(5)}><path d="M168 226 q4 -16 14 -16 M186 226 q4 -16 14 -16 M282 226 q4 -16 14 -16 M300 226 q4 -16 14 -16"/></g>
      <ellipse cx="240" cy="440" rx="96" ry="110" fill="#b0906a" ${S}/>
      <path d="M180 430 q20 -10 40 0 M260 430 q20 -10 40 0 M210 480 q30 -10 60 0" fill="none" stroke="#8a6a4a" stroke-width="5" stroke-linecap="round"/>
      <circle cx="240" cy="350" r="70" fill="#b0906a" ${S}/>
      <ellipse cx="240" cy="360" rx="56" ry="46" fill="#f2e2c8" ${s(4)}/>
      <g fill="#7a5a3a"><ellipse cx="212" cy="352" rx="20" ry="13" transform="rotate(-20 212 352)"/><ellipse cx="268" cy="352" rx="20" ry="13" transform="rotate(20 268 352)"/></g>
      ${eye(214, 350, 9)}${eye(266, 350, 9)}
      <ellipse cx="240" cy="372" rx="9" ry="6" fill="#4a3a2a"/>
      <path d="M226 384 q14 12 28 0" fill="none" ${s(4)}/>
      <circle cx="200" cy="378" r="7" fill="#ff9ab0" opacity=".7"/><circle cx="280" cy="378" r="7" fill="#ff9ab0" opacity=".7"/>`,
  },
};

const clean = (x) =>
  x
    .replace(/\n\s+/g, "")
    .replace(/<[^>]+>/g, (tag) => ((tag.match(/stroke-width=/g) || []).length > 1 ? tag.replace(' stroke-width="6"', "") : tag));

mkdirSync("public/art", { recursive: true });

// ---------- Тема оформления (motif в src/data.json): бейдж и мелкие украшения по краям ----------
// Все бейджи вписаны в ту же рамку x 50..430, y 70..570, что и шестиугольник: так Badge.tsx ставит их одинаково.
// Чтобы добавить тему: форма в BADGES и MASKS, цвета и место под текст в src/motifs.json.
const data = JSON.parse(readFileSync("src/data.json", "utf8"));
const motifs = JSON.parse(readFileSync("src/motifs.json", "utf8"));
const motif = data.motif in motifs ? data.motif : "classic";
const C = motifs[motif].badge;
// фигура из нескольких частей без линий внутри: сначала все контуры, потом все заливки поверх
const merged = (parts, fill) =>
  `<g stroke="${K}" stroke-width="26" stroke-linejoin="round" fill="${K}">${parts}</g><g fill="${fill}">${parts}</g>`;
const PAD = `<path d="M240 222 C342 222 434 300 430 420 C426 534 342 572 240 550 C138 572 54 534 50 420 C46 300 138 222 240 222Z"/>`;
const TOES = `<ellipse cx="96" cy="196" rx="40" ry="50" transform="rotate(-24 96 196)"/><ellipse cx="184" cy="122" rx="44" ry="54" transform="rotate(-8 184 122)"/><ellipse cx="296" cy="122" rx="44" ry="54" transform="rotate(8 296 122)"/><ellipse cx="384" cy="196" rx="40" ry="50" transform="rotate(24 384 196)"/>`;
const CLOUD = `<rect x="52" y="300" width="376" height="236" rx="110"/><circle cx="158" cy="276" r="96"/><circle cx="292" cy="230" r="128"/><circle cx="372" cy="318" r="62"/>`;
const BADGES = {
  classic: (fill) => `<path d="M240 70 L430 180 L430 460 L240 570 L50 460 L50 180Z" fill="${fill}" stroke="${K}" stroke-width="9" stroke-linejoin="round"/>`,
  // лапка: подушечка под число и четыре пальчика
  animals: (fill) => `<g fill="${fill}" ${s(13)}>${PAD}</g><g fill="${fill}" ${s(13)}>${TOES}</g>`,
  // облако
  sky: (fill) => merged(CLOUD, fill),
};
const MASKS = {
  classic: BADGES.classic("#000"),
  animals: `<g fill="#000">${PAD}${TOES}</g>`,
  sky: `<g fill="#000">${CLOUD}</g>`,
};

// бейдж рисуем на белом (потом станут прозрачными PNG); маска — подложка под бейдж
writeFileSync("public/art/badge.svg", clean(svg(`<rect width="480" height="640" fill="#fff"/>${BADGES[motif](C)}`)));
writeFileSync("public/art/badge-mask.svg", clean(svg(MASKS[motif])));
for (const [id, sc] of Object.entries(scenes)) {
  writeFileSync(`public/art/${id}-bg.svg`, clean(svg(sc.bg)));
  writeFileSync(`public/art/${id}-fg.svg`, clean(svg(sc.fg)));
}
console.log("ok", Object.keys(scenes).length, "motif", motif);
