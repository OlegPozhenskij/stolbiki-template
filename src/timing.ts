// Темп и раскладка. Числа лежат в src/pace.json: их же читает scripts/music.py, поэтому звук всегда совпадает с картинкой.
// 120 BPM: 1 такт = 60 кадров, один столбик = 2 такта.
import pace from "./pace.json";

export const FPS = pace.fps;
export const WIDTH = 1920;
export const HEIGHT = 1080;

export const COL_W = 480; // 4 столбика на экран
export const VISIBLE = WIDTH / COL_W;

// short: короткая заставка и финал (для роликов на 2–4 карточки и тестов)
export const timing = (n: number, short = false) => {
  const p = short ? pace.short : pace.normal;
  const rewind = n > VISIBLE; // лента едет назад, только если столбики не влезли в кадр
  const intro = p.intro;
  const cardStart = (i: number) => intro + i * pace.step;
  const outroStart = cardStart(n) + p.holdLast;
  // без перемотки: 1 с все столбики видны целиком и ярко, потом вопрос
  const ctaAt = outroStart + (rewind ? 96 : 30);
  const total = outroStart + (rewind ? pace.outroRewind : p.outro);
  // если столбиков меньше четырёх, ставим ленту по центру кадра
  const stripX = n < VISIBLE ? (WIDTH - n * COL_W) / 2 : 0;
  return { intro, cardStart, outroStart, ctaAt, total, rewind, stripX };
};
