# AI Dashboard Generator

Describe any app in plain English and get a full, working SaaS dashboard UI instantly.

## Features

- **AI-powered generation** — type a prompt, get a complete dashboard
- **6 domain templates** — Fitness, E-commerce, SaaS, Crypto, HR, Project Management
- **Full dashboard layout** — Sidebar, Navbar, Stat Cards, Charts, Widgets, Data Table
- **Recharts integration** — Area charts and Bar charts with tooltips
- **Custom theming** — each domain gets its own color palette
- **Interactive table** — search, sort, status badges, pagination

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## How It Works

1. Type a description on the landing page (e.g. *"fitness analytics dashboard"*)
2. The generator detects the domain from keywords
3. A full dashboard renders with real charts, stats, and tables
4. Click **← New Dashboard** in the sidebar to generate another

## Supported Domains

| Keyword | Dashboard |
|---|---|
| fitness, workout, calorie | Fitness Analytics |
| ecommerce, sales, shop | Sales Dashboard |
| saas, mrr, churn | SaaS Metrics |
| crypto, bitcoin, portfolio | Crypto Portfolio |
| hr, employee, recruit | HR Dashboard |
| project, sprint, task | Project Hub |

## Tech Stack

- React 18 + Vite
- Recharts (charts)
- CSS Modules (no Tailwind dependency)
- Google Fonts (Inter)
