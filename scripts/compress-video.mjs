import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import ffmpegStatic from "ffmpeg-static";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = path.join(root, "public", "ssotta-explainer.mp4");
const output = path.join(root, "public", "ssotta-explainer.compressed.mp4");

if (!fs.existsSync(input)) {
  console.error("[ssotta] Video not found:", input);
  process.exit(1);
}

if (!ffmpegStatic) {
  console.error("[ssotta] ffmpeg-static binary is unavailable on this platform.");
  process.exit(1);
}

const beforeMb = (fs.statSync(input).size / (1024 * 1024)).toFixed(2);
console.log(`[ssotta] Compressing ssotta-explainer.mp4 (${beforeMb} MB)...`);

const result = spawnSync(
  ffmpegStatic,
  [
    "-i",
    input,
    "-c:v",
    "libx264",
    "-crf",
    "28",
    "-preset",
    "medium",
    "-vf",
    "scale='min(1280,iw)':-2",
    "-c:a",
    "aac",
    "-b:a",
    "96k",
    "-movflags",
    "+faststart",
    "-y",
    output,
  ],
  { stdio: "inherit" },
);

if (result.status !== 0) {
  if (fs.existsSync(output)) fs.unlinkSync(output);
  console.warn("[ssotta] Video compression skipped. Build can continue without it.");
  process.exit(0);
}

const afterMb = (fs.statSync(output).size / (1024 * 1024)).toFixed(2);
fs.renameSync(output, input);
console.log(`[ssotta] Done. ${beforeMb} MB -> ${afterMb} MB`);
