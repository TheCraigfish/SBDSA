module.exports = {
  extends: [
    '../../.eslintrc.js',
    '@nestjs/eslint-config-nestjs',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': 'error',
    '@nestjs-eslint/module-order': 'error',
  },
  ignorePatterns: ['dist/', 'node_modules/', '*.js'],
};