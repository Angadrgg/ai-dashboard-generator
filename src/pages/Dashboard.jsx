import Sidebar from '../components/Sidebar.jsx'
import Navbar from '../components/Navbar.jsx'
import StatCards from '../components/StatCards.jsx'
import ChartSection from '../components/ChartSection.jsx'
import DataTable from '../components/DataTable.jsx'
import WidgetRow from '../components/WidgetRow.jsx'
import '../styles/dashboard.css'

export default function Dashboard({ config, onReset }) {
  const theme = config.theme || {}
  const primary = theme.primary || '#6366f1'
  const accent = theme.accent || '#22d3ee'

  return (
    <div className="dash" style={{'--primary': primary, '--accent': accent, '--primary-dim': primary + '22'}}>
      <Sidebar config={config} onReset={onReset} />
      <div className="dash-main">
        <Navbar config={config} />
        <div className="dash-content">
          <div className="dash-header">
            <div>
              <h1 className="dash-title">{config.title}</h1>
              <p className="dash-sub">{config.subtitle}</p>
            </div>
            <div className="dash-header-actions">
              <button className="dash-btn-secondary">Export</button>
              <button className="dash-btn-primary" style={{background: primary}}>+ New Report</button>
            </div>
          </div>
          <StatCards cards={config.stats} primary={primary} />
          <ChartSection charts={config.charts} primary={primary} accent={accent} />
          {config.widgets && <WidgetRow widgets={config.widgets} primary={primary} />}
          {config.table && <DataTable table={config.table} primary={primary} />}
        </div>
      </div>
    </div>
  )
}