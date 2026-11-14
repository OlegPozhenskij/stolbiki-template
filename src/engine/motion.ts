import React from "react";
import {Move} from "../theme";
export const MOTION_START = 12;
export const MOTION_LEN = 30;
export const subjectMotion = (type: Move, t: number, bounds?: {x:number;y:number;w:number;h:number}): React.CSSProperties => {
  const m = bounds;
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
