"""Compatibility entrypoint; all visibility math lives in the JS engine."""
import subprocess,sys
from pathlib import Path
root=Path(__file__).resolve().parents[1]
subprocess.run(["node",str(root/"scripts/chunks.mjs"),*sys.argv[1:]],cwd=root,check=True)
