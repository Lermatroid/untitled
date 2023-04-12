import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        calsans: ["Cal Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
