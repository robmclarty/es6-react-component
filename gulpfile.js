'use strict';

const gulp = require('gulp');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const replace = require('gulp-replace');

const vendors = [
  'react',
  'react-dom'
];

// Vendors don't change during development, so save them to a separate file to
// make rebuilding the app faster.
gulp.task('vendors', function () {
  let stream = browserify({
    debug: false,
    require: vendors
  });

  return stream
    .bundle()
    .pipe(source('vendors.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./public/javascripts'));
});

// Concatenate all app JS files, parse JSX and ES6 using Babel, write
// sourcemaps, use browserify for CommonJS and output to
// 'public/javascripts/application.js' as ES5.
gulp.task('app', function () {
  let stream = browserify({
    entries: ['./app/app.jsx'],
    transform: [babelify],
    debug: true,
    extensions: ['.jsx'],
    fullPaths: false
  });

  vendors.forEach(function (vendor) {
    stream.external(vendor);
  });

  return stream
    .bundle()
    .pipe(source('application.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(replace(/'use strict';/g, ''))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('public/javascripts'));
});

// Copy the root index.html file to the public directory for distribution.
gulp.task('layout', function () {
  return gulp
    .src('index.html')
    .pipe(gulp.dest('public'));
});

gulp.task('server', function () {
  return gulp
    .src('./public/')
    .pipe(webserver({
      livereload: true,
      open: false,
      port: 3000
    }));
});

// Watch for any changes in app files and rebuild as necessary.
gulp.task('watch', function () {
  gulp.watch('app/**/*', ['app']);
  gulp.watch('index.html', ['layout']);
});

// Build all production files.
gulp.task('build', ['vendors', 'app', 'layout']);

// Make a fresh build, launch the webserver, and watch for changes.
gulp.task('default', ['build', 'server', 'watch']);
