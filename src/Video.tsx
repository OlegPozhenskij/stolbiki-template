import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Card } from "./Card";
import { BODY, HAND } from "./fonts";
import { GRAPHITE, PAPER, VideoProps, imageFor } from "./theme";
import { COL_W, VISIBLE, timing } from "./timing";
import "./fonts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const smooth = Easing.bezier(0.65, 0, 0.35, 1);
const out = Easing.bezier(0.16, 1, 0.3, 1);
const pop = Easing.bezier(0.34, 1.56, 0.64, 1);

// Линия «от руки» под заголовком: рисуется по ходу
const Scribble: React.FC<{ progress: number; color: string; width: number }> = ({ progress, color, width }) => (
  <svg width={width} height={40} viewBox="0 0 600 40" style={{ display: "block", margin: "0 auto" }}>
    <path
      d="M10 26 C 120 10, 220 34, 320 20 S 520 12, 590 22"
      fill="none"
      stroke={color}
      strokeWidth={9}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
    />
  </svg>
);

// Места для рисунков вокруг заголовка заставки
const SLOTS = [
  { x: 70, y: 600, r: -9 },
  { x: 150, y: 40, r: 7 },
  { x: 1500, y: 30, r: -6 },
  { x: 1560, y: 560, r: 8 },
];
// Сколько разных рисунков, столько и мест: повторов в заставке нет
const SLOT_PICK: Record<number, number[]> = { 1: [3], 2: [1, 3], 3: [1, 3, 0], 4: [0, 1, 2, 3] };

export const Video: React.FC<VideoProps> = ({ theme, title, subtitle, cta, ctaSub, items, short }) => {
  const frame = useCurrentFrame();
  const n = items.length;
  const pencil = theme === "pencil";
  const { intro, cardStart, outroStart: outro, ctaAt, stripX } = timing(n, short);
  const maxX = Math.max(0, (n - VISIBLE) * COL_W);
  const k = intro / 120; // заставка сжимается вместе с INTRO
  const introOut = intro - 20; // заставка уходит за 20 кадров до первого столбика

  // Лента сдвигается, когда новому столбику не хватает места
  let cameraX = 0;
  for (let i = VISIBLE; i < n; i++) {
    cameraX += interpolate(frame, [cardStart(i) - 8, cardStart(i) + 18], [0, COL_W], { ...clamp, easing: smooth });
  }
  // Финал: лента быстро едет обратно к началу — видно весь путь от 1 дня до вечности
  const rewind = interpolate(frame, [outro, outro + 100], [0, 1], { ...clamp, easing: smooth });
  cameraX = cameraX - maxX * rewind;

  const ctaIn = interpolate(frame, [ctaAt, ctaAt + 20], [0, 1], { ...clamp, easing: out });
  const introIds = [...new Set([items[0].id, items[Math.min(1, n - 1)].id, items[Math.max(0, n - 2)].id, items[n - 1].id])];
  const introPics = introIds.map((id, j) => ({ id, ...SLOTS[SLOT_PICK[introIds.length][j]], d: Math.round((4 + 6 * j) * k) }));
  const textColor = pencil ? GRAPHITE : "#fff";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: pencil ? PAPER : "#14121f",
        backgroundImage: pencil ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
      }}
    >
      {/* Лента столбиков: всегда на весь кадр */}
      <div style={{ position: "absolute", left: stripX, top: 0, translate: `${-cameraX}px 0px` }}>
        {items.map((item, i) => (
          <Sequence key={item.id} from={cardStart(i)} layout="none">
            <div style={{ position: "absolute", left: i * COL_W, top: 0 }}>
              <Card
                item={item}
                index={i}
                theme={theme}
                paperX={stripX + i * COL_W}
                leftLine={i === 0 && stripX > 0}
                wash={
                  // последний столбик не бледнеет: за ним никто не появляется
                  (i < n - 1 ? interpolate(frame, [cardStart(i + 1), cardStart(i + 1) + 16], [0, 1], clamp) : 0) *
                  (1 - interpolate(frame, [outro, outro + 30], [0, 1], clamp))
                }
              />
            </div>
          </Sequence>
        ))}
      </div>

      {/* Заставка: рисунки вокруг заголовка */}
      {introPics.map((p, j) => (
        <div
          key={j}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: 300,
            height: 400,
            padding: 10,
            boxSizing: "border-box",
            backgroundColor: pencil ? "#fffdf7" : "#fff",
            boxShadow: "0 10px 26px rgba(60,40,20,0.25)",
            rotate: `${p.r}deg`,
            scale: interpolate(frame, [p.d, p.d + 18, introOut, introOut + 16], [0, 1, 1, 0.6], { ...clamp, easing: pop }),
            opacity: interpolate(frame, [p.d, p.d + 6, introOut, introOut + 14], [0, 1, 1, 0], clamp),
          }}
        >
          <Img src={staticFile(imageFor(theme, p.id))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      ))}

      {/* Заставка */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          color: textColor,
          opacity: interpolate(frame, [introOut, introOut + 16], [1, 0], clamp),
          translate: interpolate(frame, [introOut, introOut + 18], ["0px 0px", "0px -90px"], { ...clamp, easing: Easing.in(Easing.cubic) }),
        }}
      >
        <div
          style={{
            fontFamily: pencil ? HAND : BODY,
            fontWeight: pencil ? 700 : 900,
            fontSize: pencil ? 170 : 128,
            lineHeight: 0.95,
            maxWidth: 1180,
            color: pencil ? "#c4281f" : "#fff",
            scale: interpolate(frame, [0, 20], [0.7, 1], { ...clamp, easing: pop }),
            opacity: interpolate(frame, [0, 10], [0, 1], clamp),
            rotate: pencil ? "-2deg" : "0deg",
          }}
        >
          {title}
        </div>
        <div style={{ marginTop: 10 }}>
          <Scribble
            progress={interpolate(frame, [10, 10 + 30 * k], [0, 1], { ...clamp, easing: out })}
            color={pencil ? "#f2b705" : "#ffd23f"}
            width={1100}
          />
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 18,
              fontFamily: BODY,
              fontWeight: 900,
              fontSize: 64,
              color: textColor,
              opacity: interpolate(frame, [30 * k, 30 * k + 14], [0, 1], clamp),
              translate: interpolate(frame, [30 * k, 30 * k + 16], ["0px 30px", "0px 0px"], { ...clamp, easing: out }),
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </AbsoluteFill>

      {/* Вопрос зрителю в конце */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pencil ? "rgba(250,244,228,0.55)" : "rgba(10,9,20,0.55)",
          opacity: ctaIn,
        }}
      >
        <div
          style={{
            padding: "46px 80px 40px",
            backgroundColor: pencil ? PAPER : "#fffdf7",
            backgroundImage: pencil ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
            border: `6px solid ${GRAPHITE}`,
            borderRadius: pencil ? "28px 14px 30px 12px / 14px 30px 12px 28px" : 24,
            boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            textAlign: "center",
            color: GRAPHITE,
            scale: interpolate(frame, [ctaAt, ctaAt + 24], [0.6, 1], { ...clamp, easing: pop }),
            rotate: pencil ? "-1.5deg" : "0deg",
          }}
        >
          <div style={{ fontFamily: pencil ? HAND : BODY, fontWeight: pencil ? 700 : 900, fontSize: pencil ? 120 : 86, lineHeight: 1, color: "#c4281f" }}>
            {cta}
          </div>
          {ctaSub ? (
            <div
              style={{
                marginTop: 18,
                fontFamily: BODY,
                fontWeight: 900,
                fontSize: 56,
                opacity: interpolate(frame, [ctaAt + 20, ctaAt + 34], [0, 1], clamp),
              }}
            >
              {ctaSub}
            </div>
          ) : null}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
