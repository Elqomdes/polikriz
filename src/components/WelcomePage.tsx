"use client";

import Link from "next/link";

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Polikriz
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
            Küresel risk analizi ve kriz yönetimi platformu
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
            Senaryo tabanlı oyun teorisi görselleştirme ve karar desteği ile 
            karmaşık kriz durumlarını analiz edin ve stratejik kararlar alın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-8 py-3 text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Üyelik Başvurusu Yap
            </Link>
            <Link
              href="/auth/signin"
              className="inline-flex items-center justify-center rounded-md border border-indigo-600 text-indigo-600 px-8 py-3 text-lg font-medium hover:bg-indigo-50 transition-colors"
            >
              Giriş Yap
            </Link>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Polikriz Nasıl Çalışır?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Karmaşık kriz durumlarını analiz etmek için bilimsel yöntemler ve oyun teorisi modellerini kullanır
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Veri Toplama ve Analiz
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-semibold text-indigo-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Gerçek Zamanlı Veri Entegrasyonu</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Finansal piyasalar, jeopolitik olaylar, ekonomik göstergeler ve sosyal medya verilerini toplar
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-semibold text-indigo-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Oyun Teorisi Modelleri</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Prisoner's Dilemma, Stag Hunt, Brinkmanship gibi modellerle stratejik etkileşimleri analiz eder
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-1">
                    <span className="text-sm font-semibold text-indigo-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Senaryo Simülasyonu</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      Farklı kriz senaryolarını simüle ederek olası sonuçları ve etkileşimleri öngörür
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mb-4">
                  <svg className="h-12 w-12 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Akıllı Analiz Motoru</h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Makine öğrenmesi ve oyun teorisi algoritmaları ile karmaşık veri setlerini anlamlı sonuçlara dönüştürür
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Hangi Alanlarda Fayda Sağlar?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Polikriz, farklı sektörlerde stratejik karar verme süreçlerini güçlendirir
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Finansal Kurumlar
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Risk yönetimi ve portföy optimizasyonu</li>
                <li>• Piyasa volatilitesi öngörüsü</li>
                <li>• Kredi riski değerlendirmesi</li>
                <li>• Stratejik yatırım kararları</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Devlet Kurumları
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Jeopolitik risk analizi</li>
                <li>• Ulusal güvenlik stratejileri</li>
                <li>• Ekonomik politika simülasyonu</li>
                <li>• Kriz yönetimi planlaması</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Şirketler
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Stratejik planlama ve rekabet analizi</li>
                <li>• Tedarik zinciri risk yönetimi</li>
                <li>• Pazar analizi ve fırsat değerlendirmesi</li>
                <li>• Operasyonel süreç optimizasyonu</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Araştırma Kurumları
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Akademik araştırma ve modelleme</li>
                <li>• Sosyal bilimler analizi</li>
                <li>• Veri bilimi projeleri</li>
                <li>• Disiplinlerarası çalışmalar</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Kriz Yönetimi
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Erken uyarı sistemleri</li>
                <li>• Acil durum planlaması</li>
                <li>• Kaynak tahsisi optimizasyonu</li>
                <li>• Koordinasyon ve iletişim</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="h-12 w-12 bg-teal-100 dark:bg-teal-900 rounded-lg flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Hızlı Karar Verme
              </h3>
              <ul className="text-gray-600 dark:text-gray-300 text-sm space-y-2">
                <li>• Gerçek zamanlı analiz</li>
                <li>• Otomatik raporlama</li>
                <li>• Görselleştirme araçları</li>
                <li>• Mobil erişim</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Gelişmiş Analiz
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Oyun teorisi modelleri ile karmaşık kriz senaryolarını analiz edin
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Küresel Görselleştirme
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Dünya haritası üzerinde risk analizlerini görselleştirin
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
              <svg className="h-8 w-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Karar Desteği
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Veri odaklı stratejik kararlar almak için güçlü araçlar
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Hemen Başlayın
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Üyelik başvurunuzu yapın ve platformun güçlü analiz araçlarına erişim kazanın
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-8 py-3 text-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Ücretsiz Üyelik Başvurusu
          </Link>
        </div>
      </div>
    </div>
  );
}

