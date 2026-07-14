import { useState, useMemo, useRef } from 'react'
import { MapPin, Briefcase, IndianRupee, SlidersHorizontal, CheckCircle2, X, Loader2, Bot, AlertTriangle, ThumbsUp, ThumbsDown, Eye, FileText, ChevronDown, ChevronUp } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { jobs } from '../data/mockData.js'

export default function JobPortal() {
  const [remoteOnly, setRemoteOnly] = useState(false)
  const [sort, setSort] = useState('match')
  const [activeFilters, setActiveFilters] = useState([])
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [appliedJobs, setAppliedJobs] = useState({})
  
  // Application Modal States
  const [activeJob, setActiveJob] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Resume Analysis & Upload States
  const [selectedResume, setSelectedResume] = useState('resume_v3.pdf')
  const [uploadedResumes, setUploadedResumes] = useState([])
  const [isAnalyzingFit, setIsAnalyzingFit] = useState(false)
  const [fitAnalysis, setFitAnalysis] = useState(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  const fileInputRef = useRef(null)

  const toggleFilter = (filter) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    )
  }

  const openApplication = (job) => {
    setActiveJob(job)
    setSelectedResume('resume_v3.pdf')
    setFitAnalysis(null)
  }
  
  const handleResumeSelect = (e) => {
    const val = e.target.value
    if (val === 'upload') {
      fileInputRef.current?.click()
    } else {
      setSelectedResume(val)
      setFitAnalysis(null)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const newName = file.name
      // Ensure we don't duplicate names
      if (!uploadedResumes.includes(newName)) {
        setUploadedResumes(prev => [...prev, newName])
      }
      setSelectedResume(newName)
      setFitAnalysis(null)
    }
  }
  
  const analyzeResumeFit = () => {
    setIsAnalyzingFit(true)
    setFitAnalysis(null)
    
    // Simulate AI processing time
    setTimeout(() => {
      const isPerfectMatch = activeJob.match >= 85
      const isGoodMatch = activeJob.match >= 75
      
      setFitAnalysis({
        isValid: activeJob.match >= 65,
        score: activeJob.match,
        verdict: isPerfectMatch ? 'Excellent Fit' : isGoodMatch ? 'Strong Candidate' : 'Borderline Fit',
        pros: isPerfectMatch 
          ? ['Perfect match for required tech stack', 'Experience aligns exactly with seniority level', 'Domain knowledge is highly relevant'] 
          : isGoodMatch
          ? ['Meets core technical requirements', 'Good cultural alignment based on previous roles']
          : ['Has foundational skills needed'],
        cons: isPerfectMatch
          ? ['Could highlight leadership metrics more clearly']
          : isGoodMatch
          ? ['Missing 1-2 nice-to-have secondary frameworks']
          : ['Experience falls slightly short of preferred years', 'Missing some domain specific keywords']
      })
      setIsAnalyzingFit(false)
    }, 2500)
  }
  
  const submitApplication = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API request
    setTimeout(() => {
      setAppliedJobs(prev => ({...prev, [activeJob.id]: true}))
      setIsSubmitting(false)
      setActiveJob(null)
    }, 1500)
  }

  const filtered = useMemo(() => {
    let list = remoteOnly ? jobs.filter((j) => j.remote) : jobs
    return [...list].sort((a, b) => (sort === 'match' ? b.match - a.match : a.company.localeCompare(b.company)))
  }, [remoteOnly, sort])

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Jobs" avatarSeed="JS">
      <div className="card space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button 
            onClick={() => setIsFiltersOpen(!isFiltersOpen)} 
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-primary-500 transition-colors"
          >
            <SlidersHorizontal size={15} /> 
            Filters
            {isFiltersOpen ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
          </button>
          
          <button
            onClick={() => setRemoteOnly((r) => !r)}
            className={`px-3 py-1.5 rounded-xl2 text-xs font-semibold ml-auto transition-colors ${remoteOnly ? 'bg-brand-gradient text-white shadow-soft border-transparent' : 'border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
          >
            Remote only
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="text-xs font-medium rounded-xl2 border border-slate-200 dark:border-white/10 bg-transparent px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500/50">
            <option value="match" className="dark:bg-slate-800">Sort: Best match</option>
            <option value="company" className="dark:bg-slate-800">Sort: Company A–Z</option>
          </select>
        </div>

        {isFiltersOpen && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-white/10 animate-fade-in">
            {['Role', 'Salary', 'Experience', 'Skills', 'Company'].map((f) => (
              <button 
                key={f} 
                onClick={() => toggleFilter(f)}
                className={`px-3 py-1.5 rounded-xl2 text-xs font-medium transition-colors ${activeFilters.includes(f) ? 'bg-primary-500 text-white shadow-soft border-primary-500' : 'border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5'}`}
              >
                {f}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((j) => {
          const hasApplied = appliedJobs[j.id];
          
          return (
            <div key={j.id} className="card card-hover flex flex-col">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-xl">{j.logo}</div>
                  <div>
                    <p className="font-semibold text-sm">{j.title}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{j.company}</p>
                  </div>
                </div>
                <span className="badge bg-success/10 text-success shrink-0 font-bold">{j.match}% match</span>
              </div>
              <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                <p className="flex items-center gap-2"><IndianRupee size={14} /> {j.salary}</p>
                <p className="flex items-center gap-2"><MapPin size={14} /> {j.location} {j.remote && <span className="badge bg-secondary-500/10 text-secondary-500 ml-1">Remote</span>}</p>
                <p className="flex items-center gap-2"><Briefcase size={14} /> {j.experience}</p>
              </div>
              <button 
                onClick={() => openApplication(j)}
                disabled={hasApplied}
                className={`mt-auto w-full !py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-all duration-300 ${hasApplied ? 'bg-success/10 text-success cursor-default rounded-xl2' : 'btn-primary'}`}
              >
                {hasApplied ? <><CheckCircle2 size={16} /> Applied</> : 'Apply now'}
              </button>
            </div>
          )
        })}
      </div>

      {/* Application Form Modal */}
      {activeJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col slide-up max-h-[90vh]">
            <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-xl font-heading font-semibold text-slate-900 dark:text-white">Submit Application</h2>
              <button onClick={() => setActiveJob(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="overflow-y-auto p-6">
              <form onSubmit={submitApplication} className="space-y-5">
                <div className="flex items-center gap-4 p-4 rounded-xl2 bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10">
                  <div className="h-12 w-12 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-2xl shrink-0">{activeJob.logo}</div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{activeJob.title}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{activeJob.company} &bull; {activeJob.location}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Select Resume</label>
                  <div className="flex gap-2">
                    <select 
                      className="input-field flex-1 !py-2.5 bg-slate-50 dark:bg-slate-800" 
                      value={selectedResume}
                      onChange={handleResumeSelect}
                      required
                    >
                      <option value="resume_v3.pdf">resume_v3.pdf (AI Optimized)</option>
                      <option value="resume_v2.pdf">resume_v2.pdf (Standard)</option>
                      {uploadedResumes.map(r => <option key={r} value={r}>{r} (Uploaded)</option>)}
                      <option value="upload">+ Upload new resume...</option>
                    </select>
                    
                    {/* Hidden File Input */}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept=".pdf,.doc,.docx" 
                    />
                    
                    <button 
                      type="button" 
                      onClick={() => setIsPreviewOpen(true)}
                      disabled={selectedResume === 'upload'}
                      className="btn-secondary !py-2.5 !px-3 flex items-center justify-center shrink-0 border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5"
                      title="Preview Resume"
                    >
                      <Eye size={18} className={selectedResume === 'upload' ? 'opacity-50' : ''} />
                    </button>

                    <button 
                      type="button" 
                      onClick={analyzeResumeFit} 
                      disabled={isAnalyzingFit || selectedResume === 'upload'} 
                      className="btn-secondary !py-2.5 flex items-center gap-2 shrink-0 border-primary-500/30 text-primary-600 dark:text-primary-400 hover:bg-primary-500/10"
                    >
                      {isAnalyzingFit ? <Loader2 size={16} className="animate-spin" /> : <Bot size={16} />}
                      Analyze Fit
                    </button>
                  </div>
                  
                  {isAnalyzingFit && (
                    <div className="mt-3 p-4 rounded-xl2 border border-primary-500/20 bg-primary-500/5 flex flex-col items-center justify-center gap-2 animate-pulse">
                      <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 text-sm font-medium">
                        <Bot size={16} className="animate-bounce" /> Analyzing alignment with {activeJob.company}...
                      </div>
                    </div>
                  )}

                  {fitAnalysis && (
                    <div className={`mt-3 p-4 rounded-xl2 border ${fitAnalysis.isValid ? 'border-success/20 bg-success/5' : 'border-warning/20 bg-warning/5'} animate-fade-in slide-up`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          {fitAnalysis.isValid ? <CheckCircle2 size={18} className="text-success" /> : <AlertTriangle size={18} className="text-warning" />}
                          <span className={`font-semibold ${fitAnalysis.isValid ? 'text-success' : 'text-warning'}`}>
                            {fitAnalysis.verdict} ({fitAnalysis.score}% Match)
                          </span>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 shadow-sm text-slate-500">AI Analysis</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm mt-4 pt-4 border-t border-slate-200/50 dark:border-white/5">
                        <div>
                          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5"><ThumbsUp size={14} className="text-success" /> Strengths</p>
                          <ul className="text-slate-600 dark:text-slate-400 space-y-1.5 text-xs">
                            {fitAnalysis.pros.map((p, i) => <li key={i} className="flex items-start gap-1"><span className="text-success mt-0.5">&bull;</span> {p}</li>)}
                          </ul>
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5"><ThumbsDown size={14} className="text-danger" /> Skill Gaps</p>
                          <ul className="text-slate-600 dark:text-slate-400 space-y-1.5 text-xs">
                            {fitAnalysis.cons.map((c, i) => <li key={i} className="flex items-start gap-1"><span className="text-danger mt-0.5">&bull;</span> {c}</li>)}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Cover Letter (Optional)</label>
                  <textarea 
                    className="input-field w-full h-28 resize-none !py-2.5 bg-slate-50 dark:bg-slate-800" 
                    placeholder={`Briefly explain why you're a great fit for the ${activeJob.title} role at ${activeJob.company}...`}
                  />
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-slate-200 dark:border-white/10">
                  <button type="button" onClick={() => setActiveJob(null)} className="btn-secondary flex-1 py-2.5">Cancel</button>
                  <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 py-2.5 flex justify-center items-center gap-2">
                    {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Submitting...</> : 'Confirm & Apply'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-4xl h-[85vh] shadow-2xl flex flex-col slide-up">
            <div className="p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between shrink-0">
              <h2 className="text-lg font-heading font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <FileText size={18} className="text-primary-500" /> Preview: {selectedResume}
              </h2>
              <button onClick={() => setIsPreviewOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 bg-slate-100 dark:bg-slate-950 p-4 md:p-8 flex items-start justify-center overflow-auto rounded-b-2xl">
              <div className="bg-white text-slate-800 shadow-xl w-full max-w-2xl min-h-[800px] p-8 md:p-12 flex flex-col animate-fade-in border border-slate-200">
                <h1 className="text-3xl font-serif font-bold text-center mb-1">John Smith</h1>
                <p className="text-center text-sm text-slate-500 mb-8 font-medium">Software Engineer | Bengaluru, India | john.smith@example.com</p>
                
                <h2 className="text-lg font-bold border-b-2 border-slate-800 mb-4 pb-1 font-serif uppercase tracking-wider text-slate-900">Experience</h2>
                <div className="mb-6">
                  <div className="flex justify-between font-bold mb-1 text-slate-800">
                    <span>Senior Frontend Developer &bull; Nexora Labs</span>
                    <span>2022 - Present</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm space-y-1.5 text-slate-600">
                    <li>Built scalable React applications handling 100k+ daily active users.</li>
                    <li>Improved core web vitals and load times by 40% using code splitting and lazy loading.</li>
                    <li>Mentored 3 junior developers and led code reviews across the frontend chapter.</li>
                  </ul>
                </div>
                
                <div className="mb-8">
                  <div className="flex justify-between font-bold mb-1 text-slate-800">
                    <span>Software Engineer &bull; Vertex Systems</span>
                    <span>2020 - 2022</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm space-y-1.5 text-slate-600">
                    <li>Developed and maintained RESTful APIs using Node.js and Express.</li>
                    <li>Migrated legacy monolith to a microservices architecture improving uptime to 99.9%.</li>
                  </ul>
                </div>

                <h2 className="text-lg font-bold border-b-2 border-slate-800 mb-4 pb-1 font-serif uppercase tracking-wider text-slate-900">Education</h2>
                <div className="mb-8">
                  <div className="flex justify-between font-bold mb-1 text-slate-800">
                    <span>B.Tech in Computer Science &bull; Tech University</span>
                    <span>2016 - 2020</span>
                  </div>
                  <p className="text-sm text-slate-600">Graduated with Honors, CGPA: 3.8/4.0</p>
                </div>

                <h2 className="text-lg font-bold border-b-2 border-slate-800 mb-4 pb-1 font-serif uppercase tracking-wider text-slate-900">Skills</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Languages:</strong> JavaScript (ES6+), TypeScript, HTML5, CSS3, Python<br/>
                  <strong className="text-slate-800">Frameworks:</strong> React, Next.js, Node.js, Express, TailwindCSS<br/>
                  <strong className="text-slate-800">Tools:</strong> Git, Docker, AWS (S3, EC2), Webpack, Jest
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
