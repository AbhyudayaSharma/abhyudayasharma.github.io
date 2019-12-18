module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'standard',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    semi: ['error', 'always'],
    'comma-dangle': ['error', {
      arrays: 'only-multiline',
      objects: 'always',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'never',
    }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
