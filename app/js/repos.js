nimbleModule.factory("repos", ["github", "user", "$q",
    function(github, user, $q) {

    var getAllRepos = function () {
            var deferred = $q.defer(),
                userReposPromise = github.listUserRepos();

            user.get().then(
                function success(userInfo) {
                    github.listUserOrgs(userInfo).then(
                        function (orgs) {
                            var orgReposPromises = [];

                            orgs.forEach(function (org) {
                                orgReposPromises.push(github.listOrgRepos(org));
                            });

                            $q.all(orgReposPromises.concat(userReposPromise)).then(
                                function (repos) {
                                    var allRepos = [].concat(repos[0]);
                                    deferred.resolve(allRepos.concat(repos[1]));
                                },
                                deferred.reject
                            );
                        },
                        deferred.reject
                    );
                },

                deferred.reject
            );

            return deferred.promise;
        };


    return {
        get: function () {
            var deferred = $q.defer();

            getAllRepos().then(
                function success(allRepos) {
                    deferred.resolve([
                        {type: "all", repos: allRepos},

                        {type: "public",
                            repos: allRepos.filter(
                                function(repo) {
                                    return !repo.private;
                                }
                            )
                        },

                        {type: "private",
                            repos: allRepos.filter(
                                function (repo) {
                                    return repo.private;
                                }
                            )
                        }
                    ]);
                },

                deferred.reject
            );

            return deferred.promise;
        }
    };
}]);