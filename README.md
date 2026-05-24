# AI Dashboard Generator

Describe any app in plain English — get a full working SaaS dashboard powered by **Google Gemini 2.0 Flash AI**.

## Setup

```bash
npm install
```

### Add your Gemini API key

1. Get a free key at https://aistudio.google.com/app/apikey
2. Copy `.env.example` to `.env`
3. Set your key:

```
VITE_GEMINI_API_KEY=AIza...your_key
```

```bash
npm run dev
```

Open http://localhost:5173

## Features

- **Real AI generation** — Gemini 2.0 Flash generates a unique dashboard from any prompt
- **Full dashboard layout** — Sidebar, Navbar, Stat Cards, Charts, Widgets, Data Table
- **Recharts integration** — Area and Bar charts with custom tooltips
- **AI-chosen color themes** — Gemini picks a fitting palette for each domain
- **Interactive table** — search, sort, status badges, pagination
- **Demo mode** — works without an API key using smart fallback logic

## How It Works

1. Type any description on the landing page (e.g. *"hospital patient management dashboard"*)
2. Gemini AI generates a complete JSON config with real, domain-specific data
3. The dashboard renders with contextual charts, stats, and tables
4. Click **← New Dashboard** to generate another

## Tech Stack

- React 18 + Vite
- Google Gemini 2.0 Flash API
- Recharts (charts)
- Vanilla CSS (no Tailwind)
- Google Fonts (Inter + JetBrains Mono)
