var pkg = require('./package.json'),

	gulp     = require('gulp'),
	rename   = require('gulp-rename'),
	uglify   = require('gulp-uglify'),
	filesize = require('gulp-filesize');

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
		.pipe(rename('main.min.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(filesize());
});
