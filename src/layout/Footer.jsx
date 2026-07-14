import { Sparkles } from 'lucide-react'

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
            <li>Resume Analyzer</li>
            <li>Mock Interviews</li>
            <li>Skill Gap Analysis</li>
            <li>Career Coach</li>
          </ul>
        </div>
        <div>
          <p className="font-heading font-semibold text-sm mb-3">Company</p>
          <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
            <li>About</li>
            <li>Pricing</li>
            <li>Contact</li>
            <li>Privacy</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/60 dark:border-white/[0.06] py-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} TalentForge AI. Built for career intelligence.
      </div>
    </footer>
  )
}
