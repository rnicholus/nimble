var setupColumnsInstanceController = ["$scope", "$modalInstance", "columns", "$timeout",
    function($scope, $modalInstance, columns, $timeout) {
        $scope.columns = columns.current;

        $scope.close = $modalInstance.dismiss;
        $scope.ok = $modalInstance.close;
    }];

nimbleModule.controller("setupColumnsController", ["$scope", "$modal",
    function($scope, $modal) {
        $scope.open = function() {
            var modalInstance = $modal.open({
                controller: setupColumnsInstanceController,
                templateUrl: "src/issue/setup-columns.html"
            });

            // TODO
            modalInstance.result.then(function(newRepo) {});
        };
    }]);
