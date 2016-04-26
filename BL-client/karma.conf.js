module.exports = function (config) {
    'use strict';
    config.set({
        basePath: '.',
        frameworks: ['browserify', 'jasmine'],
        preprocessors: {
            '!(bower_components)/**/!(*_test).js': ['coverage'],
            'build/src/**/*-test.js': [ 'browserify' ]
        },
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            type: 'cobertura',
            dir: 'build/coverage/'
        },
        
        // web server port
        port: 3003,
        
        proxies: {
    	  '/src/': '/base/src/'
    	},
        
        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        // (To debug test in Chrome, change 'PhantomJS' to 'Chrome' & in test.gulp.js change 'action: 'run'' to 'action: 'watch'')
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,
        browserDisconnectTimeout : 10000,
        browserDisconnectTolerance : 1,
        browserNoActivityTimeout : 60000,

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        plugins: [
            'karma-phantomjs-launcher',
            'karma-coverage',
            'karma-jasmine',
            'karma-browserify'
        ]
    });
};
