import { useState } from 'react'
import { Bot, Send, MessageSquare, Plus, User } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { coachSuggestions } from '../data/mockData.js'

const pastConversations = [
  'Best roadmap for Java Developer',
  'Improve my resume for Nexora Labs',
  'Software Engineer vs Data Analyst',
]

export default function CareerCoach() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Hi, I'm your AI Career Coach. Ask me anything about your career path, resume, or interview prep.", isTyping: false },
  ])
  const [input, setInput] = useState('')
  const [isAiTyping, setIsAiTyping] = useState(false)

  const ask = (text) => {
    if (!text.trim() || isAiTyping) return
    
    // Add user message immediately
    setMessages((m) => [...m, { from: 'user', text }])
    setInput('')
    setIsAiTyping(true)
    
    // Add an empty AI message that is "typing"
    setMessages((m) => [...m, { from: 'ai', text: '', isTyping: true }])

    setTimeout(() => {
      // Analyze user input for a "Real AI" feel
      const lower = text.toLowerCase()
      let finalResponse = ""
      
      // Extract subject using regex
      const learnMatch = lower.match(/(?:learn|study|master|improve|develop)\s+([a-z0-9\s]+)/)
      const roleMatch = lower.match(/(?:become|hired as|apply for)\s+(?:a|an)?\s*([a-z\s]+)/)
      
      if (lower.includes('which career fits me') || lower.includes('what career') || lower.includes('career advice')) {
        finalResponse = `Based on your profile data, you have strong foundations in Java and SQL. I highly recommend looking into Backend Engineering or Full Stack Development roles! These roles align perfectly with your technical skills. Would you like me to show you a roadmap to transition into one of these?`
      } else if (learnMatch && learnMatch[1]) {
        const topic = learnMatch[1].trim()
        finalResponse = `Analyzing your request to learn ${topic}... Based on current market trends, ${topic} is highly in demand. I recommend starting with the official documentation, building 2 small portfolio projects, and then optimizing your resume to highlight this new skill. Do you want a specific learning roadmap for ${topic}?`
      } else if (roleMatch && roleMatch[1]) {
        const role = roleMatch[1].trim()
        finalResponse = `So you want to target ${role} roles. I've analyzed recent job postings for ${role}. The top 3 skills you need are strong communication, relevant technical stack mastery, and domain knowledge. Let's start by doing a mock interview specifically for a ${role} position.`
      } else if (lower.includes('tell me about')) {
        finalResponse = `I have access to a vast database of career paths, tech stacks, and company interview processes. Please tell me specifically what you'd like to learn about—for instance, you can ask 'Tell me about Frontend Engineering' or 'Tell me about the Google interview process'.`
      } else if (lower.includes('resume') || lower.includes('cv') || lower.includes('objective')) {
        finalResponse = `Your resume's objective should be a punchy 2-sentence summary highlighting your core skills and the value you bring. For example: "Results-driven Java Developer with experience building scalable backend APIs." Make sure to quantify your bullet points too! Would you like me to scan your full resume?`
      } else if (lower.includes('interview')) {
        finalResponse = `Interview preparation is key. I recommend using the STAR method (Situation, Task, Action, Result). Since you are preparing for upcoming interviews, I can generate a list of the 10 most common questions for your field. Shall we start a mock session?`
      } else if (lower.includes('skill') || lower.includes('develop') || lower.includes('learn')) {
        finalResponse = `To develop your skills effectively, consistency is key! Based on your current ATS score, I highly recommend focusing on Spring Boot and React next. These specific skills will immediately unlock the highest number of job matches for your target roles.`
      } else if (lower.includes('salary') || lower.includes('pay') || lower.includes('negotiate')) {
        finalResponse = `When negotiating salary, always research the market rate for your location and experience level first. Don't provide a number first if you can avoid it, and always focus the negotiation on the specific value and skills you bring to the company.`
      } else if (lower === 'hi' || lower === 'hello' || lower === 'hey') {
        finalResponse = `Hello there! I'm ready to help you land your dream job. What are we focusing on today: your resume, your interview skills, or your learning roadmap?`
      } else if (lower.includes('help')) {
        finalResponse = `I'm here to help! I can analyze your resume, recommend new skills to learn, provide salary negotiation tips, or conduct a mock interview. Just let me know what you'd like to tackle first.`
      } else {
        // More natural conversational fallback
        finalResponse = `That's an interesting question. To give you the most accurate career advice regarding that, could you provide just a bit more context? (For example, you can ask me about specific roles, skills, or resume tips!)`
      }

      // Typewriter effect
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        setMessages((currentMsgs) => {
          const newMsgs = [...currentMsgs]
          const lastMsg = newMsgs[newMsgs.length - 1]
          
          if (currentIndex < finalResponse.length) {
            lastMsg.text += finalResponse.charAt(currentIndex)
            currentIndex++
            return newMsgs
          } else {
            clearInterval(typeInterval)
            lastMsg.isTyping = false
            setIsAiTyping(false)
            return newMsgs
          }
        })
      }, 20) // Speed of typing

    }, 800) // Thinking delay
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="AI Career Coach" avatarSeed="JS">
      <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
        <div className="card hidden lg:flex flex-col">
          <button className="btn-primary !py-2.5 mb-4"><Plus size={15} /> New chat</button>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-2">Past Conversations</p>
          <div className="space-y-1 overflow-y-auto">
            {pastConversations.map((c) => (
              <button key={c} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl2 text-sm hover:bg-primary-500/10 truncate">
                <MessageSquare size={14} className="shrink-0 text-slate-400" /> {c}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 card flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.from === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`h-8 w-8 rounded-xl2 flex items-center justify-center shrink-0 ${m.from === 'ai' ? 'bg-brand-gradient text-white' : 'bg-slate-200 dark:bg-white/10'}`}>
                  {m.from === 'ai' ? <Bot size={15} /> : <User size={15} />}
                </div>
                <div className={`max-w-[75%] rounded-xl2 px-4 py-2.5 text-sm ${m.from === 'ai' ? 'bg-primary-500/10' : 'bg-brand-gradient text-white'}`}>
                  {m.text}
                  {m.isTyping && <span className="inline-block w-1.5 h-3 ml-1 bg-primary-500 animate-pulse align-middle"></span>}
                </div>
              </div>
            ))}
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 my-4">
              {coachSuggestions.map((s) => (
                <button key={s} onClick={() => ask(s)} className="text-xs font-medium px-3 py-2 rounded-xl2 border border-slate-200 dark:border-white/10 hover:border-primary-400 hover:bg-primary-500/5 transition-colors">
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex gap-2 pt-4 mt-2 border-t border-slate-200 dark:border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && ask(input)}
              placeholder="Ask your career coach anything…"
              className="input-field flex-1"
            />
            <button onClick={() => ask(input)} className="btn-primary !px-4"><Send size={16} /></button>
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
