// AI Dashboard Generator — powered by Google Gemini
const GEMINI_API_KEY = 'AIzaSyCFCs9tSedvSGhFYCWY_2-dGlpF03svCgg'
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

const SYSTEM_PROMPT = `You are a dashboard data generator. Given a description of a dashboard, generate realistic data for it.

Respond ONLY with a valid JSON object, no markdown, no explanation, no code fences. Start with { and end with }.

The JSON must follow this exact shape:
{
  "title": "Dashboard Title",
  "subtitle": "Short subtitle describing the dashboard",
  "theme": {
    "primary": "#hexcolor",
    "accent": "#hexcolor"
  },
  "nav": ["Item1", "Item2", "Item3", "Item4", "Item5", "Item6"],
  "stats": [
    { "label": "Metric Name", "value": "formatted value", "change": "+12%", "up": true, "icon": "emoji" },
    { "label": "Metric Name", "value": "formatted value", "change": "-3%", "up": false, "icon": "emoji" },
    { "label": "Metric Name", "value": "formatted value", "change": "+8%", "up": true, "icon": "emoji" },
    { "label": "Metric Name", "value": "formatted value", "change": "+5%", "up": true, "icon": "emoji" }
  ],
  "charts": [
    {
      "type": "area",
      "title": "Chart Title",
      "data": [
        {"d": "Label1", "v": 1234},
        {"d": "Label2", "v": 2345},
        {"d": "Label3", "v": 1890},
        {"d": "Label4", "v": 3210},
        {"d": "Label5", "v": 2780},
        {"d": "Label6", "v": 4120},
        {"d": "Label7", "v": 3560}
      ]
    },
    {
      "type": "bar",
      "title": "Chart Title",
      "data": [
        {"d": "Label1", "v": 450},
        {"d": "Label2", "v": 320},
        {"d": "Label3", "v": 780},
        {"d": "Label4", "v": 290},
        {"d": "Label5", "v": 610},
        {"d": "Label6", "v": 430}
      ]
    }
  ],
  "widgets": [
    { "type": "progress", "title": "Goal Title", "value": 72, "label": "descriptive label" },
    { "type": "progress", "title": "Goal Title", "value": 45, "label": "descriptive label" },
    { "type": "progress", "title": "Goal Title", "value": 88, "label": "descriptive label" }
  ],
  "table": {
    "title": "Table Title",
    "headers": ["Col1", "Col2", "Col3", "Col4", "Col5", "Status"],
    "rows": [
      ["val1", "val2", "val3", "val4", "val5", "Active"],
      ["val1", "val2", "val3", "val4", "val5", "Completed"],
      ["val1", "val2", "val3", "val4", "val5", "At Risk"],
      ["val1", "val2", "val3", "val4", "val5", "Pending"],
      ["val1", "val2", "val3", "val4", "val5", "Active"]
    ]
  }
}

Rules:
- Make ALL data realistic and specific to the dashboard described
- Choose theme colors that match the domain (green for health, blue for tech, orange for finance, purple for creative, etc)
- The last column of every table row must be a status word like: Active, Completed, Delivered, Shipped, At Risk, Pending, Healthy, New, On Track, Blocked
- widget values must be numbers between 5 and 95
- chart values must be realistic numbers for the domain
- stat values should be formatted nicely (e.g. "$12,400", "1,284", "94%", "3.2k")
- nav items should be relevant page names for the dashboard type
- icons must be single emojis relevant to each metric
- up: true means the change is good/positive, up: false means it is bad/negative`

export async function generateDashboard(prompt) {
  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{
          text: `${SYSTEM_PROMPT}\n\nGenerate dashboard data for: "${prompt}"`
        }]
      }],
      generationConfig: {
        temperature: 0.8,
        maxOutputTokens: 2048,
      }
    })
  })

  if (!res.ok) {
    const err = await res.json()
    throw new Error('Gemini API error: ' + (err.error?.message || res.status))
  }

  const data = await res.json()
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || ''

  // Extract JSON robustly
  const match = rawText.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('Could not parse AI response. Please try again.')

  let config
  try {
    config = JSON.parse(match[0])
  } catch (e) {
    throw new Error('Invalid JSON from AI. Please try again.')
  }

  // Ensure theme exists
  if (!config.theme) config.theme = { primary: '#6366f1', accent: '#22d3ee' }

  return config
}
