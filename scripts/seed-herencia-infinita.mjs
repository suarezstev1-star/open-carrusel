#!/usr/bin/env node
// Carga la marca (blanco, rojo, negro y marfil) y los carruseles de Steven Suárez · Herencia
// Infinita en Open Carrusel. Requiere el servidor corriendo (npm run dev).
//
//   node scripts/seed-herencia-infinita.mjs            # http://localhost:3000
//   BASE_URL=http://localhost:3001 node scripts/seed-herencia-infinita.mjs
//
// Si un carrusel con el mismo nombre ya existe, se salta (no duplica).
// Con --reemplazar, los que ya existen se borran y se vuelven a crear con la
// versión nueva (se pierden los cambios hechos a mano en esos carruseles).

import { CAROUSELS } from "./herencia-infinita/carousels.mjs";
import { C } from "./herencia-infinita/motion.mjs";

const BASE = process.env.BASE_URL || "http://localhost:3000";
const REPLACE = process.argv.includes("--reemplazar");

async function api(method, path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`${method} ${path} → ${res.status} ${await res.text()}`);
  }
  return res.json();
}

async function main() {
  await api("PUT", "/api/brand", {
    name: "Steven Suárez · Herencia Infinita",
    colors: {
      primary: C.acento,
      secondary: C.texto,
      accent: C.adorno,
      background: C.fondo,
      surface: C.tarjeta,
    },
    fonts: { heading: "Fraunces", body: "Figtree" },
    styleKeywords: [
      "blanco, rojo, negro y marfil",
      "cálido",
      "familia latina",
      "fondo marfil",
      "texto negro",
      "rojo de acento",
      "motion CSS",
    ],
  });
  console.log("✓ Marca Steven Suárez");

  const { carousels: existing } = await api("GET", "/api/carousels");
  const byName = new Map(existing.map((c) => [c.name, c.id]));

  for (const c of CAROUSELS) {
    if (byName.has(c.name)) {
      if (!REPLACE) {
        console.log(`· Ya existe: ${c.name} (usa --reemplazar para actualizarlo)`);
        continue;
      }
      await api("DELETE", `/api/carousels/${byName.get(c.name)}`);
    }
    const created = await api("POST", "/api/carousels", {
      name: c.name,
      aspectRatio: "4:5",
    });
    for (const s of c.slides) {
      await api("POST", `/api/carousels/${created.id}/slides`, s);
    }
    await api("PUT", `/api/carousels/${created.id}/caption`, {
      caption: c.caption,
      hashtags: c.hashtags,
    });
    await api("PUT", `/api/carousels/${created.id}`, { tags: c.tags });
    console.log(`✓ ${c.name} (${c.slides.length} slides)`);
  }
}

main().catch((err) => {
  console.error(`✗ ${err.message}`);
  console.error(`¿Está corriendo Open Carrusel en ${BASE}? (npm run dev)`);
  process.exit(1);
});
