nimbleModule.controller("issuesController", function($scope) {
})
.directive("nimbleIssues", function() {
    return {
        restrict: "E",
        templateUrl: "src/issue/issues.html"
    };
});