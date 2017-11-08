module.exports = {
  env: {
    es6: true,
    browser: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
  },
  globals: {
    process: true,
    require: true,
  },
  plugins: ['import'],
  extends: ['plugin:vue/recommended', 'google'],
  rules: {
    'max-len': 0,
    'require-jsdoc': 0,
    'linebreak-style': 0,
    'new-cap': [
      0,
      {
        newIsCap: true
      }
    ],
    'import/first': 2,
    'import/order': [
      2,
      {
        'newlines-between': 'never',
      }
    ],
    'import/newline-after-import': [
      2,
      {
        count: 1,
      }
    ],
    'vue/valid-template-root': 0,
    'vue/require-prop-types': 2,
    'vue/no-dupe-keys': 2,
    'vue/require-valid-default-prop': 0,
    'vue/require-render-return': 2,
    'vue/v-on-style': [
      2,
      {
        shorthand: true,
      },
    ],
    'vue/v-bind-style': [
      2,
      {
        shorthand: true,
      },
    ],
    'vue/return-in-computed-property': 2,
    'vue/no-side-effects-in-computed-properties': 2,
    'vue/order-in-components': [
      2,
      {
        order: [
          'data', 'computed', 'methods', 'watch', 'LIFECYCLE_HOOKS', 'props', 'directives', 'components',
        ],
      },
    ],
  },
};
