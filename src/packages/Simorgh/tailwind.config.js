/** @type {import('tailwindcss').Config} */
const daisyui = require('daisyui');
const daisyuiThemes = require('daisyui/src/colors/themes');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,html}'],
  daisyui: {
    themes: [
      {
        light: {
          ...daisyuiThemes['[data-theme=light]'],
          primary: '#2B5EF1',
          secondary: '#999',
          success: '#16a34a',
        },
      },
    ],
  },
  plugins: [daisyui],
};
