describe("Columns service", function() {
    beforeEach(function() {
        var self = this;

        module("nimble");
        inject(function($rootScope, user, github, columns, $q) {
            self.$rootScope = $rootScope;
            self.user = user;
            self.github = github;
            self.columns = columns;
            self.$q = $q;
        });
    });

    it("should start out with no current columns, then update with formatted columns when a repo has been selected", function() {
        var listAllLabelsDeferred = this.$q.defer(),
            allLabels = [
                {name: "label"},
                {name: "0 - column"},
                {name: "nimble"},
                {name: "1-another column"},
                {name: "this is 1-not-a-column"}
            ];

        this.$rootScope.$digest();
        expect(this.columns.current).toBeFalsy();

        this.user.selectedRepoName = "foo/bar";
        spyOn(this.github, "listAllLabels").and.returnValue(listAllLabelsDeferred.promise);
        this.$rootScope.$digest();
        expect(this.github.listAllLabels).toHaveBeenCalledWith("foo/bar");

        listAllLabelsDeferred.resolve(allLabels);
        this.$rootScope.$digest();
        expect(this.columns.current).toEqual([
            {
                name: "column",
                label: "0 - column"
            },
            {
                name: "another column",
                label: "1-another column"
            }
        ]);
    });
});