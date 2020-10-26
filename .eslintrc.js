module.exports = {
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  extends: [
    'react-app',
    'airbnb-typescript',
    'plugin:jsx-a11y/recommended',
  ],
  plugins: [
    'jsx-a11y',
  ],
  rules: {
    '@typescript-eslint/semi': ['error', 'never'],
    'import/prefer-default-export': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'max-len': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'object-curly-newline': ['error', { 'multiline': true }],
    'react/button-has-type': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/no-unescaped-entities': 'off',
    'react/require-default-props': 'off',
    'react/jsx-one-expression-per-line': 'off',
    semi: ['error', 'never'],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  },
  'overrides': [
    {
      'files': ['./*.js'],
      'rules': {
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
}
