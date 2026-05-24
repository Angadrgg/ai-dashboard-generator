import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import '../styles/charts.css'

const CustomTooltip = ({ active, payload, label, primary }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="chart-tooltip-label">{label}</p>
      <p className="chart-tooltip-value" style={{color: primary}}>{payload[0]?.value?.toLocaleString()}</p>
    </div>
  )
}

function ChartCard({ chart, primary, accent }) {
  const data = chart.data.map(d => ({ name: d.d, value: d.v }))
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3 className="chart-title">{chart.title}</h3>
        <div className="chart-pills">
          <button className="chart-pill active" style={{borderColor: primary, color: primary}}>7D</button>
          <button className="chart-pill">30D</button>
          <button className="chart-pill">90D</button>
        </div>
      </div>
      <div className="chart-body">
        <ResponsiveContainer width="100%" height={220}>
          {chart.type === 'area' ? (
            <AreaChart data={data} margin={{top:5,right:10,left:0,bottom:0}}>
              <defs>
                <linearGradient id={`grad-${chart.title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={primary} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={primary} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="name" tick={{fill:'#64748b',fontSize:12}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:'#64748b',fontSize:12}} axisLine={false} tickLine={false} width={50} tickFormatter={v => v >= 1000 ? (v/1000).toFixed(0)+'k' : v} />
              <Tooltip content={<CustomTooltip primary={primary} />} />
              <Area type="monotone" dataKey="value" stroke={primary} strokeWidth={2.5} fill={`url(#grad-${chart.title})`} dot={false} activeDot={{r:5,fill:primary}} />
            </AreaChart>
          ) : (
            <BarChart data={data} margin={{top:5,right:10,left:0,bottom:0}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
              <XAxis dataKey="name" tick={{fill:'#64748b',fontSize:11}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill:'#64748b',fontSize:12}} axisLine={false} tickLine={false} width={50} tickFormatter={v => v >= 1000 ? (v/1000).toFixed(0)+'k' : v} />
              <Tooltip content={<CustomTooltip primary={primary} />} />
              <Bar dataKey="value" fill={primary} radius={[4,4,0,0]} opacity={0.85} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default function ChartSection({ charts, primary, accent }) {
  if (!charts?.length) return null
  return (
    <div className="charts-grid">
      {charts.map((chart, i) => (
        <ChartCard key={i} chart={chart} primary={primary} accent={accent} />
      ))}
    </div>
  )
}