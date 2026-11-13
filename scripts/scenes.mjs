// Сцены для карандашной версии. Каждая сцена = фон (bg) + животное (fg).
// Животное рисуется отдельным слоем, чтобы в ролике оно могло немного подвигаться, а фон стоял.
// Пишет public/art/<id>-bg.svg и public/art/<id>-fg.svg (480x640).
import { writeFileSync, mkdirSync } from "node:fs";

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
};

const clean = (x) =>
  x
    .replace(/\n\s+/g, "")
    .replace(/<[^>]+>/g, (tag) => ((tag.match(/stroke-width=/g) || []).length > 1 ? tag.replace(' stroke-width="6"', "") : tag));

mkdirSync("public/art", { recursive: true });
// бейдж: красный шестиугольник на белом (потом станет прозрачным PNG)
writeFileSync("public/art/badge.svg", clean(svg(`<rect width="480" height="640" fill="#fff"/><path d="M240 70 L430 180 L430 460 L240 570 L50 460 L50 180Z" fill="#e5332a" stroke="${K}" stroke-width="9" stroke-linejoin="round"/>`)));
for (const [id, sc] of Object.entries(scenes)) {
  writeFileSync(`public/art/${id}-bg.svg`, clean(svg(sc.bg)));
  writeFileSync(`public/art/${id}-fg.svg`, clean(svg(sc.fg)));
}
console.log("ok", Object.keys(scenes).length);
