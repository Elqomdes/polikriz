import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

type ScenarioDoc = {
  status: "preparing" | "running" | "completed" | string;
  createdAt: Date;
  updatedAt: Date;
  result?: { summary: string };
} & Record<string, unknown>;

// Create scenario (mock enqueue)
export async function POST(request: Request) {
  const body = await request.json();
  const db = await getDb("policrisis");
  const now = new Date();
  const doc: ScenarioDoc = {
    ...body,
    status: "preparing",
    createdAt: now,
    updatedAt: now,
  };
  const { insertedId } = await db.collection<ScenarioDoc>("scenarios").insertOne(doc);
  // Simulate background progression
  queueMicrotask(async () => {
    try {
      await db.collection<ScenarioDoc>("scenarios").updateOne({ _id: insertedId }, { $set: { status: "running", updatedAt: new Date() } });
      setTimeout(async () => {
        await db.collection<ScenarioDoc>("scenarios").updateOne({ _id: insertedId }, { $set: { status: "completed", result: { summary: "Örnek TL;DR: iş birliği eşiği ~%12 iyileşti." }, updatedAt: new Date() } });
      }, 1500);
    } catch {}
  });
  return NextResponse.json({ id: String(insertedId) }, { status: 201 });
}


