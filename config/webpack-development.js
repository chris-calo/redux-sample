const fs = require('fs');
const path = require('path');
const copy = require('copy');
const ip = require('my-local-ip');
const colors = require('colors');
const process = require('process');
const webpack = require('webpack');
const logUpdate = require('log-update');
const timestamp = require('time-stamp');
const prettyBytes = require('pretty-bytes');
const childProcess = require('child_process');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const MiniCssExtractPlugin = require('extract-css-chunks-webpack-plugin');

const port = 5000;
const mode = process.env.NODE_ENV || 'development';

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
    require.resolve('css-loader'),
    require.resolve('sass-loader'),
  ]
};

const fileLoad = {
  exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
  loader: require.resolve('file-loader'),
  options: {
    name: 'static/media/[name].[hash:8].[ext]',
  },
};

module.exports = {
  mode: mode,
  stats: 'errors-only',
  entry: './src/browser/index.js',
  output: {
    path: path.resolve(__dirname, '..', 'src', 'public'),
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
    new MiniCssExtractPlugin({
      filename: 'static/styles/main.css',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer: {
    hot: false,
    host: '0.0.0.0',
    port: port,
    quiet: true,
    compress: true,
    contentBase: path.resolve(__dirname, '..', 'src', 'public'),
    historyApiFallback: true,
    before: () => {
      console.log(
        colors.bold.white(
          `Server currently listening :\n`
        ) +
        colors.reset.yellow(
          `\nMachine access: http://localhost:${port}\n`
        ) +
        colors.reset.yellow(
          `Network access: http://${ip()}:${port}`
        )
      );

      childProcess.execSync('ps cax | grep "Google Chrome"');
      childProcess.execSync(
        `osascript chrome.applescript "${encodeURI(
          `http://localhost:${port}`
        )}"`,
        {
          cwd: path.resolve(__dirname),
          stdio: 'ignore',
        }
      );
    },
  },
};
