describe("System alert controller", function() {
    beforeEach(function() {
        var self = this;

        module("nimble");
        inject(function($rootScope, $controller, $timeout) {
            self.$rootScope = $rootScope;
            self.$scope = $rootScope.$new();
            self.$controller = $controller;
            self.$timeout = $timeout;
        });
    });

    it("properly activate system alert", function() {
        this.$controller("systemAlertController", {
            $scope: this.$scope,
            $timeout: this.$timeout
        });

        expect(this.$scope.active).toBeFalsy();

        this.$rootScope.$broadcast("nimble:activateSystemAlert", {
            type: "error",
            text: "test"
        });

        expect(this.$scope.type).toEqual("danger");
        expect(this.$scope.text).toEqual("test");
        expect(this.$scope.active).toBe(true);

        this.$timeout.flush();
        expect(this.$scope.active).toBe(false);
    });
});
