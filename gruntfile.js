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
            files: [".jshintrc", "app/**/*", "grunt_tasks/*", "test/**/*"],
            tasks: ["jshint", "concat", "test"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-karma");

    grunt.registerTask("default", ["dist", "karma:dev", "watch"]);
    grunt.registerTask("dist", ["jshint", "concat"]);
    grunt.registerTask("travis", ["dist", "karma:travis"]);

};