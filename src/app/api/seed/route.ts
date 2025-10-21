import { NextResponse } from 'next/server'
import { seedDatabase } from '@/lib/seed'

export async function POST() {
  try {
    const result = await seedDatabase()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database başarıyla seed edildi',
        data: result
      })
    } else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Seed işlemi başarısız',
          details: result.error
        },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Seed API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Seed API hatası',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
