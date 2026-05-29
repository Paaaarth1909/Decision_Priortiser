import type { RankedTask } from '../types'
import { FACTORS } from '../constants'

/**
 * Generate a human-readable reason string for the top recommendation.
 */
export function reasonText(task: RankedTask): string {
  const pairs = FACTORS.map((f) => ({
    value: task[f.id],
    label:
      f.id === 'impact'
        ? 'high impact'
        : f.id === 'urgency'
          ? 'urgent'
          : f.id === 'learning'
            ? 'strong learning'
            : f.id === 'risk'
              ? 'high risk of delay'
              : 'manageable effort',
  }))

  const top = pairs.filter((p) => p.value >= 4).map((p) => p.label)

  if (top.length === 0) return 'Balanced across all factors.'
  if (top.length === 1) return `Stands out for ${top[0]}.`
  return top.slice(0, -1).join(', ') + ' and ' + top[top.length - 1] + '.'
}

/**
 * Export ranked list as a plain-text string.
 */
export function exportText(tasks: RankedTask[]): string {
  return tasks
    .map(
      (t, i) =>
        `${i + 1}. ${t.name} — score ${t.score.toFixed(1)}\n   ${reasonText(t)}`
    )
    .join('\n\n')
}
