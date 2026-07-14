import DashboardShell from '../layout/DashboardShell.jsx'
import Badge from '../components/Badge.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { candidates } from '../data/mockData.js'

export default function Applicants() {
  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Applicants" avatarSeed="RS">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {candidates.map((c) => (
          <div key={c.id} className="card card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="h-11 w-11 rounded-xl2 bg-brand-gradient flex items-center justify-center text-white font-semibold">
                {c.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <Badge tone={c.recommendation}>{c.recommendation}</Badge>
            </div>
            <h3 className="font-heading font-semibold">{c.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">{c.experience} experience</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div><p className="font-bold text-sm">{c.ats}%</p><p className="text-slate-500 dark:text-slate-400">ATS</p></div>
              <div><p className="font-bold text-sm">{c.skillMatch}%</p><p className="text-slate-500 dark:text-slate-400">Skills</p></div>
              <div><p className="font-bold text-sm">{c.interview}%</p><p className="text-slate-500 dark:text-slate-400">Interview</p></div>
            </div>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
