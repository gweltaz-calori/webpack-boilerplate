const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

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
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
});

module.exports = config;
