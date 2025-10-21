'use client'

import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Globe, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  const { t } = useI18n()

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-primary-900 dark:via-secondary-900 dark:to-accent-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-4">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t('hero.description')}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button size="lg" className="text-lg px-8 py-6">
              {t('hero.getStarted')}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              {t('hero.learnMore')}
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-secondary-800/50 rounded-xl backdrop-blur-sm">
              <BarChart3 className="h-12 w-12 text-primary-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Veri Analizi</h3>
              <p className="text-sm text-muted-foreground text-center">
                Çok boyutlu göstergeleri etkileşimli grafiklerle analiz edin
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-secondary-800/50 rounded-xl backdrop-blur-sm">
              <Globe className="h-12 w-12 text-accent-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Karşılaştırma</h3>
              <p className="text-sm text-muted-foreground text-center">
                Ülkeleri ve bölgeleri detaylı şekilde karşılaştırın
              </p>
            </div>
            
            <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-secondary-800/50 rounded-xl backdrop-blur-sm">
              <Zap className="h-12 w-12 text-warning-600 mb-4" />
              <h3 className="text-lg font-semibold mb-2">Simülasyon</h3>
              <p className="text-sm text-muted-foreground text-center">
                İleri düzey senaryo simülasyonları çalıştırın
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}


