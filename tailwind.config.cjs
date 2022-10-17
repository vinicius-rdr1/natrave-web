/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    container: {
      center: true,
    },


    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '18px'],
      base: ['16px', '24px'],
      lg: ['20px', '28px'],
      xl: ['24px', '32px'],
      '2xl': ['32px', '40px'],
      '3xl': ['48px', '56px']
    
    },
    extend: {

      

      colors: {
        red: {
          300: '#300219',
          500: '#AF053F',
          700: '#BB2E57'
        },
        black: '#0B0E16',
        gray:{
          300: '#696C74',
          500: '#91949D',
          700: '#B1B4BD'
        },
        white: '#F4F6FF',

      }

    },
  },
  plugins: [],
}
