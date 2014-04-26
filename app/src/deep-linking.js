nimbleModule.factory("deepLinking", ["$rootScope", "$location", "user",
    function($rootScope, $location, user) {
        var reposPath = "/repos/",

            getFullReposPath = function(fullRepoName) {
                return reposPath + fullRepoName;
            };

        $rootScope.$watch(function() {return $location.path();},
            function(path) {
                if (path.indexOf(reposPath) === 0) {
                    var repoSegment = path.substr(7);

                    if (repoSegment.split("/").length === 2 &&
                        repoSegment !== user.selectedRepoName) {

                        user.selectedRepoName = repoSegment;
                    }
                }
            });

        $rootScope.$watch(function() {return user.selectedRepoName;},
            function(fullRepoName) {
                if (fullRepoName && $location.path() !== getFullReposPath(fullRepoName)) {
                    $location.path(getFullReposPath(fullRepoName));
                }
            });
    }]);