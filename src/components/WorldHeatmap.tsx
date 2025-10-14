"use client";
import { memo, useMemo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleSequential } from "d3-scale";
import { interpolateYlOrRd } from "d3-scale-chromatic";

// Lightweight world topojson from react-simple-maps CDN
const WORLD_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

type Props = {
  scores: Record<string, number>; // ISO3 -> score 0..1
};

function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

const WorldHeatmap = memo(function WorldHeatmap({ scores }: Props) {
  const color = useMemo(() => scaleSequential(interpolateYlOrRd).domain([0, 1]), []);
  return (
    <div className="w-full h-full">
      <ComposableMap projectionConfig={{ scale: 140 }} width={980} height={520} aria-label="Dünya polikriz ısısı haritası">
        <Geographies geography={WORLD_URL}>
          {({ geographies }) => (
            <>
              {geographies.map((geo) => {
                const iso3 = (geo.properties as any).iso_a3 as string;
                const s = clamp(scores[iso3] ?? 0);
                return (
                  <Geography key={geo.rsmKey} geography={geo} fill={color(s)} stroke="#ffffff" strokeWidth={0.2} />
                );
              })}
            </>
          )}
        </Geographies>
      </ComposableMap>
      <div className="mt-2 flex items-center gap-2 text-xs" aria-label="Lejant">
        <span> düşük</span>
        <div className="h-2 flex-1 min-w-[120px] bg-gradient-to-r from-[#ffffcc] via-[#fd8d3c] to-[#800026] rounded" />
        <span> yüksek</span>
      </div>
      <div className="text-xs text-black/60 dark:text-white/60 mt-1">Palet: YlOrRd (renk körlüğüne duyarlı alternatiflerle uyumlu).</div>
    </div>
  );
});

export default WorldHeatmap;


