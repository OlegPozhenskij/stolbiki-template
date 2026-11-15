import React from "react";
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Badge } from "./Badge";
import { BODY } from "./fonts";
import { Item, Motif, Theme, imageFor } from "./theme";
import { COL_W, HEIGHT } from "./timing";
import {MOTION_START,subjectMotion} from "./engine/motion";
import {SpecialBack,SpecialFront} from "./designs/Celebration";
import {designOf} from "./designs/registry";
import {counterValue} from "./engine/numbers.mjs";
import {JournalCard} from "./designs/JournalCard";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const out = Easing.bezier(0.16, 1, 0.3, 1);
const HEADER_H = 178;
const IMG: React.CSSProperties = { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" };

export const Card: React.FC<{
  item: Item;
  index: number;
  theme: Theme;
  wash: number; // 0..1 — насколько приглушён (уже не главный)
  paperX: number; // где столбик стоит в кадре: чтобы зерно бумаги совпадало с фоном
  leftLine?: boolean; // линия слева: у первого столбика, когда лента стоит по центру
  motif: Motif;
  design?: string;
  assets?: Record<string, import("./theme").MediaAsset>;
  special?: boolean; // последний столбик: появляется с лучами, вспышкой и звёздочками
}> = ({ item, index, theme, wash, paperX, leftLine, motif, special, design, assets }) => {
  const frame = useCurrentFrame();
  const skin = designOf(design,theme);
  const pencil = skin.layout === "album";
  const asset = assets?.[item.id];
  const PIC_H = 600;

  const t = interpolate(frame, [12, 36], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });
  const shown = counterValue(item.value,t);

  const tilt = pencil ? [-1.2, 0.9, -0.6, 1.3, -1, 0.7][index % 6] : 0;
  // Заголовок печатным шрифтом (рукописный дети читают плохо), заметно крупнее факта.
  // Влезает в одну строку от 48 px — одна строка до 64 px; иначе две строки по 48 px, а факт мельче.
  const oneLine = Math.min(64, Math.floor(420 / (0.62 * item.title.length)));
  const twoLines = oneLine < 48;
  const titleSize = twoLines ? 48 : oneLine;
  const n = item.fact.length;
  const factSize = twoLines ? (n <= 30 ? 36 : 32) : n <= 36 ? 42 : n <= 44 ? 38 : 34;

  if (skin.cardStyle === "journal") return <JournalCard item={item} index={index} wash={wash} skin={skin} asset={asset} special={special} />;


  return (
    <div
      style={{
        position: "absolute",
        width: COL_W,
        height: HEIGHT,
        overflow: "hidden",
        backgroundColor: skin.background,
        backgroundImage: skin.texture ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
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
          {(asset?.foreground || (!asset && theme === "pencil")) ? (
            <>
              <Img src={staticFile(asset?.background ?? `pencil/${item.id}-bg.jpg`)} style={IMG} />
              <Img src={staticFile(asset?.foreground ?? `pencil/${item.id}-fg.png`)} style={{ ...IMG, ...subjectMotion(item.move ?? "hop", frame - MOTION_START, asset?.bounds) }} />
            </>
          ) : (
            <Img src={staticFile(imageFor(theme, item.id, assets))} style={IMG} />
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
          backgroundColor: "transparent",
          borderTop: pencil ? undefined : `3px solid ${skin.accent}`,
          color: skin.ink,
        }}
      >
        <div
          style={{
            fontFamily: BODY,
            fontWeight: 900,
            fontSize: titleSize,
            lineHeight: 1.04,
            textWrap: "balance",
            color: skin.title ?? motif.title,
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
          backgroundColor: skin.background,
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
          <div style={{ position: "absolute", right: 0, top: 0, width: 3, height: HEIGHT, background: skin.accent }} />
          {leftLine ? <div style={{ position: "absolute", left: 0, top: 0, width: 3, height: HEIGHT, background: skin.accent }} /> : null}
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
        <Badge design={design} theme={theme} prefix={item.prefix} shown={shown} unit={item.unit} motif={motif} />
      </div>
    </div>
  );
};
