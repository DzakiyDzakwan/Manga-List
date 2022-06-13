/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#112D4E",
        secondary: "#3F72AF",
        "bg-primary": "#F9F7F7",
        "bg-secondary": "#DBE2EF",
        "linear-secondary": "rgb(219, 218, 239, 80%)",
        "linear-primary": "rgb(17, 45, 78, 80%)",
      },
      fontSize: {
        h1: "24px",
        h2: "20px",
        h3: "18px",
        sm: "14px",
      },
      padding: {
        10: "10px",
        75: "75px",
      },
    },
  },
  plugins: [],
};
