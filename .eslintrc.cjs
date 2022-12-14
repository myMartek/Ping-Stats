module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  rules: {
    /**
       * Strict mode
       */
    // babel inserts 'use strict'; for us
    strict: [2, 'never'],          // http://eslint.org/docs/rules/strict

    /**
       * ES6
       */
    'no-var': 2,                     // http://eslint.org/docs/rules/no-var
    'prefer-const': 0,               // http://eslint.org/docs/rules/prefer-const
    'vue/multi-word-component-names': 0,
    'vue/no-unused-components': 'warn',
    'vue/attribute-hyphenation': 'warn',
    'vue/html-closing-bracket-newline': 'warn',
    'vue/html-closing-bracket-spacing': 'warn',
    'vue/html-end-tags': 'warn',
    'vue/html-indent': ['warn', 2, {
      attribute: 1,
      baseIndent: 1,
      closeBracket: 0,
      alignAttributesVertically: false,
      ignores: []
    }],
    'vue/html-quotes': 'warn',
    'vue/html-self-closing': 0,
    'vue/max-attributes-per-line': 0,
    'vue/multiline-html-element-content-newline': 'warn',
    'vue/mustache-interpolation-spacing': 'warn',
    'vue/no-multi-spaces': 'warn',
    'vue/no-spaces-around-equal-signs-in-attribute': 'warn',
    'vue/no-template-shadow': 'warn',
    'vue/prop-name-casing': 'warn',
    'vue/require-default-prop': 'warn',
    'vue/require-prop-types': 0,
    'vue/singleline-html-element-content-newline': 0,
    'vue/v-bind-style': 'warn',
    'vue/v-on-style': 'warn',
    'vue/valid-v-slot': 0,
    /**
       * Variables
       */
    'no-shadow': 0,                  // http://eslint.org/docs/rules/no-shadow
    'no-shadow-restricted-names': 2, // http://eslint.org/docs/rules/no-shadow-restricted-names
    'no-unused-vars': [2, {          // http://eslint.org/docs/rules/no-unused-vars
      vars: 'local',
      args: 'after-used'
    }],
    'no-undef': 2,                   // http://eslint.org/docs/rules/no-undef
    'no-use-before-define': 2,       // http://eslint.org/docs/rules/no-use-before-define

    /**
       * Possible errors
       */
    'comma-dangle': [2, 'never'],               // http://eslint.org/docs/rules/comma-dangle
    'quote-props': [2, 'as-needed', { keywords: false }], // http://eslint.org/docs/rules/quote-props
    'no-cond-assign': [2, 'always'], // http://eslint.org/docs/rules/no-cond-assign
    'no-console': [1, { allow: ['warn', 'error'] }],                 // http://eslint.org/docs/rules/no-console
    'no-debugger': 1,                // http://eslint.org/docs/rules/no-debugger
    'no-alert': 1,                   // http://eslint.org/docs/rules/no-alert
    'no-constant-condition': 1,      // http://eslint.org/docs/rules/no-constant-condition
    'no-dupe-keys': 2,               // http://eslint.org/docs/rules/no-dupe-keys
    'no-duplicate-case': 2,          // http://eslint.org/docs/rules/no-duplicate-case
    'no-empty': 2,                   // http://eslint.org/docs/rules/no-empty
    'no-ex-assign': 2,               // http://eslint.org/docs/rules/no-ex-assign
    'no-extra-boolean-cast': 0,      // http://eslint.org/docs/rules/no-extra-boolean-cast
    'no-extra-parens': 0,            // http://eslint.org/docs/rules/no-extra-parens
    'no-extra-semi': 2,              // http://eslint.org/docs/rules/no-extra-semi
    'no-func-assign': 2,             // http://eslint.org/docs/rules/no-func-assign
    'no-inner-declarations': 2,      // http://eslint.org/docs/rules/no-inner-declarations
    'no-invalid-regexp': 2,          // http://eslint.org/docs/rules/no-invalid-regexp
    'no-irregular-whitespace': 2,    // http://eslint.org/docs/rules/no-irregular-whitespace
    'no-obj-calls': 2,               // http://eslint.org/docs/rules/no-obj-calls
    'no-sparse-arrays': 2,           // http://eslint.org/docs/rules/no-sparse-arrays
    'no-unreachable': 2,             // http://eslint.org/docs/rules/no-unreachable
    'use-isnan': 2,                  // http://eslint.org/docs/rules/use-isnan
    'block-scoped-var': 2,           // http://eslint.org/docs/rules/block-scoped-var

    /**
       * Best practices
       */
    'consistent-return': 2,          // http://eslint.org/docs/rules/consistent-return
    curly: [2, 'multi-line'],      // http://eslint.org/docs/rules/curly
    'default-case': 2,               // http://eslint.org/docs/rules/default-case
    'dot-notation': [2, {            // http://eslint.org/docs/rules/dot-notation
      allowKeywords: true
    }],
    eqeqeq: 2,                     // http://eslint.org/docs/rules/eqeqeq
    'guard-for-in': 2,               // http://eslint.org/docs/rules/guard-for-in
    'no-caller': 2,                  // http://eslint.org/docs/rules/no-caller
    'no-else-return': 2,             // http://eslint.org/docs/rules/no-else-return
    'no-eq-null': 2,                 // http://eslint.org/docs/rules/no-eq-null
    'no-eval': 2,                    // http://eslint.org/docs/rules/no-eval
    'no-extend-native': 2,           // http://eslint.org/docs/rules/no-extend-native
    'no-extra-bind': 2,              // http://eslint.org/docs/rules/no-extra-bind
    'no-fallthrough': 2,             // http://eslint.org/docs/rules/no-fallthrough
    'no-floating-decimal': 2,        // http://eslint.org/docs/rules/no-floating-decimal
    'no-implied-eval': 2,            // http://eslint.org/docs/rules/no-implied-eval
    'no-lone-blocks': 2,             // http://eslint.org/docs/rules/no-lone-blocks
    'no-loop-func': 2,               // http://eslint.org/docs/rules/no-loop-func
    'no-multi-str': 2,               // http://eslint.org/docs/rules/no-multi-str
    'no-native-reassign': 2,         // http://eslint.org/docs/rules/no-native-reassign
    'no-new': 2,                     // http://eslint.org/docs/rules/no-new
    'no-new-func': 2,                // http://eslint.org/docs/rules/no-new-func
    'no-new-wrappers': 2,            // http://eslint.org/docs/rules/no-new-wrappers
    'no-octal': 2,                   // http://eslint.org/docs/rules/no-octal
    'no-octal-escape': 2,            // http://eslint.org/docs/rules/no-octal-escape
    'no-param-reassign': 0,          // http://eslint.org/docs/rules/no-param-reassign
    'no-proto': 2,                   // http://eslint.org/docs/rules/no-proto
    'no-redeclare': 2,               // http://eslint.org/docs/rules/no-redeclare
    'no-return-assign': 2,           // http://eslint.org/docs/rules/no-return-assign
    'no-script-url': 2,              // http://eslint.org/docs/rules/no-script-url
    'no-self-compare': 2,            // http://eslint.org/docs/rules/no-self-compare
    'no-sequences': 2,               // http://eslint.org/docs/rules/no-sequences
    'no-throw-literal': 2,           // http://eslint.org/docs/rules/no-throw-literal
    'no-with': 2,                    // http://eslint.org/docs/rules/no-with
    radix: 2,                      // http://eslint.org/docs/rules/radix
    'vars-on-top': 2,                // http://eslint.org/docs/rules/vars-on-top
    'wrap-iife': [2, 'any'],         // http://eslint.org/docs/rules/wrap-iife
    yoda: 2,                       // http://eslint.org/docs/rules/yoda

    /**
       * Style
       */
    'no-unexpected-multiline': 2,   // http://eslint.org/docs/rules/no-unexpected-multiline.html
    'operator-linebreak': [2, 'before'],  // http://eslint.org/docs/rules/operator-linebreak.html
    indent: ['error', 2, {     ignoredNodes: ['TemplateLiteral']   }], // http://eslint.org/docs/rules/indent
    'brace-style': [2,               // http://eslint.org/docs/rules/brace-style
      '1tbs', {
        allowSingleLine: true
      }],
    quotes: [
      2, 'single', 'avoid-escape'    // http://eslint.org/docs/rules/quotes
    ],
    camelcase: [2, {               // http://eslint.org/docs/rules/camelcase
      properties: 'never'
    }],
    'comma-spacing': [2, {           // http://eslint.org/docs/rules/comma-spacing
      before: false,
      after: true
    }],
    'comma-style': [2, 'last'],      // http://eslint.org/docs/rules/comma-style
    'eol-last': 2,                   // http://eslint.org/docs/rules/eol-last
    'func-names': 0,                 // http://eslint.org/docs/rules/func-names
    'key-spacing': [2, {             // http://eslint.org/docs/rules/key-spacing
      beforeColon: false,
      afterColon: true
    }],
    // https://github.com/eslint/eslint/issues/2023
    'new-cap': 0,                    // http://eslint.org/docs/rules/new-cap
    'no-multiple-empty-lines': [2, { // http://eslint.org/docs/rules/no-multiple-empty-lines
      max: 1
    }],
    'no-nested-ternary': 2,          // http://eslint.org/docs/rules/no-nested-ternary
    'no-new-object': 2,              // http://eslint.org/docs/rules/no-new-object
    'no-spaced-func': 2,             // http://eslint.org/docs/rules/no-spaced-func
    'no-trailing-spaces': [2, { skipBlankLines: true }],         // http://eslint.org/docs/rules/no-trailing-spaces
    'no-underscore-dangle': 0,       // http://eslint.org/docs/rules/no-underscore-dangle
    'object-curly-spacing': [2, 'always'], // http://eslint.org/docs/rules/object-curly-spacing
    'one-var': [2, 'never'],         // http://eslint.org/docs/rules/one-var
    'padded-blocks': [2, 'never'],   // http://eslint.org/docs/rules/padded-blocks
    semi: [2, 'always'],           // http://eslint.org/docs/rules/semi
    'semi-spacing': [2, {            // http://eslint.org/docs/rules/semi-spacing
      before: false,
      after: true
    }],
    'keyword-spacing': 2,       // http://eslint.org/docs/rules/space-after-keywords
    'space-before-blocks': 2,        // http://eslint.org/docs/rules/space-before-blocks
    'space-before-function-paren': [2, 'never'], // http://eslint.org/docs/rules/space-before-function-paren
    'space-infix-ops': 2,            // http://eslint.org/docs/rules/space-infix-ops
    'spaced-comment': [2, 'always'], // http://eslint.org/docs/rules/spaced-comment
    'space-in-parens': 0 // http://eslint.org/docs/rules/space-in-parens]
  }
};

