import React from "react";
import {interpolate,Easing} from "remotion";
import {COL_W,HEIGHT} from "../timing";
const HEADER_H=178,PIC_H=600;
const clamp={extrapolateLeft:"clamp",extrapolateRight:"clamp"} as const;
const STAR = "M0 -1 L0.24 -0.32 L0.95 -0.31 L0.38 0.12 L0.59 0.81 L0 0.4 L-0.59 0.81 L-0.38 0.12 L-0.95 -0.31 L-0.24 -0.32Z";
const SPARKS = Array.from({ length: 16 }, (_, i) => ({
  a: (i / 16) * Math.PI * 2 + (i % 2) * 0.2,
  r: 170 + (i % 3) * 60,
  size: 16 + (i % 4) * 7,
  c: ["#ffd23f", "#ff8fb1", "#7cc8e8", "#ffffff"][i % 4],
}));
const CX = COL_W / 2;
const CY = HEADER_H + PIC_H / 2;

export const SpecialBack: React.FC<{ frame: number }> = ({ frame }) => {
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

export const SpecialFront: React.FC<{ frame: number }> = ({ frame }) => {
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

