const prettierConfig = require('./.prettierrc.js')

module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:import/typescript',
    'plugin:prettier/recommended',
    'plugin:storybook/recommended'
  ],
  env: {
    node: true,
    es6: true,
    browser: true,
    jest: true
  },
  globals: {
    React: 'readonly',
    JSX: true
  },
  // to parse future JS features (e.g. dynamic imports)
  parser: '@typescript-eslint/parser',
  plugins: [
    // enables custom react-hooks/* rules
    'react-hooks',
    '@typescript-eslint'
  ],
  rules: {
    // Airbnb + @typescript-eslint conflicts
    // Replace airbnb 'camel' with '@typescript-eslint' equivalent
    // Ensures consistent argument/variable casing
    camelcase: 'off',

    // Replace airbnb 'no-unused-expressions' with '@typescript-eslint' equivalent
    // Ensures all expressions are used
    'no-unused-expressions': 'off',

    // Replace airbnb 'no-unused-vars' with '@typescript-eslint' equivalent
    // Ensures all variables are used
    'no-unused-vars': 'off',

    // Replace airbnb 'no-use-before-define' with '@typescript-eslint' equivalent
    // Enables us to use functions before they are defined
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    // Replace 'no-shadow' with '@typescript-eslint' equivalent
    // Ensures we don't redefine variables
    'no-shadow': 'off',

    // @typescript-eslint
    // Allow return statements to have no TS type
    '@typescript-eslint/explicit-function-return-type': 'off',

    // React rules
    // Allow JSX in js files
    'react/jsx-filename-extension': 'off',
    // Allow nextJs JSX templates
    'react/react-in-jsx-scope': 'off',
    // Disable default props requirement
    'react/require-default-props': 'off',
    // Allow prop spreading
    'react/jsx-props-no-spreading': 'off',
    // No use of react prop types
    'react/prop-types': 'off',

    // Enforce all rules-of-hooks
    // 'react-hooks/rules-of-hooks': 'error',

    // Import rules
    // Allow for a single named export without it being default
    'import/prefer-default-export': 'off',
    // Allow nextJS imports
    'import/no-unresolved': 'off',

    // Don't requre file type in imports. TS already enforces this.
    'import/extensions': 'off',

    // Override no-restricted-syntax to allow for..of loops
    // but keep the other constructs forbidden
    'no-restricted-syntax': [
      'error',
      'ForInStatement',
      'LabeledStatement',
      'WithStatement'
    ],

    // Disable classes per file limitations
    'max-classes-per-file': 'off',

    // Disallow console logs.
    // Prefer reportError() to log errors.
    'no-console': 'warn',

    // Enforce consistent curly braces
    // on flow control
    curly: ['error', 'multi-line', 'consistent'],

    // prettier rules
    'prettier/prettier': ['error', prettierConfig],

    // *************************
    // TODO: Fix these offenses by changing then to 'errors'
    // *************************
    eqeqeq: 'warn',
    'no-nested-ternary': 'warn',
    'no-param-reassign': 'warn',
    'consistent-return': 'warn',
    'no-empty-pattern': 'warn',
    'no-undef': 'warn',
    'no-sequences': 'warn',
    'no-new': 'warn',
    radix: 'warn',

    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-shadow': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    // Enforce PascalCase types and interfaces
    '@typescript-eslint/naming-convention': [
      'warn',
      { selector: 'typeLike', format: ['PascalCase'] }
    ],

    'react/function-component-definition': [
      'warn',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function'
      }
    ],
    'react/no-unused-prop-types': 'warn',
    'react/no-array-index-key': 'warn',
    'react/jsx-no-useless-fragment': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/button-has-type': 'warn',
    'react/destructuring-assignment': 'warn',
    'react/no-unstable-nested-components': 'warn',
    'react/jsx-key': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/jsx-no-constructed-context-values': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-sort-props': [
      'warn',
      { ignoreCase: true, reservedFirst: true, shorthandLast: true }
    ],
  },
  settings: {
    react: {
      version: '17.0.2'
    }
  }
}
