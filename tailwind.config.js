/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      './index.html', './src/**/*.{vue,js,ts,jsx,tsx}',
      './node_modules/tw-elements/dist/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        "bpmn-primary": "#1282A2",
        "bpmn-secondary": "#034078",
        "bpmn-p-hover": "#1f8eb1",
        "bpmn-p-active": "#107693",
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
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
