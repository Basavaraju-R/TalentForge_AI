import { Eye, Check, X, FileText, Briefcase, Award } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '../layout/DashboardShell.jsx'
import Badge from '../components/Badge.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { candidates as initialCandidates } from '../data/mockData.js'

export default function Applicants() {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [selectedApplicant, setSelectedApplicant] = useState(null)

  const handleShortlist = (id) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, recommendation: 'Strong Fit' } : c))
  }

  const handleReject = (id) => {
    setCandidates(candidates.filter(c => c.id !== id))
  }

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Applicants" avatarSeed="RS">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold">All Applicants</h2>
          <p className="text-sm text-slate-500 mt-1">Review applicant cards and manage their status.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {candidates.length === 0 && (
          <p className="text-slate-500 text-sm col-span-full">No applicants available.</p>
        )}
        {candidates.map((c) => (
          <div key={c.id} className="card card-hover flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl2 bg-brand-gradient flex items-center justify-center text-white font-semibold shadow-soft shrink-0">
                  {c.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm leading-tight">{c.name}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{c.experience} experience</p>
                </div>
              </div>
              <Badge tone={c.recommendation}>{c.recommendation}</Badge>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-white/5 mb-4 mt-2">
              <div><p className="font-bold text-sm text-primary-600 dark:text-primary-400">{c.ats}%</p><p className="text-slate-500 dark:text-slate-400 mt-0.5">ATS</p></div>
              <div><p className="font-bold text-sm">{c.skillMatch}%</p><p className="text-slate-500 dark:text-slate-400 mt-0.5">Skills</p></div>
              <div><p className="font-bold text-sm text-secondary-500">{c.interview}%</p><p className="text-slate-500 dark:text-slate-400 mt-0.5">Interview</p></div>
            </div>

            <div className="mt-auto grid grid-cols-3 gap-2 border-t border-slate-100 dark:border-white/10 pt-4">
              <button onClick={() => setSelectedApplicant(c)} className="flex flex-col items-center gap-1 text-xs font-semibold text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center"><Eye size={14} /></div>
                View
              </button>
              <button onClick={() => handleShortlist(c.id)} className="flex flex-col items-center gap-1 text-xs font-semibold text-slate-500 hover:text-success transition-colors">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center"><Check size={14} /></div>
                Shortlist
              </button>
              <button onClick={() => handleReject(c.id)} className="flex flex-col items-center gap-1 text-xs font-semibold text-slate-500 hover:text-danger transition-colors">
                <div className="h-8 w-8 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center"><X size={14} /></div>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedApplicant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col slide-up max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-start justify-between shrink-0 bg-brand-gradient-soft">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-xl shadow-soft">
                  {selectedApplicant.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h2 className="text-xl font-heading font-bold text-slate-900 dark:text-white">{selectedApplicant.name}</h2>
                  <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">Applied for Software Engineer</p>
                </div>
              </div>
              <button onClick={() => setSelectedApplicant(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
                  <Briefcase className="text-secondary-500 shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Experience</p>
                    <p className="text-sm font-semibold">{selectedApplicant.experience}</p>
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 dark:border-white/10 flex items-start gap-3">
                  <Award className="text-warning shrink-0" size={18} />
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">Recommendation</p>
                    <p className="text-sm font-semibold">{selectedApplicant.recommendation}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold flex items-center gap-2 mb-3"><FileText size={16} className="text-primary-500" /> Resume Highlights</h4>
                <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2 list-disc list-inside">
                  <li>Strong foundation in modern frontend frameworks (React, Vue).</li>
                  <li>Backend experience with Node.js and Express.</li>
                  <li>Good understanding of cloud infrastructure (AWS).</li>
                </ul>
              </div>
            </div>
            
            <div className="p-4 border-t border-slate-200 dark:border-white/10 flex gap-3">
              <button onClick={() => setSelectedApplicant(null)} className="btn-secondary flex-1">Close</button>
              <button onClick={() => { handleShortlist(selectedApplicant.id); setSelectedApplicant(null); }} className="btn-primary flex-1">Shortlist Candidate</button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
