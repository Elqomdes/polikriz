import { Suspense } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminDashboard } from '@/components/admin/admin-dashboard'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900">
      <Suspense fallback={<LoadingSpinner />}>
        <AdminHeader />
        <div className="flex">
          <AdminSidebar />
          <main className="flex-1 p-6">
            <AdminDashboard />
          </main>
        </div>
      </Suspense>
    </div>
  )
}
