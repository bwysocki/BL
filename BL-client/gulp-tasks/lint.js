const tslint = require('gulp-tslint'), 
	gulp = require('gulp');

gulp.task('tslint', function() {
	return gulp.src('src/**/*.ts')
		.pipe(tslint())
		.pipe(tslint.report('full'));
});