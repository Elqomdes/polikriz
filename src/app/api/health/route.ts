import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    const db = await getDb("admin");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    // ping with timeout via aggregate (driver respects serverSelectionTimeout too)
    const ping = await db.command({ ping: 1 });
    clearTimeout(timeout);
    return NextResponse.json({ ok: true, ping });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const isTimeout = /timeout|server selection/i.test(message);
    return NextResponse.json({ ok: false, error: message, hint: isTimeout ? "Atlas IP erişimi veya DNS engeli olabilir. Paroladaki özel karakterleri URL-encode edin (\"*\" → %2A)." : undefined }, { status: 500 });
  }
}


