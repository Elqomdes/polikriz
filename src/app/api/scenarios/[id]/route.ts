import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// Get scenario status/result (mock progression)
export async function GET(_req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const db = await getDb("policrisis");
  const { id } = await context.params;
  const _id = new ObjectId(id);
  const scenario = await db.collection("scenarios").findOne({ _id });
  if (!scenario) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(scenario);
}


