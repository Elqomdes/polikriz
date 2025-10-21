import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/mongodb'

// Mock data - fallback için
const mockCountries = [
  {
    id: '1',
    code: 'TR',
    name: 'Türkiye',
    nameEn: 'Turkey',
    region: 'Europe',
    subregion: 'Southern Europe',
    population: 84700000,
    area: 783562,
    latitude: 39.9334,
    longitude: 32.8597
  },
  {
    id: '2',
    code: 'US',
    name: 'Amerika Birleşik Devletleri',
    nameEn: 'United States',
    region: 'Americas',
    subregion: 'North America',
    population: 331900000,
    area: 9833517,
    latitude: 39.8283,
    longitude: -98.5795
  },
  {
    id: '3',
    code: 'DE',
    name: 'Almanya',
    nameEn: 'Germany',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 83200000,
    area: 357114,
    latitude: 51.1657,
    longitude: 10.4515
  },
  {
    id: '4',
    code: 'FR',
    name: 'Fransa',
    nameEn: 'France',
    region: 'Europe',
    subregion: 'Western Europe',
    population: 67800000,
    area: 551695,
    latitude: 46.2276,
    longitude: 2.2137
  },
  {
    id: '5',
    code: 'CN',
    name: 'Çin',
    nameEn: 'China',
    region: 'Asia',
    subregion: 'Eastern Asia',
    population: 1439000000,
    area: 9596961,
    latitude: 35.8617,
    longitude: 104.1954
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const region = searchParams.get('region')
    const search = searchParams.get('search')

    try {
      // MongoDB'den veri çek
      const db = await getDatabase()
      const countriesCollection = db.collection('countries')
      
      const query: Record<string, unknown> = {}
      
      // Region filter
      if (region) {
        query.region = new RegExp(region, 'i')
      }
      
      // Search filter
      if (search) {
        query.$or = [
          { name: new RegExp(search, 'i') },
          { nameEn: new RegExp(search, 'i') },
          { code: new RegExp(search, 'i') }
        ]
      }
      
      const countries = await countriesCollection.find(query).toArray()
      
      return NextResponse.json({
        success: true,
        data: countries,
        total: countries.length
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Fallback to mock data
      let filteredCountries = mockCountries

      // Region filter
      if (region) {
        filteredCountries = filteredCountries.filter(country => 
          country.region?.toLowerCase() === region.toLowerCase()
        )
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase()
        filteredCountries = filteredCountries.filter(country =>
          country.name.toLowerCase().includes(searchLower) ||
          country.nameEn?.toLowerCase().includes(searchLower) ||
          country.code.toLowerCase().includes(searchLower)
        )
      }

      return NextResponse.json({
        success: true,
        data: filteredCountries,
        total: filteredCountries.length,
        fallback: true
      })
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ülkeler getirilemedi' },
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
        { success: false, error: 'Ülke kodu ve adı gerekli' },
        { status: 400 }
      )
    }

    try {
      // MongoDB'ye kaydet
      const db = await getDatabase()
      const countriesCollection = db.collection('countries')
      
      // Check if country already exists
      const existingCountry = await countriesCollection.findOne({ code: body.code })
      if (existingCountry) {
        return NextResponse.json(
          { success: false, error: 'Bu ülke kodu zaten mevcut' },
          { status: 409 }
        )
      }

      // Create new country
      const newCountry = {
        code: body.code,
        name: body.name,
        nameEn: body.nameEn || body.name,
        region: body.region || '',
        subregion: body.subregion || '',
        population: body.population || 0,
        area: body.area || 0,
        latitude: body.latitude || 0,
        longitude: body.longitude || 0,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      const result = await countriesCollection.insertOne(newCountry)
      const insertedCountry = {
        ...newCountry,
        _id: result.insertedId.toString()
      }

      return NextResponse.json({
        success: true,
        data: insertedCountry,
        message: 'Ülke başarıyla eklendi'
      }, { status: 201 })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { success: false, error: 'Veritabanı hatası' },
        { status: 500 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Ülke eklenemedi' },
      { status: 500 }
    )
  }
}
