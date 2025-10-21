'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Database, 
  Upload, 
  Users, 
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Clock,
  Globe,
  Target,
  FileText,
  Activity
} from 'lucide-react'
import { motion } from 'framer-motion'

const stats = [
  {
    title: 'Toplam Ülke',
    value: '195',
    change: '+3',
    changeType: 'positive' as const,
    icon: Globe,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    title: 'Aktif Gösterge',
    value: '247',
    change: '+12',
    changeType: 'positive' as const,
    icon: Target,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    title: 'Veri Noktası',
    value: '1.2M',
    change: '+45K',
    changeType: 'positive' as const,
    icon: Database,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    title: 'Aktif Simülasyon',
    value: '3',
    change: '+1',
    changeType: 'positive' as const,
    icon: Activity,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'upload',
    message: 'Yeni veri dosyası yüklendi',
    timestamp: '2 saat önce',
    status: 'success'
  },
  {
    id: 2,
    type: 'simulation',
    message: 'Oyun teorisi simülasyonu tamamlandı',
    timestamp: '4 saat önce',
    status: 'success'
  },
  {
    id: 3,
    type: 'error',
    message: 'Veri doğrulama hatası',
    timestamp: '6 saat önce',
    status: 'error'
  },
  {
    id: 4,
    type: 'user',
    message: 'Yeni kullanıcı kaydı',
    timestamp: '1 gün önce',
    status: 'info'
  }
]

const systemHealth = [
  { name: 'API Yanıt Süresi', value: 95, status: 'good' },
  { name: 'Veritabanı Bağlantısı', value: 100, status: 'good' },
  { name: 'Disk Kullanımı', value: 78, status: 'warning' },
  { name: 'Bellek Kullanımı', value: 65, status: 'good' }
]

export function AdminDashboard() {

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload':
        return <Upload className="h-4 w-4" />
      case 'simulation':
        return <Target className="h-4 w-4" />
      case 'error':
        return <AlertTriangle className="h-4 w-4" />
      case 'user':
        return <Users className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  const getActivityColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'info':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  const getHealthColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Sistem durumu ve yönetim araçları
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className={`text-sm ${
                        stat.changeType === 'positive' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        <TrendingUp className="inline h-4 w-4 mr-1" />
                        {stat.change} bu ay
                      </p>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Son Aktiviteler
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                >
                  <div className={`p-2 rounded-full bg-secondary-100 dark:bg-secondary-700 ${getActivityColor(activity.status)}`}>
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Sistem Sağlığı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-foreground">
                      {item.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {item.value}%
                    </span>
                  </div>
                  <div className="w-full bg-secondary-200 dark:bg-secondary-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${getHealthColor(item.status)}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Hızlı İşlemler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-auto p-4 flex flex-col items-center gap-2">
              <Upload className="h-6 w-6" />
              <span>Veri Yükle</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Database className="h-6 w-6" />
              <span>Veri Yönet</span>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <FileText className="h-6 w-6" />
              <span>Rapor Oluştur</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
