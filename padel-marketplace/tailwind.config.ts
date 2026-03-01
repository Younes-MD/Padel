import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#fef7ee",
          100: "#fdedd7",
          200: "#f9d6ae",
          300: "#f5b87a",
          400: "#ef9043",
          500: "#eb7520",
          600: "#dc5b16",
          700: "#b64314",
          800: "#913618",
          900: "#752f16",
          950: "#3f1509",
        },
        surface: {
          50: "#f8f8f6",
          100: "#f0efe9",
          200: "#e0ded2",
          300: "#ccc8b4",
          400: "#b6ae94",
          500: "#a69b7d",
          600: "#998b71",
          700: "#80735f",
          800: "#695e51",
          900: "#564e43",
          950: "#2e2922",
        },
      },
      fontFamily: {
        display: ['"DM Serif Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
