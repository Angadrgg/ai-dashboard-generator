import '../styles/sidebar.css'

export default function Sidebar({ config, onReset }) {
  const primary = config.theme?.primary || '#6366f1'
  const nav = config.nav || ['Dashboard', 'Analytics', 'Reports', 'Settings']
  const icons = ['◉', '◈', '◆', '◇', '○', '□', '▷', '▽']

  return (
    <aside className="sidebar">
      <div className="sidebar-logo" onClick={onReset} title="Back to generator">
        <div className="sidebar-logo-icon" style={{background: primary}}>✦</div>
        <div>
          <div className="sidebar-logo-name">DashAI</div>
          <div className="sidebar-logo-sub">Generator</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {nav.map((item, i) => (
          <a key={item} className={`sidebar-link ${i === 0 ? 'active' : ''}`}
            style={i === 0 ? {'--active-color': primary} : {}}
          >
            <span className="sidebar-icon">{icons[i % icons.length]}</span>
            {item}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar" style={{background: primary}}>A</div>
          <div>
            <div className="sidebar-user-name">Admin User</div>
            <div className="sidebar-user-role">Administrator</div>
          </div>
        </div>
        <button className="sidebar-reset" onClick={onReset}>← New Dashboard</button>
      </div>
    </aside>
  )
}