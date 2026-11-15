import {writeFileSync,mkdirSync,readFileSync} from "node:fs";
import {K,s,svg} from "../assets/scenes/helpers.mjs";
mkdirSync("public/art",{recursive:true});
const clean=x=>x;
const motifs=JSON.parse(readFileSync("src/motifs.json","utf8"));
const motif=process.argv[2]??"classic";
if(!motifs[motif])throw new Error("Unknown motif: "+motif);
const C=process.argv[3] || motifs[motif].badge;
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