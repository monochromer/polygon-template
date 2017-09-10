const path = require('path');
const through2 = require('through2').obj;
const File = require('vinyl');
const pug = require('pug');

module.exports = function(options) {
    let { data, dest, fileName = 'index.html' } = options;
    let files = [];

    function onData(file, enc, callback) {
        if (file.basename === fileName) {
            callback();
        } else {
            files.push(file.relative);
            callback(null, file);
        }
    };

    function onEnd(callback) {
        const renderFn = pug.compileFile(__dirname + '/template.pug', {
            basedir: process.cwd(),
            cache: false,
            locals: {}
        });

        const html = renderFn(Object.assign({}, data || {}, {
            files,
            siteMap: options.siteMap || [],
        }));

        let indexFile = new File({
            contents: new Buffer(html),
            cwd: process.cwd(),
            base: path.join(process.cwd(), dest),
            path: path.join(process.cwd(), dest, fileName)
        });
        this.push(indexFile);

        callback();
    };

    return through2(onData, onEnd);
}
