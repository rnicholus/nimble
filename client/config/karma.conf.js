/* jshint node:true */
module.exports = function(config){
    config.set({
        autoWatch : false,

        basePath : "../",

        browsers : ["Chrome"],

        files : [
            "app/lib/*",
            "test/lib/angular/*",
            "app/js/**/*.js",
            "test/unit/**/*.js"
        ],

        frameworks: ["jasmine"],

        singleRun: true,

        plugins : [
            "karma-chrome-launcher",
            "karma-jasmine"
        ]
    });
};