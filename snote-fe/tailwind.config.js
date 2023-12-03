module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        primary: '#0a85d1',
        gray: '#6b7280',
      },
      boxShadow: {
        card: '0 0 2px 0 rgba(145, 158, 171, 0.2), 0 12px 24px -4px rgba(145, 158, 171, 0.12)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
