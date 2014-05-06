nimbleModule.controller("repoMenuController", ["$scope", "user",
    function($scope, user) {
        $scope.getName = function() {
            return user.selectedRepoName;
        };

        $scope.isLoggedIn = user.isLoggedIn;
    }]);
