/* jshint node:true */
/* globals module */
module.exports = {
    options: {
        separator: "\n"
    },
    dist: {
        src: ["app/src/app.js", "app/src/**/*.js"],
        dest: "app/dist/<%= pkg.name %>.js"
    }
};