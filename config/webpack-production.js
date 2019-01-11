const fs = require('fs');
const copy = require('copy');
const path = require('path');
const colors = require('colors');
const process = require('process');
const webpack = require('webpack');
const logUpdate = require('log-update');
const timestamp = require('time-stamp');
const prettyBytes = require('pretty-bytes');
const autoprefixer = require('autoprefixer');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');

const mode = process.env.NODE_ENV || 'production';

const linter = {
  test: /\.(js|jsx|mjs)$/,
  enforce: 'pre',
  use: [
    {
      options: {
        formatter: eslintFormatter,
        eslintPath: require.resolve('eslint'),
        
      },
      loader: require.resolve('eslint-loader'),
    },
  ],
  include: path.resolve(__dirname, 'src'),
};

const imgLoad = {
  test: /\.(gif|png|jpe?g|svg)$/i,
  loader: require.resolve('url-loader'),
  options: {
    limit: 10000,
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const jsLoad = {
  test: /\.(js|jsx|mjs)$/,
  loader: require.resolve('babel-loader'),
  options: {
    cacheDirectory: true,
  },
  exclude: /(node_modules)/,
};

const sassLoad = {
  test: /\.s?(a|c)ss$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: {
          safe: true,
        },
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        autoprefixer: {
          browsers: [ "last 2 versions" ],
        },
        plugins: () => [
          autoprefixer,
        ],
      },
    },
    {
      loader: require.resolve('sass-loader'),
      options: {},
    },
  ]
};

const fileLoad = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

const browserOptimization = {
  minimizer: [
    new UglifyJsPlugin({
      'cache': true,
      'parallel': true,
      'uglifyOptions': {
        'sourceMap': true,
        'output': { comments: false },
        'mangle': true,
        'compress': {
          'properties': true,
          'keep_fargs': false,
          'pure_getters': true,
          'collapse_vars': true,
          'warnings': false,
          'sequences': true,
          'dead_code': true,
          'drop_debugger': true,
          'comparisons': true,
          'conditionals': true,
          'evaluate': true,
          'booleans': true,
          'loops': true,
          'passes': 4,
          'unused': true,
          'hoist_funs': true,
          'if_return': false,
          'join_vars': false,
          'reduce_vars': false,
          'drop_console': true,
          'pure_funcs': [
            'classCallCheck',
            '_classCallCheck',
            '_possibleConstructorReturn',
            'Object.freeze',
            'invariant',
            'warning'
          ]
        },
      },
      sourceMap: true,
    }),
  ],
};

const serverOptimization = {
  minimizer: [
    new UglifyJsPlugin({
      'cache': true,
      'parallel': true,
      'uglifyOptions': {
        'sourceMap': true,
        'output': { comments: false },
        'mangle': true,
        'compress': {
          'properties': true,
          'keep_fargs': false,
          'pure_getters': true,
          'collapse_vars': true,
          'warnings': false,
          'sequences': true,
          'dead_code': true,
          'drop_debugger': true,
          'comparisons': true,
          'conditionals': true,
          'evaluate': true,
          'booleans': true,
          'loops': true,
          'passes': 4,
          'unused': true,
          'hoist_funs': true,
          'if_return': false,
          'join_vars': false,
          'reduce_vars': false,
          'drop_console': false,
          'pure_funcs': [
            'classCallCheck',
            '_classCallCheck',
            '_possibleConstructorReturn',
            'Object.freeze',
            'invariant',
            'warning'
          ]
        },
      },
      sourceMap: true,
    }),
  ],
};

const aliases = {
  'react': 'preact-compat',
  'react-dom': 'preact-compat',
};

const commonPlugins = [
  new MiniCssExtractPlugin({
    filename: 'static/styles/main.css',
  }),
];

const browserConfig = {
  mode: mode,
  stats: 'errors-only',
  entry: './src/browser/index.js',
  // optimization: browserOptimization,
  optimization: { minimizer: [] },
  resolve: {
    alias: aliases,
  },
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'static/scripts/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      linter,
      { oneOf: [ imgLoad, jsLoad, sassLoad, fileLoad ] },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.MSF_KEY': JSON.stringify(process.env.MSF_KEY),
      'process.env.MSF_PASS': JSON.stringify(process.env.MSF_PASS),
      __isBrowser__: 'true',
    }),
    ...commonPlugins,
  ].filter(Boolean),
};

const serverConfig = {
  mode: mode,
  stats: 'errors-only',
  entry: './src/server/index.js',
  target: 'node',
  // optimization: serverOptimization,
  optimization: { minimizer: [] },
  resolve: {
    alias: aliases,
  },
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      linter,
      { oneOf: [ imgLoad, jsLoad, sassLoad, fileLoad ] },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(mode),
      __isBrowser__: 'false'
    }),
    ...commonPlugins,
  ].filter(Boolean)
};

module.exports = [browserConfig, serverConfig];
