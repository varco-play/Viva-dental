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
        primary: {
          DEFAULT: '#4A90D9',
          light: '#6AAEE8',
          dark: '#2E70B5',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E0C478',
          dark: '#A07830',
        },
        charcoal: '#1A1A2E',
        muted: '#6B7280',
        surface: '#F8F9FC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
