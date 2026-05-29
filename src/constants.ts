import type { FactorMeta, Weights, AppState } from './types'

export const FACTORS: FactorMeta[] = [
  {
    id: 'impact',
    label: 'Impact',
    desc: 'How much does this move the needle?',
    defaultWeight: 3,
  },
  {
    id: 'urgency',
    label: 'Urgency',
    desc: 'How time-sensitive is this?',
    defaultWeight: 2,
  },
  {
    id: 'learning',
    label: 'Learning value',
    desc: 'What will you grow from this?',
    defaultWeight: 2,
  },
  {
    id: 'risk',
    label: 'Risk of delay',
    desc: 'What breaks if you skip this today?',
    defaultWeight: 1,
  },
  {
    id: 'energy',
    label: 'Energy required',
    desc: 'How much effort does this demand?',
    defaultWeight: 1,
  },
]

export const DEFAULT_WEIGHTS: Weights = {
  impact: 3,
  urgency: 2,
  learning: 2,
  risk: 1,
  energy: 1,
}

export const INITIAL_STATE: AppState = {
  tasks: [],
  weights: DEFAULT_WEIGHTS,
  nextId: 1,
}

export const STORAGE_KEY = 'dp_state_v2'
