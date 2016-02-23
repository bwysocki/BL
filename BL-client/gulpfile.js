var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp-tasks');

gulp.task('default', function (callback) {
    runSequence(['compile-ts', 'tslint', 'bower', 'unittest', 'server', 'watch'], callback);
});

