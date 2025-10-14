"use client";
import { memo, useMemo } from "react";

type Props = {
  scores: Record<string, number>; // ISO3 -> score 0..1
};

function clamp(v: number, lo = 0, hi = 1) { return Math.max(lo, Math.min(hi, v)); }

const WorldHeatmap = memo(function WorldHeatmap({ scores }: Props) {
  const colorStops = useMemo(() => ["#ffffcc", "#fd8d3c", "#800026"], []);
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex items-center justify-center text-xs text-black/60 dark:text-white/60" aria-label="Dünya polikriz ısısı haritası">
        Harita modülü devre dışı (bağımlılık uyumsuzluğu). Özet gösterim aşağıda.
      </div>
      <div className="mt-2 flex items-center gap-2 text-xs" aria-label="Lejant">
        <span> düşük</span>
        <div className="h-2 flex-1 min-w-[120px] rounded" style={{ background: `linear-gradient(to right, ${colorStops.join(", ")})` }} />
        <span> yüksek</span>
      </div>
      <div className="text-xs text-black/60 dark:text-white/60 mt-1">Palet: YlOrRd benzeri. Özet skorlar: {Object.entries(scores).slice(0,6).map(([k,v])=>`${k}:${clamp(v).toFixed(2)}`).join(" · ")}{Object.keys(scores).length>6?"…":""}</div>
    </div>
  );
});

export default WorldHeatmap;


