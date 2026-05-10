module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  plugins: ['react', 'react-hooks'],
  rules: {
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'warn',
  },
  settings: { react: { version: 'detect' } },
};
