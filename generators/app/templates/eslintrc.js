
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
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
    }
}
