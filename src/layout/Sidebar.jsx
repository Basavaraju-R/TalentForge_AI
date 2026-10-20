import { NavLink, useNavigate } from 'react-router-dom'
import { Sparkles, LogOut, Crown, CheckCircle2, X } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Sidebar({ items, roleLabel, isMobile = false }) {
  const visibilityClass = isMobile ? "flex" : "hidden lg:flex";
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Simulate clearing auth tokens/state
    navigate('/');
  };

  const [isPremium, setIsPremium] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  useEffect(() => {
    try {
      const profile = JSON.parse(localStorage.getItem('talentforge_profile') || '{}');
      if (profile.isPremium) setIsPremium(true);
    } catch(e) {}
  }, []);

  const handleUpgrade = () => {
    try {
      const profile = JSON.parse(localStorage.getItem('talentforge_profile') || '{}');
      profile.isPremium = true;
      localStorage.setItem('talentforge_profile', JSON.stringify(profile));
      setIsPremium(true);
      setShowUpgrade(false);
      window.location.reload(); // Reload to refresh all components
    } catch(e) {}
  };

  return (
    <aside className={`${visibilityClass} flex-col w-64 shrink-0 h-screen sticky top-0 border-r border-slate-200/70 dark:border-white/[0.06] glass rounded-none`}>
      <div className="flex items-center gap-2 px-6 h-16 shrink-0 mt-2">
        <div className="h-8 w-8 rounded-xl2 bg-brand-gradient flex items-center justify-center">
          <Sparkles size={16} className="text-white" />
        </div>
        <span className="font-heading font-bold text-lg">TalentForge</span>
      </div>
      <p className="px-6 text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 font-semibold mb-2 flex items-center justify-between">
        {roleLabel}
        {isPremium && <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white px-1.5 py-0.5 rounded-md text-[9px] font-bold flex items-center gap-1"><Crown size={10} /> PRO</span>}
      </p>
      
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
      
      <div className="p-3 mt-auto shrink-0 border-t border-slate-200/50 dark:border-white/5 space-y-2">
        {!isPremium && (
          <button 
            onClick={() => setShowUpgrade(true)}
            className="flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-xl2 text-sm font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-soft hover:shadow-lg transition-all"
          >
            <Crown size={16} />
            Upgrade to PRO
          </button>
        )}
        <button 
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 px-3 py-2.5 rounded-xl2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-danger/10 hover:text-danger transition-colors"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col slide-up">
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-heading font-bold flex items-center gap-2 text-amber-500">
                <Crown size={20} /> TalentForge PRO
              </h2>
              <button onClick={() => setShowUpgrade(false)} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 text-center">
              <h3 className="text-2xl font-bold mb-2">Accelerate your career</h3>
              <p className="text-sm text-slate-500 mb-6">Unlock exclusive job offers and premium certifications to stand out to employers.</p>
              
              <ul className="text-sm text-left space-y-3 mb-8">
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Access to Elite Job Listings (Meta, OpenAI)</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> 2 Free Premium Certifications instantly</li>
                <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Priority Resume Review</li>
              </ul>

              <button onClick={handleUpgrade} className="w-full py-3 rounded-xl2 font-bold text-white bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg hover:shadow-xl transition-all">
                Simulate Purchase & Upgrade
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
