import Link from "next/link";
type Props = { params: Promise<{ iso: string }> };

export default async function CountryDetailPage({ params }: Props) {
  const { iso } = await params;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">{iso} ülke profili</h1>
        <Link href="/countries" className="text-sm hover:underline">← Tüm ülkeler</Link>
      </div>
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="lg:col-span-1">
          <nav aria-label="Sekmeler" className="space-y-2 text-sm">
            {[
              "Ekonomi",
              "Enerji",
              "Sosyal",
              "Jeopolitik",
            ].map((tab) => (
              <button key={tab} className="w-full text-left rounded-md border border-black/10 dark:border-white/10 px-3 py-2 hover:bg-black/[.03] dark:hover:bg-white/[.03]">{tab}</button>
            ))}
            <button className="w-full text-left rounded-md border border-black/10 dark:border-white/10 px-3 py-2">Karşılaştır</button>
          </nav>
        </aside>
        <section className="lg:col-span-3 space-y-6">
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h2 className="font-medium">Zaman serileri</h2>
            <div className="mt-3 aspect-[16/9] w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" aria-label="Zaman serisi grafiği için yer tutucu" />
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h2 className="font-medium">Kriz zaman çizelgesi</h2>
            <div className="mt-3 h-24 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" aria-label="Zaman çizelgesi için yer tutucu" />
          </div>
          <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h2 className="font-medium">Karşılaştır</h2>
            <div className="mt-2 text-sm text-black/60 dark:text-white/60">En fazla 3 ülke seçin:</div>
            <div className="mt-2 flex flex-wrap gap-2 text-sm">
              { ["USA","DEU","FRA","GBR","CHN"].map(c => (
                <button key={c} className="px-2 py-1 rounded border border-black/10 dark:border-white/10">{c}</button>
              )) }
            </div>
            <div className="mt-3 h-40 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" aria-label="Karşılaştırma grafiği için yer tutucu" />
            <div className="mt-2 text-xs text-amber-600">Veri eksikse sarı uyarı bandı görünür.</div>
          </div>
        </section>
      </div>
    </div>
  );
}


