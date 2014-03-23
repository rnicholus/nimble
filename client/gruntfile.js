/* jshint node:true */
function config(name) {
    return require("./grunt_tasks/" + name + ".js");
}

module.exports = function(grunt) {
    grunt.initConfig({
        concat: config("concat"),
        jshint: config("jshint"),
        karma: config("karma"),
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            files: ["app/**/*", "grunt_tasks/*", "test/**/*"],
            tasks: ["jshint", "concat", "test"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["dist", "test", "watch"]);
    grunt.registerTask("dist", ["jshint", "concat"]);
    grunt.registerTask("test", ["karma"]);
};