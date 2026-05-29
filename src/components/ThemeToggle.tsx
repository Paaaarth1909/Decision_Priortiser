import type { Theme } from '../types'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--bg2)',
        border: '1px solid var(--border)',
        color: 'var(--text2)',
        padding: '0.45rem 0.8rem',
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.78rem',
        borderRadius: 100,
        cursor: 'pointer',
        letterSpacing: '0.02em',
        transition: 'color 0.15s, background 0.15s, border-color 0.15s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor =
          'var(--border2)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--text2)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor =
          'var(--border)'
      }}
    >
      <span aria-hidden="true">{isDark ? '☀' : '☾'}</span>
      {isDark ? 'Light' : 'Dark'}
    </button>
  )
}
