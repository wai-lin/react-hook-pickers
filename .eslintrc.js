module.exports = {
  extends: [
    'plugin:jest-dom/recommended',
    'plugin:react-hooks/recommended',
    // 'plugin:testing-library/recommended',
    // 'plugin:testing-library/react',
  ],
  plugins: [
    'react-hooks',
    'jest-dom',
    // 'testing-library'
  ],
  overrides: [
    {
      env: {
        node: true,
        commonjs: true,
        browser: true,
        jest: true,
      },
    },
  ],
}
