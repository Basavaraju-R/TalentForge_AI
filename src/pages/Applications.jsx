import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CalendarClock, Building2, X, Bell, CheckCircle2 } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'

const applications = [
  { company: 'Nexora Labs', role: 'Frontend Engineer', status: 'Interviewing', date: 'Jul 10, 2026' },
  { company: 'Vertex Systems', role: 'Java Developer', status: 'Shortlisted', date: 'Jul 8, 2026' },
  { company: 'Cloudframe', role: 'Full Stack Developer', status: 'Applied', date: 'Jul 5, 2026' },
  { company: 'Northbridge AI', role: 'ML Intern', status: 'Offered', date: 'Jun 28, 2026' },
  { company: 'Fintrail', role: 'Backend Engineer', status: 'Rejected', date: 'Jun 20, 2026' },
]

const statusTone = {
  Applied: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
  Shortlisted: 'bg-secondary-500/10 text-secondary-500',
  Interviewing: 'bg-warning/10 text-warning',
  Offered: 'bg-success/10 text-success',
  Rejected: 'bg-danger/10 text-danger',
}

export default function Applications() {
  const [activeApp, setActiveApp] = useState(null)
  const navigate = useNavigate()

  const handleAction = (status) => {
    if (status === 'Interviewing') navigate('/student/mock-interview')
    else if (status === 'Shortlisted') navigate('/student/notifications')
    else setActiveApp(null)
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Applications" avatarSeed="JS">
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10">
              <th className="pb-3 font-medium">Company</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">Applied on</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((a) => (
              <tr 
                key={a.company} 
                onClick={() => setActiveApp(a)}
                className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/5 cursor-pointer transition-colors group"
              >
                <td className="py-4 font-medium flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-brand-gradient-soft flex items-center justify-center text-primary-600 font-bold group-hover:scale-110 transition-transform">
                    {a.company.charAt(0)}
                  </div>
                  {a.company}
                </td>
                <td className="py-4 text-slate-600 dark:text-slate-300 font-medium">{a.role}</td>
                <td className="py-4 text-slate-500 dark:text-slate-400">{a.date}</td>
                <td className="py-4"><span className={`badge ${statusTone[a.status]}`}>{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Application Details Modal */}
      {activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" onClick={() => setActiveApp(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col slide-up" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-xl text-primary-600 font-bold shrink-0">
                  {activeApp.company.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-white">{activeApp.role}</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Building2 size={14} /> {activeApp.company}
                  </p>
                </div>
              </div>
              <button onClick={() => setActiveApp(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">Current Status</p>
                  <span className={`badge ${statusTone[activeApp.status]} text-sm py-1 px-2.5`}>{activeApp.status}</span>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-xs text-slate-500 mb-1.5 font-medium uppercase tracking-wider">Applied On</p>
                  <p className="font-semibold text-sm text-slate-700 dark:text-slate-300 flex items-center gap-1.5"><CalendarClock size={14} className="text-slate-400" /> {activeApp.date}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-4 font-heading border-b border-slate-100 dark:border-white/10 pb-2">Application Timeline</h3>
                <div className="space-y-5 pl-2 border-l-2 border-primary-500/30 ml-2 relative">
                  
                  {/* Current Stage */}
                  <div className="relative pl-6">
                    <div className="absolute w-3.5 h-3.5 rounded-full bg-primary-500 -left-[25px] top-0.5 border-[3px] border-white dark:border-slate-900 shadow-sm animate-pulse"></div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{activeApp.status}</p>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium text-primary-600 dark:text-primary-400">Current Phase</p>
                  </div>
                  
                  {/* Past Stages */}
                  {activeApp.status !== 'Applied' && (
                    <div className="relative pl-6">
                      <div className="absolute w-3 h-3 rounded-full bg-success -left-[24px] top-0.5 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                      <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Application Reviewed</p>
                      <p className="text-xs text-slate-400 mt-0.5">Completed</p>
                    </div>
                  )}

                  <div className="relative pl-6">
                    <div className="absolute w-3 h-3 rounded-full bg-success -left-[24px] top-0.5 border-2 border-white dark:border-slate-900 shadow-sm"></div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">Application Submitted</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activeApp.date}</p>
                  </div>
                  
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-800/50 flex justify-end gap-3">
              <button onClick={() => setActiveApp(null)} className="btn-secondary px-5 py-2">Close</button>
              
              {activeApp.status === 'Interviewing' && (
                <button onClick={() => handleAction('Interviewing')} className="btn-primary py-2 px-5 flex items-center gap-2">
                  <CalendarClock size={16} /> Prepare for Interview
                </button>
              )}
              {activeApp.status === 'Shortlisted' && (
                <button onClick={() => handleAction('Shortlisted')} className="btn-primary py-2 px-5 flex items-center gap-2">
                  <Bell size={16} /> Check Notifications
                </button>
              )}
              {activeApp.status === 'Offered' && (
                <button onClick={() => setActiveApp(null)} className="bg-success text-white hover:bg-success/90 rounded-xl2 font-semibold text-sm py-2 px-5 flex items-center gap-2 transition-colors">
                  <CheckCircle2 size={16} /> View Offer Letter
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
