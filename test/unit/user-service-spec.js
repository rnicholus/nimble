describe("User service", function() {
    var httpBackend, userService,
        tokenService = {
            clear: function() {},
            get: function() {}
        };

    beforeEach(function() {
        module("nimble", function($provide) {
            $provide.value("token", tokenService);
        });
        inject(function($httpBackend, user) {
            httpBackend = $httpBackend;
            userService = user;
        });
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("should report the user as logged in since token exists", function() {
        spyOn(tokenService, "get").and.returnValue("123");
        expect(userService.isLoggedIn()).toBe(true);
    });

    it("should properly logout the user when commanded", function() {
        httpBackend.expectDELETE("/github/token").respond();

        spyOn(tokenService, "clear");
        spyOn(tokenService, "get").and.returnValue(null);

        userService.logout().then(function() {
            expect(tokenService.clear).toHaveBeenCalled();
            expect(userService.isLoggedIn()).toBe(false);
        });

        httpBackend.flush();
    });

    it("should not logout the user if the logout request fails", function() {
        httpBackend.expectDELETE("/github/token").respond(404);

        spyOn(tokenService, "clear");
        spyOn(tokenService, "get").and.returnValue("123");

        userService.logout().then(function() {},
        function(reason) {
            expect(tokenService.clear).not.toHaveBeenCalled();
            expect(userService.isLoggedIn()).toBe(true);
            expect(reason).toEqual({status: 404});
        });

        httpBackend.flush();
    });
});