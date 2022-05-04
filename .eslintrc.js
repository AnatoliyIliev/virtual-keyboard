module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  ignorePatterns: ['webpack.config.js', 'public/script.js'],
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'semi'],
  },
};
