import { School, TrendingUp, Target, Building2, Download } from 'lucide-react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { institutionNav } from '../data/navConfig.js'
import { placementStats } from '../data/mockData.js'

export default function InstitutionDashboard() {
  return (
    <DashboardShell items={institutionNav} roleLabel="Institution" title="Dashboard" avatarSeed="IN">
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard icon={School} label="Students" value="1,240" accent="primary" />
        <StatCard icon={TrendingUp} label="Placement %" value="78%" sub="+6% YoY" accent="success" />
        <StatCard icon={Target} label="Avg ATS Score" value="82%" accent="secondary" />
        <StatCard icon={Building2} label="Companies Visited" value="46" accent="primary" />
        <StatCard icon={TrendingUp} label="Interview Performance" value="79%" accent="warning" />
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
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
          <button className="btn-secondary w-full mt-4"><Download size={15} /> Export report</button>
        </div>
      </div>
    </DashboardShell>
  )
}
