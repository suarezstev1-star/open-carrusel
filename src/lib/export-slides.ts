import puppeteer, { type Browser } from "puppeteer";
import { readFile } from "fs/promises";
import path from "path";
import sharp from "sharp";
import { wrapSlideHtml, extractFontFamilies } from "./slide-html";
import { getInlinedFontCSS } from "./fonts";
import type { Slide, AspectRatio } from "@/types/carousel";
import { DIMENSIONS } from "@/types/carousel";

// Singleton browser with lifecycle management
let browser: Browser | null = null;
let exportCount = 0;
const MAX_EXPORTS_BEFORE_RESTART = 50;

async function getBrowser(): Promise<Browser> {
  if (browser && exportCount >= MAX_EXPORTS_BEFORE_RESTART) {
    await browser.close().catch(() => {});
    browser = null;
    exportCount = 0;
  }
  if (!browser || !browser.isConnected()) {
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        // Concurrent pages are background tabs; without these Chrome stalls their screenshots
        "--disable-background-timer-throttling",
        "--disable-renderer-backgrounding",
        "--disable-backgrounding-occluded-windows",
      ],
    });
    exportCount = 0;
  }
  return browser;
}

/**
 * Inline all image references in slide HTML.
 * Replaces /uploads/xxx.png paths with data: URIs.
 */
async function inlineImages(html: string): Promise<string> {
  const uploadDir = path.resolve(process.cwd(), "public");
  const imgRegex = /(?:src=["']|url\(["']?)(\/uploads\/[^"'\s)]+)/g;
  const matches = [...html.matchAll(imgRegex)];

  let result = html;
  for (const match of matches) {
    const imgPath = match[1];
    try {
      const fullPath = path.join(uploadDir, imgPath);
      const buffer = await readFile(fullPath);
      const ext = path.extname(imgPath).toLowerCase();
      const mime =
        ext === ".png"
          ? "image/png"
          : ext === ".jpg" || ext === ".jpeg"
            ? "image/jpeg"
            : "image/webp";
      const base64 = buffer.toString("base64");
      result = result.replace(imgPath, `data:${mime};base64,${base64}`);
    } catch {
      // Keep original path — Puppeteer can fetch from localhost
    }
  }

  return result;
}

/**
 * Export a single slide to PNG buffer.
 */
export async function exportSlide(
  slide: Slide,
  aspectRatio: AspectRatio
): Promise<Buffer> {
  const { width, height } = DIMENSIONS[aspectRatio];

  // Get inlined font CSS
  const fontFamilies = extractFontFamilies(slide.html);
  const inlinedFontCss = await getInlinedFontCSS(fontFamilies);

  // Inline images
  const inlinedHtml = await inlineImages(slide.html);

  // Build self-contained HTML
  const fullHtml = wrapSlideHtml(inlinedHtml, aspectRatio, {
    inlineFontCss: inlinedFontCss,
  });

  const br = await getBrowser();
  const page = await br.newPage();

  try {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    await page.setContent(fullHtml, { waitUntil: "domcontentloaded", timeout: 15000 });

    // Wait for fonts to be ready
    await page
      .waitForFunction(
        () =>
          document.fonts.ready.then(() =>
            [...document.fonts].every((f) => f.status === "loaded")
          ),
        { timeout: 10000 }
      )
      .catch(() => {
        // Font loading timeout — proceed with whatever loaded
      });

    const screenshotBuffer = await page.screenshot({
      type: "png",
      clip: { x: 0, y: 0, width, height },
    });

    exportCount++;

    // Post-process with Sharp: enforce sRGB
    const processed = await sharp(screenshotBuffer)
      .toColorspace("srgb")
      .png()
      .toBuffer();

    return processed;
  } finally {
    await page.close().catch(() => {});
  }
}

/**
 * Export all slides of a carousel to PNG buffers.
 * Processes slides one at a time (reliable screenshots).
 */
export async function exportAllSlides(
  slides: Slide[],
  aspectRatio: AspectRatio,
  onProgress?: (current: number, total: number) => void
): Promise<{ name: string; buffer: Buffer }[]> {
  const results: { name: string; buffer: Buffer }[] = [];
  // One page at a time: parallel background tabs can stall Page.captureScreenshot
  const CONCURRENCY = 1;

  for (let i = 0; i < slides.length; i += CONCURRENCY) {
    const batch = slides.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (slide, batchIdx) => {
        const idx = i + batchIdx;
        const buffer = await exportSlide(slide, aspectRatio);
        onProgress?.(idx + 1, slides.length);
        return { name: `slide-${idx + 1}.png`, buffer };
      })
    );
    results.push(...batchResults);
  }

  return results;
}

export interface SlideAuditIssue {
  slide: number;
  slideId: string;
  problem: string;
}

/**
 * Render each slide and report layout problems the agent must fix:
 * clipped/overflowing text, content outside the safe zone, too many words,
 * and missing brand header/counter when the brand kit is used.
 */
export async function auditSlides(
  slides: Slide[],
  aspectRatio: AspectRatio
): Promise<SlideAuditIssue[]> {
  const { width, height } = DIMENSIONS[aspectRatio];
  const issues: SlideAuditIssue[] = [];
  const br = await getBrowser();

  for (const slide of [...slides].sort((a, b) => a.order - b.order)) {
    const n = slide.order + 1;
    const page = await br.newPage();
    try {
      await page.setViewport({ width, height, deviceScaleFactor: 1 });
      await page.setContent(wrapSlideHtml(slide.html, aspectRatio), {
        waitUntil: "networkidle0",
        timeout: 20000,
      });
      await page.evaluate(() => document.fonts.ready).catch(() => {});
      const found = await page.evaluate(
        (W: number, H: number) => {
          const out: string[] = [];
          const SAFE = 40;
          const label = (el: Element) =>
            (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 40);
          document.querySelectorAll("body *").forEach((el) => {
            const e = el as HTMLElement;
            const cs = getComputedStyle(e);
            if (cs.display === "none" || cs.visibility === "hidden") return;
            const hasText = Array.from(e.childNodes).some(
              (c) => c.nodeType === 3 && (c.textContent || "").trim()
            );
            if (!hasText) return;
            if (e.scrollWidth > e.clientWidth + 2 || e.scrollHeight > e.clientHeight + 2) {
              if (cs.overflow !== "visible") out.push(`Texto cortado: "${label(e)}"`);
            }
            const r = e.getBoundingClientRect();
            if (r.width === 0 || r.height === 0) return;
            if (r.left < SAFE || r.top < SAFE || r.right > W - SAFE || r.bottom > H - SAFE)
              out.push(`Texto fuera de la zona segura: "${label(e)}"`);
            // Recortado por un contenedor con overflow oculto
            for (let a = e.parentElement; a && a !== document.body; a = a.parentElement) {
              if (getComputedStyle(a).overflow === "visible") continue;
              const ar = a.getBoundingClientRect();
              if (r.left < ar.left - 1 || r.right > ar.right + 1 || r.top < ar.top - 1 || r.bottom > ar.bottom + 1)
                out.push(`Texto cortado por su contenedor: "${label(e)}"`);
              break;
            }
            // Tapado por otro elemento
            const pts = [[r.left + 4, r.top + r.height / 2], [r.left + r.width / 2, r.top + r.height / 2], [r.right - 4, r.top + r.height / 2]];
            for (const [x, y] of pts) {
              const top = document.elementFromPoint(x, y);
              if (top && !e.contains(top) && !top.contains(e)) {
                out.push(`Texto tapado por otro elemento: "${label(e)}"`);
                break;
              }
            }
            // Titulares de más de 3 líneas
            if (e.classList.contains("aq-h")) {
              const lh = parseFloat(cs.lineHeight) || parseFloat(cs.fontSize);
              if (r.height / lh > 1.5 && e.parentElement) {
                const lines = Math.round(r.height / lh);
                if (lines > 2) out.push(`Titular en ${lines} líneas, acórtalo o baja el tamaño: "${label(e)}"`);
              }
            }
          });
          let headLines = 0;
          document.querySelectorAll(".aq-h").forEach((h) => {
            const hs = getComputedStyle(h);
            const lh = parseFloat(hs.lineHeight) || parseFloat(hs.fontSize);
            headLines += Math.round(h.getBoundingClientRect().height / lh);
          });
          if (headLines > 3) out.push(`El titular ocupa ${headLines} líneas (máx. 3): acórtalo o baja el tamaño`);
          const words = (document.body.innerText || "").split(/\s+/).filter(Boolean).length;
          if (words > 45) out.push(`Demasiado texto: ${words} palabras (máx. 45)`);
          if (document.querySelector(".aq-page")) {
            if (!document.querySelector(".aq-cap")) out.push("Falta la cápsula superior (.aq-cap)");
            if (!document.querySelector(".aq-count")) out.push("Falta el contador (.aq-count)");
          }
          return Array.from(new Set(out));
        },
        width,
        height
      );
      found.forEach((problem) => issues.push({ slide: n, slideId: slide.id, problem }));
    } finally {
      await page.close().catch(() => {});
    }
  }
  return issues;
}
