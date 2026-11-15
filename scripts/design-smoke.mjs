// One control frame with long titles/units in each existing layout family.
// Sequential: prepare writes shared generated props and the pencil badge.
import {prepare} from './episode.mjs';
import {loadEpisode,write} from './lib/project.mjs';
import {remotion,chrome} from './lib/runtime.mjs';
for(const id of ['design-lab-pencil','design-lab-atlas']){
 const {runtime}=await prepare(loadEpisode(id));
 write(`tmp/${id}-props.json`,runtime.video);
}
remotion(['bundle','--out-dir=build','--log=error'],{quiet:true});
for(const id of ['design-lab-pencil','design-lab-atlas']){
 remotion(['still','build','Episode',`out/design-smoke/${id}.png`,`--props=tmp/${id}-props.json`,'--frame=390',`--browser-executable=${chrome()}`,'--log=error'],{quiet:true});
 console.log(`Проверка оформления: out/design-smoke/${id}.png`);
}
