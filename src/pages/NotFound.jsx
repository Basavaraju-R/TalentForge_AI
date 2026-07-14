import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sparkles, Send, Mail, Phone, MessageSquare, Loader2, CheckCircle2, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate sending the message
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      
      // Navigate back to home after showing success
      setTimeout(() => {
        navigate('/')
      }, 2000)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-brand-gradient-soft">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 relative overflow-hidden slide-up">
        
        {/* Top Decoration */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-brand-gradient"></div>

        {!isSuccess ? (
          <>
            <div className="flex flex-col items-center text-center mb-8">
              <div className="h-14 w-14 rounded-2xl bg-brand-gradient-soft flex items-center justify-center mb-4 border border-primary-500/20 shadow-sm">
                <Sparkles size={24} className="text-primary-600 dark:text-primary-400" />
              </div>
              <h1 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Page Not Found</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                This page hasn't been built into your career roadmap yet. Send us a message and we'll notify you when it's ready!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Contact Info</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail size={16} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Email or Mobile Number" 
                    className="input-field w-full pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">Your Message</label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none text-slate-400">
                    <MessageSquare size={16} />
                  </div>
                  <textarea 
                    placeholder="What feature were you looking for?" 
                    className="input-field w-full pl-10 h-28 resize-none py-3"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-3">
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : <><Send size={18} /> Send Request</>}
                </button>
                <button 
                  type="button" 
                  onClick={() => navigate('/')} 
                  className="text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex items-center justify-center gap-2 py-2"
                >
                  <ArrowLeft size={16} /> Back to Dashboard
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center py-8 animate-fade-in">
            <div className="h-20 w-20 rounded-full bg-success/10 flex items-center justify-center mb-6">
              <CheckCircle2 size={40} className="text-success" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Request Sent!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              We've recorded your request. We'll send you a notification directly to your contact method as soon as this feature is live!
            </p>
            <p className="text-xs text-slate-400 mt-6 animate-pulse">Redirecting to dashboard...</p>
          </div>
        )}
      </div>
    </div>
  )
}
