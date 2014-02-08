Nimble.ReposRoute = Ember.Route.extend({
    model: function() {
        var cache = this.cache,
            logged_in_user = cache.load("user"),
            user_repos = cache.load("user/repos"),

            user_orgs_url = function(user) {
                return "users/" + user.login + "/orgs";
            },

            org_repos_url = function(org) {
                return "orgs/" + org.login + "/repos";
            },

            all_repos = function(repos_arrays) {
                var repos = [];
                $.each(repos_arrays, function(idx, repos_array) {
                    repos = repos.concat(repos_array);
                });
                return repos;
            };

        // Get all repos associated with this user,
        // including all repos associated with any orgs user belongs to.
        // TODO handle lookup errors by calling reject
        return new Ember.RSVP.Promise(function(resolve, reject) {
            logged_in_user.then(function(user) {
                var organizations = cache.load(user_orgs_url(user))
                    .then(function(user_orgs) {
                        var orgRepos = [];
                        $.each(user_orgs, function(idx, user_org) {
                            orgRepos.push(cache.load(org_repos_url(user_org)));
                        });

                        Ember.RSVP.Promise.all(orgRepos.concat(user_repos))
                            .then(function(repos_array) {
                                resolve(all_repos(repos_array));
                            });
                    });
            });
        });
    },

    renderTemplate: function() {
        this.render("repos", {
            outlet: "modalOutlet"
        });
    }
});