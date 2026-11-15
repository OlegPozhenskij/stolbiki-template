import test from 'node:test';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {PYTHON} from '../scripts/lib/runtime.mjs';

test('sound cues crossing the start or end are cropped without moving their timing',()=>{
 const script=`import ast,pathlib,numpy as np
tree=ast.parse(pathlib.Path('scripts/music.py').read_text(encoding='utf-8'))
put=next(n for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='put')
scope=dict(np=np,SR=10,N=6,mixL=np.zeros(6),mixR=np.zeros(6))
exec(compile(ast.Module(body=[put],type_ignores=[]),'music.py','exec'),scope)
scope['put'](np.array([1.,2.,3.,4.]),-.2,pan=-1)
np.testing.assert_allclose(scope['mixL'],[3,4,0,0,0,0])
scope['put'](np.array([5.,6.,7.]),.5,pan=-1)
np.testing.assert_allclose(scope['mixL'],[3,4,0,0,0,5])
scope['put'](np.ones(2),-1,pan=-1)
scope['put'](np.ones(2),1,pan=-1)
np.testing.assert_allclose(scope['mixL'],[3,4,0,0,0,5])
np.testing.assert_allclose(scope['mixR'],np.zeros(6))
print('ok')`;
 assert.equal(execFileSync(PYTHON,['-c',script],{encoding:'utf8'}).trim(),'ok');
});
