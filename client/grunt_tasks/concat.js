/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        separator: "\n"
    },
    dist: {
        src: ["app/*.js", "app/user/*.js", "app/**/*.js"],
        dest: "dist/<%= pkg.name %>.js"
    }
};