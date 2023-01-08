/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "bpmn-primary": "#1282A2",
        "bpmn-secondary": "#034078",
        "bpmn-light": "#FEFCFB",
        "bpmn-dark": "#0A1128"
      },
      fontFamily: {
        Roboto: [ "Roboto, sans-serif" ]
      },
      container: {
        padding: "2rem",
        center: true
      }
    },
  },
  plugins: [],
}
