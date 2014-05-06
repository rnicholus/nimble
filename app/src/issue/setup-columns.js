var setupColumnsInstanceController = ["$scope", "$modalInstance", "columns", "systemAlert",
    function($scope, $modalInstance, columns, systemAlert) {
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

            save: function() {
                columns.update($scope.columns).then(
                    function updated() {
                        $modalInstance.close();
                    },

                    function failure() {
                        systemAlert.show("error", "Problem updating columns on GitHub.");
                    }
                );
            }
        });
    }];

nimbleModule.controller("setupColumnsController", ["$scope", "$modal",
    function($scope, $modal) {
        $scope.open = function() {
            $modal.open({
                controller: setupColumnsInstanceController,
                templateUrl: "src/issue/setup-columns.html"
            });
        };
    }]);
