import { motion } from 'framer-motion'
import type { Theme } from '../types'
import ThemeToggle from './ThemeToggle'

interface LandingPageProps {
  theme: Theme
  onToggleTheme: () => void
  onEnter: () => void
}

export default function LandingPage({
  theme,
  onToggleTheme,
  onEnter,
}: LandingPageProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: '1.5rem',
          right: '2rem',
          zIndex: 2,
        }}
      >
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>

      {/* Ambient radial glow */}
      <div
        style={{
          position: 'absolute',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 11,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          marginBottom: '2rem',
          fontWeight: 500,
        }}
      >
        Decision Prioritiser · v1.0
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
        style={{
          fontFamily: 'Instrument Serif, serif',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          lineHeight: 1.1,
          color: 'var(--text)',
          marginBottom: '1.5rem',
          fontWeight: 400,
        }}
      >
        Stop agonising.
        <br />
        <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>
          Start doing.
        </em>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        style={{
          fontSize: '1.05rem',
          color: 'var(--text2)',
          maxWidth: 420,
          margin: '0 auto 3rem',
          fontWeight: 300,
          lineHeight: 1.7,
        }}
      >
        A weighted-scoring engine that surfaces the single best task to work
        on — based on impact, urgency, learning value, risk, and your current
        energy.
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.34 }}
        whileHover={{ y: -2, opacity: 0.88 }}
        whileTap={{ scale: 0.97 }}
        onClick={onEnter}
        style={{
          background: 'var(--accent)',
          color: 'var(--button-text)',
          border: 'none',
          padding: '0.9rem 2.5rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.9rem',
          fontWeight: 500,
          letterSpacing: '0.04em',
          borderRadius: 100,
          cursor: 'pointer',
        }}
      >
        Open the tool →
      </motion.button>

      {/* Metrics strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          display: 'flex',
          gap: '3rem',
          marginTop: '5rem',
          paddingTop: '3rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        {[
          { num: '5', label: 'scoring factors' },
          { num: '<2m', label: 'to clarity' },
          { num: '0', label: 'logins needed' },
        ].map((m) => (
          <div key={m.label} style={{ textAlign: 'center' }}>
            <span
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '2rem',
                color: 'var(--accent)',
                display: 'block',
              }}
            >
              {m.num}
            </span>
            <span
              style={{
                fontSize: 11,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text3)',
              }}
            >
              {m.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <div
          style={{
            width: 1,
            height: 24,
            background: 'var(--border2)',
            margin: '0 auto',
          }}
        />
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
          }}
        >
          enter
        </span>
      </motion.div>
    </motion.section>
  )
}
