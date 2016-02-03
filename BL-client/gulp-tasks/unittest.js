var gulp = require('gulp');
var ts = require('gulp-typescript');

gulp.task('unittest', function() {
	return gulp.src('src/**/*.ts').pipe(ts({
		noImplicitAny : true,
		out : 'output.js'
	})).pipe(gulp.dest('build'));
});