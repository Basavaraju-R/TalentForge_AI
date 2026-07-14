import { useState } from 'react'
import { CalendarClock, Briefcase, FileSearch, Eye, GitBranch, CheckCheck, X } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { notifications as initialNotifications } from '../data/mockData.js'

const iconMap = {
  'Interview Reminder': CalendarClock,
  'New Job': Briefcase,
  'Resume Improvement': FileSearch,
  'Recruiter Viewed Profile': Eye,
  'Skill Recommendation': GitBranch,
}

export default function Notifications() {
  const [notificationsList, setNotificationsList] = useState(initialNotifications)
  const [activeNotification, setActiveNotification] = useState(null)

  const markAllAsRead = () => {
    setNotificationsList(notificationsList.map(n => ({ ...n, unread: false })))
  }

  const removeNotification = (id, e) => {
    e.stopPropagation()
    setNotificationsList(notificationsList.filter(n => n.id !== id))
    if (activeNotification?.id === id) {
      setActiveNotification(null)
    }
  }

  const openNotification = (n) => {
    // Mark as read when opened
    setNotificationsList(notificationsList.map(item => 
      item.id === n.id ? { ...item, unread: false } : item
    ))
    setActiveNotification({ ...n, unread: false })
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Notifications" avatarSeed="JS">
      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-heading font-semibold">
            All notifications {notificationsList.some(n => n.unread) && <span className="badge bg-primary-500 text-white ml-2">{notificationsList.filter(n => n.unread).length} New</span>}
          </h3>
          <button 
            onClick={markAllAsRead} 
            className="text-sm font-medium text-primary-600 dark:text-primary-400 flex items-center gap-1 hover:text-primary-700 transition-colors"
            disabled={!notificationsList.some(n => n.unread)}
          >
            <CheckCheck size={15} /> Mark all as read
          </button>
        </div>
        
        {notificationsList.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <CheckCheck size={40} className="mx-auto mb-3 opacity-20" />
            <p>You're all caught up!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {notificationsList.map((n) => {
              const Icon = iconMap[n.type] ?? Briefcase
              return (
                <div 
                  key={n.id} 
                  onClick={() => openNotification(n)}
                  className={`group flex items-start gap-4 p-4 rounded-xl2 border transition-colors cursor-pointer ${n.unread ? 'border-primary-500/30 bg-primary-500/5' : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                >
                  <div className={`h-10 w-10 rounded-xl2 flex items-center justify-center shrink-0 ${n.unread ? 'bg-primary-500 text-white' : 'bg-brand-gradient-soft text-primary-600 dark:text-primary-400'}`}>
                    <Icon size={17} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm">{n.type}</p>
                      <span className="text-xs text-slate-400">{n.time}</span>
                    </div>
                    <p className={`text-sm mt-0.5 line-clamp-1 ${n.unread ? 'text-slate-700 dark:text-slate-200 font-medium' : 'text-slate-600 dark:text-slate-400'}`}>{n.text}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {n.unread && <span className="h-2 w-2 rounded-full bg-primary-500 mt-2" />}
                    <button 
                      onClick={(e) => removeNotification(n.id, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-danger hover:bg-danger/10 rounded transition-all"
                      aria-label="Remove notification"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Notification Modal */}
      {activeNotification && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setActiveNotification(null)}>
          <div 
            className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
              <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400">
                {(() => {
                  const ActiveIcon = iconMap[activeNotification.type] ?? Briefcase
                  return <ActiveIcon size={18} />
                })()}
                <h3 className="font-heading font-semibold text-lg">
                  {activeNotification.type}
                </h3>
              </div>
              <button 
                onClick={() => setActiveNotification(null)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-sm text-slate-500 mb-4">{activeNotification.time}</p>
              <p className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {activeNotification.text}
              </p>
            </div>

            <div className="flex justify-end p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
              <button 
                onClick={() => setActiveNotification(null)}
                className="btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
