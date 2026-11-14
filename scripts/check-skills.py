"""Validate distributable skill entrypoints and their local reference links."""
from pathlib import Path
import re,sys,yaml
root=Path(__file__).resolve().parents[1]/'skills'
errors=[]
for folder in sorted(root.iterdir()):
    entry=folder/'SKILL.md'
    if not entry.exists(): continue
    text=entry.read_text(encoding='utf-8')
    try:
        front=text.split('---',2)[1]
        meta=yaml.safe_load(front)
        assert meta['name']==folder.name
        assert isinstance(meta['description'],str) and meta['description'].strip()
        assert len(text)<5000, 'entrypoint exceeds project budget of 5000 characters'
        for file in folder.rglob('*.md'):
            for link in re.findall(r'\]\(([^)]+)\)',file.read_text(encoding='utf-8')):
                if not re.match(r'https?:|#',link):
                    assert (file.parent/link).exists(), f'missing {link} in {file}'
        print(f'OK {folder.name}: {len(text)} characters')
    except Exception as error: errors.append(f'{folder.name}: {error}')
if errors:
    print('\n'.join(errors),file=sys.stderr);sys.exit(1)
