module.exports = {
  env: {
    commonjs: true,
    es6: true,
  },
  extends: [
    'standard',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 6,
  },
  rules: {
    semi: [1, 'always'],
    'comma-dangle': [
      'error',
      {
        // Override functions to 'never' as this breaks pre-ES2017
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
  },
};
