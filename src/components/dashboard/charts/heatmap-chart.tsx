'use client'

import { useState } from 'react'

const data = [
  { country: 'Türkiye', economy: 0.8, energy: 0.6, environment: 0.4, health: 0.7, social: 0.5 },
  { country: 'ABD', economy: 0.9, energy: 0.8, environment: 0.6, health: 0.8, social: 0.7 },
  { country: 'Almanya', economy: 0.9, energy: 0.7, environment: 0.8, health: 0.9, social: 0.8 },
  { country: 'Fransa', economy: 0.8, energy: 0.6, environment: 0.7, health: 0.9, social: 0.8 },
  { country: 'Çin', economy: 0.7, energy: 0.5, environment: 0.3, health: 0.8, social: 0.6 },
  { country: 'Japonya', economy: 0.8, energy: 0.6, environment: 0.8, health: 0.9, social: 0.9 },
]

const categories = ['economy', 'energy', 'environment', 'health', 'social']
const categoryLabels = {
  economy: 'Ekonomi',
  energy: 'Enerji',
  environment: 'Çevre',
  health: 'Sağlık',
  social: 'Sosyal'
}

export function HeatmapChart() {
  const [hoveredCell, setHoveredCell] = useState<{country: string, category: string} | null>(null)

  const getColorIntensity = (value: number) => {
    if (value >= 0.8) return 'bg-green-500'
    if (value >= 0.6) return 'bg-yellow-500'
    if (value >= 0.4) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getOpacity = (value: number) => {
    return Math.max(0.3, value)
  }

  return (
    <div className="w-full h-full p-4">
      <div className="grid grid-cols-6 gap-1 h-full">
        {/* Header row */}
        <div className="text-xs font-medium text-muted-foreground flex items-center justify-center">
          Ülke / Kategori
        </div>
        {categories.map((category) => (
          <div 
            key={category}
            className="text-xs font-medium text-center text-muted-foreground flex items-center justify-center"
          >
            {categoryLabels[category as keyof typeof categoryLabels]}
          </div>
        ))}

        {/* Data rows */}
        {data.map((row) => (
          <div key={row.country} className="contents">
            <div className="text-xs font-medium text-right pr-2 flex items-center justify-end">
              {row.country}
            </div>
            {categories.map((category) => {
              const value = row[category as keyof typeof row] as number
              const isHovered = hoveredCell?.country === row.country && hoveredCell?.category === category
              
              return (
                <div
                  key={`${row.country}-${category}`}
                  className={`
                    ${getColorIntensity(value)} 
                    rounded-sm flex items-center justify-center text-xs font-medium text-white
                    transition-all duration-200 cursor-pointer
                    ${isHovered ? 'ring-2 ring-blue-500 ring-opacity-50 scale-105' : ''}
                  `}
                  style={{ opacity: getOpacity(value) }}
                  onMouseEnter={() => setHoveredCell({ country: row.country, category })}
                  onMouseLeave={() => setHoveredCell(null)}
                  title={`${row.country} - ${categoryLabels[category as keyof typeof categoryLabels]}: ${(value * 100).toFixed(1)}%`}
                >
                  {(value * 100).toFixed(0)}%
                </div>
              )
            })}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
          <span>Düşük (0-40%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-orange-500 rounded-sm"></div>
          <span>Orta (40-60%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
          <span>İyi (60-80%)</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
          <span>Mükemmel (80-100%)</span>
        </div>
      </div>
    </div>
  )
}
