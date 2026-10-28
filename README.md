# QUANT.OS — Gaurav Gangwani Personal Portfolio Terminal

> **Interactive Personal Portfolio disguised as a High-Frequency Trading Terminal & Digital Workspace**
> Built for Gaurav Gangwani — Computer Science & AI undergraduate at Newton School of Technology (2026–2030).

---

## ⚡ Overview

**QUANT.OS** is a cinematic, Bloomberg-inspired personal portfolio web application. Rather than presenting generic static resume cards, it leverages the technical aesthetic of a trading terminal—including real-time-feel telemetry tickers, directional slide-deck transitions, an interactive factor skill graph, modular pipeline inspectors, and a command palette (`⌘K`).

**Core Clarification**: The trading terminal theme is strictly an artistic interaction metaphor and visual design language. All portfolio content (projects, education, hackathons, skills, achievements) represents authentic personal information without fabricated financial trading platforms or quant analytics.

---

## 🚀 Key Modules & Architecture

| Module | Code | Title | Description |
|---|---|---|---|
| **01** | `MOD_01` | **Overview** | Cinematic hero, status telemetry, core positioning statement, and quick stats. |
| **02** | `MOD_02` | **About Me** | Background trajectory, intellectual curiosity nodes, building philosophy, and hardware setup. |
| **03** | `MOD_03` | **Projects** | Real projects (QuantumEdge voice defector, QUANT.OS, Business systems, Embedded robotics) with pipeline inspection. |
| **04** | `MOD_04` | **Skills** | Technical factor constellation map across AI/Data, Dev, Systems, and Leadership with interactive node links. |
| **05** | `MOD_05` | **Experience** | Authentic roles, hackathons (QuantumEdge integration lead), leadership, and collaborative projects. |
| **06** | `MOD_06` | **Education** | Newton School of Technology (B.Tech CS & AI, 2026–2030), coursework, and academic milestones. |
| **07** | `MOD_07` | **Achievements** | SOF Cyber Olympiad (Zonal Rank 20), Math Olympiad, IIT Bombay Eureka Juniors Semifinalist, Anthropic & IITM credentials. |
| **08** | `MOD_08` | **Now** | Real-time focus: active experiments, current reading, and engineering explorations. |
| **09** | `MOD_09` | **Contact** | Connection terminal with ticket dispatching, direct email copy, and social links (LinkedIn, GitHub). |

---

## ⌨️ Controls & Shortcuts

- **`1` – `9`**: Jump directly to any of the 9 modules.
- **`←` / `→`** or **`PageUp` / `PageDown`**: Smooth slide navigation between adjacent modules.
- **`⌘K` / `Ctrl+K` or `/`**: Open the CLI Command Palette for search and navigation.
- **`Esc`**: Dismiss modals (Command Palette, Boot Sequence, Project Details).
- **Mode Toggle (`Header`)**: Switch between **Slide Deck Mode** (directional transitions) and **Stream Mode** (continuous vertical scroll).

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom CSS Variables & Motion Design System
- **Visuals**: Dynamic Canvas 2D flowing spline paths & factor network graphs
- **Audio**: Synthesized Web Audio API terminal clicks and confirmation tones

---

## 💻 Running Locally

```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev

# Run TypeScript compilation check
npx tsc -b

# Build production bundle
npm run build
```

---

## 📂 Customizing Personal Data

All portfolio content is decoupled from UI presentation components and centralized in:
- `src/data/portfolioData.ts` — Edit biography, contact links, timeline milestones, projects, skills, and achievements.
- `src/types/index.ts` — TypeScript definitions for all data structures.
