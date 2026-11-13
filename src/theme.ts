export type Theme = "pencil" | "photo";

import motifs from "./motifs.json";

// Тема оформления: форма бейджа, украшения по краям, цвета заголовков. См. src/motifs.json
export type MotifName = keyof typeof motifs;
export type Motif = (typeof motifs)[MotifName];
export const motifOf = (name?: string): Motif => motifs[(name && name in motifs ? name : "classic") as MotifName];

export type Move = "hop" | "fly" | "swim" | "pulse" | "wiggle";

export type Item = {
  id: string;
  prefix?: string;
  value: number | string;
  unit: string;
  title: string;
  fact: string;
  move?: Move; // короткое движение животного при появлении
};

export type VideoProps = {
  theme: Theme;
  title: string;
  subtitle?: string;
  cta: string;
  ctaSub?: string;
  items: Item[];
  motif?: string; // "animals" | "sky" | "classic"
  short?: boolean; // короткие заставка и финал, см. src/pace.json
};

export type ThumbProps = {
  theme: Theme;
  title: string; // 2–3 слова
  ids: string[]; // 1–3 размытые карточки, последняя — по центру. Только разные существа, без повторов
  badge: { prefix?: string; shown: string; unit: string };
  motif?: string;
};

export const imageFor = (theme: Theme, id: string) =>
  theme === "pencil" ? `pencil/${id}.jpg` : `photo/${id}.jpg`;

export const PAPER = "#faf4e4";
export const GRAPHITE = "#2f2a27";
export const RED = "#e5332a";
export const INK = "#14121f";
