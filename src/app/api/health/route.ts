import { NextResponse } from 'next/server'
import { testPrismaConnection } from '@/lib/prisma'

export async function GET() {
  try {
    // Vercel için sadece Prisma kontrolü
    const prismaConnected = await testPrismaConnection()
    
    const status = prismaConnected ? 'healthy' : 'unhealthy'
    const httpStatus = status === 'unhealthy' ? 503 : 200
    
    return NextResponse.json({
      status,
      timestamp: new Date().toISOString(),
      database: {
        prisma: {
          connected: prismaConnected
        }
      },
      message: status === 'healthy' 
        ? 'All systems operational' 
        : 'Database connectivity issues detected'
    }, { 
      status: httpStatus,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    )
  }
}
