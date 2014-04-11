//TODO allow conditional requests
//TODO move some of the repo retrieval logic into a repo service
nimbleModule.factory("github", ["token", "$http", "$q", function(token, $http, $q) {
    var apiRoot = "https://api.github.com",
        apiVersion = "application/vnd.github.v3+json";

    function callApi(path, _verb, _params) {
        var deferred = $q.defer(),
            verb = _verb || "get",
            params = _params || {};

        params.access_token = token.get();
        params.per_page = 100;

        $http[verb](apiRoot + "/" + path, {
            headers: {
                Accept: apiVersion
            },
            params: params
        })
            .success(function(data, status, headers) {
                // grab all pages if more than one page of results exists
                if (headers("Link")) {
                    loadNextPages(headers("Link"), data, deferred);
                }
                else {
                    deferred.resolve(data);
                }
            })
            .error(function(data, status) {
                deferred.reject({status: status});
            });

        return deferred.promise;
    }

    // GET all pages of results in the set
    function loadNextPages(linkHeader, aggregateData, deferred) {
        var nextPageUrl = getNextUrl(linkHeader);

        if (nextPageUrl) {
            $http.get(nextPageUrl, {
                Accept: apiVersion
            }).success(function(data, status, headers) {
                aggregateData = aggregateData.concat(data);
                if (headers("Link")) {
                    loadNextPages(headers("Link"), aggregateData, deferred);
                }
                else {
                    deferred.resolve(aggregateData);
                }
            }).error(function(data, status) {
                deferred.reject({status: status});
            });
        }
        else {
            deferred.resolve(aggregateData);
        }
    }

    // retrieve URL of next page of results (undefined if no next page)
    function getNextUrl(linkHeader) {
        var parts = linkHeader.split(","),
            nextUrlPart = null;

        parts.forEach(function(part) {
            if (part.indexOf("rel=\"next\"") > 0) {
                nextUrlPart = part;
            }
        });

        if (nextUrlPart) {
            return (/<(.+)>/).exec(nextUrlPart)[1];
        }
    }

    return {
        getOrgs: function() {
            var deferred = $q.defer();

            this.getUser().then(
                function(user) {
                    callApi("users/" + user.login + "/orgs").then(deferred.resolve, deferred.reject);
                },
                deferred.reject
            );

            return deferred.promise;
        },

        getRepos: function() {
            var deferred = $q.defer(),
                userRepos = callApi("user/repos");

            this.getOrgs().then(
                function(orgs) {
                    var orgReposDeferreds = [];

                    orgs.forEach(function(org) {
                        orgReposDeferreds.push(callApi("orgs/" + org.login + "/repos"));
                    });

                    $q.all(orgReposDeferreds.concat(userRepos)).then(
                        function(repos) {
                            var allRepos = [].concat(repos[0]);
                            deferred.resolve(allRepos.concat(repos[1]));
                        },
                        deferred.reject
                    );
                },
                deferred.reject
            );

            return deferred.promise;
        },

        getUser: function() {
            return callApi("user");
        }
    };
}]);