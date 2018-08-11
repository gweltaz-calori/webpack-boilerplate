const path = require('path');
const htmlConfig = require('./html.conf');
const webpack = require('webpack');
const NullPlugin = require('webpack-null-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DEV = process.env.NODE_ENV === 'dev';
const pwaConfig = require('./pwa.conf');
const envConfig = require('./env.conf');
const offlinePlugin = require('./service-worker.conf');
const globalConfig = require('../config/index');


// Base config
const config = {
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: globalConfig.build_dist,
    filename: 'assets/js/main.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: DEV ? 'assets/css/[name].css' : 'assets/css/[name].[hash].css',
      chunkFilename: DEV ? 'assets/css/[id].css' : 'assets/css/[id].[hash].css',
    }),
    new webpack.DefinePlugin(envConfig),
    ...htmlConfig,
    ...pwaConfig,
    offlinePlugin ? offlinePlugin : new NullPlugin(),
  ],
  optimization: {
    namedModules: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 8192,
            }
          }
        ]
      },
      {
        test: /\.(eot|ttf|otf|woff2?)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/fonts/[name].[ext]',
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve('src'),
    },
  },
};

module.exports = config;
