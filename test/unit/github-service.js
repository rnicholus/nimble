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

        githubService.getAuthenticatedUser().then(function(data) {
            expect(data).toEqual({id: 1});
        });

        httpBackend.flush();
    });

    it("handles a failure to get user metadata", function() {
        httpBackend.expectGET(githubApiUrl + "/user?access_token=test&per_page=100")
            .respond(404);

        githubService.getAuthenticatedUser().then(function(data) {},
            function(reason) {
                expect(reason).toEqual({status: 404});
            });

        httpBackend.flush();
    });

    it("gets all pages of repo results", function() {
        httpBackend.expectGET(githubApiUrl + "/user/repos?access_token=test&per_page=100")
            .respond([1,2,3], {
                Link: "<http://page1.com>; rel=\"next\""
            });

        httpBackend.expectGET("http://page1.com")
            .respond([4,5,6]);

        githubService.listYourRepos().then(function(data) {
            expect(data).toEqual([1,2,3,4,5,6]);
        });

        httpBackend.flush();
    });

    it("gets list of user orgs", function() {
        httpBackend.expectGET(githubApiUrl + "/users/rnicholus/orgs?access_token=test&per_page=100")
            .respond(["garstasio"]);

        githubService.listUserOrgs({login: "rnicholus"}).then(function(data) {
            expect(data).toEqual(["garstasio"]);
        });

        httpBackend.flush();
    });

    it("gets list of org repos", function() {
        httpBackend.expectGET(githubApiUrl + "/orgs/garstasio/repos?access_token=test&per_page=100")
            .respond(["one", "two"]);

        githubService.listOrgRepos({login: "garstasio"}).then(function(data) {
            expect(data).toEqual(["one", "two"]);
        });

        httpBackend.flush();
    });
});