module.exports = {
  extends: ['stylelint-config-recommended-scss', 'stylelint-prettier/recommended'],
  plugins: ['stylelint-prettier', 'stylelint-order'],
  defaultSeverity: 'warning',
  rules: {
    'prettier/prettier': true,
    'string-quotes': 'single',
    'order/properties-alphabetical-order': true,
  },
}
