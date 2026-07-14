import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const stored = window.localStorage.getItem('tf-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  const [colorTheme, setColorTheme] = useState(() => {
    if (typeof window === 'undefined') return 'default'
    return window.localStorage.getItem('tf-color') || 'default'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    window.localStorage.setItem('tf-theme', theme)
  }, [theme])

  useEffect(() => {
    const root = document.documentElement
    if (colorTheme === 'default') {
      root.removeAttribute('data-theme')
    } else {
      root.setAttribute('data-theme', colorTheme)
    }
    window.localStorage.setItem('tf-color', colorTheme)
  }, [colorTheme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, colorTheme, setColorTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
