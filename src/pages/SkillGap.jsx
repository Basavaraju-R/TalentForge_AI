import { ArrowRight, CheckCircle2, Circle } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { currentSkills, requiredSkills, gapRecommendations } from '../data/mockData.js'

export default function SkillGap() {
  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Skill Gap Analysis" avatarSeed="JS">
      <div className="grid lg:grid-cols-5 gap-6 items-stretch">
        <div className="lg:col-span-2 card">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-success" /> Current Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {currentSkills.map((s) => (
              <span key={s} className="badge bg-success/10 text-success">{s}</span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1 flex items-center justify-center">
          <div className="h-14 w-14 rounded-full bg-brand-gradient flex items-center justify-center text-white">
            <ArrowRight size={22} />
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Circle size={16} className="text-secondary-500" /> Required Skills — Java Developer
          </h3>
          <div className="flex flex-wrap gap-2">
            {requiredSkills.map((s) => (
              <span key={s} className="badge bg-secondary-500/10 text-secondary-500">{s}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-heading font-semibold mb-1">AI Recommendations</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">Estimated completion time to fully close the gap: <span className="font-semibold text-slate-700 dark:text-slate-200">10 weeks</span></p>
        <div className="space-y-5">
          {gapRecommendations.map((g) => (
            <div key={g.skill}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium">{g.skill}</span>
                <span className="text-slate-500 dark:text-slate-400">{g.weeks} wks · {g.progress}%</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-brand-gradient transition-all duration-700" style={{ width: `${g.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
