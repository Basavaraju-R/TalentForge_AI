import { Download, FileDown } from 'lucide-react'
import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { jsPDF } from 'jspdf'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { applicationsTimeline, hiringFunnel, topSkillsDemand, candidates } from '../data/mockData.js'

export default function RecruiterReports() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = () => {
    setIsExporting(true)
    
    setTimeout(() => {
      try {
        const doc = new jsPDF()
        
        // Header
        doc.setFontSize(22)
        doc.setTextColor(37, 99, 235) // primary-500
        doc.text('TalentForge AI', 20, 20)
        
        doc.setFontSize(16)
        doc.setTextColor(15, 23, 42) // slate-900
        doc.text('Comprehensive Hiring Report', 20, 35)
        
        doc.setFontSize(11)
        doc.setTextColor(100, 116, 139) // slate-500
        doc.text('Generated on: ' + new Date().toLocaleDateString(), 20, 45)
        
        doc.setDrawColor(226, 232, 240)
        doc.line(20, 52, 190, 52)
        
        // Hiring Funnel & Skills (Side by side)
        doc.setFontSize(14)
        doc.setTextColor(15, 23, 42)
        doc.text('Hiring Funnel', 20, 65)
        doc.text('Top Skills in Demand', 110, 65)
        
        doc.setFontSize(11)
        doc.setTextColor(51, 65, 85)
        let fY = 75
        hiringFunnel.forEach(stage => {
          doc.text(`${stage.stage}: ${stage.value}`, 20, fY)
          fY += 8
        })

        let sY = 75
        topSkillsDemand.forEach(skill => {
           doc.text(`${skill.skill}: ${skill.demand}% match rate`, 110, sY)
           sY += 8
        })
        
        doc.line(20, Math.max(fY, sY) + 5, 190, Math.max(fY, sY) + 5)

        // Candidate Database Table
        const tableStart = Math.max(fY, sY) + 20
        doc.setFontSize(14)
        doc.setTextColor(15, 23, 42)
        doc.text('Candidate Pipeline (Real-time)', 20, tableStart)
        
        doc.setFontSize(10)
        doc.setTextColor(100, 116, 139)
        const thead = tableStart + 10
        doc.text('Candidate Name', 20, thead)
        doc.text('ATS Score', 75, thead)
        doc.text('Skill Match', 105, thead)
        doc.text('Interview', 135, thead)
        doc.text('AI Verdict', 165, thead)
        doc.line(20, thead + 3, 190, thead + 3)

        doc.setTextColor(51, 65, 85)
        let cY = thead + 10
        candidates.forEach(c => {
           doc.text(c.name, 20, cY)
           doc.text(`${c.ats}%`, 75, cY)
           doc.text(`${c.skillMatch}%`, 105, cY)
           doc.text(`${c.interview}%`, 135, cY)
           doc.text(c.recommendation, 165, cY)
           cY += 9
        })
        
        // Footer
        doc.setFontSize(10)
        doc.setTextColor(148, 163, 184)
        doc.text('Confidential - TalentForge AI Internal Data', 20, 285)

        doc.save('Comprehensive_Hiring_Report.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Failed to generate PDF.')
      } finally {
        setIsExporting(false)
      }
    }, 600)
  }

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Reports" avatarSeed="RS">
      <div className="card flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-heading font-semibold text-lg">Monthly Hiring Report</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Jul 2026 — applications, interviews, and offers</p>
        </div>
        <button 
          onClick={handleExportPDF} 
          disabled={isExporting}
          className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
        >
          {isExporting ? (
            <><div className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" /> Exporting...</>
          ) : (
            <><FileDown size={16} /> Export PDF</>
          )}
        </button>
      </div>
      <div className="card">
        <h3 className="font-heading font-semibold mb-4">Applications by Week</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={applicationsTimeline}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
            <Bar dataKey="applications" fill="#2563EB" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </DashboardShell>
  )
}
