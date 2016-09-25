const resolve = require('path').resolve;
const join = require('path').join;
const NoErrorsPlugin = require('webpack').NoErrorsPlugin;

module.exports = {
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
    ],
  },
  plugins: [
    new NoErrorsPlugin(),
  ],
};
