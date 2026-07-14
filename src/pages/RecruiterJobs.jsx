import { Plus, MapPin, Users, X, CheckCircle, Briefcase, IndianRupee } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { jobs as initialJobs } from '../data/mockData.js'

export default function RecruiterJobs() {
  const navigate = useNavigate()
  const [localJobs, setLocalJobs] = useState(initialJobs)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ title: '', company: '', location: '', experience: '', salary: '', remote: false })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePostJob = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setTimeout(() => {
      const newJob = {
        id: Date.now(),
        logo: '✨',
        title: formData.title,
        company: formData.company,
        location: formData.location,
        experience: formData.experience,
        salary: formData.salary,
        remote: formData.remote,
        match: Math.floor(Math.random() * 20) + 70 // Fake match for new jobs
      }
      setLocalJobs([newJob, ...localJobs])
      setIsSubmitting(false)
      setIsModalOpen(false)
      setFormData({ title: '', company: '', location: '', experience: '', salary: '', remote: false })
    }, 1000)
  }

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Jobs" avatarSeed="RS">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold">Active Postings</h2>
          <p className="text-sm text-slate-500 mt-1">Manage your job listings and view candidates.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Post a job
        </button>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {localJobs.map((j) => (
          <div key={j.id} className="card card-hover flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-xl shrink-0">{j.logo}</div>
                <div>
                  <p className="font-semibold text-sm leading-tight">{j.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{j.company}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
              <p className="flex items-center gap-2"><IndianRupee size={14} /> {j.salary}</p>
              <p className="flex items-center gap-2"><MapPin size={14} /> {j.location} {j.remote && <span className="badge bg-secondary-500/10 text-secondary-500 ml-1">Remote</span>}</p>
              <p className="flex items-center gap-2"><Briefcase size={14} /> {j.experience}</p>
            </div>
            
            <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100 dark:border-white/10">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                <Users size={14} className="text-primary-500" /> {Math.floor(j.match * 1.4)} applicants
              </p>
              <button onClick={() => navigate('/recruiter/applicants')} className="text-sm font-semibold text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                View &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col slide-up max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-white">Post a New Job</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form onSubmit={handlePostJob} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Job Title</label>
                  <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="input-field" placeholder="e.g. Senior Frontend Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                  <input required type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="input-field" placeholder="e.g. Nexora Labs" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Location</label>
                    <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="input-field" placeholder="e.g. Bengaluru" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Salary Range</label>
                    <input required type="text" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className="input-field" placeholder="e.g. ₹15L - ₹25L" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Experience Required</label>
                  <select required value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} className="input-field">
                    <option value="" disabled>Select experience...</option>
                    <option value="0-1 years">0-1 years (Fresher)</option>
                    <option value="1-3 years">1-3 years (Junior)</option>
                    <option value="3-5 years">3-5 years (Mid-level)</option>
                    <option value="5+ years">5+ years (Senior)</option>
                  </select>
                </div>
                <label className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 dark:border-white/10 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <input type="checkbox" checked={formData.remote} onChange={e => setFormData({...formData, remote: e.target.checked})} className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">This is a fully remote role</span>
                </label>
                
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 flex justify-center items-center gap-2">
                    {isSubmitting ? 'Posting...' : <><CheckCircle size={16} /> Publish Job</>}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
