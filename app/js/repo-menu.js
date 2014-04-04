nimbleModule.controller("repoMenuController", ["$scope", "user",
    function($scope, user) {
        $scope.name = user.selectedRepoName;

        $scope.$watch(function() {return user.selectedRepoName;},
            function(selectedRepoName) {
                $scope.name = selectedRepoName;
            }
        );
    }]);