'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Filter, 
  ChevronDown, 
  X,
  Calendar,
  Globe,
  BarChart3,
  Target
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function DataFilters() {
  const [isExpanded, setIsExpanded] = useState(true)

  const countries = [
    { code: 'TR', name: 'Türkiye', flag: '🇹🇷' },
    { code: 'US', name: 'Amerika Birleşik Devletleri', flag: '🇺🇸' },
    { code: 'DE', name: 'Almanya', flag: '🇩🇪' },
    { code: 'FR', name: 'Fransa', flag: '🇫🇷' },
    { code: 'GB', name: 'Birleşik Krallık', flag: '🇬🇧' },
    { code: 'CN', name: 'Çin', flag: '🇨🇳' },
    { code: 'JP', name: 'Japonya', flag: '🇯🇵' },
    { code: 'IN', name: 'Hindistan', flag: '🇮🇳' },
  ]

  const categories = [
    { id: 'economy', name: 'Ekonomi', color: 'bg-blue-500', count: 45 },
    { id: 'energy', name: 'Enerji', color: 'bg-green-500', count: 32 },
    { id: 'environment', name: 'Çevre', color: 'bg-emerald-500', count: 28 },
    { id: 'health', name: 'Sağlık', color: 'bg-red-500', count: 38 },
    { id: 'demographics', name: 'Demografi', color: 'bg-purple-500', count: 25 },
    { id: 'social', name: 'Sosyal', color: 'bg-orange-500', count: 31 },
  ]

  const indicators = [
    { id: 'gdp', name: 'GSYİH', category: 'economy' },
    { id: 'inflation', name: 'Enflasyon', category: 'economy' },
    { id: 'unemployment', name: 'İşsizlik', category: 'economy' },
    { id: 'renewable', name: 'Yenilenebilir Enerji', category: 'energy' },
    { id: 'co2', name: 'CO2 Emisyonu', category: 'environment' },
    { id: 'life_expectancy', name: 'Yaşam Beklentisi', category: 'health' },
  ]

  const [selectedCountries, setSelectedCountries] = useState<string[]>(['TR', 'US', 'DE'])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['economy', 'energy'])
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>(['gdp', 'inflation'])
  const [yearRange, setYearRange] = useState<[number, number]>([2010, 2023])

  const toggleCountry = (code: string) => {
    setSelectedCountries(prev => 
      prev.includes(code) 
        ? prev.filter(c => c !== code)
        : [...prev, code]
    )
  }

  const toggleCategory = (id: string) => {
    setSelectedCategories(prev => 
      prev.includes(id) 
        ? prev.filter(c => c !== id)
        : [...prev, id]
    )
  }

  const toggleIndicator = (id: string) => {
    setSelectedIndicators(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filtreler
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <ChevronDown 
              className={`h-4 w-4 transition-transform ${
                isExpanded ? 'rotate-180' : ''
              }`} 
            />
          </Button>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-6">
              {/* Countries Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Ülkeler
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {countries.map((country) => (
                    <div
                      key={country.code}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                        selectedCountries.includes(country.code)
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => toggleCountry(country.code)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{country.flag}</span>
                        <span className="text-sm">{country.name}</span>
                      </div>
                      {selectedCountries.includes(country.code) && (
                        <X className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Kategoriler
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                        selectedCategories.includes(category.id)
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => toggleCategory(category.id)}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm">{category.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({category.count})
                        </span>
                      </div>
                      {selectedCategories.includes(category.id) && (
                        <X className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicators Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Göstergeler
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {indicators
                    .filter(indicator => 
                      selectedCategories.some(cat => 
                        categories.find(c => c.id === cat)?.id === indicator.category
                      )
                    )
                    .map((indicator) => (
                    <div
                      key={indicator.id}
                      className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                        selectedIndicators.includes(indicator.id)
                          ? 'bg-primary-50 dark:bg-primary-900/20 border border-primary-200'
                          : 'hover:bg-accent'
                      }`}
                      onClick={() => toggleIndicator(indicator.id)}
                    >
                      <span className="text-sm">{indicator.name}</span>
                      {selectedIndicators.includes(indicator.id) && (
                        <X className="h-4 w-4 text-primary-600" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Year Range Filter */}
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Yıl Aralığı
                </h3>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                    className="w-20 px-2 py-1 text-sm border rounded-md"
                    min="1990"
                    max="2023"
                  />
                  <span className="text-sm text-muted-foreground">-</span>
                  <input
                    type="number"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                    className="w-20 px-2 py-1 text-sm border rounded-md"
                    min="1990"
                    max="2023"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex-1"
                  onClick={() => {
                    setSelectedCountries([])
                    setSelectedCategories([])
                    setSelectedIndicators([])
                    setYearRange([2010, 2023])
                  }}
                >
                  Temizle
                </Button>
                <Button size="sm" className="flex-1">
                  Uygula
                </Button>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
