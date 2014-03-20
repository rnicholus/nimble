/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        separator: "\n"
    },
    dist: {
        src: ["app/ember/*.js", "app/ember/user/*.js", "app/ember/**/*.js"],
        dest: "dist/<%= pkg.name %>.js"
    }
};