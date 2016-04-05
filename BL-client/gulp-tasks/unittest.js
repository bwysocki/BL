const gulp = require('gulp'), 
	Server = require('karma').Server, 
	wiredep = require('wiredep');

gulp.task('unittest', function(done) {

	const bowerDeps = wiredep(), files = bowerDeps.js.concat([ 'build/notyet/**/*.js' ]).concat(
			[ 'src/**/*-test.js' ]);

	return new Server({
		configFile : __dirname + '/../karma.conf.js',
		files : files,
		singleRun : true
	}, done).start()

});
