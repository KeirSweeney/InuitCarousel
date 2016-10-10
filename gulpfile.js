'use strict';

var gulp = require("gulp"),
  watch = require("gulp-watch"),
  plumber = require("gulp-plumber"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  browserSync = require("browser-sync").create(),
  imagemin = require("gulp-imagemin"),
  cache = require('gulp-cache'),
  useref = require('gulp-useref'),
  uglify = require('gulp-uglify'),
  gulpIf = require('gulp-if'),
  del = require('del'),
  gutil = require('gulp-util'),
  notify = require('gulp-notify'),
  through = require('through');

//paths
var paths = {
  styles: {
    src: './src/scss/**/*.scss',
    dist: './dist/css/'
  },
  html: {
    src: './src/index.html',
    dist: './dist/'
  },
  image: {
    src: './src/images/*.+(png|jpg|gif|svg)',
    dist: './dist/images/'
  },
  js: {
    src: './src/js/*.js',
    dist: './dist/js/'
  }
};

gulp.task('sass', function() {
  return gulp.src(paths.styles.src)
    .pipe(plumber({
      errorHandler: function(err) {
        gutil.log(err.message);
        this.emit('end');
      }
    }))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest(paths.styles.dist))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('useref', function() {
  return gulp.src('./src/index.html')
    .pipe(plumber({
      errorHandler: function(err) {
        gutil.log(gutil.colors.red('Error (' + err.plugin + '): ' + '\n' + err.cause.message + '\nFilename: ' + err.cause.filename + '\nLine: ' + err.cause.line));
        this.emit('end');
      }
    }))
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    // .pipe(gulpIf('*.js', (uglify().on('error', gutil.log))))
    .pipe(gulp.dest('./dist/html/'));
});

gulp.task('clean:dist', function() {
  return del.sync('./dist/');
});

gulp.task('js', function() {
  return gulp.src(paths.js.src)
    .pipe(gulp.dest(paths.js.dist));
}); /*JS pipe no longer needed but keeping temporarily*/

gulp.task('html', function() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dist));
});/* HTML pipe will no longer be needed but keeping temporarily */

gulp.task('images', function() {
  return gulp.src(paths.image.src)
    .pipe(cache(imagemin({
      //Set interalaced to true for optimising GIFs
      interalaced: true,
    })))
    .pipe(gulp.dest(paths.image.dist));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
    startPath: './html/'
  });
});

gulp.task('sass:watch', ['sass'], function() {
  gulp.watch(['src/scss/*.scss', 'src/scss/**/*.scss'], ['sass']);
});

gulp.task('browser:watch', ['browserSync', 'clean:dist','sass','useref', 'images'], function() {
  gulp.watch(['src/scss/**/*.scss'], ['sass']);
  gulp.watch('src/*.html', ['useref']).on('change', browserSync.reload);
  gulp.watch('src/images/*.+(png|jpg|gif|svg)', ['images']);
  gulp.watch('src/js/*.js', ['useref']).on('change', browserSync.reload);
});

gulp.task('default', ['sass']);
