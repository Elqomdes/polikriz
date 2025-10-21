'use client'

import { useState } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Gamepad2, 
  TrendingUp, 
  Database, 
  MapPin,
  ChevronDown,
  ChevronRight,
  Play,
  Settings,
  Info
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const simulationModules = [
  {
    id: 'game_theory',
    name: 'Oyun Teorisi',
    nameEn: 'Game Theory',
    description: 'Normal form, tekrarlanan oyun, Nash dengesi ve kararlılık analizi',
    icon: Gamepad2,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    features: [
      'Normal Form Games',
      'Repeated Games', 
      'Nash Equilibrium',
      'Stability Analysis',
      'Cooperative Games',
      'Evolutionary Games'
    ],
    parameters: [
      { name: 'Player Count', type: 'number', default: 2, min: 2, max: 10 },
      { name: 'Iterations', type: 'number', default: 1000, min: 100, max: 10000 },
      { name: 'Learning Rate', type: 'range', default: 0.1, min: 0.01, max: 1.0 },
      { name: 'Strategy Space', type: 'select', options: ['Continuous', 'Discrete'] }
    ]
  },
  {
    id: 'time_series',
    name: 'Zaman Serisi',
    nameEn: 'Time Series',
    description: 'ARIMA/VAR benzeri şok-tepki analizi ve hedefe göre politika arama',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    features: [
      'ARIMA Models',
      'VAR Analysis',
      'Shock Response',
      'Policy Targeting',
      'Forecasting',
      'Structural Breaks'
    ],
    parameters: [
      { name: 'Model Type', type: 'select', options: ['ARIMA', 'VAR', 'VECM'] },
      { name: 'Lags', type: 'number', default: 4, min: 1, max: 12 },
      { name: 'Forecast Horizon', type: 'number', default: 12, min: 1, max: 60 },
      { name: 'Confidence Level', type: 'range', default: 0.95, min: 0.8, max: 0.99 }
    ]
  },
  {
    id: 'panel_data',
    name: 'Panel Veri',
    nameEn: 'Panel Data',
    description: 'Sabit/tesadüfi etkilerle karşı-olgusal değerlendirme',
    icon: Database,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    features: [
      'Fixed Effects',
      'Random Effects',
      'Counterfactual Analysis',
      'Causal Inference',
      'Treatment Effects',
      'Synthetic Control'
    ],
    parameters: [
      { name: 'Effect Type', type: 'select', options: ['Fixed', 'Random', 'Mixed'] },
      { name: 'Time Periods', type: 'number', default: 20, min: 5, max: 100 },
      { name: 'Bootstrap Iterations', type: 'number', default: 1000, min: 100, max: 10000 },
      { name: 'Confidence Level', type: 'range', default: 0.95, min: 0.8, max: 0.99 }
    ]
  },
  {
    id: 'spatial',
    name: 'Mekânsal',
    nameEn: 'Spatial',
    description: 'Komşuluk matrisleriyle taşma ve kümelenme analizi',
    icon: MapPin,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    features: [
      'Spatial Weights',
      'Spillover Effects',
      'Clustering Analysis',
      'Spatial Autocorrelation',
      'Spatial Regression',
      'Geographic Analysis'
    ],
    parameters: [
      { name: 'Weight Matrix', type: 'select', options: ['Queen', 'Rook', 'Distance'] },
      { name: 'Distance Threshold', type: 'number', default: 100, min: 10, max: 1000 },
      { name: 'Neighbors', type: 'number', default: 8, min: 4, max: 20 },
      { name: 'Spatial Lag', type: 'range', default: 0.5, min: 0, max: 1 }
    ]
  }
]

export function SimulationModules() {
  const { language } = useI18n()
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [selectedModules, setSelectedModules] = useState<string[]>([])

  const toggleModule = (moduleId: string) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  const toggleSelection = (moduleId: string) => {
    setSelectedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  return (
    <Card className="sticky top-24">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">
          Simülasyon Modülleri
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {simulationModules.map((module) => {
          const Icon = module.icon
          const isExpanded = expandedModule === module.id
          const isSelected = selectedModules.includes(module.id)
          
          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`transition-all duration-200 ${
                isSelected ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''
              }`}>
                <CardHeader 
                  className="pb-2 cursor-pointer"
                  onClick={() => toggleModule(module.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${module.bgColor} flex items-center justify-center`}>
                        <Icon className={`h-5 w-5 ${module.color}`} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {language === 'tr' ? module.name : module.nameEn}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleSelection(module.id)
                        }}
                        className={isSelected ? 'bg-primary-100 dark:bg-primary-800' : ''}
                      >
                        {isSelected ? 'Seçili' : 'Seç'}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleModule(module.id)}
                      >
                        {isExpanded ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
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
                      <CardContent className="pt-0">
                        <div className="space-y-4">
                          {/* Features */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              Özellikler
                            </h4>
                            <div className="grid grid-cols-2 gap-1">
                              {module.features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2 text-xs">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                                  <span className="text-muted-foreground">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Parameters */}
                          <div>
                            <h4 className="text-sm font-semibold text-foreground mb-2">
                              Parametreler
                            </h4>
                            <div className="space-y-2">
                              {module.parameters.map((param, index) => (
                                <div key={index} className="space-y-1">
                                  <label className="text-xs text-muted-foreground">
                                    {param.name}
                                  </label>
                                  {param.type === 'number' ? (
                                    <input
                                      type="number"
                                      defaultValue={param.default}
                                      min={param.min}
                                      max={param.max}
                                      className="w-full px-2 py-1 text-xs border rounded-md"
                                    />
                                  ) : param.type === 'range' ? (
                                    <input
                                      type="range"
                                      min={param.min}
                                      max={param.max}
                                      step="0.01"
                                      defaultValue={param.default}
                                      className="w-full"
                                    />
                                  ) : (
                                    <select className="w-full px-2 py-1 text-xs border rounded-md">
                                      {param.options?.map((option) => (
                                        <option key={option} value={option}>
                                          {option}
                                        </option>
                                      ))}
                                    </select>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2 border-t">
                            <Button size="sm" className="flex-1">
                              <Play className="h-3 w-3 mr-1" />
                              Başlat
                            </Button>
                            <Button variant="outline" size="sm">
                              <Settings className="h-3 w-3" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Info className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          )
        })}

        {/* Selected Modules Summary */}
        {selectedModules.length > 0 && (
          <Card className="bg-primary-50 dark:bg-primary-900/20 border-primary-200">
            <CardContent className="p-4">
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Seçili Modüller ({selectedModules.length})
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedModules.map((moduleId) => {
                  const moduleItem = simulationModules.find(m => m.id === moduleId)
                  return (
                    <div
                      key={moduleId}
                      className="flex items-center gap-1 px-2 py-1 bg-primary-100 dark:bg-primary-800 rounded-md text-xs"
                    >
                      <span>{language === 'tr' ? moduleItem?.name : moduleItem?.nameEn}</span>
                      <button
                        onClick={() => toggleSelection(moduleId)}
                        className="ml-1 hover:text-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}
