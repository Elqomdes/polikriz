'use client'

import { useI18n } from '@/components/i18n-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  LineChart, 
  BarChart3, 
  Radar, 
  Map, 
  TrendingUp,
  Activity,
  PieChart
} from 'lucide-react'
import { motion } from 'framer-motion'

const visualizationTypes = [
  {
    icon: LineChart,
    titleKey: 'dataVisualization.timeSeries',
    description: 'Zaman serisi grafikleri ile trend analizi',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20'
  },
  {
    icon: BarChart3,
    titleKey: 'dataVisualization.barCharts',
    description: 'Sıralı bar grafikler ile karşılaştırma',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20'
  },
  {
    icon: Radar,
    titleKey: 'dataVisualization.radarCharts',
    description: 'Radar grafikler ile çok boyutlu analiz',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50 dark:bg-warning-900/20'
  },
  {
    icon: Activity,
    titleKey: 'dataVisualization.heatmaps',
    description: 'Korelasyon ısı haritaları',
    color: 'text-danger-600',
    bgColor: 'bg-danger-50 dark:bg-danger-900/20'
  },
  {
    icon: Map,
    titleKey: 'dataVisualization.maps',
    description: 'Bölgesel ve ülkesel choropleth haritalar',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20'
  },
  {
    icon: PieChart,
    titleKey: 'Composition Analysis',
    description: 'Bileşim analizi ve dağılım grafikleri',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20'
  }
]

export function DataVisualization() {
  const { t } = useI18n()

  return (
    <section className="py-20 bg-white dark:bg-secondary-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('dataVisualization.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('dataVisualization.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {visualizationTypes.map((type, index) => {
            const Icon = type.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg ${type.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className={`h-6 w-6 ${type.color}`} />
                    </div>
                    <CardTitle className="text-xl">
                      {t(type.titleKey)}
                    </CardTitle>
                    <CardDescription>
                      {type.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Detayları Gör
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Etkileşimli Veri Analizi
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Filtreleme, yakınlaştırma, seri açma/kapama ve gerçek zamanlı güncellemelerle 
                verilerinizi derinlemesine analiz edin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  Dashboard&apos;u Aç
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  Demo Verileri
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

