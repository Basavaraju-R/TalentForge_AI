# TalentForge AI — Career Intelligence & Hiring Platform

A React frontend prototype for TalentForge AI, built from the design brief: a premium,
glassmorphic SaaS UI for resume analysis, ATS scoring, skill gap detection, mock
interviews, AI career coaching, job matching, and recruiter/institution/admin analytics.

This is a **frontend-only prototype** — every screen is fully built and interactive,
wired to realistic mock data (`src/data/mockData.js`) so the whole product feels alive
without a backend. It's designed to plug into a Spring Boot + MySQL API later: swap the
mock data calls for `fetch`/`axios` calls to your endpoints.

## Tech stack

- React 18 + Vite
- Tailwind CSS (custom design tokens matching the brief's palette/typography)
- React Router (client-side routing across every page)
- Recharts (all analytics charts)
- lucide-react (icon set)
- Dark mode / light mode via a React context (persisted to `localStorage`)

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## What's included

**Public**
- Landing page (hero, features, student/recruiter/institution sections, pricing, about)
- Login / Signup with role selection (Student, Recruiter, Institution)

**Student workspace** (`/student/*`)
- Dashboard with stat cards + 4 charts (skill growth, weekly progress, interview
  performance, application status)
- Resume Analyzer (drag & drop upload, AI analysis cards, suggestions)
- ATS Score (circular score, section breakdown, prioritized recommendations)
- Skill Gap Analysis (current vs required skills, AI roadmap recommendations)
- Learning Roadmap (timeline: Beginner → Intermediate → Advanced)
- AI Mock Interview (chat-style interview + post-interview feedback dashboard)
- AI Career Coach (ChatGPT-style interface with suggested questions)
- Job Portal (filterable job cards with match scores)
- Applications tracker, Certificates

**Recruiter workspace** (`/recruiter/*`)
- Dashboard (hiring funnel, applications timeline, top skills, candidate sources)
- Jobs, Applicants, Candidate Screening (AI ranking table), Interview Schedule, Reports

**Institution workspace** (`/institution/dashboard`)
- Placement %, department performance, recruiter visits

**Admin workspace** (`/admin/dashboard`)
- User growth, daily active users, platform-wide stats

**Shared**
- Profile (completion ring, editable sections)
- Notifications center
- Settings (profile, password, theme, language, notifications, privacy)

## Connecting a real backend

Replace the arrays exported from `src/data/mockData.js` with API calls (e.g. React Query
or plain `fetch`) to your Spring Boot REST endpoints backed by MySQL. Page components
already consume this data by shape, so most pages only need their data source swapped —
no UI rewiring required.

## Design tokens

Colors, fonts, and radii live in `tailwind.config.js` and mirror the brief exactly:
Primary `#2563EB`, Secondary `#7C3AED`, Success `#22C55E`, Warning `#F59E0B`,
Danger `#EF4444`, 16px rounded corners, Poppins headings / Inter body.
