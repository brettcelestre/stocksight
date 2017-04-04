var path = require('path');
var webpack = require('webpack');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'client');

module.exports = {
  context: __dirname + '/client/app/',
  entry: './app.module.js',
  output: {
    // path: path.join(__dirname, 'client'),
    path: buildPath,
    filename: 'bundle.js',
    // exclude: /(node_modules|bower_components)/,
    publicPath: '/build/' //the server will listen in on this path and then proxy Webpack
  },
  module: {
    loaders: []
  }
};
