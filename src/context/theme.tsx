import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeState] = useState<Theme | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? Theme.Dark : Theme.Light
    setTheme(stored || preferred)
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.toggle('dark', theme === 'dark')
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  const toggleTheme = () => {
    setThemeState((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light))
  }

  const setTheme = (theme: Theme) => {
    setThemeState(theme)
  }

  return <ThemeContext.Provider value={{ theme: theme || Theme.Light, toggleTheme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
