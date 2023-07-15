/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark_background: "#070D10",
        dark_secondary: "#262829",
        dark_highlight: "#777979",
        dark_hover: "#777979",
        dark_primary_highlight: "#12CCE5",
        light_background: "#FFFFFF",
        light_hover: "#DCF3FF",
        light_primary_highlight: "#6681E8",
        light_secondary: "#F6F6F6",
        light_navbar: "#1F2125",
        light_navbar_hover: "#2C2F36",
      },
    },
  },
  plugins: [],
};
