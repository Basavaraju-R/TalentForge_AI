// Mock data powering every dashboard in the prototype.
// Swap these for real API calls to your Spring Boot backend.

export const skillGrowth = [
  { month: 'Jan', score: 42 },
  { month: 'Feb', score: 48 },
  { month: 'Mar', score: 55 },
  { month: 'Apr', score: 61 },
  { month: 'May', score: 68 },
  { month: 'Jun', score: 76 },
  { month: 'Jul', score: 83 },
]

export const weeklyProgress = [
  { day: 'Mon', hours: 1.5 },
  { day: 'Tue', hours: 2.2 },
  { day: 'Wed', hours: 1.1 },
  { day: 'Thu', hours: 2.8 },
  { day: 'Fri', hours: 1.9 },
  { day: 'Sat', hours: 3.4 },
  { day: 'Sun', hours: 2.0 },
]

export const interviewPerformance = [
  { round: 'R1', communication: 62, technical: 58, confidence: 55 },
  { round: 'R2', communication: 70, technical: 66, confidence: 64 },
  { round: 'R3', communication: 78, technical: 74, confidence: 72 },
  { round: 'R4', communication: 85, technical: 81, confidence: 80 },
]

export const applicationStatus = [
  { name: 'Applied', value: 24, color: '#5B8DEF' },
  { name: 'Shortlisted', value: 9, color: '#7C3AED' },
  { name: 'Interviewing', value: 5, color: '#F59E0B' },
  { name: 'Offered', value: 2, color: '#22C55E' },
]

export const atsSections = [
  { label: 'Formatting', score: 92 },
  { label: 'Keywords', score: 74 },
  { label: 'Experience', score: 88 },
  { label: 'Projects', score: 81 },
  { label: 'Skills', score: 90 },
  { label: 'Education', score: 95 },
]

export const atsRecommendations = [
  { text: 'Add measurable outcomes to your last two internship bullet points.', priority: 'High' },
  { text: 'Include "REST API" and "CI/CD" — both appear in 80% of matched roles.', priority: 'High' },
  { text: 'Trim the objective statement to two lines.', priority: 'Medium' },
  { text: 'Use a consistent date format across all sections.', priority: 'Low' },
]

export const currentSkills = ['HTML/CSS', 'JavaScript', 'Python', 'Git', 'MySQL basics', 'REST APIs']
export const requiredSkills = ['Java', 'Spring Boot', 'Advanced SQL', 'React', 'Docker', 'System Design']
export const gapRecommendations = [
  { skill: 'Java', weeks: 3, progress: 40 },
  { skill: 'Spring Boot', weeks: 4, progress: 15 },
  { skill: 'SQL', weeks: 2, progress: 65 },
  { skill: 'React', weeks: 3, progress: 30 },
  { skill: 'Docker', weeks: 2, progress: 5 },
]

export const roadmap = [
  {
    level: 'Beginner',
    modules: [
      { course: 'Java Fundamentals', duration: '2 weeks', difficulty: 'Easy', progress: 100, certificate: true },
      { course: 'SQL Essentials', duration: '1.5 weeks', difficulty: 'Easy', progress: 100, certificate: true },
    ],
  },
  {
    level: 'Intermediate',
    modules: [
      { course: 'Spring Boot in Practice', duration: '3 weeks', difficulty: 'Medium', progress: 55, certificate: false },
      { course: 'React for Backend Devs', duration: '2.5 weeks', difficulty: 'Medium', progress: 30, certificate: false },
    ],
  },
  {
    level: 'Advanced',
    modules: [
      { course: 'System Design Patterns', duration: '4 weeks', difficulty: 'Hard', progress: 0, certificate: false },
      { course: 'Docker & Kubernetes', duration: '3 weeks', difficulty: 'Hard', progress: 0, certificate: false },
    ],
  },
]

export const jobs = [
  { id: 1, company: 'Nexora Labs', logo: '🟦', title: 'Frontend Engineer', salary: '₹8–12 LPA', location: 'Bengaluru', experience: '0–2 yrs', remote: true, match: 92 },
  { id: 2, company: 'Vertex Systems', logo: '🟪', title: 'Java Developer', salary: '₹6–10 LPA', location: 'Hyderabad', experience: '0–1 yrs', remote: false, match: 87 },
  { id: 3, company: 'Cloudframe', logo: '🟩', title: 'Full Stack Developer', salary: '₹9–14 LPA', location: 'Pune', experience: '1–3 yrs', remote: true, match: 81 },
  { id: 4, company: 'Datalyst', logo: '🟧', title: 'Data Analyst', salary: '₹7–11 LPA', location: 'Chennai', experience: '0–2 yrs', remote: false, match: 76 },
  { id: 5, company: 'Northbridge AI', logo: '🟥', title: 'ML Intern', salary: '₹25k/mo', location: 'Remote', experience: '0 yrs', remote: true, match: 70 },
  { id: 6, company: 'Fintrail', logo: '🟨', title: 'Backend Engineer', salary: '₹10–15 LPA', location: 'Coimbatore', experience: '1–2 yrs', remote: false, match: 68 },
]

export const hiringFunnel = [
  { stage: 'Applied', value: 480 },
  { stage: 'Screened', value: 260 },
  { stage: 'Interviewed', value: 110 },
  { stage: 'Offered', value: 38 },
  { stage: 'Hired', value: 24 },
]

export const applicationsTimeline = [
  { week: 'W1', applications: 60 },
  { week: 'W2', applications: 95 },
  { week: 'W3', applications: 80 },
  { week: 'W4', applications: 120 },
  { week: 'W5', applications: 105 },
  { week: 'W6', applications: 140 },
]

export const topSkillsDemand = [
  { skill: 'React', demand: 88 },
  { skill: 'Java', demand: 76 },
  { skill: 'SQL', demand: 70 },
  { skill: 'Python', demand: 65 },
  { skill: 'AWS', demand: 54 },
]

export const candidateSources = [
  { name: 'Direct Apply', value: 42, color: '#2563EB' },
  { name: 'Campus Drive', value: 30, color: '#7C3AED' },
  { name: 'Referral', value: 18, color: '#22C55E' },
  { name: 'Job Board', value: 10, color: '#F59E0B' },
]

export const candidates = [
  { id: 1, name: 'Ananya Rao', ats: 91, skillMatch: 88, resume: 90, experience: '1 yr', interview: 85, recommendation: 'Strong Fit' },
  { id: 2, name: 'Karthik Iyer', ats: 84, skillMatch: 79, resume: 82, experience: '0 yr', interview: 74, recommendation: 'Good Fit' },
  { id: 3, name: 'Meera Nair', ats: 76, skillMatch: 70, resume: 75, experience: '2 yrs', interview: 68, recommendation: 'Consider' },
  { id: 4, name: 'Rahul Verma', ats: 65, skillMatch: 60, resume: 68, experience: '0 yr', interview: 55, recommendation: 'Weak Fit' },
  { id: 5, name: 'Divya Shah', ats: 88, skillMatch: 85, resume: 89, experience: '1 yr', interview: 80, recommendation: 'Strong Fit' },
]

export const userGrowth = [
  { month: 'Jan', users: 1200 },
  { month: 'Feb', users: 1850 },
  { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3100 },
  { month: 'May', users: 4200 },
  { month: 'Jun', users: 5400 },
  { month: 'Jul', users: 6800 },
]

export const dailyActiveUsers = [
  { day: 'Mon', dau: 980 },
  { day: 'Tue', dau: 1120 },
  { day: 'Wed', dau: 1050 },
  { day: 'Thu', dau: 1230 },
  { day: 'Fri', dau: 1180 },
  { day: 'Sat', dau: 760 },
  { day: 'Sun', dau: 690 },
]

export const notifications = [
  { id: 1, type: 'Interview Reminder', text: 'Mock interview with AI Coach starts in 30 minutes.', time: '30m ago', unread: true },
  { id: 2, type: 'New Job', text: 'Frontend Engineer at Nexora Labs matches your profile (92%).', time: '2h ago', unread: true },
  { id: 3, type: 'Resume Improvement', text: 'Your ATS score improved from 81% to 87%.', time: '5h ago', unread: false },
  { id: 4, type: 'Recruiter Viewed Profile', text: 'Vertex Systems viewed your profile.', time: '1d ago', unread: false },
  { id: 5, type: 'Skill Recommendation', text: 'Learning Docker could raise your match score by 8%.', time: '2d ago', unread: false },
]

export const placementStats = [
  { dept: 'CSE', placed: 92 },
  { dept: 'ECE', placed: 78 },
  { dept: 'Mech', placed: 61 },
  { dept: 'IT', placed: 88 },
  { dept: 'Civil', placed: 54 },
]

export const coachSuggestions = [
  'Which career fits me?',
  'Improve my resume.',
  'Best roadmap for Java Developer.',
  'How to crack interviews?',
  'Compare Software Engineer vs Data Analyst.',
]
