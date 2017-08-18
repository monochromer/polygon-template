module.exports = ({ localPath }) => ({
  taskName: 'sprite:svg',
  description: 'Сборка svg-спрайта',
  src: 'src/svg-sprite/**/*.svg',
  watchFiles: 'src/svg-sprite/**/*.*',
  dest: 'build/assets/img',
  stylesDest: process.cwd() + '/temp/',
  svgSpriteConfig: {
    'mode': {
      'symbol': {
        dest: '',
        sprite: 'icons.svg',
        // bust: process.env.NODE_ENV === 'production', // хеши в названии файла
        bust: false,
        render: {
          styl: {
            dest: 'svg-sprite.styl',
            template: localPath + '/sprite-template.styl.hbs'
          }
        }
      }
    },
    shape: {
      id: {
        generator: function(name, file) {
          return 'icon_' + name.replace('.svg', '');
        }
      }
    },
    'transform': [{
      'svgo': {
        'plugins': [
          {
            'cleanupAttrs': false
          },
          {
            'removeTitle': false
          },
          {
            'cleanupIDs': false
          },
          {
            'mergePaths': false
          }
        ]
      }
    }],
    'svg': {
      'xmlDeclaration': false,
      'doctypeDeclaration': false
    }
  }
});
