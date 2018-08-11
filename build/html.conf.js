const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Get files from the public dir
const src = path.resolve(__dirname, '../public');
let files = fs.readdirSync(src);

// Keep only html file
files = files.filter((x) => {
  return path.extname(x) === '.html';
});

const config = files.map((x) => {
  return new HtmlWebpackPlugin({
    template: path.resolve(__dirname, '../public/' + x),
    inject: true,
    filename: x,
    hash: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false,
      removeAttributeQuotes: false
    },
  });
});

module.exports = config;
