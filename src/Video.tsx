import {cameraOffset,cardWash} from "./engine/strip";
import {designOf} from "./designs/registry";
import {comparisonState} from './engine/scale.mjs';
import {SpaceBackdrop} from './designs/SpaceBackdrop';
import React from "react";
import { AbsoluteFill, Easing, Img, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import { Card } from "./Card";
import { BODY, HAND } from "./fonts";
import { GRAPHITE, VideoProps, imageFor, motifOf } from "./theme";
import { VISIBLE, timing } from "./timing";
import "./fonts";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

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
export const Video: React.FC<VideoProps> = ({ theme, title, subtitle, cta, ctaSub, items, short, motif: motifName, design, assets, pace }) => {
  const frame = useCurrentFrame();
  const motif = motifOf(motifName);
  const n = items.length;
  const skin=designOf(design,theme);
  const pencil=skin.layout === "album";
  const timeline=timing(n,short,pace);
  const {intro,cardStart,ctaAt}=timeline;
  const visible=skin.columns??VISIBLE,colW=1920/visible,stripX=n<visible?(1920-n*colW)/2:0;
  const k = intro / 120; // заставка сжимается вместе с INTRO
  const introOut = intro - 20; // заставка уходит за 20 кадров до первого столбика

  // Лента сдвигается, когда новому столбику не хватает места
  const cameraX=cameraOffset(frame,n,timeline,{visible,width:colW});
  const comparison=['cosmic','sticker'].includes(skin.cardStyle??'')?comparisonState(frame,items,timeline,{visible,maxPixels:skin.cardStyle==='sticker'?580:400}):undefined;
  // Перемотки назад нет: в финале последний (особый) столбик остаётся справа, вопрос — на трёх левых
  const many = n > visible;

  const ctaIn = intro===0&&(n<=4||skin.cardStyle==='sticker')?0:interpolate(frame, [ctaAt, ctaAt + 20], [0, 1], { ...clamp, easing: out });
  const introIds = [...new Set([items[0].id, items[Math.min(1, n - 1)].id, items[Math.max(0, n - 2)].id, items[n - 1].id])];
  const introPics = introIds.map((id, j) => ({ id, ...SLOTS[SLOT_PICK[introIds.length][j]], d: Math.round((4 + 6 * j) * k) }));
  const textColor = skin.ink;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: skin.background,
        backgroundImage: skin.texture ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
      }}
    >
      {skin.cardStyle==='sticker'&&<SpaceBackdrop seed="intro-starfield" width={1920} height={1080} frame={frame}/>}
      {/* Лента столбиков: всегда на весь кадр */}
      <div style={{ position: "absolute", left: stripX, top: 0, translate: `${-cameraX}px 0px` }}>
        {items.map((item, i) => (
          <Sequence key={item.id} from={cardStart(i)} durationInFrames={(i+visible<n?cardStart(i+visible)+30:timeline.total)-cardStart(i)} layout="none">
            <div style={{ position: "absolute", left: i * colW, top: 0 }}>
              <Card
                item={item}
                index={i}
                theme={theme}
                design={design}
                assets={assets}
                paperX={stripX + i * colW}
                leftLine={i === 0 && stripX > 0}
                motif={motif}
                special={i === n - 1 && n > 2}
                wash={cardWash(frame,i,n,timeline)}
                comparison={comparison?.[i]}
              />
            </div>
          </Sequence>
        ))}
      </div>

      {intro===0&&['cosmic','sticker'].includes(skin.cardStyle??'')&&frame<timeline.step&&<div style={{position:'absolute',left:colW+80,right:80,top:230,bottom:230,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',fontFamily:BODY,color:skin.ink,opacity:interpolate(frame,[0,14,timeline.step-24,timeline.step],[0,1,1,0],clamp)}}>
        <div style={{fontSize:100,fontWeight:900,lineHeight:1.08,maxWidth:1150}}>{title}</div>
        <div style={{fontSize:44,fontWeight:800,marginTop:34}}>От меньшего к большему · {n} героев</div>
      </div>}

      {intro>0&&<>
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
          <Img src={staticFile(imageFor(theme, p.id, assets))} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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
            fontFamily: skin.heading === "hand" ? HAND : BODY,
            fontWeight: skin.heading === "hand" ? 700 : 900,
            fontSize: pencil ? 170 : 128,
            lineHeight: 0.95,
            maxWidth: 1020,
            color: skin.title ?? motif.title,
            WebkitTextStroke: pencil ? `3px ${motif.title}` : undefined,
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
            color={skin.accent}
            width={1100}
          />
        </div>
        {subtitle ? (
          <div
            style={{
              marginTop: 18,
              fontFamily: BODY,
              fontWeight: 900,
              fontSize: 52,
              maxWidth: 1000,
              lineHeight: 1.1,
              color: textColor,
              opacity: interpolate(frame, [30 * k, 30 * k + 14], [0, 1], clamp),
              translate: interpolate(frame, [30 * k, 30 * k + 16], ["0px 30px", "0px 0px"], { ...clamp, easing: out }),
            }}
          >
            {subtitle}
          </div>
        ) : null}
      </AbsoluteFill>

      </>}
      {/* Вопрос зрителю в конце */}
      <AbsoluteFill
        style={{
          right: many ? colW : 0, // длинная лента: особый последний столбик справа остаётся открытым
          width: "auto",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: pencil ? "rgba(250,244,228,0.55)" : "rgba(11,22,48,0.66)",
          opacity: ctaIn,
        }}
      >
        <div
          style={{
            padding: many ? "40px 56px 36px" : "46px 80px 40px",
            backgroundColor: skin.background,
            backgroundImage: skin.texture ? `url(${staticFile("pencil/paper.jpg")})` : undefined,
            border: `6px solid ${GRAPHITE}`,
            borderRadius: pencil ? "28px 14px 30px 12px / 14px 30px 12px 28px" : 24,
            boxShadow: "0 18px 40px rgba(0,0,0,0.25)",
            textAlign: "center",
            color: skin.ink,
            position: "relative",
            scale: interpolate(frame, [ctaAt, ctaAt + 24], [0.6, 1], { ...clamp, easing: pop }),
            rotate: pencil ? "-1.5deg" : "0deg",
          }}
        >
          <div style={{ fontFamily: skin.heading === "hand" ? HAND : BODY, fontWeight: skin.heading === "hand" ? 700 : 900, fontSize: pencil ? (many ? 96 : 120) : 86, lineHeight: 1, color: skin.title ?? motif.title, WebkitTextStroke: pencil ? `3px ${motif.title}` : undefined }}>
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
