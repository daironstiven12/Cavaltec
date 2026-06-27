import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const ThemeContext = createContext(null)

const THEMES = {
  light: {
    '--color-bg': '#ffffff',
    '--color-bg-secondary': '#f8fafc',
    '--color-bg-tertiary': '#f1f5f9',
    '--color-bg-accent': '#eff6ff',
    '--color-bg-dark': '#0a1628',
    '--color-border': '#e2e8f0',
    '--color-border-light': '#f1f5f9',
    '--color-border-hover': '#94a3b8',
    '--color-text-primary': '#0a1628',
    '--color-text-secondary': '#475569',
    '--color-text-tertiary': '#94a3b8',
    '--color-text-inverse': '#ffffff',
    '--color-shadow': 'rgba(0,0,0,0.05)',
  },
  dark: {
    '--color-bg': '#0f172a',
    '--color-bg-secondary': '#1e293b',
    '--color-bg-tertiary': '#334155',
    '--color-bg-accent': '#1e3a5f',
    '--color-bg-dark': '#020617',
    '--color-border': '#334155',
    '--color-border-light': '#1e293b',
    '--color-border-hover': '#475569',
    '--color-text-primary': '#f1f5f9',
    '--color-text-secondary': '#94a3b8',
    '--color-text-tertiary': '#64748b',
    '--color-text-inverse': '#0a1628',
    '--color-shadow': 'rgba(0,0,0,0.3)',
  },
}

function getStoredTheme() {
  try {
    return localStorage.getItem('cavaltec-theme') || 'light'
  } catch {
    return 'light'
  }
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getStoredTheme)
  const isDark = theme === 'dark'

  useEffect(() => {
    const root = document.documentElement
    const vars = THEMES[theme]
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    root.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('cavaltec-theme', theme)
    } catch { /* ignore */ }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
