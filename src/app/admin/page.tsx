export default function AdminPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Yönetim</h1>
      <p className="text-sm text-black/60 dark:text-white/60 mb-6">Sözlükler, kriz türleri, model açıklamaları, örnek senaryolar, uyarı kuralları.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {["Gösterge Sözlüğü", "Kriz Türleri", "Model Açıklamaları", "Örnek Senaryolar", "Uyarı Kuralları"].map((name) => (
          <a key={name} href="#" className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.03]">
            <h2 className="font-medium">{name}</h2>
            <p className="text-sm text-black/60 dark:text-white/60">Düzenle</p>
          </a>
        ))}
      </div>
      <div className="mt-6">
        <form action="/api/seed" method="post">
          <button className="rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm">Başlangıç İçeriklerini Yükle</button>
        </form>
      </div>
    </div>
  );
}


