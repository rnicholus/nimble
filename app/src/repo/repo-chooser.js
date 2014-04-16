var repoChooserInstanceController = function($scope, $modalInstance, repos) {
    function sort(reposArray) {
        reposArray.sort(function(a, b) {
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

        return reposArray;
    }

    $scope.close = $modalInstance.dismiss;
    $scope.ok = $modalInstance.close;

    $scope.typedRepos = [];

    // TODO Ensure spinner is displayed or, preferrably, ensure this data is loaded/cached much earlier
    // TODO handle request failure by displaying bootstrap alert
    repos.get().then(function(groupedRepos) {
        groupedRepos.forEach(function(reposGroup) {
            sort(reposGroup.repos);
            $scope.typedRepos.push(reposGroup);
        });
    });
};

nimbleModule.controller("repoChooserController", ["$scope", "$modal", "user", "$location",
    function($scope, $modal, user, $location) {

        $scope.$watch(function() {
            return $location.path();
        },
        function(path) {
            if (path.indexOf("/repos/") === 0) {
                var repoSegment = path.substr(7);

                if (repoSegment.split("/").length === 2) {
                    user.selectedRepoName = repoSegment;
                }
            }
        });

        $scope.open = function() {
            var modalInstance = $modal.open({
                controller: repoChooserInstanceController,
                templateUrl: "src/repo/repo-chooser.html"
            });

            modalInstance.result.then(function(newRepo) {
                user.selectedRepoName = newRepo.full_name;
            });
        };
    }]);