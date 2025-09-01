/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: '#4F46E5', // deep indigo
        secondary: '#6366F1', // lighter indigo
        accent: '#FBBF24', // yellow highlight
        background: '#F3F4F6', // light gray background
        text: '#111827', // dark text
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        card: '0 4px 15px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // nice default form styles
    require('@tailwindcss/typography'), // for better text formatting
  ],
}
