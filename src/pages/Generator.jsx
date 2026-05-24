import { useState } from 'react'
import { generateDashboard } from '../lib/generator.js'
import '../styles/generator.css'

const EXAMPLES = [
  'Fitness analytics dashboard with calorie tracking, workout charts, and progress stats',
  'E-commerce sales dashboard with revenue charts, top products table, and order management',
  'SaaS metrics dashboard with MRR, churn rate, active users, and subscription analytics',
  'Crypto portfolio tracker with price charts, holdings table, and market overview',
  'HR management dashboard with employee stats, attendance tracking, and department overview',
  'Project management dashboard with sprint progress, team velocity, and task burndown',
]

const HAS_API_KEY = import.meta.env.VITE_GEMINI_API_KEY && import.meta.env.VITE_GEMINI_API_KEY !== 'your_gemini_api_key_here'

export default function Generator({ onGenerate, generating, setGenerating }) {
  const [prompt, setPrompt] = useState('')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) { setError('Please describe your dashboard'); return }
    setError('')
    setGenerating(true)
    setProgress(HAS_API_KEY ? 'Sending to Gemini AI...' : 'Analyzing your prompt...')
    try {
      if (HAS_API_KEY) {
        setTimeout(() => setProgress('AI is designing your dashboard...'), 800)
        setTimeout(() => setProgress('Generating charts & data...'), 2200)
        setTimeout(() => setProgress('Applying theme & styling...'), 3500)
      } else {
        setTimeout(() => setProgress('Designing layout & components...'), 600)
        setTimeout(() => setProgress('Generating charts & data...'), 1000)
      }
      const config = await generateDashboard(prompt)
      onGenerate(config)
    } catch (e) {
      setError(e.message || 'Generation failed. Please try again.')
    } finally {
      setGenerating(false)
      setProgress('')
    }
  }

  return (
    <div className="gen-page">
      <div className="gen-bg" />
      <div className="gen-container">
        <div className={`gen-badge ${HAS_API_KEY ? '' : 'gen-badge--demo'}`}>
          {HAS_API_KEY ? '✦ GEMINI AI POWERED' : '⚠ DEMO MODE — NO API KEY'}
        </div>
        <h1 className="gen-title">Dashboard Generator</h1>
        <p className="gen-sub">Describe your app in plain English — get a full SaaS dashboard in seconds.</p>

        {!HAS_API_KEY && (
          <div className="gen-api-notice">
            <div className="gen-api-icon">🔑</div>
            <div>
              <div className="gen-api-title">Add Gemini AI for real generation</div>
              <div className="gen-api-desc">
                Create a <code>.env</code> file and add:<br />
                <code>VITE_GEMINI_API_KEY=your_key_here</code><br />
                Get a free key at{' '}
                <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer">
                  aistudio.google.com
                </a>
                {' '}— then restart the dev server.
              </div>
            </div>
          </div>
        )}

        <div className="gen-card">
          <label className="gen-label">What kind of dashboard do you need?</label>
          <textarea
            className="gen-textarea"
            placeholder="e.g. Create a fitness analytics dashboard with calorie tracking, workout history charts, and weekly progress cards..."
            value={prompt}
            onChange={e => { setPrompt(e.target.value); setError('') }}
            onKeyDown={e => { if (e.key === 'Enter' && e.metaKey) handleGenerate() }}
            rows={4}
          />
          {error && <p className="gen-error">{error}</p>}
          <button
            className={`gen-btn ${generating ? 'gen-btn--loading' : ''}`}
            onClick={handleGenerate}
            disabled={generating}
          >
            {generating ? (
              <><span className="gen-spinner" /> {progress || 'Generating...'}</>
            ) : (
              <><span>✦</span> Generate Dashboard</>
            )}
          </button>
        </div>

        <div className="gen-examples">
          <p className="gen-examples-label">Try an example:</p>
          <div className="gen-chips">
            {EXAMPLES.map((ex, i) => (
              <button key={i} className="gen-chip" onClick={() => setPrompt(ex)}>
                {ex.split(' ').slice(0, 5).join(' ')}…
              </button>
            ))}
          </div>
        </div>

        <div className="gen-features">
          {['Sidebar + Navbar', 'Analytics Cards', 'Live Charts', 'Data Tables', 'Custom Theme', 'Gemini AI'].map(f => (
            <div key={f} className="gen-feature"><span>✓</span>{f}</div>
          ))}
        </div>
      </div>
    </div>
  )
}