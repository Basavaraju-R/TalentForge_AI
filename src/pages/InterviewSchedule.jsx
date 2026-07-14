import { Video, Clock, PhoneCall, CalendarSync, X, MapPin } from 'lucide-react'
import { useState } from 'react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'

const initialSchedule = [
  { id: 1, time: '10:00 AM', candidate: 'Ananya Rao', role: 'Java Developer', mode: 'Video' },
  { id: 2, time: '11:30 AM', candidate: 'Divya Shah', role: 'Frontend Engineer', mode: 'Video' },
  { id: 3, time: '02:00 PM', candidate: 'Karthik Iyer', role: 'Full Stack Developer', mode: 'In-person' },
  { id: 4, time: '04:00 PM', candidate: 'Meera Nair', role: 'Data Analyst', mode: 'Video' },
]

export default function InterviewSchedule() {
  const [schedule, setSchedule] = useState(initialSchedule)
  const [activeModal, setActiveModal] = useState(null)
  const [selectedInterview, setSelectedInterview] = useState(null)
  const [newTime, setNewTime] = useState('')

  const today = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'short', day: 'numeric', year: 'numeric'
  }).format(new Date())

  const openModal = (type, interview) => {
    setSelectedInterview(interview)
    setActiveModal(type)
    setNewTime('')
  }

  const closeModal = () => {
    setActiveModal(null)
    setSelectedInterview(null)
  }

  const handleCancel = (id) => {
    if (confirm('Are you sure you want to cancel this interview?')) {
      setSchedule(schedule.filter(s => s.id !== id))
    }
  }

  const handleReschedule = (e) => {
    e.preventDefault()
    setSchedule(schedule.map(s => s.id === selectedInterview.id ? { ...s, time: newTime } : s))
    closeModal()
  }

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Interview Schedule" avatarSeed="RS">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-heading font-bold">Upcoming Interviews</h2>
          <p className="text-sm text-slate-500 mt-1">Manage today's schedule and connect with candidates.</p>
        </div>
      </div>

      <div className="card">
        <h3 className="font-heading font-semibold mb-5 text-slate-800 dark:text-slate-100 flex items-center gap-2">
          <Clock className="text-primary-500" size={18} /> {today}
        </h3>
        
        <div className="space-y-4">
          {schedule.length === 0 && (
            <p className="text-slate-500 text-sm py-4">No interviews scheduled for today.</p>
          )}
          {schedule.map((s) => (
            <div key={s.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl2 border border-slate-200 dark:border-white/10 hover:border-primary-500/30 transition-colors bg-white/50 dark:bg-white/[0.02]">
              <div className="flex items-center gap-2 text-sm font-semibold w-24 shrink-0">
                <Clock size={14} className="text-primary-500" /> {s.time}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{s.candidate}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{s.role}</p>
              </div>
              <div className="flex items-center gap-4 sm:ml-auto">
                <span className={`badge ${s.mode === 'Video' ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' : 'bg-secondary-500/10 text-secondary-500'} flex items-center gap-1`}>
                  {s.mode === 'Video' ? <Video size={12} /> : <MapPin size={12} />} {s.mode}
                </span>
                
                <div className="flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-4 ml-4">
                  {s.mode === 'Video' && (
                    <button onClick={() => openModal('call', s)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-success/10 hover:bg-success/20 text-success text-xs font-semibold transition-colors">
                      <PhoneCall size={14} /> Join
                    </button>
                  )}
                  <button onClick={() => openModal('reschedule', s)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warning/10 hover:bg-warning/20 text-warning text-xs font-semibold transition-colors">
                    <CalendarSync size={14} /> Reschedule
                  </button>
                  <button onClick={() => openModal('cancel', s)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-danger/10 hover:bg-danger/20 text-danger text-xs font-semibold transition-colors">
                    <X size={14} /> Cancel
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModal && selectedInterview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden flex flex-col slide-up max-h-[90vh]">
            
            {activeModal === 'call' && (
              <div className="p-8 text-center space-y-4">
                <div className="h-16 w-16 bg-success/10 text-success rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-slow">
                  <Video size={32} />
                </div>
                <h3 className="font-heading font-semibold text-xl">Connecting...</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Starting video call with <strong>{selectedInterview.candidate}</strong>.
                </p>
                <button onClick={closeModal} className="btn-secondary w-full mt-4">Cancel Call</button>
              </div>
            )}

            {activeModal === 'reschedule' && (
              <>
                <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
                  <h2 className="font-heading font-semibold text-slate-900 dark:text-white">Reschedule</h2>
                  <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                    <X size={20} />
                  </button>
                </div>
                <div className="p-5">
                  <form onSubmit={handleReschedule} className="space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Pick a new time for <strong>{selectedInterview.candidate}</strong>.
                    </p>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">New Time</label>
                      <input 
                        required 
                        type="time" 
                        value={newTime} 
                        onChange={e => setNewTime(e.target.value)} 
                        className="input-field" 
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <button type="button" onClick={closeModal} className="btn-secondary flex-1">Back</button>
                      <button type="submit" className="btn-primary flex-1">Save Time</button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {activeModal === 'cancel' && (
              <div className="p-6 text-center space-y-4">
                <div className="h-14 w-14 bg-danger/10 text-danger rounded-full flex items-center justify-center mx-auto mb-2">
                  <X size={28} />
                </div>
                <h3 className="font-heading font-semibold text-xl">Cancel Interview?</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Are you sure you want to cancel the interview with <strong>{selectedInterview.candidate}</strong>? This action cannot be undone.
                </p>
                <div className="flex gap-3 mt-6 pt-2">
                  <button onClick={closeModal} className="btn-secondary flex-1">Keep it</button>
                  <button onClick={() => {
                    setSchedule(schedule.filter(s => s.id !== selectedInterview.id))
                    closeModal()
                  }} className="btn-primary !bg-danger hover:!bg-danger/90 border-transparent text-white flex-1">
                    Yes, Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </DashboardShell>
  )
}
