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
            user.get().then(function(info) {
                $scope.avatarUrl = info.avatar_url;
            });
        }

    }])

    .directive("nimbleUser", function() {
        return {
            restrict: "E",
            templateUrl: "/partials/user.html"
        };
    })

    .factory("user", ["github", "token", "$http", "$q",
        function(github, token, $http, $q) {

        var authUrl = "/github/token";

        return {
            get: github.getAuthenticatedUser,

            isLoggedIn: function() {
                return !!token.get();
            },

            login: function() {
                window.location = authUrl;
            },

            logout: function() {
                var deferred = $q.defer();

                $http.delete(authUrl)
                    .success(function() {
                        token.clear();
                        deferred.resolve();
                    })
                    .error(function(data, status) {
                        console.error("Could not log out user due to server error.");
                        deferred.reject({status: status});
                    });

                return deferred.promise;
            },

            // TODO better default value?
            selectedRepoName: "someOrg/someRepo"
        };
    }]);