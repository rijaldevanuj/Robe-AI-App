/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/constants/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#1C1C1E",
        ember: "#E8631A",
        linen: "#E5DDD1",
        stone: "#7D7D75",
      },
      fontFamily: {
        serif: ["PlayfairDisplay_700Bold"],
        "serif-italic": ["PlayfairDisplay_700Bold_Italic"],
        "serif-regular": ["PlayfairDisplay_400Regular"],
        sans: ["Inter_400Regular"],
        "sans-medium": ["Inter_500Medium"],
        "sans-semibold": ["Inter_600SemiBold"],
        "sans-bold": ["Inter_700Bold"],
      },
    },
  },
  plugins: [],
};
