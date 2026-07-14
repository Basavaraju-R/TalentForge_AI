import { useState } from 'react'
import { Award, Clock, BarChart2, Sparkles, X, BookOpen, CheckCircle2 } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { roadmap } from '../data/mockData.js'

const difficultyColor = {
  Easy: 'bg-success/10 text-success',
  Medium: 'bg-warning/10 text-warning',
  Hard: 'bg-danger/10 text-danger',
}

const courseDetails = {
  'Java Fundamentals': {
    description: 'Learn the core concepts of Java programming including Object-Oriented Programming (OOP), collections, and basic file I/O.',
    syllabus: ['Variables & Data Types', 'Control Flow', 'Object-Oriented Programming', 'Collections Framework'],
  },
  'SQL Essentials': {
    description: 'Master relational databases, complex queries, joins, and database normalization techniques.',
    syllabus: ['SELECT Statements', 'Joins & Subqueries', 'Database Normalization', 'Indexes & Performance'],
  },
  'Spring Boot in Practice': {
    description: 'Build robust RESTful APIs, manage dependencies, and implement security with Spring Boot.',
    syllabus: ['Spring Initializr', 'REST API Design', 'Spring Data JPA', 'Spring Security Fundamentals'],
  },
  'React for Backend Devs': {
    description: 'Understand component lifecycles, hooks, and state management in React specifically tailored for backend engineers.',
    syllabus: ['Components & Props', 'React Hooks (useState, useEffect)', 'Fetching API Data', 'Context API'],
  },
  'System Design Patterns': {
    description: 'Design highly scalable architectures, load balancing, caching, and microservices for enterprise applications.',
    syllabus: ['Client-Server Architecture', 'Load Balancing', 'Caching Strategies', 'Microservices vs Monolith'],
  },
  'Docker & Kubernetes': {
    description: 'Containerize applications and orchestrate deployments in cloud environments at scale.',
    syllabus: ['Docker Images & Containers', 'Docker Compose', 'Kubernetes Architecture', 'Deployments & Services'],
  }
}

export default function LearningRoadmap() {
  const [activeCourse, setActiveCourse] = useState(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const handleCourseAction = () => {
    setIsRedirecting(true)
    setTimeout(() => {
      setIsRedirecting(false)
      setActiveCourse(null)
    }, 1200)
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Learning Roadmap" avatarSeed="JS">
      <div className="card bg-brand-gradient-soft flex items-center gap-4">
        <div className="h-12 w-12 rounded-xl2 bg-brand-gradient flex items-center justify-center text-white shrink-0">
          <Sparkles size={20} />
        </div>
        <div>
          <p className="font-heading font-semibold">AI Recommended Next Skill</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">Spring Boot — unlocks 3 more job matches at your current ATS score.</p>
        </div>
      </div>

      <div className="relative pl-8 lg:pl-10 space-y-10">
        <div className="absolute left-3 lg:left-4 top-2 bottom-2 w-0.5 bg-slate-200 dark:bg-white/10" />
        {roadmap.map((level) => (
          <div key={level.level} className="relative">
            <div className="absolute -left-8 lg:-left-10 top-1 h-5 w-5 rounded-full bg-brand-gradient ring-4 ring-surface dark:ring-darkbg" />
            <h3 className="font-heading font-semibold text-lg mb-4">{level.level}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {level.modules.map((m) => (
                <div 
                  key={m.course} 
                  className="card card-hover cursor-pointer border border-transparent hover:border-primary-500/50 transition-colors"
                  onClick={() => setActiveCourse(m)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">{m.course}</h4>
                    <span className={`badge ${difficultyColor[m.difficulty]}`}>{m.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mb-4">
                    <span className="flex items-center gap-1"><Clock size={13} /> {m.duration}</span>
                    <span className="flex items-center gap-1"><BarChart2 size={13} /> {m.progress}% complete</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-3">
                    <div className="h-full rounded-full bg-brand-gradient" style={{ width: `${m.progress}%` }} />
                  </div>
                  <div className="flex items-center justify-between">
                    {m.certificate ? (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-success">
                        <Award size={13} /> Certificate earned
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">In Progress</span>
                    )}
                    <span className="text-xs text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">View Details &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setActiveCourse(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 slide-up" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-start justify-between bg-slate-50 dark:bg-slate-800/30">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${difficultyColor[activeCourse.difficulty]}`}>{activeCourse.difficulty}</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-200 dark:bg-white/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Clock size={12} /> {activeCourse.duration}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">{activeCourse.course}</h3>
              </div>
              <button onClick={() => setActiveCourse(null)} className="p-2 rounded-xl bg-white dark:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-white shadow-sm border border-slate-200 dark:border-white/10 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              
              {/* Progress Section */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Course Progress</span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">{activeCourse.progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                  <div className="h-full rounded-full bg-brand-gradient transition-all duration-1000" style={{ width: `${activeCourse.progress}%` }} />
                </div>
                {activeCourse.certificate && (
                  <p className="flex items-center gap-2 text-sm text-success mt-3 font-medium bg-success/10 p-3 rounded-xl border border-success/20">
                    <Award size={16} /> You have earned the certificate for this course!
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  <BookOpen size={16} /> Overview
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {courseDetails[activeCourse.course]?.description || 'Detailed course information will be available here.'}
                </p>
              </div>

              {/* Syllabus */}
              <div>
                <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                  <Sparkles size={16} /> What you'll learn
                </h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {courseDetails[activeCourse.course]?.syllabus?.map((topic, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-lg border border-slate-100 dark:border-white/5">
                      <CheckCircle2 size={16} className="text-primary-500 shrink-0 mt-0.5" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50 flex justify-end gap-3">
              <button onClick={() => setActiveCourse(null)} className="btn-secondary" disabled={isRedirecting}>Close</button>
              <button 
                onClick={handleCourseAction} 
                className="btn-primary min-w-[140px]"
                disabled={isRedirecting}
              >
                {isRedirecting ? (
                  <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Loading...</span>
                ) : (
                  activeCourse.progress === 100 ? 'Review Course' : 'Resume Learning'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
