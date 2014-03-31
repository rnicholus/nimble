/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        autoWatch : false,

        basePath : ".",

        files : [
            "app/lib/*.js",
            "test/lib/angular/*",
            "app/js/**/*.js",
            "test/unit/**/*.js"
        ],

        frameworks: ["jasmine"],

        singleRun: true,

        plugins : [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine"
        ]
    },
    dev: {
        browsers: ["Chrome"]
    },
    travis: {
        browsers: ["Firefox"]
    }
};