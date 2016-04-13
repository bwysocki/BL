const gulp = require('gulp'), 
	Server = require('karma').Server, 
	wiredep = require('wiredep');

gulp.task('unittest', function(done) {

	const bowerDeps = wiredep(), files = bowerDeps.js.concat([ 
	   { pattern: 'src/classes/angular-services/web-camera-grabber/sample-video.png',  watched: false, included: false, served: true},
	   'node_modules/traceur/bin/traceur-runtime.js',
	   'node_modules/angular2/bundles/angular2-polyfills.js',
	   'node_modules/es6-shim/es6-shim.js',
	   'node_modules/systemjs/dist/system-polyfills.src.js',
       'node_modules/systemjs/dist/system.src.js',
       'node_modules/rxjs/bundles/Rx.js',
       'node_modules/angular2/bundles/angular2.dev.js',
       'node_modules/angular2/bundles/testing.dev.js',
       'build/js-vendor/JSARToolKit.min.js',
       'build/src/**/*-test.js']);

	return new Server({
		configFile : __dirname + '/../karma.conf.js',
		files : files
	}, done).start()

});
