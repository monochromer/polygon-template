/**
 * Очистка директории
 */
const del = require('del');

module.exports = (gulp, plugins) => (config) => (done) => {
    return del([config.src])
        .then(function(paths) {
            plugins.util.log('Deleted:', plugins.util.colors.magenta(paths.join('\n')));
            done();
        });
};
