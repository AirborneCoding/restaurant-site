import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pandaFont1: "pandaFont1",
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('daisyui'),
    function ({ addComponents }: { addComponents: Function }) {
      addComponents({
        '.body-container': {
          'margin-left': 'auto',
          'margin-right': 'auto',
          'max-width': '100%',
          'padding-left': '1rem',
          'padding-right': '1rem',
          'transition': 'all 0.3s ease',
        },
        '@media (min-width: 576px)': {
          '.body-container': {
            'max-width': '800px',
          },
        },
        '@media (min-width: 800px)': {
          '.body-container': {
            'max-width': '850px',
          },
        },
        '@media (min-width: 992px)': {
          '.body-container': {
            'max-width': '960px',
          },
        },
        '@media (min-width: 1200px)': {
          '.body-container': {
            'max-width': '1510px',
          },
        },
      });
    },
    require("tailwindcss-animate")
  ],
  daisyui: {
    themes: ["retro", "black"],
  },
};
export default config;
