import {designOf} from "./designs/registry";
import React from "react";
import { Img, staticFile } from "remotion";
import { BODY } from "./fonts";
import { INK, Motif, Theme, motifOf } from "./theme";

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Бейдж с числом. В карандашной версии форма зависит от темы: лапка, облако, шестиугольник.
// Все формы вписаны в рамку x 50..430, y 70..570 макета 480x640; motif.textBox — где по высоте лежит текст.
export const Badge: React.FC<{
  theme: Theme;
  design?: string;
  prefix?: string;
  shown: string;
  unit: string;
  size?: number;
  motif?: Motif;
}> = ({ theme, prefix, shown, unit, size = 232, motif = motifOf(), design }) => {
  const k = size / 232;
  const h = 268 * k;
  const skin=designOf(design,theme);
  const pencil = skin.layout === "album";
  const m = pencil ? motif : motifOf("classic");
  const tk = k * m.textScale;
  const isWord = unit.length > 7; // «жить вечно»
  const numSize = (shown.length >= 4 ? 66 : shown.length >= 3 ? 86 : shown === "∞" ? 128 : 108) * tk;
  const art: React.CSSProperties = {
    position: "absolute",
    width: (480 * size) / 380,
    left: (-50 * size) / 380,
    top: (-70 * h) / 500,
    height: (640 * h) / 500,
  };

  return (
    <div style={{ position: "relative", width: size, height: h }}>
      {pencil ? (
        // бумажная подложка: карандашный цвет полупрозрачный, без неё просвечивает картинка
        <div
          style={{
            ...art,
            backgroundColor: "#faf4e4",
            backgroundImage: `url(${staticFile("pencil/paper-thumb.jpg")})`,
            WebkitMaskImage: `url(${staticFile("art/badge-mask.svg")})`,
            WebkitMaskSize: "100% 100%",
            maskImage: `url(${staticFile("art/badge-mask.svg")})`,
            maskSize: "100% 100%",
          }}
        />
      ) : null}
      {pencil ? (
        // badge.png: шестиугольник занимает x 50..430, y 70..570 в макете 480x640
        <Img src={staticFile("pencil/badge.png")} style={art} />
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, clipPath: skin.badgeShape === "round" ? undefined : HEX, borderRadius: skin.badgeShape === "round" ? 48 : undefined, backgroundColor: INK }} />
          <div style={{ position: "absolute", inset: 8 * k, clipPath: skin.badgeShape === "round" ? undefined : HEX, borderRadius: skin.badgeShape === "round" ? 48 : undefined, backgroundColor: skin.badge ?? m.badge }} />
        </>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: ((m.textBox[0] - 70) * h) / 500,
          height: ((m.textBox[1] - m.textBox[0]) * h) / 500,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: BODY,
          color: "#fff",
          textAlign: "center",
          textShadow: pencil ? `0 2px 0 ${m.shadow}` : "none",
        }}
      >
        {prefix ? (
          <div style={{ fontSize: 27 * tk, fontWeight: 800, marginBottom: -8 * tk, opacity: 0.95 }}>{prefix}</div>
        ) : null}
        <div
          style={{
            fontSize: numSize,
            fontWeight: 900,
            lineHeight: shown === "∞" ? 0.9 : 1,
            letterSpacing: -2 * tk,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}
        </div>
        <div
          style={{
            fontSize: (isWord ? 25 : 30) * tk,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 1.5 * tk,
            marginTop: 2 * tk,
            lineHeight: 1,
          }}
        >
          {unit}
        </div>
      </div>
    </div>
  );
};
