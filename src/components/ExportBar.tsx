import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { RankedTask } from '../types'
import { exportText } from '../utils/scoring'

interface ExportBarProps {
  tasks: RankedTask[]
}

export default function ExportBar({ tasks }: ExportBarProps) {
  const [copied, setCopied] = useState(false)

  const handleExport = async () => {
    const text = exportText(tasks)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback: prompt
      window.prompt('Copy the ranked list:', text)
    }
  }

  return (
    <AnimatePresence>
      {tasks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--floating-bg)',
            border: '1px solid var(--border2)',
            borderRadius: 100,
            padding: '0.65rem 0.65rem 0.65rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.82rem',
            color: 'var(--text2)',
            boxShadow: '0 8px 32px var(--shadow)',
            zIndex: 200,
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            whiteSpace: 'nowrap',
          }}
        >
          <span>
            {tasks.length} task{tasks.length > 1 ? 's' : ''} ranked
          </span>

          <button
            onClick={handleExport}
            style={{
              background: 'var(--accent)',
              color: 'var(--button-text)',
              border: 'none',
              borderRadius: 100,
              padding: '0.45rem 1.1rem',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
          >
            {copied ? 'Copied ✓' : 'Copy ranked list'}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
