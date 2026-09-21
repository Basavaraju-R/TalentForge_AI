import { useState, useRef, useEffect } from 'react'
import { Bot, Mic, Send, Camera, CameraOff, Timer, Code2, User, Loader2, RotateCcw, Square, Play, ShieldAlert, Award, AlertTriangle } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { saveInterview } from '../api.js'

// Dynamic question generator based on difficulty
const questionBanks = {
  basic: {
    behavioral: [
      "What are your primary technical skills?",
      "Can you describe a time you worked successfully in a team?",
      "What motivates you to learn new technologies?"
    ],
    technical: [
      "What is the difference between let, const, and var in JavaScript?",
      "Can you explain the basic concept of an API?",
      "What is version control and why is it useful?"
    ],
    gk: [
      "What does 'cloud computing' mean to you?",
      "How is Artificial Intelligence currently impacting software development?"
    ],
    aptitude: [
      "If a project takes 3 devs 4 days to complete, how long would it take 6 devs?",
      "Describe how you would break down a complex problem into smaller parts."
    ]
  },
  intermediate: {
    behavioral: [
      "How do you handle disagreements with a team member on a technical decision?",
      "Describe a time you had to learn a new framework very quickly.",
      "What is your approach to managing tight deadlines?"
    ],
    technical: [
      "How do you handle state management in a medium-to-large React application?",
      "Can you explain the differences between SQL and NoSQL databases?",
      "Describe how a RESTful API differs from GraphQL."
    ],
    gk: [
      "What are the key benefits of microservices architecture over monoliths?",
      "How does containerization (like Docker) improve the deployment process?"
    ],
    aptitude: [
      "How would you troubleshoot an issue where an application works locally but fails in production?",
      "If you have a slow-running SQL query, what steps would you take to optimize it?"
    ]
  },
  advanced: {
    behavioral: [
      "Describe a time you optimized a highly scaled system.",
      "How do you mentor junior developers and advocate for best practices?",
      "Tell me about a time a critical system failed under your watch. How did you handle it?"
    ],
    technical: [
      "How would you implement a rate limiter algorithm?",
      "Explain how you would design a distributed caching layer.",
      "What are the trade-offs of using Event Sourcing in a distributed system?"
    ],
    gk: [
      "How do Kubernetes and Service Meshes interact in a cloud-native environment?",
      "What are the security implications of serverless architectures?"
    ],
    aptitude: [
      "Design a scalable notification system that can handle 1 million push notifications per minute.",
      "How would you ensure data consistency across multiple microservices without distributed transactions?"
    ]
  }
};

const transitionPhrases = [
  "That makes a lot of sense.",
  "Interesting perspective.",
  "I see. That's a solid approach.",
  "Great answer.",
  "Thank you for sharing that.",
  "Understood. Let's pivot to something else."
];

const pushbackPhrases = [
  "Could you elaborate a bit more on that?",
  "Can you provide a specific example to illustrate your point?",
  "That's a bit brief. Could you expand on your reasoning?",
  "I'd love to hear more detail about how you achieved that."
];

const initialStaticScores = [
  { label: 'Communication', value: 0 },
  { label: 'Technical Knowledge', value: 0 },
  { label: 'Confidence', value: 0 },
  { label: 'Problem Solving', value: 0 },
  { label: 'Fluency', value: 0 },
]

export default function MockInterview() {
  const [difficulty, setDifficulty] = useState('') // '', 'basic', 'intermediate', 'advanced'
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [finished, setFinished] = useState(false)
  const [mode, setMode] = useState('text')
  
  // New Interactive States
  const [hasStarted, setHasStarted] = useState(false)
  const [cameraOn, setCameraOn] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [responseCount, setResponseCount] = useState(0)
  const [violation, setViolation] = useState(false)
  const [certificateAwarded, setCertificateAwarded] = useState(false)
  
  // Timer State
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  
  // Speech Recognition State
  const [recognition, setRecognition] = useState(null)
  
  // Analysis States
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analyzingProgress, setAnalyzingProgress] = useState(0)
  const [overallRating, setOverallRating] = useState(0)
  const [dynamicScores, setDynamicScores] = useState(initialStaticScores)
  
  const chatEndRef = useRef(null)
  const videoRef = useRef(null)

  // Tab switching / cheating detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && hasStarted && !finished && !isAnalyzing) {
        // User switched tabs while interview is active!
        handleViolation("Tab switching is strictly prohibited during the interview.")
      }
    }
    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange)
  }, [hasStarted, finished, isAnalyzing])

  const handleViolation = (reason) => {
    setViolation(true)
    setFinished(true)
    setCameraOn(false)
    setIsRecording(false)
    setOverallRating(0)
    setDynamicScores([
      { label: 'Communication', value: 0 },
      { label: 'Technical Knowledge', value: 0 },
      { label: 'Confidence', value: 0 },
      { label: 'Problem Solving', value: 0 },
      { label: 'Fluency', value: 0 },
    ])
    alert(`INTERVIEW TERMINATED: ${reason}`)
  }

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRec) {
      const rec = new SpeechRec()
      rec.continuous = true
      rec.interimResults = true
      
      rec.onresult = (event) => {
        let currentTranscript = ''
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript
        }
        setInput(currentTranscript)
      }
      setRecognition(rec)
    }
  }, [])

  // Camera Effect - Mandatory for interview
  useEffect(() => {
    let localStream = null;
    let isCancelled = false;
    
    if (cameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(mediaStream => {
          if (isCancelled) {
            mediaStream.getTracks().forEach(track => track.stop());
            return;
          }
          localStream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
          }
        })
        .catch(err => {
          console.error("Camera error:", err)
          if (hasStarted) {
            handleViolation("Camera access is mandatory for proctoring. Access denied.")
          }
        });
    }

    return () => {
      isCancelled = true;
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [cameraOn, hasStarted]);

  // Timer Effect
  useEffect(() => {
    let interval = null
    if (hasStarted && !finished && !isAnalyzing && !violation) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [hasStarted, finished, isAnalyzing, violation])

  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60)
    const secs = totalSeconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const selectDifficulty = (level) => {
    setDifficulty(level)
    const firstQ = questionBanks[level].behavioral[0];
    setMessages([{ from: 'ai', text: `Welcome to your ${level} Mock Interview. Let's start with a behavioral question: ${firstQ}` }])
  }

  const startInterview = () => {
    if (!hasStarted) {
      setHasStarted(true)
      setCameraOn(true)
    }
  }

  const send = (overrideText = null) => {
    startInterview()
    const textToSend = overrideText !== null ? overrideText : input
    if (!textToSend.trim()) return
    
    const next = [...messages, { from: 'user', text: textToSend }]
    setMessages(next)
    if (overrideText === null) setInput('')
    
    setIsTyping(true)
    
    setTimeout(() => {
      setIsTyping(false)
      
      const wordCount = textToSend.trim().split(/\s+/).length;
      
      if (wordCount < 15 && responseCount < 6) {
        // User gave a short answer. Push back.
        const pushback = pushbackPhrases[Math.floor(Math.random() * pushbackPhrases.length)];
        setMessages([...next, { from: 'ai', text: pushback }]);
      } else {
        // Good answer or max pushbacks. Move to next category.
        let aiText = "";
        
        if (responseCount >= 6) {
           aiText = "Thank you for sharing that. I think we have enough information for today.";
           // We could auto-end here or wait for them to click end
        } else {
           const transition = transitionPhrases[Math.floor(Math.random() * transitionPhrases.length)];
           
           // Rotate categories: Behavioral -> Technical -> GK -> Aptitude
           const categories = ['behavioral', 'technical', 'gk', 'aptitude'];
           const category = categories[(responseCount + 1) % categories.length];
           const bank = questionBanks[difficulty || 'basic'][category];
           
           // Pick a random question from that category
           const question = bank[Math.floor(Math.random() * bank.length)];
           
           aiText = `${transition} Now for a ${category} question: ${question}`;
           
           setResponseCount(prev => prev + 1)
        }
        
        setMessages([...next, { from: 'ai', text: aiText }])
      }
    }, 1500)
  }

  const toggleRecording = () => {
    startInterview()
    if (isRecording) {
      setIsRecording(false)
      if (recognition) recognition.stop()
      
      setTimeout(() => {
        send(null) 
      }, 400)
    } else {
      setIsRecording(true)
      setInput('')
      if (recognition) {
        recognition.start()
      } else {
        setInput("My browser doesn't support speech recognition, so here is a fallback text!")
      }
    }
  }

  const handleEndInterview = () => {
    setCameraOn(false) 
    if (isRecording && recognition) {
      recognition.stop()
      setIsRecording(false)
    }
    
    setIsAnalyzing(true)
    setAnalyzingProgress(0)
    
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 5 
      if (progress >= 100) {
        progress = 100
        clearInterval(interval)
        
        const baseScore = Math.min(45 + (responseCount * 8), 92)
        const generateScore = () => Math.min(Math.max(baseScore + Math.floor(Math.random() * 14 - 7), 30), 99)
        
        const newScores = [
          { label: 'Communication', value: generateScore() },
          { label: 'Technical Knowledge', value: generateScore() },
          { label: 'Confidence', value: generateScore() },
          { label: 'Problem Solving', value: generateScore() },
          { label: 'Fluency', value: generateScore() },
        ]
        
        const avgScore = Math.floor(newScores.reduce((acc, s) => acc + s.value, 0) / newScores.length)
        
        setDynamicScores(newScores)
        setOverallRating(avgScore)
        
        // Award certificate logic
        if (avgScore >= 70 && difficulty === 'advanced') {
          setCertificateAwarded(true)
          const existingCerts = JSON.parse(localStorage.getItem('earned_certificates') || '[]');
          existingCerts.push({
            title: 'Advanced AI Interview Completion',
            duration: 'Completed ' + new Date().toLocaleDateString(),
            image: '/sql_cert.png' 
          });
          localStorage.setItem('earned_certificates', JSON.stringify(existingCerts));
        }

        // Save to Database
        const feedbackJson = JSON.stringify({
          scores: newScores,
          difficulty: difficulty,
          responseCount: responseCount
        });

        saveInterview({
          student: 1, // Default test student
          scheduled_at: new Date().toISOString(),
          feedback: feedbackJson,
          score: avgScore
        }).catch(console.error);

        setTimeout(() => {
          setIsAnalyzing(false)
          setFinished(true)
        }, 600)
      }
      setAnalyzingProgress(progress)
    }, 1000)
  }

  const resetInterview = () => {
    setDifficulty('')
    setMessages([])
    setFinished(false)
    setIsAnalyzing(false)
    setResponseCount(0)
    setInput('')
    setElapsedSeconds(0)
    setHasStarted(false)
    setCameraOn(false)
    setAnalyzingProgress(0)
    setViolation(false)
    setCertificateAwarded(false)
  }

  if (!difficulty) {
    return (
      <DashboardShell items={studentNav} roleLabel="Student" title="AI Mock Interview" avatarSeed="JS">
        <div className="card max-w-2xl mx-auto text-center py-12 animate-fade-in">
          <div className="h-16 w-16 bg-primary-500/10 text-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={32} />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-4">Proctored AI Interview</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-lg mx-auto">
            This interview is proctored. Your camera must remain on. Copy/pasting and tab switching are strictly prohibited and will result in immediate termination. 
            Choose your difficulty level to begin.
          </p>
          <div className="grid sm:grid-cols-3 gap-4">
            <button onClick={() => selectDifficulty('basic')} className="card hover:border-success transition-colors cursor-pointer text-left">
              <h3 className="font-semibold text-success mb-2">Basic</h3>
              <p className="text-xs text-slate-500">Foundational questions to test your core understanding.</p>
            </button>
            <button onClick={() => selectDifficulty('intermediate')} className="card hover:border-warning transition-colors cursor-pointer text-left">
              <h3 className="font-semibold text-warning mb-2">Intermediate</h3>
              <p className="text-xs text-slate-500">Scenario-based questions requiring practical experience.</p>
            </button>
            <button onClick={() => selectDifficulty('advanced')} className="card hover:border-danger transition-colors cursor-pointer text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-danger text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">CERTIFICATE</div>
              <h3 className="font-semibold text-danger mb-2">Advanced</h3>
              <p className="text-xs text-slate-500">Deep technical dives. Passing awards a verified certificate.</p>
            </button>
          </div>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="AI Mock Interview" avatarSeed="JS">
      {!finished && !isAnalyzing ? (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 card flex flex-col h-[560px]">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl2 bg-brand-gradient flex items-center justify-center text-white"><Bot size={18} /></div>
                <div>
                  <p className="font-semibold text-sm">AI Interviewer ({difficulty})</p>
                  <p className="text-xs text-success flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> Live Proctored Session</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <Timer size={15} /> {formatTime(elapsedSeconds)}
                </div>
                {!hasStarted && (
                  <button onClick={startInterview} className="flex items-center gap-1 text-xs font-semibold bg-success/10 text-success px-2.5 py-1 rounded-lg hover:bg-success/20 transition-colors">
                    <Play size={10} fill="currentColor" /> Start
                  </button>
                )}
                {hasStarted && (
                  <button onClick={handleEndInterview} className="flex items-center gap-1 text-xs font-semibold bg-danger/10 text-danger px-2.5 py-1 rounded-lg hover:bg-danger/20 transition-colors">
                    <Square size={10} fill="currentColor" /> Stop
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-2 relative">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.from === 'user' ? 'flex-row-reverse' : ''} animate-fade-in`}>
                  <div className={`h-8 w-8 rounded-xl2 flex items-center justify-center shrink-0 ${m.from === 'ai' ? 'bg-brand-gradient text-white' : 'bg-slate-200 dark:bg-white/10'}`}>
                    {m.from === 'ai' ? <Bot size={15} /> : <User size={15} />}
                  </div>
                  <div className={`max-w-[75%] rounded-xl2 px-4 py-2.5 text-sm ${m.from === 'ai' ? 'bg-primary-500/10 text-slate-800 dark:text-slate-200' : 'bg-brand-gradient text-white'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="h-8 w-8 rounded-xl2 flex items-center justify-center shrink-0 bg-brand-gradient text-white">
                    <Bot size={15} />
                  </div>
                  <div className="max-w-[75%] rounded-xl2 px-4 py-3 bg-primary-500/10 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-500/60 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
              
              {/* Real Picture-in-Picture Webcam */}
              {cameraOn && (
                <div className="sticky bottom-2 float-right mr-2 mt-4 w-32 h-24 bg-slate-800 rounded-lg overflow-hidden border-2 border-slate-700/50 shadow-lg z-10 flex items-center justify-center animate-fade-in">
                  <div className="w-full h-full relative">
                    <video 
                      ref={videoRef}
                      autoPlay 
                      playsInline 
                      muted 
                      className="absolute inset-0 w-full h-full object-cover transform -scale-x-100 bg-gradient-to-br from-slate-700 to-slate-900"
                    />
                    <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-danger animate-pulse" />
                    <span className="absolute bottom-1 left-2 text-[10px] text-white font-medium tracking-wide drop-shadow-md">Proctored</span>
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <button onClick={() => setMode('text')} className={`text-xs font-semibold px-3 py-1.5 rounded-xl2 transition-colors ${mode === 'text' ? 'bg-brand-gradient text-white shadow-soft' : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20'}`}>
                  Text
                </button>
                <button onClick={() => setMode('voice')} className={`text-xs font-semibold px-3 py-1.5 rounded-xl2 flex items-center gap-1 transition-colors ${mode === 'voice' ? 'bg-brand-gradient text-white shadow-soft' : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20'}`}>
                  <Mic size={12} /> Voice
                </button>
              </div>
              <div className="flex gap-2">
                {mode === 'voice' ? (
                  <div className="flex-1 flex flex-col gap-2">
                    {isRecording && input && (
                      <div className="text-xs text-slate-500 italic px-2 animate-pulse">Transcribing: {input}</div>
                    )}
                    <button 
                      onClick={toggleRecording}
                      className={`w-full rounded-xl2 flex items-center justify-center gap-2 font-semibold text-sm py-2 transition-colors ${isRecording ? 'bg-danger/10 text-danger animate-pulse border border-danger/20' : 'bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20'}`}
                    >
                      {isRecording ? <><div className="w-2 h-2 rounded-full bg-danger" /> Recording... Click to Stop & Send</> : <><Mic size={16} /> Tap to Speak</>}
                    </button>
                  </div>
                ) : (
                  <>
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && send(null)}
                      onFocus={startInterview}
                      onPaste={(e) => {
                        e.preventDefault()
                        alert("PROCTORING ALERT: Copying and pasting is not allowed during the interview.")
                      }}
                      placeholder="Type your answer…"
                      className="input-field flex-1"
                      disabled={isTyping}
                    />
                    <button onClick={() => send(null)} disabled={isTyping} className="btn-primary !px-4"><Send size={16} /></button>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="card">
              <h3 className="font-heading font-semibold mb-3 flex items-center gap-2"><Code2 size={16} className="text-primary-500" /> Question Focus</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Behavioral</span><span className="font-medium">{Math.min(responseCount + 1, 3)} asked</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Technical</span><span className="font-medium">{Math.max(0, Math.min(responseCount + 1 - 3, 3))} asked</span></div>
                <div className="flex justify-between"><span className="text-slate-500 dark:text-slate-400">Coding</span><span className="font-medium">{1 - Math.max(0, Math.min(responseCount + 1 - 6, 1))} pending</span></div>
              </div>
            </div>
            <div className="card">
              <h3 className="font-heading font-semibold mb-2">Progress</h3>
              <div className="h-2.5 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden mb-2">
                <div className="h-full rounded-full bg-brand-gradient transition-all duration-500" style={{ width: `${Math.min(((responseCount + 1) / 7) * 100, 100)}%` }} />
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Question {Math.min(responseCount + 1, 7)} of 7</p>
            </div>
            <button onClick={handleEndInterview} className="btn-secondary w-full border-danger/30 text-danger hover:bg-danger/10 dark:hover:bg-danger/20">
              End interview & see feedback
            </button>
          </div>
        </div>
      ) : isAnalyzing ? (
        <div className="card h-[500px] flex flex-col items-center justify-center text-center animate-fade-in border-2 border-primary-500/20">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full blur-xl bg-brand-gradient opacity-20 animate-pulse" />
            <Loader2 size={56} className="text-primary-500 animate-spin relative z-10" />
          </div>
          <h2 className="text-2xl font-heading font-bold mb-3 bg-brand-gradient bg-clip-text text-transparent">Analyzing Interview Performance</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-10 max-w-md">
            Our AI is processing your facial expressions, tone of voice, pacing, and the technical depth of your answers...
          </p>
          
          <div className="w-full max-w-sm h-2.5 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
            <div className="h-full bg-brand-gradient transition-all duration-500 ease-out" style={{ width: `${analyzingProgress}%` }} />
          </div>
          <p className="text-xs text-slate-400 font-semibold mt-4">{Math.floor(analyzingProgress)}% Complete</p>
        </div>
      ) : violation ? (
        <div className="card max-w-2xl mx-auto flex flex-col items-center justify-center text-center py-16 animate-fade-in border-2 border-danger/50 bg-danger/5">
          <div className="h-20 w-20 bg-danger/20 text-danger rounded-full flex items-center justify-center mb-6">
            <AlertTriangle size={40} />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4 text-danger">Interview Terminated</h2>
          <p className="text-slate-700 dark:text-slate-300 text-lg mb-8 max-w-md">
            A proctoring violation was detected. Switching tabs or minimizing the application is strictly prohibited during an active interview session.
          </p>
          <button onClick={resetInterview} className="btn-primary">
            Acknowledge & Return
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6 animate-fade-in">
          {certificateAwarded && (
             <div className="lg:col-span-3 card bg-brand-gradient text-white flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-8 animate-rise shadow-xl border border-white/20">
               <div className="flex items-center gap-4">
                 <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                   <Award size={28} className="text-white" />
                 </div>
                 <div>
                   <h3 className="text-xl font-heading font-bold mb-1">Congratulations!</h3>
                   <p className="text-white/80 text-sm">You passed the Advanced Interview and earned a new certificate.</p>
                 </div>
               </div>
               <button onClick={() => window.location.href = '/student/certificates'} className="px-6 py-2 bg-white text-primary-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors shadow-soft whitespace-nowrap">
                 View Certificate
               </button>
             </div>
          )}
          <div className="card lg:col-span-1 flex flex-col items-center justify-center text-center py-8">
            <div className="text-5xl font-heading font-extrabold bg-brand-gradient bg-clip-text text-transparent mb-2">{overallRating}%</div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Overall Rating</p>
            <p className="text-xs text-slate-500 mt-1">Based on {responseCount + 1} responses</p>
            
            <button onClick={resetInterview} className="btn-secondary w-full mt-8">
              <RotateCcw size={16} /> Start New Interview
            </button>
          </div>
          <div className="card lg:col-span-2">
            <h3 className="font-heading font-semibold mb-6 text-lg">Score Breakdown</h3>
            <div className="space-y-5">
              {dynamicScores.map((s, idx) => (
                <div key={s.label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                    <span className="font-bold text-slate-900 dark:text-white">{s.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100 dark:bg-white/5 overflow-hidden">
                    <div className="h-full rounded-full bg-brand-gradient slide-up" style={{ width: `${s.value}%`, animationDelay: `${idx * 100}ms` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card border-t-4 border-t-success">
            <h3 className="font-heading font-semibold mb-4 text-success flex items-center gap-2">Strengths</h3>
            <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2"><span className="text-success mt-0.5">&bull;</span> Clear, structured storytelling (STAR method)</li>
              <li className="flex items-start gap-2"><span className="text-success mt-0.5">&bull;</span> Strong fluency and pacing in communication</li>
            </ul>
          </div>
          <div className="card border-t-4 border-t-warning">
            <h3 className="font-heading font-semibold mb-4 text-warning flex items-center gap-2">Weaknesses</h3>
            <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2"><span className="text-warning mt-0.5">&bull;</span> Answers lacked measurable outcomes</li>
              <li className="flex items-start gap-2"><span className="text-warning mt-0.5">&bull;</span> Hesitation on the system design question</li>
            </ul>
          </div>
          <div className="card border-t-4 border-t-primary-500">
            <h3 className="font-heading font-semibold mb-4 text-primary-500 flex items-center gap-2">AI Suggestions</h3>
            <ul className="text-sm space-y-3 text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">&bull;</span> Practice quantifying impact before your next round</li>
              <li className="flex items-start gap-2"><span className="text-primary-500 mt-0.5">&bull;</span> Review system design fundamentals this week</li>
            </ul>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
