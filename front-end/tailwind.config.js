export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik', 'Inter', 'sans-serif'],
      },
      colors: {
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F5F5F5',
        'bg-sidebar': '#111111',
        'text-primary': '#111111',
        'text-secondary': '#6B6B6B',
        'text-inverse': '#FFFFFF',
        border: '#E4E4E4',
        accent: '#111111',
        'accent-hover': '#2E2E2E',
        success: '#2F7A3D',
        'warning-mid': '#8A8A2E',
        'warning-low': '#B3752B',
        danger: '#A33333',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
};