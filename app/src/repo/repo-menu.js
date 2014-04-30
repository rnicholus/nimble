nimbleModule.controller("repoMenuController", ["$scope", "user",
    function($scope, user) {
        $scope.$watch(function() {return user.selectedRepoName;},
            function(selectedRepoName) {
                $scope.name = selectedRepoName;
            }
        );

        $scope.$watch(function() {return user.isLoggedIn();},
            function(loggedIn) {
                $scope.loggedIn = loggedIn;
            }
        );
    }]);
