// Темп и раскладка. Числа лежат в src/pace.json: их же читает scripts/music.py, поэтому звук всегда совпадает с картинкой.
// Один столбик = 2 такта; темп музыки выводится из pace.step (150 кадров = 5 с → 96 BPM).
import pace from "./pace.json";

export const FPS = pace.fps;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const COL_W = 480; // 4 столбика на экран
export const VISIBLE = WIDTH / COL_W;

// short: короткая заставка и финал (для роликов на 2–4 карточки и тестов)
export const timing = (n: number, short = false) => {
  const p = short ? pace.short : pace.normal;
  const intro = p.intro;
  const cardStart = (i: number) => intro + i * pace.step;
  const outroStart = cardStart(n) + p.holdLast;
  // перемотки назад нет: последний (особый) столбик остаётся в кадре, рядом появляется вопрос
  const ctaAt = outroStart + 30;
  const total = outroStart + p.outro;
  // если столбиков меньше четырёх, ставим ленту по центру кадра
  const stripX = n < VISIBLE ? (WIDTH - n * COL_W) / 2 : 0;
  return { intro, cardStart, outroStart, ctaAt, total, stripX };
};
