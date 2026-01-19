module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg0: "#10130f",
        bg1: "#161c15",
        bg2: "#1f271f",
        card: "#222b22",
        olive: "#3c4d3a",
        fern: "#557a57",
        sage: "#9db79e",
        sand: "#d7c7a3",
        clay: "#a67f5a",
        ocean: "#2f5d62",
        txt1: "#eef2ea",
        txt2: "#c9d4c7",
        muted: "#869184"
      },
      borderRadius: {
        xl: "18px"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,.35)"
      },
      fontFamily: {
        inter: ["Inter","system-ui","-apple-system","Segoe UI","Roboto","Helvetica Neue","Arial","Noto Sans","sans-serif"],
        playfair: ["Playfair Display","serif"],
        dancing: ["Dancing Script","cursive"]
      }
    }
  },
  plugins: []
};