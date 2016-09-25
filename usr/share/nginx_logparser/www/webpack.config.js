const resolve = require('path').resolve;

const pathTo = {
  entry: resolve(__dirname, 'src/entry.js'),
  bundleDir: resolve(__dirname, 'bundle/js/'),
};

module.exports = {
  entry: pathTo.entry,
  output: {
    path: pathTo.bundleDir,
    filename: 'index.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
      },
    ],
  },
};
