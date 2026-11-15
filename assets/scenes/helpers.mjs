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


export { K, S, s, eye, cloud, sun, sky, shadow, bubbles, tufts, stones, flower, fish, birdV, svg, land, water, weeds, tree, zzz, heart };
