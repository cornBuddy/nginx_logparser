import gulp from 'gulp';
import { PluginError, log } from 'gulp-util';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';
import clear from 'clear';
import del from 'del';
import named from 'vinyl-named';
import webpackTask from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import webpackConfig from './webpack.config';
import devServer from './devServer';
import { join } from 'path';

const isDevelopment = !process.env.ENV
    || process.env.ENV === 'development';

const pathTo = {
  src: __dirname + '/src/**/*.js',
  tests: __dirname + '/test/**/*.js',
  bundle: join(__dirname, 'bundle'),
};

const doNothing = () => null;

export function clean() {
  return del(join(__dirname, 'bundle'));
}

export function clearConsole(cb) {
  clear();
  cb();
}

export function lint() {
  return gulp.src([pathTo.src, pathTo.tests], {
      read: true,
    })
    .pipe(eslint())
    .pipe(eslint.format());
}

export function test() {
  return gulp.src(pathTo.tests, {
      read: false,
    })
    .pipe(mocha())
    .on('error', doNothing);
}

export function webpack(cb) {
  clean();
  webpackTask(webpackConfig, function(err, stats) {
    if (err)
      throw new PluginError('webpack', err);
    log('[webpack]', stats.toString());
    cb();
  });
}

export default function dev(cb) {
  clean();
  devServer();
  const myConfig = Object.create(webpackConfig);
  myConfig.devtool = 'eval';
  myConfig.debug = true;
  const devServerConfig  = {
    stats: {
      colors: true,
    },
  };
  new WebpackDevServer(webpackTask(myConfig), devServerConfig)
    .listen(3000, 'localhost', function(err) {
      if(err)
        throw new PluginError('webpack-dev-server', err);
    });
}
