import { Video, Clock } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'

const schedule = [
  { time: '10:00 AM', candidate: 'Ananya Rao', role: 'Java Developer', mode: 'Video' },
  { time: '11:30 AM', candidate: 'Divya Shah', role: 'Frontend Engineer', mode: 'Video' },
  { time: '02:00 PM', candidate: 'Karthik Iyer', role: 'Full Stack Developer', mode: 'In-person' },
  { time: '04:00 PM', candidate: 'Meera Nair', role: 'Data Analyst', mode: 'Video' },
]

export default function InterviewSchedule() {
  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Interview Schedule" avatarSeed="RS">
      <div className="card">
        <h3 className="font-heading font-semibold mb-5">Today — Jul 14, 2026</h3>
        <div className="space-y-3">
          {schedule.map((s, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl2 border border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 text-sm font-semibold w-24 shrink-0"><Clock size={14} className="text-primary-500" /> {s.time}</div>
              <div className="flex-1">
                <p className="font-medium text-sm">{s.candidate}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.role}</p>
              </div>
              <span className="badge bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center gap-1"><Video size={12} /> {s.mode}</span>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
