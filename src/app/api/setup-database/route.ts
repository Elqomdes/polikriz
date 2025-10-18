import { NextResponse } from "next/server";
import { getCollection, getDb } from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST() {
	try {
		const db = await getDb("policrisis");
		const results = [];

		// 1. Create collections and indexes
		console.log("Creating collections and indexes...");

		// Users collection
		const users = await getCollection("users");
		await users.createIndex({ email: 1 }, { unique: true, name: "uniq_email" });
		await users.createIndex({ username: 1 }, { unique: true, name: "uniq_username" });
		await users.createIndex({ status: 1, createdAt: 1 }, { name: "status_createdAt" });
		await users.createIndex({ role: 1 }, { name: "role_index" });
		results.push("Users collection indexes created");

		// Dictionaries collection
		const dictionaries = await getCollection("dictionaries");
		await dictionaries.createIndex({ key: 1 }, { unique: true, name: "uniq_key" });
		await dictionaries.createIndex({ category: 1 }, { name: "category_index" });
		results.push("Dictionaries collection indexes created");

		// Crises collection
		const crises = await getCollection("crises");
		await crises.createIndex({ key: 1 }, { unique: true, name: "uniq_crisis_key" });
		await crises.createIndex({ category: 1 }, { name: "crisis_category_index" });
		results.push("Crises collection indexes created");

		// Scenarios collection
		const scenarios = await getCollection("scenarios");
		await scenarios.createIndex({ createdAt: 1 }, { name: "createdAt_index" });
		await scenarios.createIndex({ status: 1 }, { name: "status_index" });
		await scenarios.createIndex({ userId: 1 }, { name: "userId_index" });
		await scenarios.createIndex({ name: "text" }, { name: "name_text_index" });
		results.push("Scenarios collection indexes created");

		// Countries collection
		const countries = await getCollection("countries");
		await countries.createIndex({ iso: 1 }, { unique: true, name: "uniq_iso" });
		await countries.createIndex({ name: "text" }, { name: "name_text_index" });
		await countries.createIndex({ region: 1 }, { name: "region_index" });
		results.push("Countries collection indexes created");

		// 2. Seed dictionaries data
		console.log("Seeding dictionaries...");
		const dictionaryData = [
			{ key: "inflation", name: "Enflasyon", unit: "%", desc: "TÜFE yıllık enflasyon", category: "economic" },
			{ key: "unemployment", name: "İşsizlik", unit: "%", desc: "İşsizlik oranı", category: "economic" },
			{ key: "cds", name: "CDS", unit: "bps", desc: "Kredi temerrüt takası", category: "financial" },
			{ key: "fx_vol", name: "Döviz Oynaklığı", unit: "%", desc: "Kur volatilitesi", category: "financial" },
			{ key: "elec_price", name: "Elektrik Fiyatı", unit: "$/MWh", desc: "Spot elektrik fiyatı", category: "energy" },
			{ key: "inst_trust", name: "Kurum Güveni", unit: "endeks", desc: "Kurumsal güven endeksi", category: "social" },
			{ key: "social_sent", name: "Sosyal Medya Duygu", unit: "endeks", desc: "Duygu skoru", category: "social" },
			{ key: "trade_def", name: "Ticaret Açığı", unit: "$, mln", desc: "Dış ticaret dengesi", category: "economic" },
			{ key: "reserves_cov", name: "Rezerv Kapsamı", unit: "ay", desc: "İthalat karşılama", category: "economic" },
			{ key: "energy_imp", name: "Enerji İthalat Bağımlılığı", unit: "%", desc: "Enerji ithalat payı", category: "energy" },
			{ key: "gdp_growth", name: "GSYİH Büyümesi", unit: "%", desc: "Yıllık GSYİH büyüme oranı", category: "economic" },
			{ key: "debt_gdp", name: "Borç/GSYİH", unit: "%", desc: "Toplam borç/GSYİH oranı", category: "economic" },
			{ key: "corruption", name: "Yolsuzluk Endeksi", unit: "puan", desc: "Yolsuzluk algısı endeksi", category: "governance" },
			{ key: "democracy", name: "Demokrasi Endeksi", unit: "puan", desc: "Demokrasi seviyesi", category: "governance" },
			{ key: "cyber_risk", name: "Siber Risk", unit: "puan", desc: "Siber güvenlik risk seviyesi", category: "security" }
		];

		await dictionaries.deleteMany({});
		await dictionaries.insertMany(dictionaryData);
		results.push(`Dictionaries seeded: ${dictionaryData.length} items`);

		// 3. Seed crises data
		console.log("Seeding crises...");
		const crisisData = [
			{ key: "financial", name: "Finansal Kriz", category: "economic", severity: "high" },
			{ key: "natural", name: "Doğal Afet", category: "environmental", severity: "high" },
			{ key: "health", name: "Sağlık Krizi", category: "health", severity: "high" },
			{ key: "cyber", name: "Siber Saldırı", category: "security", severity: "medium" },
			{ key: "misinfo", name: "Dezenformasyon", category: "social", severity: "medium" },
			{ key: "geopol", name: "Jeopolitik Gerginlik", category: "political", severity: "high" },
			{ key: "energy", name: "Enerji Krizi", category: "energy", severity: "high" },
			{ key: "migration", name: "Göç Krizi", category: "social", severity: "medium" },
			{ key: "trade", name: "Ticaret Savaşı", category: "economic", severity: "medium" },
			{ key: "climate", name: "İklim Krizi", category: "environmental", severity: "high" }
		];

		await crises.deleteMany({});
		await crises.insertMany(crisisData);
		results.push(`Crises seeded: ${crisisData.length} items`);

		// 4. Seed countries data
		console.log("Seeding countries...");
		const countryData = [
			{ iso: "TUR", name: "Türkiye", region: "Europe", population: 84000000, gdp: 819000000000 },
			{ iso: "USA", name: "Amerika Birleşik Devletleri", region: "North America", population: 331000000, gdp: 22900000000000 },
			{ iso: "DEU", name: "Almanya", region: "Europe", population: 83000000, gdp: 4220000000000 },
			{ iso: "FRA", name: "Fransa", region: "Europe", population: 67000000, gdp: 2930000000000 },
			{ iso: "CHN", name: "Çin", region: "Asia", population: 1400000000, gdp: 17700000000000 },
			{ iso: "GBR", name: "Birleşik Krallık", region: "Europe", population: 67000000, gdp: 3180000000000 },
			{ iso: "RUS", name: "Rusya", region: "Europe", population: 146000000, gdp: 1830000000000 },
			{ iso: "IND", name: "Hindistan", region: "Asia", population: 1380000000, gdp: 3170000000000 },
			{ iso: "BRA", name: "Brezilya", region: "South America", population: 213000000, gdp: 1610000000000 },
			{ iso: "JPN", name: "Japonya", region: "Asia", population: 125000000, gdp: 4930000000000 }
		];

		await countries.deleteMany({});
		await countries.insertMany(countryData);
		results.push(`Countries seeded: ${countryData.length} items`);

		// 5. Create/Update admin user
		console.log("Setting up admin user...");
		const existingAdmin = await users.findOne({ role: "admin" });
		const hashedPassword = await bcrypt.hash("emre4249", 12);
		
		const adminData = {
			name: "Admin",
			username: "mey4249",
			email: "admin@polikriz.com",
			password: hashedPassword,
			role: "admin",
			status: "approved",
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		if (existingAdmin) {
			// Update existing admin
			await users.updateOne(
				{ role: "admin" },
				{ 
					$set: {
						username: "mey4249",
						password: hashedPassword,
						updatedAt: new Date()
					}
				}
			);
			results.push("Admin user updated with new credentials");
		} else {
			// Create new admin
			await users.insertOne(adminData);
			results.push("Admin user created");
		}

		// 6. Create sample scenarios
		console.log("Creating sample scenarios...");
		const sampleScenarios = [
			{
				name: "Türkiye Ekonomik Kriz Senaryosu",
				description: "Enflasyon ve döviz kuru volatilitesi analizi",
				parameters: {
					inflation: 0.65,
					unemployment: 0.12,
					cds: 0.45,
					fx_vol: 0.35
				},
				status: "draft",
				userId: existingAdmin?._id || "admin",
				createdAt: new Date(),
				updatedAt: new Date()
			},
			{
				name: "Küresel Enerji Krizi",
				description: "Enerji fiyatları ve tedarik zinciri analizi",
				parameters: {
					elec_price: 0.8,
					energy_imp: 0.6,
					inst_trust: 0.3,
					social_sent: 0.4
				},
				status: "published",
				userId: existingAdmin?._id || "admin",
				createdAt: new Date(),
				updatedAt: new Date()
			}
		];

		await scenarios.deleteMany({});
		await scenarios.insertMany(sampleScenarios);
		results.push(`Sample scenarios created: ${sampleScenarios.length} items`);

		return NextResponse.json({ 
			ok: true, 
			message: "Database setup completed successfully",
			results: results,
			collections: {
				users: await users.countDocuments(),
				dictionaries: await dictionaries.countDocuments(),
				crises: await crises.countDocuments(),
				scenarios: await scenarios.countDocuments(),
				countries: await countries.countDocuments()
			}
		});

	} catch (error: unknown) {
		console.error("Database setup error:", error);
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
