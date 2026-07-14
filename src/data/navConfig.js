import {
  LayoutDashboard, FileSearch, Target, GitBranch, Map, Video, Briefcase,
  ClipboardList, Award, Bot, UserCircle, Settings, Users, ScanSearch,
  ListChecks, CalendarDays, BarChart3, School, Shield,
} from 'lucide-react'

export const studentNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/student/dashboard' },
  { label: 'Resume Analyzer', icon: FileSearch, to: '/student/resume-analyzer' },
  { label: 'ATS Score', icon: Target, to: '/student/ats-score' },
  { label: 'Skill Gap Analysis', icon: GitBranch, to: '/student/skill-gap' },
  { label: 'Learning Roadmap', icon: Map, to: '/student/roadmap' },
  { label: 'Mock Interview', icon: Video, to: '/student/mock-interview' },
  { label: 'Jobs', icon: Briefcase, to: '/student/jobs' },
  { label: 'Applications', icon: ClipboardList, to: '/student/applications' },
  { label: 'Certificates', icon: Award, to: '/student/certificates' },
  { label: 'AI Career Coach', icon: Bot, to: '/student/career-coach' },
  { label: 'Profile', icon: UserCircle, to: '/profile' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export const recruiterNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/recruiter/dashboard' },
  { label: 'Jobs', icon: Briefcase, to: '/recruiter/jobs' },
  { label: 'Applicants', icon: Users, to: '/recruiter/applicants' },
  { label: 'Resume Screening', icon: ScanSearch, to: '/recruiter/screening' },
  { label: 'AI Ranking', icon: ListChecks, to: '/recruiter/screening' },
  { label: 'Interview Schedule', icon: CalendarDays, to: '/recruiter/interviews' },
  { label: 'Reports', icon: BarChart3, to: '/recruiter/reports' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export const institutionNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/institution/dashboard' },
  { label: 'Students', icon: School, to: '/institution/dashboard' },
  { label: 'Placements', icon: BarChart3, to: '/institution/dashboard' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]

export const adminNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Users', icon: Users, to: '/admin/dashboard' },
  { label: 'AI Usage', icon: Shield, to: '/admin/dashboard' },
  { label: 'Settings', icon: Settings, to: '/settings' },
]
