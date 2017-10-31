const path = require('path');
const gulp = require('gulp');
const deepmerge = require('deepmerge');

// Создаем объект с gulp-плагинами и своми share-функциями
let plugins = require('gulp-load-plugins')();
Object.assign(plugins, {
  combiner: require('./utils/combiner'),
  browserSync: require('browser-sync').create()
});

const { getFoldersList } = require('./utils/getTaskList');
const tasksPathList = getFoldersList(path.join(__dirname, 'tasks'));

const defineTask = require('./utils/defineTask')(gulp, plugins);

const projectConfig = require('./config');

// Регистрируем базовые задачи
tasksPathList.forEach(taskPath => {
    var resolvedTaskPath = `${taskPath}/config`;
    let taskName = require(resolvedTaskPath).taskName;
    let projectTaskConfig = typeof projectConfig[taskName] === 'object' ? projectConfig[taskName] : {};
    let taskConfig = deepmerge.all([
        {},
        { taskPath },
        { isProduction: projectConfig.isProduction },
        projectTaskConfig
    ]);
    defineTask(taskConfig);
});

// return;


// Регистрируем составные задачи
function watchFunc(done) {
  tasksPathList.forEach(taskPath => {
    let config = require(path.join(taskPath, 'config.js'));
    if (!config.excludeWatch && config.watchFiles && config.taskName) {
      gulp.watch(config.watchFiles, gulp.parallel(config.taskName));
    }
  });

  done();
};
watchFunc.description = 'Слежение за изменениями в файловой системе и автоматическая пересборка проекта';
gulp.task('watch', watchFunc);

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
