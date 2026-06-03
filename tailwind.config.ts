import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4F46E5",
          light: "#818CF8",
          dark: "#3730A3",
        },
        secondary: "#06B6D4",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6",
        badge: {
          ad: "#FF9500",
          vip: "#FFD700",
          game: "#30D158",
          video: "#AF52DE",
          new: "#3B82F6",
          recommended: "#10B981",
          popular: "#EF4444",
        },
        bg: {
          DEFAULT: "#0F172A",
          secondary: "#1E293B",
          surface: "#334155",
          "surface-hover": "#3B4F6E",
        },
        "bg-light": "#F8FAFC",
        "bg-secondary-light": "#F1F5F9",
        "surface-light": "#E2E8F0",
        text: {
          primary: "#F8FAFC",
          secondary: "#94A3B8",
          tertiary: "#64748B",
          disabled: "#475569",
          inverse: "#0F172A",
          light: "#CBD5E1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        noto: ["var(--font-noto-sans-sc)", "var(--font-noto-arabic)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
