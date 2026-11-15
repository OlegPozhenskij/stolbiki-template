"""Rasterize code-native SVG stickers once for deterministic, fast video playback."""
from pathlib import Path
import json,base64,os,sys
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
jobs=json.loads((ROOT/'episodes'/ (sys.argv[1] if len(sys.argv)>1 else 'cosmic-stickers-300') /'render-assets.json').read_text(encoding='utf-8'))
created=0
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROME','C:/Program Files/Google/Chrome/Application/chrome.exe'),args=['--no-sandbox'])
 page=browser.new_page(viewport={'width':640,'height':640},device_scale_factor=2)
 for job in jobs:
  out=ROOT/job['target']
  if out.exists():continue
  out.parent.mkdir(parents=True,exist_ok=True)
  source=base64.b64encode((ROOT/job['source']).read_bytes()).decode()
  page.set_content('<html><body style="margin:0;background:transparent"><img width="640" height="640" src="data:image/svg+xml;base64,'+source+'"></body></html>')
  page.evaluate('async()=>{await document.images[0].decode();await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))}')
  page.screenshot(path=str(out),omit_background=True);created+=1
 browser.close()
print(f'Sticker raster cache: created {created}, reused {len(jobs)-created}.')
