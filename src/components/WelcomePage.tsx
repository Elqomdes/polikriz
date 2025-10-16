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
