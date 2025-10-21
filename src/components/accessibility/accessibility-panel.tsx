'use client'

import { useState } from 'react'
import { useAccessibility } from './accessibility-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Eye, 
  Type, 
  Volume2, 
  MousePointer,
  ChevronDown,
  ChevronUp,
  Settings,
  Check
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AccessibilityPanel() {
  const {
    highContrast,
    setHighContrast,
    reducedMotion,
    setReducedMotion,
    fontSize,
    setFontSize,
    screenReader,
    setScreenReader
  } = useAccessibility()

  const [isExpanded, setIsExpanded] = useState(false)

  const fontSizeOptions = [
    { value: 'small', label: 'Küçük', description: 'Kompakt görünüm' },
    { value: 'medium', label: 'Orta', description: 'Varsayılan boyut' },
    { value: 'large', label: 'Büyük', description: 'Kolay okuma' }
  ]

  return (
    <Card className="fixed bottom-4 right-4 z-50 w-80">
      <CardHeader 
        className="cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Erişilebilirlik
          </div>
          {isExpanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </CardTitle>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CardContent className="space-y-4">
              {/* High Contrast */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm font-medium">Yüksek Kontrast</span>
                </div>
                <Button
                  variant={highContrast ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setHighContrast(!highContrast)}
                  className="w-full justify-start"
                >
                  {highContrast && <Check className="h-4 w-4 mr-2" />}
                  {highContrast ? 'Aktif' : 'Pasif'}
                </Button>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span className="text-sm font-medium">Yazı Boyutu</span>
                </div>
                <div className="space-y-1">
                  {fontSizeOptions.map((option) => (
                    <Button
                      key={option.value}
                      variant={fontSize === option.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFontSize(option.value as 'small' | 'medium' | 'large')}
                      className="w-full justify-start"
                    >
                      {fontSize === option.value && <Check className="h-4 w-4 mr-2" />}
                      <div className="text-left">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Reduced Motion */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  <span className="text-sm font-medium">Azaltılmış Hareket</span>
                </div>
                <Button
                  variant={reducedMotion ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setReducedMotion(!reducedMotion)}
                  className="w-full justify-start"
                >
                  {reducedMotion && <Check className="h-4 w-4 mr-2" />}
                  {reducedMotion ? 'Aktif' : 'Pasif'}
                </Button>
              </div>

              {/* Screen Reader */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <span className="text-sm font-medium">Ekran Okuyucu</span>
                </div>
                <Button
                  variant={screenReader ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setScreenReader(!screenReader)}
                  className="w-full justify-start"
                >
                  {screenReader && <Check className="h-4 w-4 mr-2" />}
                  {screenReader ? 'Aktif' : 'Pasif'}
                </Button>
              </div>

              {/* Reset Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setHighContrast(false)
                  setReducedMotion(false)
                  setFontSize('medium')
                  setScreenReader(false)
                }}
                className="w-full"
              >
                Sıfırla
              </Button>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
