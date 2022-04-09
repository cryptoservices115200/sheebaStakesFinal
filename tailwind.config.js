module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        lapsus: ["lapsus", "sans"],
      },
      colors: {
        white: "#FFFFFF",
        brown: "#563921",
      },
    },
  },
  plugins: [],
};
