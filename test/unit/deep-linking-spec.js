describe("Deep Linking service", function() {
    var tokenService;

    beforeEach(function() {
        var self = this;

        module("nimble");
        inject(function(deepLinking, $rootScope, $location, user) {
            self.deepLinking = deepLinking;
            self.$rootScope = $rootScope;
            self.$location = $location;
            self.user = user;
        });
    });

    it("updates the user svc when the repo name is specified in the URL", function() {
        this.$location.path("/repos/foo/bar");
        this.$rootScope.$digest();
        expect(this.user.selectedRepoName).toEqual("foo/bar");

        this.$location.path("/path1/path2/path3");
        this.$rootScope.$digest();
        expect(this.user.selectedRepoName).toEqual("foo/bar");

        this.$location.path("/repos/organization");
        this.$rootScope.$digest();
        expect(this.user.selectedRepoName).toEqual("foo/bar");

        this.$location.path("/repos/organization/reponame");
        this.$rootScope.$digest();
        expect(this.user.selectedRepoName).toEqual("organization/reponame");
    });

    it("updates the URL when the selected repo is changed via the user svc", function() {
        this.user.selectedRepoName = "foo/bar";
        this.$rootScope.$digest();
        expect(this.$location.path()).toEqual("/repos/foo/bar");

        this.user.selectedRepoName = "organization/reponame";
        this.$rootScope.$digest();
        expect(this.$location.path()).toEqual("/repos/organization/reponame");
    });
});
