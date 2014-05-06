describe("Repo menu controller", function() {
    beforeEach(function() {
        var self = this;

        module("nimble");
        inject(function($rootScope, $controller, user) {
            self.$rootScope = $rootScope;
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.user = user;
        });
    });

    it("should update the scope variables if the matching properties in the user service are updated", function() {
        spyOn(this.user, "selectedRepoName").and.returnValue("initial");
        spyOn(this.user, "isLoggedIn").and.returnValue(true);

        this.$controller("repoMenuController", {
            $scope: this.$scope,
            user: this.user
        });

        this.$rootScope.$digest();
        expect(this.$scope.getName()).toEqual(this.user.selectedRepoName);
        expect(this.$scope.isLoggedIn()).toBe(true);

        this.user.selectedRepoName.and.returnValue("changed");
        this.user.isLoggedIn.and.returnValue(false);
        this.$rootScope.$digest();
        expect(this.$scope.getName()).toEqual(this.user.selectedRepoName);
        expect(this.$scope.isLoggedIn()).toBe(false);
    });
});
