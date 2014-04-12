describe("Repo menu controller", function() {
    var controller, scope;

    beforeEach(function() {
        module("nimble");
        inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller;
        });
    });

    it("should update the name scope variable if the matching property in the user service is updated", function() {
        var user = {
                selectedRepoName: "initial"
            };

        controller("repoMenuController", {
            $scope: scope,
            user: user
        });

        expect(scope.name).toEqual(user.selectedRepoName);

        user.selectedRepoName = "changed";
        scope.$root.$digest();
        expect(scope.name).toEqual(user.selectedRepoName);
    });
});