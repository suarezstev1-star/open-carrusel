#!/usr/bin/env node
// Renderiza los carruseles Herencia Infinita con sus motions.
//   node scripts/render-herencia.mjs png <carpeta>   # PNG 1080x1350, cuadro final
//   node scripts/render-herencia.mjs mp4 <carpeta>   # MP4 1080x1920, 4 s por slide
//   node scripts/render-herencia.mjs frames <carpeta> <carrusel> <slide>  # cuadros sueltos
// Requiere ffmpeg para mp4. Usa Chromium de Puppeteer (o PUPPETEER_EXECUTABLE_PATH).
import puppeteer from "puppeteer";
import fs from "fs";
import { spawn } from "child_process";
import { CAROUSELS } from "./herencia-infinita/carousels.mjs";
const [mode, out, onlyC, onlyS] = process.argv.slice(2);
// Fuentes: usa la caché que deja el export de la app; si no está, Google Fonts.
const cache = (f) => `data/.font-cache/${f}.css`;
const fonts = ["Figtree", "Fraunces"].every((f) => fs.existsSync(cache(f)))
  ? `<style>${["Figtree", "Fraunces"].map((f) => fs.readFileSync(cache(f), "utf8")).join("\n")}</style>`
  : `<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;600;700;800&family=Fraunces:wght@600;700;800&display=block" rel="stylesheet">`;
const FPS = 24, SECS = 4;
const b = await puppeteer.launch({ args: ["--no-sandbox", "--disable-gpu"], protocolTimeout: 120000 });
async function open(html, tall) {
  const p = await b.newPage();
  await p.setViewport({width:1080,height:tall?1920:1350});
  const bg = html.includes('class="hi door') ? "#1F4D3A" : "#FAF6EE";
  await p.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8">${fonts}<style>*{margin:0;padding:0;box-sizing:border-box} html,body{width:1080px;height:${tall?1920:1350}px;overflow:hidden;background:${bg}} .stage{position:absolute;top:${tall?285:0}px;left:0}</style></head><body><div class="stage">${html}</div></body></html>`,{waitUntil:"load"});
  await p.evaluate(()=>Promise.all(["600 40px Fraunces","700 40px Fraunces","800 40px Fraunces","400 40px Figtree","700 40px Figtree"].map(f=>document.fonts.load(f))));
  await p.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));
  return p;
}
const seek = (p,ms)=>p.evaluate(ms=>{document.getAnimations().forEach(a=>{a.pause();a.currentTime=ms;});},ms);
fs.mkdirSync(out,{recursive:true});
for (const [ci,c] of CAROUSELS.entries()) {
  if (onlyC!==undefined && +onlyC!==ci) continue;
  const tag = "hi0"+(ci+1);
  if (mode==="png") {
    fs.mkdirSync(`${out}/${tag}`,{recursive:true});
    for (const [si,s] of c.slides.entries()) { const p=await open(s.html,false); await seek(p,60000); await p.screenshot({path:`${out}/${tag}/slide-${si+1}.png`}); await p.close(); }
  } else if (mode==="frames") {
    const s=c.slides[+onlyS]; const p=await open(s.html,false);
    for (const t of [300,900,1500,2200,3000]) { await seek(p,t); await p.screenshot({path:`${out}/${tag}-s${+onlyS+1}-t${t}.png`}); }
    await p.close();
  } else {
    const ff = spawn("ffmpeg",["-loglevel","error","-y","-f","image2pipe","-framerate",String(FPS),"-c:v","mjpeg","-i","-","-c:v","libx264","-pix_fmt","yuv420p","-crf","20","-preset","medium","-movflags","+faststart",`${out}/${tag}.mp4`]);
    const done = new Promise(r=>ff.on("close",r));
    for (const s of c.slides) {
      const p=await open(s.html,true);
      for (let f=0; f<FPS*SECS; f++) { await seek(p, f*1000/FPS); const buf=await p.screenshot({type:"jpeg",quality:92}); if(!ff.stdin.write(buf)) await new Promise(r=>ff.stdin.once("drain",r)); }
      await p.close();
    }
    ff.stdin.end(); await done;
  }
  console.log(tag, mode, "ok");
}
await b.close();
