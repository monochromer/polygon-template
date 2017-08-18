module.exports = ({ localPath }) => ({
  taskName: 'sprite:images',
  description: 'Создание растрового спрайта',
  isProduction: process.env.NODE_ENV === 'production',
  src: 'src/icons/*.*',
  watchFiles: 'src/icons/*.*',
  imgDest: 'build/assets/img',
  stylesDest: process.cwd() + '/temp/',
  spriteOptions: {
    algorithm: 'top-down', /* top-down | left-right | diagonal | alt-diagonal | binary-tree */
    padding: 0,
    algorithmOpts: {
      sort: false
    },
    imgName: 'icons.png',
    imgPath: '../img/icons.png',
    retinaSrcFilter: 'src/icons/*@2x.png',
    retinaImgName: 'icons@2x.png',
    retinaImgPath: '../img/icons@2x.png',
    cssTemplate: localPath + '/sprite-template.stylus.hbs',
    // cssName: 'sprite.css',
    // cssFormat: 'css',
    cssName: 'sprite.styl',
    cssFormat: 'stylus',
  }
});
