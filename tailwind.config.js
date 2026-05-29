/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0e0e0f',
          2: '#141415',
          3: '#1a1a1c',
          4: '#202022',
        },
        border: {
          DEFAULT: '#2a2a2d',
          2: '#333336',
        },
        text: {
          DEFAULT: '#e8e8ea',
          2: '#9090a0',
          3: '#5a5a6a',
        },
        accent: {
          DEFAULT: '#c8b89a',
          2: '#a09070',
        },
        rec: {
          DEFAULT: '#1e1a14',
          border: '#3d3020',
        },
      },
      animation: {
        pulse: 'pulse 2s ease-in-out infinite',
        bob: 'bob 2s ease-in-out infinite',
        fadeInUp: 'fadeInUp 0.3s ease forwards',
      },
      keyframes: {
        pulse: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.4' } },
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(4px)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
