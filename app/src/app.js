/*jshint -W079 */
var nimbleModule = angular.module("nimble", [
    "ui.bootstrap",
    "ngAnimate",
    "ajoslin.promise-tracker",
    "cgBusy",
    "ui.sortable"
])
    .run(["deepLinking", function(deepLinking) {}]);