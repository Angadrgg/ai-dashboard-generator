// AI Dashboard Generator — powered by Google Gemini API

const SYSTEM_PROMPT = `You are an expert SaaS dashboard designer and data analyst. Given a user prompt describing a dashboard, respond with ONLY a valid JSON object (no markdown fences, no explanation) matching this exact structure:

{
  "title": "string",
  "subtitle": "string — one-line tagline",
  "nav": ["5-6 nav items relevant to the domain"],
  "theme": { "primary": "#hexcolor", "accent": "#hexcolor", "bg": "#very dark hex" },
  "stats": [
    { "label": "string", "value": "string", "change": "string like +12% or -3", "up": true_or_false, "icon": "emoji" }
  ],
  "charts": [
    { "type": "area" or "bar", "title": "string", "data": [{"d": "label", "v": number}, ...] }
  ],
  "widgets": [
    { "type": "progress", "title": "string", "value": number_0_to_100, "label": "string" }
  ],
  "table": {
    "title": "string",
    "headers": ["5-6 column headers"],
    "rows": [["cell", ...], ...]
  }
}

Rules:
- stats: exactly 4 items with realistic domain-specific values
- charts: exactly 2 items, each with 6-7 data points. Use short labels (Mon/Tue or Jan/Feb etc)
- widgets: exactly 3 progress widgets with values 0-100
- table: 5-6 headers, exactly 5 rows. Last column MUST be a status word (Active/Completed/Shipped/On Track/At Risk/Processing/Delivered/Healthy/New)
- theme.primary: vibrant color that fits the domain (not plain red/blue/green)
- theme.bg: very dark version of primary for background
- All data should be realistic and specific to the described domain
- RESPOND WITH ONLY THE RAW JSON OBJECT`;

const FALLBACK_CONFIG = {
  title: 'Analytics Dashboard',
  subtitle: 'Key metrics and performance indicators',
  nav: ['Dashboard', 'Analytics', 'Reports', 'Users', 'Settings'],
  theme: { primary: '#6366f1', accent: '#22d3ee', bg: '#070711' },
  stats: [
    { label: 'Total Users', value: '12,400', change: '+18%', up: true, icon: '👥' },
    { label: 'Revenue', value: '$84,200', change: '+22%', up: true, icon: '💰' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.5%', up: true, icon: '📈' },
    { label: 'Churn Rate', value: '1.9%', change: '-0.3%', up: true, icon: '🔄' },
  ],
  charts: [
    { type: 'area', title: 'Revenue Over Time', data: [{d:'Jan',v:52000},{d:'Feb',v:61000},{d:'Mar',v:58000},{d:'Apr',v:72000},{d:'May',v:79000},{d:'Jun',v:84200}] },
    { type: 'bar', title: 'New Users by Month', data: [{d:'Jan',v:1800},{d:'Feb',v:2100},{d:'Mar',v:1950},{d:'Apr',v:2400},{d:'May',v:2700},{d:'Jun',v:3100}] },
  ],
  widgets: [
    { type: 'progress', title: 'Monthly Goal', value: 74, label: '74% achieved' },
    { type: 'progress', title: 'User Retention', value: 88, label: '88% retained' },
    { type: 'progress', title: 'Feature Adoption', value: 62, label: '62% active' },
  ],
  table: {
    title: 'Recent Activity',
    headers: ['ID', 'User', 'Action', 'Date', 'Region', 'Status'],
    rows: [
      ['#001', 'Alice Chen', 'Upgraded Plan', 'Today', 'US-West', 'Completed'],
      ['#002', 'Bob Smith', 'New Signup', 'Today', 'EU-North', 'Active'],
      ['#003', 'Carol Wu', 'Report Export', 'Yesterday', 'APAC', 'Completed'],
      ['#004', 'David Kim', 'API Access', 'Yesterday', 'US-East', 'Active'],
      ['#005', 'Eva Patel', 'Trial Started', '2 days ago', 'EU-West', 'Processing'],
    ]
  }
}

export async function generateDashboard(prompt) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  if (!apiKey) {
    console.warn('No Gemini API key set — using demo fallback.')
    await new Promise(r => setTimeout(r, 1200))
    return { ...FALLBACK_CONFIG, generatedFrom: prompt }
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`

  const body = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{ parts: [{ text: `Create a dashboard for: ${prompt}` }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      responseMimeType: 'application/json',
    }
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = err?.error?.message || res.statusText
    throw new Error(`Gemini API error: ${msg}`)
  }

  const data = await res.json()
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
  if (!text) throw new Error('Empty response from Gemini. Please try again.')

  let config
  try {
    config = typeof text === 'string' ? JSON.parse(text) : text
  } catch {
    throw new Error('Failed to parse AI response. Please try again.')
  }

  // Validate and patch required fields with fallbacks
  if (!config.title) config.title = 'Dashboard'
  if (!config.stats?.length) config.stats = FALLBACK_CONFIG.stats
  if (!config.charts?.length) config.charts = FALLBACK_CONFIG.charts
  if (!config.widgets?.length) config.widgets = FALLBACK_CONFIG.widgets
  if (!config.table) config.table = FALLBACK_CONFIG.table
  if (!config.nav?.length) config.nav = FALLBACK_CONFIG.nav
  if (!config.theme) config.theme = FALLBACK_CONFIG.theme

  return { ...config, generatedFrom: prompt }
}