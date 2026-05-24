import '../styles/widgets.css'

export default function WidgetRow({ widgets, primary }) {
  if (!widgets?.length) return null
  return (
    <div className="widget-row">
      {widgets.map((w, i) => (
        <div key={i} className="widget-card">
          <div className="widget-header">
            <span className="widget-title">{w.title}</span>
            <span className="widget-pct" style={{color: primary}}>{w.value}%</span>
          </div>
          <div className="widget-track">
            <div className="widget-fill" style={{width: `${w.value}%`, background: `linear-gradient(90deg, ${primary}, ${primary}cc)`}} />
          </div>
          <div className="widget-label">{w.label}</div>
        </div>
      ))}
    </div>
  )
}