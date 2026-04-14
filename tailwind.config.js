/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Suporte para o modo escuro via classe
  theme: {
    extend: {
      colors: {
        // Cores personalizadas extraídas do projeto Strategos
        emerald: {
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
        },
        zinc: {
          900: '#18181b',
          950: '#09090b',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}