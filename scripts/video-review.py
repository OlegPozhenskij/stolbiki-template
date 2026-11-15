"""Decode actual MP4 frames into a compact contact sheet for visual inspection."""
from pathlib import Path
import subprocess, sys, io
from PIL import Image, ImageDraw

video=Path(sys.argv[1]).resolve()
frames=[int(x) for x in sys.argv[2].split(',')]
root=Path(__file__).resolve().parents[1]
ffmpeg=next((root/'node_modules/@remotion').glob('compositor-*/ffmpeg.exe'))
sheet=Image.new('RGB',(1280,260*((len(frames)+2)//3)), '#142b40')
draw=ImageDraw.Draw(sheet)
for i,frame in enumerate(frames):
    data=subprocess.run([str(ffmpeg),'-loglevel','error','-ss',str(frame/30),'-i',str(video),'-frames:v','1','-vf','scale=420:236','-f','image2pipe','-c:v','png','-'],capture_output=True,check=True).stdout
    pic=Image.open(io.BytesIO(data)).convert('RGB')
    # 3 columns, source aspect retained. Each row is 260 pixels.
    x=(i%3)*426;y=(i//3)*260
    sheet.paste(pic,(x,y+20));draw.text((x+8,y+4),f'frame {frame} / {frame/30:.2f}s',fill='#fff5df')
target=video.with_name('motion-review.jpg');sheet.save(target,quality=94)
print(target)
