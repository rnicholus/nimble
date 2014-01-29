/* jshint node:true */
/* globals module */
module.exports = {
    compile: {
        options: {
            templateName: function(sourceFile) {
                return sourceFile.replace(/templates\//, "");
            }
        },
        files: {
            "dist/templates.js": "templates/**/*.hbs"
        }
    }
};