"use client";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { geoPath, geoNaturalEarth1, GeoProjection } from "d3-geo";

type Props = {
  scores: Record<string, number>; // ISO3 -> score 0..1
};

type Position = { x: number; y: number };

type Feature = GeoJSON.Feature<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>;

type FeatureCollection = GeoJSON.FeatureCollection<GeoJSON.Geometry, GeoJSON.GeoJsonProperties>;

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

// d3 projection and path builder for accurate world shapes
function createProjection(width: number, height: number): GeoProjection {
  return geoNaturalEarth1().fitSize([width, height], { type: "Sphere" } as { type: "Sphere" });
}

function getStringProp(obj: GeoJSON.GeoJsonProperties | undefined, key: string): string | undefined {
  const v = obj?.[key];
  return typeof v === "string" ? v : undefined;
}

function pickIso3(f: Feature): string | undefined {
  const p = f.properties;
  return (
    // Common ISO3 keys across various datasets
    getStringProp(p, "ISO3166-1-Alpha-3") ||
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
  const colorStops = useMemo(() => ["#f7fbff", "#deebf7", "#c6dbef", "#9ecae1", "#6baed6", "#4292c6", "#2171b5", "#08519c", "#08306b"], []);
  const [fc, setFc] = useState<FeatureCollection | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hover, setHover] = useState<{ name: string; score: number | null; pos: Position } | null>(null);
  const [selected, setSelected] = useState<{ name: string; iso3?: string; time?: string; timezone?: string; loading: boolean; error?: string } | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 800, h: 450 });
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounced resize handler for better performance
  const handleResize = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const width = Math.max(400, rect.width);
    // Better aspect ratio for world map
    const height = Math.max(250, Math.round(width * 0.6));
    setSize({ w: Math.round(width), h: height });
  }, []);

  // Optimized mouse handlers with debouncing
  const handleMouseMove = useCallback((e: React.MouseEvent<SVGPathElement>, name: string, score: number | null) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    
    hoverTimeoutRef.current = setTimeout(() => {
      const bounds = (e.currentTarget.ownerSVGElement)?.getBoundingClientRect();
      const px = e.clientX - (bounds?.left || 0);
      const py = e.clientY - (bounds?.top || 0);
      setHover({ name, score, pos: { x: px, y: py } });
    }, 16); // ~60fps throttling
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setHover(null);
  }, []);

  const handleClick = useCallback(async (name: string, iso3?: string) => {
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
  }, []);

  const width = size.w;
  const height = size.h;
  const projection = useMemo(() => createProjection(width, height), [width, height]);
  const pathGen = useMemo(() => geoPath(projection), [projection]);

  // Pre-compute feature data for better performance
  const featuresData = useMemo(() => {
    if (!fc) return [];
    return fc.features.map((f, idx) => {
      const iso3Raw = pickIso3(f);
      const iso3 = typeof iso3Raw === "string" ? iso3Raw.toUpperCase() : undefined;
      const name = pickName(f);
      const score = iso3 ? scores[iso3] : undefined;
      const val = typeof score === "number" ? clamp(score) : 0;
      const fill = typeof score === "number" ? interpolateColors(colorStops, val) : "#cbd5e1";
      const d = pathGen(f) || undefined;
      return { idx, iso3, name, score, fill, d };
    });
  }, [fc, scores, colorStops, pathGen]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  useEffect(() => {
    let cancelled = false;
    // Use a lightweight GeoJSON source (no extra deps)
    // Countries maritime 10m keeps ISO_A3 and ADMIN names
    const url = "/api/world";
    const tryFetch = (u: string) => fetch(u).then(r => {
      if (!r.ok) throw new Error(`GeoJSON yüklenemedi: ${r.status}`);
      return r.json();
    });
    tryFetch(url)
      .then(r => {
        return r as FeatureCollection;
      })
      .catch(async () => {
        // Fallback to static public file if api fails
        return tryFetch("/world-countries.min.geo.json") as Promise<FeatureCollection>;
      })
      .then((data: FeatureCollection) => {
        if (cancelled) return;
        const isValid = data && Array.isArray(data.features) && data.features.length > 0;
        if (!isValid) {
          setError("Coğrafya verisi boş veya geçersiz");
          return;
        }
        setFc(data);
      })
      .catch(e => {
        if (!cancelled) setError(e.message || String(e));
      });
    return () => { cancelled = true; };
  }, []);

  const legend = (
    <div className="mt-3 flex items-center gap-3 text-xs" aria-label="Lejant">
      <span className="text-gray-600 dark:text-gray-400">Düşük Risk</span>
      <div className="h-3 flex-1 min-w-[200px] rounded shadow-sm" style={{ background: `linear-gradient(to right, ${colorStops.join(", ")})` }} />
      <span className="text-gray-600 dark:text-gray-400">Yüksek Risk</span>
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


  return (
    <div className="w-full" ref={containerRef}>
      <svg 
        viewBox={`0 0 ${width} ${height}`} 
        width="100%" 
        height={height} 
        role="img" 
        aria-label="Dünya polikriz ısısı haritası" 
        preserveAspectRatio="xMidYMid meet"
        className="overflow-hidden"
      >
        <rect x={0} y={0} width={width} height={height} fill="#eef2f7" className="dark:fill-[#0b1220]" />
        {featuresData.map(({ idx, iso3, name, score, fill, d }) => (
          <path
            key={idx}
            d={d}
            fill={fill}
            stroke={hover?.name === name ? "#111827" : "#9ca3af"}
            strokeOpacity={hover?.name === name ? 0.9 : 0.7}
            strokeWidth={hover?.name === name ? 1.5 : 0.6}
            className="cursor-pointer transition-all duration-150"
            onMouseMove={(e) => handleMouseMove(e, name, typeof score === "number" ? score : null)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(name, iso3)}
          />
        ))}
        {hover && (
          <g pointerEvents="none" transform={`translate(${hover.pos.x}, ${hover.pos.y})`}>
            <foreignObject x={12} y={-12 - 40} width={240} height={50}>
              <div className="px-3 py-2 rounded-lg bg-white/95 dark:bg-gray-900/95 text-xs shadow-lg border border-gray-200 dark:border-gray-700 backdrop-blur-sm" style={{ maxWidth: 240 }}>
                <div className="font-semibold text-gray-900 dark:text-white truncate">{hover.name}</div>
                {hover.score != null && (
                  <div className="text-gray-600 dark:text-gray-300 mt-1">
                    Polikriz Skoru: <span className="font-medium">{clamp(hover.score).toFixed(2)}</span>
                  </div>
                )}
              </div>
            </foreignObject>
          </g>
        )}
      </svg>
      {legend}
      {selected && (
        <div className="mt-3 text-sm">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm">
            <span className="font-semibold text-gray-900 dark:text-white">{selected.name}</span>
            {selected.loading && <span className="text-gray-500 dark:text-gray-400">Yükleniyor…</span>}
            {selected.error && <span className="text-red-600 dark:text-red-400">{selected.error}</span>}
            {!selected.loading && !selected.error && selected.time && (
              <span className="text-gray-600 dark:text-gray-300">
                {selected.time} ({selected.timezone})
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
});

export default WorldHeatmap;


