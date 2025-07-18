/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Primary color palette
        primary: {
          50: '#f0f9f0',
          100: '#dcf4dc',
          200: '#bce8bc',
          300: '#8dd68d',
          400: '#5cbf5c',
          500: '#3aa83a',
          600: '#2d7a2d',
          700: '#256125',
          800: '#1f4d1f',
          900: '#1a401a',
        },
        // Secondary color palette
        secondary: {
          50: '#f6f7f0',
          100: '#eaecd9',
          200: '#d6dab7',
          300: '#bdc48d',
          400: '#a8b06a',
          500: '#949c4f',
          600: '#7a823c',
          700: '#606432',
          800: '#4f522b',
          900: '#444628',
        },
        // Accent colors
        accent: {
          50: '#fdf7f0',
          100: '#faebd9',
          200: '#f3d4b7',
          300: '#eab88d',
          400: '#e09668',
          500: '#d77a4a',
          600: '#c86340',
          700: '#a74f37',
          800: '#864033',
          900: '#6d362c',
        },
        // Warm earth tones
        warm: {
          50: '#fdf9f0',
          100: '#f7efd9',
          200: '#edddba',
          300: '#e1c791',
          400: '#d4ae66',
          500: '#c89846',
          600: '#b6843a',
          700: '#976b32',
          800: '#7a562f',
          900: '#634629',
        },
        // Earth tones for balance
        earth: {
          50: '#f9f8f6',
          100: '#f0eeea',
          200: '#e1ddd4',
          300: '#cdc6b8',
          400: '#b5aa97',
          500: '#9e8f7a',
          600: '#897a65',
          700: '#726555',
          800: '#5e5449',
          900: '#4d463e',
        },
        // Sage greens for nature theme
        sage: {
          50: '#f7f8f7',
          100: '#eef1ee',
          200: '#d7ddd7',
          300: '#b5c1b5',
          400: '#8d9e8d',
          500: '#6f806f',
          600: '#5a685a',
          700: '#4a564a',
          800: '#3d473d',
          900: '#343b34',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [],
};