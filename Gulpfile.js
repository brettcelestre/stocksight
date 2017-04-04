
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    webpack = require('gulp-webpack');

gulp.task('css', function() {
  return gulp.src('./client/assets/sass/styles.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./client/assets/css/'));
});

gulp.task('watch', function() {
  gulp.watch(['./client/assets/sass/styles.scss', 'Gulpfile.js'], ['css']);
});

gulp.task('webpack', function() {
  return gulp.src('.app.modules.js')
  .pipe(webpack( require('./webpack.config') ))
  .pipe(gulp.dest('client/'));
});

gulp.task('default', ['watch', 'webpack']);
