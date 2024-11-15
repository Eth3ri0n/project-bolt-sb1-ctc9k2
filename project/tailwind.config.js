/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00507B',
          light: '#0077A2',
        },
        sidebar: {
          dark: '#003144',
          main: '#004D6A',
          light: '#0077A2',
          hover: '#005577',
          section: {
            scolarite: '#006C8F',
            organisation: '#005B85',
            administration: '#4B367D',
            compte: '#1A1A1A'
          }
        },
        secondary: {
          green: '#129A7E',
          lime: '#45DB96',
          yellow: '#F5D836',
          pink: '#FF99D6',
          purple: '#586DDD',
        }
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(180deg, #004D6A 0%, #003144 100%)',
      }
    },
  },
  plugins: [],
};