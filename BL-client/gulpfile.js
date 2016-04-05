var gulp = require('gulp');
var runSequence = require('run-sequence');

require('require-dir')('./gulp-tasks');

gulp.task('default', function (callback) {
    runSequence(['compile-ts', 'tslint', 'unittest', 'bower', 'html', 'sass', 'server', 'watch', 'sass:watch'], callback); 
});

