var gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	ts = require('gulp-typescript');


gulp.task('compile-ts', function() {
	return gulp.src('src/**/*.ts').pipe(ts({
		noImplicitAny : true,
		out : 'output.js' 
	})).pipe(gulp.dest('build')).pipe(livereload());
});
