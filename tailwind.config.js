/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-500, #2563EB)',
          50: 'var(--color-primary-50, #EFF4FF)',
          100: '#DBE6FE',
          400: 'var(--color-primary-400, #5B8DEF)',
          500: 'var(--color-primary-500, #2563EB)',
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-500, #7C3AED)',
          400: '#A276F2',
          500: 'var(--color-secondary-500, #7C3AED)',
          600: '#6D28D9',
        },
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
        surface: '#F8FAFC',
        darkbg: '#0F172A',
        darkpanel: '#152036',
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl2: '16px',
      },
      boxShadow: {
        soft: '0 4px 24px -4px rgba(37,99,235,0.12)',
        softdark: '0 4px 24px -4px rgba(0,0,0,0.4)',
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 8px 30px rgba(124,58,237,0.15)',
      },
      backgroundImage: {
        'brand-gradient': 'var(--bg-gradient, linear-gradient(135deg, #2563EB 0%, #7C3AED 100%))',
        'brand-gradient-soft': 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(124,58,237,0.12) 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'rise': 'rise 0.7s cubic-bezier(0.16,1,0.3,1) forwards',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        'scan': 'scan 2.2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        rise: { '0%': { opacity: 0, transform: 'translateY(16px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        scan: { '0%,100%': { transform: 'translateY(0%)' }, '50%': { transform: 'translateY(100%)' } },
      },
    },
  },
  plugins: [],
}
