import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

const CYR = "U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116";
const LAT = "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+221E, U+FEFF, U+FFFD";

const faces = [
  ["Nunito", "800", "nunito-cyrillic-800-normal.woff2", CYR],
  ["Nunito", "800", "nunito-latin-800-normal.woff2", LAT],
  ["Nunito", "900", "nunito-cyrillic-900-normal.woff2", CYR],
  ["Nunito", "900", "nunito-latin-900-normal.woff2", LAT],
  ["Caveat", "700", "caveat-cyrillic-700-normal.woff2", CYR],
  ["Caveat", "700", "caveat-latin-700-normal.woff2", LAT],
] as const;

for (const [family, weight, file, unicodeRange] of faces) {
  loadFont({ family, weight, unicodeRange, url: staticFile(`fonts/${file}`) });
}

export const HAND = "Caveat, Nunito, sans-serif";
export const BODY = "Nunito, sans-serif";
