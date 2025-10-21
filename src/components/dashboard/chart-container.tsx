'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  BarChart3, 
  Radar, 
  Activity,
  Download,
  Maximize2,
  Settings,
  Play
} from 'lucide-react'
import { motion } from 'framer-motion'
import { TimeSeriesChart } from './charts/time-series-chart'
import { BarChart } from './charts/bar-chart'
import { RadarChart } from './charts/radar-chart'
import { HeatmapChart } from './charts/heatmap-chart'

type ChartType = 'line' | 'bar' | 'radar' | 'heatmap'

export function ChartContainer() {
  const [activeChart, setActiveChart] = useState<ChartType>('line')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const chartTypes = [
    { id: 'line' as const, name: 'Zaman Serisi', icon: LineChart, color: 'text-blue-600' },
    { id: 'bar' as const, name: 'Bar Grafik', icon: BarChart3, color: 'text-green-600' },
    { id: 'radar' as const, name: 'Radar', icon: Radar, color: 'text-purple-600' },
    { id: 'heatmap' as const, name: 'Isı Haritası', icon: Activity, color: 'text-orange-600' },
  ]

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return <TimeSeriesChart />
      case 'bar':
        return <BarChart />
      case 'radar':
        return <RadarChart />
      case 'heatmap':
        return <HeatmapChart />
      default:
        return <TimeSeriesChart />
    }
  }

  return (
    <Card className={`${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Veri Görselleştirme
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Güncelle
            </Button>
          </div>
        </div>

        {/* Chart Type Selector */}
        <div className="flex flex-wrap gap-2 mt-4">
          {chartTypes.map((type) => {
            const Icon = type.icon
            return (
              <Button
                key={type.id}
                variant={activeChart === type.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveChart(type.id)}
                className="flex items-center gap-2"
              >
                <Icon className={`h-4 w-4 ${activeChart === type.id ? 'text-white' : type.color}`} />
                {type.name}
              </Button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent>
        <motion.div
          key={activeChart}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-96"
        >
          {renderChart()}
        </motion.div>
      </CardContent>
    </Card>
  )
}
