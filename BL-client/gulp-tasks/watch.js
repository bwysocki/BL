var gulp = require('gulp'),
    livereload = require('gulp-livereload');

// Watches the source tree for changes
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(['src/**/*.js'], ['compile-ts']);
    gulp.watch(['build/output.js'], livereload.changed);
    gulp.watch(['src/**/*.html'], livereload.changed);
});