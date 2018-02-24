/**
 * Очистка директории
 */
const del = require('del');

module.exports = (gulp, plugins) => (config) => (done) => {
    return del([config.src])
        .then(function(paths) {
            plugins.logger(module).info('Deleted:', paths.join('\n'));
            done();
        });
};
