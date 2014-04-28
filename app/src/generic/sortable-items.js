/* globals Sortable */
nimbleModule.directive("sortableItems", ["$timeout", function($timeout) {
    return {
        restrict: "A",
        scope: {
            ghostClass: "@",
            handlesSelector: "@",
            itemsSelector: "@"
        },
        link: function(scope, element) {
            var sort = new Sortable(element[0], {
                draggable: scope.itemsSelector,
                ghostClass: scope.ghostClass,
                handle: scope.handlesSelector
            });
        }
    };
}]);