import gulp from 'gulp';
import webserver from 'gulp-webserver';
import watch from 'gulp-watch';
import babel from 'babel/register';
import browserify from 'browserify';

gulp.task('server', function () {
  return gulp
    .src('./public/')
    .pipe(webserver({
      livereload: true,
      open: false,
      port: 3000
    }));
});
