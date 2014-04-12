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
    repos.get().then(function(groupedRepos) {
        groupedRepos.forEach(function(reposGroup) {
            sort(reposGroup.repos);
            $scope.typedRepos.push(reposGroup);
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