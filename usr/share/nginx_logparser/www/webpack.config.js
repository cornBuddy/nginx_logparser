const resolve = require('path').resolve;
const join = require('path').join;
const NoErrorsPlugin = require('webpack').NoErrorsPlugin;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-inline-source-map',
  devServer: {
    inline: true,
  },
  entry: {
    index: join(__dirname, 'src', 'index.js'),
  },
  output: {
    path: join(__dirname),
    filename: 'bundle/js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: join(__dirname, 'src'),
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin
          .extract('style-loader', 'css-loader'),
      },
      {
        test: /\.(png|jgp|svg|ttf|eot|woff|woff2)$/,
        loader: 'file?name=[path][name].[ext]',
      }
    ],
  },
  plugins: [
    new NoErrorsPlugin(),
    new ExtractTextPlugin('bundle/css/[name].css')
  ],
};
