/**
 * Создание тасков, которые загружаются по требованию
 */

const errorHandler = require('./errorHandler');

const defineTask = (gulp, plugins) => (taskPath) => (customConfig = {}) => {

    const baseConfig = require(`${taskPath}/config`);
    const taskName = customConfig.taskName || baseConfig.taskName || taskPath;
    const description = customConfig.description || baseConfig.description || taskName;

    const taskFunc = (done) => {
        let { task } = require(taskPath);

        let taskConfig = {
            ...baseConfig,
            ...{
                onError(error) {
                    errorHandler(gulp, plugins)(taskName)(error);
                    this.emit('end');
                }
            },
            ...customConfig
        };

        try {
            return task(gulp, plugins)(taskConfig)(done);
        } catch(e) {
            const { util } = plugins;
            util.log(util.colors.red(e));
            return done();
        }
    };

    taskFunc.displayName = taskName;
    taskFunc.description = description;
    gulp.task(taskName, taskFunc);
};

module.exports = defineTask;
