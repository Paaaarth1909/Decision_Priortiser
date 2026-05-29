import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RankedTask, FactorId } from '../types'
import { FACTORS } from '../constants'

interface TaskCardProps {
  task: RankedTask
  rank: number
  isTop: boolean
  onDelete: (id: number) => void
  onUpdateFactor: (id: number, factor: FactorId, value: number) => void
}

export default function TaskCard({
  task,
  rank,
  isTop,
  onDelete,
  onUpdateFactor,
}: TaskCardProps) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        background: isTop ? 'var(--rec)' : 'var(--bg2)',
        border: `1px solid ${isTop ? 'var(--rec-border)' : 'var(--border)'}`,
        borderRadius: 16,
        marginBottom: 10,
        overflow: 'hidden',
        transition: 'border-color 0.3s, background 0.3s',
      }}
    >
      {/* Header row */}
      <div
        onClick={() => setOpen((o) => !o)}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '1rem 1.4rem',
          cursor: 'pointer',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: 'Instrument Serif, serif',
            fontSize: '1.1rem',
            color: isTop ? 'var(--accent)' : 'var(--text3)',
            minWidth: '1.4rem',
            transition: 'color 0.3s',
          }}
        >
          {rank}
        </span>

        <span
          style={{
            flex: 1,
            fontSize: '0.92rem',
            color: 'var(--text)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
          }}
        >
          {task.name}
        </span>

        <span
          style={{
            fontSize: '0.78rem',
            color: isTop ? 'var(--accent)' : 'var(--accent2)',
            background: isTop
              ? 'var(--accent-soft-strong)'
              : 'var(--accent-soft)',
            border: `1px solid ${
              isTop
                ? 'var(--accent-soft-border-strong)'
                : 'var(--accent-soft-border)'
            }`,
            borderRadius: 100,
            padding: '3px 10px',
            fontWeight: 500,
            minWidth: 44,
            textAlign: 'center',
            transition: 'all 0.3s',
          }}
        >
          {task.score.toFixed(1)}
        </span>

        <span
          style={{
            color: 'var(--text3)',
            fontSize: '0.9rem',
            transition: 'transform 0.25s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          ▾
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation()
            onDelete(task.id)
          }}
          title="Remove"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text3)',
            cursor: 'pointer',
            padding: '4px 6px',
            fontSize: '0.9rem',
            borderRadius: 6,
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            ;(e.target as HTMLButtonElement).style.color = 'var(--danger)'
            ;(e.target as HTMLButtonElement).style.background =
              'var(--danger-bg)'
          }}
          onMouseLeave={(e) => {
            ;(e.target as HTMLButtonElement).style.color = 'var(--text3)'
            ;(e.target as HTMLButtonElement).style.background = 'transparent'
          }}
        >
          ✕
        </button>
      </div>

      {/* Sliders panel */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="sliders"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.4rem 1.4rem',
                borderTop: '1px solid var(--border)',
              }}
            >
              {FACTORS.map((f, idx) => (
                <div
                  key={f.id}
                  style={{
                    padding: '0.8rem 0',
                    borderBottom:
                      idx < FACTORS.length - 1
                        ? '1px solid var(--border)'
                        : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <div>
                      <span
                        style={{
                          fontSize: '0.8rem',
                          color: 'var(--text2)',
                          fontWeight: 400,
                        }}
                      >
                        {f.label}
                      </span>
                      <span
                        style={{ fontSize: '0.72rem', color: 'var(--text3)' }}
                      >
                        {' '}
                        — {f.desc}
                      </span>
                    </div>
                    <span
                      style={{
                        fontSize: '0.85rem',
                        color: 'var(--accent)',
                        fontFamily: 'Instrument Serif, serif',
                        minWidth: '1rem',
                        textAlign: 'right',
                      }}
                    >
                      {task[f.id]}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={task[f.id]}
                    onChange={(e) =>
                      onUpdateFactor(task.id, f.id, Number(e.target.value))
                    }
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
