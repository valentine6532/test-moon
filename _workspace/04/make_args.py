import json, pathlib

data = json.loads(pathlib.Path("02_prompts.json").read_text(encoding="utf-8"))
lines = []
for img in data["images"]:
    prompt = img["prompt"].replace("\t", " ").replace("\n", " ")
    filename = img["filename"]
    lines.append(f"{prompt}\t{filename}")

pathlib.Path("imagegen_args.tsv").write_text("\n".join(lines), encoding="utf-8")
print(f"wrote {len(lines)} entries to imagegen_args.tsv")
