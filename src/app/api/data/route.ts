import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { prisma } from '@/lib/prisma'

// Mock data - gerçek uygulamada veritabanından gelecek
const dataPoints = [
  // Türkiye GDP Growth
  { id: '1', countryId: '1', indicatorId: '1', year: 2020, value: 1.8, quarter: null, month: null, quality: 'high' },
  { id: '2', countryId: '1', indicatorId: '1', year: 2021, value: 11.4, quarter: null, month: null, quality: 'high' },
  { id: '3', countryId: '1', indicatorId: '1', year: 2022, value: 5.6, quarter: null, month: null, quality: 'high' },
  { id: '4', countryId: '1', indicatorId: '1', year: 2023, value: 4.5, quarter: null, month: null, quality: 'high' },
  
  // ABD GDP Growth
  { id: '5', countryId: '2', indicatorId: '1', year: 2020, value: -3.4, quarter: null, month: null, quality: 'high' },
  { id: '6', countryId: '2', indicatorId: '1', year: 2021, value: 5.9, quarter: null, month: null, quality: 'high' },
  { id: '7', countryId: '2', indicatorId: '1', year: 2022, value: 2.1, quarter: null, month: null, quality: 'high' },
  { id: '8', countryId: '2', indicatorId: '1', year: 2023, value: 2.5, quarter: null, month: null, quality: 'high' },
  
  // Almanya GDP Growth
  { id: '9', countryId: '3', indicatorId: '1', year: 2020, value: -4.6, quarter: null, month: null, quality: 'high' },
  { id: '10', countryId: '3', indicatorId: '1', year: 2021, value: 2.9, quarter: null, month: null, quality: 'high' },
  { id: '11', countryId: '3', indicatorId: '1', year: 2022, value: 1.8, quarter: null, month: null, quality: 'high' },
  { id: '12', countryId: '3', indicatorId: '1', year: 2023, value: -0.3, quarter: null, month: null, quality: 'high' },
  
  // Türkiye Inflation
  { id: '13', countryId: '1', indicatorId: '2', year: 2020, value: 12.3, quarter: null, month: null, quality: 'high' },
  { id: '14', countryId: '1', indicatorId: '2', year: 2021, value: 19.6, quarter: null, month: null, quality: 'high' },
  { id: '15', countryId: '1', indicatorId: '2', year: 2022, value: 64.8, quarter: null, month: null, quality: 'high' },
  { id: '16', countryId: '1', indicatorId: '2', year: 2023, value: 53.9, quarter: null, month: null, quality: 'high' },
  
  // ABD Inflation
  { id: '17', countryId: '2', indicatorId: '2', year: 2020, value: 1.2, quarter: null, month: null, quality: 'high' },
  { id: '18', countryId: '2', indicatorId: '2', year: 2021, value: 4.7, quarter: null, month: null, quality: 'high' },
  { id: '19', countryId: '2', indicatorId: '2', year: 2022, value: 8.0, quarter: null, month: null, quality: 'high' },
  { id: '20', countryId: '2', indicatorId: '2', year: 2023, value: 3.2, quarter: null, month: null, quality: 'high' },
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const countryIds = searchParams.get('countries')?.split(',')
    const indicatorIds = searchParams.get('indicators')?.split(',')
    const startYear = searchParams.get('startYear')
    const endYear = searchParams.get('endYear')
    const format = searchParams.get('format') || 'json'

    try {
      // Try MongoDB first
      try {
        const db = await getDatabase()
        const dataPointsCollection = db.collection('data_points')
        
        const query: Record<string, unknown> = {}
        
        // Country filter
        if (countryIds && countryIds.length > 0) {
          query.countryId = { $in: countryIds }
        }
        
        // Indicator filter
        if (indicatorIds && indicatorIds.length > 0) {
          query.indicatorId = { $in: indicatorIds }
        }
        
        // Year range filter
        if (startYear || endYear) {
          query.year = {}
          if (startYear) {
            query.year.$gte = parseInt(startYear)
          }
          if (endYear) {
            query.year.$lte = parseInt(endYear)
          }
        }
        
        const dataPoints = await dataPointsCollection.find(query).toArray()
        
        // Format response
        if (format === 'csv') {
          const csvHeaders = 'Country,Indicator,Year,Value,Quality\n'
          const csvData = dataPoints.map(point => 
            `${point.countryId},${point.indicatorId},${point.year},${point.value},${point.quality}`
          ).join('\n')
          
          return new NextResponse(csvHeaders + csvData, {
            headers: {
              'Content-Type': 'text/csv',
              'Content-Disposition': 'attachment; filename="data.csv"'
            }
          })
        }

        return NextResponse.json({
          success: true,
          data: dataPoints,
          total: dataPoints.length,
          source: 'mongodb',
          filters: {
            countries: countryIds,
            indicators: indicatorIds,
            startYear: startYear ? parseInt(startYear) : null,
            endYear: endYear ? parseInt(endYear) : null
          }
        })
      } catch (mongoError) {
        console.error('MongoDB error:', mongoError)
        
        // Try Prisma as fallback
        try {
          const whereClause: any = {}
          
          if (countryIds && countryIds.length > 0) {
            whereClause.countryId = { in: countryIds }
          }
          
          if (indicatorIds && indicatorIds.length > 0) {
            whereClause.indicatorId = { in: indicatorIds }
          }
          
          if (startYear || endYear) {
            whereClause.year = {}
            if (startYear) {
              whereClause.year.gte = parseInt(startYear)
            }
            if (endYear) {
              whereClause.year.lte = parseInt(endYear)
            }
          }
          
          const dataPoints = await prisma.dataPoint.findMany({
            where: whereClause,
            orderBy: [{ year: 'desc' }, { countryId: 'asc' }]
          })
          
          // Format response
          if (format === 'csv') {
            const csvHeaders = 'Country,Indicator,Year,Value,Quality\n'
            const csvData = dataPoints.map(point => 
              `${point.countryId},${point.indicatorId},${point.year},${point.value},${point.quality}`
            ).join('\n')
            
            return new NextResponse(csvHeaders + csvData, {
              headers: {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename="data.csv"'
              }
            })
          }

          return NextResponse.json({
            success: true,
            data: dataPoints,
            total: dataPoints.length,
            source: 'prisma',
            filters: {
              countries: countryIds,
              indicators: indicatorIds,
              startYear: startYear ? parseInt(startYear) : null,
              endYear: endYear ? parseInt(endYear) : null
            }
          })
        } catch (prismaError) {
          console.error('Prisma error:', prismaError)
          throw new Error('Both database connections failed')
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Fallback to mock data
      let filteredData = dataPoints

      // Country filter
      if (countryIds && countryIds.length > 0) {
        filteredData = filteredData.filter(dataPoint => 
          countryIds.includes(dataPoint.countryId)
        )
      }

      // Indicator filter
      if (indicatorIds && indicatorIds.length > 0) {
        filteredData = filteredData.filter(dataPoint => 
          indicatorIds.includes(dataPoint.indicatorId)
        )
      }

      // Year range filter
      if (startYear) {
        filteredData = filteredData.filter(dataPoint => 
          dataPoint.year >= parseInt(startYear)
        )
      }
      if (endYear) {
        filteredData = filteredData.filter(dataPoint => 
          dataPoint.year <= parseInt(endYear)
        )
      }

      // Format response
      if (format === 'csv') {
        const csvHeaders = 'Country,Indicator,Year,Value,Quality\n'
        const csvData = filteredData.map(point => 
          `${point.countryId},${point.indicatorId},${point.year},${point.value},${point.quality}`
        ).join('\n')
        
        return new NextResponse(csvHeaders + csvData, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': 'attachment; filename="data.csv"'
          }
        })
      }

      return NextResponse.json({
        success: true,
        data: filteredData,
        total: filteredData.length,
        source: 'mock',
        filters: {
          countries: countryIds,
          indicators: indicatorIds,
          startYear: startYear ? parseInt(startYear) : null,
          endYear: endYear ? parseInt(endYear) : null
        }
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Veri getirilemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.countryId || !body.indicatorId || !body.year || body.value === undefined) {
      return NextResponse.json(
        { success: false, error: 'Ülke, gösterge, yıl ve değer gerekli' },
        { status: 400 }
      )
    }

    // Check if data point already exists
    const existingDataPoint = dataPoints.find(dp => 
      dp.countryId === body.countryId && 
      dp.indicatorId === body.indicatorId && 
      dp.year === body.year &&
      dp.quarter === (body.quarter || null) &&
      dp.month === (body.month || null)
    )

    if (existingDataPoint) {
      return NextResponse.json(
        { success: false, error: 'Bu veri noktası zaten mevcut' },
        { status: 409 }
      )
    }

    // Create new data point
    const newDataPoint = {
      id: (dataPoints.length + 1).toString(),
      countryId: body.countryId,
      indicatorId: body.indicatorId,
      year: body.year,
      value: body.value,
      quarter: body.quarter || null,
      month: body.month || null,
      quality: body.quality || 'medium',
      metadata: body.metadata || null
    }

    dataPoints.push(newDataPoint)

    return NextResponse.json({
      success: true,
      data: newDataPoint,
      message: 'Veri noktası başarıyla eklendi'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Veri noktası eklenemedi' },
      { status: 500 }
    )
  }
}

