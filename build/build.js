const ora = require('ora');
const rm = require('rimraf');
const chalk = require('chalk');
const webpack = require('webpack');
const buildConfig = require('./webpack.build.conf');
const globalConfig = require('../config/index');

const spinner = ora('building for production...');
spinner.start();

rm(globalConfig.build_dist, (err) => {
  if (err) {
    throw err;
  }
  webpack(buildConfig, (err, stats) => {
    spinner.stop();
    if (err) {
      throw err;
    }
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n');

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    }

    console.log(chalk.cyan('  Build complete.\n'));
  });
});
