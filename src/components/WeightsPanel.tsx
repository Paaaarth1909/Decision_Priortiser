import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Weights, FactorId } from '../types'
import { FACTORS } from '../constants'

interface WeightsPanelProps {
  weights: Weights
  onUpdate: (factor: FactorId, value: number) => void
}

export default function WeightsPanel({ weights, onUpdate }: WeightsPanelProps) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          background: 'transparent',
          border: '1px solid var(--border)',
          color: open ? 'var(--accent)' : 'var(--text3)',
          padding: '0.4rem 1rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.75rem',
          borderRadius: 100,
          cursor: 'pointer',
          transition: 'all 0.15s',
          letterSpacing: '0.04em',
        }}
      >
        ⚖ Adjust scoring weights
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                background: 'var(--bg2)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '1.5rem',
                marginTop: 10,
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text3)',
                  marginBottom: '1.2rem',
                }}
              >
                Factor weights
              </p>

              {FACTORS.map((f) => (
                <div
                  key={f.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.8rem',
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--text2)',
                      minWidth: 110,
                    }}
                  >
                    {f.label}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={1}
                    value={weights[f.id]}
                    onChange={(e) =>
                      onUpdate(f.id, Number(e.target.value))
                    }
                    style={{ flex: 1 }}
                  />
                  <span
                    style={{
                      fontSize: '0.82rem',
                      color: 'var(--accent)',
                      minWidth: 24,
                      textAlign: 'right',
                    }}
                  >
                    {weights[f.id]}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
