import Link from "next/link";
export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <section className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight mb-1">Bugünün Polikriz Isısı</h1>
        <p className="text-sm text-black/60 dark:text-white/60">Dünya haritası/ısı haritası (örnek). Veri aralığı: Son 12 ay.</p>
        <div className="mt-4 aspect-[16/9] w-full rounded-lg border border-black/10 dark:border-white/10 bg-black/[.03] dark:bg-white/[.03]" aria-label="Dünya haritası için yer tutucu" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-3">Bu hafta öne çıkan kriz kümeleri</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h3 className="font-medium">Finansal + Jeopolitik</h3>
            <p className="text-sm text-black/60 dark:text-white/60">CDS ve kur oynaklığı eşik üstü.</p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h3 className="font-medium">Enerji + Dezenformasyon</h3>
            <p className="text-sm text-black/60 dark:text-white/60">Fiyat ve duygu skoru bozuluyor.</p>
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h3 className="font-medium">Sağlık + Siber</h3>
            <p className="text-sm text-black/60 dark:text-white/60">Operasyonel kesintiler.</p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold tracking-tight mb-3">Model Galerisi</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            "Prisoner's Dilemma",
            "Tavuk (Brinkmanship)",
            "Stag Hunt",
            "Blotto",
            "Bayesçi/Global",
            "Evrimsel",
          ].map((m) => (
            <div key={m} className="rounded-lg border border-black/10 dark:border-white/10 p-4">
              <h3 className="font-medium">{m}</h3>
              <p className="text-sm text-black/60 dark:text-white/60">Kısa açıklama ve örnek.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-4">
        <Link href="/scenarios/new" className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90">Hemen Deneyin → Senaryo Sihirbazı</Link>
      </section>
    </div>
  );
}
