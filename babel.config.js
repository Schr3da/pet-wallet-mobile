module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      [
        'babel-plugin-transform-typescript-metadata',
        ['@babel/plugin-proposal-decorators', {legacy: true}],
        'module-resolver',
        {
           root: ['./src'],
           extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
           alias: {
             "tests": ["./tests/"],
             "@components": "./src/components",
           }
         }
       ]
    ],
  }
};
