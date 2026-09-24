import { NextResponse } from "next/server";
import { getCarousel } from "@/lib/carousels";
import { auditSlides } from "@/lib/export-slides";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 120;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const carousel = await getCarousel(id);
  if (!carousel) {
    return NextResponse.json({ error: "Carousel not found" }, { status: 404 });
  }
  try {
    const issues = await auditSlides(carousel.slides, carousel.aspectRatio);
    return NextResponse.json({ ok: issues.length === 0, issues });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: `Audit failed: ${message}` }, { status: 500 });
  }
}
