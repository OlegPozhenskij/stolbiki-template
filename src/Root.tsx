import React from 'react';
import {Composition,Still} from 'remotion';
import {Video} from './Video';
import {Thumb} from './Thumb';
import runtime from './generated/episode.json';
import {VideoProps,ThumbProps} from './theme';
import {timing} from './timing';
const base=runtime.video as VideoProps;
const cover=runtime.thumb as ThumbProps;
const t=timing(base.items.length,false,base.pace);
export const RemotionRoot:React.FC=()=> <>
  <Composition id="Episode" component={Video} width={1920} height={1080} fps={t.fps} durationInFrames={t.total} defaultProps={base}/>
  <Still id="Cover" component={Thumb} width={1280} height={720} defaultProps={cover}/>
</>;
