// tailwind.config.js

module.exports = {
  // purge: ['*.html', '*.svelte'],
  purge: false,  // Pro purging pouzivam custom nastaveni v postcss.config.js
  theme: {
    extend: {}
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms'),
  ]
}
