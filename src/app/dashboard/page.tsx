import { Suspense } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DataFilters } from '@/components/dashboard/data-filters'
import { ChartContainer } from '@/components/dashboard/chart-container'
import { CountryComparison } from '@/components/dashboard/country-comparison'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Suspense fallback={<LoadingSpinner />}>
        <DashboardHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <DataFilters />
            </div>
            <div className="lg:col-span-3">
              <ChartContainer />
              <CountryComparison />
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  )
}

