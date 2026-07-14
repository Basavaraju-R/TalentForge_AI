import { Plus, MapPin, Users } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { jobs } from '../data/mockData.js'

export default function RecruiterJobs() {
  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Jobs" avatarSeed="RS">
      <div className="flex justify-end">
        <button className="btn-primary"><Plus size={16} /> Post a job</button>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {jobs.map((j) => (
          <div key={j.id} className="card card-hover">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-11 w-11 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-xl">{j.logo}</div>
              <div>
                <p className="font-semibold text-sm">{j.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{j.company}</p>
              </div>
            </div>
            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2"><MapPin size={14} /> {j.location}</p>
            <p className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4"><Users size={14} /> {Math.floor(j.match * 1.4)} applicants</p>
            <button className="btn-secondary w-full !py-2.5 text-sm">View applicants</button>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
