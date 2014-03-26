nimbleModule.controller("headerController", function($scope) {
    $scope.todoMsg = "TODO";
})
    .directive("nimbleHeader", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/header.html"
        };
    });