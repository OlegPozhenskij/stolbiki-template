export function comparisonState(frame,items,timeline){
 const active=Math.max(0,Math.min(items.length-1,Math.floor((frame-timeline.intro)/timeline.step)));
 const start=Math.max(0,active-3),group=items[active].scaleGroup??0;
 const size=i=>items[i].physicalSizeKm;
 const refAt=index=>Math.max(...items.slice(Math.max(0,index-3),index+1).filter(i=>(i.scaleGroup??0)===group).map(i=>i.physicalSizeKm));
 const target=refAt(active),previous=active>0&&(items[active-1].scaleGroup??0)===group?refAt(active-1):target;
 const p=Math.max(0,Math.min(1,(frame-timeline.cardStarts[active])/24));
 const ease=p*p*(3-2*p),referenceKm=previous+(target-previous)*ease;
 const referencePixels=Math.min(400,...items.slice(start,active+1).filter(i=>(i.scaleGroup??0)===group).map(i=>(i.portraitWidth??380)/(i.physicalSizeKm/referenceKm)));
 return items.map((item,index)=>({ratio:size(index)/referenceKm,visible:index>=start&&(item.scaleGroup??0)===group,active:index===active,
  reset:active>0&&((items[active-1].scaleGroup??0)!==group||size(active)/size(active-1)>12),referenceKm,referencePixels}));
}
