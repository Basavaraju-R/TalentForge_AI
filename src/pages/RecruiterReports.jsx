import { Download } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import DashboardShell from '../layout/DashboardShell.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { applicationsTimeline } from '../data/mockData.js'

export default function RecruiterReports() {
  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Reports" avatarSeed="RS">
      <div className="card flex items-center justify-between">
        <div>
          <h3 className="font-heading font-semibold">Monthly Hiring Report</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Jul 2026 — applications, interviews, and offers</p>
        </div>
        <button className="btn-secondary"><Download size={15} /> Export PDF</button>
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
