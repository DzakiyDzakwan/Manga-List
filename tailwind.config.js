/** @type {import('tailwindcss').Config} */

const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./*.html"],
  theme: {
    extend: {
      colors: {
        primary: "#3F72AF",
        secondary: "#112D4E",
        teritary: "#DBE2EF",
        background: "#F9F7F7",
        "secondary-80": "rgb(17, 45, 78, 80%)",
        "teritary-80": "rgb(219, 226, 239, 80%)",
        "teritary-50": "rgb(219, 226, 239, 50%)",
      },
      fontSize: {
        24: "24px",
        20: "20px",
        18: "18px",
        14: "14px",
      },
      padding: {
        10: "10px",
        75: "75px",
      },
      height: {
        "1/10": "10%",
        "8/10": "80%",
        "1/12": "8%",
        "10/12": "84%",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".container": {
          width: "100%",
          paddingLeft: "24px",
          paddingRight: "24px",
          marginLeft: "auto",
          marginRight: "auto",
          /* border: "2px solid", */
          "@screen sm": {
            width: "600px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          "@screen md": {
            width: "700px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          "@screen lg": {
            width: "900px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          "@screen xl": {
            width: "1200px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
          "@screen 2xl": {
            width: "1200px",
            paddingLeft: "0px",
            paddingRight: "0px",
          },
        },
        ".card": {
          width: "140px",
          height: "220px",
          padding: "0.5rem",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          margin: "0 auto",
          borderRadius: "1rem",
          boxShadow:
            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;",
          cursor: "pointer",
          fontWeight: "bold",
        },
        ".modal-poster": {
          width: "170px",
          "@screen sm": {
            width: "190px",
          },
        },
      });
    }),
  ],
};
