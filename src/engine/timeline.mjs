export const ENGINE_VERSION = 'cards-v1.1';
export function buildTimeline(count, pace) {
  if (!Number.isInteger(count) || count < 1) throw new Error('Нужна хотя бы одна карточка');
  for (const key of ['fps', 'step', 'intro', 'holdLast', 'outro']) {
    if (!Number.isInteger(pace[key]) || pace[key] < (['fps','step'].includes(key) ? 1 : 0)) throw new Error(`Некорректный timing.${key}`);
  }
  if(pace.fps!==30)throw new Error('Движок cards-v1 поддерживает 30 fps');
  if (pace.intro < 45 || pace.step < pace.fps * 2 || pace.outro < 75) throw new Error('Слишком короткая заставка, карточка или финал');
  const cardStarts = Array.from({length: count}, (_, i) => pace.intro + i * pace.step);
  const outroStart = pace.intro + count * pace.step + pace.holdLast;
  return {...pace, engine: ENGINE_VERSION, cardStarts, outroStart, ctaAt: outroStart + 30,
    total: outroStart + pace.outro, stripX: count < 4 ? (1920 - count * 480) / 2 : 0};
}
export function visibleIntervals(index, count, timeline) {
  const ranges = [[Math.max(0,timeline.cardStarts[index]-10),
    index+4<count ? timeline.cardStarts[index+4]+20 : timeline.total-1]];
  if (new Set([0,Math.min(1,count-1),Math.max(0,count-2),count-1]).has(index)) ranges.push([0,timeline.intro]);
  return ranges;
}
