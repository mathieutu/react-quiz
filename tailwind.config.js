module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  purge: [
    './public/**/*.html',
    './src/**/*.jsx',
    './src/**/*.tsx',
  ],
  theme: {
    extend: {
      gradientColorStops: {
        'back-light': '#27427b',
        'back-dark': '#111838',
      },
      width: {
        '100': '30rem',
      },
    },
  },
  variants: {
    borderRadius: ['responsive', 'hover', 'focus'],
  },
  plugins: [],
}
