export type Pace = {fps:number;step:number;intro:number;holdLast:number;outro:number};
export type Timeline = Pace & {engine:string;cardStarts:number[];outroStart:number;ctaAt:number;total:number;stripX:number};
export const ENGINE_VERSION: string;
export function buildTimeline(count:number,pace:Pace):Timeline;
export function visibleIntervals(index:number,count:number,timeline:Timeline):number[][];
