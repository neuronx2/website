module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            'ul > li': {
              marginBottom: '0.25rem',
            },
            'ol > li': {
              marginBottom: '0.25rem',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}