/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        graphite: {
          950: "#0f1720",
          900: "#172331",
          700: "#35465a",
          500: "#66768a"
        },
        shell: "#f7f9f8",
        line: "#dfe7e5",
        teal: {
          50: "#e7fbf7",
          100: "#c9f4ed",
          500: "#07927e",
          600: "#057967",
          700: "#075f55"
        },
        coral: "#e84d5b",
        amber: "#f4a016"
      },
      boxShadow: {
        panel: "0 16px 50px rgba(20, 33, 46, 0.07)"
      }
    }
  },
  plugins: []
};
