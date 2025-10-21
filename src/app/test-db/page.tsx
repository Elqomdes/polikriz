'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'

export default function TestDbPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ 
    success: boolean; 
    data?: { 
      connection: string; 
      insert: string; 
      read: string; 
      cleanup: string; 
    }; 
    error?: string; 
    message?: string; 
  } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const testConnection = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/test-db')
      const data = await response.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Bilinmeyen hata')
      }
    } catch (err) {
      setError('Bağlantı hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setIsLoading(false)
    }
  }

  const seedDatabase = async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      const data = await response.json()
      
      if (data.success) {
        setResult(data)
      } else {
        setError(data.error || 'Bilinmeyen hata')
      }
    } catch (err) {
      setError('Seed hatası: ' + (err instanceof Error ? err.message : 'Bilinmeyen hata'))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">MongoDB Bağlantı Testi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-4">
                MongoDB bağlantısını test etmek için aşağıdaki butona tıklayın.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={testConnection} 
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Test Ediliyor...
                    </>
                  ) : (
                    'MongoDB Bağlantısını Test Et'
                  )}
                </Button>
                <Button 
                  onClick={seedDatabase} 
                  disabled={isLoading}
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Seed Ediliyor...
                    </>
                  ) : (
                    'Veritabanını Seed Et'
                  )}
                </Button>
              </div>
            </div>

            {result && (
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Bağlantı Başarılı!
                    </span>
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300">
                    <p><strong>Mesaj:</strong> {result.message}</p>
                    {result.data && (
                      <div className="mt-2">
                        <strong>Test Sonuçları:</strong>
                        <ul className="list-disc list-inside mt-1">
                          <li>Bağlantı: {result.data.connection}</li>
                          <li>Veri Ekleme: {result.data.insert}</li>
                          <li>Veri Okuma: {result.data.read}</li>
                          <li>Temizlik: {result.data.cleanup}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {error && (
              <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span className="font-semibold text-red-800 dark:text-red-200">
                      Bağlantı Hatası
                    </span>
                  </div>
                  <div className="text-sm text-red-700 dark:text-red-300">
                    {error}
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="text-xs text-muted-foreground">
              <p><strong>MongoDB URI:</strong> mongodb+srv://mey4249:***@polikrizdatabase.uekezsx.mongodb.net/</p>
              <p><strong>Database:</strong> polikriz_platform</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
