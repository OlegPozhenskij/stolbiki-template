"""Read source pixels only to derive SVG crop/silhouette metadata. Photos stay unchanged."""
from pathlib import Path
from PIL import Image
import numpy as np,json
from scipy import ndimage as nd

ROOT=Path(__file__).resolve().parents[1];folder=ROOT/'episodes/cosmic-stickers-300'
rows=json.loads((folder/'media.json').read_text(encoding='utf-8'))
objects={x['id']:x for x in json.loads((folder/'objects.json').read_text(encoding='utf-8'))}
overrides={
 'iss':{'crop':[440/1280,280/850,410/1280,280/850]},
 '67p':{'crop':[700/2048,1090/2048,450/2048,380/2048]},
 'sun':{'circle':[2048,2048,1740]},
 'moon':{'circle':[400,400,398]},
 'sirius':{'crop':[.01,.01,.59,.71]},
 'sirius-b':{'crop':[.52,.035,.475,.79]},
 'haumea':{'crop':[.035,.333,.44,.273]},
 'geographos':{'crop':[.02,.12,.31,.68]},
 'md2011':{'crop':[.51,.05,.48,.9]},
 'eris':{'crop':[.193,.512,.087,.135]},
 'quaoar':{'circle':[652,352,40]},
 'saturn':{'bodyFraction':830/1970,'portrait':245},
 'sagittarius-a':{'bodyFraction':.35,'portrait':185},
 'm87-black-hole':{'bodyFraction':.30,'portrait':170},
 'halley':{'frame':True,'bodyFraction':.45,'portrait':245},
 'milky-way':{'crop':[0,.245,1,.755],'frame':True},
 'falcon-heavy':{'frame':True,'bodyFraction':.94,'portrait':530},
 'rosetta':{'frame':True},
 'osiris':{'frame':True},
 'cassini':{'crop':[.1,.24,.5,.54],'frame':True},
 'crab-pulsar':{'frame':True,'bodyFraction':.22,'portrait':120},
 'makemake':{'crop':[.05,.2,.52,.76]},
}
def rdp(points,epsilon=1.0):
 if len(points)<3:return points
 p=np.array(points,dtype=float);v=p[-1]-p[0];length=np.linalg.norm(v)
 delta=p-p[0]
 distance=np.linalg.norm(delta,axis=1) if length==0 else np.abs(v[0]*delta[:,1]-v[1]*delta[:,0])/length
 index=int(np.argmax(distance))
 if distance[index]>epsilon:return rdp(points[:index+1],epsilon)[:-1]+rdp(points[index:],epsilon)
 return [points[0],points[-1]]
def outline(mask):
 edges={}
 for y,x in zip(*np.where(mask)):
  if y==0 or not mask[y-1,x]:edges.setdefault((x,y),[]).append((x+1,y))
  if x==mask.shape[1]-1 or not mask[y,x+1]:edges.setdefault((x+1,y),[]).append((x+1,y+1))
  if y==mask.shape[0]-1 or not mask[y+1,x]:edges.setdefault((x+1,y+1),[]).append((x,y+1))
  if x==0 or not mask[y,x-1]:edges.setdefault((x,y+1),[]).append((x,y))
 loops=[]
 while edges:
  start=next(iter(edges));point=start;chain=[start]
  for _ in range(mask.size*4):
   if point not in edges:break
   nxt=edges[point].pop()
   if not edges[point]:del edges[point]
   chain.append(nxt);point=nxt
   if point==start:break
  if len(chain)>3:loops.append(chain)
 chain=max(loops,key=len)
 # Split the closed loop so simplification never collapses its coincident ends.
 mid=len(chain)//2
 return rdp(chain[:mid+1])+rdp(chain[mid:])[1:]

result={}
for row in rows:
 id=row['id'];file=ROOT/row['file'];config=overrides.get(id,{})
 if id=='aldebaran':
  radius=418/862*1000
  result[id]={'file':row['file'],'size':[1000,1000],'crop':[0,0,1000,1000],'path':f'M{500-radius} 500A{radius} {radius} 0 1 0 {500+radius} 500A{radius} {radius} 0 1 0 {500-radius} 500Z','span':radius*2,'portrait':550,'style':'silhouette','nativeModel':'aldebaran-disc'}
  continue
 with Image.open(file) as source:
  W,H=source.size
  if id=='quaoar':
   result['quaoar-system']={'sourceId':id,'file':row['file'],'size':[W,H],'crop':[.32*W,.07*H,.33*W,.86*H],'span':.86*H,'portrait':550,'style':'photo-frame'}
  if id=='crab-pulsar':
   pixels=np.asarray(source.convert('RGB'),dtype=float)
   cyan=(pixels[:,:,1]>pixels[:,:,0]*1.15)&(pixels[:,:,2]>pixels[:,:,0]*1.2)&(pixels[:,:,1]>140)
   lab,count=nd.label(cyan);sizes=np.bincount(lab.ravel());sizes[0]=0
   if not count:raise ValueError('Pulsar core not found')
   yy,xx=np.where(lab==sizes.argmax());cx=(xx.min()+xx.max())/2;cy=(yy.min()+yy.max())/2;r=max(xx.max()-xx.min(),yy.max()-yy.min())*.52
   config={'circle':[cx,cy,r]}
   result['crab-pulsar-beams']={'sourceId':id,'file':row['file'],'size':[W,H],'crop':[0,0,W,H*.98],'span':W,'portrait':550,'style':'photo-frame'}
  if config.get('circle'):
   cx,cy,r=config['circle'];margin=r*.04
   result[id]={'file':row['file'],'size':[W,H],'crop':[cx-r-margin,cy-r-margin,2*(r+margin),2*(r+margin)],'path':f'M{cx-r} {cy}A{r} {r} 0 1 0 {cx+r} {cy}A{r} {r} 0 1 0 {cx-r} {cy}Z','span':2*r,'portrait':550,'style':'silhouette'}
   continue
  rect=config.get('crop',[0,0,1,1]);x,y,w,h=[round(v*dim) for v,dim in zip(rect,[W,H,W,H])]
  if w<=0 or h<=0:raise ValueError(id)
  im=source.convert('RGBA').crop((x,y,x+w,y+h));im.thumbnail((500,500))
  pixels=np.array(im,dtype=np.float32);rgb=pixels[:,:,:3]*(pixels[:,:,3:4]/255)
  lum=rgb.max(axis=2);border=np.concatenate([lum[:8,:].flatten(),lum[-8:,:].flatten(),lum[:,:8].flatten(),lum[:,-8:].flatten()])
  dark=(border<20).mean()>.83 and not config.get('frame') and id!='quaoar'
  if objects.get(id,{}).get('family') in ['nebula','cluster','galaxy'] and id!='milky-way':dark=False
  if dark:
   mask=nd.binary_closing(lum>19,iterations=2);mask=nd.binary_opening(mask,iterations=1)
   labels,count=nd.label(mask);sizes=np.bincount(labels.ravel());sizes[0]=0
   if count and sizes.max()>40:
    mask=nd.binary_fill_holes(labels==sizes.argmax())
    yy,xx=np.where(mask);left,top,right,bottom=xx.min(),yy.min(),xx.max()+1,yy.max()+1
    points=outline(mask);sx=w/im.width;sy=h/im.height
    path='M'+'L'.join(f'{x+px*sx:.2f} {y+py*sy:.2f}' for px,py in points)+'Z'
    box=[x+left*sx,y+top*sy,(right-left)*sx,(bottom-top)*sy]
    margin=max(box[2:])*.035;crop=[box[0]-margin,box[1]-margin,box[2]+margin*2,box[3]+margin*2]
    span=max(box[2:])*config.get('bodyFraction',1)
    result[id]={'file':row['file'],'size':[W,H],'crop':crop,'path':path,'span':span,'portrait':config.get('portrait',550),'style':'silhouette'}
    continue
  # Dense sky fields and terrain photos use a rounded photo sticker; no invented
  # object boundary or removal of real background details is claimed.
  result[id]={'file':row['file'],'size':[W,H],'crop':[x,y,w,h],'span':max(w,h)*config.get('bodyFraction',1),'portrait':config.get('portrait',550),'style':'photo-frame'}
(folder/'image-shapes.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(f'{len(result)} SVG shape/crop records; source images unchanged.')
