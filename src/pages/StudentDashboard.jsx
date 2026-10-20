import { Target, Brain, MessageSquareText, Briefcase, FileSearch, TrendingUp, Upload, Video, GitBranch, Send, CheckCircle2, Sparkles, Lightbulb, Users, Crown, ChevronRight, FileEdit, GraduationCap } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, LineChart, Line, Legend, PieChart, Pie, Cell,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import { useState, useRef, useEffect } from 'react'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { studentNav } from '../data/navConfig.js'
import { skillGrowth, weeklyProgress, interviewPerformance, applicationStatus } from '../data/mockData.js'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [userTier, setUserTier] = useState('basic')
  const [analysisData, setAnalysisData] = useState(null)

  useEffect(() => {
    // Check if user is premium
    const tier = localStorage.getItem('userTier') || 'basic'
    setUserTier(tier)

    // Check if a resume analysis exists and load it to customize the dashboard
    const savedAnalysis = localStorage.getItem('resume_analysis')
    if (savedAnalysis) {
      try {
        setAnalysisData(JSON.parse(savedAnalysis))
      } catch(e) {
        console.error('Failed to parse resume analysis', e)
      }
    }
  }, [])

  const handleQuickAction = (action) => {
    if (action === 'upload') {
      fileInputRef.current?.click()
    } else if (action === 'interview') {
      navigate('/student/mock-interview')
    } else if (action === 'skills') {
      navigate('/student/skill-gap')
    } else if (action === 'jobs') {
      navigate('/student/jobs')
    }
  }

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadSuccess(true)
      setTimeout(() => {
        setUploadSuccess(false)
        navigate('/student/resume-analyzer')
      }, 1500)
    }
  }

  const quickActions = [
    { id: 'upload', label: 'Upload Resume', icon: Upload },
    { id: 'interview', label: 'Start AI Interview', icon: Video },
    { id: 'skills', label: 'Analyze Skills', icon: GitBranch },
    { id: 'jobs', label: 'Apply Jobs', icon: Send },
  ]

  const isPremium = userTier.startsWith('premium')

  // Generate tier-specific recommendations
  const getPremiumRecommendations = () => {
    if (userTier === 'premium-basic') {
      return (
        <>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <Lightbulb className="text-amber-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Basic Career Suggestions</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Get tailored job role recommendations based on your current skill set.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <TrendingUp className="text-green-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Skill Gap Insights</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Identify top 3 skills you are missing to land your target entry-level job.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <MessageSquareText className="text-blue-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">AI Coach Beta</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Ask basic career-related questions to our AI assistant to get quick answers.</p>
          </div>
        </>
      )
    }
    
    if (userTier === 'premium-inter') {
      return (
        <>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <Lightbulb className="text-amber-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Business Idea Generator</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Validate your startup ideas and get AI-driven market insights and business plans.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <TrendingUp className="text-green-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Advanced Career Growth Map</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Personalized 5-year career projection with step-by-step milestones to reach executive roles.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <Users className="text-purple-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">1-on-1 Mentorship (1/mo)</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Schedule a 30-minute session with an industry professional to review your progress.</p>
          </div>
        </>
      )
    }

    if (userTier === 'premium-high') {
      return (
        <>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <Briefcase className="text-orange-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Exclusive Job Referrals</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Directly bypass the queue with guaranteed referrals to our top enterprise partners.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <FileSearch className="text-red-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">VIP Portfolio Review</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Expert-led, deep-dive reviews of your GitHub, Behance, or project portfolio.</p>
          </div>
          <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-brand-500/10 hover:border-brand-500/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <Users className="text-blue-500 mb-3" size={24} />
            <h4 className="font-semibold mb-2">Unlimited Mentorship</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Unrestricted access to our elite network of mentors for continuous career coaching.</p>
          </div>
        </>
      )
    }

    return null
  }

  const getRoleLabel = () => {
    switch (userTier) {
      case 'premium-basic': return 'Student Basic'
      case 'premium-inter': return 'Student Inter'
      case 'premium-high': return 'Student High Perform'
      default: return 'Student'
    }
  }

  const getTierName = () => {
    switch (userTier) {
      case 'premium-basic': return 'Premium Basic'
      case 'premium-inter': return 'Premium Inter'
      case 'premium-high': return 'High Performance'
      default: return 'Premium'
    }
  }

  if (!analysisData) {
    return (
      <DashboardShell items={studentNav} roleLabel={getRoleLabel()} title="Dashboard" avatarSeed="JS">
        <div className="card h-full flex flex-col items-center justify-center text-center py-20 text-slate-500">
          <Upload size={48} className="mb-4 text-brand-500" />
          <h2 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-2">Resume Required</h2>
          <p className="max-w-md mx-auto mb-6">Before we can personalize your dashboard and show your career statistics, please upload and analyze your resume.</p>
          <button onClick={() => navigate('/student/resume-analyzer')} className="btn-primary">
            Go to Resume Analyzer
          </button>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell items={studentNav} roleLabel={getRoleLabel()} title="Dashboard" avatarSeed="JS">
      
      {isPremium && (
        <div className="card bg-gradient-to-br from-brand-900/5 to-purple-900/5 border-brand-500/20 mb-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Crown size={150} />
          </div>
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <Sparkles className="text-brand-500" />
            <h3 className="font-heading font-semibold text-xl text-brand-700 dark:text-brand-300">
              {getTierName()} Recommendations
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
            {getPremiumRecommendations()}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-5">
        <StatCard icon={Target} label="ATS Score" value={analysisData?.results?.find(r => r.label === 'ATS Score')?.value || "87%"} sub={analysisData ? `Based on ${analysisData.fileName}` : "+5% this week"} accent="primary" onClick={() => navigate('/student/ats-score')} />
        <StatCard icon={Brain} label="Skills Detected" value={analysisData?.results?.find(r => r.label === 'Technical Skills')?.value || "12/20"} sub={analysisData ? "From your resume" : "2 in progress"} accent="secondary" onClick={() => navigate('/student/roadmap')} />
        <StatCard icon={MessageSquareText} label="Interview Score" value="81%" sub="+9% last round" accent="success" onClick={() => navigate('/student/mock-interview')} />
        <StatCard icon={Briefcase} label="Job Match %" value="92%" sub="Nexora Labs" accent="primary" onClick={() => navigate('/student/jobs')} />
        <StatCard icon={FileSearch} label="Resume Strength" value={analysisData?.results?.find(r => r.label === 'Resume Strength')?.value || "A+"} sub={analysisData ? `Analyzed on ${new Date(analysisData.date).toLocaleDateString()}` : "Top 15%"} accent="secondary" onClick={() => navigate('/student/resume-analyzer')} />
        <StatCard icon={TrendingUp} label="Missing Keywords" value={analysisData?.results?.find(r => r.label === 'Missing Keywords')?.value || "0 found"} sub="Action required" accent="warning" onClick={() => navigate('/student/skill-gap')} />
      </div>

      {analysisData && (
        <div className="card bg-brand-gradient-soft border-brand-500/20 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-brand-600 dark:text-brand-400" />
            <h3 className="font-heading font-semibold text-xl">AI Action Plan & Suggestions</h3>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">
            Based on your recently uploaded resume ({analysisData.fileName}), here are personalized steps to improve your skills and build a stronger profile.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex gap-3">
              <div className="mt-1 bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg text-blue-600 dark:text-blue-400 h-fit">
                <FileEdit size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Resume Building</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  Your ATS Score is {analysisData?.results?.find(r => r.label === 'ATS Score')?.value || 'good'}. To reach 95%+, quantify your achievements with metrics (e.g., "improved efficiency by 20%").
                </p>
                <button onClick={() => navigate('/student/resume-analyzer')} className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                  Optimize Resume <ChevronRight size={14} />
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex gap-3">
              <div className="mt-1 bg-amber-100 dark:bg-amber-900/30 p-2 rounded-lg text-amber-600 dark:text-amber-400 h-fit">
                <GraduationCap size={20} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-1">Skill Improvement</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  You are missing {analysisData?.results?.find(r => r.label === 'Missing Keywords')?.value || 'some key skills'} requested by top employers. Focus on learning CI/CD or Cloud basics this week.
                </p>
                <button onClick={() => navigate('/student/roadmap')} className="text-sm font-semibold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1">
                  View Learning Roadmap <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Skill Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={skillGrowth}>
              <defs>
                <linearGradient id="skillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C3AED" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#7C3AED" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Area type="monotone" dataKey="score" stroke="#7C3AED" strokeWidth={2.5} fill="url(#skillGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Weekly Progress</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Bar dataKey="hours" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Interview Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={interviewPerformance}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="round" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="communication" stroke="#2563EB" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="technical" stroke="#7C3AED" strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="confidence" stroke="#22C55E" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Application Status</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={applicationStatus} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {applicationStatus.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="card">
        <h3 className="font-heading font-semibold mb-4">Quick Actions</h3>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="hidden" 
          accept=".pdf,.doc,.docx" 
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((a) => (
            <button 
              key={a.id} 
              onClick={() => handleQuickAction(a.id)}
              className="flex flex-col items-center justify-center gap-2 py-6 rounded-xl2 border border-slate-200 dark:border-white/10 hover:border-transparent hover:bg-brand-gradient hover:text-white transition-all group focus:outline-none"
            >
              {a.id === 'upload' && uploadSuccess ? (
                <>
                  <CheckCircle2 size={22} className="text-success" />
                  <span className="text-sm font-semibold text-success">Uploaded!</span>
                </>
              ) : (
                <>
                  <a.icon size={22} className="text-primary-500 group-hover:text-white" />
                  <span className="text-sm font-semibold">{a.label}</span>
                </>
              )}
            </button>
          ))}
        </div>
      </div>
    </DashboardShell>
  )
}
