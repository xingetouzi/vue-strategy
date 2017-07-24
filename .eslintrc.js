module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  "globals": {
    "Public": true,
    "fetch": false
  },
  // add your custom rules here
  'rules': {
    "semi": [2, "always"],
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    //When formatting a function, whitespace is allowed between the function name or function keyword and the opening paren.
    'space-before-function-paren': 0,
    'space-before-blocks': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
