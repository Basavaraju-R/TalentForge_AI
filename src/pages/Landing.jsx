import { Link } from 'react-router-dom'
import {
  ScanLine, BarChart3, Users, GraduationCap, MessageSquareText, Sparkles,
  ArrowRight, CheckCircle2, Brain, FileSearch, Target, Video, Check,
} from 'lucide-react'
import Navbar from '../layout/Navbar.jsx'
import Footer from '../layout/Footer.jsx'

const features = [
  { icon: FileSearch, title: 'Resume Analyzer', text: 'Upload once. Get ATS scoring, keyword gaps, and formatting fixes in seconds.' },
  { icon: Target, title: 'ATS Score', text: 'See exactly how applicant tracking systems read your resume, section by section.' },
  { icon: Brain, title: 'Skill Gap Detection', text: 'Compare what you have against what the role needs, with a plan to close the gap.' },
  { icon: Video, title: 'Mock Interviews', text: 'Practice with an AI interviewer that scores communication, technical depth, and confidence.' },
  { icon: Users, title: 'Recruiter Intelligence', text: 'Rank, screen, and shortlist candidates with AI-assisted scoring, not guesswork.' },
  { icon: BarChart3, title: 'Placement Analytics', text: 'Institutions track placement rate, department performance, and recruiter visits live.' },
]

const audiences = [
  {
    id: 'students',
    eyebrow: 'For Students',
    title: 'Turn your profile into an offer.',
    text: 'Analyze your resume, close skill gaps with a guided roadmap, and rehearse interviews with an AI coach that gives you real feedback — not just a pass/fail.',
    points: ['Resume Analyzer & ATS Score', 'Personalized Learning Roadmap', 'AI Mock Interviews with scoring'],
    cta: { label: 'Explore Student Tools', to: '/signup' },
  },
  {
    id: 'recruiters',
    eyebrow: 'For Recruiters',
    title: 'Screen less. Interview the right people.',
    text: 'AI ranking surfaces the strongest applicants first, with resume summaries and skill-match scores built in.',
    points: ['AI Candidate Ranking', 'Hiring Funnel Analytics', 'One-click Interview Scheduling'],
    cta: { label: 'Explore Recruiter Tools', to: '/signup' },
  },
  {
    id: 'institutions',
    eyebrow: 'Institutions',
    title: 'Placement data, without the spreadsheets.',
    text: 'Track every student, every department, and every recruiter visit from a single live dashboard.',
    points: ['Department-wise Performance', 'Placement % Tracking', 'Exportable Reports'],
    cta: { label: 'Explore Institution Tools', to: '/signup' },
  },
]

const pricing = [
  { name: 'Student', price: 'Free', desc: 'Everything you need to land your first role.', features: ['Resume Analyzer', 'ATS Score', 'Mock Interviews (3/mo)', 'Learning Roadmap'], highlight: false },
  { name: 'Recruiter', price: '₹4,999/mo', desc: 'For teams hiring at volume.', features: ['AI Candidate Ranking', 'Unlimited Job Postings', 'Hiring Analytics', 'Interview Scheduling'], highlight: true },
  { name: 'Institution', price: 'Custom', desc: 'Campus-wide placement intelligence.', features: ['Unlimited Students', 'Department Analytics', 'Recruiter Portal Access', 'Dedicated Support'], highlight: false },
]

export default function Landing() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gradient-soft" />
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-secondary-500/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-primary-500/20 blur-3xl animate-pulse-slow" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-rise">
            <span className="section-eyebrow">Career Intelligence & Hiring Platform</span>
            <h1 className="mt-4 text-4xl md:text-5xl xl:text-6xl font-heading font-extrabold leading-[1.05] tracking-tight">
              Build Your Career with <span className="bg-brand-gradient bg-clip-text text-transparent">AI</span>.
              <br />Hire Smarter with Intelligence.
            </h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl">
              An AI-powered platform for resume analysis, ATS scoring, skill gap detection, mock interviews, recruiter intelligence, and placement analytics.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/signup" className="btn-primary">
                Get Started <ArrowRight size={18} />
              </Link>
              <Link to="/student/dashboard" className="btn-secondary">
                Explore Demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> No credit card</div>
              <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-success" /> Free for students</div>
            </div>
          </div>

          {/* Signature hero visual: AI resume-scan / analytics composite */}
          <div className="relative animate-fade-in">
            <div className="card !p-0 overflow-hidden shadow-glow">
              <div className="bg-brand-gradient p-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <ScanLine size={18} />
                  <span className="font-heading font-semibold text-sm">AI Resume Scan — live</span>
                </div>
                <Sparkles size={16} className="text-white/80" />
              </div>
              <div className="relative p-6 bg-white/60 dark:bg-white/[0.03]">
                <div className="relative h-40 rounded-xl2 border border-primary-500/30 bg-white dark:bg-white/5 overflow-hidden mb-5">
                  <div className="absolute inset-0 p-4 space-y-2 opacity-70">
                    {[100, 88, 92, 70, 84, 60].map((w, i) => (
                      <div key={i} className="h-2.5 rounded-full bg-slate-300 dark:bg-white/15" style={{ width: `${w}%` }} />
                    ))}
                  </div>
                  <div className="absolute left-0 right-0 h-1/3 bg-gradient-to-b from-primary-400/0 via-primary-400/40 to-secondary-400/0 animate-scan" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'ATS Score', value: '87%', icon: Target },
                    { label: 'Skill Match', value: '92%', icon: Brain },
                    { label: 'Interview Score', value: '81%', icon: MessageSquareText },
                    { label: 'Resume Strength', value: 'A+', icon: FileSearch },
                  ].map((s) => (
                    <div key={s.label} className="rounded-xl2 bg-white/80 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 p-3">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-1">
                        <s.icon size={13} /> {s.label}
                      </div>
                      <div className="text-xl font-heading font-bold">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">Platform Features</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold">One workspace, every hiring signal</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card card-hover">
              <div className="h-11 w-11 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-primary-600 dark:text-primary-400 mb-4">
                <f.icon size={20} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Audiences */}
      {audiences.map((a, idx) => (
        <section id={a.id} key={a.id} className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
          <div className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
            <div>
              <span className="section-eyebrow">{a.eyebrow}</span>
              <h2 className="mt-3 text-3xl font-heading font-bold">{a.title}</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300">{a.text}</p>
              <ul className="mt-6 space-y-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm font-medium">
                    <Check size={16} className="text-success shrink-0" /> {p}
                  </li>
                ))}
              </ul>
              <Link to={a.cta.to} className="btn-primary mt-8 inline-flex">
                {a.cta.label} <ArrowRight size={16} />
              </Link>
            </div>
            <div className="card h-72 flex items-center justify-center bg-brand-gradient-soft">
              {a.id === 'students' && <GraduationCap size={96} className="text-primary-500/40" />}
              {a.id === 'recruiters' && <Users size={96} className="text-secondary-500/40" />}
              {a.id === 'institutions' && <BarChart3 size={96} className="text-primary-500/40" />}
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="section-eyebrow">Pricing</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-heading font-bold">Plans for every role</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div key={p.name} className={`card flex flex-col ${p.highlight ? 'ring-2 ring-primary-500 shadow-glow scale-[1.02]' : ''}`}>
              {p.highlight && <span className="badge bg-brand-gradient text-white w-fit mb-3">Most Popular</span>}
              <h3 className="font-heading font-bold text-xl">{p.name}</h3>
              <p className="text-3xl font-heading font-extrabold mt-2">{p.price}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 mb-6">{p.desc}</p>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <Check size={15} className="text-success shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/signup" className={p.highlight ? 'btn-primary' : 'btn-secondary'}>Choose {p.name}</Link>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-4 lg:px-8 py-20 text-center">
        <span className="section-eyebrow">About</span>
        <h2 className="mt-3 text-3xl font-heading font-bold">Built to close the gap between talent and opportunity</h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          TalentForge AI connects students, recruiters, and institutions on one platform — replacing guesswork with
          measurable signal at every stage of hiring, from resume to offer letter.
        </p>
      </section>

      <Footer />
    </div>
  )
}
