// Legacy scene export; new episodes use scripts/lib/assets.mjs.
import {writeFileSync,mkdirSync,readFileSync} from "node:fs";
import {K,s,svg} from "../assets/scenes/helpers.mjs";
import cat from "../assets/scenes/cat.mjs";
import jellyfish from "../assets/scenes/jellyfish.mjs";
import mayfly from "../assets/scenes/mayfly.mjs";
import bee from "../assets/scenes/bee.mjs";
import axolotl from "../assets/scenes/axolotl.mjs";
import platypus from "../assets/scenes/platypus.mjs";
import molerat from "../assets/scenes/molerat.mjs";
import elephant from "../assets/scenes/elephant.mjs";
import kakapo from "../assets/scenes/kakapo.mjs";
import tortoise from "../assets/scenes/tortoise.mjs";
import whale from "../assets/scenes/whale.mjs";
import shark from "../assets/scenes/shark.mjs";
import mosquito from "../assets/scenes/mosquito.mjs";
import housefly from "../assets/scenes/housefly.mjs";
import chameleon from "../assets/scenes/chameleon.mjs";
import octopus from "../assets/scenes/octopus.mjs";
import hamster from "../assets/scenes/hamster.mjs";
import guineapig from "../assets/scenes/guineapig.mjs";
import capybara from "../assets/scenes/capybara.mjs";
import rabbit from "../assets/scenes/rabbit.mjs";
import hummingbird from "../assets/scenes/hummingbird.mjs";
import dog from "../assets/scenes/dog.mjs";
import lion from "../assets/scenes/lion.mjs";
import koala from "../assets/scenes/koala.mjs";
import penguin from "../assets/scenes/penguin.mjs";
import giraffe from "../assets/scenes/giraffe.mjs";
import polarbear from "../assets/scenes/polarbear.mjs";
import antqueen from "../assets/scenes/antqueen.mjs";
import horse from "../assets/scenes/horse.mjs";
import panda from "../assets/scenes/panda.mjs";
import ostrich from "../assets/scenes/ostrich.mjs";
import hippo from "../assets/scenes/hippo.mjs";
import gorilla from "../assets/scenes/gorilla.mjs";
import dolphin from "../assets/scenes/dolphin.mjs";
import crocodile from "../assets/scenes/crocodile.mjs";
import flamingo from "../assets/scenes/flamingo.mjs";
import tuatara from "../assets/scenes/tuatara.mjs";
import human from "../assets/scenes/human.mjs";
import sturgeon from "../assets/scenes/sturgeon.mjs";
import urchin from "../assets/scenes/urchin.mjs";
import quahog from "../assets/scenes/quahog.mjs";
import coral from "../assets/scenes/coral.mjs";
import butterfly from "../assets/scenes/butterfly.mjs";
import ladybug from "../assets/scenes/ladybug.mjs";
import sloth from "../assets/scenes/sloth.mjs";
export const scenes = {cat,jellyfish,mayfly,bee,axolotl,platypus,molerat,elephant,kakapo,tortoise,whale,shark,mosquito,housefly,chameleon,octopus,hamster,guineapig,capybara,rabbit,hummingbird,dog,lion,koala,penguin,giraffe,polarbear,antqueen,horse,panda,ostrich,hippo,gorilla,dolphin,crocodile,flamingo,tuatara,human,sturgeon,urchin,quahog,coral,butterfly,ladybug,sloth};
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
