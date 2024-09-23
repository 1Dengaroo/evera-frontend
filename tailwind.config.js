module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontSize: {
        '2xs': '0.625rem'
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Ubuntu',
          'sans-serif'
        ]
      },
      spacing: {
        108: '27rem',
        116: '29rem'
      }
    }
  },
  plugins: []
}
