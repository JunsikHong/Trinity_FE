/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'sans-serif'],
      },
      colors: {
        page: "rgb(var(--bg-page) / <alpha-value>)",
        surface: "rgb(var(--bg-surface) / <alpha-value>)",
        card: "rgb(var(--bg-card) / <alpha-value>)",

        primary: "rgb(var(--text-primary) / <alpha-value>)",
        secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        muted: "rgb(var(--text-muted) / <alpha-value>)",

        border: "rgb(var(--border) / <alpha-value>)",

        icon: {
          DEFAULT: "rgb(var(--btn-icon-bg) / <alpha-value>)",
          hover: "rgb(var(--btn-icon-hover) / <alpha-value>)",
          active: "rgb(var(--btn-icon-active) / <alpha-value>)",
          text: "rgb(var(--btn-icon-text) / <alpha-value>)",
        },

        menu: {
          DEFAULT: "rgb(var(--btn-menu-bg) / <alpha-value>)",
          hover: "rgb(var(--btn-menu-hover) / <alpha-value>)",
          active: "rgb(var(--btn-menu-active) / <alpha-value>)",
          text: "rgb(var(--btn-menu-text) / <alpha-value>)",
        },

        primaryBtn: {
          DEFAULT: "rgb(var(--btn-primary) / <alpha-value>)",
          hover: "rgb(var(--btn-primary-hover) / <alpha-value>)",
        },

        secondaryBtn: {
          DEFAULT: "rgb(var(--btn-secondary) / <alpha-value>)",
          hover: "rgb(var(--btn-secondary-hover) / <alpha-value>)",
        },

        danger: {
          DEFAULT: "rgb(var(--btn-danger) / <alpha-value>)",
          hover: "rgb(var(--btn-danger-hover) / <alpha-value>)",
        },

        input: {
          DEFAULT: "rgb(var(--input-bg) / <alpha-value>)",
          text: "rgb(var(--input-text) / <alpha-value>)",
          placeholder: "rgb(var(--input-placeholder) / <alpha-value>)",
          border: "rgb(var(--input-border) / <alpha-value>)",
          hover: "rgb(var(--input-hover) / <alpha-value>)",
          focus: "rgb(var(--input-focus) / <alpha-value>)",
          disabled: "rgb(var(--input-disabled) / <alpha-value>)",
        },

        separator: {
          DEFAULT: "rgb(var(--separator-bg) / <alpha-value>)",
          hover: "rgb(var(--separator-hover) / <alpha-value>)",
          line: "rgb(var(--separator-line) / <alpha-value>)",

          handle: "rgb(var(--separator-handle-bg) / <alpha-value>)",
          border: "rgb(var(--separator-handle-border) / <alpha-value>)",
          dot: "rgb(var(--separator-dot) / <alpha-value>)",

          active: "rgb(var(--separator-active) / <alpha-value>)",
        },

        tab: {
          DEFAULT: "rgb(var(--tab-bg) / <alpha-value>)",
          hover: "rgb(var(--tab-hover) / <alpha-value>)",
          active: "rgb(var(--tab-active-bg) / <alpha-value>)",

          border: "rgb(var(--tab-border) / <alpha-value>)",
          activeBorder: "rgb(var(--tab-active-border) / <alpha-value>)",

          text: "rgb(var(--tab-text) / <alpha-value>)",
          activeText: "rgb(var(--tab-active-text) / <alpha-value>)",
        },
      },
    }
  },
  plugins: [],
}