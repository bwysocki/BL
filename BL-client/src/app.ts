window.addEventListener('DOMContentLoaded', function() {
    'use strict';

    System.config({
        map: {
            moment: '../bower_components/moment/moment.js'
        },
        packages: {
            'src': {
                defaultExtension: 'js'
            }
        }
    });
    System.import('src/angular-start').then(null, console.error.bind(console));
});
