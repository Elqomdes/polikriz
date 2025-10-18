"use client";

import Link from "next/link";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import UserMenu from "@/components/UserMenu";
import { useSession } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Polikriz",
  description: "Polikriz: Senaryo tabanlı oyun teorisi görselleştirme ve karar desteği",
};

function HeaderContent() {
  const { data: session, status } = useSession();

  return (
    <header className="border-b border-black/10 dark:border-white/10 bg-white/70 dark:bg-black/20 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight" aria-label="Polikriz ana sayfa">Polikriz</Link>
        
        {/* Sadece giriş yapmış kullanıcılar için navigasyon menüsü */}
        {session && (
          <nav aria-label="Birincil" className="flex items-center gap-6 text-sm">
            <Link href="/" className="hover:underline">Pano</Link>
            <Link href="/countries" className="hover:underline">Ülkeler</Link>
            <Link href="/models" className="hover:underline">Modeller</Link>
            <Link href="/scenarios/new" className="hover:underline">Senaryo Sihirbazı</Link>
            <Link href="/reports" className="hover:underline">Raporlar</Link>
          </nav>
        )}
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
        <a href="#main" className="skip-to-content">İçeriğe atla</a>
        <div className="min-h-screen flex flex-col">
          <HeaderContent />
          <main id="main" className="flex-1">
            {children}
          </main>
          <footer className="border-t border-black/10 dark:border-white/10 text-xs text-black/60 dark:text-white/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between">
              <p>© {new Date().getFullYear()} Polikriz</p>
              <p>
                <span className="sr-only">Erişilebilirlik durumu</span>
                Yayın niteliğinde grafikler ve şeffaflık ilkeleri
              </p>
            </div>
          </footer>
        </div>
        </Providers>
      </body>
    </html>
  );
}
