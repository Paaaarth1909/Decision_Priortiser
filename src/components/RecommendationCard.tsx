import { motion, AnimatePresence } from 'framer-motion'
import type { RankedTask } from '../types'
import { reasonText } from '../utils/scoring'

interface RecommendationCardProps {
  top: RankedTask | null
}

function ScoreBars({ score }: { score: number }) {
  const heights = [10, 16, 22, 30, 40]
  const filled = Math.round((score / 5) * 5)
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end' }}>
      {heights.map((h, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: h,
            borderRadius: 2,
            background: 'var(--accent)',
            opacity: i < filled ? 1 : 0.18,
            transition: 'opacity 0.4s ease',
          }}
        />
      ))}
    </div>
  )
}

export default function RecommendationCard({ top }: RecommendationCardProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <AnimatePresence mode="wait">
        {top ? (
          <motion.div
            key={top.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              background: 'var(--rec)',
              border: '1px solid var(--rec-border)',
              borderRadius: 20,
              padding: 'clamp(1.5rem, 4vw, 2.5rem)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient glow */}
            <div
              style={{
                position: 'absolute',
                top: -60,
                right: -60,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background:
                  'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <p
              style={{
                fontSize: 10,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--accent2)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {/* Pulse dot */}
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  display: 'inline-block',
                  boxShadow: '0 0 8px var(--accent-glow-strong)',
                }}
              />
              Recommended next
            </p>

            <motion.h2
              layout
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: 'var(--text)',
                lineHeight: 1.2,
                marginBottom: '0.8rem',
                fontWeight: 400,
              }}
            >
              {top.name}
            </motion.h2>

            <p
              style={{
                fontSize: '0.9rem',
                color: 'var(--text2)',
                fontWeight: 300,
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              {reasonText(top)}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                flexWrap: 'wrap',
              }}
            >
              <span
                style={{
                  fontFamily: 'Instrument Serif, serif',
                  fontSize: '2.2rem',
                  color: 'var(--accent)',
                }}
              >
                {top.score.toFixed(1)}
              </span>
              <ScoreBars score={top.score} />
              <span style={{ fontSize: '0.78rem', color: 'var(--text3)' }}>
                out of 5
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              background: 'var(--rec)',
              border: '1px solid var(--border)',
              borderRadius: 20,
              padding: '2rem 2.5rem',
            }}
          >
            <p
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '1.4rem',
                color: 'var(--text3)',
                fontStyle: 'italic',
              }}
            >
              Add a task to get your first recommendation.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
