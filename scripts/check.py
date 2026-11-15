"""Compatibility entrypoint. Preview uses the shared episode timeline."""
import subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
subprocess.run(["node",str(root/"scripts/episode.mjs"),"preview",*(sys.argv[1:] or ["animal-longevity"])],cwd=root,check=True)
