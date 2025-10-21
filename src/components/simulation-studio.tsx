'use client'

import { useI18n } from '@/components/i18n-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  TrendingUp, 
  Database, 
  MapPin,
  Cpu,
  Settings,
  Play,
  Save
} from 'lucide-react'
import { motion } from 'framer-motion'

const simulationModules = [
  {
    icon: Gamepad2,
    titleKey: 'simulationStudio.gameTheory',
    description: 'Normal form, tekrarlanan oyun, Nash dengesi ve kararlılık analizi',
    features: ['Normal Form Games', 'Repeated Games', 'Nash Equilibrium', 'Stability Analysis'],
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20'
  },
  {
    icon: TrendingUp,
    titleKey: 'simulationStudio.timeSeries',
    description: 'ARIMA/VAR benzeri şok-tepki analizi ve hedefe göre politika arama',
    features: ['ARIMA Models', 'VAR Analysis', 'Shock Response', 'Policy Targeting'],
    color: 'text-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20'
  },
  {
    icon: Database,
    titleKey: 'simulationStudio.panelData',
    description: 'Sabit/tesadüfi etkilerle karşı-olgusal değerlendirme',
    features: ['Fixed Effects', 'Random Effects', 'Counterfactual Analysis', 'Causal Inference'],
    color: 'text-warning-600',
    bgColor: 'bg-warning-50 dark:bg-warning-900/20'
  },
  {
    icon: MapPin,
    titleKey: 'simulationStudio.spatial',
    description: 'Komşuluk matrisleriyle taşma ve kümelenme analizi',
    features: ['Spatial Weights', 'Spillover Effects', 'Clustering Analysis', 'Spatial Autocorrelation'],
    color: 'text-danger-600',
    bgColor: 'bg-danger-50 dark:bg-danger-900/20'
  }
]

export function SimulationStudio() {
  const { t } = useI18n()

  return (
    <section className="py-20 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-secondary-900 dark:to-primary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('simulationStudio.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('simulationStudio.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {simulationModules.map((module, index) => {
            const Icon = module.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300 group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`w-12 h-12 rounded-lg ${module.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-6 w-6 ${module.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl">
                          {t(module.titleKey)}
                        </CardTitle>
                        <CardDescription>
                          {module.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                        Özellikler
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {module.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 pt-4">
                        <Button size="sm" className="flex-1">
                          <Play className="mr-2 h-4 w-4" />
                          Başlat
                        </Button>
                        <Button variant="outline" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                  <Cpu className="h-8 w-8 text-primary-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Gelişmiş Simülasyon Özellikleri
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Parametre sürgüleriyle senaryoları kurun, Monte Carlo tekrarı ve tohum desteğiyle 
                belirsizliği görselleştirin, koşu geçmişini etiketleyip kaydedin.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600 mb-2">Monte Carlo</div>
                  <div className="text-sm text-muted-foreground">Belirsizlik Analizi</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-600 mb-2">Seed Support</div>
                  <div className="text-sm text-muted-foreground">Tekrarlanabilir Sonuçlar</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning-600 mb-2">Scenario History</div>
                  <div className="text-sm text-muted-foreground">Geçmiş Kayıtları</div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8 py-6">
                  <Play className="mr-2 h-5 w-5" />
                  Simülasyon Stüdyosu&apos;nu Aç
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <Save className="mr-2 h-5 w-5" />
                  Şablonları Görüntüle
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

