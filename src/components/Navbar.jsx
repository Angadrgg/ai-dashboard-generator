import '../styles/navbar.css'

export default function Navbar({ config }) {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="navbar-breadcrumb">
          <span className="navbar-bc-home">Home</span>
          <span className="navbar-bc-sep">/</span>
          <span className="navbar-bc-current">{config.title}</span>
        </div>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <span>🔍</span>
          <input placeholder="Search..." />
        </div>
        <button className="navbar-icon-btn" title="Notifications">🔔</button>
        <button className="navbar-icon-btn" title="Settings">⚙️</button>
        <div className="navbar-avatar">A</div>
      </div>
    </header>
  )
}