import React from "react";
import { Composition, Still } from "remotion";
import { Thumb } from "./Thumb";
import { Video } from "./Video";
import data from "./data.json";
import { ThumbProps, VideoProps } from "./theme";
import { FPS, HEIGHT, WIDTH, timing } from "./timing";

// Ролик целиком описан в src/data.json. theme: "pencil" — рисунки карандашом, "photo" — фото из public/photo/<id>.jpg
const { thumb, ...rest } = data as Omit<VideoProps, "theme"> & { thumb: Omit<ThumbProps, "theme"> };
const base = rest;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Pencil"
        component={Video}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={timing(base.items.length, base.short).total}
        defaultProps={{ ...base, theme: "pencil" } as VideoProps}
      />
      <Composition
        id="Photo"
        component={Video}
        width={WIDTH}
        height={HEIGHT}
        fps={FPS}
        durationInFrames={timing(base.items.length, base.short).total}
        defaultProps={{ ...base, theme: "photo" } as VideoProps}
      />
      <Still id="ThumbPencil" component={Thumb} width={1280} height={720} defaultProps={{ ...thumb, motif: rest.motif, theme: "pencil" } as ThumbProps} />
      <Still id="ThumbPhoto" component={Thumb} width={1280} height={720} defaultProps={{ ...thumb, motif: rest.motif, theme: "photo" } as ThumbProps} />
    </>
  );
};
