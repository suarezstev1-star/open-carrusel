#!/usr/bin/env node
// Carga en Open Carrusel los carruseles de una tanda del guionista.
//   node scripts/seed-tanda.mjs tandas/tanda-2026-10-19.json
// Requiere el servidor corriendo (npm run dev). Si un carrusel con el mismo
// nombre ya existe, se salta.

import { readFileSync } from "node:fs";
import { build } from "./herencia-infinita/motion.mjs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const file = process.argv[2];
if (!file) {
  console.error("Uso: node scripts/seed-tanda.mjs tandas/tanda-AAAA-MM-DD.json");
  process.exit(1);
}

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  return res.json();
}

const tanda = JSON.parse(readFileSync(file, "utf8"));
const piezas = tanda.piezas.filter((p) => p.formato === "carrusel");
const { carousels: existing } = await api("GET", "/api/carousels");
const names = new Set(existing.map((c) => c.name));

for (const p of piezas) {
  const c = p.carrusel;
  if (names.has(c.nombre)) {
    console.log(`· Ya existe: ${c.nombre}`);
    continue;
  }
  const created = await api("POST", "/api/carousels", { name: c.nombre, aspectRatio: "4:5" });
  for (const s of build(c.slides)) await api("POST", `/api/carousels/${created.id}/slides`, s);
  await api("PUT", `/api/carousels/${created.id}/caption`, { caption: p.caption, hashtags: p.hashtags });
  await api("PUT", `/api/carousels/${created.id}`, { tags: c.tags });
  console.log(`✓ ${c.nombre} (${c.slides.length} slides)`);
}
