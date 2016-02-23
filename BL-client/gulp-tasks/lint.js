var tslint = require('gulp-tslint'), 
	gulp = require('gulp'), 
	srcFiles = [ 'src/**/*.ts' ];

gulp.task('tslint', function() {
	return gulp.src(srcFiles)
		.pipe(tslint())
		.pipe(tslint.report('full'));
});