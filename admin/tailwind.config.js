/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          bg: '#FFFBEB',
          transparent: '#FBEFD9',
          200: '#F59E0B',
          300: '#D97707',
        },
        'primary-dark': {
          bg: '#382E1D',
          transparent: '#66511F',
          200: '#F59E0B',
          300: '#FBBF24',
        },
        grey: {
          bg: '#FAFAFA',
          100: '#F4F4F5',
          200: '#A1A1AA',
          300: '#71717A',
          400: '#3F3F46',
        },
        'grey-dark': {
          bg: '#0A0A0B',
          border: '#303031',
          hover: '#39383A',
          50: '#29292C',
          100: '#18181B',
        },
        green: {
          primary: '#22C55E',
        },
        red: {
          primary: '#EF4444',
        },
        black: '#0A0A0B',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};
