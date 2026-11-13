import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { Badge } from "./Badge";
import { BODY, HAND } from "./fonts";
import { Theme, ThumbProps, imageFor, motifOf } from "./theme";
import "./fonts";

// Обложка 1280x720. Три элемента: вопрос, веер размытых карточек со странными существами, бейдж «∞».
// Существа видны только силуэтом: зритель понимает, что там кто-то необычный, но не понимает кто.
const Mystery: React.FC<{ theme: Theme; id: string; x: number; y: number; w: number; rot: number; blur: number; z: number }> = ({
  theme, id, x, y, w, rot, blur, z,
}) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: (w * 4) / 3,
      padding: 12,
      boxSizing: "border-box",
      backgroundColor: "#fffdf7",
      boxShadow: "0 18px 40px rgba(0,0,0,0.35)",
      rotate: `${rot}deg`,
      zIndex: z,
    }}
  >
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      <Img
        src={staticFile(imageFor(theme, id))}
        style={{ width: "100%", height: "100%", objectFit: "cover", filter: `blur(${blur}px) saturate(1.25)`, scale: 1.12 }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: HAND,
          fontWeight: 700,
          fontSize: w * 0.62,
          color: "#fff",
          textShadow: "0 6px 0 rgba(120,20,15,0.55), 0 0 30px rgba(0,0,0,0.35)",
          rotate: `${-rot * 2}deg`,
        }}
      >
        ?
      </div>
    </div>
  </div>
);

// Веер под число карточек: последняя карточка по центру и сверху.
// Размытие сильное: должен угадываться только силуэт, иначе загадки нет.
const FAN: Record<number, { x: number; y: number; w: number; rot: number; blur: number; z: number }[]> = {
  1: [{ x: 750, y: 90, w: 340, rot: -3, blur: 12, z: 2 }],
  2: [
    { x: 600, y: 170, w: 300, rot: -9, blur: 14, z: 1 },
    { x: 840, y: 100, w: 330, rot: 5, blur: 12, z: 2 },
  ],
  3: [
    { x: 560, y: 190, w: 290, rot: -11, blur: 14, z: 1 },
    { x: 960, y: 170, w: 290, rot: 10, blur: 14, z: 1 },
    { x: 735, y: 95, w: 330, rot: -2, blur: 12, z: 2 },
  ],
};

export const Thumb: React.FC<ThumbProps> = ({ theme, title, ids, badge, motif: motifName }) => {
  const pencil = theme === "pencil";
  const motif = motifOf(motifName);
  return (
    <AbsoluteFill
      style={{
        background: pencil ? `url(${staticFile("pencil/paper-thumb.jpg")})` : "radial-gradient(120% 100% at 30% 30%, #2b6cb0 0%, #0d2a4a 80%)",
        overflow: "hidden",
      }}
    >
      <AbsoluteFill style={{ background: "radial-gradient(70% 90% at 72% 55%, rgba(255,190,40,0.6), rgba(255,190,40,0) 70%)" }} />
      {(FAN[ids.length] ?? FAN[3]).map((c, j) => (
        <Mystery key={j} theme={theme} id={ids[j]} {...c} />
      ))}
      <div style={{ position: "absolute", left: 930, top: 20, zIndex: 3, rotate: "8deg", filter: "drop-shadow(0 8px 0 rgba(0,0,0,0.3))" }}>
        <Badge theme={theme} {...badge} size={210} motif={motif} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 44,
          top: 120,
          width: 520,
          fontFamily: pencil ? HAND : BODY,
          fontWeight: pencil ? 700 : 900,
          fontSize: pencil ? 170 : 116,
          lineHeight: 0.9,
          color: pencil ? motif.title : "#ffd23f",
          rotate: "-4deg",
          WebkitTextStroke: pencil ? `4px ${motif.title}` : "4px #14121f",
          textShadow: pencil ? "4px 5px 0 rgba(255,255,255,0.95)" : "0 8px 0 #14121f",
        }}
      >
        {title}
      </div>
    </AbsoluteFill>
  );
};
