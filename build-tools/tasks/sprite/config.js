const path = require('path');

module.exports = {
  taskName: 'sprite:images',
  description: 'Создание растрового спрайта',
  isProduction: process.env.NODE_ENV === 'production',
  src: 'src/icons/*.*',
  watchFiles: 'src/icons/*.*',
  imgDest: 'build/assets/img',
  stylesDest: process.cwd() + '/temp/',
  spriteOptions: {
    algorithm: 'top-down',
    padding: 0,
    algorithmOpts: {
      sort: false
    },
    imgName: 'icons.png',
    imgPath: '../img/icons.png',
    // retinaSrcFilter: 'src/icons/*@2x.png',
    // retinaImgName: 'icons@2x.png',
    // retinaImgPath: '../img/icons@2x.png',
    cssTemplate: path.join(__dirname, 'sprite-template.stylus.hbs'),
    cssName: 'sprite.styl',
    cssFormat: 'stylus',
  }
};
