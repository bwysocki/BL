const gulp = require('gulp'),
	livereload = require('gulp-livereload'),
	ts = require('gulp-typescript'),
	config = ts.createProject('tsconfig.json');

gulp.task('compile-ts', function() {
	return config.src()
		.pipe(ts(config))
		.pipe(gulp.dest('build'))
		.pipe(livereload());
});
