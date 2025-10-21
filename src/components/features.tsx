'use client'

import { useI18n } from '@/components/i18n-provider'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  BarChart3, 
  Filter, 
  TrendingUp, 
  Cpu, 
  Globe, 
  Database,
  Target,
  Zap
} from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: BarChart3,
    titleKey: 'features.interactiveCharts.title',
    descriptionKey: 'features.interactiveCharts.description',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20'
  },
  {
    icon: Filter,
    titleKey: 'features.dynamicFilters.title',
    descriptionKey: 'features.dynamicFilters.description',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20'
  },
  {
    icon: TrendingUp,
    titleKey: 'features.compositeScores.title',
    descriptionKey: 'features.compositeScores.description',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50 dark:bg-warning-900/20'
  },
  {
    icon: Cpu,
    titleKey: 'features.simulationStudio.title',
    descriptionKey: 'features.simulationStudio.description',
    color: 'text-danger-600',
    bgColor: 'bg-danger-50 dark:bg-danger-900/20'
  },
  {
    icon: Globe,
    titleKey: 'Choropleth Maps',
    descriptionKey: 'Interactive regional and country-level maps with data visualization',
    color: 'text-primary-600',
    bgColor: 'bg-primary-50 dark:bg-primary-900/20'
  },
  {
    icon: Database,
    titleKey: 'Data Management',
    descriptionKey: 'Comprehensive metadata, data versioning and quality indicators',
    color: 'text-accent-600',
    bgColor: 'bg-accent-50 dark:bg-accent-900/20'
  },
  {
    icon: Target,
    titleKey: 'Scenario Planning',
    descriptionKey: 'Advanced policy targeting and counterfactual analysis',
    color: 'text-warning-600',
    bgColor: 'bg-warning-50 dark:bg-warning-900/20'
  },
  {
    icon: Zap,
    titleKey: 'Real-time Analysis',
    descriptionKey: 'Live data updates and instant visualization updates',
    color: 'text-danger-600',
    bgColor: 'bg-danger-50 dark:bg-danger-900/20'
  }
]

export function Features() {
  const { t } = useI18n()

  return (
    <section className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full ${feature.bgColor} flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-lg">
                      {t(feature.titleKey)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {t(feature.descriptionKey)}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


