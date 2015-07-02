var pkg = require('./package.json'),

  gulp         = require('gulp'),
  rename       = require('gulp-rename'),
  uglify       = require('gulp-uglify'),
  filesize     = require('gulp-filesize'),
  cssmin       = require('gulp-cssmin'),
  autoprefixer = require('gulp-autoprefixer')
  concat       = require('gulp-concat');

gulp.task('js', function(){
  return gulp.src([
      'bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.js',
      'bower_components/bxslider-4/dist/jquery.bxslider.js',
      'assets/js/main.js',
    ])
    .pipe(concat('compiled.js'))
    .pipe(gulp.dest('assets/js'))
    .pipe(filesize())
    .pipe(uglify({
      mangle: true,
      output: {
        ascii_only: true
      },
      compress: {
        drop_console: true
      }
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/js'))
    .pipe(filesize());
});

gulp.task('css', function(){
  return gulp.src([
      'bower_components/nanoscroller/bin/css/nanoscroller.css',
      'bower_components/bxslider-4/dist/jquery.bxslider.css',
      'assets/css/main.css'
    ])
    .pipe(concat('compiled.css'))
    .pipe(gulp.dest('assets/css'))
    .pipe(filesize())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      remove: true
    }))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('assets/css'))
    .pipe(filesize());
});
