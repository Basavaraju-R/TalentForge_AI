import { useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Sparkles, Mail, Lock, Eye, EyeOff, Globe, Code2, Briefcase, GraduationCap, Building2, School, UploadCloud, FileText, Loader2, Phone, ArrowRight } from 'lucide-react'
import { auth, db, RecaptchaVerifier, signInWithPhoneNumber, signInWithEmailAndPassword, googleProvider, signInWithPopup } from '../firebase'
import { doc, setDoc } from 'firebase/firestore'

const roles = [
  { id: 'student', label: 'Student', icon: GraduationCap, dest: '/student/dashboard' },
  { id: 'recruiter', label: 'Recruiter', icon: Building2, dest: '/recruiter/dashboard' },
  { id: 'institution', label: 'Institution', icon: School, dest: '/institution/dashboard' },
]

export default function Login() {
  const [showPass, setShowPass] = useState(false)
  const [role, setRole] = useState('student')
  const navigate = useNavigate()

  // New states for embedded onboarding and OTP
  const [step, setStep] = useState('login') // 'login', 'otp', 'upload', 'analyzing'
  const [loginMethod, setLoginMethod] = useState('mobile') // 'email' or 'mobile'
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [notification, setNotification] = useState('')
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState('')
  const [emailOtp, setEmailOtp] = useState('')
  const [emailOtpError, setEmailOtpError] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailLoginError, setEmailLoginError] = useState('')
  const [mockOtpCode, setMockOtpCode] = useState('')

  const initiateLogin = async (user = null) => {
    localStorage.setItem('isAuthenticated', 'true')
    
    // We are bypassing Firestore database storage entirely since the Firebase keys are not set yet.
    // Ensure the user has a profile saved so they are "registered with all detail" locally
    let profile = localStorage.getItem('talentforge_profile');
    if (!profile) {
      const isEmail = user?.email || email;
      const isPhone = user?.phoneNumber || mobileNumber;
      
      const newProfile = {
        name: isEmail ? isEmail.split('@')[0] : 'New User',
        email: isEmail || '',
        title: 'Aspiring Professional',
        location: 'Not Specified',
        phone: isPhone || '+91'
      };
      localStorage.setItem('talentforge_profile', JSON.stringify(newProfile));
    }
    
    // Onboarding logic: if student and no resume uploaded yet, do it here
    if (role === 'student' && !localStorage.getItem('hasUploadedResume')) {
      setStep('upload')
      return
    }

    const dest = roles.find((r) => r.id === role)?.dest ?? '/student/dashboard'
    navigate(dest)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setEmailLoginError("Please enter both email and password.");
      return;
    }
    setIsVerifying(true);
    setEmailLoginError('');
    
    try {
      // Bypass Firebase if API key is not configured to allow UI testing
      if (!import.meta.env.VITE_FIREBASE_API_KEY || import.meta.env.VITE_FIREBASE_API_KEY.includes('your_')) {
        console.log("Mock Email Sign-In Triggered (No valid API key)");
        initiateLogin({ uid: 'mock-email-user', email: email });
        return;
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      initiateLogin(userCredential.user);
    } catch (error) {
      console.error("Email login failed", error);
      // Simplify error messages for the user
      if (error.code === 'auth/invalid-credential') {
        setEmailLoginError("Invalid email or password.");
      } else {
        setEmailLoginError(error.message);
      }
    } finally {
      setIsVerifying(false);
    }
  }
  
  const handleEmailVerifySubmit = (e) => {
    e.preventDefault()
    if (emailOtp === '123456') {
      initiateLogin()
    } else {
      setEmailOtpError('Invalid code. Please enter 123456.')
    }
  }

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved
        },
        'expired-callback': () => {
          setOtpError("reCAPTCHA expired. Please try sending OTP again.");
        }
      });
    }
  }

  const validatePhoneNumber = (number) => {
    const hasPlus = number.startsWith('+');
    const digitsOnly = number.replace(/\D/g, '');
    
    if (hasPlus) {
      return digitsOnly.length >= 10 && digitsOnly.length <= 15;
    } else {
      return digitsOnly.length === 10;
    }
  }

  const getFriendlyErrorMessage = (error) => {
    switch (error.code) {
      case 'auth/api-key-not-valid':
        return 'Firebase API key is invalid or missing in .env file.';
      case 'auth/invalid-phone-number':
        return 'The phone number entered is invalid.';
      case 'auth/too-many-requests':
        return 'Too many requests. Please try again later.';
      case 'auth/invalid-verification-code':
        return 'Invalid OTP code. Please check and try again.';
      case 'auth/code-expired':
        return 'OTP code has expired. Please request a new one.';
      case 'auth/quota-exceeded':
        return 'SMS quota exceeded. Please try again tomorrow.';
      default:
        return error.message;
    }
  }

  const handleMobileSubmit = async (e) => {
    e.preventDefault()
    
    if (!otpSent) {
      if (!mobileNumber) {
        setOtpError("Please enter a mobile number.");
        return;
      }
      
      if (!validatePhoneNumber(mobileNumber)) {
        setOtpError("Please enter a valid mobile number (e.g., 9876543210).");
        return;
      }

      // MOCK OTP FLOW: Bypass Firebase to prevent API key errors
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setMockOtpCode(generatedOtp);
      setOtpSent(true);
      setOtpError('');
      setNotification(`OTP successfully sent to ${mobileNumber}! (Use ${generatedOtp} to test)`);
      
      // Auto-hide notification after 10 seconds (giving them more time to read it)
      setTimeout(() => setNotification(''), 10000);
      
    } else {
      // MOCK OTP VERIFY
      if (otp === mockOtpCode) {
        // Pass a mock user object to initiateLogin so it can still save dummy data to Firestore
        initiateLogin({ uid: 'mock-user-' + Math.floor(Math.random() * 1000), phoneNumber: mobileNumber });
      } else {
        setOtpError(`Invalid OTP. Please enter ${mockOtpCode}.`);
      }
    }
  }

  const handleSocialLogin = async () => {
    try {
      // MOCK GOOGLE LOGIN: Bypass Firebase to prevent API key errors
      console.log("Mock Google Sign-In Triggered");
      initiateLogin({ uid: 'mock-google-user', email: 'testuser@gmail.com' });
      
      // REAL GOOGLE LOGIN (Commented out until Firebase keys are added):
      // const result = await signInWithPopup(auth, googleProvider);
      // initiateLogin(result.user);
    } catch (error) {
      console.error("Google Sign-In failed", error);
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    setUploadError('')
    const f = e.dataTransfer.files?.[0]
    if (f) { setFile(f); }
  }, [])

  const onSelect = (e) => {
    setUploadError('')
    const f = e.target.files?.[0]
    if (f) { setFile(f); }
  }

  const handleAnalyze = () => {
    if (!file) return;
    
    // Validation mockup for 1-2 pages & correct format
    if (!file.name.match(/\.(pdf|doc|docx)$/i)) {
      setUploadError("Oops! That doesn't look like a resume. Please upload a PDF or DOCX file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) { // Using 2MB size as a proxy for > 2 pages
      setUploadError("Your resume seems longer than 2 pages. We highly recommend keeping it to 1-2 pages for maximum impact. Please upload a shorter version.");
      return;
    }
    
    setStep('analyzing')
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Generate some mock results
      const generatedResults = [
        { label: 'ATS Score', value: `88%`, tone: 'success' },
        { label: 'Resume Strength', value: 'A-', tone: 'success' },
        { label: 'Missing Keywords', value: `3 found`, tone: 'warning' },
        { label: 'Technical Skills', value: `5 detected`, tone: 'primary' },
      ];

      // Store in database (localStorage)
      localStorage.setItem('resume_analysis', JSON.stringify({
        fileName: file.name,
        results: generatedResults,
        date: new Date().toISOString()
      }));
      localStorage.setItem('hasUploadedResume', 'true');
      
      // Navigate to dashboard
      const dest = roles.find((r) => r.id === role)?.dest ?? '/student/dashboard'
      navigate(dest)
    }, 2500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-12">
      <div className="absolute inset-0 bg-brand-gradient-soft" />
      <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl" />

      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 animate-fade-in bg-white dark:bg-slate-800 border-l-4 border-brand-500 shadow-xl rounded-r-lg p-4 flex items-center gap-3 max-w-sm">
          <div className="h-8 w-8 rounded-full bg-brand-100 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400">
            <Mail size={16} />
          </div>
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{notification}</p>
        </div>
      )}

      <div className="relative w-full max-w-md card animate-rise">
        <div className="flex items-center gap-2 justify-center mb-6">
          <div className="h-9 w-9 rounded-xl2 bg-brand-gradient flex items-center justify-center shadow-md">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-heading font-bold text-xl">TalentForge</span>
        </div>

        {step === 'login' && (
          <div className="animate-fade-in">
            <h1 className="text-2xl font-heading font-bold text-center">Welcome to your future</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-1 mb-6">Unlock powerful career growth and business tools.</p>

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

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl mb-6">
              <button 
                onClick={() => setLoginMethod('email')} 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${loginMethod === 'email' ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Email
              </button>
              <button 
                onClick={() => setLoginMethod('mobile')} 
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${loginMethod === 'mobile' ? 'bg-white dark:bg-slate-700 shadow text-brand-600 dark:text-brand-400' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Mobile OTP
              </button>
            </div>

            {loginMethod === 'email' ? (
              <form onSubmit={handleSubmit} className="space-y-4 animate-fade-in">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    {role === 'recruiter' ? 'Work Email' : role === 'institution' ? 'Institution Email' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="email" 
                      required 
                      placeholder="you@example.com" 
                      className="input-field pl-11" 
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                        setEmailLoginError('')
                      }}
                      disabled={isVerifying}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Password</label>
                  <div className="relative">
                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type={showPass ? 'text' : 'password'} 
                      required 
                      placeholder="••••••••" 
                      className="input-field pl-11 pr-11"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value)
                        setEmailLoginError('')
                      }}
                      disabled={isVerifying}
                    />
                    <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-500" disabled={isVerifying}>
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                {emailLoginError && <p className="text-xs text-red-500 font-medium animate-fade-in text-center">{emailLoginError}</p>}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-500 dark:text-slate-400 cursor-pointer hover:text-brand-500 transition-colors">
                    <input type="checkbox" className="rounded accent-brand-500" disabled={isVerifying} /> Remember me
                  </label>
                  <a href="#" className="text-brand-600 dark:text-brand-400 font-medium hover:underline">Forgot password?</a>
                </div>
                <button type="submit" disabled={isVerifying} className="btn-primary w-full !py-3 font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {isVerifying ? <Loader2 size={18} className="animate-spin" /> : "Sign In"}
                </button>
              </form>
            ) : (
              <form onSubmit={handleMobileSubmit} className="space-y-4 animate-fade-in">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Mobile Number</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 9876543210" 
                      disabled={otpSent || isVerifying} 
                      className="input-field pl-11 disabled:opacity-50" 
                      value={mobileNumber}
                      onChange={(e) => {
                        setMobileNumber(e.target.value)
                        setOtpError('')
                      }}
                    />
                  </div>
                </div>
                {otpSent && (
                  <div className="animate-fade-in">
                    <label className="text-sm font-medium mb-1.5 block">Enter OTP</label>
                    <div className="relative">
                      <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        required 
                        placeholder="123456" 
                        className="input-field pl-11 text-center tracking-widest font-mono text-lg" 
                        maxLength={6}
                        value={otp}
                        onChange={(e) => {
                          setOtp(e.target.value)
                          setOtpError('')
                        }}
                      />
                    </div>
                    {otpError && <p className="text-xs text-red-500 mt-2 text-center font-medium animate-fade-in">{otpError}</p>}
                    <p className="text-xs text-brand-500 mt-2 text-center cursor-pointer hover:underline">Resend OTP</p>
                  </div>
                )}
                <div id="recaptcha-container"></div>
                {otpError && !otpSent && <p className="text-xs text-red-500 mt-2 text-center font-medium animate-fade-in">{otpError}</p>}
                <button type="submit" disabled={isVerifying} className="btn-primary w-full !py-3 font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70">
                  {isVerifying ? <Loader2 size={18} className="animate-spin" /> : (otpSent ? "Verify & Login" : "Send OTP")} 
                  {!isVerifying && otpSent && <ArrowRight size={18}/>}
                </button>
              </form>
            )}

            <div className="flex items-center gap-3 my-6">
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">or fast login with</span>
              <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
            </div>

            <div className="space-y-3 mb-8">
              <button type="button" onClick={handleSocialLogin} className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all hover:shadow-md">
                <svg viewBox="0 0 24 24" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Continue with Google
              </button>
            </div>

            <p className="text-sm text-center text-slate-500 dark:text-slate-400">
              First time logging in? <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">Create an account</Link>
            </p>
          </div>
        )}

        {step === 'email_verify' && (
          <div className="animate-fade-in text-center pb-4">
            <div className="inline-flex items-center justify-center p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full mb-4">
              <Mail size={28} className="text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2">Check your email</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-4">
              We've sent a 6-digit verification code to your email.
            </p>
            <form onSubmit={handleEmailVerifySubmit} className="space-y-4">
              <div>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    required 
                    placeholder="123456" 
                    className="input-field pl-11 text-center tracking-widest font-mono text-lg" 
                    maxLength={6}
                    value={emailOtp}
                    onChange={(e) => {
                      setEmailOtp(e.target.value)
                      setEmailOtpError('')
                    }}
                  />
                </div>
                {emailOtpError && <p className="text-xs text-red-500 mt-2 text-center font-medium animate-fade-in">{emailOtpError}</p>}
              </div>
              <button type="submit" className="btn-primary w-full !py-3 font-bold text-lg hover:shadow-lg transition-all">
                Verify Email
              </button>
              <button type="button" onClick={() => setStep('login')} className="mt-4 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium">
                Back to Login
              </button>
            </form>
          </div>
        )}

        {step === 'google_verify' && (
          <div className="animate-fade-in text-center pb-4">
            <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 shadow-sm border border-slate-200 dark:border-slate-700">
              <svg viewBox="0 0 24 24" className="h-8 w-8" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <h1 className="text-xl font-heading font-bold mb-2">Sign in with Google</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-4">
              Choose an account to continue to TalentForge.
            </p>
            
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 mb-6">
              <div className="h-10 w-10 rounded-full bg-brand-500 text-white flex items-center justify-center font-bold text-lg">B</div>
              <div className="text-left">
                <p className="font-bold text-sm text-slate-900 dark:text-white">basava9240</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">basava9240@gmail.com</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button onClick={() => setStep('login')} className="flex-1 py-3 rounded-xl border border-slate-200 dark:border-slate-700 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                Cancel
              </button>
              <button onClick={initiateLogin} className="flex-1 btn-primary !py-3 font-bold hover:shadow-lg transition-all">
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 'upload' && (
          <div className="animate-fade-in text-center pb-4">
            <div className="inline-flex items-center justify-center p-3 bg-brand-100 dark:bg-brand-900/30 rounded-full mb-4">
              <FileText size={28} className="text-brand-600 dark:text-brand-400" />
            </div>
            <h1 className="text-2xl font-heading font-bold mb-2">Upload your Resume</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 px-4">
              Upload your <strong>1-2 page resume</strong> to unlock personalized AI feedback, tailored job matches, and career insights!
            </p>
            
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={onDrop}
              className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center text-center py-12 px-4 transition-all mb-4 ${
                dragOver ? 'border-brand-500 bg-brand-500/10 scale-105' : 'border-slate-300 dark:border-white/15 hover:border-brand-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <UploadCloud size={36} className="text-brand-500 mb-3" />
              <p className="font-bold text-slate-700 dark:text-slate-200">Drag & drop your resume here</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Strictly PDF or DOCX format.</p>
              <label className="btn-secondary mt-6 cursor-pointer hover:shadow-md transition-shadow">
                Browse Files
                <input type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={onSelect} />
              </label>
            </div>

            {uploadError && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-3 mb-4 rounded-r-lg text-left animate-fade-in">
                <p className="text-sm text-red-700 dark:text-red-400 font-medium">{uploadError}</p>
              </div>
            )}

            {file && !uploadError && (
              <div className="flex items-center gap-3 mb-6 p-4 border border-brand-200 dark:border-brand-900/50 rounded-xl bg-brand-50 dark:bg-brand-900/20 text-left animate-fade-in shadow-sm">
                <div className="h-10 w-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-600 dark:text-brand-400 shrink-0">
                  <FileText size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold truncate text-slate-800 dark:text-slate-200">{file.name}</p>
                  <p className="text-xs text-brand-600 dark:text-brand-400 font-medium">Ready for AI Analysis • {(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
            )}

            <button onClick={handleAnalyze} disabled={!file || uploadError} className="btn-primary w-full !py-3 font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
              <Sparkles size={18} /> Analyze with AI
            </button>
            <button onClick={() => setStep('login')} className="mt-4 text-sm text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium">
              Back to Login
            </button>
          </div>
        )}

        {step === 'analyzing' && (
          <div className="animate-fade-in flex flex-col items-center justify-center text-center py-16 text-brand-600 dark:text-brand-400">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-brand-400 blur-xl opacity-20 rounded-full animate-pulse"></div>
              <Loader2 size={64} className="animate-spin relative z-10" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-3 text-slate-900 dark:text-white">Unlocking your potential...</h2>
            <p className="text-slate-500 dark:text-slate-400 animate-pulse font-medium">Our AI is analyzing your resume to find the perfect career opportunities.</p>
          </div>
        )}

      </div>
    </div>
  )
}
