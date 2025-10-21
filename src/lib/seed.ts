import { getDatabase } from './mongodb'
import { prisma } from './prisma'

export async function seedDatabase() {
  const results = {
    mongodb: { success: false, message: '', counts: {} },
    prisma: { success: false, message: '', counts: {} }
  }

  // Try MongoDB first
  try {
    const db = await getDatabase()
    
    // Seed Countries
    const countriesCollection = db.collection('countries')
    const countries = [
      {
        code: 'TR',
        name: 'Türkiye',
        nameEn: 'Turkey',
        region: 'Europe',
        subregion: 'Southern Europe',
        population: 84700000,
        area: 783562,
        latitude: 39.9334,
        longitude: 32.8597,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'US',
        name: 'Amerika Birleşik Devletleri',
        nameEn: 'United States',
        region: 'Americas',
        subregion: 'North America',
        population: 331900000,
        area: 9833517,
        latitude: 39.8283,
        longitude: -98.5795,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        code: 'DE',
        name: 'Almanya',
        nameEn: 'Germany',
        region: 'Europe',
        subregion: 'Western Europe',
        population: 83200000,
        area: 357114,
        latitude: 51.1657,
        longitude: 10.4515,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    // Clear existing data
    await countriesCollection.deleteMany({})
    
    // Insert new data
    const result = await countriesCollection.insertMany(countries)
    console.log(`Inserted ${result.insertedCount} countries`)

    // Seed Categories
    const categoriesCollection = db.collection('categories')
    const categories = [
      {
        name: 'Ekonomi',
        nameEn: 'Economy',
        description: 'Ekonomik göstergeler',
        descriptionEn: 'Economic indicators',
        color: '#3b82f6',
        icon: 'trending-up',
        order: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Enerji',
        nameEn: 'Energy',
        description: 'Enerji göstergeleri',
        descriptionEn: 'Energy indicators',
        color: '#10b981',
        icon: 'zap',
        order: 2,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Çevre',
        nameEn: 'Environment',
        description: 'Çevresel göstergeler',
        descriptionEn: 'Environmental indicators',
        color: '#22c55e',
        icon: 'leaf',
        order: 3,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await categoriesCollection.deleteMany({})
    const categoryResult = await categoriesCollection.insertMany(categories)
    console.log(`Inserted ${categoryResult.insertedCount} categories`)

    // Seed Indicators
    const indicatorsCollection = db.collection('indicators')
    const indicators = [
      {
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
        categoryId: 'economy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
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
        categoryId: 'economy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    await indicatorsCollection.deleteMany({})
    const indicatorResult = await indicatorsCollection.insertMany(indicators)
    console.log(`Inserted ${indicatorResult.insertedCount} indicators`)

    results.mongodb = {
      success: true,
      message: 'MongoDB seeded successfully',
      counts: {
        countries: result.insertedCount,
        categories: categoryResult.insertedCount,
        indicators: indicatorResult.insertedCount
      }
    }
  } catch (mongoError) {
    console.error('MongoDB seed error:', mongoError)
    results.mongodb = {
      success: false,
      message: mongoError instanceof Error ? mongoError.message : 'MongoDB seed failed',
      counts: {}
    }
  }

  // Try Prisma as fallback
  try {
    // Seed Countries
    const countries = [
      {
        code: 'TR',
        name: 'Türkiye',
        nameEn: 'Turkey',
        region: 'Europe',
        subregion: 'Southern Europe',
        population: "84700000",
        area: 783562,
        latitude: 39.9334,
        longitude: 32.8597
      },
      {
        code: 'US',
        name: 'Amerika Birleşik Devletleri',
        nameEn: 'United States',
        region: 'Americas',
        subregion: 'North America',
        population: "331900000",
        area: 9833517,
        latitude: 39.8283,
        longitude: -98.5795
      },
      {
        code: 'DE',
        name: 'Almanya',
        nameEn: 'Germany',
        region: 'Europe',
        subregion: 'Western Europe',
        population: "83200000",
        area: 357114,
        latitude: 51.1657,
        longitude: 10.4515
      }
    ]

    // Clear existing data
    await prisma.country.deleteMany()
    
    // Insert new data
    const countryResult = await prisma.country.createMany({
      data: countries
    })
    console.log(`Inserted ${countryResult.count} countries`)

    // Seed Categories
    const categories = [
      {
        name: 'Ekonomi',
        nameEn: 'Economy',
        description: 'Ekonomik göstergeler',
        descriptionEn: 'Economic indicators',
        color: '#3b82f6',
        icon: 'trending-up',
        order: 1,
        isActive: true
      },
      {
        name: 'Enerji',
        nameEn: 'Energy',
        description: 'Enerji göstergeleri',
        descriptionEn: 'Energy indicators',
        color: '#10b981',
        icon: 'zap',
        order: 2,
        isActive: true
      },
      {
        name: 'Çevre',
        nameEn: 'Environment',
        description: 'Çevresel göstergeler',
        descriptionEn: 'Environmental indicators',
        color: '#22c55e',
        icon: 'leaf',
        order: 3,
        isActive: true
      }
    ]

    await prisma.category.deleteMany()
    const categoryResult = await prisma.category.createMany({
      data: categories
    })
    console.log(`Inserted ${categoryResult.count} categories`)

    // Get category IDs for indicators
    const economyCategory = await prisma.category.findFirst({
      where: { name: 'Ekonomi' }
    })

    // Seed Indicators
    const indicators = [
      {
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
        categoryId: economyCategory?.id || ''
      },
      {
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
        categoryId: economyCategory?.id || ''
      }
    ]

    await prisma.indicator.deleteMany()
    const indicatorResult = await prisma.indicator.createMany({
      data: indicators
    })
    console.log(`Inserted ${indicatorResult.count} indicators`)

    results.prisma = {
      success: true,
      message: 'Prisma seeded successfully',
      counts: {
        countries: countryResult.count,
        categories: categoryResult.count,
        indicators: indicatorResult.count
      }
    }
  } catch (prismaError) {
    console.error('Prisma seed error:', prismaError)
    results.prisma = {
      success: false,
      message: prismaError instanceof Error ? prismaError.message : 'Prisma seed failed',
      counts: {}
    }
  }

  // Return combined results
  const hasAnySuccess = results.mongodb.success || results.prisma.success
  
  return {
    success: hasAnySuccess,
    message: hasAnySuccess ? 'Database seeded successfully' : 'All database seeding failed',
    results: results,
    error: hasAnySuccess ? null : 'All database connections failed'
  }
}

