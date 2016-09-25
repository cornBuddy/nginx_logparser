import gulp from 'gulp';
import eslint from 'gulp-eslint';
import mocha from 'gulp-spawn-mocha';
import clear from 'clear';
import del from 'del';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config';
import { join } from 'path';

const isDevelopment = !process.env.ENV
    || process.env.ENV === 'development';

const pathTo = {
  src: __dirname + '/src/**/*.js',
  index: __dirname + '/src/index.js',
  tests: __dirname + '/test/**/*.js',
  bundle: join(__dirname, 'bundle'),
};

const doNothing = () => null;

export function clean() {
  return del(pathTo.bundle);
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

export function webpack() {
  del()
  return gulp.src(pathTo.index)
    .pipe(webpackStream(webpackConfig))
    .pipe(gulp.dest(pathTo.bundle));
}

export default function dev() {
  clean();
  gulp.watch([pathTo.src, pathTo.tests],
    gulp.series('clearConsole', 'lint', 'test'));
}
