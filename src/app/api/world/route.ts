import { NextResponse } from "next/server";

const SOURCES = [
  "https://unpkg.com/@geo-maps/countries-maritime-10m@1.7.1/countries-maritime-10m.geo.json",
  "https://cdn.jsdelivr.net/npm/@geo-maps/countries-maritime-10m@1.7.1/countries-maritime-10m.geo.json",
];

async function fetchWithTimeout(url: string, timeoutMs: number) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { signal: controller.signal, cache: "force-cache" });
    return res;
  } finally {
    clearTimeout(id);
  }
}

export async function GET() {
  for (const url of SOURCES) {
    try {
      const res = await fetchWithTimeout(url, 8000);
      if (res.ok) {
        const data = await res.json();
        return NextResponse.json(data, {
          headers: {
            "Cache-Control": "public, max-age=86400, stale-while-revalidate=43200",
          },
        });
      }
    } catch {
      // try next source
    }
  }
  return NextResponse.json({ error: "GeoJSON fetch failed" }, { status: 502 });
}


