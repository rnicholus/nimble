/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        separator: "\n"
    },
    dist: {
        src: ["app/js/app.js", "app/js/**/*.js"],
        dest: "dist/<%= pkg.name %>.js"
    }
};