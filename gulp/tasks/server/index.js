/**
 * Запуск сервера Browsersync для разработки
 */
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const stripAnsi = require('strip-ansi');

module.exports = (gulp, plugins, config) => {
  const webpackConfig = config.webpackConfig;
  const bundler = webpack(webpackConfig);
  const browserSync = plugins.browserSync;

  bundler.plugin('done', function (stats) {
    if (!config.enableHot && (stats.hasErrors() || stats.hasWarnings())) {
      return browserSync.sockets.emit('fullscreen:message', {
        title: "Webpack Error:",
        body: stripAnsi(stats.toString()),
        timeout: 1 * 60 * 1000
      });
    }
    if (!config.enableHot) {
      browserSync.reload();
    }
  });

  return (done) => {
    browserSync
      .init(Object.assign({}, config.bsConfig || {}, {
        middleware: [].concat(!config.isProd
          ? [
            webpackDevMiddleware(bundler, {
              publicPath: webpackConfig.output.publicPath,
              stats: { colors: true }
            })
          ]
          : []
          ).concat(
            config.enableHot
             ? webpackHotMiddleware(bundler, {
              reload: true
             })
             : []
        ),
        plugins: [
          'bs-fullscreen-message',
          {
            module: 'bs-html-injector',
            options: {
              files: ['build/*.html']
            }
          }
        ],
      }));
    done();
  }
};
