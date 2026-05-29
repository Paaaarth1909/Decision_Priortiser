import { useReducer, useEffect, useMemo } from 'react'
import type { AppState, Action, RankedTask, Task } from '../types'
import { FACTORS, INITIAL_STATE, STORAGE_KEY } from '../constants'

// ─── Scoring formula ───────────────────────────────────────────────────────────
function computeScore(task: Task, weights: AppState['weights']): number {
  const total = Object.values(weights).reduce((a, b) => a + b, 0) || 9
  const raw =
    task.impact * weights.impact +
    task.urgency * weights.urgency +
    task.learning * weights.learning +
    task.risk * weights.risk +
    task.energy * weights.energy
  return Math.round((raw / total) * 100) / 100
}

// ─── Default scores for a new task ────────────────────────────────────────────
function defaultScores() {
  return Object.fromEntries(FACTORS.map((f) => [f.id, 3])) as Pick<
    Task,
    'impact' | 'urgency' | 'learning' | 'risk' | 'energy'
  >
}

// ─── Reducer ──────────────────────────────────────────────────────────────────
function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOAD_STATE':
      return action.state

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          { id: state.nextId, name: action.name, ...defaultScores() },
        ],
        nextId: state.nextId + 1,
      }

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((t) => t.id !== action.id),
      }

    case 'UPDATE_FACTOR':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, [action.factor]: action.value } : t
        ),
      }

    case 'UPDATE_WEIGHT':
      return {
        ...state,
        weights: { ...state.weights, [action.factor]: action.value },
      }

    default:
      return state
  }
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTaskReducer() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as AppState
        dispatch({ type: 'LOAD_STATE', state: { ...INITIAL_STATE, ...parsed } })
      }
    } catch {
      /* ignore */
    }
  }, [])

  // Persist on every state change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* ignore */
    }
  }, [state])

  // Derived: sorted ranked tasks
  const rankedTasks = useMemo<RankedTask[]>(
    () =>
      state.tasks
        .map((t) => ({ ...t, score: computeScore(t, state.weights) }))
        .sort((a, b) => b.score - a.score),
    [state.tasks, state.weights]
  )

  return { state, dispatch, rankedTasks }
}
