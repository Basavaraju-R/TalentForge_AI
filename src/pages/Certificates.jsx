import { Award, Download, BookOpen, Compass, Code, ExternalLink, GraduationCap, ChevronRight, Lock, Crown, CheckCircle2, PlayCircle, HelpCircle, XCircle, ArrowRight, Video, FileText, CheckCircle, Clock } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { jsPDF } from 'jspdf'
import { useState, useEffect } from 'react'

const initialCertificates = [
  { title: 'Java Fundamentals', duration: 'Jan 2026 - Jun 2026', image: '/java_cert.png' },
  { title: 'SQL Essentials', duration: 'Mar 2026 - Jun 2026', image: '/sql_cert.png' },
]

const availableCertifications = [
  { id: 'react', title: 'React Advanced Concepts', duration: '4 Weeks', level: 'Advanced', career: 'Frontend Engineer' },
  { id: 'system', title: 'System Design Interview Prep', duration: '6 Weeks', level: 'Expert', career: 'Software Architect' },
  { id: 'devops', title: 'DevOps & CI/CD Pipelines', duration: '5 Weeks', level: 'Intermediate', career: 'DevOps Engineer' },
  { id: 'aws', title: 'AWS Cloud Solutions Architect', duration: '8 Weeks', level: 'Advanced', career: 'Cloud Engineer' },
  { id: 'ml', title: 'Applied Machine Learning', duration: '10 Weeks', level: 'Expert', career: 'Data Scientist' },
]

const courseData = {
  react: {
    title: 'React Advanced Concepts',
    level: 'Advanced',
    weeks: [
      {
        id: 1,
        title: 'Week 1: Core Concepts & Hooks Deep Dive',
        videos: [
          { title: 'Part 1: The Virtual DOM & Reconciliation (Deep Dive)', url: 'https://www.youtube.com/embed/dpw9EHDh2bM', duration: '14:20' },
          { title: 'Part 2: Advanced useMemo & useCallback Patterns', url: 'https://www.youtube.com/embed/dpw9EHDh2bM', duration: '10:45' }
        ],
        content: `
          <div class="space-y-4">
            <h3 class="text-xl font-bold text-slate-900 dark:text-white">Under the Hood of React</h3>
            <p>Welcome to Week 1! We are going beyond the basics to understand the exact mechanics of React's rendering engine. When does React <em>actually</em> paint to the DOM?</p>
            
            <h4 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">Fiber Architecture</h4>
            <p>React Fiber is the new reconciliation engine in React 16. Its main goal is to enable incremental rendering of the virtual DOM. Understanding this allows you to debug severe performance bottlenecks in massive component trees.</p>
            
            <h4 class="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">Referential Equality in JS</h4>
            <p>Because React uses <code>Object.is()</code> to compare states and props, passing a new inline object <code>{{ margin: 10 }}</code> to a memoized child will always break the memoization. You must strictly control object and array references using <code>useMemo</code>.</p>
          </div>
        `,
        materials: [
          { name: 'React Fiber Architecture Whitepaper.pdf', size: '4.2 MB', url: '#' },
          { name: 'Advanced Memoization Cheat Sheet.pdf', size: '1.4 MB', url: '#' }
        ],
        quiz: [
          {
            question: 'In React Fiber architecture, what happens during the "render phase"?',
            options: ['The browser DOM is actively mutated', 'React performs side effects defined in useEffect', 'React calls render methods and compares the result to the previous virtual DOM (reconciliation)', 'The screen is painted by the browser'],
            answer: 'React calls render methods and compares the result to the previous virtual DOM (reconciliation)'
          },
          {
            question: 'Why does passing an inline arrow function as a prop to a React.memo child component cause a re-render?',
            options: ['Arrow functions execute slower', 'The arrow function creates a new memory reference on every parent render, breaking the shallow comparison', 'React.memo does not support functions as props', 'Arrow functions do not bind "this" properly'],
            answer: 'The arrow function creates a new memory reference on every parent render, breaking the shallow comparison'
          },
          {
            question: 'When using useLayoutEffect versus useEffect, what is the primary difference?',
            options: ['useLayoutEffect fires asynchronously after DOM mutations', 'useLayoutEffect fires synchronously after all DOM mutations but before the browser paints', 'useEffect blocks the browser paint', 'There is no functional difference, useLayoutEffect is just an alias'],
            answer: 'useLayoutEffect fires synchronously after all DOM mutations but before the browser paints'
          },
          {
            question: 'If a parent component provides Context, which components re-render when the Context value changes?',
            options: ['Only the direct children of the Provider', 'Every single component in the application', 'Only the components that explicitly call useContext() for that specific context', 'React automatically prevents any re-renders'],
            answer: 'Only the components that explicitly call useContext() for that specific context'
          },
          {
            question: 'What is "stale closure" in the context of React Hooks?',
            options: ['When a component is unmounted but still retains memory', 'When a hook captures variables from an old render because the dependency array was missing or incorrect', 'When the browser cache holds an old version of the JS bundle', 'A deprecated feature in React 15'],
            answer: 'When a hook captures variables from an old render because the dependency array was missing or incorrect'
          }
        ]
      }
    ]
  },
  system: {
    title: 'System Design Interview Prep',
    level: 'Expert',
    career: 'Software Architect',
    weeks: [
      {
        id: 1,
        title: 'Week 1: Scalability & Database Sharding',
        videos: [
          { title: 'Part 1: Vertical vs Horizontal Scaling', url: 'https://www.youtube.com/embed/bBTPZ9NdSk8', duration: '12:00' },
          { title: 'Part 2: Database Partitioning & Sharding', url: 'https://www.youtube.com/embed/bBTPZ9NdSk8', duration: '13:00' }
        ],
        content: `
          <div class="space-y-4">
            <h3 class="text-xl font-bold">Designing for Millions of Users</h3>
            <p>This week we cover database sharding strategies, consistent hashing, and handling massive read/write loads.</p>
          </div>
        `,
        materials: [{ name: 'System Design Blueprint.pdf', size: '5.1 MB', url: '#' }],
        quiz: [
          {
            question: 'What is the primary advantage of Consistent Hashing over simple modulo hashing when sharding a database?',
            options: ['It requires less CPU power', 'It minimizes the number of keys that need to be remapped when a node is added or removed', 'It provides stronger encryption for stored data', 'It natively supports SQL joins across shards'],
            answer: 'It minimizes the number of keys that need to be remapped when a node is added or removed'
          }
        ]
      }
    ]
  },
  aws: {
    title: 'AWS Cloud Solutions Architect',
    level: 'Advanced',
    career: 'Cloud Engineer',
    weeks: [
      {
        id: 1,
        title: 'Week 1: VPCs & Networking',
        videos: [
          { title: 'Part 1: VPC Architecture', url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', duration: '20:00' }
        ],
        content: `<p>Learn about subnets, route tables, and NAT gateways.</p>`,
        materials: [],
        quiz: [{ question: 'What connects a private subnet to the internet for outbound traffic?', options: ['Internet Gateway', 'NAT Gateway', 'VPC Peering', 'Route 53'], answer: 'NAT Gateway' }]
      }
    ]
  }
}

const processSignatureImage = async () => {
  return new Promise((resolve) => {
    const loadImg = (src, isFallback) => {
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        
        if (!isFallback) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]; const g = data[i+1]; const b = data[i+2]
            if (r > 140 && g > 140 && b > 140) {
              data[i+3] = 0 // transparent
            } else {
              data[i] = 15; data[i+1] = 30; data[i+2] = 80;
            }
          }
          ctx.putImageData(imageData, 0, 0)
        }
        
        resolve(canvas.toDataURL('image/png'))
      }
      
      img.onerror = () => {
        if (!isFallback) {
          const fallbackSvg = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMTUwIj48c3R5bGU+LnNpZyB7IGZvbnQtZmFtaWx5OiAnQnJ1c2ggU2NyaXB0IE1UJywgY3Vyc2l2ZTsgZm9udC1zaXplOiA4MHB4OyBmaWxsOiAjMGYxZTUwOyB9IC5saW5lIHsgc3Ryb2tlOiAjMGYxZTUwOyBzdHJva2Utd2lkdGg6IDQ7IGZpbGw6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgfTwvc3R5bGU+PHBhdGggZD0iTSAyMCAxMjAgUSAxNTAgMTQwIDM4MCA5MCIgY2xhc3M9ImxpbmUiIC8+PHRleHQgeD0iNTAiIHk9IjEwMCIgY2xhc3M9InNpZyI+QmFzYXZhPC90ZXh0Pjwvc3ZnPg==`;
          loadImg(fallbackSvg, true)
        } else {
          resolve(null)
        }
      }
      
      img.src = src
    }
    
    loadImg('/signature.png', false)
  })
}

export default function Certificates() {
  const [certificates, setCertificates] = useState(initialCertificates);
  const [isPremium, setIsPremium] = useState(false);

  // Interactive Course State
  const [activeCourseId, setActiveCourseId] = useState(null); 
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [stage, setStage] = useState('overview'); 
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  
  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    let earned = JSON.parse(localStorage.getItem('earned_certificates') || '[]');
    let premium = false;
    
    try {
      const profile = JSON.parse(localStorage.getItem('talentforge_profile') || '{}');
      if (profile.isPremium || localStorage.getItem('userTier')?.startsWith('premium')) premium = true;
    } catch(e) {}

    setIsPremium(premium);

    if (premium) {
      const proCerts = [
        { title: 'AI Engineering Masterclass (PRO)', duration: 'Instant Access', image: '/ai_cert.png', isPro: true },
        { title: 'Elite Developer Program (PRO)', duration: 'Instant Access', image: '/elite_cert.png', isPro: true }
      ];
      const newProCerts = proCerts.filter(pc => !earned.some(e => e.title === pc.title));
      earned = [...earned, ...newProCerts];
    }

    if (earned.length > 0) {
      setCertificates([...initialCertificates, ...earned]);
    }
  }, []);

  const handleDownload = async (certTitle, certDuration) => {
    let userName = "Jane Student";
    const stored = localStorage.getItem('talentforge_profile');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data && data.name) userName = data.name;
      } catch(e) {}
    }

    const doc = new jsPDF({ orientation: 'landscape' });
    
    doc.setLineWidth(2);
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1);
    doc.rect(14, 14, 269, 182);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(15, 23, 42);
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 60, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text("This certifies that", 148.5, 85, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(15, 23, 42);
    doc.text(userName, 148.5, 110, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    const nameWidth = doc.getTextWidth(userName);
    doc.line(148.5 - (nameWidth/2) - 10, 115, 148.5 + (nameWidth/2) + 10, 115);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text("has successfully completed the certification for", 148.5, 130, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(59, 130, 246);
    doc.text(certTitle, 148.5, 150, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);

    doc.text("Duration: " + certDuration, 60, 175, { align: "center" });
    doc.line(20, 180, 100, 180);

    const signatureBase64 = await processSignatureImage();
    
    if (signatureBase64) {
      doc.addImage(signatureBase64, 'PNG', 195, 145, 80, 35);
    } else {
      doc.setFont("times", "italic");
      doc.setFontSize(28);
      doc.text("A. Director", 237, 175, { align: "center" });
    }
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("TalentForge Authorized Signature", 237, 185, { align: "center" });
    doc.line(190, 180, 280, 180);

    doc.save(`${certTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
  }

  const handleEnroll = (courseId) => {
    setActiveCourseId(courseId);
    setCurrentWeekIndex(0);
    setStage('overview');
    setActiveVideoIndex(null);
    
    // Reset quiz
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  const handleClaimCertificate = () => {
    const course = courseData[activeCourseId];
    const newCert = { 
      title: course.title, 
      duration: 'Completed Just Now', 
      image: '/java_cert.png', 
      isPro: false 
    };
    
    const currentEarned = JSON.parse(localStorage.getItem('earned_certificates') || '[]');
    if (!currentEarned.some(e => e.title === newCert.title)) {
      const updatedEarned = [...currentEarned, newCert];
      localStorage.setItem('earned_certificates', JSON.stringify(updatedEarned));
      setCertificates([...initialCertificates, ...updatedEarned]);
    }

    setActiveCourseId(null);
  };

  const handleNextQuestion = () => {
    const currentWeek = courseData[activeCourseId].weeks[currentWeekIndex];
    
    // Check answer
    if (selectedAnswer === currentWeek.quiz[currentQuestionIndex].answer) {
      setScore(prev => prev + 1);
    }

    if (currentQuestionIndex + 1 < currentWeek.quiz.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizFinished(true);
      setStage('quiz_results');
    }
  };

  const handleDownloadResource = (e, name) => {
    e.preventDefault();
    alert(`Downloading ${name}...\n\n(This is a simulated download feature.)`);
  };

  const activeCourse = activeCourseId ? courseData[activeCourseId] : null;
  const currentWeek = activeCourse && activeCourse.weeks[currentWeekIndex] ? activeCourse.weeks[currentWeekIndex] : null;
  const progressPercent = activeCourse ? Math.round((currentWeekIndex / activeCourse.weeks.length) * 100) : 0;
  const passingScore = currentWeek ? Math.ceil(currentWeek.quiz.length * 0.8) : 0; // 80% to pass
  
  // Simulated 25 questions total for UI display
  const simulatedTotalQuestions = 25; 

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Certificates">
      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-heading font-bold">Earned Certificates</h2>
        <p className="text-sm text-slate-500 mt-1">Download and share your verified certificates.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
        {certificates.map((c, i) => (
          <div key={i} className={`card card-hover flex flex-col p-4 ${c.isPro ? 'border-amber-400/30 bg-amber-50/50 dark:bg-amber-900/5' : ''}`}>
            <div className={`h-40 rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 relative group`}>
              <img src={c.image || '/java_cert.png'} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Award size={32} className="text-white" />
              </div>
            </div>
            <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
              {c.title} {c.isPro && <Crown size={16} className="text-amber-500" />}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">Duration: {c.duration}</p>
            <button 
              onClick={() => handleDownload(c.title, c.duration)}
              className="mt-auto btn-secondary w-full !py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold">Career Growth & Recommended Certifications</h2>
          <p className="text-sm text-slate-500 mt-1">Enroll in these advanced paths tailored for high-demand tech careers.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {availableCertifications.map((c) => {
          if (certificates.some(cert => cert.title === c.title)) return null;

          return (
            <div key={c.id} className="card card-hover flex flex-col border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute -right-12 -top-12 w-24 h-24 bg-brand-500/10 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex items-center gap-2 mb-3">
                 <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 dark:bg-brand-900/30 px-2 py-1 rounded-md">{c.level}</span>
                 <span className="text-xs font-semibold text-slate-500">Career: {c.career}</span>
              </div>
              
              <h3 className="font-heading font-semibold text-lg mb-1">{c.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 flex items-center gap-1">
                 <Clock size={14} /> {c.duration} 
              </p>
              
              <button 
                onClick={() => {
                  if(courseData[c.id]) {
                     handleEnroll(c.id)
                  } else {
                     alert("This course is coming soon. Please try React Advanced Concepts.");
                  }
                }}
                className="mt-auto w-full px-4 py-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white text-sm font-bold flex items-center justify-center gap-2 hover:bg-brand-600 transition-colors shadow-sm relative z-10"
              >
                Enroll & Start Journey <ChevronRight size={16} />
              </button>
            </div>
          )
        })}
      </div>

      {/* Course Interaction Modal */}
      {activeCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-4xl relative flex flex-col max-h-[95vh] border border-slate-200 dark:border-slate-700">
            <button 
              onClick={() => setActiveCourseId(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-red-500 dark:hover:text-red-400 z-10 bg-slate-100 dark:bg-slate-800 p-2 rounded-full transition-colors"
            >
              <XCircle size={20} />
            </button>
            
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 rounded-t-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold font-heading mb-2 text-slate-900 dark:text-white">{activeCourse.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded-full font-bold text-xs uppercase border border-slate-200 dark:border-slate-700 shadow-sm text-brand-600">{activeCourse.level}</span>
                  <span className="font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{currentWeekIndex} of {activeCourse.weeks.length} Modules Completed</span>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar bg-white dark:bg-slate-950">
              {stage === 'overview' && (
                <div className="space-y-6 max-w-3xl mx-auto">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 mb-2 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-brand-500 to-purple-500 h-3 rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <p className="text-right text-sm font-bold text-brand-600 mb-8">{progressPercent}% Progress Overall</p>

                  <div className="space-y-5">
                    {activeCourse.weeks.map((week, idx) => {
                      const isCompleted = idx < currentWeekIndex;
                      const isCurrent = idx === currentWeekIndex;
                      const isLocked = idx > currentWeekIndex;

                      return (
                        <div key={week.id} className={`flex flex-col sm:flex-row sm:items-center justify-between p-6 border-2 rounded-2xl transition-all gap-4 ${isCurrent ? "border-brand-500 bg-brand-50/20 dark:bg-brand-900/10 shadow-lg transform scale-[1.01]" : isLocked ? "border-slate-100 dark:border-slate-800 opacity-70 bg-slate-50 dark:bg-slate-900/50" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"}`}>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                              <span className={`text-xl ${isCompleted ? "text-slate-400" : isLocked ? "text-slate-500" : "font-bold text-slate-900 dark:text-white"}`}>
                                {week.title}
                              </span>
                              {isCurrent && <span className="text-xs bg-brand-600 text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow-sm animate-pulse">Up Next</span>}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                               <span className="flex items-center gap-1"><Video size={14}/> {week.videos ? week.videos.length : 1} Parts (Max 25m each)</span>
                               <span className="flex items-center gap-1"><HelpCircle size={14}/> 25 Question Hard Quiz</span>
                            </div>
                          </div>
                          
                          {isCompleted ? (
                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                              <CheckCircle2 size={24} className="text-green-600" />
                            </div>
                          ) : isLocked ? (
                            <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                              <Lock size={20} className="text-slate-400" />
                            </div>
                          ) : (
                            <button onClick={() => { setStage('learning'); setActiveVideoIndex(0); }} className="w-full sm:w-auto text-sm bg-brand-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0">
                              Start Module <ArrowRight size={16} />
                            </button>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {stage === 'learning' && currentWeek && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 max-w-4xl mx-auto">
                  <div className="flex items-center gap-3 text-brand-600 border-b border-slate-200 dark:border-slate-800 pb-4">
                    <BookOpen size={28} />
                    <h3 className="font-bold text-2xl text-slate-900 dark:text-white">{currentWeek.title}</h3>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                      {/* Part by Part Video Player */}
                      {currentWeek.videos && currentWeek.videos.length > 0 ? (
                        <div className="space-y-3">
                          <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-xl border border-slate-800 relative">
                            {activeVideoIndex !== null ? (
                              <iframe 
                                width="100%" 
                                height="100%" 
                                src={`${currentWeek.videos[activeVideoIndex].url}?autoplay=1`} 
                                title="Course Video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                            ) : (
                               <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
                                  <Video size={48} className="text-slate-600 mb-4"/>
                                  <p className="text-lg font-bold">Select a video part from the playlist to begin.</p>
                                  <p className="text-sm text-slate-400 mt-2">Maximum duration: 25 minutes per part.</p>
                               </div>
                            )}
                          </div>
                          
                          {activeVideoIndex !== null && (
                             <h4 className="font-bold text-lg text-slate-800 dark:text-white">{currentWeek.videos[activeVideoIndex].title}</h4>
                          )}
                        </div>
                      ) : null}
                    </div>

                    <div className="lg:col-span-1">
                       {/* Playlist */}
                       <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden h-full">
                          <div className="bg-slate-100 dark:bg-slate-800 p-4 border-b border-slate-200 dark:border-slate-700">
                             <h4 className="font-bold text-sm text-slate-800 dark:text-white uppercase tracking-wider">Video Playlist</h4>
                          </div>
                          <div className="flex flex-col">
                             {currentWeek.videos?.map((vid, idx) => (
                                <button 
                                  key={idx}
                                  onClick={() => setActiveVideoIndex(idx)}
                                  className={`flex items-start gap-3 p-4 text-left border-b border-slate-200 dark:border-slate-800 transition-colors ${activeVideoIndex === idx ? 'bg-brand-50 dark:bg-brand-900/30 border-l-4 border-l-brand-500' : 'hover:bg-slate-100 dark:hover:bg-slate-800/50 border-l-4 border-l-transparent'}`}
                                >
                                   <PlayCircle size={18} className={`shrink-0 mt-0.5 ${activeVideoIndex === idx ? 'text-brand-600' : 'text-slate-400'}`}/>
                                   <div>
                                      <p className={`text-sm font-semibold leading-tight ${activeVideoIndex === idx ? 'text-brand-700 dark:text-brand-300' : 'text-slate-700 dark:text-slate-300'}`}>{vid.title}</p>
                                      <p className="text-xs text-slate-500 mt-1">{vid.duration}</p>
                                   </div>
                                </button>
                             ))}
                          </div>
                       </div>
                    </div>
                  </div>
                  
                  {/* Real Formatted Content */}
                  <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-xl flex items-center gap-2">
                      <BookOpen size={20} className="text-brand-500" /> Deep Dive Reading Material
                    </h4>
                    <div 
                      className="prose dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-slate-950 prose-pre:p-5 prose-pre:rounded-xl prose-pre:shadow-inner prose-code:text-brand-600 dark:prose-code:text-brand-400 text-slate-700 dark:text-slate-300 prose-headings:text-slate-900 dark:prose-headings:text-white"
                      dangerouslySetInnerHTML={{ __html: currentWeek.content }}
                    />
                  </div>

                  {/* Workable Downloads */}
                  {currentWeek.materials && currentWeek.materials.length > 0 && (
                    <div className="space-y-4 pt-4">
                      <h4 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 text-lg">
                        <FileText size={20} className="text-brand-500"/> Downloadable Resources
                      </h4>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {currentWeek.materials.map((mat, idx) => (
                          <a 
                            key={idx} 
                            href={mat.url}
                            onClick={(e) => handleDownloadResource(e, mat.name)}
                            className="flex items-center justify-between p-4 border border-slate-200 dark:border-slate-700 rounded-xl hover:border-brand-500 hover:bg-brand-50/50 dark:hover:bg-brand-900/20 cursor-pointer transition-all shadow-sm hover:shadow-md group bg-white dark:bg-slate-800"
                          >
                             <div className="flex items-center gap-3 overflow-hidden">
                               <div className="p-2.5 bg-brand-100 dark:bg-brand-900/50 rounded-lg text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                                 <Download size={18} />
                               </div>
                               <div>
                                 <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block truncate">{mat.name}</span>
                                 <span className="text-xs text-slate-500 font-medium">{mat.size}</span>
                               </div>
                             </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-8 mt-10 border-t border-slate-200 dark:border-slate-800">
                    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 p-4 rounded-xl mb-6 flex gap-3">
                       <HelpCircle className="text-red-500 shrink-0 mt-0.5" />
                       <div>
                          <p className="font-bold text-red-800 dark:text-red-400 text-sm">Difficult Assessment Ahead</p>
                          <p className="text-xs text-red-600 dark:text-red-300/70 mt-1">This quiz contains 25 highly technical questions based strictly on the videos and material above. An 80% score is required to pass.</p>
                       </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        setCurrentQuestionIndex(0);
                        setSelectedAnswer(null);
                        setScore(0);
                        setQuizFinished(false);
                        setStage('quiz');
                      }}
                      className="w-full bg-slate-900 dark:bg-brand-600 hover:bg-black dark:hover:bg-brand-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-xl flex items-center justify-center gap-3 text-lg"
                    >
                      Start Hard Assessment (25 Questions) <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {stage === 'quiz' && currentWeek && !quizFinished && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300 max-w-3xl mx-auto">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                      <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                         <HelpCircle size={24} className="text-red-600 dark:text-red-400" />
                      </div>
                      <div>
                         <span className="font-bold text-xl block">Technical Assessment</span>
                         <span className="text-xs text-slate-500 font-medium">Difficulty: Hard</span>
                      </div>
                    </div>
                    
                    {/* Simulated 25 Question UI Tracker */}
                    <div className="text-right">
                       <span className="text-base font-bold bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full border border-slate-200 dark:border-slate-700 shadow-inner">
                         Q: {(currentQuestionIndex * 5) + 1} - {(currentQuestionIndex * 5) + 5} <span className="text-slate-400">/ 25</span>
                       </span>
                    </div>
                  </div>
                  
                  {/* Progress Bar for Quiz */}
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden shadow-inner">
                    <div className="bg-gradient-to-r from-brand-500 to-red-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${((currentQuestionIndex) / currentWeek.quiz.length) * 100}%` }}></div>
                  </div>
                  
                  <div className="p-6 sm:p-10 bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-100 dark:border-slate-800 shadow-xl mt-8">
                    <p className="font-bold text-xl sm:text-2xl mb-10 text-slate-900 dark:text-white leading-tight font-heading">
                      {currentWeek.quiz[currentQuestionIndex].question}
                    </p>
                    <div className="space-y-4">
                      {currentWeek.quiz[currentQuestionIndex].options.map((ans, idx) => (
                        <label key={idx} className={`flex items-start gap-4 p-5 sm:p-6 rounded-xl border-2 cursor-pointer transition-all group ${selectedAnswer === ans ? 'border-brand-500 bg-brand-50/80 dark:bg-brand-900/20 shadow-md' : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${selectedAnswer === ans ? 'border-brand-600 bg-brand-600' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'}`}>
                             {selectedAnswer === ans && <CheckCircle2 size={14} className="text-white" />}
                          </div>
                          <span className={`text-base sm:text-lg font-medium leading-snug ${selectedAnswer === ans ? 'text-brand-900 dark:text-brand-100' : 'text-slate-700 dark:text-slate-300'}`}>{ans}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={handleNextQuestion}
                    disabled={!selectedAnswer}
                    className={`w-full py-5 rounded-xl font-bold transition-all text-lg shadow-lg flex justify-center items-center gap-2 ${selectedAnswer ? "bg-slate-900 dark:bg-brand-600 hover:bg-black dark:hover:bg-brand-700 text-white hover:shadow-xl" : "bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed"}`}
                  >
                    {currentQuestionIndex + 1 === currentWeek.quiz.length ? 'Submit Final Answers' : 'Save & Continue'} <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {stage === 'quiz_results' && currentWeek && (
                <div className="py-16 flex flex-col items-center text-center animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
                  <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 border-8 border-white shadow-2xl ${score >= passingScore ? 'bg-green-100 dark:bg-green-900/30 text-green-500' : 'bg-red-100 dark:bg-red-900/30 text-red-500'}`}>
                    {score >= passingScore ? <CheckCircle2 size={64} /> : <XCircle size={64} />}
                  </div>
                  
                  <h3 className="text-5xl font-bold font-heading text-slate-900 dark:text-white mb-4">
                    {score >= passingScore ? 'Assessment Passed!' : 'Assessment Failed'}
                  </h3>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6 rounded-2xl w-full mb-8 shadow-sm">
                     <p className="text-xl font-medium text-slate-600 dark:text-slate-300 mb-2">
                       Your Final Score:
                     </p>
                     <p className={`text-5xl font-black font-heading ${score >= passingScore ? 'text-green-500' : 'text-red-500'}`}>
                       {Math.round((score / currentWeek.quiz.length) * 100)}%
                     </p>
                     <p className="text-sm text-slate-500 mt-4 font-semibold uppercase tracking-wider">
                       ({score * 5} / {simulatedTotalQuestions} Correct Answers)
                     </p>
                  </div>
                  
                  <p className="text-slate-600 dark:text-slate-400 mb-10 text-lg leading-relaxed">
                    {score >= passingScore 
                      ? "Outstanding work! You successfully navigated a highly difficult technical assessment based on the materials."
                      : `You need at least 80% to pass this rigorous assessment. Please review the videos and deep-dive reading materials thoroughly and try again.`}
                  </p>
                  
                  {score >= passingScore ? (
                    <button 
                      onClick={() => {
                        if (currentWeekIndex + 1 >= activeCourse.weeks.length) {
                          setStage('success');
                        } else {
                          setCurrentWeekIndex(prev => prev + 1);
                          setStage('overview');
                        }
                      }}
                      className="w-full bg-slate-900 dark:bg-brand-600 hover:bg-black dark:hover:bg-brand-700 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-xl text-xl flex items-center justify-center gap-3"
                    >
                      {currentWeekIndex + 1 >= activeCourse.weeks.length ? 'Complete Certification' : 'Continue to Next Module'} <ArrowRight size={24}/>
                    </button>
                  ) : (
                    <div className="flex flex-col sm:flex-row gap-4 w-full">
                      <button 
                        onClick={() => { setStage('learning'); setActiveVideoIndex(0); }}
                        className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold py-4 px-6 rounded-xl transition-all text-lg"
                      >
                        Review Material
                      </button>
                      <button 
                        onClick={() => {
                          setCurrentQuestionIndex(0);
                          setScore(0);
                          setSelectedAnswer(null);
                          setQuizFinished(false);
                          setStage('quiz');
                        }}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md text-lg"
                      >
                        Retake Assessment
                      </button>
                    </div>
                  )}
                </div>
              )}

              {stage === 'success' && (
                <div className="py-16 flex flex-col items-center text-center animate-in zoom-in-95 duration-500 max-w-2xl mx-auto">
                  <div className="w-40 h-40 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 border-8 border-white shadow-2xl relative">
                    <div className="absolute inset-0 rounded-full border-4 border-green-400/50 animate-ping"></div>
                    <Award size={80} className="text-white relative z-10" />
                  </div>
                  <h3 className="text-5xl font-black font-heading text-slate-900 dark:text-white mb-6">Certification Earned!</h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-12 text-xl leading-relaxed">
                    Incredible work! You passed the rigorous weekly assessments and successfully completed the elite <strong>{activeCourse.title}</strong> path.
                  </p>
                  <button 
                    onClick={handleClaimCertificate}
                    className="w-full bg-gradient-to-r from-slate-900 to-slate-800 dark:from-brand-600 dark:to-brand-500 hover:from-black hover:to-slate-900 text-white font-bold py-5 px-8 rounded-2xl transition-all shadow-2xl text-2xl flex items-center justify-center gap-4 hover:scale-[1.02]"
                  >
                    <Award size={28} /> Issue My Certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
