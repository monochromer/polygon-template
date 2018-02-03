const path = require('path');

const PROJECT_ROOT_PATH = process.cwd();
const SRC_ROOT = `src`;
const BUILD_ROOT = `public`;
const ASSETS = `${BUILD_ROOT}/assets`;

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
        scripts: `${SRC_ROOT}/scripts`
    },

    watch: {
        fonts: `${SRC_ROOT}/fonts/**/*.*`,
        images: `${SRC_ROOT}/images/**/*.*`,
        'sprite:images': `${SRC_ROOT}/icons/**/*.*`,
        'sprite:svg': `${SRC_ROOT}/svg-sprite/**/*.*`,
        styles: `${SRC_ROOT}/styles/**/*.*`,
        views: `${SRC_ROOT}/views/**/*.*`
    },

    webpackConfig: path.resolve(__dirname, 'webpack.config.js'),

    PROJECT_ROOT_PATH,
    SRC_ROOT,
    BUILD_ROOT,
    ASSETS,
    PUBLIC_JS_PATH: '/assets/js/'
};

module.exports = PATHS;
