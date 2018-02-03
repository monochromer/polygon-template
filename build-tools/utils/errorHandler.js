/**
 * Обработчик ошибок
 */
const stripAnsi = require('strip-ansi');

const errorHandler = (gulp, plugins) => (label) => (error) => {

  if (plugins.browserSync && plugins.browserSync.active) {
    plugins.browserSync.notify(`
      <div style="padding: 10px; font: 1.2em/1.4 monospace; text-align: left; background: red; color: #fff">
        <div style="margin-bottom: 1em;">${label}</div>
        <div style="white-space: pre-wrap;">${stripAnsi(error.message)}</div>
      </div>
    `, 10 * 1000);
  }

  plugins.notify && plugins.notify.onError({
    title: 'Gulp: <%= options.label %>',
    message: '<%= error.message %>',
    templateOptions: {
      label
    }
  })(error);
}

module.exports = errorHandler
