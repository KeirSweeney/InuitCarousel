'use strict';

var gulp = require("gulp"),
    watch = require("gulp-watch"),
    plumber = require("gulp-plumber"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cleanCSS = require("gulp-clean-css"),
    browserSync = require("browser-sync").create();

//paths
var paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dist: './dist/css/'
  },
  html: {
    src: './src/index.html',
    dist: './dist/html/'
  },
  image: {
    src: './src/images/*.png',
    dist: './dist/images/'
  }
}

gulp.task('sass', function() {
  return gulp.src(paths.styles.src)
    .pipe(plumber())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('html', function() {
  return gulp.src(paths.html.src)
  .pipe(gulp.dest(paths.html.dist))

});

gulp.task('image', function()
{
  return gulp.src(paths.image.src)
  .pipe(gulp.dest(paths.image.dist))
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir : 'dist'
    },
    startPath: '/html'
  });
});

gulp.task('sass:watch',['sass'], function() {
  gulp.watch(['src/scss/*.scss','src/scss/**/*.scss'], ['sass']);
});

gulp.task('browser:watch',['browserSync','image', 'sass', 'html'], function() {
  gulp.watch(['src/scss/*.scss','src/scss/**/*.scss'], ['sass']);
  // gulp.watch('src/*.html', ['html']);
  gulp.watch('src/*.html', ['html']).on('change', browserSync.reload);
  //gulp.watch('src/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['sass']);

