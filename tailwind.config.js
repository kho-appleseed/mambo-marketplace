/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF8C00',
        secondary: '#324d67',
        accent: {
          orange: '#FF8C00',
          red: '#f02d34',
          green: 'rgb(49, 168, 49)',
        },
        background: {
          white: '#ffffff',
          light: '#ebebeb',
          medium: '#dcdcdc',
          dark: '#000000',
          overlay: 'rgba(0, 0, 0, 0.5)',
          transparent: 'transparent',
        },
        text: {
          primary: '#324d67',
          secondary: '#5f5f5f',
          black: '#000000',
          white: '#ffffff',
          light: '#eee',
          gray: 'gray',
        },
        ui: {
          border: 'gray',
          'button-primary': '#FF8C00',
          'button-secondary': '#ffffff',
          'button-text': '#ffffff',
          'button-outline': '#FF8C00',
          'cart-badge': '#FF8C00',
          'cart-badge-text': '#eee',
        },
      },
      keyframes: {
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideDown: {
          'from': { 
            opacity: '0',
            transform: 'translateY(-5px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        marquee: {
          'from': { transform: 'translateX(0)' },
          'to': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease',
        slideDown: 'slideDown 0.2s ease',
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [],
}

