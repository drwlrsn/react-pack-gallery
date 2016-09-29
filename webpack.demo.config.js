var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var path = require('path');
var env = require('yargs').argv.mode;

var libraryName = 'Gallery';

var HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV || 'development';
const DEV = ENV === 'development';
const PROD = ENV === 'production';

var plugins = [new HtmlWebpackPlugin({
    title: 'Pack Gallery Demo',
    filename: 'index.html',
    template: 'demo/template.html'
  })], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

var config = {
  entry: {
    Gallery: [
      'webpack-dev-server/client?http://localhost:8080/',
      __dirname + '/demo/app.js',
      __dirname + '/src/Gallery.js'
    ]
  },
  externals: {
    React: 'react',
    ReactDOM: 'react-dom',
    LazySizes: 'react-lazysizes'

  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: 'http://localhost:8080/'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      { test: /\.css$/, loader: 'style-loader!css-loader', exclude: /(node_modules|bower_components)/},
      { test: /\.png$/, loader: 'url-loader?limit=100000', exclude: /(node_modules|bower_components)/ },
      { test: /\.jpg$/, loader: 'file-loader', exclude: /(node_modules|bower_components)/ }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  plugins: plugins
};

module.exports = config;
