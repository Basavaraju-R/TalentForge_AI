import { Routes, Route } from 'react-router-dom'
import { useState, Suspense, lazy } from 'react'
import { Loader2 } from 'lucide-react'

import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

// Lazy loaded pages to optimize performance
const StudentDashboard = lazy(() => import('./pages/StudentDashboard.jsx'))
const ResumeAnalyzer = lazy(() => import('./pages/ResumeAnalyzer.jsx'))
const ATSScore = lazy(() => import('./pages/ATSScore.jsx'))
const SkillGap = lazy(() => import('./pages/SkillGap.jsx'))
const LearningRoadmap = lazy(() => import('./pages/LearningRoadmap.jsx'))
const MockInterview = lazy(() => import('./pages/MockInterview.jsx'))
const CareerCoach = lazy(() => import('./pages/CareerCoach.jsx'))
const JobPortal = lazy(() => import('./pages/JobPortal.jsx'))
const Applications = lazy(() => import('./pages/Applications.jsx'))
const Certificates = lazy(() => import('./pages/Certificates.jsx'))

const RecruiterDashboard = lazy(() => import('./pages/RecruiterDashboard.jsx'))
const RecruiterJobs = lazy(() => import('./pages/RecruiterJobs.jsx'))
const Applicants = lazy(() => import('./pages/Applicants.jsx'))
const CandidateScreening = lazy(() => import('./pages/CandidateScreening.jsx'))
const InterviewSchedule = lazy(() => import('./pages/InterviewSchedule.jsx'))
const RecruiterReports = lazy(() => import('./pages/RecruiterReports.jsx'))

const InstitutionDashboard = lazy(() => import('./pages/InstitutionDashboard.jsx'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard.jsx'))

const Profile = lazy(() => import('./pages/Profile.jsx'))
const Notifications = lazy(() => import('./pages/Notifications.jsx'))
const Settings = lazy(() => import('./pages/Settings.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))

const About = lazy(() => import('./pages/About.jsx'))
const Pricing = lazy(() => import('./pages/Pricing.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Privacy = lazy(() => import('./pages/Privacy.jsx'))

import ProtectedRoute from './components/ProtectedRoute.jsx'
import SplashScreen from './components/SplashScreen.jsx'
import ChatbotWidget from './components/ChatbotWidget.jsx'

const FallbackLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
    <Loader2 size={48} className="animate-spin text-brand-500" />
  </div>
)

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      <ChatbotWidget />
      <Suspense fallback={<FallbackLoader />}>
        <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/about" element={<About />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy" element={<Privacy />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/student/ats-score" element={<ATSScore />} />
        <Route path="/student/skill-gap" element={<SkillGap />} />
        <Route path="/student/roadmap" element={<LearningRoadmap />} />
        <Route path="/student/mock-interview" element={<MockInterview />} />
        <Route path="/student/career-coach" element={<CareerCoach />} />
        <Route path="/student/jobs" element={<JobPortal />} />
        <Route path="/student/applications" element={<Applications />} />
        <Route path="/student/certificates" element={<Certificates />} />

        <Route path="/recruiter/dashboard" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs" element={<RecruiterJobs />} />
        <Route path="/recruiter/applicants" element={<Applicants />} />
        <Route path="/recruiter/screening" element={<CandidateScreening />} />
        <Route path="/recruiter/interviews" element={<InterviewSchedule />} />
        <Route path="/recruiter/reports" element={<RecruiterReports />} />

        <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Suspense>
    </>
  )
}


