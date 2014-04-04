describe("Repo menu controller", function() {
    var controller, q, scope;

    beforeEach(function() {
        module("nimble");
        inject(function($rootScope, $controller, $q) {
            scope = $rootScope.$new();
            controller = $controller;
            q = $q;
        });
    });

    it("updates the user service when a new repo is selected", function() {
        var deferred = q.defer(),
            modal = {
                open: function() {}
            },
            user = {
                selectedRepoName: "initial"
            },
            userController = controller("repoChooserController", {
                $scope: scope,
                $modal: modal,
                user: user
            });

        spyOn(modal, "open").and.returnValue({result: deferred.promise});
        scope.open();

        expect(modal.open).toHaveBeenCalled();
        deferred.resolve({name: "newSelectedRepo"});
        scope.$root.$digest();
        expect(user.selectedRepoName).toEqual("newSelectedRepo");
    });
});