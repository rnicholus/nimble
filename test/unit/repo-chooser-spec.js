describe("Repo menu controller", function() {
    var controller, q, scope, modalInstance, reposSvc, location;

    beforeEach(function() {
        module("nimble");
        inject(function($rootScope, $controller, $q, repos, $location) {
            scope = $rootScope.$new();
            controller = $controller;
            q = $q;
            modalInstance = jasmine.createSpyObj("modalInstance", ["close", "dismiss"]);
            reposSvc = repos;
            location = $location;
        });
    });

    it("updates the user service when a new repo is selected", function() {
        var deferred = q.defer(),
            modal = {
                open: function() {}
            },
            user = {
                selectedRepoName: "initial"
            };

        controller("repoChooserController", {
            $scope: scope,
            $modal: modal,
            user: user
        });

        spyOn(modal, "open").and.returnValue({result: deferred.promise});
        scope.open();

        expect(modal.open).toHaveBeenCalled();
        deferred.resolve({full_name: "newSelectedRepo"});
        scope.$root.$digest();
        expect(user.selectedRepoName).toEqual("newSelectedRepo");
    });

    it("retrieves all typed repos and sorts them by type", function() {
        var getReposDeferred = q.defer();

        spyOn(reposSvc, "get").and.returnValue(getReposDeferred.promise);

        controller("repoChooserInstanceController", {
            $scope: scope,
            $modalInstance: modalInstance,
            repos: reposSvc
        });

        getReposDeferred.resolve([
            {type: "type1", repos: [{full_name: "b"}, {full_name: "a"}, {full_name: "c"}]},
            {type: "type2", repos: [{full_name: "nicholus"}, {full_name: "ray"}]}
        ]);
        scope.$digest();
        expect(scope.typedRepos).toEqual([
            {type: "type1", repos: [{full_name: "a"}, {full_name: "b"}, {full_name: "c"}]},
            {type: "type2", repos: [{full_name: "nicholus"}, {full_name: "ray"}]}
        ]);
    });
});