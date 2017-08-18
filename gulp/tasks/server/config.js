module.exports = {
  taskName: 'server',
  description: 'Запуск сервера Browsersync для разработки',
  webpackConfig: require('../scripts/webpack.config.js'),
  enableHot: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
  bsConfig: {
    server: {
      baseDir: 'build',
      directory: true
    },
    host: 'localhost',
    port: 3000,
    notify: true,
    injectChanges: true,
    open: false,
    tunnel: false
  }
}
