'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Share2, 
  Link, 
  Copy, 
  QrCode,
  X,
  Check,
  Calendar,
  Eye,
  Lock
} from 'lucide-react'
import { motion } from 'framer-motion'

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  data?: unknown
  title?: string
}

const shareOptions = [
  {
    id: 'public',
    name: 'Herkese Açık',
    description: 'Herkes bu bağlantıyı görebilir',
    icon: Eye,
    color: 'text-green-600'
  },
  {
    id: 'private',
    name: 'Özel',
    description: 'Sadece sizin erişebileceğiniz bağlantı',
    icon: Lock,
    color: 'text-red-600'
  },
  {
    id: 'password',
    name: 'Şifreli',
    description: 'Şifre ile korumalı bağlantı',
    icon: Lock,
    color: 'text-orange-600'
  }
]

const expirationOptions = [
  { value: '1h', label: '1 Saat' },
  { value: '24h', label: '1 Gün' },
  { value: '7d', label: '1 Hafta' },
  { value: '30d', label: '1 Ay' },
  { value: 'never', label: 'Süresiz' }
]

export function ShareModal({ isOpen, onClose, title = 'Paylaşım' }: ShareModalProps) {
  const [selectedOption, setSelectedOption] = useState('public')
  const [expiration, setExpiration] = useState('7d')
  const [password, setPassword] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    if (isOpen) {
      generateLink()
    }
  }, [isOpen, selectedOption, expiration, password])

  const generateLink = async () => {
    setIsGenerating(true)
    
    // Simulate link generation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const baseUrl = window.location.origin
    const linkId = Math.random().toString(36).substring(2, 15)
    const newLink = `${baseUrl}/shared/${linkId}`
    
    setGeneratedLink(newLink)
    setIsGenerating(false)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink)
      setIsCopied(true)
      setTimeout(() => setIsCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const generateQRCode = () => {
    // In a real app, this would generate a QR code
    console.log('QR Code for:', generatedLink)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-lg mx-4"
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl flex items-center gap-2">
                <Share2 className="h-5 w-5" />
                {title}
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Share Options */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Paylaşım Türü</h3>
              <div className="space-y-3">
                {shareOptions.map((option) => {
                  const Icon = option.icon
                  return (
                    <Button
                      key={option.id}
                      variant={selectedOption === option.id ? 'default' : 'outline'}
                      className="w-full justify-start h-auto p-4"
                      onClick={() => setSelectedOption(option.id)}
                    >
                      <Icon className={`h-5 w-5 mr-3 ${selectedOption === option.id ? 'text-white' : option.color}`} />
                      <div className="text-left">
                        <div className="font-medium">{option.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Password Field */}
            {selectedOption === 'password' && (
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Şifre
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Şifre girin"
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                />
              </div>
            )}

            {/* Expiration */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Süre Sınırı
              </h3>
              <select
                value={expiration}
                onChange={(e) => setExpiration(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
              >
                {expirationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Generated Link */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Paylaşım Bağlantısı</h3>
              {isGenerating ? (
                <div className="flex items-center justify-center p-4 border rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent mr-2" />
                  <span>Bağlantı oluşturuluyor...</span>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 bg-secondary-50 dark:bg-secondary-800 rounded-lg">
                    <Link className="h-4 w-4 text-muted-foreground" />
                    <span className="flex-1 text-sm font-mono break-all">
                      {generatedLink}
                    </span>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                      className="flex-1"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Kopyalandı
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Kopyala
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={generateQRCode}
                    >
                      <QrCode className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Share Summary */}
            <div className="bg-secondary-50 dark:bg-secondary-800 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Paylaşım Özeti</h4>
              <div className="text-sm space-y-1">
                <div>Tür: <span className="font-medium">
                  {shareOptions.find(opt => opt.id === selectedOption)?.name}
                </span></div>
                <div>Süre: <span className="font-medium">
                  {expirationOptions.find(opt => opt.value === expiration)?.label}
                </span></div>
                <div>Durum: <span className="font-medium text-green-600">Aktif</span></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Kapat
              </Button>
              <Button 
                onClick={copyToClipboard}
                disabled={isGenerating}
                className="flex-1"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Paylaş
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
