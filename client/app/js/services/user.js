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
            return $http.delete(tokenUrl).success(function() {
                token = null;
            });
        },

        getInfo: function() {
            var host = "https://api.github.com",
                deferred = $q.defer();

            $http.get(host + "/user?access_token=" + token).success(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    };
}]);