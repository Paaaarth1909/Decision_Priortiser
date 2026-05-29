import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion'
import type { FactorId } from '../types'
import { useTaskReducer } from '../hooks/useTaskReducer'
import AppHeader from './AppHeader'
import AddTask from './AddTask'
import RecommendationCard from './RecommendationCard'
import TaskCard from './TaskCard'
import WeightsPanel from './WeightsPanel'
import ExportBar from './ExportBar'
import type { Theme } from '../types'

interface AppViewProps {
  theme: Theme
  onToggleTheme: () => void
  onBack: () => void
}

export default function AppView({
  theme,
  onToggleTheme,
  onBack,
}: AppViewProps) {
  const { state, dispatch, rankedTasks } = useTaskReducer()

  const handleAddTask = (name: string) => dispatch({ type: 'ADD_TASK', name })

  const handleDeleteTask = (id: number) =>
    dispatch({ type: 'DELETE_TASK', id })

  const handleUpdateFactor = (id: number, factor: FactorId, value: number) =>
    dispatch({ type: 'UPDATE_FACTOR', id, factor, value })

  const handleUpdateWeight = (factor: FactorId, value: number) =>
    dispatch({ type: 'UPDATE_WEIGHT', factor, value })

  const top = rankedTasks[0] ?? null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ minHeight: '100vh', paddingBottom: '6rem' }}
    >
      <AppHeader
        theme={theme}
        onToggleTheme={onToggleTheme}
        onBack={onBack}
      />

      <div
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: '0 2.5rem',
        }}
      >
        <AddTask onAdd={handleAddTask} />

        <WeightsPanel weights={state.weights} onUpdate={handleUpdateWeight} />

        <RecommendationCard top={top} />

        {/* Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            margin: '1rem 0 2.5rem',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--text3)',
          }}
        >
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
          All tasks
          <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        </div>

        {/* Task list header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text3)',
            }}
          >
            Ranked by score
          </span>
          {rankedTasks.length > 0 && (
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {rankedTasks.length} task{rankedTasks.length > 1 ? 's' : ''}
            </span>
          )}
        </div>

        {/* Tasks */}
        {rankedTasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p
              style={{
                fontFamily: 'Instrument Serif, serif',
                fontSize: '1.4rem',
                color: 'var(--text3)',
                fontStyle: 'italic',
                marginBottom: '0.5rem',
              }}
            >
              Nothing queued yet.
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--text3)' }}>
              Add a task above to begin scoring.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {rankedTasks.map((task, i) => (
              <TaskCard
                key={task.id}
                task={task}
                rank={i + 1}
                isTop={i === 0}
                onDelete={handleDeleteTask}
                onUpdateFactor={handleUpdateFactor}
              />
            ))}
          </AnimatePresence>
        )}
      </div>

      <ExportBar tasks={rankedTasks} />
    </motion.div>
  )
}
