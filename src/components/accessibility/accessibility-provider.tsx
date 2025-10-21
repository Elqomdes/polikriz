'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  highContrast: boolean
  setHighContrast: (value: boolean) => void
  reducedMotion: boolean
  setReducedMotion: (value: boolean) => void
  fontSize: 'small' | 'medium' | 'large'
  setFontSize: (size: 'small' | 'medium' | 'large') => void
  screenReader: boolean
  setScreenReader: (value: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium')
  const [screenReader, setScreenReader] = useState(false)

  useEffect(() => {
    // Check for user's system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches
    
    setReducedMotion(prefersReducedMotion)
    setHighContrast(prefersHighContrast)

    // Apply font size from localStorage
    const savedFontSize = localStorage.getItem('accessibility-font-size') as 'small' | 'medium' | 'large'
    if (savedFontSize) {
      setFontSize(savedFontSize)
    }
  }, [])

  useEffect(() => {
    // Apply accessibility settings to document
    document.documentElement.setAttribute('data-high-contrast', highContrast.toString())
    document.documentElement.setAttribute('data-reduced-motion', reducedMotion.toString())
    document.documentElement.setAttribute('data-font-size', fontSize)
    document.documentElement.setAttribute('data-screen-reader', screenReader.toString())

    // Save font size to localStorage
    localStorage.setItem('accessibility-font-size', fontSize)
  }, [highContrast, reducedMotion, fontSize, screenReader])

  return (
    <AccessibilityContext.Provider value={{
      highContrast,
      setHighContrast,
      reducedMotion,
      setReducedMotion,
      fontSize,
      setFontSize,
      screenReader,
      setScreenReader
    }}>
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
