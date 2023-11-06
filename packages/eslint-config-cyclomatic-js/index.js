module.exports = {
  extends: [
    'turbo',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': 'error',
  },
  env: {
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
}
