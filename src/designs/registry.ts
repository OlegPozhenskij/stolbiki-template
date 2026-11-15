import designs from '../../designs/catalog.json';
export type Design = {name:string;layout:string;background:string;ink:string;title:string|null;accent:string;badge:string|null;heading:string;badgeShape:string;texture:boolean;cardStyle?:string;revision?:number;columns?:number};
export const designOf=(name?:string,media?:string):Design=>{
  const key=name ?? (media==='photo'?'space-atlas':'pencil-album');
  const result=(designs as Record<string,Design>)[key];
  if (!result) throw new Error(`Неизвестное оформление: ${key}`);
  return result;
};
