import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'
import { prisma } from '@/lib/prisma'

// Mock data - gerçek uygulamada veritabanından gelecek
const indicators = [
  {
    id: '1',
    code: 'GDP_GROWTH',
    name: 'GSYİH Büyüme Oranı',
    nameEn: 'GDP Growth Rate',
    description: 'Yıllık GSYİH büyüme oranı (yüzde)',
    descriptionEn: 'Annual GDP growth rate (percentage)',
    unit: '%',
    unitEn: '%',
    source: 'Dünya Bankası',
    sourceEn: 'World Bank',
    coverage: 'Yıllık',
    coverageEn: 'Annual',
    transformation: 'Yüzde değişim',
    transformationEn: 'Percentage change',
    dataQuality: 'Yüksek',
    dataQualityEn: 'High',
    isActive: true,
    order: 1,
    categoryId: 'economy'
  },
  {
    id: '2',
    code: 'INFLATION',
    name: 'Enflasyon Oranı',
    nameEn: 'Inflation Rate',
    description: 'Tüketici fiyat endeksi yıllık değişim oranı',
    descriptionEn: 'Consumer price index annual change rate',
    unit: '%',
    unitEn: '%',
    source: 'IMF',
    sourceEn: 'IMF',
    coverage: 'Aylık',
    coverageEn: 'Monthly',
    transformation: 'Yüzde değişim',
    transformationEn: 'Percentage change',
    dataQuality: 'Yüksek',
    dataQualityEn: 'High',
    isActive: true,
    order: 2,
    categoryId: 'economy'
  },
  {
    id: '3',
    code: 'UNEMPLOYMENT',
    name: 'İşsizlik Oranı',
    nameEn: 'Unemployment Rate',
    description: 'İşgücü piyasasında işsizlik oranı',
    descriptionEn: 'Unemployment rate in labor market',
    unit: '%',
    unitEn: '%',
    source: 'ILO',
    sourceEn: 'ILO',
    coverage: 'Yıllık',
    coverageEn: 'Annual',
    transformation: 'Yüzde',
    transformationEn: 'Percentage',
    dataQuality: 'Orta',
    dataQualityEn: 'Medium',
    isActive: true,
    order: 3,
    categoryId: 'economy'
  },
  {
    id: '4',
    code: 'RENEWABLE_ENERGY',
    name: 'Yenilenebilir Enerji Payı',
    nameEn: 'Renewable Energy Share',
    description: 'Toplam enerji üretiminde yenilenebilir enerji payı',
    descriptionEn: 'Share of renewable energy in total energy production',
    unit: '%',
    unitEn: '%',
    source: 'IEA',
    sourceEn: 'IEA',
    coverage: 'Yıllık',
    coverageEn: 'Annual',
    transformation: 'Yüzde',
    transformationEn: 'Percentage',
    dataQuality: 'Yüksek',
    dataQualityEn: 'High',
    isActive: true,
    order: 4,
    categoryId: 'energy'
  },
  {
    id: '5',
    code: 'CO2_EMISSIONS',
    name: 'CO2 Emisyonu',
    nameEn: 'CO2 Emissions',
    description: 'Kişi başına CO2 emisyonu (metrik ton)',
    descriptionEn: 'CO2 emissions per capita (metric tons)',
    unit: 'mt/kişi',
    unitEn: 'mt/person',
    source: 'EDGAR',
    sourceEn: 'EDGAR',
    coverage: 'Yıllık',
    coverageEn: 'Annual',
    transformation: 'Logaritmik',
    transformationEn: 'Logarithmic',
    dataQuality: 'Yüksek',
    dataQualityEn: 'High',
    isActive: true,
    order: 5,
    categoryId: 'environment'
  },
  {
    id: '6',
    code: 'LIFE_EXPECTANCY',
    name: 'Yaşam Beklentisi',
    nameEn: 'Life Expectancy',
    description: 'Doğumda beklenen yaşam süresi',
    descriptionEn: 'Expected life span at birth',
    unit: 'yıl',
    unitEn: 'years',
    source: 'WHO',
    sourceEn: 'WHO',
    coverage: 'Yıllık',
    coverageEn: 'Annual',
    transformation: 'Doğrudan',
    transformationEn: 'Direct',
    dataQuality: 'Yüksek',
    dataQualityEn: 'High',
    isActive: true,
    order: 6,
    categoryId: 'health'
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const search = searchParams.get('search')
    const active = searchParams.get('active')

    try {
      // Try MongoDB first
      try {
        const db = await getDatabase()
        const indicatorsCollection = db.collection('indicators')
        
        const query: Record<string, unknown> = {}
        
        // Category filter
        if (category) {
          query.categoryId = category
        }
        
        // Search filter
        if (search) {
          query.$or = [
            { name: new RegExp(search, 'i') },
            { nameEn: new RegExp(search, 'i') },
            { code: new RegExp(search, 'i') },
            { description: new RegExp(search, 'i') }
          ]
        }
        
        // Active filter
        if (active !== null) {
          query.isActive = active === 'true'
        }
        
        const indicators = await indicatorsCollection.find(query).toArray()
        
        return NextResponse.json({
          success: true,
          data: indicators,
          total: indicators.length,
          source: 'mongodb'
        })
      } catch (mongoError) {
        console.error('MongoDB error:', mongoError)
        
        // Try Prisma as fallback
        try {
          const whereClause: Record<string, unknown> = {}
          
          if (category) {
            whereClause.categoryId = category
          }
          
          if (search) {
            whereClause.OR = [
              { name: { contains: search, mode: 'insensitive' } },
              { nameEn: { contains: search, mode: 'insensitive' } },
              { code: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } }
            ]
          }
          
          if (active !== null) {
            whereClause.isActive = active === 'true'
          }
          
          const indicators = await prisma.indicator.findMany({
            where: whereClause,
            orderBy: { order: 'asc' }
          })
          
          return NextResponse.json({
            success: true,
            data: indicators,
            total: indicators.length,
            source: 'prisma'
          })
        } catch (prismaError) {
          console.error('Prisma error:', prismaError)
          throw new Error('Both database connections failed')
        }
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Fallback to mock data
      let filteredIndicators = indicators

      // Category filter
      if (category) {
        filteredIndicators = filteredIndicators.filter(indicator => 
          indicator.categoryId === category
        )
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        filteredIndicators = filteredIndicators.filter(indicator =>
          indicator.name.toLowerCase().includes(searchLower) ||
          indicator.nameEn.toLowerCase().includes(searchLower) ||
          indicator.code.toLowerCase().includes(searchLower) ||
          indicator.description.toLowerCase().includes(searchLower)
        )
      }

      // Active filter
      if (active !== null) {
        const isActive = active === 'true'
        filteredIndicators = filteredIndicators.filter(indicator => 
          indicator.isActive === isActive
        )
      }

      return NextResponse.json({
        success: true,
        data: filteredIndicators,
        total: filteredIndicators.length,
        source: 'mock'
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Göstergeler getirilemedi' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validation
    if (!body.code || !body.name) {
      return NextResponse.json(
        { success: false, error: 'Gösterge kodu ve adı gerekli' },
        { status: 400 }
      )
    }

    // Check if indicator already exists
    const existingIndicator = indicators.find(i => i.code === body.code)
    if (existingIndicator) {
      return NextResponse.json(
        { success: false, error: 'Bu gösterge kodu zaten mevcut' },
        { status: 409 }
      )
    }

    // Create new indicator
    const newIndicator = {
      id: (indicators.length + 1).toString(),
      code: body.code,
      name: body.name,
      nameEn: body.nameEn || body.name,
      description: body.description || '',
      descriptionEn: body.descriptionEn || body.description || '',
      unit: body.unit || '',
      unitEn: body.unitEn || body.unit || '',
      source: body.source || '',
      sourceEn: body.sourceEn || body.source || '',
      coverage: body.coverage || '',
      coverageEn: body.coverageEn || body.coverage || '',
      transformation: body.transformation || '',
      transformationEn: body.transformationEn || body.transformation || '',
      dataQuality: body.dataQuality || 'Orta',
      dataQualityEn: body.dataQualityEn || body.dataQuality || 'Medium',
      isActive: body.isActive !== undefined ? body.isActive : true,
      order: body.order || indicators.length + 1,
      categoryId: body.categoryId || 'economy'
    }

    indicators.push(newIndicator)

    return NextResponse.json({
      success: true,
      data: newIndicator,
      message: 'Gösterge başarıyla eklendi'
    }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Gösterge eklenemedi' },
      { status: 500 }
    )
  }
}

