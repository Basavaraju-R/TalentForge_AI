import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Eye, EyeOff, Globe, Code2, Briefcase } from 'lucide-react'

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/student/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      <div className="absolute inset-0 bg-brand-gradient-soft" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl" />

      <div className="relative w-full max-w-md card animate-rise">
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="h-9 w-9 rounded-xl2 bg-brand-gradient flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl">TalentForge</span>
        </Link>

        <h1 className="text-2xl font-heading font-bold text-center">Welcome back</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 mb-8">Log in to continue building your career.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              <input type={showPass ? 'text' : 'password'} required placeholder="••••••••" className="input-field pl-11 pr-11" />
              <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <input type="checkbox" className="rounded accent-primary-500" /> Remember me
            </label>
            <a href="#" className="text-primary-600 dark:text-primary-400 font-medium">Forgot password?</a>
          </div>
          <button type="submit" className="btn-primary w-full !py-3">Login</button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          <span className="text-xs text-slate-400">or continue with</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <button className="btn-secondary !px-0" title="Continue with Google"><Globe size={18} /></button>
          <button className="btn-secondary !px-0" title="Continue with GitHub"><Code2 size={18} /></button>
          <button className="btn-secondary !px-0" title="Continue with LinkedIn"><Briefcase size={18} /></button>
        </div>

        <p className="text-sm text-center text-slate-500 dark:text-slate-400 mt-8">
          Don't have an account? <Link to="/signup" className="text-primary-600 dark:text-primary-400 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
