const path = require('path');
const dataPath = path.join(process.cwd(), 'data');

module.exports = {
  taskName: 'views',
  description: 'Обработка html',
  isProduction: process.env.NODE_ENV === 'production',
  src: 'src/views/pages/*/*.pug',
  watchFiles: ['src/views/**/*.*', dataPath],
  dest: 'build',
  dataPath: dataPath,
  engineOptions: {
    locals: {},
    pretty: '\t',
    basedir: '.'
  },
  prettify: {
    indent_size: 4,
    indent_char: ' ',
    wrap_attributes: 'auto', // 'force'
    preserve_newlines: false,
    indent_inner_html: true,
    // unformatted: [], //  ['pre', 'code']
    end_with_newline: true
  }
}
