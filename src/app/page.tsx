import { Suspense } from 'react'
import { Hero } from '@/components/hero'
import { Features } from '@/components/features'
import { DataVisualization } from '@/components/data-visualization'
import { SimulationStudio } from '@/components/simulation-studio'
import { Footer } from '@/components/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
        <Features />
        <DataVisualization />
        <SimulationStudio />
        <Footer />
      </Suspense>
    </main>
  )
}
