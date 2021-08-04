module.exports = {
  extends: [
    'plugin:jest-dom/recommended',
    // 'plugin:testing-library/recommended',
    // 'plugin:testing-library/react',
  ],
  plugins: [
    'jest-dom',
    // 'testing-library'
  ],
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      env: {
        node: true,
        commonjs: true,
        browser: true,
        jest: true,
      },
    },
  ],
}
