var repoChooserInstanceController = function($scope, $modalInstance, github) {
    function sorted(repos) {
        repos.sort(function(a, b) {
            var aName = a.full_name.toLowerCase(),
                bName = b.full_name.toLowerCase();

            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });

        return repos;
    }

    $scope.close = $modalInstance.dismiss;
    $scope.ok = $modalInstance.close;

    $scope.repos = [];

    // Ensure spinner is displayed or, preferrably, ensure this data is loaded/cached much earlier
    github.getRepos().then(function(allRepos) {
        $scope.repos.push({type: "all", entries: sorted(allRepos)});

        $scope.repos.push({type: "public",
            entries: sorted(allRepos.filter(
                function(repo) {
                    return !repo.private;
                }
            ))
        });

        $scope.repos.push({type: "private",
            entries: sorted(allRepos.filter(
                function(repo) {
                    return repo.private;
                }
            ))
        });
    });
};

nimbleModule.controller("repoChooserController", ["$scope", "$modal", "user", "github",
    function($scope, $modal, user) {
        $scope.open = function() {
            var modalInstance = $modal.open({
                controller: repoChooserInstanceController,
                templateUrl: "/partials/repo-chooser.html"
            });

            modalInstance.result.then(function(newRepo) {
                user.selectedRepoName = newRepo.full_name;
            });
        };
    }]);