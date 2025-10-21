'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Minus,
  BarChart3,
  Globe,
  Target,
  Download,
  Share2
} from 'lucide-react'
import { motion } from 'framer-motion'

const comparisonData = [
  {
    country: 'Türkiye',
    flag: '🇹🇷',
    rank: 1,
    score: 85.2,
    change: 2.3,
    changeType: 'positive' as const,
    indicators: {
      economy: 78,
      energy: 65,
      environment: 45,
      health: 82,
      social: 58
    }
  },
  {
    country: 'ABD',
    flag: '🇺🇸',
    rank: 2,
    score: 82.1,
    change: -1.2,
    changeType: 'negative' as const,
    indicators: {
      economy: 95,
      energy: 88,
      environment: 62,
      health: 85,
      social: 75
    }
  },
  {
    country: 'Almanya',
    flag: '🇩🇪',
    rank: 3,
    score: 79.8,
    change: 0.5,
    changeType: 'neutral' as const,
    indicators: {
      economy: 88,
      energy: 72,
      environment: 85,
      health: 92,
      social: 82
    }
  },
  {
    country: 'Fransa',
    flag: '🇫🇷',
    rank: 4,
    score: 76.4,
    change: 1.8,
    changeType: 'positive' as const,
    indicators: {
      economy: 82,
      energy: 68,
      environment: 78,
      health: 89,
      social: 85
    }
  },
  {
    country: 'Çin',
    flag: '🇨🇳',
    rank: 5,
    score: 71.3,
    change: -0.7,
    changeType: 'negative' as const,
    indicators: {
      economy: 85,
      energy: 55,
      environment: 35,
      health: 88,
      social: 62
    }
  }
]

export function CountryComparison() {

  const getChangeIcon = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'negative':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <Minus className="h-4 w-4 text-gray-600" />
    }
  }

  const getChangeColor = (changeType: string) => {
    switch (changeType) {
      case 'positive':
        return 'text-green-600'
      case 'negative':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card className="mt-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Ülke Karşılaştırması
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {comparisonData.map((country, index) => (
            <motion.div
              key={country.country}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            {country.country}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            #{country.rank} sırada
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-foreground">
                          {country.score}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Bileşik Skor
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {getChangeIcon(country.changeType)}
                        <span className={`text-sm font-medium ${getChangeColor(country.changeType)}`}>
                          {country.change > 0 ? '+' : ''}{country.change}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Indicator Bars */}
                  <div className="mt-4 grid grid-cols-5 gap-4">
                    {Object.entries(country.indicators).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <p className="text-xs text-muted-foreground mb-1 capitalize">
                          {key}
                        </p>
                        <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                        <p className="text-xs font-medium mt-1">{value}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">En Yüksek Skor</p>
              <p className="text-2xl font-bold text-blue-600">85.2</p>
              <p className="text-xs text-muted-foreground">Türkiye</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">En İyi Gelişim</p>
              <p className="text-2xl font-bold text-green-600">+2.3%</p>
              <p className="text-xs text-muted-foreground">Türkiye</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Ortalama Skor</p>
              <p className="text-2xl font-bold text-purple-600">79.0</p>
              <p className="text-xs text-muted-foreground">5 Ülke</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  )
}
