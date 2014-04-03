/* globals beforeEach, inject, module */
describe("Token service", function() {
    var tokenService;

    beforeEach(function() {
        document.cookie = "github_token=test";

        module("nimble");
        inject(function(token) {
            tokenService = token;
        });
    });

    it("should return the token represented in the cookie", function() {
        expect(tokenService.get()).toEqual("test");
    });

    it("should hold a null token after a call to clear", function() {
        tokenService.clear();
        expect(tokenService.get()).toBe(null);
    });
});