# Decision Prioritiser

A weighted-scoring productivity tool that cuts through decision paralysis by surfacing the single best task to work on — based on impact, urgency, learning value, risk of delay, and energy required.

---

## Stack

| Tech | Role |
|------|------|
| React 18 | UI framework |
| TypeScript | Type safety throughout |
| Vite | Zero-config dev server + build |
| Tailwind CSS | Utility-first styling |
| Framer Motion | Spring animations, layout transitions |
| localStorage | Local persistence, zero backend |

---

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

To build for production:

```bash
npm run build
npm run preview
```

---

## Architecture

### State — `useReducer` pattern

All state lives in a single `useReducer` call inside `useTaskReducer.ts`:

```
AppState
├── tasks[]        (id, name, impact, urgency, learning, risk, energy)
├── weights        (per-factor multipliers)
└── nextId         (monotonic counter)
```

The ranked task list is derived in a `useMemo` hook — never stored:

```ts
const rankedTasks = useMemo(() =>
  state.tasks
    .map(t => ({ ...t, score: computeScore(t, state.weights) }))
    .sort((a, b) => b.score - a.score),
  [state.tasks, state.weights]
)
```

This matches the Redux pattern without Redux — a strong interview talking point.

### Scoring formula

```
weighted_score = (
  impact  × w.impact  +
  urgency × w.urgency +
  learning× w.learning+
  risk    × w.risk    +
  energy  × w.energy
) ÷ sum(weights)
```

Default weights: `impact=3, urgency=2, learning=2, risk=1, energy=1` (sums to 9).

### Persistence

State is JSON-serialised to `localStorage` on every dispatch. Loaded once on mount. No backend, no auth.

---

## Component Tree

```
App
├── LandingPage          — minimal hero, metrics strip, CTA
└── AppView              — full application shell
    ├── AppHeader        — sticky nav with logo + back
    ├── AddTask          — text input + add button
    ├── WeightsPanel     — collapsible advanced weight sliders
    ├── RecommendationCard — animated hero card for top task
    ├── TaskCard[]       — ranked list, expandable sliders
    └── ExportBar        — sticky bottom bar, copy to clipboard
```

---

## Interview Talking Points

1. **Why `useMemo` for ranking?** Sorting only re-runs when `tasks` or `weights` change — not on every render. Prevents unnecessary O(n log n) work on slider interactions.

2. **Tie-breaking?** Tasks with equal scores retain their original insertion order (stable JS sort). Could be extended with a secondary key (e.g. insertion time).

3. **Why deterministic formula, not AI?** Externalising the calculation is the point — users can see exactly why a task is ranked where it is. An AI suggestion is a black box; this is legible.

---

## Deployment

Push to GitHub and connect to [Vercel](https://vercel.com). Set framework preset to **Vite**. Done.

---

## License

MIT
