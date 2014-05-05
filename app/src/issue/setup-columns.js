var setupColumnsInstanceController = ["$scope", "$modalInstance", "columns",
    function($scope, $modalInstance, columns) {
        angular.extend($scope, {
            add: function() {
                $scope.columns.push({name: null});
            },

            close: $modalInstance.dismiss,

            // To prevent any changes from being persisted to the
            // service-held current columns array when we modify it
            // in the UI (before save), we must use a deep copy instead.
            columns: angular.copy(columns.current),

            remove: function(columnIndex) {
                $scope.columns.splice(columnIndex, 1);
            },

            // TODO show alert on failure
            save: function() {
                columns.update($scope.columns);
                $modalInstance.close();
            }
        });
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
