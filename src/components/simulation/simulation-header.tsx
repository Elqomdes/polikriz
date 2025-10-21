'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Square, 
  Save, 
  Download,
  Settings,
  History,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

export function SimulationHeader() {

  const simulationStats = [
    {
      title: 'Aktif Simülasyon',
      value: '3',
      change: '+1',
      changeType: 'positive' as const,
      icon: Play
    },
    {
      title: 'Tamamlanan',
      value: '47',
      change: '+12',
      changeType: 'positive' as const,
      icon: Square
    },
    {
      title: 'Toplam İterasyon',
      value: '1.2K',
      change: '+156',
      changeType: 'positive' as const,
      icon: Zap
    }
  ]

  return (
    <div className="bg-white dark:bg-secondary-800 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Simülasyon Stüdyosu
            </h1>
            <p className="text-muted-foreground">
              İleri düzey analiz ve senaryo simülasyonları çalıştırın
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Geçmiş
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Ayarlar
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Kaydet
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              Simülasyonu Başlat
            </Button>
          </div>
        </div>

        {/* Simulation Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {simulationStats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.title}
                        </p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.value}
                        </p>
                        <p className={`text-sm ${
                          stat.changeType === 'positive' 
                            ? 'text-green-600' 
                            : 'text-red-600'
                        }`}>
                          {stat.change} bu hafta
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/20 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
