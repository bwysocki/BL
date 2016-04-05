const gulp = require('gulp'),
	print = require('gulp-print');

gulp.task('html', function () {
    return gulp.src('src/**/*.html')
    	.pipe(print(function(filepath) {
			return "building html: " + filepath;
		}))
        .pipe(gulp.dest('build/src'));
});
