import '../styles/statcards.css'

export default function StatCards({ cards, primary }) {
  if (!cards?.length) return null
  return (
    <div className="stat-grid">
      {cards.map((card, i) => (
        <div key={i} className="stat-card">
          <div className="stat-top">
            <div className="stat-icon">{card.icon}</div>
            <span className={`stat-change ${card.up ? 'up' : 'down'}`}>
              {card.up ? '▲' : '▼'} {card.change}
            </span>
          </div>
          <div className="stat-value" style={{color: i === 0 ? primary : undefined}}>{card.value}</div>
          <div className="stat-label">{card.label}</div>
          <div className="stat-bar"><div className="stat-bar-fill" style={{width: `${60 + i * 8}%`, background: primary}} /></div>
        </div>
      ))}
    </div>
  )
}