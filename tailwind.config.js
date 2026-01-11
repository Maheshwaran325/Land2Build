/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0052D4",
        "background-light": "#FFFFFF",
        "background-dark": "#1F2937",
        "text-main": "#1F2937",
        "bg-secondary": "#F8F9FB",
        "surface-light": "#F8F9FB",
        "surface-dark": "#F8F9FB",
        "border-light": "#E5E7EB",
        "border-dark": "#E5E7EB",
        "text-secondary": "#6B7280",
        "canvas": "#FFFFFF",
        "secondary": "#F8F9FB",
        "text-sub": "#6B7280",
        "border-sub": "#E5E7EB",
        "primary-solid": "#0052D4",
        "card-dark": "#F8F9FB",
        "text-slate": "#1F2937",
        "text-slate-light": "#4B5563",
        "dark-slate": "#1F2937",
        "slate-gray": "#64748B",
        "primary-blue": "#0052D4",
        "surface": "#F8F9FB",
        "text-muted": "#64748B",
      },
      backgroundImage: {
        "gradient-custom": "linear-gradient(135deg, #0052D4 0%, #4364F7 50%, #6FB1FC 100%)",
      },
      fontFamily: {
        "display": ["Manrope", "sans-serif"],
        "body": ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}