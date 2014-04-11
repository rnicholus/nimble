describe("Github API service", function() {
    var githubApiUrl = "https://api.github.com",
        httpBackend, githubService,
        tokenService = {get: function() {}};

    beforeEach(function() {
        module("nimble", function($provide) {
            $provide.value("token", tokenService);
        });
        inject(function($httpBackend, github) {
            httpBackend = $httpBackend;
            githubService = github;
        });

        spyOn(tokenService, "get").and.returnValue("test");
    });

    afterEach(function() {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it("grabs the metadata for the user", function() {
        httpBackend.expectGET(githubApiUrl + "/user?access_token=test&per_page=100")
            .respond({id: 1});

        githubService.getUser().then(function(data) {
            expect(data).toEqual({id: 1});
        });

        httpBackend.flush();
    });

    it("handles a failure to get user metadata", function() {
        httpBackend.expectGET(githubApiUrl + "/user?access_token=test&per_page=100")
            .respond(404);

        githubService.getUser().then(function(data) {},
            function(reason) {
                expect(reason).toEqual({status: 404});
            });

        httpBackend.flush();
    });
});