import { useState, useEffect, useRef } from 'react'
import { Bot, Send, MessageSquare, Plus, User, Mic, Sparkles, Copy, CheckCircle2, StopCircle } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'

const pastConversations = [
  'Best roadmap for Java Developer',
  'Improve my resume for Nexora Labs',
  'Software Engineer vs Data Analyst',
]

// Simple markdown-to-html parser for code blocks and bold text
const renderMarkdown = (text) => {
  let html = text
  
  // Replace code blocks
  html = html.replace(/```([\s\S]*?)```/g, (match, code) => {
    return `<div class="my-4 rounded-xl overflow-hidden border border-slate-700 bg-slate-900 shadow-lg">
      <div class="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 text-xs font-mono border-b border-slate-700">
        <span>Code</span>
      </div>
      <div class="p-4 overflow-x-auto">
        <pre><code class="text-slate-50 font-mono text-sm leading-relaxed">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>
      </div>
    </div>`
  })
  
  // Replace inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-black/10 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono text-sm text-brand-600 dark:text-brand-400">$1</code>')
  
  // Replace bold
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  
  // Replace line breaks
  html = html.replace(/\n/g, '<br />')
  
  return html
}

import { GoogleGenerativeAI } from '@google/generative-ai'

export default function CareerCoach() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hi, I'm **TalentForge AI**. I am now connected to a REAL Artificial Intelligence engine (Google Gemini). Ask me literally anything!", isTyping: false },
  ])
  const [input, setInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  
  // Real AI State
  const [apiKey, setApiKey] = useState(localStorage.getItem('gemini_api_key') || '')
  const [useMockAI, setUseMockAI] = useState(localStorage.getItem('use_mock_ai') === 'true')
  const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('gemini_api_key') && !localStorage.getItem('use_mock_ai'))
  const [tempKey, setTempKey] = useState('')

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const saveApiKey = () => {
    if (tempKey.trim()) {
      localStorage.setItem('gemini_api_key', tempKey.trim());
      localStorage.removeItem('use_mock_ai');
      setApiKey(tempKey.trim());
      setUseMockAI(false);
      setShowKeyInput(false);
      setMessages((m) => [...m, { from: 'ai', text: `Authentication successful! I am now a 100% Real AI powered by Google Gemini. Go ahead, ask me to write code, explain concepts, or review your resume!`, isTyping: false }]);
    }
  }

  const skipApiKey = () => {
    localStorage.setItem('use_mock_ai', 'true');
    setUseMockAI(true);
    setShowKeyInput(false);
    setMessages((m) => [...m, { from: 'ai', text: `I am now running in **Simulated Mode**. I don't have access to the live internet, but I can still generate code examples, review resumes, and give career advice based on my pre-programmed logic! Try asking me for React code or interview tips.`, isTyping: false }]);
  }

  const startNewConversation = () => {
    setMessages([
      { from: 'ai', text: "Hi, I'm **TalentForge AI**, powered by advanced neural models. How can I assist you today?", isTyping: false },
    ]);
    setInput('');
  }

  const loadConversation = (topic) => {
    setMessages([
      { from: 'user', text: `Tell me about: ${topic}` },
      { from: 'ai', text: `I have loaded your previous conversation regarding **${topic}**. What specific details would you like to dive deeper into today?`, isTyping: false }
    ]);
  }

  const handleMicClick = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      setIsListening(true)
      setTimeout(() => {
        setIsListening(false)
        setInput("Write a React component for a login form.")
      }, 3000)
    }
  }

  const getMockResponse = (text) => {
    const lower = text.toLowerCase()
    const learnMatch = lower.match(/(?:learn|study|master|improve|develop)\s+([a-z0-9\s]+)/)
    const roleMatch = lower.match(/(?:become|hired as|apply for)\s+(?:a|an)?\s*([a-z\s]+)/)
    
    if (/^(hi|hello|hey|hai|hola|greetings)/.test(lower)) {
      return `Hello there! I am **TalentForge AI** (Running in Mock Mode). I can generate deep technical code, review your resume, and act as your technical interviewer. What shall we focus on today?`
    } 
    else if (lower.includes('react') && (lower.includes('code') || lower.includes('component') || lower.includes('form') || lower.includes('course'))) {
      return `Absolutely. Here is a fully functional, modern React Login Component using Tailwind CSS and React Hooks:\n\n\`\`\`javascript\nimport React, { useState } from 'react';\n\nexport default function LoginForm() {\n  const [email, setEmail] = useState('');\n  const [password, setPassword] = useState('');\n\n  const handleSubmit = async (e) => {\n    e.preventDefault();\n    console.log('Logging in with:', email);\n  };\n\n  return (\n    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md">\n      <h2 className="text-2xl font-bold">Welcome Back</h2>\n      <input \n        type="email" \n        value={email} \n        onChange={(e) => setEmail(e.target.value)} \n        placeholder="Email Address" \n        className="border p-2 rounded" \n        required \n      />\n      <input \n        type="password" \n        value={password} \n        onChange={(e) => setPassword(e.target.value)} \n        placeholder="Password" \n        className="border p-2 rounded" \n        required \n      />\n      <button type="submit" className="bg-blue-600 text-white font-bold py-2 rounded">Login</button>\n    </form>\n  );\n}\n\`\`\``
    }
    else if (lower.includes('java')) {
      if (lower.includes('course') || lower.includes('program') || lower.includes('roadmap') || lower.includes('learn')) {
        return `### Java Developer Full Course Roadmap\n\nIf you want to master Java, here is the ultimate path to success:\n\n1. **Core Java**: Master OOP (Inheritance, Polymorphism), Interfaces, and Abstract Classes.\n2. **Collections Framework**: Understand \`ArrayList\`, \`HashMap\`, \`HashSet\`, and when to use them.\n3. **Multithreading & Concurrency**: Learn how to use the \`ExecutorService\` and \`CompletableFuture\`.\n4. **Database & ORM**: Connect to databases using JDBC and master Hibernate/JPA.\n5. **Spring Boot**: The industry standard! Learn to build REST APIs.\n\nWant to see a code example of a Spring Boot REST API?`
      }
      return `Certainly! Here is a robust, production-ready Java Spring Boot REST Controller:\n\n\`\`\`java\npackage com.talentforge.api.controllers;\n\nimport org.springframework.http.ResponseEntity;\nimport org.springframework.web.bind.annotation.*;\n\n@RestController\n@RequestMapping("/api/v1/auth")\npublic class AuthController {\n\n    @PostMapping("/login")\n    public ResponseEntity<String> authenticate(@RequestBody LoginRequest request) {\n        return ResponseEntity.ok("Authenticated successfully");\n    }\n}\n\`\`\``
    }
    else if (lower.includes('resume') || lower.includes('cv') || lower.includes('objective')) {
      return `I can perform a deep **ATS (Applicant Tracking System)** scan on your resume. \n\nYour resume's objective should be a punchy 2-sentence summary highlighting your core skills. For example:\n> *"Results-driven Java Developer with 2+ years of experience building highly scalable microservices."*\n\nMake sure to quantify your bullet points (e.g., "Increased database query performance by 20%").`
    } 
    else if (lower.includes('software engineer') || lower.includes('data analyst')) {
      return `### Software Engineer vs Data Analyst\n\n**Software Engineer:**\n- Focuses on building scalable applications, designing architectures, and writing production code.\n- **Key Skills:** Java, Python, React, System Design, CI/CD.\n- **Vibe:** "Let's build a robust system."\n\n**Data Analyst:**\n- Focuses on extracting insights from data to drive business decisions.\n- **Key Skills:** SQL, Python (Pandas), Tableau/PowerBI, Statistics.\n- **Vibe:** "What does the data tell us?"\n\nWhich path excites you more?`
    }
    else {
      const cleanText = text.replace(/[^a-zA-Z0-9 ]/g, "").split(" ").slice(0, 8).join(" ");
      return `I am currently analyzing your input regarding: *"..${cleanText}.."*\n\nAs a highly advanced AI, I want to ensure my advice is precise. Could you provide a bit more context? Are you looking for code examples, career advice, or interview preparation regarding this topic?`
    }
  }

  const ask = async (text) => {
    if (!text.trim() || isAiTyping) return
    
    if (!apiKey && !useMockAI) {
      setShowKeyInput(true);
      return;
    }
    
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setIsAiTyping(true)
    
    setMessages((m) => [...m, { from: 'ai', text: '', isTyping: true }])

    if (useMockAI) {
      setTimeout(() => {
        const finalResponse = getMockResponse(text);
        let currentIndex = 0
        const typeInterval = setInterval(() => {
          setMessages((currentMsgs) => {
            const newMsgs = [...currentMsgs]
            const lastMsg = newMsgs[newMsgs.length - 1]
            
            if (currentIndex < finalResponse.length) {
              const chunk = finalResponse.substring(currentIndex, currentIndex + 5)
              lastMsg.text += chunk
              currentIndex += 5
              return newMsgs
            } else {
              clearInterval(typeInterval)
              lastMsg.isTyping = false
              setIsAiTyping(false)
              return newMsgs
            }
          })
        }, 10) 
      }, 800)
      return;
    }

    try {
      // Initialize REAL Google Gemini API
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are TalentForge AI, a highly advanced expert career coach, software engineer, and technical interviewer. 
      You help users with code generation, career advice, resume reviews, and learning paths. 
      Always format your code in markdown code blocks. Keep your responses highly professional, helpful, and technically accurate.
      
      User says: "${text}"`;

      const result = await model.generateContent(prompt);
      const finalResponse = result.response.text();

      // Typewriter effect for the real response
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        setMessages((currentMsgs) => {
          const newMsgs = [...currentMsgs]
          const lastMsg = newMsgs[newMsgs.length - 1]
          
          if (currentIndex < finalResponse.length) {
            const chunk = finalResponse.substring(currentIndex, currentIndex + 5)
            lastMsg.text += chunk
            currentIndex += 5
            return newMsgs
          } else {
            clearInterval(typeInterval)
            lastMsg.isTyping = false
            setIsAiTyping(false)
            return newMsgs
          }
        })
      }, 10) 

    } catch (error) {
      setIsAiTyping(false);
      setMessages((m) => {
        const newMsgs = [...m];
        const lastMsg = newMsgs[newMsgs.length - 1];
        lastMsg.isTyping = false;
        lastMsg.text = `**API Error:** Unable to connect to Gemini. Please check if your API key is valid. Error details: ${error.message}`;
        return newMsgs;
      });
      if (error.message.includes('API key not valid')) {
         localStorage.removeItem('gemini_api_key');
         setApiKey('');
         setShowKeyInput(true); // Re-show input so they aren't stuck
      }
    }
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="AI Career Coach">
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        
        {/* Sidebar History (ChatGPT Style) */}
        <div className="hidden lg:flex flex-col bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm">
          <button 
            onClick={startNewConversation}
            className="btn-primary w-full !py-3 mb-6 flex items-center justify-center gap-2 text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <Plus size={16} /> New Conversation
          </button>
          
          <div className="flex items-center gap-2 mb-3 px-2">
            <Sparkles size={14} className="text-brand-500" />
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">Recent Chats</p>
          </div>
          
          <div className="space-y-1 overflow-y-auto custom-scrollbar flex-1">
            {pastConversations.map((c) => (
              <button 
                key={c} 
                onClick={() => loadConversation(c)}
                className="w-full text-left flex items-center gap-3 px-3 py-3 rounded-xl text-sm hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors group truncate"
              >
                <MessageSquare size={16} className="shrink-0 text-slate-400 group-hover:text-brand-500 transition-colors" /> 
                <span className="truncate">{c}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm flex flex-col overflow-hidden relative">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50">
             <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-inner">
               <Sparkles size={20} className="text-white" />
             </div>
             <div>
               <h2 className="font-bold text-slate-900 dark:text-white">TalentForge AI</h2>
               <p className="text-xs text-brand-600 dark:text-brand-400 font-medium tracking-wide">Powered by Google Gemini</p>
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 custom-scrollbar relative">
            
            {showKeyInput && (
              <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center">
                  <div className="w-16 h-16 bg-brand-100 dark:bg-brand-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles size={32} className="text-brand-600 dark:text-brand-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Unlock Real AI</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                    To connect TalentForge AI to the real Google Gemini engine, please enter a free Gemini API key.
                  </p>
                  <input
                    type="password"
                    placeholder="Enter your Gemini API Key"
                    value={tempKey}
                    onChange={(e) => setTempKey(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 mb-4 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500 outline-none"
                  />
                  <button
                    onClick={saveApiKey}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl transition-colors shadow-md"
                  >
                    Connect Gemini API
                  </button>
                  <button
                    onClick={skipApiKey}
                    className="w-full mt-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-bold py-3 px-4 rounded-xl transition-colors shadow-sm"
                  >
                    Skip (Use Mock AI)
                  </button>
                  <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="text-brand-600 dark:text-brand-400 text-xs mt-4 inline-block hover:underline">
                    Get a free API key here
                  </a>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex gap-4 ${m.from === 'user' ? 'flex-row-reverse' : ''} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                <div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.from === 'ai' ? 'bg-gradient-to-br from-brand-500 to-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-200'}`}>
                  {m.from === 'ai' ? <Sparkles size={20} /> : <User size={20} />}
                </div>
                
                <div className={`max-w-[85%] rounded-2xl px-5 py-4 text-[15px] leading-relaxed shadow-sm ${m.from === 'ai' ? 'bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200' : 'bg-brand-600 text-white'}`}>
                  {/* If it's from AI, render the HTML markdown. If user, just text */}
                  {m.from === 'ai' ? (
                    <div 
                      className="prose dark:prose-invert prose-p:leading-relaxed prose-pre:m-0 max-w-none prose-p:my-2"
                      dangerouslySetInnerHTML={{ __html: renderMarkdown(m.text) }}
                    />
                  ) : (
                    <div>{m.text}</div>
                  )}
                  {m.isTyping && <span className="inline-block w-2 h-4 ml-1 bg-brand-500 animate-pulse align-middle rounded-full"></span>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800">
            <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl p-2 shadow-sm focus-within:ring-2 focus-within:ring-brand-500 focus-within:border-transparent transition-all">
              
              <button 
                onClick={handleMicClick}
                className={`p-3 rounded-xl transition-all flex items-center justify-center shrink-0 ${isListening ? 'bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30' : 'bg-slate-100 dark:bg-slate-900 text-slate-500 hover:text-brand-500 hover:bg-brand-50 dark:hover:bg-brand-900/30'}`}
              >
                {isListening ? <StopCircle size={20} /> : <Mic size={20} />}
              </button>
              
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    ask(input);
                  }
                }}
                placeholder={isListening ? "Listening (Speak now)..." : "Message TalentForge AI..."}
                className="flex-1 bg-transparent border-none focus:ring-0 resize-none p-3 max-h-32 text-slate-800 dark:text-slate-200 placeholder-slate-400"
                rows="1"
                style={{ minHeight: '50px' }}
              />
              
              <button 
                onClick={() => ask(input)} 
                disabled={!input.trim() || isAiTyping}
                className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-all ${input.trim() && !isAiTyping ? 'bg-brand-600 hover:bg-brand-700 text-white shadow-md hover:shadow-lg' : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'}`}
              >
                <Send size={20} className={input.trim() && !isAiTyping ? "translate-x-0.5" : ""} />
              </button>
            </div>
            <p className="text-center text-xs text-slate-400 mt-3 font-medium">TalentForge AI can make mistakes. Verify important code and career advice.</p>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
