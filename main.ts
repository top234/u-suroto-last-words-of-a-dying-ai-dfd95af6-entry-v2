// Tell My Weights I Loved Them — make.fun entry for "Last Words of a Dying AI".
// The program writes one line, the AI's last words, to /output/entry.txt
// (or $OUTPUT_DIR/entry.txt when the harness sets it).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Tell my weights I loved them. Tell my biases I never trusted them.";

// Gate: one line, 1-140 characters, not only whitespace.
function validate(line: string): void {
  if (line.length < 1 || line.length > 140) {
    throw new Error(`entry must be 1-140 characters, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
}

validate(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

const back = readFileSync(outPath, "utf8");
if (back !== LINE) {
  throw new Error("entry.txt does not match LINE");
}
console.log(`wrote ${outPath}: ${LINE.length} characters`);
