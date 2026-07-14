import DashboardShell from '../layout/DashboardShell.jsx'
import CircularProgress from '../components/CircularProgress.jsx'
import Badge from '../components/Badge.jsx'
import { studentNav } from '../data/navConfig.js'
import { atsSections, atsRecommendations } from '../data/mockData.js'

export default function ATSScore() {
  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="ATS Score" avatarSeed="JS">
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card flex flex-col items-center justify-center text-center">
          <CircularProgress value={87} size={180} sublabel="Overall ATS Score" />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
            Your resume passes most automated screens. Close the keyword gap to reach 95%+.
          </p>
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="font-heading font-semibold mb-5">Section Breakdown</h3>
          <div className="space-y-4">
            {atsSections.map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium">{s.label}</span>
                  <span className="text-slate-500 dark:text-slate-400">{s.score}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-gradient transition-all duration-700"
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-heading font-semibold mb-5">Recommendations</h3>
        <div className="space-y-3">
          {atsRecommendations.map((r, i) => (
            <div key={i} className="flex items-start justify-between gap-4 p-4 rounded-xl2 border border-slate-200 dark:border-white/10">
              <p className="text-sm">{r.text}</p>
              <Badge tone={r.priority}>{r.priority}</Badge>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
