import { Eye, Sparkles, CalendarPlus, X, Check } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import Badge from '../components/Badge.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { candidates } from '../data/mockData.js'

export default function CandidateScreening() {
  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Candidate Screening" avatarSeed="RS">
      <div className="card overflow-x-auto">
        <table className="w-full text-sm min-w-[900px]">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">ATS Score</th>
              <th className="pb-3 font-medium">Skill Match</th>
              <th className="pb-3 font-medium">Resume Score</th>
              <th className="pb-3 font-medium">Experience</th>
              <th className="pb-3 font-medium">Interview Score</th>
              <th className="pb-3 font-medium">Recommendation</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 dark:border-white/5 last:border-0">
                <td className="py-4 font-medium">{c.name}</td>
                <td className="py-4">{c.ats}%</td>
                <td className="py-4">{c.skillMatch}%</td>
                <td className="py-4">{c.resume}%</td>
                <td className="py-4 text-slate-500 dark:text-slate-400">{c.experience}</td>
                <td className="py-4">{c.interview}%</td>
                <td className="py-4"><Badge tone={c.recommendation}>{c.recommendation}</Badge></td>
                <td className="py-4">
                  <div className="flex items-center gap-1.5">
                    <button title="View resume" className="h-8 w-8 flex items-center justify-center rounded-xl2 hover:bg-primary-500/10 text-primary-600 dark:text-primary-400"><Eye size={15} /></button>
                    <button title="AI summary" className="h-8 w-8 flex items-center justify-center rounded-xl2 hover:bg-secondary-500/10 text-secondary-500"><Sparkles size={15} /></button>
                    <button title="Schedule interview" className="h-8 w-8 flex items-center justify-center rounded-xl2 hover:bg-warning/10 text-warning"><CalendarPlus size={15} /></button>
                    <button title="Shortlist" className="h-8 w-8 flex items-center justify-center rounded-xl2 hover:bg-success/10 text-success"><Check size={15} /></button>
                    <button title="Reject" className="h-8 w-8 flex items-center justify-center rounded-xl2 hover:bg-danger/10 text-danger"><X size={15} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardShell>
  )
}
