export function counterValue(value,progress){
 if(typeof value!=='number')return value;
 const p=Math.max(0,Math.min(1,progress));
 if(p===1)return String(value);
 const decimals=Math.min(8,(String(value).split('.')[1]??'').length);
 return String(Number((value*p).toFixed(decimals)));
}
