import { NextResponse } from 'next/server'
import { getDatabase, testConnection as testMongoConnection } from '@/lib/mongodb'
import { testPrismaConnection } from '@/lib/prisma'

export async function GET() {
  const results = {
    mongodb: { status: 'FAILED', details: '' },
    prisma: { status: 'FAILED', details: '' },
    overall: 'FAILED'
  }

  try {
    // Test MongoDB connection
    try {
      const mongoConnected = await testMongoConnection()
      if (mongoConnected) {
        const db = await getDatabase()
        const testCollection = db.collection('test')
        
        // Insert a test document
        const testDoc = {
          message: 'MongoDB connection test',
          timestamp: new Date(),
          status: 'success'
        }
        
        const insertResult = await testCollection.insertOne(testDoc)
        const findResult = await testCollection.findOne({ _id: insertResult.insertedId })
        await testCollection.deleteOne({ _id: insertResult.insertedId })
        
        results.mongodb = {
          status: 'OK',
          details: 'MongoDB bağlantısı ve CRUD işlemleri başarılı'
        }
      }
    } catch (mongoError) {
      results.mongodb = {
        status: 'FAILED',
        details: mongoError instanceof Error ? mongoError.message : 'MongoDB bağlantı hatası'
      }
    }

    // Test Prisma connection
    try {
      const prismaConnected = await testPrismaConnection()
      if (prismaConnected) {
        results.prisma = {
          status: 'OK',
          details: 'Prisma bağlantısı başarılı'
        }
      }
    } catch (prismaError) {
      results.prisma = {
        status: 'FAILED',
        details: prismaError instanceof Error ? prismaError.message : 'Prisma bağlantı hatası'
      }
    }

    // Determine overall status
    const hasWorkingConnection = results.mongodb.status === 'OK' || results.prisma.status === 'OK'
    results.overall = hasWorkingConnection ? 'OK' : 'FAILED'

    return NextResponse.json({
      success: hasWorkingConnection,
      message: hasWorkingConnection ? 'En az bir veritabanı bağlantısı başarılı!' : 'Tüm veritabanı bağlantıları başarısız!',
      data: results,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Veritabanı test hatası',
        details: error instanceof Error ? error.message : 'Unknown error',
        data: results
      },
      { status: 500 }
    )
  }
}

