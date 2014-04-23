nimbleModule.controller("columnsController", ["$scope", "columns",
    function($scope, columns) {

        $scope.$watch(function() {return columns.current;},
            function(currentColumns) {
                $scope.columns = currentColumns;
            }
        );
    }])
    // TODO handle 410 on listAllLabels (issues not enabled)
    .factory("columns", ["$rootScope", "user", "github", function($rootScope, user, github) {
        var self = this,

            formattedColumnLabels = function(unformattedLabels) {
                var columns = [];

                unformattedLabels.forEach(function(unformattedLabel) {
                    var match = unformattedLabel.name.match(/^(\d+)\s*-\s*(.+)$/),
                        columnIdx = parseInt(match[1]);

                    columns[columnIdx] = {
                        name: match[2],
                        label: unformattedLabel.name
                    };
                });

                return columns;
            };

        $rootScope.$watch(function() {return user.selectedRepoName;},
            function(selectedRepoName) {
                if (selectedRepoName) {
                    github.listAllLabels(selectedRepoName).then(function(allLabels) {
                        var columnLabels = allLabels.filter(function(label) {
                            return (/^\d+\s*-\s*.+/).test(label.name);
                        });

                        self.current = formattedColumnLabels(columnLabels);
                    });
                }
            }
        );

        return this;
    }]);