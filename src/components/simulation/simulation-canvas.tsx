'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Play, 
  Pause, 
  RotateCcw,
  Maximize2,
  Download,
  Settings,
  Zap,
  BarChart3,
  TrendingUp,
  Activity
} from 'lucide-react'
import { motion } from 'framer-motion'

export function SimulationCanvas() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentIteration, setCurrentIteration] = useState(0)
  const [totalIterations] = useState(1000)
  const [progress, setProgress] = useState(0)

  const simulationData = {
    gameTheory: {
      title: 'Oyun Teorisi Simülasyonu',
      status: isRunning ? 'Çalışıyor' : 'Durduruldu',
      iterations: currentIteration,
      totalIterations: totalIterations,
      results: {
        nashEquilibrium: [0.3, 0.7],
        stability: 0.85,
        convergence: true
      }
    },
    timeSeries: {
      title: 'Zaman Serisi Analizi',
      status: isRunning ? 'Çalışıyor' : 'Durduruldu',
      iterations: currentIteration,
      totalIterations: totalIterations,
      results: {
        forecast: [2.1, 2.3, 2.5, 2.4, 2.6],
        confidence: 0.92,
        rmse: 0.15
      }
    }
  }

  const startSimulation = () => {
    setIsRunning(true)
    setCurrentIteration(0)
    setProgress(0)
    
    // Simulate progress
    const interval = setInterval(() => {
      setCurrentIteration(prev => {
        const newIteration = prev + 10
        const newProgress = (newIteration / totalIterations) * 100
        
        if (newIteration >= totalIterations) {
          setIsRunning(false)
          clearInterval(interval)
          return totalIterations
        }
        
        setProgress(newProgress)
        return newIteration
      })
    }, 100)
  }

  const stopSimulation = () => {
    setIsRunning(false)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setCurrentIteration(0)
    setProgress(0)
  }

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">
              Simülasyon Kontrolü
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Ayarlar
              </Button>
              <Button variant="outline" size="sm">
                <Maximize2 className="h-4 w-4 mr-2" />
                Tam Ekran
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
            {/* Control Buttons */}
            <div className="flex items-center gap-4">
              <Button
                onClick={startSimulation}
                disabled={isRunning}
                className="flex items-center gap-2"
              >
                <Play className="h-4 w-4" />
                {isRunning ? 'Çalışıyor...' : 'Başlat'}
              </Button>
              
              <Button
                variant="outline"
                onClick={stopSimulation}
                disabled={!isRunning}
                className="flex items-center gap-2"
              >
                <Pause className="h-4 w-4" />
                Durdur
              </Button>
              
              <Button
                variant="outline"
                onClick={resetSimulation}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Sıfırla
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>İlerleme</span>
                <span>{currentIteration} / {totalIterations}</span>
              </div>
              <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                <motion.div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <div className="text-xs text-muted-foreground">
                {progress.toFixed(1)}% tamamlandı
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Simulation Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Game Theory Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              {simulationData.gameTheory.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Durum</span>
                <span className={`text-sm font-medium ${
                  simulationData.gameTheory.status === 'Çalışıyor' 
                    ? 'text-green-600' 
                    : 'text-gray-600'
                }`}>
                  {simulationData.gameTheory.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Nash Dengesi</h4>
                <div className="flex gap-2">
                  {simulationData.gameTheory.results.nashEquilibrium.map((value, index) => (
                    <div key={index} className="flex-1 bg-blue-50 dark:bg-blue-900/20 p-2 rounded text-center">
                      <div className="text-lg font-bold text-blue-600">{value}</div>
                      <div className="text-xs text-muted-foreground">Oyuncu {index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(simulationData.gameTheory.results.stability * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Kararlılık</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {simulationData.gameTheory.results.convergence ? 'Evet' : 'Hayır'}
                  </div>
                  <div className="text-xs text-muted-foreground">Yakınsama</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Series Results */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              {simulationData.timeSeries.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Durum</span>
                <span className={`text-sm font-medium ${
                  simulationData.timeSeries.status === 'Çalışıyor' 
                    ? 'text-green-600' 
                    : 'text-gray-600'
                }`}>
                  {simulationData.timeSeries.status}
                </span>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Tahmin Değerleri</h4>
                <div className="flex gap-1">
                  {simulationData.timeSeries.results.forecast.map((value, index) => (
                    <div key={index} className="flex-1 bg-green-50 dark:bg-green-900/20 p-2 rounded text-center">
                      <div className="text-sm font-bold text-green-600">{value}</div>
                      <div className="text-xs text-muted-foreground">T+{index + 1}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {(simulationData.timeSeries.results.confidence * 100).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">Güven Aralığı</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {simulationData.timeSeries.results.rmse}
                  </div>
                  <div className="text-xs text-muted-foreground">RMSE</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visualization Area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Simülasyon Görselleştirmesi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-secondary-50 dark:bg-secondary-800 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Simülasyon sonuçları burada görselleştirilecek
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Grafikler ve analiz sonuçları dinamik olarak güncellenecek
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
