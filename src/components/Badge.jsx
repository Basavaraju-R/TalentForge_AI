const styles = {
  High: 'bg-danger/10 text-danger',
  Medium: 'bg-warning/10 text-warning',
  Low: 'bg-success/10 text-success',
  'Strong Fit': 'bg-success/10 text-success',
  'Good Fit': 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  Consider: 'bg-warning/10 text-warning',
  'Weak Fit': 'bg-danger/10 text-danger',
  Remote: 'bg-secondary-500/10 text-secondary-500',
}

export default function Badge({ children, tone }) {
  const cls = styles[tone] || styles[children] || 'bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300'
  return <span className={`badge ${cls}`}>{children}</span>
}
