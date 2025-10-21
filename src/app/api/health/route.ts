import { NextResponse } from 'next/server'
import { checkDatabaseStatus } from '@/lib/db-init'

export async function GET() {
  try {
    const status = await checkDatabaseStatus()
    
    const httpStatus = status.overall === 'unhealthy' ? 503 : 200
    
    return NextResponse.json({
      status: status.overall,
      timestamp: new Date().toISOString(),
      databases: {
        mongodb: {
          connected: status.mongodb.connected,
          error: status.mongodb.error
        },
        prisma: {
          connected: status.prisma.connected,
          error: status.prisma.error
        }
      },
      message: status.overall === 'healthy' 
        ? 'All systems operational' 
        : status.overall === 'degraded'
        ? 'Partial connectivity - some features may be limited'
        : 'Database connectivity issues detected'
    }, { status: httpStatus })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
