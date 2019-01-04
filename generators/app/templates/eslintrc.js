
module.exports = {
  "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "es6": true
        }
    },
    "rules": {
        'quotes': ["warn", 'single'],
        "semi": 2,
        "indent": ["warn", 2,
          {
            "SwitchCase": 1,
            "MemberExpression": 1,
            "ObjectExpression": 1
          }],
        "no-loop-func": "error",
        "no-dupe-keys": "error",
        "no-empty": "error",
        "block-scoped-var": "error",
        "dot-notation": "error",
        "no-redeclare": "error",
        "no-self-assign": "error",
        // "no-useless-escape": "error",
        "comma-spacing": ["warn", { "before": false, "after": true }],
        "key-spacing": ["error",
          {
            "beforeColon": false,
            "afterColon": true
          }],
        "keyword-spacing": ["error", { "before": true }],
        "no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
        "no-console": [process.env.NODE_ENV === 'production' ? 'error' : 'off',
            { allow: ["warn", "error"]
        }],
    }
}
