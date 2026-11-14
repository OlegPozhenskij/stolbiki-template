import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import {ROOT} from './lib/project.mjs';
const source=path.join(ROOT,'skills');
const target=path.join(process.env.CODEX_HOME??path.join(os.homedir(),'.codex'),'skills');
const backup=path.join(ROOT,'tmp/skill-backups',new Date().toISOString().replace(/[:.]/g,'-'));
for(const name of fs.readdirSync(source)){
 const src=path.join(source,name);if(!fs.existsSync(path.join(src,'SKILL.md')))continue;
 const dst=path.join(target,name);
 if(fs.existsSync(dst))fs.cpSync(dst,path.join(backup,name),{recursive:true});
 fs.cpSync(src,dst,{recursive:true});
 if(fs.readFileSync(path.join(src,'SKILL.md'),'utf8')!==fs.readFileSync(path.join(dst,'SKILL.md'),'utf8'))throw new Error(`Ошибка копирования ${name}`);
 console.log(`Установлен ${name}`);
}
console.log(`Резервные копии: ${backup}\nНавыки доступны со следующего сообщения.`);
