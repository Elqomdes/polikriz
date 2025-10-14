export default function CountriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Ülkeler</h1>
      <div className="mb-4">
        <input aria-label="Ülke ara" placeholder="Ülke ara veya filtrele" className="w-full sm:w-96 rounded-md border border-black/10 dark:border-white/10 px-3 py-2 bg-white dark:bg-black" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {["TUR", "USA", "DEU", "FRA", "GBR", "CHN"].map((iso) => (
          <a key={iso} href={`/countries/${iso}`} className="rounded-lg border border-black/10 dark:border-white/10 p-4 hover:bg-black/[.03] dark:hover:bg-white/[.03]">
            <h2 className="font-medium">{iso}</h2>
            <p className="text-sm text-black/60 dark:text-white/60">Mini metrikler ve son durum.</p>
          </a>
        ))}
      </div>
    </div>
  );
}


