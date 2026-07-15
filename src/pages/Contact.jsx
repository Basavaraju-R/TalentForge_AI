import Layout from '../layout/Layout'
import { Mail, MessageSquare, MapPin, Phone, Send } from 'lucide-react'

export default function Contact() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-24">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-heading tracking-tight">
            Let's Start a Conversation
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Whether you're a student looking for guidance, or an enterprise needing a demo, our team is ready to help you succeed.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-12 items-start">
          
          {/* Contact Info */}
          <div className="md:col-span-2 space-y-8">
            <div className="bg-brand-50 dark:bg-brand-900/10 p-8 rounded-3xl border border-brand-100 dark:border-brand-900/30">
              <h3 className="text-2xl font-bold mb-6 font-heading">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
                    <Mail className="text-brand-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Email Us</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Our friendly team is here to help.</p>
                    <a href="mailto:hello@talentforge.ai" className="text-brand-600 dark:text-brand-400 font-medium mt-1 inline-block hover:underline">hello@talentforge.ai</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
                    <MapPin className="text-purple-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Office</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Come say hello at our HQ.</p>
                    <p className="text-slate-700 dark:text-slate-300 font-medium mt-1">100 Tech Lane, Innovation City, CA 94000</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center shrink-0">
                    <Phone className="text-emerald-500" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">Phone</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Mon-Fri from 8am to 5pm.</p>
                    <a href="tel:+15550000000" className="text-brand-600 dark:text-brand-400 font-medium mt-1 inline-block hover:underline">+1 (555) 000-0000</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-3 bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none">
            <h3 className="text-2xl font-bold mb-8 font-heading">Send us a Message</h3>
            
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Jane" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Smith" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all" placeholder="jane@example.com" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">What can we help you with?</label>
                <select className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all text-slate-700 dark:text-slate-300">
                  <option value="">Select a topic</option>
                  <option value="student">Student Account Support</option>
                  <option value="enterprise">Enterprise Sales & Demo</option>
                  <option value="university">University Partnership</option>
                  <option value="other">Other Inquiry</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all resize-none" placeholder="Tell us how we can help..."></textarea>
              </div>

              <button type="button" className="w-full py-4 bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-500/25">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  )
}
