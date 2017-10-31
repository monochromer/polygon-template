const path = require('path');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const BUILD_ROOT = `public`;
const ASSETS = `${BUILD_ROOT}/assets`;
const SRC_ROOT = `src`;

const PATHS = {
    dest: {
        root: BUILD_ROOT,
        fonts: `${ASSETS}/fonts`,
        images: `${ASSETS}/img`,
        styles: `${ASSETS}/css`,
        views: BUILD_ROOT,
        scripts: `${ASSETS}/js`
    },

    src: {
        root: SRC_ROOT,
        fonts: `${SRC_ROOT}/fonts/**/*.*`,
        images: `${SRC_ROOT}/images/**/*.*`,
        'sprite:images': `${SRC_ROOT}/icons/*.*`,
        'sprite:svg': `${SRC_ROOT}/svg-sprite/**/*.svg`,
        styles: `${SRC_ROOT}/styles/*.*`,
        views: `${SRC_ROOT}/views/pages/*/*.pug`,
        data: path.join(process.cwd(), 'data'),
        scripts: `${SRC_ROOT}/scripts/*.*`
    },

    watch: {
        fonts: `${SRC_ROOT}/fonts/**/*.*`,
        images: `${SRC_ROOT}/images/**/*.*`,
        'sprite:images': `${SRC_ROOT}/icons/*.*`,
        'sprite:svg': `${SRC_ROOT}/svg-sprite/**/*.*`,
        styles: `${SRC_ROOT}/styles/**/*.*`,
        views: `${SRC_ROOT}/views/**/*.*`
    }
};

let webpackConfigPath = path.resolve(__dirname, 'webpack.config.js');

module.exports = {
    isProduction: IS_PRODUCTION,

    clean: {
        src: PATHS.dest.root
    },

    deploy: {
        src: `${PATHS.dest.root}/**/*`,
        deployOptions: {
            prefix: PATHS.dest.root,
            repository: '',
            message: 'deploy',
            // branches: ['gh-pages'],
            remoteBranch: 'gh-pages',
            verbose: true,
            debug: true
        }
    },

    fonts: {
        src: PATHS.src.fonts,
        dest: PATHS.dest.fonts,
        watchFiles: PATHS.watch.fonts
    },

    images: {
        src: PATHS.src.images,
        watchFiles: PATHS.watch.images,
        dest: PATHS.dest.images,
        imageminOptions: {}
    },

    indexgen: {
        filename: 'index.html',
        src: [
            `${PATHS.dest.root}/*.html`,
            `!${PATHS.dest.root}/index.html`
        ],
        dest: PATHS.dest.root,
        dataPath: PATHS.src.data
    },

    scripts: {
        src: PATHS.src.scripts,
        dest: PATHS.dest.scripts,
        excludeWatch: true,
        webpackConfigPath
    },

    server: {
        webpackConfigPath,
        enableHot: !IS_PRODUCTION,
        isProd: IS_PRODUCTION,
        bsConfig: {
          server: {
            baseDir: BUILD_ROOT,
            directory: true
          },
          host: process.env.IP || 'localhost',
          port: process.env.PORT || 3000,
          notify: true,
          injectChanges: true,
          open: false,
          tunnel: false
        }
    },

    'sprite:images': ({ localPath }) => ({
        src: PATHS.src['sprite:images'],
        watchFiles: PATHS.watch['sprite:images'],
        imgDest: PATHS.dest.images,
        stylesDest: process.cwd() + '/temp/',
        spriteOptions: {
            algorithm: 'top-down',
            /* top-down | left-right | diagonal | alt-diagonal | binary-tree */
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
    }),

    'sprite:svg': ({ localPath }) => ({
        src: PATHS.src['sprite:svg'],
        watchFiles: PATHS.watch['sprite:svg'],
        dest: PATHS.dest.images,
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
                    generator: function (name, file) {
                        return 'icon_' + name.replace('.svg', '');
                    }
                }
            },
            'transform': [{
                'svgo': {
                    'plugins': [{
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
    }),

    styles: {
        src: PATHS.src.styles,
        watchFiles: PATHS.watch.styles,
        dest: PATHS.dest.styles,
        plugins: {
            'autoprefixer': {
                browsers: ['>1%', 'last 4 version', 'ie 10', 'ie 11']
            },
            'css-mqpacker': {},
            'postcss-csso': {
                restructure: false,
                comments: false
            }
        }
    },

    views: {
        src: PATHS.src.views,
        watchFiles: [PATHS.watch.views, PATHS.src.data],
        dest: PATHS.dest.views,
        dataPath: PATHS.src.data,
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
    },

    zip: {
        src: `${BUILD_ROOT}/**/*.*`,
        dest: '.',
        fileName: null
    }
}
