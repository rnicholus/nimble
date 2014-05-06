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

    it("should clear out columns if the user logs out", function() {
        this.columns.current = [];
        spyOn(this.user, "isLoggedIn").and.returnValue(false);
        this.$rootScope.$digest();
        expect(this.columns.current).toBe(null);
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

    // TODO test removed columns
    describe("update", function() {
        it("does nothing if no changes exist", function() {
            this.columns.current = [
                {name: "1", label: "0 - 1"},
                {name: "2", label: "0 - 2"}
            ];

            this.columns.update(angular.copy(this.columns.current)).then(function(results) {
                expect(results.length).toBe(0);
            });

            this.$rootScope.$digest();
        });

        // TODO test that proper github svc methods are called
        it("handles a new & changed columns correctly", function() {
            var proposedColumns = [
                    {name: "2", label: "0 - 1"},
                    {name: "5", label: "0 - 2"},
                    {name: "3", label: "0 - 3"},
                    {name: "foo"}
                ],
                expectedColumns = [
                    {name: "2", label: "0 - 2"},
                    {name: "5", label: "1 - 5"},
                    {name: "3", label: "2 - 3"},
                    {name: "foo", label: "3 - foo"}
                ];

            this.columns.current = [
                {name: "1", label: "0 - 1"},
                {name: "2", label: "0 - 2"},
                {name: "3", label: "0 - 3"}
            ];

            this.columns.update(proposedColumns);

            expect(this.columns.current).toEqual(expectedColumns);
        });
    });
});