import { useState } from 'react'
import { User, Lock, Palette, Globe, Bell, Shield, Trash2, Camera, CheckCircle2, Smartphone, Monitor, Clock, Check } from 'lucide-react'
import DashboardShell from '../layout/DashboardShell.jsx'
import { studentNav } from '../data/navConfig.js'
import { useTheme } from '../context/ThemeContext.jsx'

const tabs = [
  { id: 'Profile', icon: User },
  { id: 'Password', icon: Lock },
  { id: 'Theme', icon: Palette },
  { id: 'Preferences', icon: Globe },
  { id: 'Notifications', icon: Bell },
  { id: 'Security', icon: Shield }
]

// Custom Toggle Component
const Toggle = ({ label, description, defaultChecked }) => {
  const [checked, setChecked] = useState(defaultChecked)
  return (
    <div className="flex items-start justify-between py-4 border-b border-slate-200 dark:border-white/10 last:border-0">
      <div className="pr-4">
        <h4 className="text-sm font-semibold">{label}</h4>
        {description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{description}</p>}
      </div>
      <button 
        onClick={() => setChecked(!checked)}
        className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${checked ? 'bg-primary-500' : 'bg-slate-200 dark:bg-slate-700'}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition duration-200 ease-in-out ${checked ? 'translate-x-2' : '-translate-x-2'}`} />
      </button>
    </div>
  )
}

export default function Settings() {
  const [active, setActive] = useState('Theme')
  const { theme, setTheme, colorTheme, setColorTheme } = useTheme()
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const colorThemes = [
    { id: 'default', name: 'Default Blue', bg: 'bg-blue-600' },
    { id: 'ocean', name: 'Ocean Teal', bg: 'bg-sky-500' },
    { id: 'forest', name: 'Forest Green', bg: 'bg-green-500' },
    { id: 'sunset', name: 'Sunset Orange', bg: 'bg-orange-500' }
  ]

  return (
    <DashboardShell items={studentNav} roleLabel="Student" title="Settings" avatarSeed="JS">
      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`w-full text-left px-4 py-3 rounded-xl2 text-sm font-medium flex items-center gap-3 transition-colors ${
                active === t.id 
                  ? 'bg-primary-500/10 text-primary-600 dark:text-primary-400' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
              }`}
            >
              <t.icon size={18} className={active === t.id ? 'text-primary-500' : 'text-slate-400'} />
              {t.id}
            </button>
          ))}
        </div>

        <div className="lg:col-span-3">
          <div className="card max-w-3xl">
            <div className="mb-6 pb-6 border-b border-slate-200 dark:border-white/10">
              <h2 className="text-xl font-heading font-bold">{active} Settings</h2>
              <p className="text-sm text-slate-500 mt-1">Manage your account settings and preferences.</p>
            </div>

            {active === 'Profile' && (
              <div className="space-y-6">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="h-20 w-20 rounded-full bg-brand-gradient text-white flex items-center justify-center text-2xl font-bold shadow-lg">JS</div>
                    <button className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 shadow-sm text-slate-500 hover:text-primary-500 transition-colors">
                      <Camera size={14} />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold">Profile Picture</h3>
                    <p className="text-xs text-slate-500 mt-1">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">First Name</label>
                    <input defaultValue="Jane" className="input-field w-full" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Last Name</label>
                    <input defaultValue="Student" className="input-field w-full" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                  <input defaultValue="jane@student.edu" className="input-field w-full" />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Professional Bio</label>
                  <textarea rows="4" className="input-field w-full resize-none" defaultValue="Passionate software engineering student looking for backend developer roles. Skilled in Java, Spring Boot, and SQL." />
                  <p className="text-xs text-slate-500">Brief description for your profile. URLs are hyperlinked.</p>
                </div>
                
                <div className="pt-4 flex items-center gap-4">
                  <button onClick={handleSave} className="btn-primary">
                    {saved ? <><CheckCircle2 size={16} /> Saved Successfully</> : 'Save Changes'}
                  </button>
                </div>
              </div>
            )}

            {active === 'Password' && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Current Password</label>
                  <input type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Confirm New Password</label>
                  <input type="password" placeholder="••••••••" className="input-field w-full" />
                </div>
                
                <div className="bg-slate-50 dark:bg-white/5 p-4 rounded-xl2">
                  <h4 className="text-sm font-semibold mb-2">Password requirements:</h4>
                  <ul className="text-xs text-slate-500 space-y-1.5">
                    <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> Minimum 8 characters long</li>
                    <li className="flex items-center gap-2"><Check size={12} className="text-green-500" /> At least one uppercase character</li>
                    <li className="flex items-center gap-2"><div className="w-3" /> At least one number, symbol, or whitespace character</li>
                  </ul>
                </div>

                <button onClick={handleSave} className="btn-primary">
                  {saved ? <><CheckCircle2 size={16} /> Updated</> : 'Update Password'}
                </button>
              </div>
            )}

            {active === 'Theme' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Appearance</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => setTheme('light')} 
                      className={`relative p-1 rounded-2xl border-2 text-left transition-all ${theme === 'light' ? 'border-primary-500 ring-4 ring-primary-500/20' : 'border-transparent hover:border-slate-300'}`}
                    >
                      <div className="bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                        <div className="h-8 bg-white border-b border-slate-200 flex items-center px-3 gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                          <div className="w-16 h-2 rounded-full bg-slate-200"></div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="w-1/2 h-3 rounded-full bg-white shadow-sm"></div>
                          <div className="w-full h-12 rounded-lg bg-white shadow-sm"></div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-center pb-2">Light Theme</p>
                      {theme === 'light' && <div className="absolute top-3 right-3 bg-primary-500 text-white rounded-full p-1 shadow-md"><Check size={12}/></div>}
                    </button>

                    <button 
                      onClick={() => setTheme('dark')} 
                      className={`relative p-1 rounded-2xl border-2 text-left transition-all ${theme === 'dark' ? 'border-primary-500 ring-4 ring-primary-500/20' : 'border-transparent hover:border-slate-700'}`}
                    >
                      <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
                        <div className="h-8 bg-slate-950 border-b border-slate-800 flex items-center px-3 gap-2">
                          <div className="w-2 h-2 rounded-full bg-slate-800"></div>
                          <div className="w-16 h-2 rounded-full bg-slate-800"></div>
                        </div>
                        <div className="p-4 space-y-2">
                          <div className="w-1/2 h-3 rounded-full bg-slate-800 shadow-sm"></div>
                          <div className="w-full h-12 rounded-lg bg-slate-800 shadow-sm"></div>
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-center pb-2">Dark Theme</p>
                      {theme === 'dark' && <div className="absolute top-3 right-3 bg-primary-500 text-white rounded-full p-1 shadow-md"><Check size={12}/></div>}
                    </button>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Accent Color</h3>
                  <div className="flex gap-4">
                    {colorThemes.map((ct) => (
                      <button
                        key={ct.id}
                        onClick={() => setColorTheme(ct.id)}
                        className={`group flex flex-col items-center gap-2 focus:outline-none`}
                      >
                        <div className={`h-12 w-12 rounded-full ${ct.bg} shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${colorTheme === ct.id ? 'ring-4 ring-offset-2 ring-primary-500 dark:ring-offset-slate-900' : ''}`}>
                          {colorTheme === ct.id && <Check size={20} className="text-white drop-shadow-md" />}
                        </div>
                        <span className={`text-xs font-medium ${colorTheme === ct.id ? 'text-primary-500 dark:text-primary-400' : 'text-slate-500'}`}>{ct.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {active === 'Preferences' && (
              <div className="space-y-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Display Language</label>
                  <select className="input-field w-full">
                    <option>English (United States)</option>
                    <option>English (United Kingdom)</option>
                    <option>Hindi</option>
                    <option>Spanish</option>
                  </select>
                  <p className="text-xs text-slate-500">This will change the language of the entire application interface.</p>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Timezone</label>
                  <select className="input-field w-full">
                    <option>Pacific Standard Time (PST)</option>
                    <option>Eastern Standard Time (EST)</option>
                    <option>Greenwich Mean Time (GMT)</option>
                    <option selected>Indian Standard Time (IST)</option>
                  </select>
                </div>

                <button onClick={handleSave} className="btn-primary mt-4">
                  {saved ? <><CheckCircle2 size={16} /> Preferences Saved</> : 'Save Preferences'}
                </button>
              </div>
            )}

            {active === 'Notifications' && (
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Email Notifications</h3>
                <div className="mb-8">
                  <Toggle label="Interview Reminders" description="Get an email 24 hours before a scheduled interview." defaultChecked={true} />
                  <Toggle label="New Job Matches" description="Weekly digest of jobs that perfectly match your skills." defaultChecked={true} />
                  <Toggle label="Recruiter Activity" description="Notify me when a recruiter views my profile or downloads my resume." defaultChecked={true} />
                </div>
                
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-2">Push Notifications</h3>
                <div>
                  <Toggle label="Direct Messages" description="Instant notifications when someone messages you." defaultChecked={true} />
                  <Toggle label="Course Progress" description="Reminders to finish certificates you have started." defaultChecked={false} />
                </div>
              </div>
            )}

            {active === 'Security' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 rounded-xl2 border border-slate-200 dark:border-white/10">
                    <div>
                      <h4 className="font-semibold text-sm">Authenticator App</h4>
                      <p className="text-xs text-slate-500 mt-1">Use an app like Google Authenticator to secure your account.</p>
                    </div>
                    <button className="btn-secondary !py-2 text-sm">Enable 2FA</button>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-xl2 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <Monitor className="text-primary-500" size={20} />
                        <div>
                          <h4 className="font-semibold text-sm">Windows PC - Chrome</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Bangalore, India • Current Session</p>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl2 border border-slate-200 dark:border-white/10">
                      <div className="flex items-center gap-3">
                        <Smartphone className="text-slate-400" size={20} />
                        <div>
                          <h4 className="font-semibold text-sm">iPhone 14 - Safari</h4>
                          <p className="text-xs text-slate-500 mt-0.5">Mumbai, India • Last active 2 hours ago</p>
                        </div>
                      </div>
                      <button className="text-xs font-semibold text-danger hover:underline">Log out</button>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-danger mb-4">Danger Zone</h3>
                  <div className="flex items-center justify-between p-4 rounded-xl2 border border-danger/20 bg-danger/5">
                    <div>
                      <h4 className="font-semibold text-sm text-danger">Delete Account</h4>
                      <p className="text-xs text-danger/70 mt-1">Permanently delete your account and all data. This cannot be undone.</p>
                    </div>
                    <button className="px-4 py-2 bg-danger text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-colors">Delete Account</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardShell>
  )
}
