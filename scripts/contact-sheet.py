from pathlib import Path
import sys,json
from PIL import Image,ImageDraw,ImageFont
folder=Path(sys.argv[1])
files=[folder/f for f in json.loads((folder/'contact-frames.json').read_text())]+[folder/'thumb.png']
sheet=Image.new('RGB',(1280,360*((len(files)+1)//2)),'white')
d=ImageDraw.Draw(sheet)
for i,file in enumerate(files):
    im=Image.open(file).convert('RGB').resize((640,360))
    x,y=(i%2)*640,(i//2)*360
    sheet.paste(im,(x,y));d.text((x+10,y+8),file.stem,fill='red')
sheet.save(folder/'check.jpg',quality=90)
