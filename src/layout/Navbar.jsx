import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Sparkles, Menu, X } from 'lucide-react'
import ThemeToggle from '../components/ThemeToggle.jsx'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/#features' },
  { label: 'For Students', to: '/#students' },
  { label: 'For Recruiters', to: '/#recruiters' },
  { label: 'Institutions', to: '/#institutions' },
  { label: 'Pricing', to: '/#pricing' },
  { label: 'About', to: '/#about' },
  { label: 'Contact', to: '/#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 glass border-b border-slate-200/60 dark:border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl2 bg-brand-gradient flex items-center justify-center">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-heading font-bold text-lg">TalentForge AI</span>
        </Link>

        <nav className="hidden xl:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.to} href={l.to} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="hidden sm:flex" />
          <Link to="/login" className="hidden sm:inline-flex text-sm font-semibold px-4 py-2 rounded-xl2 hover:bg-primary-500/10 text-primary-600 dark:text-primary-400 transition-colors">
            Login
          </Link>
          <Link to="/signup" className="btn-primary !px-4 !py-2 text-sm">Sign Up</Link>
          <button className="xl:hidden h-9 w-9 flex items-center justify-center rounded-xl2 glass" onClick={() => setOpen((o) => !o)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="xl:hidden px-4 pb-4 flex flex-col gap-1 animate-fade-in">
          {links.map((l) => (
            <a key={l.to} href={l.to} className="px-3 py-2 rounded-xl2 text-sm font-medium hover:bg-primary-500/10" onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
