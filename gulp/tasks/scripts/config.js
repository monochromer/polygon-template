const webpackConfig = require('./webpack.config.js');

module.exports = {
  taskName: 'scripts',
  description: 'Сборка скриптов',
  isProduction: process.env.NODE_ENV === 'production',
  src: 'src/scripts/*.*',
  dest: 'build/assets/js/',
  excludeWatch: true,
  webpackConfig: webpackConfig
};
