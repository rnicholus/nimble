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

        it("handles new & changed columns correctly", function() {
            var proposedColumns = [
                    {name: "2", label: "0 - 1"},
                    {name: "5", label: "1 - 2"},
                    {name: "3", label: "2 - 3"},
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
                {name: "2", label: "1 - 2"},
                {name: "3", label: "2 - 3"}
            ];

            this.user.selectedRepoName = "garstasio/foobar";
            spyOn(this.github, "updateLabel").and.returnValue(this.$q.defer().promise);
            spyOn(this.github, "createLabel").and.returnValue(this.$q.defer().promise);

            this.columns.update(proposedColumns);

            // updates
            expect(this.github.updateLabel).toHaveBeenCalledWith("garstasio/foobar", {
                oldLabel: "0 - 1",
                newLabel: "0 - 2"
            });
            expect(this.github.updateLabel).toHaveBeenCalledWith("garstasio/foobar", {
                oldLabel: "1 - 2",
                newLabel: "1 - 5"
            });
            expect(this.github.updateLabel).not.toHaveBeenCalledWith("garstasio/foobar", {
                oldLabel: "2 - 3",
                newLabel: "2 - 3"
            });

            // adds
            expect(this.github.createLabel).toHaveBeenCalledWith("garstasio/foobar", "3 - foo");

            // new columns
            expect(this.columns.current).toEqual(expectedColumns);
        });

        it("handles new & deleted columns correctly", function() {
            var proposedColumns = [
                    {name: "1", label: "0 - 1"},
                    {name: "foo", label: "1 - 2"}
                ],
                expectedColumns = [
                    {name: "1", label: "0 - 1"},
                    {name: "foo", label: "1 - foo"}
                ];

            this.columns.current = [
                {name: "1", label: "0 - 1"},
                {name: "2", label: "1 - 2"},
                {name: "3", label: "2 - 3"}
            ];

            this.user.selectedRepoName = "garstasio/foobar";
            spyOn(this.github, "updateLabel").and.returnValue(this.$q.defer().promise);
            spyOn(this.github, "deleteLabel").and.returnValue(this.$q.defer().promise);

            this.columns.update(proposedColumns);

            // updates
            expect(this.github.updateLabel).not.toHaveBeenCalledWith("garstasio/foobar", {
                oldLabel: "0 - 1",
                newLabel: "0 - 1"
            });
            expect(this.github.updateLabel).toHaveBeenCalledWith("garstasio/foobar", {
                oldLabel: "1 - 2",
                newLabel: "1 - foo"
            });

            // deletes
            expect(this.github.deleteLabel).toHaveBeenCalledWith("garstasio/foobar", "2 - 3");

            // new columns
            expect(this.columns.current).toEqual(expectedColumns);
        });
    });
});