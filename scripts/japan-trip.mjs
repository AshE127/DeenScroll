// Edit the password-protected Japan trip page (public/japan/index.html).
//
//   node scripts/japan-trip.mjs open <password>   -> writes japan-trip.json (git-ignored, never commit it)
//   ...edit japan-trip.json...
//   node scripts/japan-trip.mjs lock <password>   -> re-encrypts japan-trip.json into the page
//
// Stop shape (inside cities[].days[].rows[]):
//   { "t": "2:30 PM", "title": "Name of place", "desc": "What to do there", "tags": ["essential"],
//     "wiki": "Exact Wikipedia title or null", "cost": "¥500 or null", "alert": "warning text or null" }
// Tags: booked, essential (must-do), musttry (food), gem, popular, local, optional (skip if tired).
// No tag = a small logistics row (train, check-out) with no photo.
import fs from "fs";
import { webcrypto as c } from "crypto";

const PAGE = new URL("../public/japan/index.html", import.meta.url);
const JSONF = new URL("../japan-trip.json", import.meta.url);
const [cmd, pw] = process.argv.slice(2);
if (!["open", "lock"].includes(cmd) || !pw) {
  console.log("Usage: node scripts/japan-trip.mjs open|lock <password>");
  process.exit(1);
}
const b64 = (u) => Buffer.from(u).toString("base64");
const ub64 = (s) => new Uint8Array(Buffer.from(s, "base64"));
async function keyFor(salt, n, use) {
  const base = await c.subtle.importKey("raw", new TextEncoder().encode(pw.trim().toLowerCase()), "PBKDF2", false, ["deriveKey"]);
  return c.subtle.deriveKey({ name: "PBKDF2", salt, iterations: n, hash: "SHA-256" }, base, { name: "AES-GCM", length: 256 }, false, [use]);
}
const html = fs.readFileSync(PAGE, "utf8");
const lines = html.split("\n");
const at = lines.findIndex((l) => l.startsWith("const BLOB = "));
if (at < 0) throw new Error("BLOB line not found in page");

if (cmd === "open") {
  const B = JSON.parse(lines[at].slice("const BLOB = ".length).replace(/;\s*$/, ""));
  const key = await keyFor(ub64(B.s), B.n, "decrypt");
  const plain = await c.subtle.decrypt({ name: "AES-GCM", iv: ub64(B.i) }, key, ub64(B.c)).catch(() => {
    console.error("Wrong password.");
    process.exit(1);
  });
  fs.writeFileSync(JSONF, JSON.stringify(JSON.parse(new TextDecoder().decode(plain)), null, 2));
  console.log("Wrote japan-trip.json. Edit it, then run: node scripts/japan-trip.mjs lock <password>");
} else {
  const data = JSON.parse(fs.readFileSync(JSONF, "utf8")); // throws on invalid JSON, before touching the page
  const salt = c.getRandomValues(new Uint8Array(16)), iv = c.getRandomValues(new Uint8Array(12)), n = 150000;
  const key = await keyFor(salt, n, "encrypt");
  const ct = await c.subtle.encrypt({ name: "AES-GCM", iv }, key, new TextEncoder().encode(JSON.stringify(data)));
  lines[at] = `const BLOB = ${JSON.stringify({ s: b64(salt), i: b64(iv), c: b64(new Uint8Array(ct)), n })};`;
  fs.writeFileSync(PAGE, lines.join("\n"));
  const days = data.cities.reduce((a, x) => a + x.days.length, 0);
  const stops = data.cities.reduce((a, x) => a + x.days.reduce((b, d) => b + d.rows.length, 0), 0);
  console.log(`Locked ${data.cities.length} cities, ${days} days, ${stops} stops into public/japan/index.html`);
}
