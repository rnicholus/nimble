/* jshint node:true */
function config(name) {
    return require("./grunt_tasks/" + name + ".js");
}

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        concat: config("concat"),
        jshint: config("jshint"),
        emberTemplates: config("ember_templates"),
        watch: {
            files: ["templates/**/*.hbs", "app.js", "app/**/*.js"],
            tasks: ["emberTemplates", "concat"]
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-ember-templates");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("dist",
        ["jshint", "emberTemplates", "concat"]);
    grunt.registerTask("default", ["watch"]);
};