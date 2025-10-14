"use client";
import { useState } from "react";
import ParameterEditor from "@/components/ParameterEditor";

export default function ScenarioWizardPage() {
  const [countries, setCountries] = useState<string[]>([]);
  const [crisis, setCrisis] = useState<string>("");
  const [dateStart, setDateStart] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<string>("");
  const [model, setModel] = useState<string>("");
  const [formula, setFormula] = useState<string>("0.4*z(CDS) + 0.6*z(İşsizlik) - 0.2*z(KurumGüveni)");
  const indicatorList = ["Enflasyon","İşsizlik","CDS","Döviz","Elektrik","KurumGüveni","SosyalDuygu","TicaretAçığı","Rezerv","Enerjiİthalatı"];
  const [error, setError] = useState<string>("");

  async function onRun() {
    setError("");
    if (!countries.length) return setError("En az bir ülke seçiniz.");
    if (!crisis) return setError("Bir kriz türü seçiniz.");
    if (!model) return setError("Bir oyun modeli seçiniz.");
    if (!dateStart || !dateEnd) return setError("Tarih aralığı seçiniz.");
    try {
      const res = await fetch("/api/scenarios", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ countries, crisis, dateStart, dateEnd, model, formula }) });
      const { id } = await res.json();
      window.location.href = `/scenarios/${id}`;
    } catch {
      setError("Çalıştırma başlatılamadı. Lütfen tekrar deneyin.");
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight mb-6">Senaryo Sihirbazı</h1>
      <ol className="list-decimal list-inside text-sm text-black/60 dark:text-white/60 mb-6">
        <li>Ülke/ülke grubu seçimi</li>
        <li>Kriz kapsamı (tür ve tarih aralığı)</li>
        <li>Oyun modeli seçimi</li>
        <li>Parametre Bağlama Editörü → Çalıştır</li>
      </ol>
      <div className="space-y-4">
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium">Adım 1: Ülkeler</h2>
          <div className="text-sm text-black/60 dark:text-white/60">Çoklu seçim:</div>
          <div className="mt-2 flex flex-wrap gap-2 text-sm">
            {["TUR","USA","DEU","FRA"].map(c => (
              <button key={c} className={`px-2 py-1 rounded border ${countries.includes(c)?"bg-black text-white dark:bg-white dark:text-black":"border-black/10 dark:border-white/10"}`} onClick={() => setCountries(prev => prev.includes(c)? prev.filter(x=>x!==c): [...prev,c])}>{c}</button>
            ))}
          </div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium">Adım 2: Kriz kapsamı</h2>
          <div className="mt-2 flex flex-col gap-2 text-sm">
            <select className="rounded border border-black/10 dark:border-white/10 px-2 py-1" value={crisis} onChange={(e)=>setCrisis(e.target.value)}>
              <option value="">Seçiniz</option>
              <option value="financial">Finansal</option>
              <option value="natural">Doğal Afet</option>
              <option value="health">Sağlık</option>
              <option value="cyber">Siber</option>
              <option value="misinfo">Dezenformasyon</option>
              <option value="geopol">Jeopolitik Gerginlik</option>
            </select>
            <div className="flex items-center gap-2">
              <input type="date" className="rounded border border-black/10 dark:border-white/10 px-2 py-1" value={dateStart} onChange={(e)=>setDateStart(e.target.value)} />
              <span>–</span>
              <input type="date" className="rounded border border-black/10 dark:border-white/10 px-2 py-1" value={dateEnd} onChange={(e)=>setDateEnd(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium">Adım 3: Oyun modeli</h2>
          <select className="mt-2 rounded border border-black/10 dark:border-white/10 px-2 py-1 text-sm" value={model} onChange={(e)=>setModel(e.target.value)}>
            <option value="">Seçiniz</option>
            <option value="pd">Prisoner&apos;s Dilemma</option>
            <option value="chicken">Tavuk (Brinkmanship)</option>
            <option value="stag">Stag Hunt</option>
            <option value="blotto">Blotto</option>
            <option value="bayes">Bayesçi/Global</option>
            <option value="evo">Evrimsel</option>
          </select>
        </div>
        <div className="rounded-lg border border-black/10 dark:border-white/10 p-4">
          <h2 className="font-medium">Adım 4: Parametre Bağlama Editörü</h2>
          <ParameterEditor formula={formula} onChange={setFormula} indicators={indicatorList} />
          <div className="mt-2 text-xs text-black/60 dark:text-white/60">Destek: z, minmax, ma, lag, yoy, pct_change, clip</div>
        </div>
        {error && <div className="text-sm text-red-600" role="alert">{error}</div>}
        <div>
          <button onClick={onRun} className="inline-flex items-center justify-center rounded-md bg-black text-white dark:bg-white dark:text-black px-4 py-2 text-sm font-medium hover:opacity-90">Çalıştır</button>
        </div>
      </div>
    </div>
  );
}


