import { Award, Download, BookOpen, Compass, Code, ExternalLink, GraduationCap, ChevronRight, Lock } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { jsPDF } from 'jspdf'

const certificates = [
  { title: 'Java Fundamentals', duration: 'Jan 2026 - Jun 2026', image: '/java_cert.png' },
  { title: 'SQL Essentials', duration: 'Mar 2026 - Jun 2026', image: '/sql_cert.png' },
]

const availableCertifications = [
  { title: 'React Advanced Concepts', duration: '4 Weeks', level: 'Advanced' },
  { title: 'System Design Interview Prep', duration: '6 Weeks', level: 'Expert' },
  { title: 'DevOps & CI/CD Pipelines', duration: '5 Weeks', level: 'Intermediate' },
]

const processSignatureImage = async () => {
  return new Promise((resolve) => {
    const loadImg = (src, isFallback) => {
      const img = new Image()
      img.crossOrigin = "Anonymous"
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        
        if (!isFallback) {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const r = data[i]; const g = data[i+1]; const b = data[i+2]
            if (r > 140 && g > 140 && b > 140) {
              data[i+3] = 0 // transparent
            } else {
              data[i] = 15; data[i+1] = 30; data[i+2] = 80;
            }
          }
          ctx.putImageData(imageData, 0, 0)
        }
        
        resolve(canvas.toDataURL('image/png'))
      }
      
      img.onerror = () => {
        if (!isFallback) {
          const fallbackSvg = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iMTUwIj48c3R5bGU+LnNpZyB7IGZvbnQtZmFtaWx5OiAnQnJ1c2ggU2NyaXB0IE1UJywgY3Vyc2l2ZTsgZm9udC1zaXplOiA4MHB4OyBmaWxsOiAjMGYxZTUwOyB9IC5saW5lIHsgc3Ryb2tlOiAjMGYxZTUwOyBzdHJva2Utd2lkdGg6IDQ7IGZpbGw6IG5vbmU7IHN0cm9rZS1saW5lY2FwOiByb3VuZDsgfTwvc3R5bGU+PHBhdGggZD0iTSAyMCAxMjAgUSAxNTAgMTQwIDM4MCA5MCIgY2xhc3M9ImxpbmUiIC8+PHRleHQgeD0iNTAiIHk9IjEwMCIgY2xhc3M9InNpZyI+QmFzYXZhPC90ZXh0Pjwvc3ZnPg==`;
          loadImg(fallbackSvg, true)
        } else {
          resolve(null)
        }
      }
      
      img.src = src
    }
    
    loadImg('/signature.png', false)
  })
}

export default function Certificates() {
  const handleDownload = async (certTitle, certDuration) => {
    let userName = "Jane Student";
    const stored = localStorage.getItem('talentforge_profile');
    if (stored) {
      try {
        const data = JSON.parse(stored);
        if (data && data.name) userName = data.name;
      } catch(e) {}
    }

    const doc = new jsPDF({ orientation: 'landscape' });

    doc.setLineWidth(2);
    doc.setDrawColor(200, 200, 200);
    doc.rect(10, 10, 277, 190);
    doc.setLineWidth(1);
    doc.rect(14, 14, 269, 182);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(40);
    doc.setTextColor(15, 23, 42);
    doc.text("CERTIFICATE OF COMPLETION", 148.5, 60, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text("This certifies that", 148.5, 85, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(36);
    doc.setTextColor(15, 23, 42);
    doc.text(userName, 148.5, 110, { align: "center" });

    doc.setLineWidth(0.5);
    doc.setDrawColor(100, 100, 100);
    const nameWidth = doc.getTextWidth(userName);
    doc.line(148.5 - (nameWidth/2) - 10, 115, 148.5 + (nameWidth/2) + 10, 115);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.setTextColor(100, 116, 139);
    doc.text("has successfully completed the certification for", 148.5, 130, { align: "center" });

    doc.setFont("helvetica", "bold");
    doc.setFontSize(28);
    doc.setTextColor(59, 130, 246);
    doc.text(certTitle, 148.5, 150, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);

    doc.text("Duration: " + certDuration, 60, 175, { align: "center" });
    doc.line(20, 180, 100, 180);

    const signatureBase64 = await processSignatureImage();
    
    if (signatureBase64) {
      doc.addImage(signatureBase64, 'PNG', 195, 145, 80, 35);
    } else {
      doc.setFont("times", "italic");
      doc.setFontSize(28);
      doc.text("A. Director", 237, 175, { align: "center" });
    }
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("TalentForge Authorized Signature", 237, 185, { align: "center" });
    doc.line(190, 180, 280, 180);

    doc.save(`${certTitle.replace(/\s+/g, '_')}_Certificate.pdf`);
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Certificates">
      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-heading font-bold">Earned Certificates</h2>
        <p className="text-sm text-slate-500 mt-1">Download and share your verified certificates.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
        {certificates.map((c) => (
          <div key={c.title} className="card card-hover flex flex-col p-4">
            <div className={`h-40 rounded-xl overflow-hidden mb-4 border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 relative group`}>
              <img src={c.image} alt={c.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <Award size={32} className="text-white" />
              </div>
            </div>
            <h3 className="font-heading font-semibold text-lg">{c.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">Duration: {c.duration}</p>
            <button 
              onClick={() => handleDownload(c.title, c.duration)}
              className="mt-auto btn-secondary w-full !py-2.5 text-sm flex items-center justify-center gap-2"
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-500/10 text-primary-500 rounded-xl2">
              <GraduationCap size={24} />
            </div>
            <h3 className="font-heading font-semibold text-lg">How to Earn Certificates</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 shrink-0 mt-0.5">1</span>
              <div>
                <p className="font-semibold text-sm">Complete Learning Path</p>
                <p className="text-xs text-slate-500 mt-1">Finish 100% of the video lectures, reading materials, and hands-on exercises in a track.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 shrink-0 mt-0.5">2</span>
              <div>
                <p className="font-semibold text-sm">Pass the Final Assessment</p>
                <p className="text-xs text-slate-500 mt-1">Score 80% or higher on the final technical assessment or capstone project.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-500 shrink-0 mt-0.5">3</span>
              <div>
                <p className="font-semibold text-sm">Claim Your Verified Certificate</p>
                <p className="text-xs text-slate-500 mt-1">Once passed, your certificate will automatically generate and appear in this dashboard.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="card space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary-500/10 text-secondary-500 rounded-xl2">
              <Compass size={24} />
            </div>
            <h3 className="font-heading font-semibold text-lg">Skill Development Resources</h3>
          </div>
          <div className="space-y-3">
            <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <BookOpen size={18} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-500 transition-colors">Official MDN Web Docs</p>
                  <p className="text-xs text-slate-500">Comprehensive documentation for HTML, CSS, & JS.</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Code size={18} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-500 transition-colors">Interactive Coding Labs</p>
                  <p className="text-xs text-slate-500">Practice your logic with step-by-step algorithms.</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
            
            <a href="#" className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-3">
                <Compass size={18} className="text-slate-400 group-hover:text-primary-500 transition-colors" />
                <div>
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 group-hover:text-primary-500 transition-colors">System Design Primer</p>
                  <p className="text-xs text-slate-500">Learn how to design large-scale web applications.</p>
                </div>
              </div>
              <ExternalLink size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
        <h2 className="text-xl font-heading font-bold">More Available Certifications</h2>
        <p className="text-sm text-slate-500 mt-1">Enroll in these advanced paths to grow your skill set.</p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {availableCertifications.map((c) => (
          <div key={c.title} className="card card-hover flex flex-col opacity-80 hover:opacity-100">
            <div className={`h-24 rounded-xl2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center mb-4 text-slate-400`}>
              <Lock size={28} className="mb-2" />
              <span className="text-xs font-semibold uppercase tracking-wider">{c.level}</span>
            </div>
            <h3 className="font-heading font-semibold text-md">{c.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6">Est. Time: {c.duration}</p>
            <button className="mt-auto w-full px-4 py-2.5 rounded-xl2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold flex items-center justify-center gap-2 hover:bg-primary-500 hover:text-white transition-colors">
              Enroll Now <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </DashboardShell>
  )
}
