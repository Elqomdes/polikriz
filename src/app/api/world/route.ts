import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

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
  // 1) Try local file from public (best for reliability)
  try {
    const filePath = path.join(process.cwd(), "public", "world-countries.min.geo.json");
    const buf = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(buf);
    return NextResponse.json(data, { headers: { "Cache-Control": "public, max-age=604800" } });
  } catch {
    // continue
  }

  // 2) Try external mirrors with timeouts
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

  // 3) Final fallback: minimal valid FeatureCollection (single coarse world polygon)
  const fallback = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { ADMIN: "World", ISO_A3: "WLD" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-180, -60], [-180, 85], [180, 85], [180, -60], [-180, -60],
            ],
          ],
        },
      },
    ],
  };
  return NextResponse.json(fallback, { headers: { "Cache-Control": "no-store" } });
}


