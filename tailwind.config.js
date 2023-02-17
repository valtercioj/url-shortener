/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bgGray: "#2D3A3A",
        blueText: "#0186DA",
        blackText: "#505050",
        gray: "#F0F2F5",
        grayBorder: "#bbb",
        blueBaby: "#6dbff2",
      },
      boxShadow: {
        "1xl": "2px 2px 6px #ccc",
      },
    },
  },
  plugins: [],
};
