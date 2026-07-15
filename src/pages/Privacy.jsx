import Layout from '../layout/Layout'
import { ShieldCheck, Lock, FileText, Eye } from 'lucide-react'

export default function Privacy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/20 text-brand-500 mb-6">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-heading tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 dark:text-slate-400">Last Updated: October 15, 2026</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 md:p-12 shadow-sm prose prose-slate dark:prose-invert max-w-none">
          
          <p className="lead text-xl text-slate-600 dark:text-slate-300 mb-8">
            At TalentForge AI, we believe your data belongs to you. This Privacy Policy outlines our commitment to protecting your personal information and being transparent about how we use it to provide you with career intelligence.
          </p>

          <hr className="my-8 border-slate-200 dark:border-slate-800" />

          <div className="grid md:grid-cols-2 gap-8 mb-12 not-prose">
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
              <Lock className="text-brand-500 mb-4" size={24} />
              <h3 className="font-bold text-lg mb-2">Secure by Design</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Enterprise-grade encryption for all your resumes, interview videos, and personal data.</p>
            </div>
            <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl">
              <Eye className="text-purple-500 mb-4" size={24} />
              <h3 className="font-bold text-lg mb-2">You Control Visibility</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">Recruiters only see what you explicitly allow them to see. No hidden profiling.</p>
            </div>
          </div>

          <h2>1. Information We Collect</h2>
          <p>We collect information you provide directly to us when you create an account, upload a resume, or participate in mock interviews. This includes:</p>
          <ul>
            <li><strong>Account Data:</strong> Name, email address, password, and educational institution.</li>
            <li><strong>Career Data:</strong> Resumes, cover letters, portfolios, and self-reported skills.</li>
            <li><strong>Interaction Data:</strong> Audio/video recordings from mock interviews (which are processed in real-time and not stored unless you opt-in for review), and chat logs with the Career Coach AI.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the collected data strictly to improve your career outcomes and platform experience:</p>
          <ul>
            <li>To parse your resume and provide ATS scoring and skill gap analysis.</li>
            <li>To facilitate AI-driven mock interviews and generate feedback reports.</li>
            <li>To match your anonymized profile with recruiter job postings (if you opt-in to the Talent Pool).</li>
            <li>To improve our proprietary AI models (using anonymized and aggregated data only).</li>
          </ul>

          <h2>3. Data Sharing and Disclosure</h2>
          <p>We do <strong>not</strong> sell your personal data to third parties. We only share information in the following scenarios:</p>
          <ul>
            <li><strong>With Recruiters:</strong> Only when you explicitly apply for a job or opt-in to the visible Talent Pool.</li>
            <li><strong>With Service Providers:</strong> Trusted third-party vendors (like cloud hosting) under strict confidentiality agreements.</li>
            <li><strong>Legal Requirements:</strong> If required by law or subpoena to protect our rights or the safety of our users.</li>
          </ul>

          <h2>4. Your Rights & Choices</h2>
          <p>You have full control over your data. You can:</p>
          <ul>
            <li>Access, update, or delete your account and all associated data at any time from your Settings.</li>
            <li>Opt-out of the recruiter Talent Pool.</li>
            <li>Request a full export of your data in a machine-readable format.</li>
          </ul>

          <div className="bg-brand-50 dark:bg-brand-900/10 border-l-4 border-brand-500 p-6 rounded-r-2xl mt-12 not-prose">
            <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">Questions about your privacy?</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Our Data Protection Officer is always available to address your concerns.</p>
            <a href="mailto:privacy@talentforge.ai" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-medium hover:underline">
              <FileText size={18} /> privacy@talentforge.ai
            </a>
          </div>

        </div>
      </div>
    </Layout>
  )
}
