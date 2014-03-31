nimbleModule.controller("userController", ["$scope", "user",
    function($scope, user) {
        angular.extend($scope, {
            loggedIn: user.isLoggedIn(),

            login: user.login,

            logout: function() {
                user.logout().then(function() {
                    $scope.loggedIn = false;
                });
            }
        });

        if ($scope.loggedIn) {
            user.getInfo().then(function(info) {
                $scope.avatarUrl = info.avatar_url;
            });
        }

    }])
        .directive("nimbleUser", function() {
            return {
                restrict: "E",
                templateUrl: "/partials/user.html"
            };
        });