'use strict';

var gulp = require("gulp"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css");

//paths
var paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dist: './dist/css/'
  }
}

gulp.task('sass', function() {
  return gulp.src(paths.styles.src)
    // .pipe(plumber)
    // .pipe(autoprefixer({
    //   browsers: ['last 2 versions']
    // }))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles.dist));
});

// gulp.task('sass:watch', function () {
//   gulp.watch('./src/scss/**/*.scss', ['sass']);
// });

gulp.task('default', ['sass']);

