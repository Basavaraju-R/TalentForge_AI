import { Users, FileText, CheckCircle, Video, Briefcase, TrendingUp } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  LineChart, Line, PieChart, Pie, Cell, Legend, Funnel, FunnelChart, LabelList,
} from 'recharts'
import DashboardShell from '../layout/DashboardShell.jsx'
import StatCard from '../components/StatCard.jsx'
import { recruiterNav } from '../data/navConfig.js'
import { hiringFunnel, applicationsTimeline, topSkillsDemand, candidateSources } from '../data/mockData.js'

export default function RecruiterDashboard() {
  const navigate = useNavigate()

  return (
    <DashboardShell items={recruiterNav} roleLabel="Recruiter" title="Dashboard" avatarSeed="RS">
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5">
        <StatCard icon={Briefcase} label="Active Jobs" value="14" accent="primary" onClick={() => navigate('/recruiter/jobs')} />
        <StatCard icon={FileText} label="Applications" value="480" sub="+62 this week" accent="secondary" onClick={() => navigate('/recruiter/applicants')} />
        <StatCard icon={Users} label="Shortlisted" value="96" accent="primary" onClick={() => navigate('/recruiter/screening')} />
        <StatCard icon={Video} label="Interviews" value="42" accent="warning" onClick={() => navigate('/recruiter/interviews')} />
        <StatCard icon={CheckCircle} label="Hired" value="24" sub="This quarter" accent="success" onClick={() => navigate('/recruiter/reports')} />
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Hiring Funnel</h3>
          <ResponsiveContainer width="100%" height={260}>
            <FunnelChart>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Funnel dataKey="value" data={hiringFunnel} isAnimationActive>
                <LabelList position="right" dataKey="stage" fill="currentColor" className="fill-slate-600 dark:fill-slate-300" fontSize={12} />
                {hiringFunnel.map((_, i) => (
                  <Cell key={i} fill={['#2563EB', '#4F6FE0', '#7C3AED', '#9B5CF0', '#22C55E'][i]} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Applications Timeline</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={applicationsTimeline}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" vertical={false} />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Line type="monotone" dataKey="applications" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Top Skills in Demand</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topSkillsDemand} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-slate-200 dark:stroke-white/10" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="skill" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={70} />
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Bar dataKey="demand" fill="#7C3AED" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-heading font-semibold mb-4">Candidate Sources</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={candidateSources} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {candidateSources.map((s) => <Cell key={s.name} fill={s.color} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DashboardShell>
  )
}
