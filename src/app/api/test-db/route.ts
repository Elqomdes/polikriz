import { NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    // Test MongoDB connection
    const db = await getDatabase()
    
    // Test basic operations
    const testCollection = db.collection('test')
    
    // Insert a test document
    const testDoc = {
      message: 'MongoDB connection test',
      timestamp: new Date(),
      status: 'success'
    }
    
    const insertResult = await testCollection.insertOne(testDoc)
    
    // Read the document back
    const findResult = await testCollection.findOne({ _id: insertResult.insertedId })
    
    // Clean up
    await testCollection.deleteOne({ _id: insertResult.insertedId })
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB bağlantısı başarılı!',
      data: {
        connection: 'OK',
        insert: insertResult.insertedId ? 'OK' : 'FAILED',
        read: findResult ? 'OK' : 'FAILED',
        cleanup: 'OK'
      }
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'MongoDB bağlantı hatası',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
