import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'

import StudentDashboard from './pages/StudentDashboard.jsx'
import ResumeAnalyzer from './pages/ResumeAnalyzer.jsx'
import ATSScore from './pages/ATSScore.jsx'
import SkillGap from './pages/SkillGap.jsx'
import LearningRoadmap from './pages/LearningRoadmap.jsx'
import MockInterview from './pages/MockInterview.jsx'
import CareerCoach from './pages/CareerCoach.jsx'
import JobPortal from './pages/JobPortal.jsx'
import Applications from './pages/Applications.jsx'
import Certificates from './pages/Certificates.jsx'

import RecruiterDashboard from './pages/RecruiterDashboard.jsx'
import RecruiterJobs from './pages/RecruiterJobs.jsx'
import Applicants from './pages/Applicants.jsx'
import CandidateScreening from './pages/CandidateScreening.jsx'
import InterviewSchedule from './pages/InterviewSchedule.jsx'
import RecruiterReports from './pages/RecruiterReports.jsx'

import InstitutionDashboard from './pages/InstitutionDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

import Profile from './pages/Profile.jsx'
import Notifications from './pages/Notifications.jsx'
import Settings from './pages/Settings.jsx'
import NotFound from './pages/NotFound.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

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
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
