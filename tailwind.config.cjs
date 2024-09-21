/** @type {import('tailwindcss').Config} */
var defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,mdx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter"].concat(defaultTheme.fontFamily.sans),
        serif: ["Lora"].concat(defaultTheme.fontFamily.serif),
        title: ["Noto Sans", "Familjen Grotesk"].concat(defaultTheme.fontFamily.sans),
      },
    },
  },
  plugins: [],
};
