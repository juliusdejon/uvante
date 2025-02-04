/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./containers/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins_400Regular", "sans-serif"],
        ['primary-medium']: ["Poppins_500Medium", "sans-serif"],
        ['primary-semibold']: ["Poppins_600SemiBold", "sans-serif"],
        ['primary-bold']: ["Poppins_700Bold", "sans-serif"],
        ['primary-black']: ["Poppins_900Black", "sans-serif"],
      },
    },
  },
  plugins: [],
}