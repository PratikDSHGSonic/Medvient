// tailwind.config.mjs
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e6ebfa',
          200: '#d1dcf5',
          300: '#a6bfef',
          400: '#638fe6',
          500: '#3366cc',
          600: '#1a4db3',
          700: '#173e8c',
          800: '#163571',
          900: '#162d5c',
        },
        'tech-gray': {
          800: '#1a1f2e',
          900: '#151822',
        }
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}