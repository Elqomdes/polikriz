import { NextResponse } from "next/server";
import { getCollection } from "@/lib/mongodb";

export async function GET() {
  const col = await getCollection("dictionaries");
  const docs = await col.find({}, { projection: { _id: 0 } }).toArray();
  return NextResponse.json(docs);
}


