import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        inner: "inset 5px 5px 10px 0 rgba(166, 180, 200, 0.75), inset -5px -5px 15px 0 rgba(255, 255, 255, 0.75)",
      },
      dropShadow: {
        "custom": "4px 4px 6px rgba(171, 194, 212, 0.6), -4px -4px 6px rgba(255, 255, 255, 0.5)",
      },
      textColor: {
        "black": "#333",
        "green": "#1F8506"
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      prefix: 'nextui', // prefix for themes variables
      addCommonColors: true, // override common colors (e.g. "blue", "green", "pink").
      themes: {
        light: {

        },
        dark: {
          colors: {
            // background: "#f5f8fb",
            // foreground: '#FFFFFF', // or 50 to 900 DEFAULT
            primary: "#6F6FE2",
          },
        },
      },
    }),
  ],
};
export default config;
