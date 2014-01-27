/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        separator: "\n"
    },
    dist: {
        src: ["js/**/*.js"],
        dest: "dist/<%= pkg.name %>.js"
    }
};