/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          pink: '#ff1b9b',
          blue: '#00d4ff',
          purple: '#8b00ff',
          yellow: '#ffe600',
        },
        dark: {
          navy: '#0a0a12',
          black: '#050505',
          surface: '#12121a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'], // Good for retro/sci-fi
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #ff1b9b, 0 0 10px #ff1b9b' },
          '100%': { boxShadow: '0 0 20px #ff1b9b, 0 0 30px #ff1b9b' },
        }
      }
    },
  },
  plugins: [],
}
