nimbleModule.factory("user", ["$http", "$q", function($http, $q) {
    var tokenUrl = "/github/token",
        token = document.cookie.replace(
        /(?:(?:^|.*;\s*)github_token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    return {
        isLoggedIn: function() {
            return !!token;
        },

        login: function() {
            window.location = tokenUrl;
        },

        logout: function() {
            var deferred = $q.defer();

            $http.delete(tokenUrl)
            .success(function() {
                token = null;
                deferred.resolve();
            })
            .error(function(data, status) {
                console.error("Could not log out user due to server error.");
                deferred.reject({status: status});
            });

            return deferred.promise;
        },

        // TODO Move most of this to a new "github API" service
        getInfo: function() {
            var host = "https://api.github.com",
                deferred = $q.defer();

            $http.get(host + "/user", {
                params: {
                    access_token: token
                }
            }).success(function(data) {
                deferred.resolve(data);
            }).error(function(data, status) {
                deferred.reject({status: status});
            });

            return deferred.promise;
        }
    };
}]);