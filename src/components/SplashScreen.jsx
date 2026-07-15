import { Sparkles, Cpu, BrainCircuit, Network, Code2 } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // The CSS animation 'animate-fade-out-screen' takes care of fading out visually
    // after 3.5s. We'll unmount the component entirely after 4s.
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0f1c] text-white overflow-hidden animate-fade-out-screen">
      
      {/* Background Workflow / Circuit Animation */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl max-h-4xl">
          <g stroke="#3b82f6" strokeWidth="2" fill="none" className="animate-draw-circuit" style={{strokeDasharray: 1000}}>
            {/* Left nodes to center */}
            <path d="M 100,200 L 250,200 L 300,300 L 400,300" />
            <path d="M 100,400 L 250,400 L 300,300" />
            {/* Right nodes to center */}
            <path d="M 700,200 L 550,200 L 500,300 L 400,300" />
            <path d="M 700,400 L 550,400 L 500,300" />
            {/* Top and Bottom */}
            <path d="M 400,100 L 400,300" />
            <path d="M 400,500 L 400,300" />
          </g>
        </svg>

        {/* Pulsing Nodes */}
        <div className="absolute top-[200px] left-[100px] w-3 h-3 bg-brand-500 rounded-full animate-pulse-node" style={{animationDelay: '0.2s'}}></div>
        <div className="absolute top-[400px] left-[100px] w-3 h-3 bg-purple-500 rounded-full animate-pulse-node" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-[200px] right-[100px] w-3 h-3 bg-emerald-500 rounded-full animate-pulse-node" style={{animationDelay: '0.8s'}}></div>
        <div className="absolute top-[400px] right-[100px] w-3 h-3 bg-brand-400 rounded-full animate-pulse-node" style={{animationDelay: '1.1s'}}></div>
        <div className="absolute top-[100px] left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rounded-full animate-pulse-node" style={{animationDelay: '1.4s'}}></div>
        <div className="absolute bottom-[100px] left-1/2 -translate-x-1/2 w-3 h-3 bg-pink-500 rounded-full animate-pulse-node" style={{animationDelay: '1.7s'}}></div>
      </div>

      {/* Floating Icons */}
      <div className="absolute top-1/4 left-1/4 opacity-30 animate-bounce" style={{animationDuration: '3s'}}><Cpu size={32} /></div>
      <div className="absolute bottom-1/4 right-1/4 opacity-30 animate-bounce" style={{animationDuration: '4s'}}><BrainCircuit size={32} /></div>
      <div className="absolute top-1/3 right-1/3 opacity-30 animate-pulse"><Network size={24} /></div>
      <div className="absolute bottom-1/3 left-1/3 opacity-30 animate-pulse" style={{animationDelay: '1s'}}><Code2 size={24} /></div>

      {/* Central Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-brand-400 via-brand-600 to-purple-600 flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(37,99,235,0.5)] animate-reveal-text">
          <Sparkles size={40} className="text-white" />
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold font-heading tracking-widest animate-reveal-text" style={{animationDelay: '0.3s'}}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
            TALENTFORGE
          </span>
          <span className="text-brand-500">-AI</span>
        </h1>
        
        <div className="mt-6 flex items-center gap-2 overflow-hidden h-6 animate-reveal-text" style={{animationDelay: '0.6s'}}>
          <div className="w-8 h-1 bg-gradient-to-r from-transparent to-brand-500 rounded-full"></div>
          <p className="text-sm tracking-widest text-brand-300 uppercase font-semibold">Initializing Workflow</p>
          <div className="w-8 h-1 bg-gradient-to-l from-transparent to-brand-500 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
