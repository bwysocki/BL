var gulp = require('gulp'),
    livereload = require('gulp-livereload'),
    getNow = function () {
		return new Date().getTime();
	};

// Watches the source tree for changes
gulp.task('watch', function () {
	var previousInvocation = getNow();
	livereload.listen({
		quiet: 'true'
	});
	gulp.watch(['src/**/*.ts'], function () {
		if (previousInvocation + 5000 < getNow()){
			previousInvocation = getNow();
			gulp.start(['compile-ts', 'tslint'], function () {
				livereload();
			});
		}
	});
	
    //gulp.watch(['src/**/*.ts']).on('change', livereload.changed);
    gulp.watch(['build/output.js'], livereload.changed);
    gulp.watch(['src/**/*.html'], livereload.changed);
});