/* jshint node:true */
module.exports = function(config){
    config.set({
        basePath : "../",

        files : [
            "app/lib/*",
            "test/lib/angular/*",
            "app/js/**/*.js",
            "test/unit/**/*.js"
        ],

        autoWatch : false,

        singleRun: true,

        frameworks: ["jasmine"],

        browsers : ["Chrome"],

        plugins : [
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine"
        ]
    });
};