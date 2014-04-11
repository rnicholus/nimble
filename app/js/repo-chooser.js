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

    $scope.repos = [
        {type: "all", entries: []},
        {type: "public", entries: []},
        {type: "private", entries: []}
    ];

    github.getRepos().then(function(allRepos) {
        $scope.repos[0].entries = sorted(allRepos);

        $scope.repos[1].entries = sorted(allRepos.filter(function(repo) {
            return !repo.private;
        }));

        $scope.repos[2].entries = sorted(allRepos.filter(function(repo) {
            return repo.private;
        }));
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