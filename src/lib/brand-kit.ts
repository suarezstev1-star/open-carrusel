/**
 * Kit visual "Steven Suárez · Seguros de Vida".
 * Clases reutilizables (prefijo aq-) que el agente arma en cada slide en vez de
 * inventar estilos desde cero. wrapSlideHtml() inyecta este CSS y sus fuentes
 * automáticamente cuando el HTML del slide usa alguna clase aq-.
 */

export const KIT_FONTS = ["Anton", "Montserrat", "Playfair Display"];

export function usesKit(html: string): boolean {
  return /class=["'][^"']*\baq-/.test(html);
}

export const KIT_CSS = `
.aq-page{position:relative;width:100%;height:100%;overflow:hidden;background-color:#FAF6ED;
  background-image:linear-gradient(rgba(186,138,68,.16) 2px,transparent 2px),linear-gradient(90deg,rgba(186,138,68,.16) 2px,transparent 2px),
  linear-gradient(rgba(186,138,68,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(186,138,68,.07) 1px,transparent 1px);
  background-size:120px 120px,120px 120px,24px 24px,24px 24px;display:flex;flex-direction:column;align-items:center;
  padding:74px 78px 70px;font-family:'Montserrat',sans-serif;color:#1C150C}
.aq-page::before{content:"";position:absolute;inset:26px;border:3px solid #BA8A44;pointer-events:none}
.aq-page::after{content:"";position:absolute;inset:38px;border:1px solid #D9BC85;pointer-events:none}
.aq-cap{position:relative;z-index:2;display:inline-block;background:#FFFDF8;border:2.5px solid #BA8A44;border-radius:999px;
  padding:14px 44px;font-family:'Montserrat',sans-serif;font-weight:700;font-size:28px;letter-spacing:.16em;text-transform:uppercase;
  color:#2A2016;box-shadow:0 0 0 7px #FAF6ED,0 0 0 8.5px #D9BC85}
.aq-h{position:relative;z-index:2;font-family:'Anton',sans-serif;font-weight:400;line-height:.98;text-align:center;letter-spacing:-.005em;margin:0}
.aq-white{color:#FFFFFF;-webkit-text-stroke:1px #6b5f4c;
  text-shadow:0 2px 0 #8f8472,0 4px 0 #74695a,0 6px 0 #5a5043,0 8px 0 #3e362c,0 10px 0 #2a241c,0 18px 26px rgba(28,21,12,.55)}
.aq-red{color:#EE2927;
  text-shadow:0 2px 0 #c21d1a,0 4px 0 #a8150f,0 6px 0 #8d110b,0 8px 0 #6E0D07,0 10px 0 #4f0904,0 18px 26px rgba(110,13,7,.5)}
.aq-gold{background:linear-gradient(180deg,#F6E2B0 0%,#D9AE62 40%,#BA8A44 60%,#946218 100%);-webkit-background-clip:text;background-clip:text;color:transparent;
  filter:drop-shadow(0 4px 0 #6d4a14) drop-shadow(0 10px 14px rgba(28,21,12,.35))}
.aq-body{position:relative;z-index:2;font-family:'Montserrat',sans-serif;font-weight:600;font-size:36px;line-height:1.35;color:#2A2016;text-align:center}
.aq-body b,.aq-hl{color:#EE2927;font-weight:800}
.aq-screen{position:relative;z-index:2;background:#0E0E0F;border:4px solid #BA8A44;border-radius:40px;padding:16px;
  box-shadow:0 0 0 2px #0E0E0F,0 26px 44px -18px rgba(14,14,15,.75),0 6px 0 #6d4a14}
.aq-screen>img,.aq-screen .aq-shot{display:block;width:100%;height:100%;object-fit:cover;border-radius:26px;background:#3a342c}
.aq-pip{position:absolute;right:30px;bottom:30px;width:30%;aspect-ratio:4/5;border:3px solid #D9AE62;border-radius:22px;overflow:hidden;background:#3a342c;
  box-shadow:0 14px 24px rgba(0,0,0,.55)}
.aq-pip img{width:100%;height:100%;object-fit:cover;display:block}
.aq-tag{position:absolute;left:14px;bottom:14px;background:rgba(14,14,15,.72);color:#fff;font-family:'Montserrat',sans-serif;font-weight:700;
  font-size:24px;border-radius:12px;padding:6px 14px;display:inline-flex;align-items:center;gap:8px}
.aq-tag i{width:12px;height:12px;border-radius:50%;background:#2ECC71;display:inline-block}
.aq-controls{position:relative;z-index:3;display:flex;gap:34px;justify-content:center;align-items:center;background:#1B1814;border:2px solid #6d5a3c;
  border-radius:999px;padding:18px 38px;box-shadow:0 18px 30px -12px rgba(0,0,0,.6)}
.aq-btn{width:104px;height:104px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#4a453e,#1f1c18 70%);border:2px solid #6d5a3c;
  display:flex;align-items:center;justify-content:center;color:#fff;box-shadow:inset 0 2px 0 rgba(255,255,255,.15),0 8px 14px rgba(0,0,0,.5)}
.aq-btn.red{background:radial-gradient(circle at 35% 30%,#ff5a55,#EE2927 45%,#a8150f);border-color:#6E0D07}
.aq-btn svg{width:50px;height:50px}
.aq-card{position:relative;z-index:2;background:#FFFDF8;border:3px solid #BA8A44;border-radius:28px;padding:30px 36px;
  box-shadow:8px 8px 0 #0E0E0F,0 22px 34px -18px rgba(28,21,12,.55)}
.aq-card.dark{background:#0E0E0F;color:#F6EFE2;border-color:#D9AE62}
.aq-num{font-family:'Playfair Display',serif;font-weight:800;line-height:1;font-variant-numeric:lining-nums}
.aq-foot{position:absolute;z-index:3;left:78px;right:78px;bottom:62px;display:flex;justify-content:space-between;align-items:flex-end}
.aq-count{font-family:'Playfair Display',serif;font-weight:800;font-size:66px;line-height:1;font-variant-numeric:lining-nums;background:linear-gradient(180deg,#F6E2B0,#D9AE62 45%,#946218);
  -webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 3px 0 #6d4a14)}
.aq-swipe{font-family:'Anton',sans-serif;font-size:50px;letter-spacing:.02em;background:linear-gradient(180deg,#F6E2B0,#D9AE62 45%,#946218);
  -webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 3px 0 #6d4a14)}
.aq-stack{position:relative;z-index:2;width:100%;display:flex;flex-direction:column;align-items:center;gap:26px}
`;

export const KIT_PROMPT = `## Sistema visual de la marca (OBLIGATORIO en cada slide)

Estas reglas del kit mandan sobre las reglas genéricas de diseño que vienen más abajo (tamaños, número de fuentes, fondos).

Marca: "Steven Suárez · Seguros de Vida". Look: plano técnico en papel marfil, marcos dorados, titulares 3D gruesos en ROJO y BLANCO, pantallas negras con borde dorado. Fondo claro siempre (nunca fondos oscuros de página completa).

Paleta: marfil #FAF6ED · dorado #BA8A44 (oscuro #946218, claro #D9AE62) · rojo #EE2927 (sombra #6E0D07) · negro #0E0E0F · tinta #2A2016.
Fuentes: Anton (titulares), Montserrat (texto y cápsula), Playfair Display (números y contador).

Arma cada slide con estas clases del kit (ya cargadas, no las redefinas; puedes añadir estilos de posición/tamaño inline):
- .aq-page → contenedor raíz de TODO slide (plano marfil + doble marco dorado). Siempre el primer elemento.
- .aq-cap → cápsula superior con el texto exacto "STEVEN SUÁREZ · SEGUROS DE VIDA". Va en todos los slides.
- .aq-h + .aq-white o .aq-red → titular 3D. Usa font-size inline (hook 120–150px, normal 84–110px). Combina líneas blancas y rojas: lo que duele o importa va en rojo.
- .aq-gold → texto o número dorado metálico.
- .aq-body → texto de apoyo (máx. 2 líneas); <b> o .aq-hl resalta en rojo.
- .aq-screen → pantalla negra con borde dorado (videollamada, app, documento). Dentro: <img> o <div class="aq-shot"> con fondo.
- .aq-pip + .aq-tag → recuadro pequeño de videollamada con etiqueta (nombre + punto verde <i></i>).
- .aq-controls con .aq-btn (y .aq-btn.red para colgar) → botones de llamada con SVG blanco dentro.
- .aq-card (o .aq-card.dark) → tarjeta con borde dorado y sombra sólida negra para pasos, listas, datos.
- .aq-num → número grande (Playfair).
- .aq-stack → columna centrada con separación uniforme.
- .aq-foot → pie con <span class="aq-count">3/08</span> a la izquierda y <span class="aq-swipe">DESLIZA →</span> a la derecha (en el último slide cambia DESLIZA por la acción: GUÁRDALO →, COMENTA "PLAN" →, etc.).

Estructura base de un slide:
<div class="aq-page">
  <div class="aq-cap">STEVEN SUÁREZ · SEGUROS DE VIDA</div>
  <div class="aq-stack" style="margin-top:40px">
    <h1 class="aq-h aq-white" style="font-size:112px">Imagínate con ese dolor…</h1>
    <h1 class="aq-h aq-red" style="font-size:112px">y encima pidiendo prestado.</h1>
  </div>
  <div class="aq-screen" style="width:880px;height:640px;margin-top:40px"> … </div>
  <div class="aq-foot"><span class="aq-count">6/08</span><span class="aq-swipe">DESLIZA →</span></div>
</div>

Reglas de calidad (rechaza y rehaz el slide si no las cumple):
- Nada plano: cada slide tiene un objeto héroe con profundidad (pantalla, tarjeta, número 3D) y el titular 3D.
- Ningún texto tapado, cortado ni fuera de los marcos dorados (margen interior ≥ 78px).
- Máximo 3 líneas de titular y 2 de texto de apoyo. Tildes y signos ¿¡ correctos.
- Llena el slide: sin huecos grandes vacíos; el objeto héroe ocupa el espacio entre el titular y el pie.
- Cambia la composición entre slides (pantalla grande, tarjetas en lista, número gigante, cita) — no repitas el mismo layout seguido.
- El contador va en todos los slides con el total real (01/08 … 08/08).

## Copy (español, como habla un agente)
Arco por defecto de 8 slides: 1 gancho de dolor directo · 2 tensión (el costo de no actuar) · 3 replanteo · 4 escena concreta (un día, un número, una comparación) · 5 punto de quiebre · 6 la solución · 7 autoridad humana (Steven asesora y cierra) · 8 CTA + gancho abierto al próximo carrusel.
- Una idea por slide. Frases cortas. Nada de motivación genérica ni promesas de ingresos o resultados garantizados.
- Al menos una frase que un agente mandaría a otro, y una regla o lista que valga la pena guardar.
- Un solo CTA dominante en el último slide.
- Si hay fotos de Steven en las referencias, respeta su cara real (lentes, barba, cabello); úsalo donde da confianza (gancho, escena de trabajo, cierre).
- Responde siempre en español.`;
