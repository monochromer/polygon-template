const path = require('path');
const gulp = require('gulp');
const deepmerge = require('deepmerge');
const browserSync = require('browser-sync');
const loadPlugins = require('gulp-load-plugins');

const combiner = require('./utils/combiner');
const noop = require('./utils/noopStream');
const logger = require('./utils/logger');
const { getFoldersList } = require('./utils/getTaskList');

const projectConfig = require('./config');
const defineTaskUtil = require('./utils/defineTask');

let plugins = loadPlugins();

Object.assign(plugins, {
  combiner,
  noop,
  logger,
  browserSync: browserSync.create()
});

const tasksPathList = getFoldersList(path.join(__dirname, 'tasks'));
const defineTask = defineTaskUtil(gulp, plugins);

// Регистрируем базовые задачи
tasksPathList.forEach(taskPath => {
    var resolvedTaskConfigPath = `${taskPath}/config`;
    var localTaskConfig = require(resolvedTaskConfigPath);

    let taskName = localTaskConfig.taskName;

    let projectTaskConfig = projectConfig.TASKS_CONFIG[taskName] || {};

    let config = {
        ...localTaskConfig,
        ...projectTaskConfig
    };

    defineTask(taskPath)(config);
});


// Регистрируем составные задачи
function watchFunc(done) {
  tasksPathList.forEach(taskPath => {
    var resolvedTaskConfigPath = `${taskPath}/config`;
    var localTaskConfig = require(resolvedTaskConfigPath);
    let taskName = localTaskConfig.taskName;
    let projectTaskConfig = projectConfig.TASKS_CONFIG[taskName] || {};
    let config = {
        ...localTaskConfig,
        ...projectTaskConfig
    };

    if (!config.excludeWatch && config.watchFiles && config.taskName) {
      gulp.watch(config.watchFiles, gulp.series(config.taskName));
    }
  });

  done();
};
watchFunc.displayName = 'watch';
watchFunc.description = 'Слежение за изменениями в файловой системе и автоматическая пересборка проекта';
gulp.task(watchFunc);

gulp.task(
  'build',
  gulp.series(
    'clean',
    gulp.parallel(
      'fonts',
      'images',
      gulp.series('sprite:images', 'sprite:svg', 'styles', 'scripts', 'views')
    )
  )
);

gulp.task(
  'dev',
  gulp.series(
    'build',
    gulp.parallel('server', 'watch')
  )
);

gulp.task('default', gulp.series('dev'));
