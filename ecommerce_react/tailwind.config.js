/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      xs: "480px",
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      xxl: "1600px",
    },
    extend: {
      colors: {
        Primary: "#B2C8BA",
        Footer: "#86A789",
        Background: "#D9D9D9",
        Backproducts: "#D2E3C8",
        BgBtn: "#02a65a",
        BgBtnHover: "#01cc7a",
      },
    },
  },
  plugins: [],
};
