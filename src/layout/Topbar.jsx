import { useState, useEffect } from 'react'
import { Bell, Search, Menu, Crown, X, QrCode } from 'lucide-react'
import { Link } from 'react-router-dom'
import ThemeToggle from '../components/ThemeToggle.jsx'

export default function Topbar({ title, onMenuClick, avatarSeed = 'TF' }) {
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false)
  const [initials, setInitials] = useState(avatarSeed)

  const loadInitials = () => {
    const stored = localStorage.getItem('talentforge_profile')
    if (stored) {
      try {
        const data = JSON.parse(stored)
        if (data && data.name) {
          const parts = data.name.trim().split(' ')
          if (parts.length > 1) {
            setInitials((parts[0][0] + parts[parts.length - 1][0]).toUpperCase())
          } else {
            setInitials(data.name.substring(0, 2).toUpperCase())
          }
        }
      } catch (e) {
        // Fallback to prop
      }
    }
  }

  useEffect(() => {
    loadInitials()
    window.addEventListener('profileUpdated', loadInitials)
    return () => window.removeEventListener('profileUpdated', loadInitials)
  }, [])

  return (
    <>
      <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 lg:px-8 glass border-b border-slate-200/70 dark:border-white/[0.06]">
        <div className="flex items-center gap-3">
          <button onClick={onMenuClick} className="lg:hidden h-9 w-9 flex items-center justify-center rounded-xl2 glass">
            <Menu size={18} />
          </button>
          <h1 className="font-heading font-semibold text-lg">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 bg-white/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl2 px-3 py-2 w-64">
            <Search size={16} className="text-slate-400" />
            <input placeholder="Search..." className="bg-transparent outline-none text-sm w-full placeholder:text-slate-400" />
          </div>
          
          <button 
            onClick={() => setIsPremiumModalOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-4 py-2 rounded-xl2 text-sm font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
          >
            <Crown size={16} className="text-yellow-200" /> Upgrade
          </button>

          <Link to="/notifications" className="h-10 w-10 rounded-xl2 flex items-center justify-center glass relative hover:scale-105 transition-transform">
            <Bell size={17} />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-danger" />
          </Link>
          <ThemeToggle />
          <Link to="/profile" className="h-10 w-10 rounded-xl2 bg-brand-gradient flex items-center justify-center text-white text-sm font-semibold tracking-wider">
            {initials}
          </Link>
        </div>
      </header>

      {/* Premium Upgrade Modal */}
      {isPremiumModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in" onClick={() => setIsPremiumModalOpen(false)}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col slide-up relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setIsPremiumModalOpen(false)} className="absolute top-4 right-4 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors z-10">
              <X size={16} />
            </button>
            
            <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20">
                <Crown size={100} />
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="h-16 w-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-4 shadow-inner">
                  <Crown size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white font-heading">TalentForge Premium</h2>
                <p className="text-white/90 text-sm mt-2">Unlock unlimited mock interviews and advanced resume analysis.</p>
              </div>
            </div>
            
            <div className="p-8 flex flex-col items-center bg-slate-50 dark:bg-slate-950">
              <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200 mb-6 relative">
                {/* Simulated QR Code placeholder for the user's specific image */}
                <div className="w-48 h-48 bg-slate-100 rounded-xl flex items-center justify-center border-2 border-dashed border-slate-300">
                  <QrCode size={64} className="text-slate-400" />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-sm border border-slate-100">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">GPay</div>
                </div>
              </div>
              
              <div className="text-center space-y-1 w-full bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-white/10">
                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">UPI ID: basava9240-1@okicici</p>
                <p className="text-slate-500 dark:text-slate-400 text-xs font-medium">Scan to pay with any UPI app</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
