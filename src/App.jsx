import { useState } from 'react'
import Generator from './pages/Generator.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

export default function App() {
  const [dashboard, setDashboard] = useState(null)
  const [generating, setGenerating] = useState(false)

  return dashboard
    ? <Dashboard config={dashboard} onReset={() => setDashboard(null)} />
    : <Generator onGenerate={setDashboard} generating={generating} setGenerating={setGenerating} />
}