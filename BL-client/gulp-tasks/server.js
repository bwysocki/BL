var gulp = require('gulp'),
    connect = require('gulp-connect');

gulp.task('server', function () {
    connect.server({
        root: ['src', 'build', './'],
        port: 3000,
        livereload: true
    });
});
