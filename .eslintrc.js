module.exports = {
  root: true,
  env: {
    node: true,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.vue'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {},
      alias: {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        },
        map: [['@', './src']],
      },
    },
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: ['error', 2],
    'quote-props': ['error', 'as-needed'],
    'import/no-unresolved': ['error', { commonjs: true }],
    'import/no-extraneous-dependencies': 'error',
    'node/no-missing-require': 'off',
    'node/no-extraneous-import': 'off',
    'import/extensions': 'off',
  },
};
