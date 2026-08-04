import { useState } from 'react'
import { ArrowRight, CheckCircle2, Circle, Sparkles, Loader2, Target, TrendingUp, X, Plus } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'

const roleData = {
  "Java Developer": {
    requiredSkills: ['Java', 'Spring Boot', 'Advanced SQL', 'React', 'Docker', 'System Design'],
    gapRecommendations: [
      { skill: 'Java', weeks: 3, progress: 40 },
      { skill: 'Spring Boot', weeks: 4, progress: 15 },
      { skill: 'SQL', weeks: 2, progress: 65 },
      { skill: 'React', weeks: 3, progress: 30 },
      { skill: 'Docker', weeks: 2, progress: 5 },
    ],
    time: "10 weeks"
  },
  "Frontend Developer": {
    requiredSkills: ['React', 'TypeScript', 'Tailwind CSS', 'Redux', 'Jest', 'Web Performance'],
    gapRecommendations: [
      { skill: 'TypeScript', weeks: 3, progress: 20 },
      { skill: 'React', weeks: 2, progress: 70 },
      { skill: 'Tailwind CSS', weeks: 1, progress: 85 },
      { skill: 'Jest', weeks: 2, progress: 10 },
      { skill: 'Redux', weeks: 2, progress: 40 },
    ],
    time: "8 weeks"
  },
  "Data Scientist": {
    requiredSkills: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'TensorFlow', 'Data Viz'],
    gapRecommendations: [
      { skill: 'Python', weeks: 1, progress: 90 },
      { skill: 'Machine Learning', weeks: 6, progress: 15 },
      { skill: 'TensorFlow', weeks: 4, progress: 5 },
      { skill: 'Pandas', weeks: 2, progress: 50 },
      { skill: 'SQL', weeks: 1, progress: 85 },
    ],
    time: "14 weeks"
  }
}

export default function SkillGap() {
  const [selectedRole, setSelectedRole] = useState("Java Developer")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [mySkills, setMySkills] = useState(['HTML/CSS', 'JavaScript', 'Python', 'Git', 'MySQL basics', 'REST APIs']);
  const [newSkill, setNewSkill] = useState('');

  const calculateGap = (role, currentSkillsList) => {
    const roleReqs = roleData[role];
    let totalWeeks = 0;
    const computedGaps = roleReqs.gapRecommendations.map(rec => {
      // Match if the user's current skills include the required skill (case-insensitive)
      const hasSkill = currentSkillsList.some(s => s.toLowerCase().includes(rec.skill.toLowerCase()) || rec.skill.toLowerCase().includes(s.toLowerCase()));
      const progress = hasSkill ? 100 : rec.progress;
      const weeks = hasSkill ? 0 : rec.weeks;
      totalWeeks += weeks;
      return { ...rec, progress, weeks };
    });
    
    return {
      requiredSkills: roleReqs.requiredSkills,
      gapRecommendations: computedGaps,
      time: `${totalWeeks} weeks`
    };
  }

  const [data, setData] = useState(() => calculateGap("Java Developer", mySkills));

  const handleRoleChange = (e) => {
    const role = e.target.value;
    setSelectedRole(role);
    setIsAnalyzing(true);
    setTimeout(() => {
      setData(calculateGap(role, mySkills));
      setIsAnalyzing(false);
    }, 1200);
  }

  const addSkill = (e) => {
    e.preventDefault();
    if (!newSkill.trim()) return;
    
    // Prevent duplicates
    if (mySkills.some(s => s.toLowerCase() === newSkill.trim().toLowerCase())) {
      setNewSkill('');
      return;
    }

    const updatedSkills = [...mySkills, newSkill.trim()];
    setMySkills(updatedSkills);
    setNewSkill('');
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setData(calculateGap(selectedRole, updatedSkills));
      setIsAnalyzing(false);
    }, 1200);
  }
  
  const removeSkill = (skillToRemove) => {
    const updatedSkills = mySkills.filter(s => s !== skillToRemove);
    setMySkills(updatedSkills);
    
    setIsAnalyzing(true);
    setTimeout(() => {
      setData(calculateGap(selectedRole, updatedSkills));
      setIsAnalyzing(false);
    }, 1200);
  }

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Skill Gap Analysis" avatarSeed="JS">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-in slide-in-from-top-4">
        <div>
          <h2 className="text-lg font-heading font-bold flex items-center gap-2">
            <Target size={20} className="text-primary-500" /> Target Role
          </h2>
          <p className="text-sm text-slate-500 mt-1">Select your dream role to let our AI analyze your skill gaps.</p>
        </div>
        <select 
          value={selectedRole}
          onChange={handleRoleChange}
          className="px-4 py-3 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-primary-500 cursor-pointer min-w-[200px] outline-none"
        >
          {Object.keys(roleData).map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-5 gap-6 items-stretch mb-8">
        <div className="lg:col-span-2 card flex flex-col">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-success" /> Current Skills
          </h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {mySkills.map((s) => (
              <span key={s} className="badge bg-success/10 text-success pr-1.5 flex items-center gap-1 group">
                {s} 
                <button onClick={() => removeSkill(s)} className="p-0.5 rounded-full hover:bg-success/20 transition-colors">
                  <X size={12} className="opacity-60 group-hover:opacity-100" />
                </button>
              </span>
            ))}
          </div>
          <form onSubmit={addSkill} className="mt-auto relative">
            <input 
              type="text" 
              value={newSkill}
              onChange={e => setNewSkill(e.target.value)}
              placeholder="Add a skill..." 
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:border-success/50 transition-colors"
            />
            <button type="submit" disabled={!newSkill.trim()} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-success disabled:opacity-50">
              <Plus size={16} />
            </button>
          </form>
        </div>

        <div className="lg:col-span-1 flex items-center justify-center py-4 lg:py-0">
          <div className={`h-14 w-14 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg shadow-primary-500/30 transition-transform ${isAnalyzing ? 'animate-spin' : ''}`}>
            {isAnalyzing ? <Loader2 size={22} className="animate-spin" /> : <ArrowRight size={22} />}
          </div>
        </div>

        <div className="lg:col-span-2 card">
          <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
            <Circle size={16} className="text-secondary-500" /> Required: {selectedRole}
          </h3>
          {isAnalyzing ? (
            <div className="flex gap-2 flex-wrap animate-pulse">
               {[1,2,3,4,5].map(i => <div key={i} className="h-7 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>)}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 animate-in fade-in duration-500">
              {data.requiredSkills.map((s) => (
                <span key={s} className="badge bg-secondary-500/10 text-secondary-500">{s}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex items-center justify-between mb-6 relative z-10">
          <div>
            <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
              <Sparkles size={18} className="text-primary-500" /> AI Recommendations
            </h3>
            {isAnalyzing ? (
              <p className="text-sm text-primary-500 mt-1 animate-pulse font-medium">Analyzing your profile...</p>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
                <TrendingUp size={14} /> Estimated completion time: <span className="font-bold text-slate-800 dark:text-white">{data.time}</span>
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6 relative z-10">
          {isAnalyzing ? (
            <div className="space-y-5 animate-pulse">
              {[1,2,3,4].map(i => (
                <div key={i}>
                  <div className="flex justify-between mb-2">
                    <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
                    <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded"></div>
                  </div>
                  <div className="h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            data.gapRecommendations.map((g, index) => (
              <div key={g.skill} className="animate-in fade-in slide-in-from-bottom-2" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{g.skill}</span>
                  <span className="text-slate-500 dark:text-slate-400 font-medium">{g.weeks} wks · {g.progress}%</span>
                </div>
                <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden shadow-inner">
                  <div 
                    className="h-full rounded-full bg-brand-gradient transition-all duration-1000 ease-out" 
                    style={{ width: `${g.progress}%` }} 
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DashboardShell>
  )
}
