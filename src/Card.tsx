import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Badge } from "./Badge";
import { BODY } from "./fonts";
import { GRAPHITE, INK, Item, Motif, Move, PAPER, Theme, imageFor } from "./theme";
import { COL_W, HEIGHT } from "./timing";
import meta from "../public/pencil/meta.json";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const out = Easing.bezier(0.16, 1, 0.3, 1);
const HEADER_H = 178;
const IMG: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

// Короткое движение животного при появлении: 1 секунда, затухает и останавливается.
const MOTION_START = 12;
const MOTION_LEN = 30;
const animalMotion = (id: string, type: Move, t: number): React.CSSProperties => {
  const m = (meta as Record<string, { x: number; y: number; w: number; h: number }>)[id];
  const centered = type === "fly" || type === "pulse" || type === "swim";
  const origin = m ? `${(m.x + m.w / 2) * 100}% ${(m.y + (centered ? m.h / 2 : m.h)) * 100}%` : "50% 90%";
  if (t <= 0 || t >= MOTION_LEN) return { transformOrigin: origin };
  const p = t / MOTION_LEN;
  const k = (1 - p) * (1 - p); // затухание
  const w = p * Math.PI * 2;
  let x = 0, y = 0, r = 0, sx = 1, sy = 1;
  if (type === "hop") {
    y = -26 * Math.abs(Math.sin(w * 1.5)) * k;
    r = 3 * Math.sin(w * 1.5) * k;
    sy = 1 + 0.07 * Math.sin(w * 3) * k;
    sx = 1 - 0.035 * Math.sin(w * 3) * k;
  } else if (type === "fly") {
    x = 16 * Math.sin(w * 2) * k;
    y = -12 * Math.sin(w * 4) * k;
    r = 6 * Math.sin(w * 2) * k;
  } else if (type === "swim") {
    x = 18 * Math.sin(w * 1.5) * k;
    y = 6 * Math.sin(w * 3) * k;
    r = 4 * Math.sin(w * 1.5 + 0.8) * k;
  } else if (type === "pulse") {
    sy = 1 - 0.1 * Math.sin(w * 2) * k;
    sx = 1 + 0.06 * Math.sin(w * 2) * k;
    y = -16 * Math.sin(w) * k;
  } else {
    r = 5 * Math.sin(w * 2.5) * k;
    y = -8 * Math.abs(Math.sin(w * 2.5)) * k;
    sx = 1 + 0.04 * Math.sin(w * 5) * k;
  }
  return { transformOrigin: origin, transform: `translate(${x}px, ${y}px) rotate(${r}deg) scale(${sx}, ${sy})` };
};
const PIC_H = 600;

// Один столбик. Кадр 0 — момент появления.
// ---------- Особый последний столбик: лучи, вспышка, звёздочки ----------
const STAR = "M0 -1 L0.24 -0.32 L0.95 -0.31 L0.38 0.12 L0.59 0.81 L0 0.4 L-0.59 0.81 L-0.38 0.12 L-0.95 -0.31 L-0.24 -0.32Z";
const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  a: (i / 16) * Math.PI * 2 + (i % 2) * 0.2,
  r: 170 + (i % 3) * 60,
  size: 16 + (i % 4) * 7,
  c: ["#ffd23f", "#ff8fb1", "#7cc8e8", "#ffffff"][i % 4],
}));
const CX = COL_W / 2;
const CY = HEADER_H + PIC_H / 2;

const SpecialBack: React.FC<{ frame: number }> = ({ frame }) => {
  const on = interpolate(frame, [14, 40], [0, 1], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left: CX - 700,
        top: CY - 700,
        width: 1400,
        height: 1400,
        opacity: 0.55 * on,
        rotate: `${frame * 0.4}deg`,
        background:
          "repeating-conic-gradient(from 0deg, rgba(255,214,90,0.75) 0deg 9deg, rgba(255,214,90,0) 9deg 22.5deg)",
        WebkitMaskImage: "radial-gradient(circle, #000 18%, transparent 62%)",
        maskImage: "radial-gradient(circle, #000 18%, transparent 62%)",
      }}
    />
  );
};

const SpecialFront: React.FC<{ frame: number }> = ({ frame }) => {
  const burst = interpolate(frame, [22, 60], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const flash = interpolate(frame, [20, 26, 44], [0, 0.85, 0], clamp);
  return (
    <>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 45%, #fff 0%, rgba(255,246,200,0.6) 40%, transparent 75%)", opacity: flash }} />
      <svg width={COL_W} height={HEIGHT} style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}>
        {SPARKS.map((p, i) => {
          const x = CX + Math.cos(p.a) * p.r * burst;
          const y = CY + Math.sin(p.a) * p.r * burst * 1.25;
          const tw = 0.75 + 0.25 * Math.sin(frame / 5 + i);
          const sc = p.size * (burst < 1 ? burst * 1.2 : tw);
          return (
            <path
              key={i}
              d={STAR}
              transform={`translate(${x} ${y}) rotate(${frame * 2 + i * 20}) scale(${sc})`}
              fill={p.c}
              stroke="#1d1b2e"
              strokeWidth={2 / Math.max(sc, 1)}
              opacity={interpolate(frame, [22, 30], [0, 1], clamp)}
            />
          );
        })}
      </svg>
    </>
  );
};

export const Card: React.FC<{
  item: Item;
  index: number;
  theme: Theme;
  wash: number; // 0..1 — насколько приглушён (уже не главный)
  paperX: number; // где столбик стоит в кадре: чтобы зерно бумаги совпадало с фоном
  leftLine?: boolean; // линия слева: у первого столбика, когда лента стоит по центру
  motif: Motif;
  special?: boolean; // последний столбик: появляется с лучами, вспышкой и звёздочками
}> = ({ item, index, theme, wash, paperX, leftLine, motif, special }) => {
  const frame = useCurrentFrame();
  const pencil = theme === "pencil";

  const t = interpolate(frame, [12, 36], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shown =
    typeof item.value === "number" ? String(Math.max(1, Math.round(item.value * t))) : item.value;

  const tilt = pencil ? [-1.2, 0.9, -0.6, 1.3, -1, 0.7][index % 6] : 0;
  // Заголовок печатным шрифтом (рукописный дети читают плохо), заметно крупнее факта.
  // Влезает в одну строку от 48 px — одна строка до 64 px; иначе две строки по 48 px, а факт мельче.
  const oneLine = Math.min(64, Math.floor(420 / (0.62 * item.title.length)));
  const twoLines = pencil && oneLine < 48;
  const titleSize = pencil ? (twoLines ? 48 : oneLine) : Math.max(42, Math.min(52, Math.floor(820 / item.title.length)));
  const n = item.fact.length;
  const factSize = twoLines ? (n <= 30 ? 36 : 32) : n <= 36 ? 42 : n <= 44 ? 38 : 34;


  return (
    <div
      style={{
        position: "absolute",
        width: COL_W,
        height: HEIGHT,
        overflow: "hidden",
        backgroundColor: pencil ? PAPER : INK,
        backgroundImage: pencil ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
        backgroundPosition: `${-(paperX % 1920)}px 0px`,
        translate: interpolate(frame, [0, 24], [`0px ${HEIGHT}px`, "0px 0px"], { ...clamp, easing: out }),
      }}
    >
      {special ? <SpecialBack frame={frame} /> : null}

      {/* Картинка */}
      <div
        style={{
          position: "absolute",
          left: pencil ? 22 : 0,
          top: pencil ? HEADER_H - 4 : HEADER_H,
          width: pencil ? COL_W - 44 : COL_W,
          height: pencil ? PIC_H - 12 : PIC_H,
          overflow: "hidden",
          rotate: `${tilt}deg`,
          boxShadow: special
            ? `0 0 ${30 + 14 * Math.sin(frame / 8)}px rgba(255,200,40,0.9), 0 6px 14px rgba(70,50,20,0.22)`
            : pencil ? "0 6px 14px rgba(70,50,20,0.22)" : undefined,
          outline: special ? "8px solid #ffc83a" : undefined,
          outlineOffset: special ? -4 : undefined,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            scale: interpolate(frame, [0, 26, 150], [1.3, 1.06, 1], {
              ...clamp,
              easing: [out, Easing.linear],
            }),
          }}
        >
          {pencil ? (
            <>
              <Img src={staticFile(`pencil/${item.id}-bg.jpg`)} style={IMG} />
              <Img src={staticFile(`pencil/${item.id}-fg.png`)} style={{ ...IMG, ...animalMotion(item.id, item.move ?? "hop", frame - MOTION_START) }} />
            </>
          ) : (
            <Img src={staticFile(imageFor(theme, item.id))} style={IMG} />
          )}
        </div>
      </div>
      {pencil ? (
        // кусочки скотча
        <>
          <div style={{ position: "absolute", left: 40, top: HEADER_H - 22, width: 92, height: 34, rotate: "-24deg", background: "rgba(255,236,170,0.62)", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }} />
          <div style={{ position: "absolute", right: 40, top: HEADER_H - 22, width: 92, height: 34, rotate: "22deg", background: "rgba(255,236,170,0.62)", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }} />
        </>
      ) : null}

      {/* Подпись */}
      <div
        style={{
          position: "absolute",
          top: HEADER_H + PIC_H,
          bottom: 0,
          width: COL_W,
          padding: pencil ? "4px 26px 0" : "18px 24px 0",
          boxSizing: "border-box",
          textAlign: "center",
          backgroundColor: pencil ? "transparent" : "#fffdf7",
          borderTop: pencil ? undefined : `6px solid ${INK}`,
          color: pencil ? GRAPHITE : INK,
        }}
      >
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 900,
            fontSize: titleSize,
            lineHeight: 1.04,
            textWrap: "balance",
            color: pencil ? motif.title : INK,
            opacity: interpolate(frame, [18, 30], [0, 1], clamp),
            translate: interpolate(frame, [18, 34], ["0px 24px", "0px 0px"], { ...clamp, easing: out }),
          }}
        >
          {item.title}
        </div>
        <div
          style={{
            marginTop: pencil ? 4 : 10,
            fontFamily: BODY,
            fontWeight: 800,
            fontSize: factSize,
            lineHeight: 1.12,
            textWrap: "balance",
            opacity: interpolate(frame, [28, 42], [0, 1], clamp),
            translate: interpolate(frame, [28, 44], ["0px 24px", "0px 0px"], { ...clamp, easing: out }),
          }}
        >
          {item.fact}
        </div>
      </div>

      {special ? <SpecialFront frame={frame} /> : null}

      {/* Приглушение */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: pencil ? PAPER : "#0b0a14",
          opacity: wash * (pencil ? 0.3 : 0.38),
        }}
      />

      {/* Разделитель столбиков */}
      {pencil ? (
        <>
          {/* штрих в vline.png идёт по x 9..16: при сдвиге -4 он весь внутри столбика, край его не обрезает */}
          <Img src={staticFile("pencil/vline.png")} style={{ position: "absolute", right: -4, top: 0, width: 24, height: HEIGHT }} />
          {leftLine ? <Img src={staticFile("pencil/vline.png")} style={{ position: "absolute", left: -4, top: 0, width: 24, height: HEIGHT }} /> : null}
        </>
      ) : (
        <>
          <div style={{ position: "absolute", right: 0, top: 0, width: 3, height: HEIGHT, background: INK }} />
          {leftLine ? <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: HEIGHT, background: INK }} /> : null}
        </>
      )}

      {/* Бейдж поверх приглушения: числа читаются всегда */}
      <div
        style={{
          position: "absolute",
          top: 6,
          left: (COL_W - 232) / 2,
          scale: interpolate(frame, [10, 30], [0, 1], { ...clamp, easing: Easing.bezier(0.34, 1.56, 0.64, 1) }),
          rotate: interpolate(frame, [10, 30], [-16 + tilt, tilt * 2], { ...clamp, easing: out }) + "deg",
          filter: pencil ? undefined : "drop-shadow(0 10px 0 rgba(0,0,0,0.35))",
        }}
      >
        <Badge theme={theme} prefix={item.prefix} shown={shown} unit={item.unit} motif={motif} />
      </div>
    </div>
  );
};
