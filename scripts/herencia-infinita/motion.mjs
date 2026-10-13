// Casa de Oro — sistema visual y de movimiento para los carruseles de
// Steven Suárez · Herencia Infinita. Solo CSS: los slides se ven en iframes
// con sandbox="" (sin JavaScript), así que todo el movimiento es @keyframes.
// Al exportar a PNG, export-slides.ts congela cada animación en su último
// cuadro, así que el estado final de cada keyframe es el diseño estático.

export const C = {
  crema: "#FAF6EE",
  cafe: "#2B2118",
  verde: "#1F4D3A",
  oro: "#B8862E", // solo adornos
  oroTexto: "#8A6420",
  barro: "#B5523B",
  vino: "#A4262C",
  tarjeta: "#FFFDF8",
  linea: "#E8DFCF",
};

// Los motions de la marca:
//  hi-rise    Subida: cada bloque entra desde abajo, escalonado (--i)
//  hi-line    Trazo de oro: la línea dorada se dibuja de izquierda a derecha
//  hi-mark    Subrayado: la palabra en verde se subraya en oro
//  hi-count   Conteo: el número sube de 0 a su valor (--to)
//  hi-pop     Golpe: la cifra grande aparece con un pequeño rebote
//  hi-day     Calendario: los días para el banco se pintan de vino, uno a uno
//  hi-tick    Reloj: la manecilla gira hasta su hora
//  hi-step    Escalera: los 4 pasos se encienden en orden
//  hi-nudge   Desliza: la flecha empuja hacia el siguiente slide
//  hi-glow    Puerta: la palabra HERENCIA respira en oro
export const MOTION_CSS = `
@property --n { syntax: '<integer>'; inherits: false; initial-value: 0; }
@keyframes hi-rise { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
@keyframes hi-line { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes hi-mark { from { background-size: 0% 100%; } to { background-size: 100% 100%; } }
@keyframes hi-count { from { --n: 0; } to { --n: var(--to); } }
@keyframes hi-pop { 0% { opacity: 0; transform: scale(.82); } 70% { opacity: 1; transform: scale(1.04); } 100% { opacity: 1; transform: scale(1); } }
@keyframes hi-day { from { background: ${C.tarjeta}; color: ${C.cafe}; border-color: ${C.linea}; } to { background: ${C.vino}; color: ${C.crema}; border-color: ${C.vino}; } }
@keyframes hi-tick { from { transform: rotate(-300deg); } to { transform: rotate(0deg); } }
@keyframes hi-step { from { background: ${C.tarjeta}; color: ${C.oroTexto}; transform: scale(.8); } to { background: ${C.verde}; color: ${C.crema}; transform: scale(1); } }
@keyframes hi-nudge { 0%, 60%, 100% { transform: translateX(0); } 30% { transform: translateX(14px); } }
@keyframes hi-glow { 0%, 100% { box-shadow: 0 0 0 0 rgba(184,134,46,0); } 50% { box-shadow: 0 0 0 18px rgba(184,134,46,.22); } }
`;

const BASE_CSS = `
.hi { width: 1080px; height: 1350px; background: ${C.crema}; color: ${C.cafe}; font-family: Figtree, sans-serif; display: flex; flex-direction: column; padding: 84px 96px 76px; position: relative; overflow: hidden; }
.hi.door { background: ${C.verde}; color: ${C.crema}; }
.hi header { display: flex; justify-content: space-between; align-items: center; font-size: 26px; font-weight: 700; letter-spacing: .3em; color: ${C.verde}; }
.hi.door header { color: ${C.crema}; }
.hi .pg { color: ${C.oroTexto}; letter-spacing: .14em; }
.hi.door .pg { color: ${C.crema}; opacity: .8; }
.hi main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.hi footer { display: flex; justify-content: space-between; align-items: center; border-top: 2px solid ${C.linea}; padding-top: 30px; }
.hi.door footer { border-top-color: rgba(250,246,238,.25); }
.hi .sig { font-family: Fraunces, serif; font-size: 36px; font-weight: 600; }
.hi .swipe { font-size: 28px; font-weight: 700; color: ${C.verde}; letter-spacing: .06em; }
.hi .swipe i { display: inline-block; font-style: normal; animation: hi-nudge 1.8s ease-in-out 1.4s infinite both; }
.hi .r { animation: hi-rise .8s cubic-bezier(.2,.7,.2,1) both; animation-delay: calc(var(--i, 0) * .16s + .1s); }
.hi .rule { width: 150px; height: 7px; background: ${C.oro}; border-radius: 4px; transform-origin: left; animation: hi-line .9s cubic-bezier(.6,0,.2,1) both; animation-delay: calc(var(--i, 0) * .16s + .1s); margin: 44px 0; }
.hi em { font-style: normal; color: ${C.verde}; background: linear-gradient(transparent 64%, rgba(184,134,46,.32) 64%) no-repeat 0 0 / 0% 100%; -webkit-box-decoration-break: clone; box-decoration-break: clone; animation: hi-mark .9s cubic-bezier(.6,0,.2,1) .8s both; }
.hi.door em { color: ${C.crema}; background-image: linear-gradient(transparent 64%, rgba(184,134,46,.55) 64%); }
.hi .kicker { font-size: 30px; font-weight: 700; letter-spacing: .2em; color: ${C.oroTexto}; text-transform: uppercase; margin-bottom: 40px; }
.hi.door .kicker { color: ${C.crema}; opacity: .85; }
.hi h1 { font-family: Fraunces, serif; font-weight: 600; font-size: 104px; line-height: 1.04; letter-spacing: -.01em; }
.hi h2 { font-family: Fraunces, serif; font-weight: 600; font-size: 76px; line-height: 1.08; }
.hi p { font-size: 46px; line-height: 1.32; }
.hi p + p { margin-top: 30px; }
.hi .big { font-size: 56px; line-height: 1.24; font-weight: 600; }
.hi .muted { color: ${C.cafe}; opacity: .78; }
.hi .src { font-size: 28px; color: ${C.oroTexto}; margin-top: 40px; letter-spacing: .02em; }
.hi.door .src { color: ${C.crema}; opacity: .8; }
.hi .num { font-family: Fraunces, serif; font-weight: 700; font-size: 250px; line-height: .95; color: ${C.oroTexto}; letter-spacing: -.02em; display: inline-block; transform-origin: left bottom; animation: hi-pop .9s cubic-bezier(.2,.7,.2,1) .2s both; }
.hi .num small { font-size: .38em; margin-left: 12px; letter-spacing: 0; }
.hi .count { animation: hi-count 1.6s cubic-bezier(.2,.7,.2,1) .3s both; counter-reset: n var(--n); }
.hi .count::before { content: counter(n); }
.hi .card { background: ${C.tarjeta}; border: 2px solid ${C.linea}; border-radius: 28px; padding: 44px 48px; }
.hi .tag { font-size: 28px; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: ${C.oroTexto}; margin-bottom: 18px; }
.hi .cmp { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
.hi .cmp .val { font-family: Fraunces, serif; font-weight: 700; font-size: 88px; line-height: 1; color: ${C.cafe}; }
.hi .cmp .card.win { border-color: ${C.verde}; }
.hi .cmp .card.win .val { color: ${C.verde}; }
.hi .cmp .lbl { font-size: 38px; line-height: 1.25; margin-top: 18px; }
.hi ol.items { list-style: none; display: flex; flex-direction: column; gap: 34px; }
.hi ol.items li { display: grid; grid-template-columns: 96px 1fr; align-items: start; font-size: 46px; line-height: 1.28; }
.hi ol.items b { font-family: Fraunces, serif; font-size: 72px; line-height: .9; color: ${C.oroTexto}; }
.hi .rows { display: flex; flex-direction: column; gap: 4px; }
.hi .rows div { display: flex; justify-content: space-between; align-items: baseline; font-size: 44px; padding: 22px 0; border-bottom: 2px solid ${C.linea}; }
.hi .rows div span:last-child { font-family: Fraunces, serif; font-weight: 700; color: ${C.oroTexto}; }
.hi .days { display: grid; grid-template-columns: repeat(10, 1fr); gap: 12px; margin: 12px 0 56px; }
.hi .days span { aspect-ratio: 1; border-radius: 14px; border: 2px solid ${C.linea}; background: ${C.tarjeta}; display: flex; align-items: center; justify-content: center; font-size: 30px; font-weight: 700; }
.hi .days span.b { animation: hi-day .35s ease-out both; animation-delay: calc(var(--i) * .12s + .5s); }
.hi .clock { width: 260px; height: 260px; margin-bottom: 48px; }
.hi .clock .hand { transform-box: view-box; transform-origin: 60px 60px; animation: hi-tick 1.6s cubic-bezier(.3,.7,.3,1) .3s both; }
.hi .steps { display: grid; grid-template-columns: repeat(4, 1fr); position: relative; margin: 20px 0 56px; }
.hi .steps::before { content: ''; position: absolute; left: 12.5%; right: 12.5%; top: 66px; height: 6px; background: ${C.oro}; transform-origin: left; animation: hi-line 1.4s cubic-bezier(.6,0,.2,1) .2s both; }
.hi .steps div { display: flex; flex-direction: column; align-items: center; gap: 24px; position: relative; }
.hi .steps i { width: 138px; height: 138px; border-radius: 50%; border: 4px solid ${C.verde}; display: flex; align-items: center; justify-content: center; font-family: Fraunces, serif; font-style: normal; font-weight: 700; font-size: 64px; animation: hi-step .5s ease-out both; animation-delay: calc(var(--i) * .3s + .5s); }
.hi .steps span { font-size: 36px; font-weight: 700; }
.hi .word { display: inline-block; font-family: Fraunces, serif; font-weight: 700; font-size: 112px; letter-spacing: .05em; border: 5px solid ${C.oro}; border-radius: 28px; padding: 18px 56px 26px; margin: 20px 0 48px; animation: hi-glow 2.4s ease-in-out 1s infinite both; }
.hi .quote { font-family: Fraunces, serif; font-weight: 600; font-size: 84px; line-height: 1.12; }
.hi .quote::before { content: '«'; color: ${C.oro}; }
.hi .quote::after { content: '»'; color: ${C.oro}; }
.hi .timeline { display: flex; flex-direction: column; gap: 0; border-left: 6px solid ${C.oro}; padding-left: 48px; }
.hi .timeline div { padding: 18px 0; }
.hi .timeline b { display: block; font-size: 30px; letter-spacing: .14em; text-transform: uppercase; color: ${C.oroTexto}; }
.hi .timeline span { font-size: 44px; line-height: 1.28; }
`;

const esc = (s) => String(s);

/**
 * Envuelve el contenido de un slide con la estructura común de la marca:
 * contador arriba, firma «Steven Suárez» abajo y «Desliza →» salvo en la puerta.
 */
export function frame({ index, total, body, door = false }) {
  const pg = `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const swipe = door
    ? `<span class="swipe" style="color:${C.crema}">Que tu dinero vuelva a casa</span>`
    : `<span class="swipe">Desliza <i>→</i></span>`;
  return `<style>${MOTION_CSS}${BASE_CSS}</style>
<div class="hi${door ? " door" : ""}">
  <header><span class="pg">${pg}</span><span>HERENCIA INFINITA</span></header>
  <main>
${esc(body)}
  </main>
  <footer><span class="sig">Steven Suárez</span>${swipe}</footer>
</div>`;
}

// ---------- Plantillas de slide ----------
// Cada una devuelve solo el cuerpo; frame() le pone marco y numeración.

export const T = {
  hook: ({ kicker, title, sub }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <h1 class="r" style="--i:1">${title}</h1>
    <div class="rule" style="--i:3"></div>
    ${sub ? `<p class="r muted" style="--i:4">${sub}</p>` : ""}`,

  text: ({ kicker, title, paras = [] }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>` : ""}
    ${paras.map((p, i) => `<p class="r" style="--i:${i + 3}">${p}</p>`).join("\n    ")}`,

  stat: ({ kicker, num, count, unit, text, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <div><span class="num">${count != null ? `<span class="count" style="--to:${count}"></span>` : num}${unit ? `<small>${unit}</small>` : ""}</span></div>
    <div class="rule" style="--i:4"></div>
    <p class="big r" style="--i:5">${text}</p>
    ${src ? `<div class="src r" style="--i:7">${src}</div>` : ""}`,

  days: ({ kicker, n, text, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <div class="days">${Array.from({ length: 30 }, (_, d) =>
      d < n ? `<span class="b" style="--i:${d}">${d + 1}</span>` : `<span>${d + 1}</span>`
    ).join("")}</div>
    <p class="big r" style="--i:6">${text}</p>
    ${src ? `<div class="src r" style="--i:8">${src}</div>` : ""}`,

  compare: ({ kicker, title, a, b, note }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>` : ""}
    <div class="cmp">
      <div class="card r${a.win ? " win" : ""}" style="--i:3"><div class="tag">${a.tag}</div><div class="val">${a.val}</div><div class="lbl">${a.lbl}</div></div>
      <div class="card r${b.win ? " win" : ""}" style="--i:4"><div class="tag">${b.tag}</div><div class="val">${b.val}</div><div class="lbl">${b.lbl}</div></div>
    </div>
    ${note ? `<p class="r" style="--i:6;margin-top:48px">${note}</p>` : ""}`,

  list: ({ kicker, title, items, src, start = 1 }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>` : ""}
    <ol class="items">${items.map((it, i) => `<li class="r" style="--i:${i + 3}"><b>${i + start}</b><span>${it}</span></li>`).join("")}</ol>
    ${src ? `<div class="src r" style="--i:${items.length + 4}">${src}</div>` : ""}`,

  rows: ({ kicker, title, rows, note, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>` : ""}
    <div class="rows">${rows.map(([k, v], i) => `<div class="r" style="--i:${i + 3}"><span>${k}</span><span>${v}</span></div>`).join("")}</div>
    ${note ? `<p class="r" style="--i:${rows.length + 4};margin-top:40px">${note}</p>` : ""}
    ${src ? `<div class="src r" style="--i:${rows.length + 5}">${src}</div>` : ""}`,

  clock: ({ kicker, hour = 0, title, paras = [] }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <svg class="clock" viewBox="0 0 120 120" aria-hidden="true">
      <circle cx="60" cy="60" r="54" fill="${C.tarjeta}" stroke="${C.oro}" stroke-width="5"/>
      ${Array.from({ length: 12 }, (_, h) => `<circle cx="${60 + 44 * Math.sin((h * Math.PI) / 6)}" cy="${60 - 44 * Math.cos((h * Math.PI) / 6)}" r="2.6" fill="${C.oro}"/>`).join("")}
      <g class="hand"><line x1="60" y1="60" x2="${60 + 30 * Math.sin((hour * Math.PI) / 6)}" y2="${60 - 30 * Math.cos((hour * Math.PI) / 6)}" stroke="${C.verde}" stroke-width="6" stroke-linecap="round"/></g>
      <circle cx="60" cy="60" r="6" fill="${C.verde}"/>
    </svg>
    <h2 class="r" style="--i:2">${title}</h2>
    <div class="rule" style="--i:3"></div>
    ${paras.map((p, i) => `<p class="r" style="--i:${i + 4}">${p}</p>`).join("\n    ")}`,

  steps: ({ kicker, title, active = 1, text }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1;margin-bottom:56px">${title}</h2>` : ""}
    <div class="steps">${["Proteger", "Construir", "Crecer", "Heredar"].map((s, i) =>
      `<div><i style="--i:${i}${i + 1 === active ? `;outline:6px solid ${C.oro};outline-offset:8px` : ""}">${i + 1}</i><span>${s}</span></div>`
    ).join("")}</div>
    ${text ? `<p class="r" style="--i:6">${text}</p>` : ""}`,

  quote: ({ kicker, text, by }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <div class="quote r" style="--i:1">${text}</div>
    <div class="rule" style="--i:3"></div>
    ${by ? `<p class="r muted" style="--i:4">${by}</p>` : ""}`,

  timeline: ({ kicker, title, items }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1;margin-bottom:48px">${title}</h2>` : ""}
    <div class="timeline">${items.map(([k, v], i) => `<div class="r" style="--i:${i + 2}"><b>${k}</b><span>${v}</span></div>`).join("")}</div>`,

  door: ({ title, sub, cta = "Escríbeme", keyword = "HERENCIA", foot = "Esto lo enseño en Herencia Infinita." }) => `
    <h2 class="r" style="--i:0">${title}</h2>
    <div class="rule" style="--i:1"></div>
    <p class="r" style="--i:2">${cta}</p>
    <div><span class="word r" style="--i:3">${keyword}</span></div>
    <p class="r" style="--i:4">${sub}</p>
    <div class="src r" style="--i:6">${foot}</div>`,
};

/** Construye todos los slides de un carrusel a partir de [plantilla, datos, notas]. */
export function build(slides) {
  const total = slides.length;
  return slides.map(([tpl, data, notes], i) => ({
    html: frame({ index: i + 1, total, body: T[tpl](data), door: tpl === "door" }),
    notes: notes || "",
  }));
}
