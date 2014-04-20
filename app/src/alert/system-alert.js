nimbleModule.factory("systemAlert", ["$rootScope", function($rootScope) {
    return {
        show: function(type, text) {
            $rootScope.$broadcast("nimble:activateSystemAlert", {
                text: text,
                type: type
            });
        }
    };
}])

.controller("systemAlertController", ["$scope", "$timeout",
    function($scope, $timeout) {
        var alertTimeoutPromise;

        $scope.$root.$on("nimble:activateSystemAlert", function(event, args) {
            $scope.type = args.type === "error" ? "danger" : args.type;
            $scope.text = args.text;
            $scope.active = true;

            if (alertTimeoutPromise) {
                $timeout.cancel(alertTimeoutPromise);
            }

            alertTimeoutPromise = $timeout(function() {
                console.log("hmmmm");
                alertTimeoutPromise = null;
                $scope.active = false;
            }, 10000);
        });
    }
]);
