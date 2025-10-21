'use client'

import { useState } from 'react'
import { useI18n } from '@/components/i18n-provider'
import { Button } from '@/components/ui/button'
import { 
  Menu, 
  X, 
  BarChart3, 
  Cpu, 
  Database, 
  Info,
  Globe,
  Moon,
  Sun
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export function Navigation() {
  const { t, language, setLanguage } = useI18n()
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: t('nav.home'), href: '/', icon: BarChart3 },
    { name: t('nav.dashboard'), href: '/dashboard', icon: Database },
    { name: t('nav.simulation'), href: '/simulation', icon: Cpu },
    { name: t('nav.data'), href: '/data', icon: Database },
    { name: 'Test DB', href: '/test-db', icon: Database },
    { name: t('nav.about'), href: '/about', icon: Info },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Polikriz
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              )
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
              className="hidden sm:flex"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'tr' ? 'EN' : 'TR'}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t"
            >
              <div className="py-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </a>
                  )
                })}
                
                {/* Mobile Language Toggle */}
                <div className="px-4 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
                    className="w-full justify-start"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    {language === 'tr' ? 'English' : 'Türkçe'}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

