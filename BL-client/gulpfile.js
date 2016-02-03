var gulp = require('gulp');
var ts = require('gulp-typescript');

require('require-dir')('./gulp-tasks');

gulp.task('default', ['compile-ts']);