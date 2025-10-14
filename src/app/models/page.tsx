export default function ModelsPage() {
  const models = [
    { key: "pd", name: "Prisoner's Dilemma", desc: "Kısa vadede ihanet cazip; güven oluşursa toplam refah artar." },
    { key: "chicken", name: "Tavuk (Brinkmanship)", desc: "Geri adım atmayan iki taraf en kötüye gider." },
    { key: "stag", name: "Stag Hunt", desc: "Güven varsa en iyi; yoksa düşük güvenli denge." },
    { key: "blotto", name: "Blotto", desc: "Çok cephede bütçe paylaşımı." },
    { key: "bayes", name: "Bayesçi/Global", desc: "Eksik bilgi/sinyaller; eşik aşıldığında rejim değişimi." },
    { key: "evo", name: "Evrimsel", desc: "Strateji payları zamanla evrilir." },
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Model Galerisi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {models.map((m) => (
          <div key={m.key} className="rounded-lg border border-black/10 dark:border-white/10 p-4">
            <h2 className="font-medium">{m.name}</h2>
            <p className="text-sm text-black/60 dark:text-white/60">{m.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


