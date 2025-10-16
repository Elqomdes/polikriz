import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST() {
	try {
		const session = await getServerSession(authOptions);
		if (!session || session.user.role !== "admin") {
			return NextResponse.json({ error: "Yetkisiz erişim" }, { status: 401 });
		}

		// Users collection indexes
		const users = await getCollection("users");
		await users.createIndex({ email: 1 }, { unique: true, name: "uniq_email" });
		await users.createIndex({ status: 1, createdAt: 1 }, { name: "status_createdAt" });

		return NextResponse.json({ ok: true, message: "Indexes created/verified" });
	} catch (error: unknown) {
		const message = error instanceof Error ? error.message : "Unknown error";
		return NextResponse.json({ ok: false, error: message }, { status: 500 });
	}
}
