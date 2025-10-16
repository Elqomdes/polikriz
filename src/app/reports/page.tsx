"use client";
import JSZip from "jszip";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Raporlama Merkezi</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">Figür/tabloları işaretle ve toplu indir (PDF/SVG/PNG/CSV).</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["Denge Haritası", "Strateji Yolu", "Ülke Kıyas", "Hassasiyet"].map((name) => (
          <label key={name} className="flex items-center gap-3 rounded-lg border border-black/10 dark:border-white/10 p-4">
            <input type="checkbox" aria-label={`${name} seç`} />
            <div>
              <div className="font-medium">{name}</div>
              <div className="text-xs text-black/60 dark:text-white/60">Makale-uyumlu biçimlendirme.</div>
            </div>
          </label>
        ))}
      </div>
      <div className="mt-6">
        <button className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90" onClick={async () => {
          const checkboxes = Array.from(document.querySelectorAll<HTMLInputElement>("input[type='checkbox']"));
          const selected = checkboxes.filter(c => c.checked).map(c => (c.parentElement?.querySelector('.font-medium')?.textContent || 'figure'));
          if (!selected.length) return;
          const zip = new JSZip();
          selected.forEach((name) => {
            zip.file(`${slugify(name)}.txt`, `Placeholder for ${name}`);
          });
          const blob = await zip.generateAsync({ type: 'blob' });
          const a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = `rapor_paketi_${new Date().toISOString().slice(0,10)}.zip`;
          a.click();
          URL.revokeObjectURL(a.href);
        }}>
          Seçili öğeleri indir
        </button>
      </div>
      </div>
    </ProtectedRoute>
  );
}

function slugify(s: string){
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}


