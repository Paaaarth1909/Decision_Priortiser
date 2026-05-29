import type { Theme } from '../types'
import ThemeToggle from './ThemeToggle'

interface AppHeaderProps {
  theme: Theme
  onToggleTheme: () => void
  onBack: () => void
}

export default function AppHeader({
  theme,
  onToggleTheme,
  onBack,
}: AppHeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem 2.5rem',
        borderBottom: '1px solid var(--border)',
        position: 'sticky',
        top: 0,
        background: 'var(--header-bg)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 100,
      }}
    >
      <div
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: '1.2rem',
          color: 'var(--text)',
          letterSpacing: '-0.01em',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: 'var(--accent)',
            display: 'inline-block',
          }}
        />
        Decision Prioritiser
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: '1px solid var(--border)',
            color: 'var(--text2)',
            padding: '0.45rem 1rem',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.8rem',
            borderRadius: 100,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLButtonElement).style.color = 'var(--text)'
            ;(e.target as HTMLButtonElement).style.background = 'var(--bg2)'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLButtonElement).style.color = 'var(--text2)'
            ;(e.target as HTMLButtonElement).style.background = 'transparent'
          }}
      >
          ← Back
        </button>
      </div>
    </header>
  )
}
