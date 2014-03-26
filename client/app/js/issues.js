nimbleModule.controller("issuesController", function($scope) {
    $scope.todoMsg = "TODO";
})
.directive("nimbleIssues", function() {
    return {
        restrict: "E",
        templateUrl: "/partials/issues.html"
    };
});