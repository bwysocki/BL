const gulp = require('gulp'),
	sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});