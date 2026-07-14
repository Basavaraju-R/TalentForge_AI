import { School, TrendingUp, Target, Building2, Download, FileDown } from 'lucide-react'
import { useState } from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { jsPDF } from 'jspdf'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { institutionNav } from '../data/navConfig.js'
import { placementStats, topSkillsDemand } from '../data/mockData.js'

export default function InstitutionDashboard() {
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = () => {
    setIsExporting(true)
    
    setTimeout(() => {
      try {
        const doc = new jsPDF()
        
        // Header
        doc.setFontSize(24)
        doc.setTextColor(37, 99, 235)
        doc.text('TalentForge AI', 20, 22)
        
        doc.setFontSize(16)
        doc.setTextColor(15, 23, 42)
        doc.text('Institution Audit & Performance Report', 20, 35)
        
        doc.setFontSize(10)
        doc.setTextColor(100, 116, 139)
        doc.text('Report ID: TF-INST-8832-A', 20, 45)
        doc.text('Generated: ' + new Date().toLocaleString(), 20, 50)
        
        doc.setDrawColor(226, 232, 240)
        doc.line(20, 56, 190, 56)
        
        // Executive Summary
        doc.setFontSize(14)
        doc.setTextColor(15, 23, 42)
        doc.text('1. Executive Overview', 20, 68)
        
        doc.setFontSize(11)
        doc.setTextColor(51, 65, 85)
        doc.text('Total Active Students:', 20, 78)
        doc.text('1,240', 80, 78)
        doc.text('Overall Placement Rate:', 20, 86)
        doc.text('78% (+6% YoY)', 80, 86)
        doc.text('Average ATS Score:', 20, 94)
        doc.text('82%', 80, 94)
        doc.text('Total Companies Visited:', 20, 102)
        doc.text('46 (This Quarter)', 80, 102)

        // Department Placement Table
        doc.setFontSize(14)
        doc.setTextColor(15, 23, 42)
        doc.text('2. Departmental Placement Matrix', 20, 122)
        
        const tableY = 130
        doc.setFontSize(10)
        doc.setTextColor(100, 116, 139)
        doc.text('Department', 25, tableY)
        doc.text('Placement Rate', 85, tableY)
        doc.text('Status', 145, tableY)
        doc.line(20, tableY + 3, 190, tableY + 3)

        doc.setTextColor(51, 65, 85)
        let cY = tableY + 10
        placementStats.forEach((stat) => {
          doc.text(`${stat.dept} Engineering`, 25, cY)
          doc.text(`${stat.placed}%`, 85, cY)
          doc.text(stat.placed > 75 ? 'Excellent' : 'Needs Focus', 145, cY)
          cY += 8
        })
        
        doc.line(20, cY, 190, cY)

        // Market Alignment & Recruiters
        const bottomSectionY = cY + 15
        
        doc.setFontSize(14)
        doc.setTextColor(15, 23, 42)
        doc.text('3. Industry Alignment', 20, bottomSectionY)
        doc.text('4. Recent Recruiters', 110, bottomSectionY)
        
        doc.setFontSize(10)
        doc.setTextColor(51, 65, 85)
        
        let sY = bottomSectionY + 10
        topSkillsDemand.forEach((skill, idx) => {
          doc.text(`${idx + 1}. ${skill.skill} (Demand: ${skill.demand}%)`, 20, sY)
          sY += 7
        })

        let rY = bottomSectionY + 10
        const recruiters = ['Nexora Labs (Tech)', 'Vertex Systems (Finance)', 'Cloudframe (Cloud)', 'Datalyst (Data)']
        recruiters.forEach((r) => {
          doc.text(`• ${r}`, 110, rY)
          rY += 7
        })
        
        // Footer
        doc.setFontSize(9)
        doc.setTextColor(148, 163, 184)
        doc.text('Confidential - TalentForge AI Analytics Engine', 20, 285)

        doc.save('Institution_Audit_Report.pdf')
      } catch (error) {
        console.error('Error generating PDF:', error)
        alert('Failed to generate PDF.')
      } finally {
        setIsExporting(false)
      }
    }, 800)
  }

  return (
    <DashboardShell items={institutionNav} roleLabel="Institution" title="Dashboard" avatarSeed="IN">
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard icon={School} label="Students" value="1,240" accent="primary" />
        <StatCard icon={TrendingUp} label="Placement %" value="78%" sub="+6% YoY" accent="success" />
        <StatCard icon={Target} label="Avg ATS Score" value="82%" accent="secondary" />
        <StatCard icon={Building2} label="Companies Visited" value="46" accent="primary" />
        <StatCard icon={TrendingUp} label="Interview Performance" value="79%" accent="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5 mt-5">
        <div className="lg:col-span-2 card">
          <h3 className="font-heading font-semibold mb-4">Department Performance</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={placementStats}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="dept" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Bar dataKey="placed" fill="#2563EB" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card flex flex-col">
          <h3 className="font-heading font-semibold mb-4">Recruiter Visits</h3>
          <div className="space-y-3 flex-1">
            {['Nexora Labs', 'Vertex Systems', 'Cloudframe', 'Datalyst'].map((c) => (
              <div key={c} className="flex items-center justify-between text-sm p-3 rounded-xl2 border border-slate-200 dark:border-white/10">
                <span className="font-medium">{c}</span>
                <span className="text-slate-500 dark:text-slate-400">Visited this month</span>
              </div>
            ))}
          </div>
          <button 
            onClick={handleExportPDF} 
            disabled={isExporting}
            className="btn-secondary w-full mt-4 flex items-center justify-center gap-2"
          >
            {isExporting ? (
              <><div className="h-4 w-4 rounded-full border-2 border-primary-500/30 border-t-primary-500 animate-spin" /> Exporting...</>
            ) : (
              <><FileDown size={15} /> Export report</>
            )}
          </button>
        </div>
      </div>
    </DashboardShell>
  )
}
