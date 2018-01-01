const webpack = require('webpack');
const path = require('path');
const UglifyPlugin = require('uglifyjs-webpack-plugin');

module.exports = [
  {
    entry: './index.ts',

    output: {
      filename: "index.js",
      path: path.join(__dirname, 'dist'),
      library: 'zbase',
      libraryTarget: "var"
    },

    devtool: "inline-source-map",

    target: 'web',

    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.json', '.webpack.js']
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader'
        }
      ]
    },

    plugins: [
        new UglifyPlugin()
    ]
  }
];
