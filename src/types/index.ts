// ─── Factor IDs ────────────────────────────────────────────────────────────────
export type FactorId = 'impact' | 'urgency' | 'learning' | 'risk' | 'energy'

export type Theme = 'dark' | 'light'

// ─── Factor meta (label, description, default weight) ──────────────────────────
export interface FactorMeta {
  id: FactorId
  label: string
  desc: string
  defaultWeight: number
}

// ─── Per-task factor scores (1–5) ──────────────────────────────────────────────
export type FactorScores = Record<FactorId, number>

// ─── Weights map ───────────────────────────────────────────────────────────────
export type Weights = Record<FactorId, number>

// ─── A single task in state ────────────────────────────────────────────────────
export interface Task extends FactorScores {
  id: number
  name: string
}

// ─── Task with computed score (derived, never stored) ──────────────────────────
export interface RankedTask extends Task {
  score: number
}

// ─── App state (persisted to localStorage) ─────────────────────────────────────
export interface AppState {
  tasks: Task[]
  weights: Weights
  nextId: number
}

// ─── Reducer actions ───────────────────────────────────────────────────────────
export type Action =
  | { type: 'ADD_TASK'; name: string }
  | { type: 'DELETE_TASK'; id: number }
  | { type: 'UPDATE_FACTOR'; id: number; factor: FactorId; value: number }
  | { type: 'UPDATE_WEIGHT'; factor: FactorId; value: number }
  | { type: 'LOAD_STATE'; state: AppState }
