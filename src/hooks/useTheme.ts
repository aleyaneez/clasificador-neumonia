import { useCallback, useState } from 'react'
import type { Theme } from '../types'

const THEME_KEY = 'pneumoscan-theme'

function loadTheme(): Theme {
  return (localStorage.getItem(THEME_KEY) as Theme) || 'system'
}

function applyToDOM(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'light') {
    root.classList.add('light')
    root.classList.remove('dark')
  } else if (theme === 'dark') {
    root.classList.add('dark')
    root.classList.remove('light')
  } else {
    root.classList.remove('light', 'dark')
  }
  localStorage.setItem(THEME_KEY, theme)
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    const t = loadTheme()
    applyToDOM(t)
    return t
  })

  const setTheme = useCallback((t: Theme) => {
    applyToDOM(t)
    setThemeState(t)
  }, [])

  return { theme, setTheme }
}
