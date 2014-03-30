/* globals beforeEach, afterEach, inject, module */
describe("User service", function() {
    var githubApiUrl = "https://api.github.com",
        httpBackend, userService;

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

        userService.logout().then(function() {
            expect(userService.isLoggedIn()).toBe(false);
        });

        httpBackend.flush();
    });

    it("should not logout the user if the logout request fails", function() {
        httpBackend.expectDELETE("/github/token").respond(404);

        userService.logout().then(function() {},
        function(reason) {
            expect(userService.isLoggedIn()).toBe(true);
            expect(reason).toEqual({status: 404});
        });

        httpBackend.flush();
    });

    it("grabs the metadata for the user", function() {
        httpBackend.expectGET(githubApiUrl + "/user?access_token=test")
            .respond({id: 1});

        userService.getInfo().then(function(data) {
            expect(data).toEqual({id: 1});
        });

        httpBackend.flush();
    });

    it("handles a failure to get user metadata", function() {
        httpBackend.expectGET(githubApiUrl + "/user?access_token=test")
            .respond(404);

        userService.getInfo().then(function(data) {},
        function(reason) {
            expect(reason).toEqual({status: 404});
        });

        httpBackend.flush();
    });
});