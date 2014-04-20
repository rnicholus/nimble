describe("Repos service", function() {
    beforeEach(function() {
        var self = this;

        module("nimble");

        inject(function($rootScope, $httpBackend, user, github, $q, repos) {
            self.$rootScope = $rootScope;
            self.$httpBackend = $httpBackend;
            self.user = user;
            self.github = github;
            self.$q = $q;
            self.repos = repos;
        });
    });

    afterEach(function() {
        this.$httpBackend.verifyNoOutstandingExpectation();
        this.$httpBackend.verifyNoOutstandingRequest();
    });

    it("should retrieve grouped all, public, and private repos from github", function() {
        var getReposPromiseResolved = false,
            repoGroups = [],
            listYourReposDeferred = this.$q.defer(),
            getUserDeferred = this.$q.defer(),
            listUserOrgsDeferred = this.$q.defer(),
            listOrgReposDeferred = this.$q.defer();

        spyOn(this.github, "listYourRepos").and.returnValue(listYourReposDeferred.promise);
        spyOn(this.github, "listUserOrgs").and.returnValue(listUserOrgsDeferred.promise);
        spyOn(this.github, "listOrgRepos").and.returnValue(listOrgReposDeferred.promise);
        spyOn(this.user, "get").and.returnValue(getUserDeferred.promise);

        this.repos.get().then(function(repoGroupsFromGithub) {
            getReposPromiseResolved = true;
            repoGroups = repoGroupsFromGithub;
        });
        expect(this.github.listYourRepos).toHaveBeenCalled();
        expect(this.user.get).toHaveBeenCalled();

        getUserDeferred.resolve("userinfo");
        this.$rootScope.$digest();
        expect(this.github.listUserOrgs).toHaveBeenCalledWith("userinfo");

        listUserOrgsDeferred.resolve(["org1"]);
        this.$rootScope.$digest();
        expect(this.github.listOrgRepos).toHaveBeenCalledWith("org1");

        listOrgReposDeferred.resolve([{private: true, name: "repo1"}]);
        this.$rootScope.$digest();
        expect(getReposPromiseResolved).toBe(false);

        listYourReposDeferred.resolve([{private:true, name: "repo2"}, {name: "repo3"}]);
        this.$rootScope.$digest();
        expect(getReposPromiseResolved).toBe(true);
        expect(repoGroups.length).toEqual(3);
        repoGroups.forEach(function(repoGroup) {
            if (repoGroup.type === "private") {
                expect(repoGroup.repos).toEqual([
                    {private:true, name: "repo1"},
                    {private: true, name: "repo2"}
                ]);
            }
            else if (repoGroup.type === "public") {
                expect(repoGroup.repos).toEqual([{name: "repo3"}]);
            }
            else {
                expect(repoGroup.type).toEqual("all");
                expect(repoGroup.repos).toEqual([
                    {private:true, name: "repo1"},
                    {private: true, name: "repo2"},
                    {name: "repo3"}
                ]);
            }
        });
    });
});
