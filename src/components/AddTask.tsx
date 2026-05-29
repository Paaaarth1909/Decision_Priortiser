import { useState, useRef } from 'react'

interface AddTaskProps {
  onAdd: (name: string) => void
}

export default function AddTask({ onAdd }: AddTaskProps) {
  const [value, setValue] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleAdd = () => {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
    inputRef.current?.focus()
  }

  return (
    <div style={{ padding: '3rem 0 2rem' }}>
      <p
        style={{
          fontSize: 11,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--text3)',
          marginBottom: '1rem',
        }}
      >
        What are you working on?
      </p>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          maxLength={80}
          placeholder="e.g. Build portfolio, Practice DSA, Apply for jobs…"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          style={{
            flex: 1,
            background: 'var(--bg2)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            color: 'var(--text)',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.95rem',
            padding: '0.8rem 1.2rem',
            outline: 'none',
            transition: 'border-color 0.15s',
          }}
          onFocus={(e) =>
            ((e.target as HTMLInputElement).style.borderColor = 'var(--border2)')
          }
          onBlur={(e) =>
            ((e.target as HTMLInputElement).style.borderColor = 'var(--border)')
          }
        />
        <button
          onClick={handleAdd}
          style={{
            background: 'var(--accent)',
            color: 'var(--button-text)',
            border: 'none',
            borderRadius: 12,
            padding: '0.8rem 1.4rem',
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.85rem',
            fontWeight: 500,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'opacity 0.15s, transform 0.1s',
          }}
          onMouseEnter={(e) =>
            ((e.target as HTMLButtonElement).style.opacity = '0.85')
          }
          onMouseLeave={(e) =>
            ((e.target as HTMLButtonElement).style.opacity = '1')
          }
        >
          Add task
        </button>
      </div>
    </div>
  )
}
