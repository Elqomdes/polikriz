'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  Share2, 
  Settings, 
  RefreshCw,
  BarChart3,
  TrendingUp,
  Globe
} from 'lucide-react'
import { ExportModal } from '@/components/export/export-modal'
import { ShareModal } from '@/components/export/share-modal'
import { motion } from 'framer-motion'
import { useState } from 'react'

export function DashboardHeader() {
  const [isExportOpen, setIsExportOpen] = useState(false)
  const [isShareOpen, setIsShareOpen] = useState(false)

  const stats = [
    {
      title: 'Toplam Gösterge',
      value: '247',
      change: '+12',
      changeType: 'positive' as const,
      icon: BarChart3
    },
    {
      title: 'Aktif Ülke',
      value: '195',
      change: '+3',
      changeType: 'positive' as const,
      icon: Globe
    },
    {
      title: 'Veri Noktası',
      value: '1.2M',
      change: '+45K',
      changeType: 'positive' as const,
      icon: TrendingUp
    }
  ]

  return (
    <div className="bg-white dark:bg-secondary-800 border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Veri Dashboard&apos;u
            </h1>
            <p className="text-muted-foreground">
              Çok boyutlu kriz göstergelerini analiz edin ve karşılaştırın
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Yenile
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Ayarlar
            </Button>
            <Button variant="outline" size="sm" onClick={() => setIsShareOpen(true)}>
              <Share2 className="h-4 w-4 mr-2" />
              Paylaş
            </Button>
            <Button size="sm" onClick={() => setIsExportOpen(true)}>
              <Download className="h-4 w-4 mr-2" />
              Dışa Aktar
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {stats.map((stat, index) => {
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
                          {stat.change} bu ay
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

      {/* Modals */}
      <ExportModal 
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        title="Dashboard Verilerini Dışa Aktar"
      />
      <ShareModal 
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        title="Dashboard'u Paylaş"
      />
    </div>
  )
}
