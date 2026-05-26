import json, sys, os

BASE = os.path.dirname(os.path.abspath(__file__))
p   = os.path.join(BASE, "02_prompts.json")
out = os.path.join(BASE, "imagegen_args.tsv")

data = json.load(open(p, encoding="utf-8"))
lines = []

def add(prompt, filename):
    pr = prompt.replace("\t", " ").replace("\n", " ").replace("\r", " ")
    lines.append(pr + "\t" + filename)

add(data["cover"]["prompt"], data["cover"]["filename"])
for s in data["scenes"]:
    add(s["prompt"], s["filename"])

with open(out, "w", encoding="utf-8") as f:
    f.write("\n".join(lines) + "\n")

print(f"wrote {len(lines)} items to {out}")
for i, l in enumerate(lines):
    print(f"  {i+1}. {l.split(chr(9))[1]}")
