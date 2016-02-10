var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp-tasks');

gulp.task('build', function (callback) {
    runSequence('compile-ts', 'bower', 'unittest', callback);
});

gulp.task('default', ['build', 'server', 'watch']);