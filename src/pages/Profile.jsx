import { useState, useEffect } from 'react'
import { User, GraduationCap, Wrench, Briefcase, FolderKanban, Award, FileText, Link2, Pencil, X, Save, UploadCloud } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import CircularProgress from '../components/CircularProgress.jsx'
import { studentNav } from '../data/navConfig.js'

export default function Profile() {
  const [profileData, setProfileData] = useState(() => {
    const stored = localStorage.getItem('talentforge_profile')
    if (stored) {
      try {
        return JSON.parse(stored)
      } catch (e) {
        console.error("Failed to parse profile data")
      }
    }
    return {
      name: 'Jane Student',
      title: 'Aspiring Java Developer',
      location: 'Coimbatore, India',
      email: 'jane.student@example.com',
      phone: '+91 98765 43210'
    }
  })
  
  const [sectionData, setSectionData] = useState({
    education: { degree: 'B.Tech CSE', year: '2026', institution: 'VIT Coimbatore' },
    skills: { tech: '9', soft: '5' },
    experience: { count: '1' },
    projects: { count: '3' },
    certifications: { count: '2' },
    resume: { filename: 'resume_v3.pdf' },
    social: { linkedin: 'connected', github: 'connected' }
  })
  
  const sections = [
    { id: 'personal', icon: User, title: 'Personal Details', desc: `${profileData.name}, ${profileData.email}, ${profileData.location}` },
    { id: 'education', icon: GraduationCap, title: 'Education', desc: `${sectionData.education.degree}, ${sectionData.education.year} — ${sectionData.education.institution}` },
    { id: 'skills', icon: Wrench, title: 'Skills', desc: `${sectionData.skills.tech} technical, ${sectionData.skills.soft} soft skills added` },
    { id: 'experience', icon: Briefcase, title: 'Experience', desc: `${sectionData.experience.count} internship(s) added` },
    { id: 'projects', icon: FolderKanban, title: 'Projects', desc: `${sectionData.projects.count} project(s) added` },
    { id: 'certifications', icon: Award, title: 'Certifications', desc: `${sectionData.certifications.count} certificate(s) earned` },
    { id: 'resume', icon: FileText, title: 'Resume', desc: `${sectionData.resume.filename} uploaded` },
    { id: 'social', icon: Link2, title: 'Social Links', desc: `LinkedIn: ${sectionData.social.linkedin}, GitHub: ${sectionData.social.github}` },
  ]

  const [activeModal, setActiveModal] = useState(null)
  
  const [formData, setFormData] = useState({})

  const handleEditClick = (sectionId) => {
    if (sectionId === 'personal') {
      setFormData(profileData)
    } else {
      setFormData(sectionData[sectionId])
    }
    setActiveModal(sectionId)
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (activeModal === 'personal') {
      setProfileData(formData)
      localStorage.setItem('talentforge_profile', JSON.stringify(formData))
    } else {
      setSectionData({ ...sectionData, [activeModal]: formData })
    }
    setActiveModal(null)
    
    // Dispatch a custom event so Topbar can update its initials without a full page reload
    window.dispatchEvent(new Event('profileUpdated'))
  }

  const renderFormContent = () => {
    switch (activeModal) {
      case 'personal':
        return (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input type="text" className="input-field" value={formData.name || ''} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Professional Title</label>
              <input type="text" className="input-field" value={formData.title || ''} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input type="email" className="input-field" value={formData.email || ''} onChange={(e) => setFormData({...formData, email: e.target.value})} />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
                <input type="tel" className="input-field" value={formData.phone || ''} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
              <input type="text" className="input-field" value={formData.location || ''} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </div>
          </>
        )
      case 'education':
        return (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Degree</label>
              <input type="text" className="input-field" value={formData.degree || ''} onChange={(e) => setFormData({...formData, degree: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Institution</label>
              <input type="text" className="input-field" value={formData.institution || ''} onChange={(e) => setFormData({...formData, institution: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Graduation Year</label>
              <input type="text" className="input-field" value={formData.year || ''} onChange={(e) => setFormData({...formData, year: e.target.value})} />
            </div>
          </>
        )
      case 'skills':
        return (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Technical Skills</label>
              <input type="number" className="input-field" value={formData.tech || ''} onChange={(e) => setFormData({...formData, tech: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Soft Skills</label>
              <input type="number" className="input-field" value={formData.soft || ''} onChange={(e) => setFormData({...formData, soft: e.target.value})} />
            </div>
          </>
        )
      case 'experience':
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Internships/Roles</label>
            <input type="number" className="input-field" value={formData.count || ''} onChange={(e) => setFormData({...formData, count: e.target.value})} />
          </div>
        )
      case 'projects':
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Projects</label>
            <input type="number" className="input-field" value={formData.count || ''} onChange={(e) => setFormData({...formData, count: e.target.value})} />
          </div>
        )
      case 'certifications':
        return (
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Certificates</label>
            <input type="number" className="input-field" value={formData.count || ''} onChange={(e) => setFormData({...formData, count: e.target.value})} />
          </div>
        )
      case 'resume':
        return (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-300 dark:border-white/10 rounded-xl2 p-8 text-center flex flex-col items-center justify-center">
              <UploadCloud size={32} className="text-primary-500 mb-2" />
              <p className="text-sm text-slate-500">Upload a new resume (PDF, DOCX)</p>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Simulate uploaded filename</label>
              <input type="text" className="input-field" value={formData.filename || ''} onChange={(e) => setFormData({...formData, filename: e.target.value})} />
            </div>
          </div>
        )
      case 'social':
        return (
          <>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">LinkedIn Status/URL</label>
              <input type="text" className="input-field" value={formData.linkedin || ''} onChange={(e) => setFormData({...formData, linkedin: e.target.value})} />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">GitHub Status/URL</label>
              <input type="text" className="input-field" value={formData.github || ''} onChange={(e) => setFormData({...formData, github: e.target.value})} />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Profile" avatarSeed="JS">
      <div className="card flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
        <CircularProgress value={85} size={140} sublabel="Profile complete" />
        <div className="text-center sm:text-left z-10">
          <h2 className="text-2xl font-heading font-bold">{profileData.name}</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">{profileData.title} · {profileData.location}</p>
          <button onClick={() => handleEditClick('personal')} className="btn-primary mt-4">
            <Pencil size={15} /> Edit profile
          </button>
        </div>
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -z-0"></div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        {sections.map((s) => (
          <div key={s.id} className="card card-hover flex items-start justify-between">
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-xl2 bg-brand-gradient-soft flex items-center justify-center text-primary-600 dark:text-primary-400 shrink-0">
                <s.icon size={18} />
              </div>
              <div>
                <p className="font-semibold text-sm">{s.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{s.desc}</p>
              </div>
            </div>
            <button onClick={() => handleEditClick(s.id)} className="p-2 text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-white/5">
              <Pencil size={15} />
            </button>
          </div>
        ))}
      </div>

      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in" onClick={() => setActiveModal(null)}>
          <div className="bg-white dark:bg-slate-900 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 dark:border-white/10 slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-white/5">
              <h3 className="font-heading font-semibold text-lg">
                Edit {sections.find(s => s.id === activeModal)?.title || 'Profile'}
              </h3>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <form id="edit-form" onSubmit={handleSave} className="space-y-4">
                {renderFormContent()}
              </form>
            </div>

            <div className="flex justify-end gap-3 p-4 border-t border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-slate-900/50">
              <button type="button" onClick={() => setActiveModal(null)} className="btn-secondary">Cancel</button>
              <button type="submit" form="edit-form" className="btn-primary">
                <Save size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  )
}
