import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from './components/LandingPage'
import AppView from './components/AppView'
import type { Theme } from './types'

type Page = 'landing' | 'app'

const getInitialTheme = (): Theme => {
  const saved = localStorage.getItem('decision-prioritiser-theme')
  if (saved === 'dark' || saved === 'light') return saved

  return window.matchMedia('(prefers-color-scheme: light)').matches
    ? 'light'
    : 'dark'
}

export default function App() {
  const [page, setPage] = useState<Page>('landing')
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('decision-prioritiser-theme', theme)
  }, [theme])

  const toggleTheme = () =>
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return (
    <AnimatePresence mode="wait">
      {page === 'landing' ? (
        <LandingPage
          key="landing"
          theme={theme}
          onToggleTheme={toggleTheme}
          onEnter={() => setPage('app')}
        />
      ) : (
        <AppView
          key="app"
          theme={theme}
          onToggleTheme={toggleTheme}
          onBack={() => setPage('landing')}
        />
      )}
    </AnimatePresence>
  )
}
