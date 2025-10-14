import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST() {
  const db = await getDb("policrisis");
  const dictionaries = [
    { key: "inflation", name: "Enflasyon", unit: "%", desc: "TÜFE yıllık enflasyon" },
    { key: "unemployment", name: "İşsizlik", unit: "%", desc: "İşsizlik oranı" },
    { key: "cds", name: "CDS", unit: "bps", desc: "Kredi temerrüt takası" },
    { key: "fx_vol", name: "Döviz Oynaklığı", unit: "%", desc: "Kur volatilitesi" },
    { key: "elec_price", name: "Elektrik Fiyatı", unit: "$/MWh", desc: "Spot elektrik fiyatı" },
    { key: "inst_trust", name: "Kurum Güveni", unit: "endeks", desc: "Kurumsal güven endeksi" },
    { key: "social_sent", name: "Sosyal Medya Duygu", unit: "endeks", desc: "Duygu skoru" },
    { key: "trade_def", name: "Ticaret Açığı", unit: "$, mln", desc: "Dış ticaret dengesi" },
    { key: "reserves_cov", name: "Rezerv Kapsamı", unit: "ay", desc: "İthalat karşılama" },
    { key: "energy_imp", name: "Enerji İthalat Bağımlılığı", unit: "%", desc: "Enerji ithalat payı" },
  ];
  const crises = [
    { key: "financial", name: "Finansal" },
    { key: "natural", name: "Doğal Afet" },
    { key: "health", name: "Sağlık" },
    { key: "cyber", name: "Siber" },
    { key: "misinfo", name: "Dezenformasyon" },
    { key: "geopol", name: "Jeopolitik Gerginlik" },
  ];
  await db.collection("dictionaries").deleteMany({});
  await db.collection<{ key: string; name: string; unit: string; desc: string }>("dictionaries").insertMany(dictionaries);
  await db.collection("crises").deleteMany({});
  await db.collection<{ key: string; name: string }>("crises").insertMany(crises);
  await db.collection("scenarios").createIndex({ createdAt: 1 });
  await db.collection("scenarios").createIndex({ status: 1 });
  await db.collection("dictionaries").createIndex({ key: 1 }, { unique: true });
  await db.collection("crises").createIndex({ key: 1 }, { unique: true });
  return NextResponse.json({ ok: true, inserted: { dictionaries: dictionaries.length, crises: crises.length } });
}


