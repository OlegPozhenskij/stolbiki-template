import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {spawnSync} from 'node:child_process';
import {ROOT} from './project.mjs';
export const PYTHON=process.env.STOLBIKI_PYTHON || (process.platform==='win32'?'python':'python3');
const compositor=fs.existsSync(path.join(ROOT,'node_modules')) ? fs.readdirSync(path.join(ROOT,'node_modules/@remotion')).find(n=>n.startsWith('compositor-')&&fs.existsSync(path.join(ROOT,'node_modules/@remotion',n,process.platform==='win32'?'ffmpeg.exe':'ffmpeg'))) : null;
export const FFBIN=compositor?path.join(ROOT,'node_modules/@remotion',compositor):'';
export const FFPROBE=FFBIN?path.join(FFBIN,process.platform==='win32'?'ffprobe.exe':'ffprobe'):'ffprobe';
export const FFMPEG=FFBIN?path.join(FFBIN,process.platform==='win32'?'ffmpeg.exe':'ffmpeg'):'ffmpeg';
export function chrome(){
 const candidates=[process.env.CHROME,'C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','/usr/bin/google-chrome','/usr/bin/chromium','/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'];
 const found=candidates.find(p=>p&&fs.existsSync(p));
 if(!found)throw new Error('Не найден Chrome. Укажите CHROME=полный путь к браузеру.');return found;
}
export function environment(extra={}){
 const tmp=path.join(ROOT,'tmp','pipeline');fs.mkdirSync(tmp,{recursive:true});
 return {...process.env,PYTHONUTF8:'1',CHROME:chrome(),PATH:FFBIN+path.delimiter+process.env.PATH,TEMP:tmp,TMP:tmp,TMPDIR:tmp,...extra};
}
export function run(command,args,{env=environment(),quiet=false}={}){
 const r=spawnSync(command,args,{cwd:ROOT,env,encoding:'utf8',windowsHide:true,maxBuffer:12*1024*1024});
 if(r.error||r.status!==0)throw new Error(`${command} ${args.join(' ')}\n${r.error?.message??''}\n${r.stderr??''}\n${r.stdout??''}`);
 if(!quiet&&r.stdout?.trim())console.log(r.stdout.trim());return r.stdout;
}
export const remotion=(args,opts)=>run(process.execPath,['node_modules/@remotion/cli/remotion-cli.js',...args],opts);
export const workers=()=>Math.max(1,Math.min(4,Math.floor(os.cpus().length/2)));
