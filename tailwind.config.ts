import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#132d52',
          dark: '#070f1d',
        },
        teal: {
          DEFAULT: '#00B4D8',
          light: '#48CAE4',
          dark: '#0096B7',
        },
        green: {
          brand: '#2DC653',
          light: '#5DDE7B',
          dark: '#1FA03D',
        },
        charcoal: '#1A1A2E',
        muted: '#6B7280',
        surface: '#F0F9FF',
        // keep old primary for backwards compat
        primary: {
          DEFAULT: '#00B4D8',
          light: '#48CAE4',
          dark: '#0096B7',
        },
        gold: {
          DEFAULT: '#00B4D8',
          light: '#48CAE4',
          dark: '#0096B7',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #0B1F3A 0%, #00B4D8 50%, #2DC653 100%)',
        'gradient-teal': 'linear-gradient(135deg, #00B4D8, #2DC653)',
        'gradient-navy': 'linear-gradient(180deg, #0B1F3A 0%, #132d52 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.4s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'count-up': 'countUp 1s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'menu-in': 'menuIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        menuIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'teal': '0 4px 20px rgba(0, 180, 216, 0.3)',
        'teal-lg': '0 8px 40px rgba(0, 180, 216, 0.4)',
        'navy': '0 4px 20px rgba(11, 31, 58, 0.3)',
        'card': '0 2px 20px rgba(0,0,0,0.06)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}

export default config
