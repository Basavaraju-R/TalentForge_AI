import { Target, Brain, MessageSquareText, Briefcase, FileSearch, TrendingUp, Upload, Video, GitBranch, Send, CheckCircle2 } from 'lucide-react'
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, LineChart, Line, Legend, PieChart, Pie, Cell,
} from 'recharts'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { studentNav } from '../data/navConfig.js'
import { skillGrowth, weeklyProgress, interviewPerformance, applicationStatus } from '../data/mockData.js'

export default function StudentDashboard() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [uploadSuccess, setUploadSuccess] = useState(false)

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

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Dashboard" avatarSeed="JS">
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard icon={Target} label="ATS Score" value="87%" sub="+5% this week" accent="primary" onClick={() => navigate('/student/ats-score')} />
        <StatCard icon={Brain} label="Skills Completed" value="12/20" sub="2 in progress" accent="secondary" onClick={() => navigate('/student/roadmap')} />
        <StatCard icon={MessageSquareText} label="Interview Score" value="81%" sub="+9% last round" accent="success" onClick={() => navigate('/student/mock-interview')} />
        <StatCard icon={Briefcase} label="Job Match %" value="92%" sub="Nexora Labs" accent="primary" onClick={() => navigate('/student/jobs')} />
        <StatCard icon={FileSearch} label="Resume Strength" value="A+" sub="Top 15%" accent="secondary" onClick={() => navigate('/student/resume-analyzer')} />
        <StatCard icon={TrendingUp} label="Learning Progress" value="64%" sub="On track" accent="success" onClick={() => navigate('/student/certificates')} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
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
