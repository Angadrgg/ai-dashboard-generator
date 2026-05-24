// Deterministic AI dashboard generator — parses prompt keywords and builds a full config

const THEMES = {
  fitness:   { primary: '#10b981', accent: '#f59e0b', bg: '#022c22' },
  ecommerce: { primary: '#6366f1', accent: '#ec4899', bg: '#0f0a1e' },
  saas:      { primary: '#3b82f6', accent: '#22d3ee', bg: '#020b18' },
  crypto:    { primary: '#f59e0b', accent: '#8b5cf6', bg: '#0c0a00' },
  hr:        { primary: '#ec4899', accent: '#06b6d4', bg: '#1a0011' },
  project:   { primary: '#8b5cf6', accent: '#10b981', bg: '#0d0a1a' },
  default:   { primary: '#6366f1', accent: '#22d3ee', bg: '#070711' },
}

const DOMAIN_DATA = {
  fitness: {
    title: 'Fitness Analytics', subtitle: 'Track your health & performance metrics',
    nav: ['Dashboard', 'Workouts', 'Nutrition', 'Progress', 'Goals', 'Community'],
    stats: [
      { label: 'Calories Burned', value: '2,847', change: '+12%', up: true, icon: '🔥' },
      { label: 'Active Minutes', value: '184', change: '+8%', up: true, icon: '⏱️' },
      { label: 'Workouts This Week', value: '5', change: '+1', up: true, icon: '💪' },
      { label: 'Avg Heart Rate', value: '142 bpm', change: '-3%', up: false, icon: '❤️' },
    ],
    charts: [
      { type: 'area', title: 'Weekly Calorie Burn', data: [{d:'Mon',v:320},{d:'Tue',v:280},{d:'Wed',v:410},{d:'Thu',v:390},{d:'Fri',v:520},{d:'Sat',v:480},{d:'Sun',v:350}] },
      { type: 'bar', title: 'Workout Duration (min)', data: [{d:'Mon',v:45},{d:'Tue',v:30},{d:'Wed',v:60},{d:'Thu',v:50},{d:'Fri',v:75},{d:'Sat',v:90},{d:'Sun',v:40}] },
    ],
    widgets: [
      { type: 'progress', title: 'Weekly Goal', value: 71, label: '5/7 days' },
      { type: 'progress', title: 'Calorie Goal', value: 84, label: '2,847 / 3,400 kcal' },
      { type: 'progress', title: 'Hydration', value: 60, label: '1.5 / 2.5 L' },
    ],
    table: {
      title: 'Recent Workouts',
      headers: ['Workout', 'Date', 'Duration', 'Calories', 'Intensity', 'Status'],
      rows: [
        ['Morning Run', 'Today', '45 min', '420 kcal', 'High', 'Completed'],
        ['Chest & Triceps', 'Yesterday', '60 min', '380 kcal', 'Medium', 'Completed'],
        ['Yoga Flow', '2 days ago', '30 min', '180 kcal', 'Low', 'Completed'],
        ['HIIT Cardio', '3 days ago', '25 min', '520 kcal', 'Very High', 'Completed'],
        ['Leg Day', '4 days ago', '75 min', '490 kcal', 'High', 'Completed'],
      ]
    }
  },
  ecommerce: {
    title: 'Sales Dashboard', subtitle: 'Real-time e-commerce analytics & insights',
    nav: ['Overview', 'Orders', 'Products', 'Customers', 'Analytics', 'Settings'],
    stats: [
      { label: 'Total Revenue', value: '$48,294', change: '+23%', up: true, icon: '💰' },
      { label: 'Orders Today', value: '284', change: '+18%', up: true, icon: '📦' },
      { label: 'Avg Order Value', value: '$170', change: '+5%', up: true, icon: '🛒' },
      { label: 'Refund Rate', value: '2.4%', change: '+0.3%', up: false, icon: '↩️' },
    ],
    charts: [
      { type: 'area', title: 'Revenue (Last 7 Days)', data: [{d:'Mon',v:5200},{d:'Tue',v:7800},{d:'Wed',v:6100},{d:'Thu',v:9200},{d:'Fri',v:11400},{d:'Sat',v:8700},{d:'Sun',v:7300}] },
      { type: 'bar', title: 'Orders by Category', data: [{d:'Electronics',v:142},{d:'Fashion',v:98},{d:'Home',v:76},{d:'Sports',v:54},{d:'Books',v:38},{d:'Beauty',v:62}] },
    ],
    widgets: [
      { type: 'progress', title: 'Monthly Revenue Goal', value: 78, label: '$48.2k / $62k' },
      { type: 'progress', title: 'Inventory Health', value: 91, label: '910 / 1000 SKUs in stock' },
      { type: 'progress', title: 'Customer Satisfaction', value: 94, label: '4.7 / 5.0 stars' },
    ],
    table: {
      title: 'Recent Orders',
      headers: ['Order ID', 'Customer', 'Product', 'Amount', 'Status', 'Date'],
      rows: [
        ['#ORD-8821', 'Sarah Johnson', 'MacBook Pro 14"', '$2,499', 'Shipped', 'Today'],
        ['#ORD-8820', 'Mike Chen', 'Sony WH-1000XM5', '$349', 'Processing', 'Today'],
        ['#ORD-8819', 'Emma Wilson', 'Nike Air Max 270', '$150', 'Delivered', 'Yesterday'],
        ['#ORD-8818', 'James Brown', 'iPhone 15 Pro', '$999', 'Shipped', 'Yesterday'],
        ['#ORD-8817', 'Priya Patel', 'Kindle Paperwhite', '$139', 'Delivered', '2 days ago'],
      ]
    }
  },
  saas: {
    title: 'SaaS Metrics', subtitle: 'Key performance indicators & growth analytics',
    nav: ['Dashboard', 'Customers', 'Revenue', 'Churn', 'Features', 'Reports'],
    stats: [
      { label: 'MRR', value: '$124,800', change: '+14%', up: true, icon: '📈' },
      { label: 'Active Users', value: '8,492', change: '+9%', up: true, icon: '👥' },
      { label: 'Churn Rate', value: '2.1%', change: '-0.4%', up: true, icon: '🔄' },
      { label: 'NPS Score', value: '72', change: '+5', up: true, icon: '⭐' },
    ],
    charts: [
      { type: 'area', title: 'MRR Growth', data: [{d:'Jan',v:89000},{d:'Feb',v:95000},{d:'Mar',v:101000},{d:'Apr',v:108000},{d:'May',v:114000},{d:'Jun',v:124800}] },
      { type: 'bar', title: 'New Signups / Week', data: [{d:'W1',v:142},{d:'W2',v:198},{d:'W3',v:176},{d:'W4',v:221},{d:'W5',v:258},{d:'W6',v:294}] },
    ],
    widgets: [
      { type: 'progress', title: 'ARR Goal', value: 83, label: '$1.49M / $1.8M' },
      { type: 'progress', title: 'Trial Conversion', value: 34, label: '34% this month' },
      { type: 'progress', title: 'Feature Adoption', value: 67, label: '67% use core features' },
    ],
    table: {
      title: 'Top Accounts',
      headers: ['Company', 'Plan', 'MRR', 'Users', 'Health', 'Renewal'],
      rows: [
        ['Acme Corp', 'Enterprise', '$8,400', '124', 'Healthy', 'Jan 2026'],
        ['TechFlow Inc', 'Business', '$2,100', '48', 'At Risk', 'Mar 2026'],
        ['StartupXYZ', 'Pro', '$890', '12', 'Healthy', 'Feb 2026'],
        ['MegaCorp Ltd', 'Enterprise', '$12,600', '312', 'Healthy', 'Dec 2025'],
        ['DevStudio', 'Pro', '$420', '8', 'New', 'May 2026'],
      ]
    }
  },
  crypto: {
    title: 'Crypto Portfolio', subtitle: 'Real-time market tracking & portfolio analytics',
    nav: ['Portfolio', 'Markets', 'Trade', 'DeFi', 'NFTs', 'Settings'],
    stats: [
      { label: 'Portfolio Value', value: '$84,291', change: '+6.2%', up: true, icon: '💎' },
      { label: 'Today\'s P&L', value: '+$4,912', change: '+6.2%', up: true, icon: '📊' },
      { label: 'Best Performer', value: 'ETH +12%', change: '+12%', up: true, icon: '🚀' },
      { label: 'Worst Performer', value: 'DOGE -4%', change: '-4%', up: false, icon: '📉' },
    ],
    charts: [
      { type: 'area', title: 'Portfolio Value (30 Days)', data: [{d:'W1',v:71000},{d:'W2',v:68000},{d:'W3',v:74000},{d:'W4',v:79000},{d:'W5',v:76000},{d:'W6',v:84291}] },
      { type: 'bar', title: 'Holdings by Asset ($)', data: [{d:'BTC',v:42000},{d:'ETH',v:22000},{d:'SOL',v:8000},{d:'MATIC',v:5000},{d:'AVAX',v:4000},{d:'Other',v:3291}] },
    ],
    widgets: [
      { type: 'progress', title: 'BTC Allocation', value: 50, label: '50% of portfolio' },
      { type: 'progress', title: 'ETH Allocation', value: 26, label: '26% of portfolio' },
      { type: 'progress', title: 'Alts Allocation', value: 24, label: '24% of portfolio' },
    ],
    table: {
      title: 'Holdings',
      headers: ['Asset', 'Amount', 'Price', 'Value', '24h Change', 'Allocation'],
      rows: [
        ['Bitcoin (BTC)', '0.847 BTC', '$49,586', '$42,009', '+3.2%', '49.8%'],
        ['Ethereum (ETH)', '8.4 ETH', '$2,618', '$21,991', '+12.1%', '26.1%'],
        ['Solana (SOL)', '62 SOL', '$129', '$7,998', '+5.4%', '9.5%'],
        ['Polygon (MATIC)', '4,200 MATIC', '$1.19', '$4,998', '-1.2%', '5.9%'],
        ['Avalanche (AVAX)', '112 AVAX', '$35.7', '$3,998', '+2.8%', '4.7%'],
      ]
    }
  },
  hr: {
    title: 'HR Dashboard', subtitle: 'People analytics & workforce management',
    nav: ['Overview', 'Employees', 'Recruitment', 'Payroll', 'Performance', 'Reports'],
    stats: [
      { label: 'Total Employees', value: '1,284', change: '+12', up: true, icon: '👥' },
      { label: 'Open Positions', value: '24', change: '+8', up: false, icon: '📋' },
      { label: 'Avg Tenure', value: '3.2 yrs', change: '+0.2', up: true, icon: '🏆' },
      { label: 'Attrition Rate', value: '8.4%', change: '-1.2%', up: true, icon: '↗️' },
    ],
    charts: [
      { type: 'bar', title: 'Headcount by Department', data: [{d:'Eng',v:342},{d:'Sales',v:218},{d:'Mktg',v:124},{d:'HR',v:48},{d:'Finance',v:92},{d:'Ops',v:156}] },
      { type: 'area', title: 'Hiring Trend (Monthly)', data: [{d:'Jan',v:18},{d:'Feb',v:24},{d:'Mar',v:31},{d:'Apr',v:28},{d:'May',v:42},{d:'Jun',v:38}] },
    ],
    widgets: [
      { type: 'progress', title: 'Hiring Goal Q2', value: 72, label: '18 / 25 positions filled' },
      { type: 'progress', title: 'Training Completion', value: 88, label: '88% completed onboarding' },
      { type: 'progress', title: 'Employee Satisfaction', value: 76, label: '76% engagement score' },
    ],
    table: {
      title: 'Recent Hires',
      headers: ['Name', 'Role', 'Department', 'Start Date', 'Location', 'Status'],
      rows: [
        ['Alex Kim', 'Sr. Engineer', 'Engineering', 'Jun 1', 'Remote', 'Active'],
        ['Maria Santos', 'Product Manager', 'Product', 'May 28', 'New York', 'Active'],
        ['David Lee', 'Sales Rep', 'Sales', 'May 20', 'London', 'Active'],
        ['Priya Nair', 'Designer', 'Design', 'May 15', 'Remote', 'Active'],
        ['Tom Wright', 'Data Analyst', 'Analytics', 'May 10', 'Berlin', 'Active'],
      ]
    }
  },
  project: {
    title: 'Project Hub', subtitle: 'Sprint tracking, velocity & delivery analytics',
    nav: ['Dashboard', 'Projects', 'Sprints', 'Team', 'Timeline', 'Reports'],
    stats: [
      { label: 'Active Projects', value: '12', change: '+2', up: true, icon: '🚀' },
      { label: 'Tasks Completed', value: '847', change: '+124', up: true, icon: '✅' },
      { label: 'On-Time Delivery', value: '89%', change: '+3%', up: true, icon: '📅' },
      { label: 'Bugs Open', value: '23', change: '-8', up: true, icon: '🐛' },
    ],
    charts: [
      { type: 'area', title: 'Sprint Velocity', data: [{d:'S1',v:42},{d:'S2',v:38},{d:'S3',v:51},{d:'S4',v:48},{d:'S5',v:62},{d:'S6',v:58}] },
      { type: 'bar', title: 'Tasks by Status', data: [{d:'Done',v:847},{d:'In Progress',v:124},{d:'Review',v:48},{d:'Blocked',v:18},{d:'Todo',v:312}] },
    ],
    widgets: [
      { type: 'progress', title: 'Current Sprint', value: 68, label: '34/50 story points' },
      { type: 'progress', title: 'Q2 Roadmap', value: 54, label: '54% milestones complete' },
      { type: 'progress', title: 'Code Coverage', value: 82, label: '82% test coverage' },
    ],
    table: {
      title: 'Active Projects',
      headers: ['Project', 'Team', 'Progress', 'Due Date', 'Priority', 'Status'],
      rows: [
        ['Dashboard Redesign', 'Frontend', '78%', 'Jun 30', 'High', 'On Track'],
        ['API v3 Migration', 'Backend', '45%', 'Jul 15', 'Critical', 'At Risk'],
        ['Mobile App', 'Mobile', '62%', 'Aug 1', 'High', 'On Track'],
        ['Analytics Engine', 'Data', '91%', 'Jun 20', 'Medium', 'Ahead'],
        ['Auth Refactor', 'Security', '33%', 'Jul 30', 'High', 'On Track'],
      ]
    }
  }
}

function detectDomain(prompt) {
  const p = prompt.toLowerCase()
  if (p.match(/fit|workout|calor|gym|health|exercise|run|nutrition|bmi/)) return 'fitness'
  if (p.match(/ecommerce|e-commerce|sales|shop|order|product|revenue|store|cart/)) return 'ecommerce'
  if (p.match(/saas|mrr|arr|churn|subscription|b2b|customer success/)) return 'saas'
  if (p.match(/crypto|bitcoin|eth|portfolio|defi|nft|blockchain|coin/)) return 'crypto'
  if (p.match(/hr|human resource|employee|recruit|payroll|people|workforce|hiring/)) return 'hr'
  if (p.match(/project|sprint|task|agile|scrum|kanban|roadmap|team/)) return 'project'
  return 'saas'
}

export async function generateDashboard(prompt) {
  // Simulate AI processing time
  await new Promise(r => setTimeout(r, 2400))
  const domain = detectDomain(prompt)
  const data = DOMAIN_DATA[domain]
  const theme = THEMES[domain]
  return { ...data, theme, domain, generatedFrom: prompt }
}