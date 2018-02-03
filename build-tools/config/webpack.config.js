var path = require('path');
var webpack = require('webpack');

const { IS_PRODUCTION: isProduction, ENV } = require('./env');
const babelOptions = require('./babelOptions');
const PATHS = require('./paths');

const isDev = !isProduction;

var webpackConfig = {
    context: path.resolve(PATHS.PROJECT_ROOT_PATH, PATHS.src.scripts),

    entry: isDev ?
        [
            'webpack-hot-middleware/client',
            './main'
        ] :
        [
            './main'
        ],

    output: {
        filename: '[name].js',
        path: path.join(PATHS.PROJECT_ROOT_PATH, PATHS.dest.scripts),
        publicPath: PATHS.PUBLIC_JS_PATH
    },

    resolve: {
        modules: [
            path.join(PATHS.PROJECT_ROOT_PATH, PATHS.src.scripts),
            path.join(PATHS.PROJECT_ROOT_PATH, 'node_modules'),
            'node_modules'
        ],
        extensions: [
            '.js', '.json', '.jsx',
            '.ts', '.tsx',
            '.coffee', '.csx'
        ]
    },

    resolveLoader: {
        modules: [
            path.join(PATHS.PROJECT_ROOT_PATH, 'node_modules'),
            'node_modules'
        ],
        extensions: ['.js', '.json']
    },

    devtool: isProduction ? false : 'source-map',
    watch: isProduction ? false : true,

    plugins: [
        // не дает перезаписать скрипты при наличии в них ошибок
        new webpack.NoEmitOnErrorsPlugin(),

        // минимизирует id, которые используются webpack для подгрузки чанков и прочего
        new webpack.optimize.OccurrenceOrderPlugin(),

        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(ENV),
            'process.env': {
                'NODE_ENV': JSON.stringify(ENV)
            }
        }),

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
        }),

        new webpack.optimize.CommonsChunkPlugin({
            minChunks: module => (
                module.context &&
                module.context.indexOf('node_modules') !== -1
            ),
            name: 'vendor'
        }),
    ].concat(isProduction ? [
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,
            comments: false,
            mangle: {
                screw_ie8: true
            },
            compress: {
                screw_ie8: true,
                sequences: true,
                booleans: true,
                loops: true,
                unused: true,
                warnings: false,
                drop_console: true,
                unsafe: true
            }
        })
    ] : [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]),

    module: {
        rules: [{
                test: [/\.js$/, /\.jsx$/],
                use: isDev ? [
                    // { loader: 'react-hot-loader' },
                    {
                        loader: 'babel-loader',
                        options: babelOptions
                    }
                ] : [{
                    loader: 'babel-loader',
                    options: babelOptions
                }],
                exclude: [/node_modules/, /build/]
            },
            {
                test: /\.tsx?$/,
                use: ['awesome-typescript-loader'],
                exclude: [/node_modules/, /build/]
            }
        ]
    }
};

module.exports = webpackConfig;
