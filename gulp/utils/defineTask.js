/**
 * Создание тасков, которые загружаются по требованию
 */
const path = require('path');
const fs = require('fs');

const errorHandler = require('./errorHandler');

const defineTask = (gulp, plugins) => (config) => {
    let localConfig = {};
    try {
      localConfig = require(path.resolve(config.taskPath, 'config.js'));
      localConfig = typeof localConfig === 'function'
        ? localConfig({ localPath: config.taskPath })
        : localConfig;
    } catch(e) {}

    let taskConfig = Object.assign({}, localConfig, config);

    if (config.onError && typeof config.onError === 'function') {
      taskConfig.onError = config.onError;
    } else {
      taskConfig.onError = function(error) {
        errorHandler(gulp, plugins, taskConfig)(error);
        this.emit('end');
      }
    };

    let gulpFunc = done => {
      const taskPath = path.resolve(config.taskPath);
      try {
        let taskFn = require(taskPath)(gulp, plugins, taskConfig);
        return taskFn(done);
      } catch(e) {
        let util = plugins.util;
        util.log(util.colors.red(`Failed to load task in the directory ${taskPath}`));
        util.log(util.colors.red(e));
        return done();
      }
    };

    if (taskConfig.description) gulpFunc.description = taskConfig.description;

    gulp.task(taskConfig.taskName, gulpFunc);
};

module.exports = defineTask;
