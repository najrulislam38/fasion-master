/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#DA8359",
        secondary: "#A5B68D",
      },
    },
  },
  plugins: [require("daisyui")],
};
