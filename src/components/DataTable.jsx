import { useState } from 'react'
import '../styles/table.css'

export default function DataTable({ table, primary }) {
  const [sortCol, setSortCol] = useState(null)
  const [search, setSearch] = useState('')

  if (!table) return null

  const filtered = table.rows.filter(row =>
    row.some(cell => cell.toLowerCase().includes(search.toLowerCase()))
  )

  const statusColor = (val) => {
    const v = val.toLowerCase()
    if (v.match(/completed|active|healthy|delivered|on track|ahead/)) return '#10b981'
    if (v.match(/at risk|blocked|refund|down/)) return '#ef4444'
    if (v.match(/processing|shipped|in progress|new/)) return '#f59e0b'
    return '#64748b'
  }

  return (
    <div className="table-card">
      <div className="table-header">
        <h3 className="table-title">{table.title}</h3>
        <div className="table-controls">
          <input
            className="table-search"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button className="table-export">↓ Export</button>
        </div>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead>
            <tr>
              {table.headers.map((h, i) => (
                <th key={i} onClick={() => setSortCol(i)} className={sortCol === i ? 'sorted' : ''}
                  style={sortCol === i ? {color: primary} : {}}>
                  {h} {sortCol === i ? '↑' : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>
                    {j === row.length - 1 ? (
                      <span className="table-badge" style={{color: statusColor(cell), borderColor: statusColor(cell) + '44', background: statusColor(cell) + '11'}}>
                        {cell}
                      </span>
                    ) : cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>Showing {filtered.length} of {table.rows.length} entries</span>
        <div className="table-pages">
          <button>← Prev</button>
          <button className="active" style={{background: primary}}>1</button>
          <button>2</button>
          <button>Next →</button>
        </div>
      </div>
    </div>
  )
}