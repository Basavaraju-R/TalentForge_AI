import { NavLink, useNavigate } from 'react-router-dom'
import { Sparkles, LogOut } from 'lucide-react'

export default function Sidebar({ items, roleLabel, isMobile = false }) {
  const visibilityClass = isMobile ? "flex" : "hidden lg:flex";
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simulate clearing auth tokens/state
    navigate('/');
  };

  return (
    <aside className={`${visibilityClass} flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200/70 dark:border-white/[0.06] glass rounded-none`}>
      <div className="flex items-center gap-2 px-6 h-16 shrink-0 mt-2">
        <div className="h-8 w-8 rounded-xl2 bg-brand-gradient flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-heading font-bold text-lg">TalentForge</span>
      </div>
      <p className="px-6 text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-2">{roleLabel}</p>
      
      <nav className="flex-1 overflow-y-auto px-3 space-y-1">
        {items.map(({ label, icon: Icon, to }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-gradient text-white shadow-soft'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>
      
      <div className="p-3 mt-auto shrink-0 border-t border-slate-200/50 dark:border-white/5">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-danger/10 hover:text-danger transition-colors"
        >
          <LogOut size={17} />
          Log Out
        </button>
      </div>
    </aside>
  )
}
