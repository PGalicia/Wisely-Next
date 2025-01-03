import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightGray: 'rgb(var(--color-light-gray) / <alpha-value>)',
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        offWhite: 'rgb(var(--color-off-white) / <alpha-value>)',
        purpleAccent: 'rgb(var(--color-purple-accent) / <alpha-value>)',
        link: 'rgb(var(--color-link) / <alpha-value>)',
      },
    },
  },
  plugins: [],
} satisfies Config;
