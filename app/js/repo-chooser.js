var repoChooserInstanceController = function($scope, $modalInstance) {
    $scope.close = $modalInstance.dismiss;
    $scope.ok = $modalInstance.close;

    // TODO replace dummy data with real data
    $scope.repos = [
        {type: "all", entries: [
            {name: "rnicholus/public1"}, {name: "rnicholus/public2"},
            {name: "rnicholus/private1"}, {name: "rnicholus/private2"}
        ]},
        {type: "public", entries: [
            {name: "rnicholus/public1"}, {name: "rnicholus/public2"}
        ]},
        {type: "private", entries: [
            {name: "rnicholus/private1"}, {name: "rnicholus/private2"}
        ]}
    ];
};

nimbleModule.controller("repoChooserController", ["$scope", "$modal", "user",
    function($scope, $modal, user) {
        $scope.open = function() {
            var modalInstance = $modal.open({
                controller: repoChooserInstanceController,
                templateUrl: "/partials/repo-chooser.html"
            });

            modalInstance.result.then(function(newRepo) {
                user.selectedRepoName = newRepo.name;
            });
        };
    }]);