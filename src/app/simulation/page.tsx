import { Suspense } from 'react'
import { SimulationHeader } from '@/components/simulation/simulation-header'
import { SimulationModules } from '@/components/simulation/simulation-modules'
import { SimulationCanvas } from '@/components/simulation/simulation-canvas'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function SimulationPage() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Suspense fallback={<LoadingSpinner />}>
        <SimulationHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <SimulationModules />
            </div>
            <div className="lg:col-span-3">
              <SimulationCanvas />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}
