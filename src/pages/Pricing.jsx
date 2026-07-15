import Layout from '../layout/Layout'
import { CheckCircle2, XCircle, Sparkles } from 'lucide-react'

export default function Pricing() {
  const plans = [
    {
      name: "Student Basic",
      price: "0",
      description: "Perfect for students just getting started with their career journey.",
      features: [
        { name: "Basic Resume Analysis (2/month)", included: true },
        { name: "Standard ATS Scoring", included: true },
        { name: "1 Mock Interview per month", included: true },
        { name: "Basic Skill Gap Report", included: true },
        { name: "Career Coach Chatbot", included: false },
        { name: "Priority Job Applications", included: false },
      ],
      buttonText: "Get Started Free",
      popular: false,
      buttonClass: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white"
    },
    {
      name: "Student Pro",
      price: "9",
      description: "Everything you need to land your dream job faster and stand out.",
      features: [
        { name: "Unlimited Resume Analysis", included: true },
        { name: "Advanced ATS Scoring & Suggestions", included: true },
        { name: "Unlimited AI Mock Interviews", included: true },
        { name: "Detailed Skill Gap & Roadmap", included: true },
        { name: "24/7 AI Career Coach", included: true },
        { name: "Priority Job Applications", included: true },
      ],
      buttonText: "Upgrade to Pro",
      popular: true,
      buttonClass: "bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-500/25"
    },
    {
      name: "Recruiter & Institution",
      price: "Custom",
      description: "Enterprise-grade tools for hiring managers and universities.",
      features: [
        { name: "Unlimited Job Postings", included: true },
        { name: "AI Candidate Screening Dashboard", included: true },
        { name: "Automated Interview Scheduling", included: true },
        { name: "Institutional Analytics & Reports", included: true },
        { name: "Dedicated Account Manager", included: true },
        { name: "Custom API Integrations", included: true },
      ],
      buttonText: "Contact Sales",
      popular: false,
      buttonClass: "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 dark:text-slate-900 text-white"
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Invest in your career with plans designed to scale with your ambitions. No hidden fees, ever.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, idx) => (
            <div key={idx} className={`relative p-8 rounded-3xl border transition-all duration-300 ${plan.popular ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-900/10 shadow-2xl shadow-brand-500/10 scale-105' : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'}`}>
              
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-brand-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                  <Sparkles size={14} /> Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2 font-heading">{plan.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 min-h-[40px]">{plan.description}</p>
              
              <div className="mb-8">
                {plan.price === "Custom" ? (
                  <p className="text-4xl font-bold">Custom</p>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-slate-500 mb-1">/month</span>
                  </div>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    {feat.included ? (
                      <CheckCircle2 className="text-brand-500 shrink-0 mt-0.5" size={20} />
                    ) : (
                      <XCircle className="text-slate-300 dark:text-slate-700 shrink-0 mt-0.5" size={20} />
                    )}
                    <span className={`text-sm ${feat.included ? 'text-slate-700 dark:text-slate-200' : 'text-slate-400 dark:text-slate-600'}`}>
                      {feat.name}
                    </span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 px-4 rounded-xl font-bold transition-all ${plan.buttonClass}`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
        
        {/* FAQ Teaser */}
        <div className="mt-24 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-4">Have specific needs for your university or company?</p>
          <button className="text-brand-600 dark:text-brand-400 font-medium hover:underline">Chat with our enterprise team</button>
        </div>
      </div>
    </Layout>
  )
}
