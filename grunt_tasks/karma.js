/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        autoWatch : false,

        basePath : ".",

        files : [
            "app/lib/angular.js",
            "app/lib/**/*.js",
            "test/lib/angular/*",
            "app/src/app.js",
            "app/src/**/*.js",
            "test/unit/**/*.js"
        ],

        frameworks: ["jasmine"],

        singleRun: true,

        plugins : [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-phantomjs-launcher",
            "karma-jasmine"
        ]
    },
    dev: {
        browsers: ["PhantomJS"]
    },
    travis: {
        browsers: ["PhantomJS", "Firefox"]
    }
};
