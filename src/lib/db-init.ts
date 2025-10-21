import { testConnection as testMongoConnection } from './mongodb'
import { testPrismaConnection } from './prisma'

export interface DatabaseStatus {
  mongodb: {
    connected: boolean
    error?: string
  }
  prisma: {
    connected: boolean
    error?: string
  }
  overall: 'healthy' | 'degraded' | 'unhealthy'
}

export async function checkDatabaseStatus(): Promise<DatabaseStatus> {
  const status: DatabaseStatus = {
    mongodb: { connected: false },
    prisma: { connected: false },
    overall: 'unhealthy'
  }

  // Test MongoDB connection
  try {
    const mongoConnected = await testMongoConnection()
    status.mongodb.connected = mongoConnected
  } catch (error) {
    status.mongodb.error = error instanceof Error ? error.message : 'Unknown MongoDB error'
  }

  // Test Prisma connection
  try {
    const prismaConnected = await testPrismaConnection()
    status.prisma.connected = prismaConnected
  } catch (error) {
    status.prisma.error = error instanceof Error ? error.message : 'Unknown Prisma error'
  }

  // Determine overall status
  const connectedCount = [status.mongodb.connected, status.prisma.connected].filter(Boolean).length
  
  if (connectedCount === 2) {
    status.overall = 'healthy'
  } else if (connectedCount === 1) {
    status.overall = 'degraded'
  } else {
    status.overall = 'unhealthy'
  }

  return status
}

export async function initializeDatabases(): Promise<{
  success: boolean
  message: string
  status: DatabaseStatus
}> {
  const status = await checkDatabaseStatus()
  
  if (status.overall === 'unhealthy') {
    return {
      success: false,
      message: 'No database connections available',
      status
    }
  }

  if (status.overall === 'healthy') {
    return {
      success: true,
      message: 'All database connections healthy',
      status
    }
  }

  return {
    success: true,
    message: 'Partial database connectivity - some features may be limited',
    status
  }
}
