/* globals beforeEach, afterEach, inject, module */
describe("User service", function() {
    var httpBackend, userService;

    beforeEach(function() {
        module("nimble");
        document.cookie = "github_token=test";
        inject(function($httpBackend, user) {
            httpBackend = $httpBackend;
            userService = user;
        });
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should report the user as logged in since cookie exists", function() {
        expect(userService.isLoggedIn()).toBe(true);
    });

    it("should properly logout the user when commanded", function() {
        httpBackend.expectDELETE("/github/token").respond();
        userService.logout();

        expect(userService.isLoggedIn()).toBe(true);

        httpBackend.flush();
    });
});