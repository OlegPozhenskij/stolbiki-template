import {Item} from '../theme';
import {Timeline} from './timeline.mjs';
export type Comparison={ratio:number;visible:boolean;active:boolean;reset:boolean;referenceKm:number;referencePixels:number};
export function comparisonState(frame:number,items:Item[],timeline:Timeline,options?:{visible?:number;maxPixels?:number}):Comparison[];
