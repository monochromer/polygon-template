const path = require('path');

const PATHS = require('./paths');
const { IS_PRODUCTION, ENV } = require('./env');
const BROWSER_LIST = require('./browserlist');

const {
    BUILD_ROOT
} = PATHS;

const TASKS_CONFIG = {
    clean: {
        src: PATHS.dest.root
    },

    deploy: {
        src: `${PATHS.dest.root}/**/*`,
        deployOptions: {
            prefix: PATHS.dest.root,
            repository: 'https://some-host.com/some-repo.git',
            message: 'deploy',
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
        dest: PATHS.dest.images,
        watchFiles: PATHS.watch.images,
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
        src: `${PATHS.src.scripts}/*.*`,
        dest: PATHS.dest.scripts,
        excludeWatch: true,
        webpackConfigPath: PATHS.webpackConfig,
        isProduction: IS_PRODUCTION
    },

    server: {
        webpackConfigPath: PATHS.webpackConfig,
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

    'sprite:images': {
        isProduction: IS_PRODUCTION,
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
            // retinaSrcFilter: 'src/icons/*@2x.png',
            // retinaImgName: 'icons@2x.png',
            // retinaImgPath: '../img/icons@2x.png',
            get cssTemplate() {
                return path.join(
                    PATHS.PROJECT_ROOT_PATH,
                    'build-tools',
                    'tasks',
                    'sprite',
                    'sprite-template.stylus.hbs'
                );
            },
            cssName: 'sprite.styl',
            cssFormat: 'stylus',
        }
    },

    'sprite:svg': {
        src: PATHS.src['sprite:svg'],
        watchFiles: PATHS.watch['sprite:svg'],
        dest: PATHS.dest.images,
        stylesDest: process.cwd() + '/temp/',
        svgSpriteConfig: {
            'mode': {
                'symbol': {
                    dest: '',
                    sprite: 'icons.svg',
                    bust: false,
                    render: {
                        styl: {
                            dest: 'svg-sprite.styl',
                            template: path.join(
                                PATHS.PROJECT_ROOT_PATH,
                                'build-tools',
                                'tasks',
                                'svg-sprite',
                                'sprite-template.styl.hbs'
                            )
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
    },

    styles: {
        isProduction: IS_PRODUCTION,
        src: PATHS.src.styles,
        watchFiles: PATHS.watch.styles,
        dest: PATHS.dest.styles,
        engineOptions: {
            paths:  [
                'node_modules',
                'bower_components',
                'temp'
            ],
            'include css': true,
            sourcemap: true,
            compress: false
        },
        plugins: {
            'autoprefixer': {
                browsers: BROWSER_LIST
            },
            'css-mqpacker': {},
            'postcss-csso': {
                restructure: false,
                comments: false
            }
        }
    },

    views: {
        isProduction: IS_PRODUCTION,
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
};

module.exports = TASKS_CONFIG;
