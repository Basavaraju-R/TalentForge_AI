export default function StatCard({ icon: Icon, label, value, sub, accent = 'primary', onClick }) {
  const accents = {
    primary: 'from-primary-500 to-primary-400 text-primary-600 dark:text-primary-400 bg-primary-500/10',
    secondary: 'from-secondary-500 to-secondary-400 text-secondary-500 bg-secondary-500/10',
    success: 'text-success bg-success/10',
    warning: 'text-warning bg-warning/10',
    danger: 'text-danger bg-danger/10',
  }
  return (
    <div 
      className={`card animate-rise ${onClick ? 'card-hover cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500/50' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{label}</p>
          <p className="text-3xl font-heading font-bold mt-1 text-slate-800 dark:text-white">{value}</p>
          {sub && <p className="text-xs text-success mt-1 font-medium">{sub}</p>}
        </div>
        {Icon && (
          <div className={`h-11 w-11 rounded-xl2 flex items-center justify-center ${accents[accent]}`}>
            <Icon size={20} strokeWidth={2.2} />
          </div>
        )}
      </div>
    </div>
  )
}
