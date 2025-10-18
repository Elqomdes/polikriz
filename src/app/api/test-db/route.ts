import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function GET() {
  try {
    // Test MongoDB connection
    const db = await getDb("policrisis");
    
    // Try to create a test collection and insert a document
    const testCollection = db.collection("test");
    const testDoc = {
      message: "Database connection test",
      timestamp: new Date(),
      status: "success"
    };
    
    await testCollection.insertOne(testDoc);
    
    // Count documents
    const count = await testCollection.countDocuments();
    
    return NextResponse.json({ 
      success: true, 
      message: "MongoDB connection successful",
      database: "policrisis",
      testCollectionCount: count,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      success: false, 
      error: message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
