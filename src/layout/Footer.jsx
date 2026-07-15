import { Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer id="contact" className="border-t border-slate-200/60 dark:border-white/[0.06] mt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 rounded-xl2 bg-brand-gradient flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="font-heading font-bold text-lg">TalentForge AI</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
            Career intelligence and hiring platform connecting students, recruiters, and institutions through AI-driven insight.
          </p>
        </div>
        <div>
          <p className="font-heading font-semibold text-sm mb-3">Platform</p>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link to="/student/resume-analyzer" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Resume Analyzer</Link></li>
            <li><Link to="/student/mock-interview" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Mock Interviews</Link></li>
            <li><Link to="/student/skill-gap" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Skill Gap Analysis</Link></li>
            <li><Link to="/student/career-coach" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Career Coach</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold text-sm mb-3">Company</p>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li><Link to="/about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link></li>
            <li><Link to="/pricing" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Pricing</Link></li>
            <li><Link to="/contact" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Privacy</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-white/[0.06] py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TalentForge AI. Built for career intelligence.
      </div>
    </footer>
  )
}
