"use client";
import { useRef } from "react";
import { exportCSV, exportPDF, exportPNG, exportSVG } from "@/utils/export";

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  dataForCsv?: Array<Record<string, unknown>>;
  fileBaseName: string;
  alt?: string;
};

export default function FigureFrame({ title, subtitle, children, dataForCsv, fileBaseName, alt }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <section className="rounded-lg border border-black/10 dark:border-white/10 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-medium">{title}</h2>
          {subtitle ? <p className="text-xs text-black/60 dark:text-white/60">{subtitle}</p> : null}
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button className="rounded border border-black/10 dark:border-white/10 px-2 py-1" onClick={() => ref.current && exportPNG(ref.current, fileBaseName)}>PNG</button>
          <button className="rounded border border-black/10 dark:border_white/10 px-2 py-1" onClick={() => ref.current && exportSVG(ref.current, fileBaseName)}>SVG</button>
          <button className="rounded border border-black/10 dark:border-white/10 px-2 py-1" onClick={() => ref.current && exportPDF(ref.current, fileBaseName)}>PDF</button>
          {dataForCsv ? (
            <button className="rounded border border-black/10 dark:border-white/10 px-2 py-1" onClick={() => exportCSV(dataForCsv, fileBaseName)}>CSV</button>
          ) : null}
        </div>
      </div>
      <div ref={ref} className="mt-3" aria-label={alt}>
        {children}
      </div>
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="rounded-md border border-black/10 dark:border-white/10 p-2">
          <div className="font-medium mb-1">Ne görüyorum?</div>
          <div className="text-black/70 dark:text-white/70">Kısa açıklama metni.</div>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/10 p-2">
          <div className="font-medium mb-1">Politika notu</div>
          <div className="text-black/70 dark:text-white/70">Politika açısından kısa yorum.</div>
        </div>
      </div>
    </section>
  );
}


