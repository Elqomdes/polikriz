import Link from "next/link";
import FigureFrame from "@/components/FigureFrame";

type Props = { params: Promise<{ id: string }> };

export default async function ScenarioDetailPage({ params }: Props) {
  const { id } = await params;
  // Server component: fetch scenario
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/scenarios/${id}`, { cache: "no-store" });
  const scenario: { status?: string } = res.ok ? await res.json() : { status: "error" };
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Senaryo: {id}</h1>
        <Link href="/scenarios/new" className="text-sm hover:underline">← Yeni senaryo</Link>
      </div>
      <div className="mt-4 rounded-md border border-black/10 dark:border-white/10 p-3 text-sm">
        Durum: {scenario.status ?? "bilinmiyor"}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6">
        <FigureFrame title="Denge Haritası" subtitle="Model: örnek" fileBaseName={`senaryo-${id}-denge`}> 
          <div className="aspect-[16/9] w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" />
        </FigureFrame>
        <FigureFrame title="Strateji Yolu" subtitle="Son 24 dönem" fileBaseName={`senaryo-${id}-strateji`}>
          <div className="h-48 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" />
        </FigureFrame>
        <FigureFrame title="Ülke Kıyas" subtitle="Aynı ölçek" fileBaseName={`senaryo-${id}-kıyas`}>
          <div className="h-48 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" />
        </FigureFrame>
        <FigureFrame title="Hassasiyet" subtitle="Tornado" fileBaseName={`senaryo-${id}-hassasiyet`}>
          <div className="h-48 w-full rounded-md bg-black/[.03] dark:bg-white/[.03]" />
        </FigureFrame>
      </div>
    </div>
  );
}


