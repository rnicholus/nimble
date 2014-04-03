nimbleModule.factory("github", ["token", "$http", "$q", function(token, $http, $q) {
    var apiRoot = "https://api.github.com";

    return {
        getUser: function() {
            var deferred = $q.defer();

            $http.get(apiRoot + "/user", {
                params: {
                    access_token: token.get()
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