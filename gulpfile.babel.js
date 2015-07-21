'use strict';

import gulp from 'gulp';
import webserver from 'gulp-webserver';
import watch from 'gulp-watch';
import babel from 'babel-core/register';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import util from 'gulp-util';

const vendors = [
  'react',
  'react-dom',
  'object-assign'
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
    .on('error', util.log)
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
