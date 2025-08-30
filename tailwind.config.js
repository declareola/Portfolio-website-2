/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'text-brand-blue',
    'text-brand-pink',
    'hover:text-brand-blue',
    'hover:text-brand-pink',
    'bg-brand-blue',
    'bg-brand-pink',
    'bg-brand-blue/10',
    'bg-brand-pink/10',
    'bg-brand-blue/20',
    'bg-brand-pink/20',
    'bg-brand-blue/30',
    'bg-brand-pink/30',
    'bg-brand-blue/80',
    'bg-brand-pink/80',
    'hover:bg-brand-blue/20',
    'hover:bg-brand-pink/20',
    'border-brand-blue/50',
    'border-brand-pink/50',
    'focus:ring-brand-blue',
    'focus:ring-brand-pink',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      colors: {
        'brand-blue': '#00bfff',
        'brand-pink': '#ff007f',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'star-roam': 'starRoam 180s linear infinite',
        'aurora': 'aurora 25s ease-in-out infinite alternate',
        'noise': 'noise 2s steps(2) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        starRoam: {
          'from': { backgroundPosition: '0 0' },
          'to': { backgroundPosition: '-10000px 5000px' },
        },
        aurora: {
          'from': { backgroundPosition: '0% 50%, 50% 100%' },
          'to': { backgroundPosition: '100% 50%, 0% 0%' },
        },
        noise: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      }
    },
  },
  plugins: [],
}
