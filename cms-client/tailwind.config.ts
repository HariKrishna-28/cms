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
        dark_background: "#1D232A",
        dark_text: "#A6ADBA",
        dark_text_secondary: "#717883",
        dark_secondary: "#2A323C",
        dark_highlight: "#1AD1A5",
        dark_hover: "#191E24",
        dark_primary_highlight: "#12CCE5",
        light_background: "#FFFFFF",
        light_hover: "#2B3440",
        light_secondary: "#F8F8F8",
        light_primary_highlight: "#6681E8",
        light_navbar: "#1F2125",
        light_navbar_hover: "#2C2F36",
      },
      fontFamily: {
        custom: [
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "sans-serif",
          "apple color emoji",
          "segoe ui emoji",
          "Segoe UI Symbol",
          "noto color emoji",
        ],
      },
    },
  },
  plugins: [],
};
