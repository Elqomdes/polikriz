'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Download, 
  FileText, 
  Image, 
  Table,
  X,
  Check,
  Calendar
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  data?: unknown[]
  title?: string
}

const exportFormats = [
  {
    id: 'csv',
    name: 'CSV',
    description: 'Virgülle ayrılmış değerler',
    icon: Table,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20'
  },
  {
    id: 'json',
    name: 'JSON',
    description: 'JavaScript Object Notation',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20'
  },
  {
    id: 'pdf',
    name: 'PDF',
    description: 'Taşınabilir belge formatı',
    icon: FileText,
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-900/20'
  },
  {
    id: 'png',
    name: 'PNG',
    description: 'Görsel formatı',
    icon: Image,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-900/20'
  },
  {
    id: 'svg',
    name: 'SVG',
    description: 'Vektör grafik formatı',
    icon: Image,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20'
  }
]

const exportOptions = [
  {
    id: 'include-metadata',
    name: 'Metaveri Dahil Et',
    description: 'Veri kaynağı ve tarih bilgileri'
  },
  {
    id: 'include-filters',
    name: 'Filtre Bilgileri',
    description: 'Uygulanan filtrelerin listesi'
  },
  {
    id: 'include-charts',
    name: 'Grafikler',
    description: 'Görselleştirmeleri dahil et'
  },
  {
    id: 'compressed',
    name: 'Sıkıştırılmış',
    description: 'Dosya boyutunu küçült'
  }
]

export function ExportModal({ isOpen, onClose, data = [], title = 'Veri Dışa Aktarma' }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState('csv')
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['include-metadata'])
  const [isExporting, setIsExporting] = useState(false)
  const [dateRange, setDateRange] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  })

  const toggleOption = (optionId: string) => {
    setSelectedOptions(prev => 
      prev.includes(optionId) 
        ? prev.filter(id => id !== optionId)
        : [...prev, optionId]
    )
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Create download link based on format
      const blob = new Blob([JSON.stringify(data, null, 2)], { 
        type: selectedFormat === 'csv' ? 'text/csv' : 'application/json' 
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `polikriz-data-${new Date().toISOString().split('T')[0]}.${selectedFormat}`
      link.click()
      URL.revokeObjectURL(url)
      
      onClose()
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-2xl mx-4"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Download className="h-5 w-5" />
                {title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Format Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dosya Formatı</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {exportFormats.map((format) => {
                  const Icon = format.icon
                  return (
                    <Button
                      key={format.id}
                      variant={selectedFormat === format.id ? 'default' : 'outline'}
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={() => setSelectedFormat(format.id)}
                    >
                      <Icon className={`h-6 w-6 ${selectedFormat === format.id ? 'text-white' : format.color}`} />
                      <div className="text-center">
                        <div className="font-medium">{format.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {format.description}
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Export Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Dışa Aktarma Seçenekleri</h3>
              <div className="space-y-3">
                {exportOptions.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary-50 dark:hover:bg-secondary-800 transition-colors"
                  >
                    <div>
                      <div className="font-medium">{option.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </div>
                    <Button
                      variant={selectedOptions.includes(option.id) ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => toggleOption(option.id)}
                    >
                      {selectedOptions.includes(option.id) && (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      {selectedOptions.includes(option.id) ? 'Aktif' : 'Pasif'}
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Tarih Aralığı
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Başlangıç Tarihi
                  </label>
                  <input
                    type="date"
                    value={dateRange.start}
                    onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Bitiş Tarihi
                  </label>
                  <input
                    type="date"
                    value={dateRange.end}
                    onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Export Summary */}
            <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Dışa Aktarma Özeti</h4>
              <div className="text-sm space-y-1">
                <div>Format: <span className="font-medium">{selectedFormat.toUpperCase()}</span></div>
                <div>Veri Noktası: <span className="font-medium">{data.length}</span></div>
                <div>Tarih Aralığı: <span className="font-medium">{dateRange.start} - {dateRange.end}</span></div>
                <div>Seçenekler: <span className="font-medium">{selectedOptions.length}</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                İptal
              </Button>
              <Button 
                onClick={handleExport} 
                disabled={isExporting}
                className="flex-1"
              >
                {isExporting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                    Dışa Aktarılıyor...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Dışa Aktar
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
