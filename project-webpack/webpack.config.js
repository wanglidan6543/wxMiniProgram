const path = require('path');
const WXAppWebpackPlugin = require('wxapp-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // 引入插件 
    new WXAppWebpackPlugin(),
  ],
  module: {
    rules: [], // 各种 loaders 在这里添加 
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
};