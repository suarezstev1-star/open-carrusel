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
//  hi-glow    Puerta: la palabra FAMILIA respira en oro
// Adaptados de los efectos de video (Digital zoom, iPhone mockup, Checklist,
// Headline wall, Chart grow, Cover story, Glass type):
//  hi-punch   Zoom digital: el gancho hace dos punch-ins secos y vuelve
//  hi-phone   iPhone: el teléfono entra desde el borde y se llena fila a fila
//  hi-ck      Checklist: cada ítem se tilda con un check que rebota
//  hi-note    Pared de titulares: las notas se pegan una a una
//  hi-draw    Curva que crece: la línea se dibuja y aparece la pastilla
//  hi-letter  Portada: las letras gigantes suben de a una
//  hi-shine   Vidrio: un brillo cruza la palabra FAMILIA
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
@keyframes hi-punch { 0%, 34% { transform: scale(1); } 35%, 62% { transform: scale(1.07); } 63%, 88% { transform: scale(1.14); } 89%, 100% { transform: scale(1); } }
@keyframes hi-phone { from { opacity: 0; transform: translateX(-140%) rotate(-6deg); } to { opacity: 1; transform: rotate(-6deg); } }
@keyframes hi-ck { 0% { background: transparent; border-color: ${C.linea}; color: transparent; transform: scale(.6); } 60% { transform: scale(1.18); } 100% { background: ${C.verde}; border-color: ${C.verde}; color: ${C.crema}; transform: scale(1); } }
@keyframes hi-ink { from { color: rgba(43,33,24,.22); } to { color: ${C.cafe}; } }
@keyframes hi-note { from { opacity: 0; transform: translateY(-40px) rotate(var(--r)) scale(.9); } to { opacity: 1; transform: rotate(var(--r)); } }
@keyframes hi-draw { from { stroke-dashoffset: 1; } to { stroke-dashoffset: 0; } }
@keyframes hi-letter { from { opacity: 0; transform: translateY(60px); } to { opacity: 1; transform: none; } }
@keyframes hi-slowzoom { from { transform: scale(1.05); } to { transform: scale(1); } }
@keyframes hi-shine { from { background-position: 100% 0; } to { background-position: 0 0; } }
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
.hi .punch { transform-origin: 20% 50%; animation: hi-punch 2.4s linear 1.1s both; }
.hi .glassword { display: inline-block; font-family: Fraunces, serif; font-weight: 800; font-size: 158px; line-height: 1.02; letter-spacing: .01em; margin: 6px 0 34px; color: transparent; background: linear-gradient(100deg, ${C.crema} 42%, #ffffff 48%, #F3E3BE 52%, ${C.crema} 58%) 100% 0 / 300% 100%; -webkit-background-clip: text; background-clip: text; filter: drop-shadow(0 10px 18px rgba(0,0,0,.22)); animation: hi-rise .8s cubic-bezier(.2,.7,.2,1) .5s both, hi-shine 1.1s ease-in-out 1.5s both; }
.hi .glassrule { width: 100%; height: 6px; background: ${C.oro}; border-radius: 4px; transform-origin: left; animation: hi-line 1s cubic-bezier(.6,0,.2,1) 1.2s both; margin-bottom: 40px; }
.hi .phonewrap { display: grid; grid-template-columns: 372px 1fr; gap: 56px; align-items: center; }
.hi .phone { height: 744px; border-radius: 62px; background: ${C.cafe}; padding: 16px; box-shadow: 0 34px 60px rgba(43,33,24,.28); animation: hi-phone .7s cubic-bezier(.2,.7,.2,1) .2s both; }
.hi .phone .scr { height: 100%; border-radius: 48px; background: ${C.tarjeta}; padding: 84px 28px 28px; position: relative; display: flex; flex-direction: column; }
.hi .phone .island { position: absolute; top: 20px; left: 50%; width: 118px; height: 34px; margin-left: -59px; border-radius: 20px; background: ${C.cafe}; }
.hi .phone .app { font-size: 22px; font-weight: 700; letter-spacing: .16em; color: ${C.oroTexto}; text-transform: uppercase; }
.hi .phone h4 { font-family: Fraunces, serif; font-weight: 600; font-size: 40px; line-height: 1.08; margin: 10px 0 22px; }
.hi .phone .row { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; font-size: 24px; padding: 16px 0; border-bottom: 2px solid ${C.linea}; animation: hi-rise .45s ease-out both; animation-delay: calc(var(--i) * .4s + .9s); }
.hi .phone .row b { font-family: Fraunces, serif; font-size: 30px; color: ${C.oroTexto}; white-space: nowrap; }
.hi .phone .res { margin-top: auto; background: ${C.vino}; color: ${C.crema}; border-radius: 26px; padding: 22px 24px; animation: hi-pop .6s cubic-bezier(.2,.7,.2,1) 2.3s both; }
.hi .phone .res b { display: block; font-family: Fraunces, serif; font-size: 74px; line-height: 1; }
.hi .phone .res span { font-size: 22px; }
.hi .side h2 { font-size: 64px; }
.hi .side p { font-size: 42px; }
.hi .orb { position: absolute; border-radius: 50%; background: radial-gradient(circle, rgba(184,134,46,.22), rgba(184,134,46,0) 70%); pointer-events: none; }
.hi .glass { position: relative; background: rgba(255,253,248,.62); -webkit-backdrop-filter: blur(22px); backdrop-filter: blur(22px); border: 2px solid rgba(232,223,207,.9); border-radius: 32px; padding: 44px 48px; box-shadow: 0 24px 50px rgba(43,33,24,.10); animation: hi-rise .55s cubic-bezier(.2,.7,.2,1) .15s both; }
.hi .glass .lab { display: flex; align-items: center; gap: 14px; font-size: 26px; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; color: ${C.oroTexto}; margin-bottom: 18px; }
.hi .glass .lab::before { content: ''; width: 14px; height: 14px; border-radius: 50%; background: ${C.oro}; }
.hi .glass ul { list-style: none; display: flex; flex-direction: column; }
.hi .glass li { display: grid; grid-template-columns: 76px 1fr; align-items: start; gap: 8px; font-size: 42px; line-height: 1.26; padding: 22px 0; border-top: 2px solid ${C.linea}; }
.hi .glass li:first-child { border-top: 0; }
.hi .glass .ck { width: 58px; height: 58px; border-radius: 50%; border: 3px solid ${C.linea}; display: flex; align-items: center; justify-content: center; font-size: 34px; font-weight: 800; margin-top: 2px; animation: hi-ck .5s ease-out both; animation-delay: calc(var(--i) * .7s + .8s); }
.hi .glass li span { animation: hi-ink .4s ease-out both; animation-delay: calc(var(--i) * .7s + .8s); }
.hi .wall { position: relative; height: 820px; }
.hi .note { position: absolute; width: 420px; background: ${C.tarjeta}; border: 1px solid ${C.linea}; padding: 44px 34px 32px; box-shadow: 0 16px 30px rgba(43,33,24,.16); transform: rotate(var(--r)); animation: hi-note .55s cubic-bezier(.3,1.4,.5,1) both; animation-delay: calc(var(--i) * .22s + .4s); }
.hi .note::before { content: ''; position: absolute; top: 14px; left: 50%; width: 24px; height: 24px; margin-left: -12px; border-radius: 50%; background: ${C.vino}; box-shadow: 0 3px 5px rgba(0,0,0,.25); }
.hi .note b { display: block; font-family: Fraunces, serif; font-weight: 600; font-size: 46px; line-height: 1.05; }
.hi .note span { display: block; font-family: Fraunces, serif; font-weight: 700; font-size: 36px; white-space: nowrap; color: ${C.oroTexto}; margin-top: 10px; }
.hi .chart { width: 100%; height: auto; overflow: visible; }
.hi .chart .l { fill: none; stroke-width: 9; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; animation: hi-draw 1.4s ease-in-out both; }
.hi .chart .pill { transform-box: fill-box; transform-origin: left center; animation: hi-pop .55s cubic-bezier(.2,.7,.2,1) 2.2s both; }
.hi .chart text { font-family: Figtree, sans-serif; }
.hi .legend { display: flex; gap: 40px; font-size: 34px; font-weight: 600; margin-top: 18px; }
.hi .legend i { display: inline-block; width: 40px; height: 9px; border-radius: 5px; vertical-align: middle; margin-right: 14px; }
.hi.cover main { justify-content: center; }
.hi .covergo { animation: hi-slowzoom 4s ease-out both; transform-origin: 50% 30%; }
.hi .issue { display: flex; justify-content: space-between; font-size: 26px; font-weight: 700; letter-spacing: .18em; color: ${C.oroTexto}; border-bottom: 2px solid ${C.cafe}; padding-bottom: 16px; }
.hi .bigword { font-family: Fraunces, serif; font-weight: 800; font-size: 204px; line-height: .9; letter-spacing: -.03em; color: ${C.verde}; margin: 30px 0 10px -8px; white-space: nowrap; }
.hi .bigword span { display: inline-block; animation: hi-letter .6s cubic-bezier(.2,.7,.2,1) both; animation-delay: calc(var(--i) * .07s + .3s); }
.hi .coverline { font-family: Fraunces, serif; font-weight: 600; font-size: 66px; line-height: 1.08; margin-top: 34px; }
.hi .coverdek { font-size: 40px; line-height: 1.3; margin-top: 28px; opacity: .85; }
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
export function frame({ index, total, body, door = false, cover = false }) {
  const pg = `${String(index).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const swipe = door
    ? `<span class="swipe" style="color:${C.crema}">Que tu dinero vuelva a casa</span>`
    : `<span class="swipe">Desliza <i>→</i></span>`;
  return `<style>${MOTION_CSS}${BASE_CSS}</style>
<div class="hi${door ? " door" : ""}${cover ? " cover" : ""}">
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
    <div class="punch"><h1 class="r" style="--i:1">${title}</h1></div>
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

  phone: ({ kicker, title, paras = [], app, screen, rows, result, resultLabel, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    <div class="phonewrap">
      <div class="phone"><div class="scr"><div class="island"></div>
        <div class="app">${app}</div><h4>${screen}</h4>
        ${rows.map(([k, v], i) => `<div class="row" style="--i:${i}"><span>${k}</span><b>${v}</b></div>`).join("")}
        <div class="res"><b>${result}</b><span>${resultLabel}</span></div>
      </div></div>
      <div class="side"><h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>
        ${paras.map((p, i) => `<p class="r" style="--i:${i + 3}">${p}</p>`).join("")}</div>
    </div>
    ${src ? `<div class="src r" style="--i:8">${src}</div>` : ""}`,

  check: ({ kicker, title, label, items, start = 1, src }) => `
    <div class="orb" style="width:520px;height:520px;right:-140px;top:300px"></div>
    <div class="orb" style="width:380px;height:380px;left:-120px;bottom:180px"></div>
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2><div class="rule" style="--i:2"></div>` : ""}
    <div class="glass"><div class="lab">${label}</div><ul>${items.map((it, i) => `<li><i class="ck" style="--i:${i}">✓</i><span style="--i:${i}"><b style="font-family:Fraunces,serif;color:${C.oroTexto};margin-right:12px">${i + start}.</b>${it}</span></li>`).join("")}</ul></div>
    ${src ? `<div class="src r" style="--i:6">${src}</div>` : ""}`,

  wall: ({ kicker, title, notes, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2>` : ""}
    <div class="wall">${notes.map(([k, v, x, y, r], i) => `<div class="note" style="--i:${i};--r:${r}deg;left:${x}px;top:${y}px"><b>${k}</b><span>${v}</span></div>`).join("")}</div>
    ${src ? `<div class="src r" style="--i:7;margin-top:0">${src}</div>` : ""}`,

  chart: ({ kicker, title, text, src }) => `
    ${kicker ? `<div class="kicker r" style="--i:0">${kicker}</div>` : ""}
    ${title ? `<h2 class="r" style="--i:1">${title}</h2>` : ""}
    <svg class="chart" viewBox="0 0 888 540" aria-hidden="true">
      ${[1, 7, 14, 21, 28].map((y) => { const x = 30 + (y / 28) * 828; return `<line x1="${x}" y1="40" x2="${x}" y2="470" stroke="${C.linea}" stroke-width="2"/><text x="${x}" y="515" text-anchor="middle" font-size="28" font-weight="700" fill="${C.oroTexto}">Año ${y}</text>`; }).join("")}
      <line x1="30" y1="470" x2="858" y2="470" stroke="${C.cafe}" stroke-width="3"/>
      <path class="l" pathLength="1" d="M30 360 C 300 320, 600 270, 858 230" stroke="${C.barro}" style="animation-delay:.3s"/>
      <path class="l" pathLength="1" d="M30 440 C 230 420, 360 340, 444 296 S 700 120, 858 60" stroke="${C.verde}" style="animation-delay:.6s;filter:drop-shadow(0 0 10px rgba(31,77,58,.45))"/>
      <circle cx="444" cy="296" r="13" fill="${C.oro}" stroke="${C.tarjeta}" stroke-width="5" class="pill"/>
      <g class="pill"><rect x="480" y="322" width="236" height="62" rx="31" fill="${C.verde}"/><text x="598" y="364" text-anchor="middle" font-size="30" font-weight="800" fill="${C.crema}" letter-spacing="2">AÑO 14 ↗</text></g>
    </svg>
    <div class="legend r" style="--i:3"><span><i style="background:${C.barro}"></i>La del CD</span><span><i style="background:${C.verde}"></i>Su propio dinero</span></div>
    <p class="big r" style="--i:5;margin-top:34px">${text}</p>
    ${src ? `<div class="src r" style="--i:7">${src}</div>` : ""}`,

  cover: ({ issue, word, line, dek }) => `
    <div class="covergo">
      <div class="issue r" style="--i:0"><span>${issue[0]}</span><span>${issue[1]}</span></div>
      <div class="bigword">${[...word].map((ch, i) => `<span style="--i:${i}">${ch}</span>`).join("")}</div>
      <div class="rule" style="--i:6;margin:20px 0 0"></div>
      <div class="coverline r" style="--i:7">${line}</div>
      <p class="coverdek r" style="--i:8">${dek}</p>
    </div>`,

  door: ({ title, sub, cta = "Escríbeme", keyword = "FAMILIA", foot = "Esto lo enseño en Herencia Infinita." }) => `
    <h2 class="r" style="--i:0">${title}</h2>
    <div class="rule" style="--i:1"></div>
    <p class="r" style="--i:2">${cta}</p>
    <div><span class="glassword">${keyword}</span></div>
    <div class="glassrule"></div>
    <p class="r" style="--i:4">${sub}</p>
    <div class="src r" style="--i:6">${foot}</div>`,
};

/** Construye todos los slides de un carrusel a partir de [plantilla, datos, notas]. */
export function build(slides) {
  const total = slides.length;
  return slides.map(([tpl, data, notes], i) => ({
    html: frame({ index: i + 1, total, body: T[tpl](data), door: tpl === "door", cover: tpl === "cover" }),
    notes: notes || "",
  }));
}
