'use client'

import { BarChart3, Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {

  const footerLinks = {
    platform: [
      { name: 'Dashboard', href: '/dashboard' },
      { name: 'Simülasyon Stüdyosu', href: '/simulation' },
      { name: 'Veri Merkezi', href: '/data' },
      { name: 'API Dokümantasyonu', href: '/api-docs' },
    ],
    resources: [
      { name: 'Kullanım Kılavuzu', href: '/guide' },
      { name: 'Örnek Veriler', href: '/examples' },
      { name: 'Tutorial', href: '/tutorial' },
      { name: 'SSS', href: '/faq' },
    ],
    support: [
      { name: 'İletişim', href: '/contact' },
      { name: 'Hata Bildir', href: '/bug-report' },
      { name: 'Özellik İsteği', href: '/feature-request' },
      { name: 'Topluluk', href: '/community' },
    ],
  }

  const socialLinks = [
    { name: 'GitHub', href: '#', icon: Github },
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Email', href: 'mailto:info@polikriz.com', icon: Mail },
  ]

  return (
    <footer className="bg-secondary-50 dark:bg-secondary-900 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">
                Polikriz Platform
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Çok boyutlu kriz göstergelerini analiz eden etkileşimli platform. 
              Ülkelerin ekonomi, enerji, çevre, sağlık ve demografi göstergelerini 
              tek bir platformda inceleyin.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Platform Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Platform
            </h3>
            <ul className="space-y-2">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Kaynaklar
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Destek
            </h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t mt-8 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 Polikriz Platform. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Gizlilik Politikası
              </a>
              <a
                href="/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Kullanım Şartları
              </a>
              <a
                href="/license"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Lisans
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

