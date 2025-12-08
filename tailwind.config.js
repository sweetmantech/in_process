/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
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
          primary: "#605F5C",
          secondary: "#888888",
          eggshell: "#FEFEFE",
          "moss-50": "#F5F5F5",
          "moss-100": "#E0DDD8",
          "moss-200": "#999999",
          "moss-300": "#605F5C",
          "moss-400": "#4E4E4E",
          "moss-900": "#1B1504",
        },
        red: {
          dark: "#810505",
          DEFAULT: "#AA2E2E",
        },
        tan: {
          DEFAULT: "#fdad00",
          primary: "#FFF9EA",
          secondary: "#E9DCBB",
          "opacity-300": "#b7934633",
          400: "#D4C5A0",
        },
      },
      fontFamily: {
        nounish: ["LondrinaSolid-Regular", "sans-serif"],
        archivo: ["Archivo-Regular", "sans-serif"],
        "archivo-medium": ["Archivo-Medium", "sans-serif"],
        "archivo-bold": ["Archivo-Medium", "sans-serif"],
        "spectral-italic": ["Spectral-Italic", "sans-serif"],
        spectral: ["Spectral-Regular", "sans-serif"],
        "spectral-medium": ["Spectral-Medium", "sans-serif"],
        "spectral-bold": ["Spectral-Bold", "sans-serif"],
        "spectral-medium-italic": ["Spectral-MediumItalic", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        gradientTopRight:
          "linear-gradient(229.7deg,#ffbb88 10.61%,#ff7cba 26.17%,#887bff 31.93%,#03c7f6 46.54%,#0F1014 54.36%)",
        gradientTopRightLight:
          "linear-gradient(210.7deg, rgba(255, 255, 255, 0.3) 14.85%, #fbc2eb 20.61%, #a6c1ee 31.93%, #d4fc79 46.54%, rgba(255, 255, 255, 0.3) 50.36%)",
        gradientTopRightLightHeader:
          "linear-gradient(30.7deg,#ffe0b3  0.61%,  #ffadd4 17.93%,  #6edbff 49.54%, rgba(255, 255, 255, 0.3)  56.36% )",
        gradientTopRightLightHeaderSm:
          "linear-gradient(30.7deg, #ffadd4 0.93%,  #6edbff 41.54%, rgba(255, 255, 255, 0.3)  64.36% )",
        gradientTopBottom: "linear-gradient(180deg, #ffffff 0%, #ffffff00 100%)",
        gradientBottomTop: "linear-gradient(180deg, #ffffff00 0%, #ffffff 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  variants: {
    extend: {
      display: ["dark"],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
