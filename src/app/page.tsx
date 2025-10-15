"use client";
import Link from "next/link";
import WorldHeatmap from "@/components/WorldHeatmap";

export default function Home() {
  const handleCountryClick = (countryName: string, iso3?: string) => {
    if (iso3) {
      window.location.href = `/countries/${iso3}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-2">
            Polikriz Isı Haritası
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Küresel risk analizi ve kriz yönetimi platformu
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-sm text-blue-700 dark:text-blue-300">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Canlı veri - Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
          </div>
        </div>

        {/* Main Map Section */}
        <section className="mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Dünya Haritası
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Ülkelerin üzerine gelerek detayları görüntüleyin ve tıklayarak analiz sayfasına gidin
              </p>
            </div>
            <div className="relative">
              <WorldHeatmap
                scores={{ 
                  TUR: 0.6, USA: 0.3, DEU: 0.4, FRA: 0.35, CHN: 0.7, GBR: 0.5, RUS: 0.8, 
                  IND: 0.4, BRA: 0.3, JPN: 0.2, CAN: 0.25, AUS: 0.3, ITA: 0.45, ESP: 0.4,
                  MEX: 0.5, ARG: 0.6, ZAF: 0.4, EGY: 0.7, NGA: 0.6, KEN: 0.5, MAR: 0.4,
                  SAU: 0.3, IRN: 0.8, IRQ: 0.9, SYR: 0.95, LBY: 0.85, UKR: 0.9, POL: 0.4,
                  CZE: 0.3, HUN: 0.5, ROU: 0.4, BGR: 0.4, GRC: 0.5, ISR: 0.7,
                  PSE: 0.9, JOR: 0.6, LBN: 0.8, KWT: 0.3, ARE: 0.2, QAT: 0.25, BHR: 0.3,
                  OMN: 0.3, YEM: 0.9, AFG: 0.95, PAK: 0.7, BGD: 0.5, LKA: 0.6, MMR: 0.8,
                  THA: 0.4, VNM: 0.3, IDN: 0.4, MYS: 0.3, SGP: 0.2, PHL: 0.5, KOR: 0.3,
                  PRK: 0.95, MNG: 0.4, KAZ: 0.3, UZB: 0.4, KGZ: 0.5, TJK: 0.6, TKM: 0.4,
                  AZE: 0.5, ARM: 0.6, GEO: 0.5, MDA: 0.6, BLR: 0.7, LTU: 0.3, LVA: 0.3,
                  EST: 0.3, FIN: 0.2, SWE: 0.2, NOR: 0.2, DNK: 0.2, ISL: 0.2, IRL: 0.3,
                  NLD: 0.3, BEL: 0.3, LUX: 0.2, CHE: 0.2, AUT: 0.3, SVK: 0.3, SVN: 0.3,
                  HRV: 0.4, BIH: 0.6, SRB: 0.5, MNE: 0.4, MKD: 0.5, ALB: 0.5, KOS: 0.6
                }}
              />
            </div>
          </div>
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
    </div>
  );
}
