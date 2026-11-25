/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#08090d",
          surface: "#0e1017",
          glass: "rgba(14, 16, 23, 0.65)",
          card: "rgba(18, 20, 29, 0.5)",
          border: "rgba(255, 255, 255, 0.08)",
          'border-hover': "rgba(255, 255, 255, 0.22)",
        },
        accent: {
          cyan: "#00F5FF",
          purple: "#8B5CF6",
          pink: "#FF2E93",
        },
        text: {
          primary: "#F3F4F6",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        }
      },
      fontFamily: {
        space: ['"Space Grotesk"', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'subtle-glass': '0 20px 40px -15px rgba(0, 0, 0, 0.5)',
        'accent-cyan': '0 0 30px -5px rgba(0, 245, 255, 0.15)',
        'accent-purple': '0 0 30px -5px rgba(139, 92, 246, 0.15)',
      },
    },
  },
  plugins: [],
}
