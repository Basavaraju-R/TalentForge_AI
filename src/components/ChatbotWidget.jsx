import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Mic, MicOff, Image as ImageIcon } from 'lucide-react';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hi there! I'm your TalentForge AI Assistant. I can write code, analyze images, and give career advice! How can I help you today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageBase64, setSelectedImageBase64] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userName, setUserName] = useState('');
  
  const fileInputRef = useRef(null);

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        // Extract the base64 string without the data URL prefix for Gemini API
        const base64String = reader.result.split(',')[1];
        setSelectedImageBase64({
          inlineData: {
            data: base64String,
            mimeType: file.type
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() && !selectedImage) return;

    // Add user message
    const newUserMsg = { 
      id: Date.now(), 
      text: inputValue, 
      image: selectedImage,
      sender: 'user' 
    };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputValue('');
    setSelectedImage(null);
    const imagePayload = selectedImageBase64;
    setSelectedImageBase64(null);
    setIsTyping(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      
      // If no API key, fall back to Wikipedia / hardcoded logic or tell them they need a key for advanced features
      if (!apiKey || apiKey === 'your_api_key_here') {
        setTimeout(() => {
          setIsTyping(false);
          let aiResponse = "To write complex code and analyze images like ChatGPT or Claude, I need to connect to a real AI brain. Please get a FREE API key from https://aistudio.google.com/app/apikey, add it to your .env file as VITE_GEMINI_API_KEY, and restart your server!";
          setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
        }, 1000);
        return;
      }
      
      // Formulate the request for Gemini
      const parts = [{ text: "You are the TalentForge AI Assistant, a helpful career coach and expert programmer. Please help the user with their request.\nUser: " + newUserMsg.text }];
      
      if (imagePayload) {
        parts.push(imagePayload);
      }

      const requestBody = {
        contents: [
          {
            role: "user",
            parts: parts
          }
        ]
      };

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);

      const data = await response.json();
      let aiResponse = "Sorry, I couldn't process that.";
      if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
        aiResponse = data.candidates[0].content.parts[0].text;
      }

      setMessages(prev => [...prev, { id: Date.now(), text: aiResponse, sender: 'ai' }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { id: Date.now(), text: "I encountered an error connecting to my AI servers.", sender: 'ai' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col mb-4 animate-in slide-in-from-bottom-4 duration-300" style={{ height: '600px', maxHeight: 'calc(100vh - 120px)' }}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shadow-inner">
                <Bot size={22} />
              </div>
              <div>
                <h3 className="font-bold font-heading text-md">TalentForge AI (Pro)</h3>
                <p className="text-xs text-white/80 flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> {isListening ? 'Listening...' : 'Online'}
                </p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full text-white/80 hover:bg-white/10 transition-all">
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-slate-50 dark:bg-slate-900/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.sender === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-slate-200 text-slate-600'}`}>
                    {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                </div>
                <div className={`flex flex-col gap-2 max-w-[80%]`}>
                  {msg.image && (
                    <img src={msg.image} alt="Uploaded" className="rounded-xl border border-slate-200 shadow-sm max-h-[150px] object-cover" />
                  )}
                  {msg.text && (
                    <div className={`px-4 py-2.5 rounded-2xl text-[15px] leading-relaxed shadow-sm whitespace-pre-wrap ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-tr-sm' 
                        : 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-tl-sm'
                    }`}>
                      {msg.text}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0 shadow-sm">
                  <Bot size={16} />
                </div>
                <div className="px-4 py-3 bg-white border border-slate-100 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-2">
            {selectedImage && (
              <div className="relative inline-block w-max">
                <img src={selectedImage} alt="Preview" className="h-16 rounded-lg border border-slate-200" />
                <button onClick={() => {setSelectedImage(null); setSelectedImageBase64(null);}} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600">
                  <X size={12} />
                </button>
              </div>
            )}
            
            <form onSubmit={handleSend} className="relative flex items-center gap-2">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-slate-400 hover:text-primary-500 hover:bg-slate-100 rounded-lg transition-all">
                <ImageIcon size={20} />
              </button>
              <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleImageUpload} />
              
              <div className="relative flex-1">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question or share code..."
                  className="w-full pl-4 pr-10 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
                <button type="button" onClick={toggleListening} className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-all ${isListening ? 'bg-red-100 text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary-500'}`}>
                  {isListening ? <Mic size={18} /> : <MicOff size={18} />}
                </button>
              </div>
              <button type="submit" disabled={(!inputValue.trim() && !selectedImage) || isTyping} className="p-3 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 text-white rounded-xl transition-all shadow-md active:scale-95 shrink-0">
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ${isOpen ? 'bg-slate-800 text-white' : 'bg-gradient-to-r from-primary-600 to-purple-600 text-white'}`}>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
}
