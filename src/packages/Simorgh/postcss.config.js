const tailwindcss = require('tailwindcss');
module.exports = {
  plugins: [
    'postcss-preset-env',
    tailwindcss,
    require('postcss-prefix-selector')({
      prefix: '#simorgh-root',
      transform: (prefix, selector, prefixedSelector) => {
        // if (selector.startsWith(':')) {
        //   return `${prefix}${selector}`;
        // }
        return prefixedSelector;
      },
    }),
  ],
};
