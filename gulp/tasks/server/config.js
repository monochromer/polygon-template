module.exports = {
  taskName: 'server',
  description: 'Запуск сервера Browsersync для разработки',
//   webpackConfigPath: '../scripts/webpack.config.js',
  enableHot: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  bsConfig: {
    server: {
      baseDir: 'public',
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
