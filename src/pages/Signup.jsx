import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, User, GraduationCap, Building2, School } from 'lucide-react'

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, dest: '/student/dashboard' },
  { id: 'recruiter', label: 'Recruiter', icon: Building2, dest: '/recruiter/dashboard' },
  { id: 'institution', label: 'Institution', icon: School, dest: '/institution/dashboard' },
]

export default function Signup() {
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const dest = roles.find((r) => r.id === role)?.dest ?? '/student/dashboard'
    navigate(dest)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-brand-gradient-soft" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />

      <div className="relative w-full max-w-md card animate-rise">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="h-9 w-9 rounded-xl2 bg-brand-gradient flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl">TalentForge</span>
        </Link>

        <h1 className="text-2xl font-heading font-bold text-center">Create your account</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 mb-6">Choose your role to get a tailored workspace.</p>

        <div className="grid grid-cols-3 gap-2 mb-6">
          {roles.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex flex-col items-center gap-1.5 py-3 rounded-xl2 border text-xs font-semibold transition-all ${
                role === r.id
                  ? 'bg-brand-gradient text-white border-transparent shadow-soft'
                  : 'border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:border-primary-400'
              }`}
            >
              <r.icon size={18} />
              {r.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Full name</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input required placeholder="Jane Doe" className="input-field pl-11" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="email" required placeholder="you@example.com" className="input-field pl-11" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="password" required placeholder="••••••••" className="input-field pl-11" />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full !py-3">Create account</button>
        </form>

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-8">
          Already have an account? <Link to="/login" className="text-primary-600 dark:text-primary-400 font-semibold">Log in</Link>
        </p>
      </div>
    </div>
  )
}
