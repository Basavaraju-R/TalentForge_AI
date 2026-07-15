import Layout from '../layout/Layout'
import { Rocket, Target, Users, Shield, Sparkles, Zap, BrainCircuit, LineChart } from 'lucide-react'

export default function About() {
  const values = [
    { icon: <BrainCircuit className="text-brand-500" size={24} />, title: "AI-Powered Intelligence", desc: "Leveraging cutting-edge AI to provide personalized career insights, resume optimization, and interview preparation." },
    { icon: <Users className="text-blue-500" size={24} />, title: "Community First", desc: "Building a supportive ecosystem where students, recruiters, and institutions collaborate and grow together." },
    { icon: <Shield className="text-emerald-500" size={24} />, title: "Data Privacy & Security", desc: "Your data belongs to you. We employ enterprise-grade security to ensure your personal information remains protected." },
    { icon: <Zap className="text-amber-500" size={24} />, title: "Real-Time Matching", desc: "Instantly connecting the right talent with the right opportunities using our proprietary matching algorithms." },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 pt-24 pb-16">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-brand-500/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 text-sm font-medium mb-6">
            <Sparkles size={16} /> Our Mission
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 font-heading tracking-tight">
            Redefining the Future of <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-600">Career Development</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            TalentForge AI is a revolutionary career intelligence platform designed to bridge the gap between ambitious students, top-tier recruiters, and forward-thinking educational institutions.
          </p>
        </div>
      </div>

      {/* Story Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6 font-heading">Our Story</h2>
            <div className="space-y-4 text-lg text-slate-600 dark:text-slate-300">
              <p>
                The job market is evolving faster than ever, leaving many talented individuals struggling to showcase their true potential and recruiters drowning in unqualified applications.
              </p>
              <p>
                We built TalentForge AI to solve this disconnect. By integrating artificial intelligence directly into the career preparation and hiring workflows, we remove the guesswork from the equation.
              </p>
              <p>
                Whether you need a resume analyzed against industry standards, a mock interview to calm your nerves, or an automated skill gap analysis, our platform equips you with actionable insights to land your dream role.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-8">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                <Rocket className="text-brand-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">10k+</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Careers Launched</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                <Target className="text-purple-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">98%</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Matching Accuracy</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700">
                <LineChart className="text-emerald-500 mb-4" size={32} />
                <h3 className="font-bold text-xl mb-2">500+</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">Partner Companies</p>
              </div>
              <div className="bg-gradient-to-br from-brand-500 to-purple-600 p-6 rounded-2xl text-white shadow-xl shadow-brand-500/20">
                <h3 className="font-bold text-2xl mb-2">Join Us</h3>
                <p className="text-sm text-white/80">Be part of the revolution in hiring.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="bg-slate-50 dark:bg-slate-900/50 py-20 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4 font-heading">Our Core Values</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">The principles that guide everything we build and how we interact with our community.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all duration-300 hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-700 flex items-center justify-center mb-6">
                  {val.icon}
                </div>
                <h3 className="text-lg font-bold mb-3">{val.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
