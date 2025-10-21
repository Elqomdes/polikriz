'use client'

import { useState } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  LayoutDashboard,
  Database,
  Upload,
  Users,
  Settings,
  BarChart3,
  FileText,
  Target,
  History,
  ChevronRight,
  ChevronDown
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const menuItems = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    nameEn: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    id: 'data-management',
    name: 'Veri Yönetimi',
    nameEn: 'Data Management',
    icon: Database,
    children: [
      { name: 'Ülkeler', nameEn: 'Countries', href: '/admin/countries' },
      { name: 'Göstergeler', nameEn: 'Indicators', href: '/admin/indicators' },
      { name: 'Veri Noktaları', nameEn: 'Data Points', href: '/admin/data-points' },
      { name: 'Kategoriler', nameEn: 'Categories', href: '/admin/categories' }
    ]
  },
  {
    id: 'data-upload',
    name: 'Veri Yükleme',
    nameEn: 'Data Upload',
    icon: Upload,
    href: '/admin/upload'
  },
  {
    id: 'users',
    name: 'Kullanıcılar',
    nameEn: 'Users',
    icon: Users,
    href: '/admin/users'
  },
  {
    id: 'simulations',
    name: 'Simülasyonlar',
    nameEn: 'Simulations',
    icon: Target,
    href: '/admin/simulations'
  },
  {
    id: 'reports',
    name: 'Raporlar',
    nameEn: 'Reports',
    icon: FileText,
    href: '/admin/reports'
  },
  {
    id: 'analytics',
    name: 'Analitik',
    nameEn: 'Analytics',
    icon: BarChart3,
    href: '/admin/analytics'
  },
  {
    id: 'audit',
    name: 'Denetim Günlüğü',
    nameEn: 'Audit Log',
    icon: History,
    href: '/admin/audit'
  },
  {
    id: 'settings',
    name: 'Ayarlar',
    nameEn: 'Settings',
    icon: Settings,
    children: [
      { name: 'Genel Ayarlar', nameEn: 'General Settings', href: '/admin/settings/general' },
      { name: 'Güvenlik', nameEn: 'Security', href: '/admin/settings/security' },
      { name: 'API Ayarları', nameEn: 'API Settings', href: '/admin/settings/api' },
      { name: 'Bildirimler', nameEn: 'Notifications', href: '/admin/settings/notifications' }
    ]
  }
]

export function AdminSidebar() {
  const { language } = useI18n()
  const [expandedItems, setExpandedItems] = useState<string[]>(['data-management'])

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  return (
    <aside className="w-64 bg-white dark:bg-secondary-800 border-r border-gray-200 dark:border-gray-700 min-h-screen">
      <div className="p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isExpanded = expandedItems.includes(item.id)
            const hasChildren = item.children && item.children.length > 0

            return (
              <div key={item.id}>
                <Button
                  variant="ghost"
                  className="w-full justify-start h-auto p-3"
                  onClick={() => hasChildren ? toggleExpanded(item.id) : undefined}
                >
                  <Icon className="h-4 w-4 mr-3" />
                  <span className="flex-1 text-left">
                    {language === 'tr' ? item.name : item.nameEn}
                  </span>
                  {hasChildren && (
                    isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
                  )}
                </Button>

                <AnimatePresence>
                  {hasChildren && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 space-y-1"
                    >
                      {item.children?.map((child, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className="w-full justify-start h-auto p-2 text-sm"
                        >
                          <span className="ml-4">
                            {language === 'tr' ? child.name : child.nameEn}
                          </span>
                        </Button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* Quick Stats */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Hızlı İstatistikler
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Toplam Ülke</span>
                <span className="font-medium">195</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Aktif Gösterge</span>
                <span className="font-medium">247</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Veri Noktası</span>
                <span className="font-medium">1.2M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Simülasyon</span>
                <span className="font-medium">47</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  )
}
