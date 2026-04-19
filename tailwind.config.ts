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
        // Primary palette — sourced from Viva Dental logo
        blue: {
          DEFAULT: '#1A4FA0',
          dark:    '#0D2E6A',
          mid:     '#2D7DD2',
          light:   '#93BBEF',
          pale:    '#EFF6FF',
        },
        green: {
          DEFAULT: '#27AE60',
          light:   '#4BC887',
          pale:    '#ECFDF5',
          dark:    '#1E8A4A',
        },
        ink:     '#1A1A2E',   // primary text
        slate:   '#64748B',   // muted text
        surface: '#F4F9FF',   // very light blue tint for alternating sections

        // ── Legacy aliases so existing class names keep working ──
        teal: {
          DEFAULT: '#1A4FA0',   // was cyan #00B4D8 → now logo blue
          light:   '#2D7DD2',
          dark:    '#0D2E6A',
        },
        navy: {
          DEFAULT: '#0D2E6A',   // was very-dark-navy → now dark brand blue
          light:   '#1A4FA0',
          dark:    '#071A45',
        },
        'green-brand': '#27AE60',
        charcoal: '#1A1A2E',
        muted:    '#64748B',
        // keep gold alias
        gold: {
          DEFAULT: '#1A4FA0',
          light:   '#2D7DD2',
          dark:    '#0D2E6A',
        },
        primary: {
          DEFAULT: '#1A4FA0',
          light:   '#2D7DD2',
          dark:    '#0D2E6A',
        },
      },

      fontFamily: {
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },

      backgroundImage: {
        // all gradients use logo blues
        'gradient-brand':   'linear-gradient(135deg, #0D2E6A 0%, #1A4FA0 50%, #27AE60 100%)',
        'gradient-teal':    'linear-gradient(135deg, #1A4FA0, #27AE60)',
        'gradient-blue':    'linear-gradient(135deg, #0D2E6A, #2D7DD2)',
        'gradient-navy':    'linear-gradient(160deg, #0D2E6A 0%, #1A4FA0 100%)',
        'gradient-surface': 'linear-gradient(180deg, #FFFFFF 0%, #F4F9FF 100%)',
      },

      animation: {
        'fade-up':     'fadeUp 0.6s ease-out forwards',
        'fade-in':     'fadeIn 0.5s ease-out forwards',
        'slide-in-left':  'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in':    'scaleIn 0.4s ease-out forwards',
        'float':       'float 3s ease-in-out infinite',
        'pulse-slow':  'pulse 3s ease-in-out infinite',
        'spin-slow':   'spin 8s linear infinite',
        'menu-in':     'menuIn 0.3s ease-out forwards',
        'shimmer':     'shimmer 2s infinite',
      },

      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%':   { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%':   { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        menuIn: {
          '0%':   { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },

      transitionTimingFunction: {
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      boxShadow: {
        'blue':       '0 4px 20px rgba(26, 79, 160, 0.28)',
        'blue-lg':    '0 8px 40px rgba(26, 79, 160, 0.38)',
        'green':      '0 4px 20px rgba(39, 174, 96, 0.28)',
        // legacy aliases
        'teal':       '0 4px 20px rgba(26, 79, 160, 0.28)',
        'teal-lg':    '0 8px 40px rgba(26, 79, 160, 0.38)',
        'navy':       '0 4px 20px rgba(13, 46, 106, 0.28)',
        'card':       '0 2px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.10)',
      },
    },
  },
  plugins: [],
}

export default config
