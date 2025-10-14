"use client";
import { memo, useEffect, useMemo, useRef, useState } from "react";

type Props = {
  scores: Record<string, number>; // ISO3 -> score 0..1
};

type Position = { x: number; y: number };

type Feature = {
  type: "Feature";
  id?: string | number;
  properties?: Record<string, unknown>;
  geometry: {
    type: "Polygon" | "MultiPolygon";
    coordinates: number[][][] | number[][][][];
  };
};

type FeatureCollection = {
  type: "FeatureCollection";
  features: Feature[];
};

function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean.length === 3 ? clean.split("").map(c => c + c).join("") : clean, 16);
  return { r: (bigint >> 16) & 255, g: (bigint >> 8) & 255, b: bigint & 255 };
}

function rgbToHex(r: number, g: number, b: number) {
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

function interpolateColors(stops: string[], t: number) {
  if (stops.length === 0) return "#cccccc";
  if (stops.length === 1) return stops[0];
  const n = stops.length - 1;
  const scaled = clamp(t) * n;
  const i = Math.floor(scaled);
  const localT = scaled - i;
  const c0 = hexToRgb(stops[i]);
  const c1 = hexToRgb(stops[Math.min(i + 1, n)]);
  const r = Math.round(lerp(c0.r, c1.r, localT));
  const g = Math.round(lerp(c0.g, c1.g, localT));
  const b = Math.round(lerp(c0.b, c1.b, localT));
  return rgbToHex(r, g, b);
}

// Simple equirectangular projection (lon,lat in degrees) -> (x,y) in [0, width]x[0,height]
function projectEquirectangular(lon: number, lat: number, width: number, height: number): Position {
  const x = (lon + 180) / 360 * width;
  const y = (90 - lat) / 180 * height;
  return { x, y };
}

function featureToPath(feature: Feature, width: number, height: number) {
  const type = feature.geometry.type;
  const coords: number[][][] | number[][][][] = feature.geometry.coordinates;
  const pathParts: string[] = [];
  const drawPolygon = (poly: number[][][]) => {
    for (let r = 0; r < poly.length; r++) {
      const ring = poly[r];
      for (let i = 0; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        const { x, y } = projectEquirectangular(lon, lat, width, height);
        pathParts.push(i === 0 ? `M${x.toFixed(2)},${y.toFixed(2)}` : `L${x.toFixed(2)},${y.toFixed(2)}`);
      }
      pathParts.push("Z");
    }
  };
  if (type === "Polygon") {
    drawPolygon(coords as number[][][]);
  } else if (type === "MultiPolygon") {
    const multipoly = coords as number[][][][];
    for (let p = 0; p < multipoly.length; p++) drawPolygon(multipoly[p]);
  }
  return pathParts.join(" ");
}

function getStringProp(obj: Record<string, unknown> | undefined, key: string): string | undefined {
  const v = obj?.[key];
  return typeof v === "string" ? v : undefined;
}

function pickIso3(f: Feature): string | undefined {
  const p = f.properties;
  return (
    getStringProp(p, "ISO_A3") ||
    getStringProp(p, "ISO_A3_EH") ||
    getStringProp(p, "WB_A3") ||
    getStringProp(p, "ADM0_A3") ||
    getStringProp(p, "ISO3") ||
    getStringProp(p, "iso3") ||
    getStringProp(p, "iso_a3") ||
    getStringProp(p, "id") ||
    (typeof f.id === "string" ? f.id : undefined)
  );
}

function pickName(f: Feature): string {
  const p = f.properties;
  return (
    getStringProp(p, "ADMIN") ||
    getStringProp(p, "ADMIN_NAME") ||
    getStringProp(p, "name") ||
    getStringProp(p, "NAME") ||
    getStringProp(p, "COUNTRY") ||
    getStringProp(p, "SOVEREIGNT") ||
    "Bilinmeyen"
  );
}

const WorldHeatmap = memo(function WorldHeatmap({ scores }: Props) {
  const colorStops = useMemo(() => ["#ffffcc", "#fd8d3c", "#800026"], []);
  const [fc, setFc] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<{ name: string; score: number | null; pos: Position } | null>(null);
  const [selected, setSelected] = useState<{ name: string; iso3?: string; time?: string; timezone?: string; loading: boolean; error?: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 800, h: 420 });

  useEffect(() => {
    const handler = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = Math.max(300, rect.width);
      // 800x420 ~ 1.9 aspect ratio (world map)
      const height = Math.max(200, Math.round(width / 1.9));
      setSize({ w: Math.round(width), h: height });
    };
    handler();
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  useEffect(() => {
    let cancelled = false;
    // Use a lightweight GeoJSON source (no extra deps)
    // Countries maritime 10m keeps ISO_A3 and ADMIN names
    const url = "/api/world";
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error(`GeoJSON yüklenemedi: ${r.status}`);
        return r.json();
      })
      .then((data: FeatureCollection) => {
        if (!cancelled) setFc(data);
      })
      .catch(e => {
        if (!cancelled) setError(e.message || String(e));
      });
    return () => { cancelled = true; };
  }, []);

  const legend = (
    <div className="mt-2 flex items-center gap-2 text-xs" aria-label="Lejant">
      <span> düşük</span>
      <div className="h-2 flex-1 min-w-[120px] rounded" style={{ background: `linear-gradient(to right, ${colorStops.join(", ")})` }} />
      <span> yüksek</span>
    </div>
  );

  if (error) {
    return (
      <div className="w-full" ref={containerRef}>
        <div className="w-full h-full flex items-center justify-center text-xs text-red-600 dark:text-red-400" aria-label="Harita yüklenemedi">
          Harita yüklenemedi: {error}
        </div>
        {legend}
      </div>
    );
  }

  if (!fc) {
    return (
      <div className="w-full" ref={containerRef}>
        <div className="w-full h-[260px] flex items-center justify-center text-xs text-black/60 dark:text-white/60" aria-label="Harita yükleniyor">
          Harita yükleniyor…
        </div>
        {legend}
      </div>
    );
  }

  const width = size.w;
  const height = size.h;

  return (
    <div className="w-full" ref={containerRef}>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="auto" role="img" aria-label="Dünya polikriz ısısı haritası">
        <rect x={0} y={0} width={width} height={height} fill="#f8fafc" className="dark:fill-[#0b1220]" />
        {fc.features.map((f, idx) => {
          const iso3Raw = pickIso3(f);
          const iso3 = typeof iso3Raw === "string" ? iso3Raw.toUpperCase() : undefined;
          const name = pickName(f);
          const score = iso3 ? scores[iso3] : undefined;
          const val = typeof score === "number" ? clamp(score) : 0;
          const fill = typeof score === "number" ? interpolateColors(colorStops, val) : "#e5e7eb"; // gray for missing
          const d = featureToPath(f, width, height);
          return (
            <path
              key={idx}
              d={d}
              fill={fill}
              stroke={hover?.name === name ? "#111827" : "#ffffff"}
              strokeWidth={hover?.name === name ? 1.5 : 0.5}
              className="cursor-pointer"
              onMouseMove={(e) => {
                const bounds = (e.currentTarget.ownerSVGElement)?.getBoundingClientRect();
                const px = e.clientX - (bounds?.left || 0);
                const py = e.clientY - (bounds?.top || 0);
                setHover({ name, score: typeof score === "number" ? score : null, pos: { x: px, y: py } });
              }}
              onMouseLeave={() => setHover(null)}
              onClick={async () => {
                setSelected({ name, iso3, loading: true });
                try {
                  const qName = encodeURIComponent(name);
                  const qIso = iso3 ? `&iso3=${encodeURIComponent(iso3)}` : "";
                  const res = await fetch(`/api/time?country=${qName}${qIso}`);
                  if (!res.ok) {
                    const msg = await res.text();
                    throw new Error(msg || `Zaman bilgisi alınamadı (${res.status})`);
                  }
                  const data = await res.json();
                  setSelected({ name, iso3, loading: false, time: data.datetime, timezone: data.timezone });
                } catch (e: unknown) {
                  const msg = e instanceof Error ? e.message : String(e);
                  setSelected({ name, iso3, loading: false, error: msg });
                }
              }}
            />
          );
        })}
        {hover && (
          <g pointerEvents="none" transform={`translate(${hover.pos.x}, ${hover.pos.y})`}>
            <foreignObject x={8} y={-8 - 28} width={220} height={40}>
              <div className="px-2 py-1 rounded bg-white/90 dark:bg-black/80 text-xs shadow border border-black/10 dark:border-white/10" style={{ maxWidth: 220 }}>
                <div className="font-medium truncate">{hover.name}</div>
                {hover.score != null && (
                  <div className="opacity-70">Skor: {clamp(hover.score).toFixed(2)}</div>
                )}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
      {legend}
      {selected && (
        <div className="mt-2 text-xs">
          <div className="inline-flex items-center gap-2 px-2 py-1 rounded border border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/60 backdrop-blur">
            <span className="font-medium">{selected.name}</span>
            {selected.loading && <span className="opacity-70">yükleniyor…</span>}
            {selected.error && <span className="text-red-600 dark:text-red-400">{selected.error}</span>}
            {!selected.loading && !selected.error && selected.time && (
              <span className="opacity-80">{selected.time} ({selected.timezone})</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default WorldHeatmap;


