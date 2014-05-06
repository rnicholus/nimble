nimbleModule.controller("columnsController", ["$scope", "columns",
    function($scope, columns) {
        $scope.getColumns = function() {
            return columns.current;
        };
    }])
    .factory("columns", ["$rootScope", "user", "github", "$q",
        function($rootScope, user, github, $q) {

        var self = this,

            columnPattern = /^(\d+)(\s*-\s*)(.+)/,

            formattedLabels = function(unformattedLabels) {
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
            },

            updateLabelsFromNameAndPosition = function(dirtyColumns) {
                var dirtyColumnsCopy = angular.copy(dirtyColumns);

                dirtyColumnsCopy.forEach(function(column, index) {
                    var newLabel = index + " - " + column.name;

                    if (column.label) {
                        newLabel = column.label.replace(columnPattern, index + "$2" + column.name);
                    }

                    column.label = newLabel;
                });

                return dirtyColumnsCopy;
            };

        angular.extend(this, {
            current: null, // referenced for readability

            update:  function(newColumns) {
                var proposedLabels = updateLabelsFromNameAndPosition(newColumns),
                    promises = [];

                if (!angular.equals(newColumns, this.current)) {
                    if (self.current.length > 0) {
                        (function() {
                            for (var idx = 0; idx < Math.min(self.current.length, proposedLabels.length); idx++) {
                                var existingLabel = self.current[idx].label,
                                    newLabel = proposedLabels[idx].label;

                                if (existingLabel !== newLabel) {
                                    promises.push(github.updateLabel(user.selectedRepoName, {
                                        oldLabel: existingLabel,
                                        newLabel: newLabel
                                    }));
                                }
                            }
                        }());
                    }

                    (function() {
                        var idx;

                        if (self.current.length > proposedLabels.length) {
                            for (idx = proposedLabels.length; idx < self.current.length; idx++) {
                                promises.push(github.deleteLabel(user.selectedRepoName, self.current[idx].label));
                            }
                        }
                        else if (proposedLabels.length > self.current.length) {
                            for (idx = self.current.length; idx < proposedLabels.length; idx++) {
                                promises.push(
                                    github.createLabel(user.selectedRepoName,
                                        proposedLabels[idx].label
                                    )
                                );
                            }
                        }
                    }());

                    this.current = proposedLabels;
                }

                return $q.all(promises);
            }
        });

        $rootScope.$watch(function() {return user.selectedRepoName;},
            function(selectedRepoName) {
                if (selectedRepoName) {
                    github.listAllLabels(selectedRepoName).then(function(allLabels) {
                        var columnLabels = allLabels.filter(function(label) {
                            return (columnPattern).test(label.name);
                        });

                        self.current = formattedLabels(columnLabels);
                    });
                }
            }
        );

        $rootScope.$watch(function() {return user.isLoggedIn();},
            function(loggedIn) {
                if (!loggedIn) {
                    self.current = null;
                }
            }
        );

        return this;
    }]);