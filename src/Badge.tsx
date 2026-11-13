import React from "react";
import { Img, staticFile } from "remotion";
import { BODY } from "./fonts";
import { INK, RED, Theme } from "./theme";

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Бейдж с числом. В карандашной версии — нарисованный от руки шестиугольник.
export const Badge: React.FC<{
  theme: Theme;
  prefix?: string;
  shown: string;
  unit: string;
  size?: number;
}> = ({ theme, prefix, shown, unit, size = 232 }) => {
  const k = size / 232;
  const h = 268 * k;
  const isWord = unit.length > 7; // «жить вечно»
  const numSize = (shown.length >= 3 ? 86 : shown === "∞" ? 128 : 108) * k;

  return (
    <div style={{ position: "relative", width: size, height: h }}>
      {theme === "pencil" ? (
        // бумажная подложка: карандашный цвет полупрозрачный, без неё просвечивает картинка
        <div
          style={{
            position: "absolute",
            inset: 3 * k,
            clipPath: HEX,
            backgroundColor: "#faf4e4",
            backgroundImage: `url(${staticFile("pencil/paper-thumb.jpg")})`,
          }}
        />
      ) : null}
      {theme === "pencil" ? (
        // badge.png: шестиугольник занимает x 50..430, y 70..570 в макете 480x640
        <Img
          src={staticFile("pencil/badge.png")}
          style={{
            position: "absolute",
            width: (480 * size) / 380,
            left: (-50 * size) / 380,
            top: (-70 * h) / 500,
            height: (640 * h) / 500,
          }}
        />
      ) : (
        <>
          <div style={{ position: "absolute", inset: 0, clipPath: HEX, backgroundColor: INK }} />
          <div style={{ position: "absolute", inset: 8 * k, clipPath: HEX, backgroundColor: RED }} />
        </>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: BODY,
          color: "#fff",
          textAlign: "center",
          textShadow: theme === "pencil" ? "0 2px 0 rgba(90,10,10,0.45)" : "none",
        }}
      >
        {prefix ? (
          <div style={{ fontSize: 27 * k, fontWeight: 800, marginBottom: -8 * k, opacity: 0.95 }}>{prefix}</div>
        ) : null}
        <div
          style={{
            fontSize: numSize,
            fontWeight: 900,
            lineHeight: shown === "∞" ? 0.9 : 1,
            letterSpacing: -2 * k,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {shown}
        </div>
        <div
          style={{
            fontSize: (isWord ? 25 : 30) * k,
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: 1.5 * k,
            marginTop: 2 * k,
            lineHeight: 1,
          }}
        >
          {unit}
        </div>
      </div>
    </div>
  );
};
