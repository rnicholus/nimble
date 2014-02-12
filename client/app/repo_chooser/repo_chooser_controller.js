Nimble.RepoChooserController = Ember.ObjectController.extend({
    init: function() {
        this._get_all_repos().then(function(repos) {
            this.set("_all_repos", repos);
        }.bind(this));
    },

    _all_repos: [],

    current_name: function() {
        var selected_repo = this.cache.get("selected_repo");

        if (selected_repo) {
            return selected_repo.owner + "/" + selected_repo.name;
        }

        return null;

    }.property("this.cache.selected_repo"),

    _get_all_repos: function() {
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

    /**
     * Get a subset of all repo entries.
     *
     * @param private `true` for private repos,
     * `false` for public,
     * `null` for all
     * @returns {Array} Relevant repo entries, sorted by full_name
     */
    _get_sorted_repos: function(private) {
        var repos = this.get("_all_repos");

        if (private !== null) {
            repos = $.grep(this.get("_all_repos"), function(repo) {
                return repo.private === private;
            });
        }

        return repos.sort(function(a, b) {
            return a.full_name < b.full_name;
        });
    },

    _all: function() {
        return this._get_sorted_repos(null);
    }.property("_all_repos"),

    _public: function() {
        return this._get_sorted_repos(false);
    }.property("_all_repos"),

    _private: function() {
        return this._get_sorted_repos(true);
    }.property("_all_repos"),

    repos: function() {
        return [
            {type: "all", nav_id: "#all", entries: this.get("_all")},
            {type: "public", nav_id: "#public", entries: this.get("_public")},
            {type: "private", nav_id: "#private", entries: this.get("_private")}
        ];
    }.property("_all_repos")
});