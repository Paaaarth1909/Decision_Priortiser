# Decision Prioritiser

This project is a smart productivity application that helps users decide which task to work on next by scoring tasks across practical decision factors.

The system uses a weighted scoring engine to rank tasks based on impact, urgency, learning value, risk of delay, and required energy. The frontend is built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

---

# Overview

Decision Prioritiser is designed to reduce decision paralysis by turning a messy task list into a clear ranked queue.

Users can add tasks, score each task across five factors, adjust the importance of each factor, and instantly see the best task to focus on next.

The application stores data locally in the browser, so no login, backend, or database setup is required.

---

# Technologies Used

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- localStorage

---

# Core Concepts Used

## Weighted Task Scoring

Each task is evaluated using five scoring factors:

- impact
- urgency
- learning value
- risk of delay
- energy required

Each factor receives a score from 1 to 5.

The final score is calculated using configurable weights:

```text
weighted_score = (
  impact x impact_weight +
  urgency x urgency_weight +
  learning x learning_weight +
  risk x risk_weight +
  energy x energy_weight
) / total_weight
```

---

# Local Storage

Tasks, factor scores, scoring weights, and the next task ID are stored in browser `localStorage`.

Stored data includes:

- task ID
- task name
- factor scores
- scoring weights
- next available task ID

This keeps the app lightweight and fully usable without a backend.

---

# Ranking Logic

The ranking system computes task scores and sorts the task list from highest score to lowest score.

## Derived State

The ranked list is derived from the stored task state instead of being saved separately.

This keeps the app predictable:

- tasks are stored once
- scores are recalculated when tasks or weights change
- ranking updates automatically after slider changes
- no duplicate ranking state needs to be managed

---

# Theme Switching

The application supports both dark mode and light mode.

The selected theme is saved in `localStorage`, so the user's preference remains active after refreshing the page.

Theme colors are controlled through CSS variables, which makes the UI switch cleanly between both modes.

---

# Workflow

## Step 1 - Open the Tool

- Start from the landing page
- Enter the main prioritisation workspace
- Switch between dark and light mode if needed

## Step 2 - Add Tasks

- Enter a task name
- Add it to the task queue
- The task appears in the ranked list

## Step 3 - Score Tasks

- Expand a task card
- Adjust the factor sliders
- Update impact, urgency, learning, risk, and energy values

## Step 4 - Adjust Weights

- Open the scoring weights panel
- Change how important each factor is
- Recalculate all task rankings instantly

## Step 5 - View Recommendation

- The highest-ranked task is shown as the recommended next action
- The score and reasoning update automatically

## Step 6 - Export Ranked List

- Copy the ranked list to the clipboard
- Use the output in notes, task managers, or planning documents

---

# Project Structure

```bash
decision-prioritiser/
│
├── public/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── AddTask.tsx
│   │   ├── AppHeader.tsx
│   │   ├── AppView.tsx
│   │   ├── ExportBar.tsx
│   │   ├── LandingPage.tsx
│   │   ├── RecommendationCard.tsx
│   │   ├── TaskCard.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WeightsPanel.tsx
│   │
│   ├── hooks/
│   │   └── useTaskReducer.ts
│   │
│   ├── types/
│   │   └── index.ts
│   │
│   ├── utils/
│   │   └── scoring.ts
│   │
│   ├── App.tsx
│   ├── constants.ts
│   ├── index.css
│   └── main.tsx
│
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

# Running the Project

## Setup

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

The frontend runs on the Vite development URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Build for Production

```bash
npm run build
```

## Preview Production Build

```bash
npm run preview
```

---

# Key Features

- Adds and ranks tasks
- Scores tasks using five decision factors
- Allows custom factor weights
- Shows the recommended next task
- Explains why a task is recommended
- Supports dark and light mode
- Saves tasks and theme preference locally
- Copies the ranked task list to the clipboard
- Uses smooth animations and transitions
- Works without authentication or a backend

---

# Key Learnings

This project helped in understanding:

- React state management with reducer patterns
- Derived state for ranking and scoring
- Weighted scoring formulas
- Browser localStorage persistence
- Theme switching with CSS variables
- Component-based UI design
- Type-safe frontend development with TypeScript
- Building a focused productivity workflow

---

# Notes

- The scoring algorithm is intentionally simple and explainable.
- All task data is stored locally in the browser.
- Clearing browser storage will remove saved tasks and preferences.
- The app does not require a server after the frontend is loaded.
- The ranking can be extended with more factors or tie-breaking rules.

---

# Author

Parthsaarthie Sharma
