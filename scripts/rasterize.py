"""Raster renderer for the same SVG bg/fg contract used by the pencil renderer."""
from pathlib import Path
import os,sys,json,io
from PIL import Image
from playwright.sync_api import sync_playwright
art,out=Path(os.environ['ART_DIR']),Path(os.environ['OUTPUT_DIR'])
out.mkdir(parents=True,exist_ok=True)
meta={}
with sync_playwright() as p:
    browser=p.chromium.launch(executable_path=os.environ['CHROME'],args=['--no-sandbox'])
    page=browser.new_page(viewport={'width':480,'height':640},device_scale_factor=2)
    for name in sys.argv[1:]:
        layers=[]
        for layer in ['bg','fg']:
            svg=(art/f'{name}-{layer}.svg').read_text(encoding='utf-8')
            page.set_content("<html><body style='margin:0;background:transparent'>"+svg+"</body></html>")
            if layer=='fg':
                meta[name]=page.evaluate("""() => {const b=document.querySelector('svg').getBBox();return {x:b.x/480,y:b.y/640,w:b.width/480,h:b.height/640}}""")
            layers.append(Image.open(io.BytesIO(page.screenshot(omit_background=True))).convert('RGBA'))
        layers[0].convert('RGB').save(out/f'{name}-bg.jpg',quality=95)
        layers[1].save(out/f'{name}-fg.png')
        Image.alpha_composite(*layers).convert('RGB').save(out/f'{name}.jpg',quality=95)
    browser.close()
(out/'meta.json').write_text(json.dumps(meta),encoding='utf-8')
