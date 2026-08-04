import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Mic, MicOff } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your TalentForge AI Assistant. How can I help you clear your doubts today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    try {
      const stored = localStorage.getItem('talentforge_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.name) setUserName(parsed.name);
      }
    } catch(e) {}
  }, []);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Initialize Web Speech API for voice assistant feature
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue(prev => (prev ? prev + " " : "") + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current?.start();
        setIsListening(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const newUserMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);

      const lowerInput = inputValue.toLowerCase();
      let aiResponse = "I appreciate your question! While I am currently operating as a mockup AI without a live backend connection, I can provide detailed advice on resume optimization, general interview prep, or career guidance.";
      
      if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        aiResponse = "Hello there! I'm your TalentForge Assistant. I am here to provide you with actionable career advice and technical insights.";
      } else if (lowerInput.includes('ai coding') || lowerInput.includes('code') || lowerInput.includes('programming')) {
        aiResponse = "AI coding is transforming the tech industry. Tools like GitHub Copilot and Cursor can significantly increase your productivity by automating boilerplate code and assisting with complex debugging.";
      } else if (lowerInput.includes('general knowledge') || lowerInput.includes('know')) {
        aiResponse = "Did you know the first computer bug was an actual moth found in a Harvard Mark II computer in 1947? Grace Hopper's team taped it into their logbook, coining the term 'debugging'.";
      } else if (lowerInput.includes('resume') || lowerInput.includes('resum')) {
        aiResponse = "To build a strong resume, always use the STAR method (Situation, Task, Action, Result) for your bullet points. Make sure to quantify your achievements with clear metrics, like 'increased performance by 20%'.";
      } else if (lowerInput.includes('interview') || lowerInput.includes('interv') || lowerInput.includes('interi')) {
        aiResponse = "For interviews, thorough preparation is essential. Always research the company's core values beforehand, practice your behavioral answers out loud, and have 3 thoughtful questions ready to ask your interviewer at the end.";
      } else if (lowerInput.includes('yes') || lowerInput.includes('sure') || lowerInput.includes('ok')) {
        aiResponse = "Great! Consistency is the most important factor in your career journey. Keep learning every day and you will definitely achieve your goals.";
      } else if (lowerInput.includes('thank')) {
        aiResponse = "You're very welcome! Feel free to reach out anytime you need further assistance.";
      }

      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now(), 
          text: aiResponse,
          sender: 'ai' 
        }
      ]);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-primary-900/20 border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300" style={{ height: '550px', maxHeight: 'calc(100vh - 120px)' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold font-heading text-md">Career Coach AI</h3>
                <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> {isListening ? 'Listening...' : 'Online'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">{msg.sender === 'user' ? (userName || 'You') : 'AI'}</span>
                </div>
                <div className={`px-4 py-2.5 rounded-2xl max-w-[80%] text-[15px] leading-relaxed shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-tr-sm' 
                    : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a career or tech question..."
                  className="w-full pl-4 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={toggleListening}
                  title="Voice Input"
                  className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary-500 hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                >
                  {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
              </div>
              <button 
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 disabled:dark:bg-slate-700 text-white rounded-xl transition-all shadow-md shadow-primary-500/20 active:scale-95 flex items-center justify-center shrink-0"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-800 dark:bg-slate-700 text-white' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'}`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
