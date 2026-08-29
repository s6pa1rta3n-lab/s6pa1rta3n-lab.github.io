/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#020408',
          900: '#050914',
          800: '#0b1120',
          700: '#111b33',
          600: '#1b2a4a',
          card: '#0b1120',
          border: '#1e293b',
        },
        cyber: {
          volt: '#D4FF00',
          cyan: '#00F0FF',
          violet: '#A855F7',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'glow-volt': '0 0 20px -3px rgba(212, 255, 0, 0.35)',
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.35)',
        'glow-violet': '0 0 20px -3px rgba(168, 85, 247, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 8px rgba(0, 240, 255, 0.2)' },
          '100%': { boxShadow: '0 0 24px rgba(0, 240, 255, 0.6)' },
        }
      }
    },
  },
  plugins: [],
}
