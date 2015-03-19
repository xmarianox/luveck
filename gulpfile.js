var pkg = require('./package.json'),

	gulp         = require('gulp'),
	rename       = require('gulp-rename'),
	uglify       = require('gulp-uglify'),
	filesize     = require('gulp-filesize'),
	cssmin       = require('gulp-cssmin'),
	autoprefixer = require('gulp-autoprefixer');

gulp.task('js', function(){
	return gulp.src('assets/js/main.js')
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
	return gulp.src('assets/css/main.css')
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
