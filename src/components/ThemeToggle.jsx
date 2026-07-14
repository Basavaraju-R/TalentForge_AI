import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext.jsx'

export default function ThemeToggle({ className = '' }) {
  const { theme, toggleTheme } = useTheme()
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      className={`h-10 w-10 rounded-xl2 flex items-center justify-center glass hover:scale-105 transition-transform ${className}`}
    >
      {theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
    </button>
  )
}
