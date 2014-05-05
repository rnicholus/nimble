// TODO maybe allow conditional requests and the ability to clear cache for specific reqs
// TODO figure out how to determine if issues are not enabled
nimbleModule.factory("github", ["token", "$http", "$q",
    function(token, $http, $q) {

    var apiRoot = "https://api.github.com",
        apiVersion = "application/vnd.github.v3+json",

        callApi = function(path, _verb, _data) {
            var deferred = $q.defer(),
                verb = _verb || "GET",
                data = _data || {},
                params = {
                    access_token: token.get()
                };

            if (verb === "GET") {
                params.per_page = 100;
            }

            $http({
                method: verb,
                url: apiRoot + "/" + path,
                cache: true,
                headers: {
                    Accept: apiVersion,
                    "Content-Type": "application/json;charset=utf-8"
                },
                params: params,
                data: data
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
        },

        // retrieve URL of next page of results (undefined if no next page)
        getNextUrl = function(linkHeader) {
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
        },

        // GET all pages of results in the set
        loadNextPages = function(linkHeader, aggregateData, deferred) {
            var nextPageUrl = getNextUrl(linkHeader);

            if (nextPageUrl) {
                $http.get(nextPageUrl, {
                    cache: true,
                    headers: {
                        Accept: apiVersion
                    }
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
        };


    return {
        createLabel: function(fullRepoName, labelToCreate) {
            return callApi("repos/" + fullRepoName + "/labels",
                "POST",
                {
                    name: labelToCreate,
                    color: "FFFFFF"
                }
            );
        },

        deleteLabel: function(fullRepoName, labelToDelete) {
            return callApi("repos/" + fullRepoName + "/labels/" + labelToDelete, "DELETE");
        },

        getAuthenticatedUser: function() {
            return callApi("user");
        },

        listAllLabels: function(fullRepoName) {
            return callApi("repos/" + fullRepoName + "/labels");
        },

        listOrgRepos: function(org) {
            return callApi("orgs/" + org.login + "/repos");
        },

        listUserOrgs: function(user) {
            return callApi("users/" + user.login + "/orgs");
        },

        listYourRepos: function() {
            return callApi("user/repos");
        },

        updateLabel: function(fullRepoName, labelDiff) {
            return callApi("repos/" + fullRepoName + "/labels/" + labelDiff.oldLabel,
                "PATCH",
                {
                    name: labelDiff.newLabel,
                    color: "FFFFFF"
                }
            );
        }
    };
}]);