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
  const [signupMethod, setSignupMethod] = useState('email') // 'email' or 'mobile'
  const navigate = useNavigate()

  const [passwordError, setPasswordError] = useState('')

  const validatePassword = (password) => {
    // at least 8 characters, 1 uppercase, 1 number, 1 special character
    const minLength = password.length >= 8;
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return minLength && hasUpper && hasNumber && hasSpecial;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const password = e.target.password.value;
    
    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 8 characters, and include at least one capital letter, one number, and one special character.');
      return;
    }
    setPasswordError('');
    
    // Save to profile so it doesn't say Jane Student
    const fullName = e.target.fullName?.value || 'Mohan';
    const email = signupMethod === 'email' ? e.target.email?.value : '';
    const phone = signupMethod === 'mobile' ? e.target.mobile?.value : '';
    
    const profile = {
      name: fullName,
      email: email || (signupMethod === 'email' ? 'mohan@example.com' : ''),
      title: 'Aspiring Developer',
      location: 'Not Specified', // Clear the default Coimbatore
      phone: phone || (signupMethod === 'mobile' ? '+91 9876543210' : '+91')
    };
    
    localStorage.setItem('talentforge_profile', JSON.stringify(profile));
    localStorage.setItem('isAuthenticated', 'true');

    // If student, send to login to trigger the resume upload onboarding
    if (role === 'student') {
      navigate('/login')
      return
    }

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

        <div className="mb-6">
          <label className="text-sm font-medium mb-1.5 block">I am a...</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input-field w-full appearance-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id} className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
                  {r.label}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="mb-6 flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          <button 
            type="button"
            onClick={() => setSignupMethod('email')} 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${signupMethod === 'email' ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Email
          </button>
          <button 
            type="button"
            onClick={() => setSignupMethod('mobile')} 
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${signupMethod === 'mobile' ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Mobile Number
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">
              {role === 'institution' ? 'Contact Person Name' : 'Full Name'}
            </label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="fullName" required placeholder={role === 'institution' ? 'Contact Person' : 'Full Name'} className="input-field pl-11" />
            </div>
          </div>
          
          {signupMethod === 'email' ? (
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                {role === 'recruiter' ? 'Work Email' : role === 'institution' ? 'Institution Email' : 'Email'}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="email" type="email" required placeholder="you@example.com" className="input-field pl-11" />
              </div>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium mb-1.5 block">Mobile Number</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 opacity-0" />
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <input name="mobile" type="tel" required placeholder="+91 9876543210" className="input-field pl-11" />
              </div>
            </div>
          )}
          
          {role === 'student' && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">University / College</label>
              <div className="relative">
                <GraduationCap size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="university" required placeholder="Your University" className="input-field pl-11" />
              </div>
            </div>
          )}

          {role === 'recruiter' && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">Company Name</label>
              <div className="relative">
                <Building2 size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="company" required placeholder="Company Name" className="input-field pl-11" />
              </div>
            </div>
          )}

          {role === 'institution' && (
            <div>
              <label className="text-sm font-medium mb-1.5 block">Institution Name</label>
              <div className="relative">
                <School size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input name="institution" required placeholder="Institution Name" className="input-field pl-11" />
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium mb-1.5 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input name="password" type="password" required placeholder="••••••••" className="input-field pl-11" />
            </div>
            {passwordError && (
              <p className="text-xs text-red-500 mt-2 font-medium animate-fade-in">{passwordError}</p>
            )}
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
