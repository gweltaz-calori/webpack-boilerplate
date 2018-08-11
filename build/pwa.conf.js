const WebpackPwaManifest = require('webpack-pwa-manifest');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

const userConfig = require('../config/pwa');

if (fs.existsSync(path.join(__dirname, '../' + userConfig.icons.src))) {
  module.exports = [
    new WebpackPwaManifest({
      fingerprints: false,
      name: userConfig.name,
      short_name: userConfig.short_name,
      description: userConfig.description,
      background_color: userConfig.background_color,
      theme_color: userConfig.theme_color,
      start_url: userConfig.start_url,
      icons: [
        {
          src: path.join(__dirname, '../' + userConfig.icons.src),
          sizes: userConfig.icons.sizes,
          destination: 'assets/icons/',
        },
      ],
    }),
    new FaviconsWebpackPlugin({
      logo: path.join(__dirname, '../' + userConfig.icons.src),
      prefix: 'assets/icons/',
      inject: true,
      title: userConfig.name,
      background: userConfig.background_color,
      icons: {
        android: false,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: false,
        opengraph: false,
        twitter: true,
        yandex: false,
        windows: false
      },
    }),
  ];
} else {
  console.log(chalk.red(`No image found at path: ${userConfig.icons.src}`));
  module.exports = [];
}
