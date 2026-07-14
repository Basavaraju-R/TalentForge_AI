import { useState, useCallback } from 'react'
import { UploadCloud, FileText, CheckCircle2, AlertTriangle, Sparkles, Wand2, Loader2, Save, X, Download } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'

const generateResults = () => {
  const atsScore = Math.floor(Math.random() * 20) + 75; // 75-94
  const formattingScore = Math.floor(Math.random() * 15) + 80; // 80-94
  const missingKeywords = Math.floor(Math.random() * 5) + 2; // 2-6
  const grammarScore = Math.floor(Math.random() * 10) + 90; // 90-99
  const techSkills = 5; 
  const softSkills = 4;
  
  let strength = 'B+';
  if (atsScore > 85) strength = 'A-';
  if (atsScore > 90) strength = 'A+';

  return [
    { label: 'ATS Score', value: `${atsScore}%`, tone: atsScore >= 85 ? 'success' : 'warning' },
    { label: 'Resume Strength', value: strength, tone: strength.includes('A') ? 'success' : 'warning' },
    { label: 'Missing Keywords', value: `${missingKeywords} found`, tone: 'warning', clickable: true },
    { label: 'Grammar Score', value: `${grammarScore}%`, tone: 'success' },
    { label: 'Formatting Score', value: `${formattingScore}%`, tone: 'success' },
    { label: 'Technical Skills', value: `${techSkills} detected`, tone: 'primary', clickable: true },
    { label: 'Soft Skills', value: `${softSkills} detected`, tone: 'primary', clickable: true },
  ]
}

const metricDetails = {
  'Technical Skills': ['JavaScript', 'React', 'Node.js', 'SQL', 'Git'],
  'Soft Skills': ['Communication', 'Teamwork', 'Problem Solving', 'Time Management'],
  'Missing Keywords': ['CI/CD', 'Docker', 'Agile', 'GraphQL', 'Unit Testing']
}

const suggestions = [
  'Add "CI/CD" and "unit testing" — both appear across matched job descriptions.',
  'Quantify your internship impact (e.g. "reduced load time by 30%").',
  'Keep bullet points to one line each for scannability.',
]

const tones = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  primary: 'bg-primary-500/10 text-primary-600 dark:text-primary-400',
}

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [analyzed, setAnalyzed] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState(null)

  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)

  // Modals state
  const [activeModal, setActiveModal] = useState(null)
  const [selectedImprovements, setSelectedImprovements] = useState(suggestions.map(() => true))
  const [isDownloading, setIsDownloading] = useState(false)
  const [downloadComplete, setDownloadComplete] = useState(false)

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files?.[0]
    if (f) { setFile(f); setAnalyzed(false); setResults(null); setIsGenerated(false); }
  }, [])

  const onSelect = (e) => {
    const f = e.target.files?.[0]
    if (f) { setFile(f); setAnalyzed(false); setResults(null); setIsGenerated(false); }
  }

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    setAnalyzed(false)
    setIsGenerated(false)
    
    // Simulate AI processing delay
    setTimeout(() => {
      setResults(generateResults())
      setIsAnalyzing(false)
      setAnalyzed(true)
    }, 2000)
  }

  const handleGenerate = () => {
    setIsGenerating(true)
    setIsGenerated(false)
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2500)
  }

  const toggleImprovement = (index) => {
    const newArr = [...selectedImprovements]
    newArr[index] = !newArr[index]
    setSelectedImprovements(newArr)
  }

  const handleDownloadConfirm = () => {
    setIsDownloading(true)
    setTimeout(() => {
      setIsDownloading(false)
      setDownloadComplete(true)
      setTimeout(() => {
        setActiveModal(null)
        setDownloadComplete(false)
      }, 2000)
    }, 1500)
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Resume Analyzer" avatarSeed="JS">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`card border-2 border-dashed flex flex-col items-center justify-center text-center py-12 transition-colors ${
              dragOver ? 'border-primary-500 bg-primary-500/5' : 'border-slate-300 dark:border-white/15'
            }`}
          >
            <UploadCloud size={36} className="text-primary-500 mb-3" />
            <p className="font-semibold">Drag & drop your resume</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Supports PDF and DOCX, up to 5MB</p>
            <label className="btn-secondary mt-4 cursor-pointer">
              Browse file
              <input type="file" accept=".pdf,.docx" className="hidden" onChange={onSelect} disabled={isAnalyzing || isGenerating} />
            </label>
          </div>

          {file && (
            <div className="card animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl2 bg-primary-500/10 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <FileText size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{(file.size / 1024).toFixed(0)} KB</p>
                </div>
              </div>
              
              {!analyzed && !isAnalyzing && (
                <button onClick={handleAnalyze} className="btn-primary w-full">
                  <Sparkles size={16} /> Analyze Resume
                </button>
              )}
              {isAnalyzing && (
                <button disabled className="btn-primary w-full opacity-80 cursor-not-allowed">
                  <Loader2 size={16} className="animate-spin" /> Analyzing...
                </button>
              )}
              {analyzed && (
                <div className="flex items-center justify-center gap-2 text-success font-medium bg-success/10 py-2 rounded-lg border border-success/20">
                  <Save size={16} /> Resume {isGenerated ? 'Optimized' : 'Analyzed'}
                </div>
              )}
            </div>
          )}

          {!file && (
            <div className="card bg-brand-gradient-soft">
              <p className="text-sm text-slate-600 dark:text-slate-300">
                No file yet? Try the sample resume to see how AI Analysis works before uploading your own.
              </p>
              <button 
                onClick={() => { setFile({ name: 'sample-resume.pdf', size: 184320 }); setAnalyzed(false); setResults(null); setIsGenerated(false); }} 
                className="btn-secondary mt-4 w-full"
                disabled={isAnalyzing || isGenerating}
              >
                Use sample resume
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-3 space-y-6">
          {!analyzed && !isAnalyzing ? (
            <div className="card h-full flex flex-col items-center justify-center text-center py-20 text-slate-400">
              <Sparkles size={32} className="mb-3" />
              <p className="font-medium">Upload a resume to see AI analysis</p>
              <p className="text-sm mt-1">Results appear here instantly once processed.</p>
            </div>
          ) : isAnalyzing ? (
             <div className="card h-full flex flex-col items-center justify-center text-center py-20 text-primary-500">
               <Loader2 size={40} className="mb-4 animate-spin mx-auto" />
               <p className="font-medium animate-pulse">AI is reading your resume...</p>
               <p className="text-sm text-slate-500 mt-2">Extracting skills, parsing format, checking keywords.</p>
             </div>
          ) : (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                {results?.map((c) => (
                  <div 
                    key={c.label} 
                    className={`card !p-4 animate-fade-in ${c.clickable ? 'cursor-pointer hover:border-primary-500/50 transition-colors' : ''}`}
                    onClick={() => { if (c.clickable) setActiveModal(c.label) }}
                  >
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{c.label}</p>
                    <div className="flex items-center justify-between">
                      <span className={`badge ${tones[c.tone]}`}>{c.value}</span>
                      {c.clickable && <span className="text-xs text-primary-500 opacity-50 hover:opacity-100 font-medium">View</span>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="card animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-warning" /> Suggestions & Improvement Tips
                </h3>
                <ul className="space-y-3">
                  {suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 size={15} className="text-success mt-0.5 shrink-0" /> {s}
                    </li>
                  ))}
                </ul>
                
                {!isGenerated && !isGenerating && (
                  <button className="btn-primary mt-6" onClick={handleGenerate}>
                    <Wand2 size={16} /> Generate Optimized Resume
                  </button>
                )}
                {isGenerating && (
                  <button disabled className="btn-primary mt-6 opacity-80 cursor-not-allowed">
                    <Loader2 size={16} className="animate-spin" /> Generating...
                  </button>
                )}
                {isGenerated && (
                  <button className="btn-primary mt-6 bg-success-500 hover:bg-success-600 text-white border-none" onClick={() => setActiveModal('download')}>
                    <Download size={16} /> Download Optimized Resume
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Detail Modals for Metrics */}
      {activeModal && activeModal !== 'download' && metricDetails[activeModal] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
              <h3 className="font-heading font-semibold text-lg">{activeModal}</h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <ul className="space-y-3">
                {metricDetails[activeModal].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-white/5">
                    <Sparkles size={16} className={activeModal === 'Missing Keywords' ? 'text-warning' : 'text-primary-500'} />
                    <span className="font-medium text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
              <button onClick={() => setActiveModal(null)} className="btn-primary">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Download Improvement Checklist Modal */}
      {activeModal === 'download' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => !isDownloading && setActiveModal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 slide-up" onClick={(e) => e.stopPropagation()}>
            {downloadComplete ? (
              <div className="p-10 text-center flex flex-col items-center justify-center animate-fade-in">
                <div className="h-16 w-16 rounded-full bg-success/20 text-success flex items-center justify-center mb-4">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-xl font-heading font-bold mb-2">Download Complete!</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm">Your highly optimized resume is ready for applications.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
                  <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                    <Wand2 size={18} className="text-primary-500" /> Optimize & Download
                  </h3>
                  <button onClick={() => !isDownloading && setActiveModal(null)} className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors" disabled={isDownloading}>
                    <X size={20} />
                  </button>
                </div>
                <div className="p-6">
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    Select which AI improvements you want to automatically apply to your new resume document before downloading:
                  </p>
                  <div className="space-y-3">
                    {suggestions.map((s, idx) => (
                      <label key={idx} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${selectedImprovements[idx] ? 'border-primary-500 bg-primary-500/5' : 'border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                        <div className="mt-0.5">
                          <input 
                            type="checkbox" 
                            checked={selectedImprovements[idx]} 
                            onChange={() => toggleImprovement(idx)}
                            className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-slate-900 focus:ring-2 dark:bg-slate-700 dark:border-slate-600"
                            disabled={isDownloading}
                          />
                        </div>
                        <span className={`text-sm ${selectedImprovements[idx] ? 'font-medium text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                          {s}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-3 p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
                  <button onClick={() => setActiveModal(null)} className="btn-secondary" disabled={isDownloading}>Cancel</button>
                  <button onClick={handleDownloadConfirm} className="btn-primary flex items-center gap-2" disabled={isDownloading}>
                    {isDownloading ? (
                      <><Loader2 size={16} className="animate-spin" /> Preparing File...</>
                    ) : (
                      <><Download size={16} /> Confirm & Download</>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
