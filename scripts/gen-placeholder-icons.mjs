// Generates solid-color placeholder PNGs for the PWA until real art exists.
// Run: node scripts/gen-placeholder-icons.mjs
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "icons");
mkdirSync(OUT, { recursive: true });

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([t, data])), 0);
  return Buffer.concat([len, t, data, crc]);
}

// Solid RGBA PNG of [w x h] in color {r,g,b}.
function solidPng(w, h, { r, g, b }) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(w, 0);
  ihdr.writeUInt32BE(h, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  // rows: each prefixed with filter byte 0
  const row = Buffer.alloc(1 + w * 4);
  for (let x = 0; x < w; x++) {
    row[1 + x * 4] = r;
    row[1 + x * 4 + 1] = g;
    row[1 + x * 4 + 2] = b;
    row[1 + x * 4 + 3] = 255;
  }
  const raw = Buffer.concat(Array.from({ length: h }, () => row));
  const idat = deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", idat),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const PINK = { r: 0xff, g: 0x7e, b: 0xb6 }; // theme_color
const INK = { r: 0x1a, g: 0x0b, b: 0x2e }; // background_color

const files = [
  ["icon-192.png", 192, 192, PINK],
  ["icon-512.png", 512, 512, PINK],
  ["apple-touch-icon.png", 180, 180, PINK],
  ["splash.png", 1170, 2532, INK],
];

for (const [name, w, h, color] of files) {
  writeFileSync(join(OUT, name), solidPng(w, h, color));
  console.log(`wrote public/icons/${name} (${w}x${h})`);
}
