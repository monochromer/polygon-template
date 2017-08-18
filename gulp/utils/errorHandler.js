/**
 * Обработчик ошибок
 */
const stripAnsi = require('strip-ansi');

module.exports = (gulp, plugins, taskConfig) => (error) => {

  if (!!plugins.browserSync && !!plugins.browserSync.active) {
    plugins.browserSync.notify(`
      <div style="padding: 10px; font: 1.2em/1.4 monospace; text-align: left; background: red; color: #fff">
        <div style="margin-bottom: 1em;">${taskConfig.taskName}</div>
        <div style="white-space: pre-wrap;">${stripAnsi(error.message)}</div>
      </div>
    `, 10 * 1000);
  }

  plugins.notify.onError({
    title: 'Gulp: <%= options.taskName %>',
    message: '<%= error.message %>',
    templateOptions: {
      taskName: taskConfig.taskName
    }
  })(error);

}
