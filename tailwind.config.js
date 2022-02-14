const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'xsm': {'max': '470px'},
      'xxsm': {'max': '350px'},
      ...defaultTheme.screens,
    }
  },
  plugins: [],
}