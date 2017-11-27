var path = require('path');
var webpack = require('webpack');

const ENV = process.env.NODE_ENV;
const isProduction = ENV === 'production';
const isDev = !isProduction;
const projectRootPath = process.cwd();

let babelOptions = {
  'presets': [
    ['env', {
      targets: {
        browsers: require('./browserlist')
      }
    }],
    'stage-0',
    'react'
  ],
  'plugins': [
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-es2015-modules-commonjs'
  ],
  'env': {
    'production': {
      'plugins': [
        'transform-react-constant-elements',
        'transform-react-inline-elements'
      ]
    }
  }
};

var webpackConfig = {
  context: path.resolve(projectRootPath, 'src', 'scripts'),

  entry: isDev
    ? [
      'webpack-hot-middleware/client',
      './main'
    ]
    : [
      './main'
    ],

  output: {
    filename: '[name].js',
    // filename: '[name].[hash].js',
    path: path.join(projectRootPath, 'public/assets/js/'),
    publicPath: '/assets/js/'
  },

  resolve: {
    modules: [
      path.join(projectRootPath, 'src', 'scripts'),
      path.join(projectRootPath, 'node_modules'),
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
      path.join(projectRootPath, 'node_modules'),
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
      // async: 'vendor'
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //     minChunks: module => (
    //       module.context &&
    //       module.context.indexOf('jquery') !== -1
    //     ),
    //     name: 'jquery'
    //     // async: 'jquery'
    //   })
  ].concat(isProduction ? [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      mangle: { screw_ie8: true },
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
    new webpack.HotModuleReplacementPlugin()
  ]),

  module: {
    rules: [
      {
        test: [/\.js$/, /\.jsx$/],
        use: isDev ? [
            // { loader: 'react-hot-loader' },
            { loader: 'babel-loader', options: babelOptions }
        ]: [
            { loader: 'babel-loader', options: babelOptions }
        ],
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
