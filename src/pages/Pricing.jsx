import React, { useState, useEffect } from 'react';
import Layout from '../layout/Layout'
import { CheckCircle2, XCircle, Sparkles, QrCode, ArrowRight, Loader2, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function Pricing() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success
  const [currentTier, setCurrentTier] = useState('basic');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const tier = localStorage.getItem('userTier') || 'basic';
    setCurrentTier(tier);
  }, []);

  const handleUpgradeClick = (planData) => {
    setSelectedPlan(planData);
    setShowPaymentModal(true);
    setPaymentStatus('idle');
  };

  const handlePaymentConfirm = () => {
    setPaymentStatus('processing');
    // Simulate payment verification delay
    setTimeout(() => {
      setPaymentStatus('success');
      localStorage.setItem('userTier', selectedPlan.tierId);
      // After success, wait a bit then redirect to dashboard or close
      setTimeout(() => {
        setShowPaymentModal(false);
        navigate('/student-dashboard'); // Redirect to dashboard after upgrade
      }, 2000);
    }, 2500);
  };

  const plans = [
    {
      name: "Premium Basic",
      price: "59",
      tierId: "premium-basic",
      description: "Essential tools for students getting started with their career journey.",
      features: [
        { name: "Basic Resume Analysis (5/month)", included: true },
        { name: "Standard ATS Scoring", included: true },
        { name: "3 Mock Interviews per month", included: true },
        { name: "Basic Skill Gap Report", included: true },
        { name: "Basic Career Suggestions", included: true },
        { name: "Priority Job Applications", included: false },
      ],
      buttonText: currentTier === 'premium-basic' ? "Current Plan" : "Upgrade to Basic",
      popular: false,
      buttonClass: currentTier === 'premium-basic' 
        ? "bg-slate-800 text-white cursor-default" 
        : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white",
      onClick: () => handleUpgradeClick({ name: "Premium Basic", price: "59", tierId: "premium-basic" })
    },
    {
      name: "Premium Inter",
      price: "159",
      tierId: "premium-inter",
      description: "Everything you need to land your dream job faster and stand out.",
      features: [
        { name: "Unlimited Resume Analysis", included: true },
        { name: "Advanced ATS Scoring & Suggestions", included: true },
        { name: "Unlimited AI Mock Interviews", included: true },
        { name: "Detailed Skill Gap & Roadmap", included: true },
        { name: "24/7 AI Career Coach", included: true },
        { name: "Priority Job Applications", included: true },
        { name: "Business Idea Validation", included: true },
        { name: "1-on-1 Mentorship (1/month)", included: false }
      ],
      buttonText: currentTier === 'premium-inter' ? "Current Plan" : "Upgrade to Inter",
      popular: true,
      buttonClass: currentTier === 'premium-inter' 
        ? "bg-slate-800 text-white cursor-default" 
        : "bg-gradient-to-r from-brand-600 to-purple-600 hover:from-brand-500 hover:to-purple-500 text-white shadow-lg shadow-brand-500/25",
      onClick: () => handleUpgradeClick({ name: "Premium Inter", price: "159", tierId: "premium-inter" })
    },
    {
      name: "High Perform",
      price: "199",
      tierId: "premium-high",
      description: "Elite tier for top performers demanding the ultimate edge.",
      features: [
        { name: "All Premium Inter Features", included: true },
        { name: "Exclusive Job Referrals", included: true },
        { name: "1-on-1 Mentorship (Unlimited)", included: true },
        { name: "Advanced Career Growth Map", included: true },
        { name: "VIP Portfolio Review", included: true },
        { name: "Executive Resume Rewrite", included: true },
      ],
      buttonText: currentTier === 'premium-high' ? "Current Plan" : "Upgrade to High Perform",
      popular: false,
      buttonClass: currentTier === 'premium-high'
        ? "bg-slate-800 text-white cursor-default"
        : "bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25",
      onClick: () => handleUpgradeClick({ name: "High Perform", price: "199", tierId: "premium-high" })
    }
  ];

  // UPI Details
  const upiId = "basava9240-1@okicici";

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
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-slate-500 mb-1">/month</span>
                </div>
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

              <button 
                onClick={currentTier === plan.tierId ? undefined : plan.onClick}
                className={`w-full py-3 px-4 rounded-xl font-bold transition-all flex justify-center items-center gap-2 ${plan.buttonClass}`}
                disabled={currentTier === plan.tierId}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowPaymentModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <XCircle size={24} />
            </button>
            
            <div className="text-center">
              <h2 className="text-2xl font-bold font-heading mb-2">Upgrade to {selectedPlan.name}</h2>
              
              {paymentStatus === 'idle' && (
                <>
                  <p className="text-slate-500 dark:text-slate-400 mb-6">Scan the QR code below using any UPI app to pay ${selectedPlan.price}/month.</p>
                  
                  <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-xl flex flex-col items-center mb-6">
                    <div className="bg-white p-3 rounded-lg shadow-sm mb-4">
                      <img src="/scanner.jpg" alt="UPI Payment QR Code" className="w-48 h-48 object-contain bg-white" 
                        onError={(e) => {
                          e.target.onerror = null; 
                          e.target.src = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=basava9240-1@okicici&pn=TalentForge";
                        }}
                      />
                    </div>
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium bg-white dark:bg-slate-900 px-4 py-2 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
                      <QrCode size={18} className="text-brand-500" />
                      <span>{upiId}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handlePaymentConfirm}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    I have completed the payment <ArrowRight size={18} />
                  </button>
                </>
              )}

              {paymentStatus === 'processing' && (
                <div className="py-12 flex flex-col items-center">
                  <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-4" />
                  <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Verifying Payment...</h3>
                  <p className="text-sm text-slate-500 mt-2">Please wait while we confirm your transaction.</p>
                </div>
              )}

              {paymentStatus === 'success' && (
                <div className="py-12 flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Payment Successful!</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-center">
                    Welcome to {selectedPlan.name}. You are being redirected to your dashboard...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}

