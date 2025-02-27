// eslint-disable-next-line @typescript-eslint/no-var-requires
/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: "true",
      screens: {
        ios: "320px",
        samsungS8: "360px",
        xs: "390px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xls": "1350px",
        "2xl": "1440px",
        "3xl": "1920px",
      },
    },
    extend: {
      colors: {
        grey: {
          DEFAULT: "#949494",
          light: "#f6f6f6",
        },
        background: {
          DEFAULT: "#f2e8cd",
        },
        tan: {
          DEFAULT: "#fdad00"
        }
      },
      fontFamily: {
        nounish: ["LondrinaSolid-Regular", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: () => ({
        gradientTopRight:
          "linear-gradient(229.7deg,#ffbb88 10.61%,#ff7cba 26.17%,#887bff 31.93%,#03c7f6 46.54%,#0F1014 54.36%)",
        gradientTopRightLight:
          "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #fbc2eb 20.61%, #a6c1ee 31.93%, #d4fc79 46.54%, rgba(255, 255, 255, 0.3) 50.36%)",
        gradientTopRightLightHeader:
          "linear-gradient(30.7deg,#ffe0b3  0.61%,  #ffadd4 17.93%,  #6edbff 49.54%, rgba(255, 255, 255, 0.3)  56.36% )",
        gradientTopRightLightHeaderSm:
          "linear-gradient(30.7deg, #ffadd4 0.93%,  #6edbff 41.54%, rgba(255, 255, 255, 0.3)  64.36% )",
      }),
    },
  },
  variants: {
    extend: {
      display: ["dark"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
