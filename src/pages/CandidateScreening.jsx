import { Eye, Sparkles, CalendarPlus, X, Check, FileText, Bot } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '../layout/DashboardShell.jsx'
import Badge from '../components/Badge.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { candidates as initialCandidates } from '../data/mockData.js'

export default function CandidateScreening() {
  const [candidates, setCandidates] = useState(initialCandidates)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedCandidate, setSelectedCandidate] = useState(null)
  const [interviewDate, setInterviewDate] = useState('')

  const openModal = (type, candidate) => {
    setSelectedCandidate(candidate)
    setActiveModal(type)
    setInterviewDate('')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedCandidate(null)
  }

  const handleShortlist = (id) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, recommendation: 'Strong Fit' } : c))
  }

  const handleReject = (id) => {
    setCandidates(candidates.filter(c => c.id !== id))
  }

  const handleScheduleSubmit = (e) => {
    e.preventDefault()
    alert(`Interview scheduled for ${selectedCandidate.name} on ${interviewDate}`)
    closeModal()
  }

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Candidate Screening" avatarSeed="RS">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold">Review Applicants</h2>
          <p className="text-sm text-slate-500 mt-1">Screen candidates and move them through the funnel.</p>
        </div>
      </div>

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
              <th className="pb-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length === 0 && (
              <tr>
                <td colSpan="8" className="py-8 text-center text-slate-500">No candidates found.</td>
              </tr>
            )}
            {candidates.map((c) => (
              <tr key={c.id} className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-4 font-medium">{c.name}</td>
                <td className="py-4 font-semibold text-primary-600 dark:text-primary-400">{c.ats}%</td>
                <td className="py-4">{c.skillMatch}%</td>
                <td className="py-4">{c.resume}%</td>
                <td className="py-4 text-slate-500 dark:text-slate-400">{c.experience}</td>
                <td className="py-4">{c.interview}%</td>
                <td className="py-4"><Badge tone={c.recommendation}>{c.recommendation}</Badge></td>
                <td className="py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openModal('resume', c)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-primary-500/10 hover:bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-semibold transition-colors">
                      <Eye size={14} /> Resume
                    </button>
                    <button onClick={() => openModal('ai', c)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-secondary-500/10 hover:bg-secondary-500/20 text-secondary-500 text-xs font-semibold transition-colors">
                      <Sparkles size={14} /> AI
                    </button>
                    <button onClick={() => openModal('schedule', c)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-warning/10 hover:bg-warning/20 text-warning text-xs font-semibold transition-colors">
                      <CalendarPlus size={14} /> Schedule
                    </button>
                    <button onClick={() => handleShortlist(c.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-success/10 hover:bg-success/20 text-success text-xs font-semibold transition-colors">
                      <Check size={14} /> Shortlist
                    </button>
                    <button onClick={() => handleReject(c.id)} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-xs font-semibold transition-colors">
                      <X size={14} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeModal && selectedCandidate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col slide-up max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                {activeModal === 'resume' && <><FileText className="text-primary-500" /> Resume: {selectedCandidate.name}</>}
                {activeModal === 'ai' && <><Bot className="text-secondary-500" /> AI Insights: {selectedCandidate.name}</>}
                {activeModal === 'schedule' && <><CalendarPlus className="text-warning" /> Schedule Interview</>}
              </h2>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              {activeModal === 'resume' && (
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-white/10 text-sm font-mono text-slate-600 dark:text-slate-400 leading-relaxed">
                    <h3 className="text-lg font-sans font-bold text-slate-900 dark:text-white mb-4">{selectedCandidate.name}</h3>
                    <p>Experience: {selectedCandidate.experience}</p>
                    <p>Education: B.Tech Computer Science (2022)</p>
                    <p className="mt-4 break-words">Skills: React, Node.js, Python, AWS, SQL, MongoDB...</p>
                    <br/>
                    <p>-- WORK HISTORY --</p>
                    <p>Software Engineer Intern @ TechCorp</p>
                    <p>• Developed RESTful APIs reducing latency by 20%</p>
                    <p>• Built interactive frontend dashboards using React</p>
                  </div>
                  <button onClick={closeModal} className="btn-secondary w-full">Close Document</button>
                </div>
              )}

              {activeModal === 'ai' && (
                <div className="space-y-4">
                  <div className="bg-secondary-500/10 p-5 rounded-xl border border-secondary-500/20">
                    <h4 className="font-semibold text-secondary-600 dark:text-secondary-400 mb-2">Strengths</h4>
                    <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li>Excellent match for required tech stack ({selectedCandidate.skillMatch}%).</li>
                      <li>Strong problem-solving indicators found in past projects.</li>
                      <li>High ATS parsing success rate ({selectedCandidate.ats}%).</li>
                    </ul>
                  </div>
                  <div className="bg-warning/10 p-5 rounded-xl border border-warning/20">
                    <h4 className="font-semibold text-warning mb-2">Areas for Verification</h4>
                    <ul className="list-disc list-inside text-sm text-slate-700 dark:text-slate-300 space-y-1">
                      <li>Clarify exact role in team projects (collaboration vs individual contribution).</li>
                      <li>Test deep system design knowledge.</li>
                    </ul>
                  </div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 p-2">
                    AI Verdict: <Badge tone={selectedCandidate.recommendation}>{selectedCandidate.recommendation}</Badge>
                  </p>
                </div>
              )}

              {activeModal === 'schedule' && (
                <form onSubmit={handleScheduleSubmit} className="space-y-5">
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Send an interview invitation to <strong>{selectedCandidate.name}</strong>. They will be notified via email.
                  </p>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Date & Time</label>
                    <input 
                      required 
                      type="datetime-local" 
                      value={interviewDate} 
                      onChange={e => setInterviewDate(e.target.value)} 
                      className="input-field" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Interview Type</label>
                    <select className="input-field">
                      <option>Technical Round (1 hr)</option>
                      <option>HR Screening (30 min)</option>
                      <option>System Design (1.5 hr)</option>
                    </select>
                  </div>
                  <div className="flex gap-3 pt-4">
                    <button type="button" onClick={closeModal} className="btn-secondary flex-1">Cancel</button>
                    <button type="submit" className="btn-primary flex-1">Send Invite</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
