const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const baseConfig = require('./webpack.base.conf');
const globalConfig = require('../config/index');

const config = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: path.join(globalConfig.build_dist, '/static'),
        ignore: ['.*'],
      },
    ]),
  ],
  optimization: {
    splitChunks: {
      name: 'vendor',
      minChunks: 2,
    },
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            warnings: false,
          },
          output: {
            comments: false,
          },
        },
      }),
    ],
  },
});

module.exports = config;
