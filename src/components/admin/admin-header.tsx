'use client'

import { Button } from '@/components/ui/button'
import { 
  Settings, 
  Bell, 
  User, 
  LogOut,
  Shield,
  Database,
  BarChart3
} from 'lucide-react'

export function AdminHeader() {

  return (
    <header className="bg-white dark:bg-secondary-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground">
                  Polikriz Platform Yönetimi
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Database className="h-4 w-4 mr-2" />
              Veri Yönetimi
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Raporlar
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2 pl-4 border-l border-gray-200 dark:border-gray-700">
              <div className="w-8 h-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-600" />
              </div>
              <div className="text-sm">
                <p className="font-medium text-foreground">Admin</p>
                <p className="text-muted-foreground">Yönetici</p>
              </div>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
