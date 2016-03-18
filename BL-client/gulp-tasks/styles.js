const gulp = require('gulp'),
	sass = require('gulp-sass');
 
gulp.task('sass', function () {
  return gulp.src('src/styles/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('src/styles/app.scss', ['sass']);
});