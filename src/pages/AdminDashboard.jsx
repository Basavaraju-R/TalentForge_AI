import { Users, Building2, School, IndianRupee, Cpu } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { adminNav } from '../data/navConfig.js'
import { userGrowth, dailyActiveUsers } from '../data/mockData.js'

export default function AdminDashboard() {
  return (
    <DashboardShell items={adminNav} roleLabel="Admin" title="Dashboard" avatarSeed="AD">
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard icon={Users} label="Total Users" value="6,840" sub="+1,400 this month" accent="primary" />
        <StatCard icon={School} label="Students" value="5,120" accent="secondary" />
        <StatCard icon={Building2} label="Recruiters" value="1,480" accent="primary" />
        <StatCard icon={IndianRupee} label="Revenue" value="₹18.4L" sub="+12% MoM" accent="success" />
        <StatCard icon={Cpu} label="AI Usage" value="92k calls" accent="warning" />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-heading font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={userGrowth}>
              <defs>
                <linearGradient id="userGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.5} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Area type="monotone" dataKey="users" stroke="#2563EB" strokeWidth={2.5} fill="url(#userGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Daily Active Users</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={dailyActiveUsers}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Bar dataKey="dau" fill="#7C3AED" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardShell>
  )
}
