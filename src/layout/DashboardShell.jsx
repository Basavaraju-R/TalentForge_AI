import { useState } from 'react'
import { X } from 'lucide-react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function DashboardShell({ items, roleLabel, title, avatarSeed, children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-surface dark:bg-darkbg">
      <Sidebar items={items} roleLabel={roleLabel} />

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-72 bg-surface dark:bg-darkbg shadow-xl">
            <button className="absolute top-4 right-4 h-8 w-8 flex items-center justify-center rounded-xl2 glass z-50" onClick={() => setMobileOpen(false)}>
              <X size={16} />
            </button>
            <Sidebar items={items} roleLabel={roleLabel} isMobile={true} />
          </div>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <Topbar title={title} avatarSeed={avatarSeed} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-8 space-y-6">{children}</main>
      </div>
    </div>
  )
}
