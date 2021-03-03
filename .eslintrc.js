module.exports = {
  root: true,
  //extends: '@react-native-community',
  "parser": "typescript-eslint-parser",
  "rules": {
    "quotes": ["error", "double"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }]
  },
};
