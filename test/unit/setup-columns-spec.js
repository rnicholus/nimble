describe("Setup columns controller", function() {
    beforeEach(function() {
        var self = this;

        module("nimble");
        inject(function($rootScope, $controller, columns, user) {
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.$modalInstance = jasmine.createSpyObj("modalInstance", ["close", "dismiss"]);
            self.columns = columns;
            self.user = user;
        });

        this.columns.current = [
            {name: "one"},
            {name: "two"},
            {name: "three"}
        ];

        this.$controller("setupColumnsInstanceController", {
            $scope: this.$scope,
            $modalInstance: this.$modalInstance,
            columns: this.columns
        });
    });

    it("ensures changes to the columns model are isolated to the controller until they are explicitly 'saved'", function() {
        this.$scope.remove(1);

        expect(this.columns.current.length).toBe(3);
        expect(this.$scope.columns.length).toBe(2);
    });

    it("removes and adds new columns correctly", function() {
        this.$scope.remove(1);
        expect(this.$scope.columns).toEqual([
            {name: "one"},
            {name: "three"}
        ]);

        this.$scope.add();
        expect(this.$scope.columns).toEqual([
            {name: "one"},
            {name: "three"},
            {name: null}
        ]);

        this.$scope.remove(2);
        expect(this.$scope.columns).toEqual([
            {name: "one"},
            {name: "three"}
        ]);

        this.$scope.remove(0);
        expect(this.$scope.columns).toEqual([
            {name: "three"}
        ]);

        this.$scope.add();
        expect(this.$scope.columns).toEqual([
            {name: "three"},
            {name: null}
        ]);
    });

    it("ensures the user is prompted to setup columns if the repo has no columns", function() {
        this.$controller("setupColumnsController", {
            $scope: this.$scope,
            $modal: this.$modal,
            user: this.user,
            columns: this.columns
        });

        this.$scope.open = function() {};
        spyOn(this.$scope, "open");

        this.$scope.$root.$digest();
        expect(this.$scope.open).not.toHaveBeenCalled();

        this.columns.current = [];
        this.$scope.$root.$digest();
        expect(this.$scope.open).toHaveBeenCalled();
    });
});