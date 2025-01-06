module.exports = {
  plugins: [
    require('postcss-preset-env'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-prefix-selector')({
      prefix: '#simorgh-root',
      transform: (prefix, selector, prefixedSelector) => {
        if (
          selector.startsWith(':root') ||
          selector.startsWith('::before') ||
          selector.startsWith('::after') ||
          selector.startsWith('::backdrop') ||
          selector.startsWith('*') ||
          selector.startsWith('body')
        ) {
          return selector;
        }

        if (
          [
            '.bg-base-200',
            '.min-h-screen',
            '.w-screen',
            '.max-w-full',
            '.text-base-content',
            '.w-full',
            '.max-w-full',
          ].includes(selector)
        ) {
          return selector;
        }

        if (selector.startsWith(prefix)) {
          if (selector.includes('html')) {
            return `${prefix} *`;
          }

          return selector;
        }

        return prefixedSelector;
      },
    }),
  ],
};
